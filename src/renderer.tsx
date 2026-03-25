import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title, description }) => {
  const pageTitle = title ? `${title} — Vivace Design Interior` : 'Vivace Design Interior — Premium Interior Design Studio'
  const metaDesc = description || 'Vivace Design Interior is a premium interior design studio in Ulaanbaatar, crafting beautifully considered spaces for residential and commercial clients.'

  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metaDesc} />
        <title>{pageTitle}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@200;300;400;500;600&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' fill='%23222217'/><text x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-size='18' fill='%23D2CBC1'>V</text></svg>" />
        <link href="/static/style.css" rel="stylesheet" />
        {/* GSAP CDN — powers all Noomo-level motion */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/SplitText.min.js"></script>
      </head>
      <body>
        <div id="page-transition"></div>
        <div id="scroll-progress"></div>
        {children}
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})
