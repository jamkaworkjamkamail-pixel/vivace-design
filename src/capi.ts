/**
 * Meta Conversions API (server-side) for Vivace Design Interior
 * Pixel/Dataset ID: 28447802321521588
 *
 * The access token is read ONLY from the binding `env.FB_ACCESS_TOKEN`
 * (Cloudflare secret). It is never hardcoded and never echoed to the browser.
 */

export interface CapiEnv {
  FB_ACCESS_TOKEN?: string
  FB_PIXEL_ID?: string
  FB_TEST_EVENT_CODE?: string
}

export interface LeadInput {
  name?: string
  email?: string
  phone?: string
  category?: string
  budget?: string
  preferred_time?: string
  message?: string
  event_id?: string
  event_source_url?: string
  fbp?: string
  fbc?: string
}

const DEFAULT_PIXEL_ID = '28447802321521588' // Interior Design Website Pixel
const GRAPH_VERSION = 'v26.0'
const MM_COUNTRY_CODE = '976' // prepended to local Mongolian numbers for better matching

/** SHA-256 → lowercase hex (what Meta requires for hashed PII fields). */
async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('')
}

/** Normalise + hash an email. */
async function hashEmail(raw?: string): Promise<string | undefined> {
  if (!raw) return undefined
  const v = raw.trim().toLowerCase()
  if (!v.includes('@')) return undefined
  return sha256Hex(v)
}

/** Normalise + hash a phone number (digits only, Mongolian country code added). */
async function hashPhone(raw?: string): Promise<string | undefined> {
  if (!raw) return undefined
  let digits = raw.replace(/\D/g, '')
  if (!digits) return undefined
  if (digits.length === 8) digits = MM_COUNTRY_CODE + digits // 99001234 -> 97699001234
  else if (digits.length === 9 && digits.startsWith('0')) digits = MM_COUNTRY_CODE + digits.slice(1)
  return sha256Hex(digits)
}

/** Split "Bat-Erdene Davaa" -> { fn, ln }, hash each. */
async function hashName(raw?: string): Promise<{ fn?: string; ln?: string }> {
  if (!raw) return {}
  const parts = raw.trim().toLowerCase().split(/\s+/).filter(Boolean)
  if (!parts.length) return {}
  if (parts.length === 1) return { fn: await sha256Hex(parts[0]) }
  return { fn: await sha256Hex(parts[0]), ln: await sha256Hex(parts[parts.length - 1]) }
}

/**
 * Sends a `Lead` event to Meta via the Conversions API.
 * Returns a result object; it NEVER throws (a tracking failure must not break the form).
 */
export async function sendCapiLead(env: CapiEnv, input: LeadInput, request: Request) {
  const token = env.FB_ACCESS_TOKEN
  const pixelId = env.FB_PIXEL_ID || DEFAULT_PIXEL_ID

  if (!token) {
    return { ok: false, skipped: true, reason: 'FB_ACCESS_TOKEN secret is not set on this deployment' }
  }

  const [{ fn, ln }, em, ph] = await Promise.all([
    hashName(input.name),
    hashEmail(input.email),
    hashPhone(input.phone),
  ])

  // Prefer the browser-supplied fbp/fbc (they keep the same value as the pixel, so
  // dedup + attribution stay aligned). Fall back to the cookies on this request.
  const cookie = request.headers.get('cookie') || ''
  const pick = (k: string) => cookie.match(new RegExp('(?:^|;\\s*)' + k + '=([^;]+)'))?.[1]

  const user_data: Record<string, unknown> = {
    client_ip_address: request.headers.get('cf-connecting-ip') || undefined,
    client_user_agent: request.headers.get('user-agent') || undefined,
    fbp: input.fbp || pick('_fbp') || undefined,
    fbc: input.fbc || pick('_fbc') || undefined,
  }
  if (em) user_data.em = [em]
  if (ph) user_data.ph = [ph]
  if (fn) user_data.fn = [fn]
  if (ln) user_data.ln = [ln]

  // drop undefined keys so we don't send empty strings to Meta
  for (const k of Object.keys(user_data)) if (!user_data[k]) delete user_data[k]

  const eventId = input.event_id || `lead.${Date.now()}.${Math.random().toString(36).slice(2, 10)}`

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId, // MUST equal the pixel's eventID for dedup
        action_source: 'website',
        event_source_url: input.event_source_url || 'https://www.vivace.mn/inquiry',
        user_data,
        custom_data: {
          content_name: 'Inquiry form',
          content_category: input.category || undefined,
          budget_range: input.budget || undefined,
          preferred_time: input.preferred_time || undefined,
        },
      },
    ],
  }

  // Only included while testing in Events Manager → Test events.
  if (env.FB_TEST_EVENT_CODE) payload.test_event_code = env.FB_TEST_EVENT_CODE

  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(token)}`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const json: any = await res.json().catch(() => ({}))
    if (!res.ok) {
      console.error('CAPI error', res.status, JSON.stringify(json))
      return { ok: false, status: res.status, error: json?.error?.message || 'request failed' }
    }
    return { ok: true, events_received: json?.events_received ?? 0, event_id: eventId, fbtrace_id: json?.fbtrace_id }
  } catch (err: any) {
    console.error('CAPI network error', err?.message)
    return { ok: false, error: err?.message || 'network error' }
  }
}
