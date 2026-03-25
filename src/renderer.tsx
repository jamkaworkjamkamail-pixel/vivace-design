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
        {/* Native SplitText polyfill — line/word/char splitting without Club GSAP */}
        <script dangerouslySetInnerHTML={{__html: `
(function(){
  function VivaceSplit(el, opts){
    if(!el) return {lines:[],words:[],chars:[]};
    opts = opts || {};
    this.el = el;
    this.lines = []; this.words = []; this.chars = [];
    var types = (opts.type || 'lines').split(',').map(function(s){return s.trim();});
    var text = el.innerHTML;
    var self = this;

    if(types.indexOf('chars') > -1 || types.indexOf('words') > -1){
      var raw = el.textContent;
      var html = '';
      if(types.indexOf('chars') > -1){
        html = raw.split('').map(function(c){
          if(c===' ') return '<span style="display:inline-block;white-space:pre"> </span>';
          return '<span class="vd-char" style="display:inline-block">' + c + '</span>';
        }).join('');
      } else {
        html = raw.split(' ').map(function(w){
          return '<span class="vd-word" style="display:inline-block;margin-right:.28em">' + w + '</span>';
        }).join('');
      }
      el.innerHTML = html;
      self.chars = Array.from(el.querySelectorAll('.vd-char'));
      self.words = Array.from(el.querySelectorAll('.vd-word'));
    }

    if(types.indexOf('lines') > -1){
      // Use range-based line detection
      el.innerHTML = text;
      var rawText = el.textContent;
      var words = rawText.split(/\s+/).filter(Boolean);
      el.innerHTML = words.map(function(w){
        return '<span class="vd-w" style="display:inline-block;white-space:nowrap;margin-right:.28em">' + w + '</span>';
      }).join('');
      var spans = Array.from(el.querySelectorAll('.vd-w'));
      var lines = [];
      var currentLine = [];
      var lastTop = -9999;
      spans.forEach(function(span){
        var top = span.getBoundingClientRect().top;
        if(Math.abs(top - lastTop) > 4 && currentLine.length){
          lines.push(currentLine);
          currentLine = [];
        }
        currentLine.push(span);
        lastTop = top;
      });
      if(currentLine.length) lines.push(currentLine);

      // Wrap each line group in a container
      el.innerHTML = '';
      var linesClass = opts.linesClass || 'vd-line';
      lines.forEach(function(lineSpans){
        var lineEl = document.createElement('div');
        lineEl.className = linesClass;
        lineEl.style.cssText = 'display:block;';
        lineSpans.forEach(function(s){ lineEl.appendChild(s); });
        el.appendChild(lineEl);
      });
      self.lines = Array.from(el.querySelectorAll('.' + linesClass));
    }
    return this;
  }
  window.VivaceSplit = VivaceSplit;
  // Alias so code works with both
  if(typeof window.SplitText === 'undefined'){
    window.SplitText = function(el, opts){ return new VivaceSplit(el, opts); };
  }
})();
        `}} />
      </head>
      <body>
        <div id="page-transition"></div>
        <div id="scroll-progress"></div>
        {children}
        <script src="/static/i18n.js"></script>
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})
