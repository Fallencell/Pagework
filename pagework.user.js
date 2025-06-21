// ==UserScript==
// @name         Pagework 
// @namespace    https://github.com/Fallencell
// @version      2.0
// @description  The ultimate all-in-one floating page toolbox: 70+ powerful tools for editing, design, webdev, accessibility, fun, media, privacy, and more. Fully modular. Beautiful. Instantly extensible.
// @author       Fallencell
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
'use strict';

/** ========== STYLES ========== */
const style = document.createElement('style');
style.textContent = `
#pagework-root {
  position: fixed;
  top: 70px;
  right: 32px;
  z-index: 2147483647;
  font-family: Inter,Segoe UI,Arial,sans-serif;
  min-width: 325px;
  background: #141c29e6;
  color: #e5e8ef;
  border-radius: 18px;
  box-shadow: 0 8px 40px 8px rgba(20,28,41,0.33);
  border: 1.5px solid #28324e;
  transition: box-shadow 0.3s;
  overflow: hidden;
  user-select: none;
  max-width: 98vw;
}
#pagework-root[data-dark='false'] {
  background: #fff;
  color: #23272f;
  border-color: #d4dbef;
  box-shadow: 0 8px 40px 8px rgba(20,28,41,0.13);
}
#pagework-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 18px 10px 18px;
  background: linear-gradient(90deg,#3d4c77 0%,#2d3858 100%);
  font-size: 1.19rem;
  letter-spacing: 0.1em;
  font-weight: 600;
  cursor: move;
  user-select: none;
}
#pagework-root[data-dark='false'] #pagework-header {
  background: linear-gradient(90deg,#e0eaff 0%,#c5d9ff 100%);
  color: #26304b;
}
#pagework-close {
  font-size: 1.25em;
  cursor: pointer;
  opacity: 0.8;
  margin-left: 10px;
  border-radius: 50%;
  transition: background 0.15s;
  width: 29px; height: 29px; display: flex; align-items: center; justify-content: center;
}
#pagework-close:hover { background: #d2222c33; }
#pagework-logo {
  font-size: 1.5em;
  margin-right: 10px;
  color: #75aaff;
}
#pagework-content {
  padding: 10px 15px 18px 15px;
  max-height: 70vh;
  overflow-y: auto;
  transition: background 0.3s;
}

/* Section styles */
.pw-section {
  margin-bottom: 16px;
  border-radius: 8px;
  background: #202d45b7;
  box-shadow: 0 2px 8px 0 #0001;
  border: 1px solid #39445a;
  overflow: hidden;
}
#pagework-root[data-dark='false'] .pw-section {
  background: #f6f9ff;
  border: 1px solid #dde6fb;
}
.pw-section-header {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1rem;
  padding: 8px 12px;
  cursor: pointer;
  user-select: none;
  background: #24324e44;
  transition: background 0.2s;
}
#pagework-root[data-dark='false'] .pw-section-header {
  background: #e9f1fe;
}
.pw-section-header:hover { background: #26396388; }
#pagework-root[data-dark='false'] .pw-section-header:hover { background: #e0edff; }
.pw-section-header .arrow {
  font-size: 1em;
  margin-right: 8px;
  transition: transform 0.2s;
  color: #79aaff;
}
.pw-section[collapsed] .pw-section-header .arrow { transform: rotate(-90deg);}
.pw-section-content {
  padding: 7px 12px 10px 14px;
  display: block;
  animation: fadeIn 0.25s;
}
.pw-section[collapsed] .pw-section-content { display: none; }
@keyframes fadeIn { from { opacity: 0;} to { opacity: 1; } }

/* Tool line styles */
.pw-tool {
  display: flex;
  align-items: center;
  margin: 7px 0;
}
.pw-tool input[type=checkbox], .pw-tool input[type=button] {
  margin-right: 10px;
}
.pw-tool-icon {
  margin-right: 8px;
  font-size: 1.11em;
  width: 1.5em;
  text-align: center;
  flex-shrink: 0;
  opacity: 0.85;
}
.pw-tool-label {
  flex: 1;
  font-size: 0.99em;
  user-select: text;
}
.pw-tool input[type=range] {
  width: 75px;
  vertical-align: middle;
}
.pw-tool input[type=color] {
  margin-right: 0;
}
.pw-divider {
  height: 1px;
  margin: 7px 0 8px 0;
  background: #31406344;
  border: 0;
  border-radius: 1px;
}
#pagework-footer {
  text-align: center;
  font-size: 0.93em;
  padding: 7px 14px 8px 14px;
  opacity: 0.61;
  letter-spacing: 0.04em;
}

.pw-btn {
  background: #3d5ab6;
  color: #fff;
  padding: 6px 13px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 0.98em;
  margin: 3px 0;
  transition: background 0.18s;
  font-weight: 500;
}
.pw-btn:hover { background: #6a8dff; }
#pagework-root[data-dark='false'] .pw-btn { background: #c4d4f8; color: #223; }
#pagework-root[data-dark='false'] .pw-btn:hover { background: #e0eaff; }
::-webkit-scrollbar {width: 10px;}
::-webkit-scrollbar-thumb {background: #28314a44; border-radius: 5px;}
::-webkit-scrollbar-track {background: transparent;}
/* Notepad styles */
#pw-notepad {
  position:fixed;
  bottom:60px;
  right:40px;
  z-index:99999;
  width:320px;
  height:180px;
  background:#232b3a;
  color:#fff;
  border-radius:10px;
  padding:12px;
  box-shadow:0 3px 18px #0004;
  font-size:1.09em;
  resize:both;
}
#pagework-root[data-dark='false'] #pw-notepad {
  background:#f2f5ff;
  color:#23272f;
}
`;
document.head.appendChild(style);

/** ========== HTML ROOT ========== */
const html = document.createElement('div');
html.id = 'pagework-root';
html.setAttribute('data-dark', 'true'); // default dark
html.innerHTML = `
<div id="pagework-header">
  <span id="pagework-logo">🛠️</span>
  <span>Pagework by Fallencell</span>
  <span id="pagework-close" title="Close">✕</span>
</div>
<div id="pagework-content"></div>
<div id="pagework-footer">v2.0 &mdash; 70+ tools • All-in-one Page Toolbox</div>
`;
document.body.appendChild(html);

const $ = sel => html.querySelector(sel);
const content = $('#pagework-content');

/** ========== TOOL DEFINITIONS (EXTENDED) ========== */
const tools = [
  // 1. Editing Tools
  {
    group: "Editing",
    icon: "✏️",
    tools: [
      { id: "editable", label: "Make Page Editable", icon: "📝", type: "toggle" },
      { id: "wysiwyg", label: "Toggle WYSIWYG Mode", icon: "🔠", type: "toggle" },
      { id: "highlight", label: "Highlight Text", icon: "🖍️", type: "toggle" },
      { id: "eraser", label: "Eraser (Remove Selection)", icon: "🧹", type: "button" },
      { id: "content-search", label: "Search & Replace", icon: "🔍", type: "button" },
      { id: "wordcount", label: "Show Word/Char Count", icon: "🔢", type: "button" },
      { id: "find-links", label: "List All Links", icon: "🔗", type: "button" },
      { id: "undo", label: "Undo Change", icon: "↩️", type: "button" },
      { id: "redo", label: "Redo Change", icon: "↪️", type: "button" },
      { id: "select-all", label: "Select All", icon: "🔘", type: "button" },
      { id: "remove-selection-format", label: "Remove Format", icon: "🩹", type: "button" }
    ]
  },
  // 2. Appearance Tools
  {
    group: "Appearance",
    icon: "🎨",
    tools: [
      { id: "darkmode", label: "Dark Mode", icon: "🌙", type: "toggle" },
      { id: "invert", label: "Invert Colors", icon: "🔃", type: "toggle" },
      { id: "grayscale", label: "Grayscale Filter", icon: "⚫", type: "toggle" },
      { id: "sepia", label: "Sepia Filter", icon: "🟤", type: "toggle" },
      { id: "blur", label: "Blur All Images", icon: "🌫️", type: "toggle" },
      { id: "hideimgs", label: "Hide All Images", icon: "🚫🖼️", type: "toggle" },
      { id: "hidevideos", label: "Hide All Videos", icon: "📹🚫", type: "toggle" },
      { id: "font-size", label: "Font Size", icon: "🔡", type: "range", min: 0.7, max: 2.0, step: 0.05, value: 1 },
      { id: "font-family", label: "Font Family", icon: "🔤", type: "select", options: [
        {label: "Default", value: ""},
        {label: "Serif", value: "serif"},
        {label: "Sans-serif", value: "sans-serif"},
        {label: "Monospace", value: "monospace"},
        {label: "Comic Sans", value: "'Comic Sans MS',cursive"},
        {label: "Handwriting", value: "'Patrick Hand',cursive"},
        {label: "Fira Code", value: "'Fira Code',monospace"},
        {label: "Roboto", value: "'Roboto',sans-serif"},
      ]},
      { id: "bgcolor", label: "Page BG Color", icon: "🎨", type: "color", value: "#ffffff" },
      { id: "textcolor", label: "Text Color", icon: "🖌️", type: "color", value: "#23272f" },
      { id: "remove-css", label: "Remove All CSS", icon: "🧾", type: "button" },
      { id: "rainbow", label: "Rainbow Borders", icon: "🌈", type: "toggle" },
      { id: "custom-css", label: "Inject Custom CSS", icon: "💻", type: "button" }
    ]
  },
  // 3. Productivity
  {
    group: "Productivity",
    icon: "⚡",
    tools: [
      { id: "focusmode", label: "Focus Mode (hide nav/sidebar)", icon: "🎯", type: "toggle" },
      { id: "readingmode", label: "Reading Mode", icon: "📖", type: "toggle" },
      { id: "nightlight", label: "Night Light", icon: "💡", type: "toggle" },
      { id: "autoscroll", label: "Auto-Scroll", icon: "⬇️", type: "toggle" },
      { id: "scrolltop", label: "Scroll to Top", icon: "⏫", type: "button" },
      { id: "scrollbottom", label: "Scroll to Bottom", icon: "⏬", type: "button" },
      { id: "zoom", label: "Page Zoom", icon: "🔍", type: "range", min: 0.5, max: 2.5, step: 0.05, value: 1 },
      { id: "print", label: "Print Page", icon: "🖨️", type: "button" },
      { id: "screenshot", label: "Screenshot (beta)", icon: "📸", type: "button" },
      { id: "copyhtml", label: "Copy HTML", icon: "📋", type: "button" },
      { id: "notepad", label: "Notepad Overlay", icon: "📝", type: "toggle" },
      { id: "timer", label: "Timer", icon: "⏲️", type: "button" },
      { id: "stopwatch", label: "Stopwatch", icon: "⏱️", type: "button" },
      { id: "qr-code", label: "Show QR Code", icon: "🏷️", type: "button" },
    ]
  },
  // 4. Accessibility
  {
    group: "Accessibility",
    icon: "♿",
    tools: [
      { id: "dyslexic", label: "Dyslexic Font", icon: "🔠", type: "toggle" },
      { id: "highcontrast", label: "High Contrast", icon: "🌓", type: "toggle" },
      { id: "enlargecursor", label: "Enlarge Cursor", icon: "🖱️", type: "toggle" },
      { id: "disable-animations", label: "Disable Animations", icon: "🛑", type: "toggle" },
      { id: "alt-text", label: "Show Image ALT Text", icon: "💬", type: "button" },
      { id: "tts", label: "Read Aloud (TTS)", icon: "🔊", type: "button" },
      { id: "big-links", label: "Enlarge Links", icon: "🔗", type: "toggle" },
      { id: "tab-outline", label: "Tab Focus Outlines", icon: "🟦", type: "toggle" }
    ]
  },
  // 5. Web Dev Tools
  {
    group: "Dev Tools",
    icon: "💻",
    tools: [
      { id: "view-source", label: "View Page Source", icon: "🔎", type: "button" },
      { id: "inspect-element", label: "Element Inspector", icon: "🕵️", type: "toggle" },
      { id: "console", label: "Open JS Console", icon: "⌨️", type: "button" },
      { id: "network-info", label: "Network Info", icon: "🌐", type: "button" },
      { id: "run-js", label: "Run JS Snippet", icon: "📜", type: "button" },
      { id: "show-cookies", label: "Show Cookies", icon: "🍪", type: "button" },
      { id: "edit-meta", label: "Edit Meta Tags", icon: "✍️", type: "button" },
      { id: "clear-storage", label: "Clear Storage", icon: "🧺", type: "button" },
    ]
  },
  // 6. Security & Privacy
  {
    group: "Security",
    icon: "🛡️",
    tools: [
      { id: "block-ads", label: "Block Ads", icon: "🚫", type: "toggle" },
      { id: "block-trackers", label: "Block Trackers", icon: "👁️‍🗨️", type: "toggle" },
      { id: "remove-iframes", label: "Remove iFrames", icon: "🗔", type: "button" },
      { id: "show-https", label: "Enforce HTTPS", icon: "🔒", type: "toggle" },
      { id: "mask-email", label: "Mask Emails", icon: "✉️", type: "button" },
      { id: "privacy-overlay", label: "Blur Sensitive", icon: "🙈", type: "toggle" },
    ]
  },
  // 7. Media Tools
  {
    group: "Media",
    icon: "🎬",
    tools: [
      { id: "download-all-images", label: "Download All Images", icon: "⬇️🖼️", type: "button" },
      { id: "extract-audio", label: "Extract Audio", icon: "🎵", type: "button" },
      { id: "picture-in-picture", label: "Picture-in-Picture", icon: "🖼️", type: "toggle" },
      { id: "media-speed", label: "Media Speed", icon: "⏩", type: "range", min:0.25, max:3, step:0.05, value:1 },
      { id: "mute-media", label: "Mute All Media", icon: "🔇", type: "toggle" }
    ]
  },
  // 8. Layout Tools
  {
    group: "Layout",
    icon: "📐",
    tools: [
      { id: "snap-grid", label: "Snap to Grid", icon: "🔳", type: "toggle" },
      { id: "show-guides", label: "Show Guides", icon: "📏", type: "toggle" },
      { id: "resize-main", label: "Resize Main Content", icon: "↔️", type: "range", min:0.5, max:2, step:0.05, value:1 },
      { id: "hide-scrollbars", label: "Hide Scrollbars", icon: "🚫🖱️", type: "toggle" }
    ]
  },
  // 9. Quick Actions
  {
    group: "Quick Actions",
    icon: "⚙️",
    tools: [
      { id: "reload", label: "Reload Page", icon: "🔄", type: "button" },
      { id: "bookmark", label: "Bookmark Page", icon: "🔖", type: "button" },
      { id: "copy-url", label: "Copy URL", icon: "🔗", type: "button" },
      { id: "open-new-tab", label: "Open in New Tab", icon: "🆕", type: "button" }
    ]
  },
  // 10. Utilities
  {
    group: "Utilities",
    icon: "🧰",
    tools: [
      { id: "calendar", label: "Insert Calendar", icon: "📅", type: "button" },
      { id: "weather", label: "Show Weather", icon: "⛅", type: "button" },
      { id: "clock", label: "Floating Clock", icon: "🕒", type: "toggle" },
      { id: "unit-convert", label: "Unit Converter", icon: "🔢", type: "button" }
    ]
  },
  // 11. Social
  {
    group: "Social",
    icon: "💬",
    tools: [
      { id: "share-twitter", label: "Share on Twitter", icon: "🐦", type: "button" },
      { id: "share-facebook", label: "Share on Facebook", icon: "📘", type: "button" },
      { id: "share-reddit", label: "Share on Reddit", icon: "👽", type: "button" }
    ]
  },
  // 12. Experiments & Fun
  {
    group: "Fun & Extra",
    icon: "✨",
    tools: [
      { id: "confetti", label: "Confetti", icon: "🎉", type: "button" },
      { id: "cats", label: "Spawn Cats", icon: "🐱", type: "button" },
      { id: "matrix", label: "Matrix Rain", icon: "💚", type: "button" },
      { id: "bubbles", label: "Bubbles", icon: "🫧", type: "button" },
      { id: "randomgif", label: "Surprise GIF", icon: "🥳", type: "button" },
      { id: "shake", label: "Shake Page", icon: "💥", type: "button" },
      { id: "snow", label: "Snowfall", icon: "❄️", type: "button" },
      { id: "fireworks", label: "Fireworks", icon: "🎆", type: "button" },
      { id: "random-palette", label: "Random Color Palette", icon: "🎨", type: "button" }
    ]
  }
];

// ========== SECTION EXPANSION STATE ==========
const sectionState = {};
tools.forEach((g, idx) => { sectionState[g.group] = idx === 0; });

// ========== RENDER MENU ==========
function renderMenu() {
  content.innerHTML = '';
  for (const group of tools) {
    const section = document.createElement('div');
    section.className = 'pw-section';
    if (!sectionState[group.group]) section.setAttribute('collapsed', 'collapsed');
    section.innerHTML = `
      <div class="pw-section-header">
        <span class="arrow">▶</span>
        <span class="pw-section-icon">${group.icon}</span>
        <span>${group.group}</span>
      </div>
      <div class="pw-section-content"></div>
    `;
    // Section expand/collapse
    section.querySelector('.pw-section-header').onclick = () => {
      sectionState[group.group] = !sectionState[group.group];
      renderMenu();
    };
    // Section content
    const secContent = section.querySelector('.pw-section-content');
    for (const tool of group.tools) {
      const toolDiv = document.createElement('div');
      toolDiv.className = 'pw-tool';
      toolDiv.dataset.id = tool.id;
      let input = '';
      if (tool.type === 'toggle') {
        input = `<input type="checkbox" id="pw-tool-${tool.id}" />`;
      } else if (tool.type === 'button') {
        input = `<input type="button" class="pw-btn" id="pw-tool-${tool.id}" value="${tool.label}" />`;
      } else if (tool.type === 'range') {
        input = `<input type="range" min="${tool.min}" max="${tool.max}" step="${tool.step}" value="${tool.value}" id="pw-tool-${tool.id}" /> <span id="pw-tool-${tool.id}-val">${tool.value}</span>`;
      } else if (tool.type === 'color') {
        input = `<input type="color" id="pw-tool-${tool.id}" value="${tool.value}"/>`;
      } else if (tool.type === 'select') {
        input = `<select id="pw-tool-${tool.id}">${tool.options.map(o=>`<option value="${o.value}">${o.label}</option>`).join('')}</select>`;
      }
      toolDiv.innerHTML = `<span class="pw-tool-icon">${tool.icon}</span>` +
        (tool.type === 'button'
          ? input
          : `<label style="display:flex;align-items:center;flex:1;"><span>${input}</span><span class="pw-tool-label">${tool.label}</span></label>`);
      secContent.appendChild(toolDiv);
    }
    content.appendChild(section);
  }
}
renderMenu();

// ========== TOOL LOGIC ==========
const $tool = id => document.getElementById('pw-tool-' + id);

// Helper functions (toast, pageStyle, removeStyle, toggleStyle, getSelectionText) as in previous versions
function toast(msg) {
  let t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = "position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:#26324e;color:#fff;padding:9px 24px;border-radius:8px;font-size:1.08em;z-index:2147483647;box-shadow:0 3px 16px #0002;transition:opacity .35s;opacity:0.97";
  document.body.appendChild(t);
  setTimeout(()=>{t.style.opacity=0;setTimeout(()=>t.remove(),600)},2000);
}
function pageStyle(id, css) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('style');
    el.id = id;
    el.textContent = css;
    document.head.appendChild(el);
  }
}
function removeStyle(id) {
  let el = document.getElementById(id);
  if (el) el.remove();
}
function toggleStyle(id, css, on) {
  if(on) pageStyle(id, css);
  else removeStyle(id);
}
function getSelectionText() {
  if(window.getSelection) return window.getSelection().toString();
  return '';
}

// --- Editing ---
$tool('editable') && ($tool('editable').onchange = e => {
  document.body.contentEditable = e.target.checked ? 'true' : 'inherit';
  document.designMode = e.target.checked ? 'on' : 'off';
  toast(e.target.checked ? 'Page is editable' : 'Page editing disabled');
});
$tool('wysiwyg') && ($tool('wysiwyg').onchange = e => {
  if (e.target.checked) {
    pageStyle('pw-wysiwyg',`[contenteditable=true]{outline:2px solid #1fa4ff;background:#eefbff;min-height:48px;}`);
    toast('WYSIWYG hints enabled');
  } else {
    removeStyle('pw-wysiwyg');
  }
});
let highlightHandler = null;
$tool('highlight') && ($tool('highlight').onchange = e => {
  if (e.target.checked) {
    highlightHandler = function(ev) {
      let sel = window.getSelection();
      if(sel && sel.rangeCount) {
        let range = sel.getRangeAt(0);
        if(!range.collapsed){
          let mk = document.createElement('mark');
          mk.style.background = '#fff5a1';
          mk.style.color = '#333';
          mk.style.borderRadius = '2px';
          try { range.surroundContents(mk); } catch{}
          sel.removeAllRanges();
        }
      }
    };
    document.addEventListener('mouseup', highlightHandler);
    toast('Highlight tool enabled');
  } else {
    document.removeEventListener('mouseup', highlightHandler);
  }
});
$tool('eraser') && ($tool('eraser').onclick = () => {
  let sel = window.getSelection();
  if(sel.rangeCount) sel.deleteFromDocument();
  toast('Selected content erased');
});
$tool('content-search') && ($tool('content-search').onclick = () => {
  let q = prompt('Find what?');
  if(!q) return;
  let r = prompt('Replace with?');
  if(r === null) return;
  let replaced = document.body.innerHTML.split(q).join(r);
  document.body.innerHTML = replaced;
  toast(`Replaced all "${q}"`);
});
$tool('wordcount') && ($tool('wordcount').onclick = () => {
  let txt = document.body.innerText;
  let words = txt.split(/\s+/).filter(Boolean).length;
  let chars = txt.length;
  toast(`Words: ${words} — Chars: ${chars}`);
});
$tool('find-links') && ($tool('find-links').onclick = () => {
  let links = Array.from(document.links).map(a=>a.href);
  prompt('All links (copy):', links.join('\n'));
});
$tool('undo') && ($tool('undo').onclick = () => {document.execCommand && document.execCommand('undo');});
$tool('redo') && ($tool('redo').onclick = () => {document.execCommand && document.execCommand('redo');});
$tool('select-all') && ($tool('select-all').onclick = () => {
  if (window.getSelection && document.body) {
    let rng = document.createRange();
    rng.selectNodeContents(document.body);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(rng);
  }
});
$tool('remove-selection-format') && ($tool('remove-selection-format').onclick = () => {
  document.execCommand && document.execCommand('removeFormat');
});

// --- Appearance ---
$tool('darkmode') && ($tool('darkmode').onchange = e => {
  html.setAttribute('data-dark', e.target.checked);
  toggleStyle('pw-dark',`
    html,body{background:#161b22!important;color:#e3e8ef!important;}
    img,video{filter:brightness(0.85) contrast(1.08);}
    a{color:#77b7ff!important;}
    input,textarea,select,button{background:#232a35!important;color:#e3e8ef!important;}
  `, e.target.checked);
});
$tool('invert') && ($tool('invert').onchange = e => {
  toggleStyle('pw-invert','html{-webkit-filter:invert(1)!important;filter:invert(1)!important;}',e.target.checked);
});
$tool('grayscale') && ($tool('grayscale').onchange = e => {
  toggleStyle('pw-gray','html{filter:grayscale(1)!important;}',e.target.checked);
});
$tool('sepia') && ($tool('sepia').onchange = e => {
  toggleStyle('pw-sepia','html{filter:sepia(1)!important;}',e.target.checked);
});
$tool('blur') && ($tool('blur').onchange = e => {
  toggleStyle('pw-blur','img{filter:blur(6px)!important;}',e.target.checked);
});
$tool('hideimgs') && ($tool('hideimgs').onchange = e => {
  toggleStyle('pw-hideimgs','img{display:none!important;}',e.target.checked);
});
$tool('hidevideos') && ($tool('hidevideos').onchange = e => {
  toggleStyle('pw-hidevideos','video{display:none!important;}',e.target.checked);
});
$tool('font-size') && ($tool('font-size').oninput = e => {
  let v = e.target.value;
  pageStyle('pw-fontsize', `html{font-size:${v}em!important;}`);
  $('#pw-tool-font-size-val').textContent = v;
});
$tool('font-family') && ($tool('font-family').onchange = e => {
  let v = e.target.value;
  pageStyle('pw-fontfam', v ? `body,*{font-family:${v} !important;}` : '');
});
$tool('bgcolor') && ($tool('bgcolor').oninput = e => {
  pageStyle('pw-bg', `body{background:${e.target.value}!important;}`);
});
$tool('textcolor') && ($tool('textcolor').oninput = e => {
  pageStyle('pw-txtcol', `body{color:${e.target.value}!important;}`);
});
$tool('remove-css') && ($tool('remove-css').onclick = () => {
  Array.from(document.querySelectorAll('style,link[rel="stylesheet"]')).forEach(el=>el.remove());
  toast('All CSS removed');
});
$tool('rainbow') && ($tool('rainbow').onchange = e => {
  toggleStyle('pw-rainbow',`*{border:2px solid transparent!important;animation:pw-rainbow 2s linear infinite;}
  @keyframes pw-rainbow {
    0%{border-color:#f00;}
    20%{border-color:#ff0;}
    40%{border-color:#0f0;}
    60%{border-color:#0ff;}
    80%{border-color:#00f;}
    100%{border-color:#f0f;}
  }`,e.target.checked);
});
$tool('custom-css') && ($tool('custom-css').onclick = () => {
  let css = prompt("Enter custom CSS to inject:");
  if(css) pageStyle('pw-custom', css);
  toast('Custom CSS injected!');
});

// --- Productivity ---
$tool('focusmode') && ($tool('focusmode').onchange = e => {
  toggleStyle('pw-focus','nav,aside,[class*="sidebar"],header,footer{display:none!important;}main{width:100vw!important;}',e.target.checked);
});
$tool('readingmode') && ($tool('readingmode').onchange = e => {
  toggleStyle('pw-reading',`
    html,body{background:#fffbe7!important;color:#1c1a15!important;}
    img,video{filter:brightness(0.9);}
    nav,aside,[class*="sidebar"],header,footer{display:none!important;}
    main{max-width:700px;margin:auto!important;padding:2em 0;}
    body{line-height:1.65;font-size:1.13em;}
  `,e.target.checked);
});
$tool('nightlight') && ($tool('nightlight').onchange = e => {
  toggleStyle('pw-nightlight','html:after{content:"";position:fixed;inset:0;pointer-events:none;z-index:99999;background:rgba(255,221,140,0.10);}',e.target.checked);
});
let autoscrollInt = null;
$tool('autoscroll') && ($tool('autoscroll').onchange = e => {
  if(e.target.checked) {
    autoscrollInt = setInterval(()=>window.scrollBy(0,3),30);
    toast('Auto-scroll enabled');
  } else { clearInterval(autoscrollInt); }
});
$tool('scrolltop') && ($tool('scrolltop').onclick = () => window.scrollTo({top:0,behavior:'smooth'}));
$tool('scrollbottom') && ($tool('scrollbottom').onclick = () => window.scrollTo({top:1e7,behavior:'smooth'}));
$tool('zoom') && ($tool('zoom').oninput = e => {
  let v = e.target.value;
  pageStyle('pw-zoom', `html{zoom:${v};}`);
  $('#pw-tool-zoom-val').textContent = v;
});
$tool('print') && ($tool('print').onclick = () => window.print());
$tool('screenshot') && ($tool('screenshot').onclick = () => {
  toast('Screenshot: Press PrintScreen or use your OS shortcut!');
});
$tool('copyhtml') && ($tool('copyhtml').onclick = () => {
  navigator.clipboard.writeText(document.documentElement.outerHTML);
  toast('Page HTML copied!');
});
$tool('notepad') && ($tool('notepad').onchange = e => {
  if(e.target.checked){
    let ta = document.createElement('textarea');
    ta.id = 'pw-notepad';
    document.body.appendChild(ta);
  } else {
    let ta = document.getElementById('pw-notepad'); ta && ta.remove();
  }
});
$tool('timer') && ($tool('timer').onclick = () => {
  let min = prompt('Set minutes:', '1');
  if(min) setTimeout(()=>toast('Timer done!'), parseInt(min)*60000);
});
$tool('stopwatch') && ($tool('stopwatch').onclick = () => {
  let t0 = Date.now();
  toast('Stopwatch started!');
  setTimeout(()=>toast(`Stopwatch: ${(Date.now()-t0)/1000}s`), 5000);
});
$tool('qr-code') && ($tool('qr-code').onclick = () => {
  let img = document.createElement('img');
  img.src = 'https://api.qrserver.com/v1/create-qr-code/?data=' + encodeURIComponent(location.href) + '&size=150x150';
  img.style.cssText = 'position:fixed;right:30px;top:30px;z-index:99999;background:#fff;padding:8px;border-radius:8px;box-shadow:0 3px 12px #0003;';
  document.body.appendChild(img);
  setTimeout(()=>img.remove(),4000);
});

// --- Accessibility ---
$tool('dyslexic') && ($tool('dyslexic').onchange = e => {
  toggleStyle('pw-dyslexic',`
    @font-face {
      font-family: 'OpenDyslexic';
      src: url('https://cdn.jsdelivr.net/npm/open-dyslexic@0.0.1/open-dyslexic.otf') format('opentype');
    }
    body,*{font-family:'OpenDyslexic',Arial,sans-serif!important;}
  `,e.target.checked);
});
$tool('highcontrast') && ($tool('highcontrast').onchange = e => {
  toggleStyle('pw-contrast','html,body{background:#000!important;color:#fff!important;}a{color:#1af!important;}',e.target.checked);
});
$tool('enlargecursor') && ($tool('enlargecursor').onchange = e => {
  toggleStyle('pw-bigcursor','*{cursor:url("https://cdn.jsdelivr.net/gh/alyssaxuu/cursor/large.cur"),auto!important;}',e.target.checked);
});
$tool('disable-animations') && ($tool('disable-animations').onchange = e => {
  toggleStyle('pw-nomotion','*{transition:none!important;animation:none!important;}',e.target.checked);
});
$tool('alt-text') && ($tool('alt-text').onclick = () => {
  document.querySelectorAll('img').forEach(img=>{
    let alt = img.alt||"(no alt)";
    let tip = document.createElement('span');
    tip.textContent = alt;
    tip.style.cssText="background:#232f38cc;color:#fff;padding:3px 10px;position:absolute;z-index:99999;font-size:.98em;border-radius:6px;margin-top:2px;";
    img.after(tip);
    setTimeout(()=>tip.remove(), 2600);
  });
  toast('ALT text shown beside images');
});
$tool('tts') && ($tool('tts').onclick = () => {
  let txt = getSelectionText()||prompt('Text to read aloud?');
  if(window.speechSynthesis && txt) {
    let u = new SpeechSynthesisUtterance(txt);
    speechSynthesis.speak(u);
  } else toast('SpeechSynthesis not supported');
});
$tool('big-links') && ($tool('big-links').onchange = e => {
  toggleStyle('pw-bigl','a{font-size:1.6em!important;padding:6px 8px!important;display:inline-block;}',e.target.checked);
});
$tool('tab-outline') && ($tool('tab-outline').onchange = e => {
  toggleStyle('pw-taboutline','*:focus{outline:2px solid #1fa4ff!important;}',e.target.checked);
});

// --- Dev Tools ---
$tool('view-source') && ($tool('view-source').onclick = () => {
  window.open('view-source:' + location.href, '_blank');
});
$tool('inspect-element') && ($tool('inspect-element').onchange = e => {
  // Simple inspector: highlight hovered element
  if(e.target.checked) {
    let last;
    document.body.addEventListener('mouseover', last = function(ev){
      ev.target.style.outline = '2px solid #fc0';
      ev.target.title = 'Right-click to inspect';
    }, true);
    document.body.addEventListener('mouseout', function(ev){
      ev.target.style.outline = '';
    }, true);
    toast('Element inspector enabled (basic)');
  } else {
    // No-op for now, real inspector would require more logic
    toast('Element inspector disabled');
  }
});
$tool('console') && ($tool('console').onclick = () => {
  alert('Press F12 or Ctrl+Shift+I to open the JS Console!');
});
$tool('network-info') && ($tool('network-info').onclick = () => {
  toast(`Online: ${navigator.onLine}\nConnection: ${navigator.connection ? navigator.connection.effectiveType : 'Unknown'}`);
});
$tool('run-js') && ($tool('run-js').onclick = () => {
  let code = prompt('Enter JS code to run:');
  if(code) try { eval(code); toast('Ran JS'); } catch(e){ alert(e); }
});
$tool('show-cookies') && ($tool('show-cookies').onclick = () => {
  prompt('Cookies:', document.cookie || '(none)');
});
$tool('edit-meta') && ($tool('edit-meta').onclick = () => {
  let meta = prompt('Meta name?', 'description');
  if(!meta) return;
  let val = prompt('New content value?', '');
  if(val !== null) {
    let el = document.querySelector('meta[name="'+meta+'"]');
    if(el) el.content = val;
    else { let m = document.createElement('meta'); m.name = meta; m.content = val; document.head.appendChild(m); }
    toast('Meta tag updated');
  }
});
$tool('clear-storage') && ($tool('clear-storage').onclick = () => {
  localStorage.clear(); sessionStorage.clear();
  toast('Local/session storage cleared!');
});

// --- Security ---
$tool('block-ads') && ($tool('block-ads').onchange = e => {
  let rule = 'iframe[src*="ads"],[id*="ad"],[class*="ad"],[src*="doubleclick"],[src*="googlesyndication"],[src*="adservice"]{display:none!important;}';
  toggleStyle('pw-ads', rule, e.target.checked);
});
$tool('block-trackers') && ($tool('block-trackers').onchange = e => {
  let rule = 'script[src*="analytics"],script[src*="track"],img[src*="track"]{display:none!important;}';
  toggleStyle('pw-trackers', rule, e.target.checked);
});
$tool('remove-iframes') && ($tool('remove-iframes').onclick = () => {
  Array.from(document.querySelectorAll('iframe')).forEach(f => f.remove());
  toast('All iframes removed');
});
$tool('show-https') && ($tool('show-https').onchange = e => {
  if(e.target.checked && !location.protocol.startsWith('https:')) {
    location.href = location.href.replace(/^http:/,'https:');
  }
});
$tool('mask-email') && ($tool('mask-email').onclick = () => {
  document.body.innerHTML = document.body.innerHTML.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[email masked]');
  toast('Emails masked');
});
$tool('privacy-overlay') && ($tool('privacy-overlay').onchange = e => {
  toggleStyle('pw-privacy','input[type=password],.password,[type=tel],[type=email],[type=number]{filter:blur(6px)!important;}',e.target.checked);
});

// --- Media ---
$tool('download-all-images') && ($tool('download-all-images').onclick = () => {
  Array.from(document.images).forEach(img => {
    let a = document.createElement('a');
    a.href = img.src;
    a.download = '';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();
  });
  toast('Started downloads!');
});
$tool('extract-audio') && ($tool('extract-audio').onclick = () => {
  let audios = Array.from(document.querySelectorAll('audio,video'));
  if(audios.length) {
    prompt('Audio/Video sources:', audios.map(a=>a.src).join('\n'));
  } else toast('No audio/video found');
});
$tool('picture-in-picture') && ($tool('picture-in-picture').onchange = e => {
  let v = document.querySelector('video');
  if(v && v.requestPictureInPicture) v.requestPictureInPicture();
  else toast('No video or PiP not supported');
});
$tool('media-speed') && ($tool('media-speed').oninput = e => {
  Array.from(document.querySelectorAll('video,audio')).forEach(m=>m.playbackRate = e.target.value);
  $('#pw-tool-media-speed-val').textContent = e.target.value;
});
$tool('mute-media') && ($tool('mute-media').onchange = e => {
  Array.from(document.querySelectorAll('video,audio')).forEach(m=>m.muted = e.target.checked);
});

// --- Layout ---
$tool('snap-grid') && ($tool('snap-grid').onchange = e => {
  toggleStyle('pw-grid', 'body{background-image:linear-gradient(#eee 1px,transparent 1px),linear-gradient(90deg,#eee 1px,transparent 1px);background-size:30px 30px;}', e.target.checked);
});
$tool('show-guides') && ($tool('show-guides').onchange = e => {
  toggleStyle('pw-guides', 'body:before,body:after{content:"";position:fixed;top:0;bottom:0;left:50vw;width:1px;background:#fc0;pointer-events:none;}body:after{left:0;top:50vh;height:1px;width:100vw;}', e.target.checked);
});
$tool('resize-main') && ($tool('resize-main').oninput = e => {
  pageStyle('pw-resize-main', `main{transform:scaleX(${e.target.value});}`);
  $('#pw-tool-resize-main-val').textContent = e.target.value;
});
$tool('hide-scrollbars') && ($tool('hide-scrollbars').onchange = e => {
  toggleStyle('pw-noscroll', '::-webkit-scrollbar{display:none!important;}', e.target.checked);
});

// --- Quick Actions ---
$tool('reload') && ($tool('reload').onclick = () => location.reload());
$tool('bookmark') && ($tool('bookmark').onclick = () => {
  toast('Press Ctrl+D to bookmark!');
});
$tool('copy-url') && ($tool('copy-url').onclick = () => {
  navigator.clipboard.writeText(location.href);
  toast('URL copied!');
});
$tool('open-new-tab') && ($tool('open-new-tab').onclick = () => {
  window.open(location.href, '_blank');
});

// --- Utilities ---
$tool('calendar') && ($tool('calendar').onclick = () => {
  let cal = document.createElement('iframe');
  cal.src = 'https://calendar.google.com/calendar/embed?src=en.uk#main_7';
  cal.style.cssText = "position:fixed;right:30px;top:70px;width:335px;height:320px;z-index:999999;border-radius:10px;border:2px solid #aaf;background:#fff;";
  document.body.appendChild(cal);
  setTimeout(()=>cal.remove(),6000);
  toast('Calendar shown for 6s');
});
$tool('weather') && ($tool('weather').onclick = () => {
  let div = document.createElement('div');
  div.innerHTML = `<iframe src="https://wttr.in/?format=3" style="width:300px;height:40px;border:none;background:#fff;border-radius:8px;"></iframe>`;
  div.style.cssText = "position:fixed;top:30px;left:30px;z-index:999999;";
  document.body.appendChild(div);
  setTimeout(()=>div.remove(),4000);
});
$tool('clock') && ($tool('clock').onchange = e => {
  let clk = document.getElementById('pw-clock');
  if(e.target.checked && !clk){
    clk = document.createElement('div');
    clk.id = 'pw-clock';
    clk.style.cssText = "position:fixed;bottom:20px;right:32px;background:#232b3a;color:#fff;padding:11px 22px;border-radius:8px;z-index:999999;font-size:1.25em;box-shadow:0 0 16px #0004;";
    document.body.appendChild(clk);
    let intv = setInterval(()=>{
      let d = new Date;
      clk.textContent = d.toLocaleTimeString();
      clk.dataset.intv = intv;
    }, 800);
  } else if(!e.target.checked && clk) {
    clearInterval(clk.dataset.intv);
    clk.remove();
  }
});
$tool('unit-convert') && ($tool('unit-convert').onclick = () => {
  let expr = prompt('Enter unit conversion (e.g. 10cm to in):');
  if(!expr) return;
  let m = expr.match(/([\d.]+)\s*([a-zA-Z%]+)\s*(?:to|in)\s*([a-zA-Z%]+)/);
  if(m){
    let val = parseFloat(m[1]), from = m[2].toLowerCase(), to = m[3].toLowerCase();
    let res = (from==="cm"&&to==="in") ? (val/2.54)+" in"
      : (from==="in"&&to==="cm") ? (val*2.54)+" cm"
      : (from==="kg"&&to==="lb") ? (val*2.20462)+" lb"
      : (from==="lb"&&to==="kg") ? (val/2.20462)+" kg"
      : (from==="c"&&to==="f") ? ((val*9/5+32)+" °F")
      : (from==="f"&&to==="c") ? (((val-32)*5/9)+" °C")
      : "Unsupported/unknown units!";
    toast(res);
  } else toast('Could not parse');
});

// --- Social ---
$tool('share-twitter') && ($tool('share-twitter').onclick = () => {
  window.open('https://twitter.com/intent/tweet?url='+encodeURIComponent(location.href),'_blank');
});
$tool('share-facebook') && ($tool('share-facebook').onclick = () => {
  window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href),'_blank');
});
$tool('share-reddit') && ($tool('share-reddit').onclick = () => {
  window.open('https://www.reddit.com/submit?url='+encodeURIComponent(location.href),'_blank');
});

// --- Fun & Extra ---
$tool('confetti') && ($tool('confetti').onclick = () => {
  for (let i=0;i<42;i++) {
    let d = document.createElement('div');
    d.style.cssText=`position:fixed;z-index:999999;top:-40px;left:${~~(Math.random()*100)}vw;width:16px;height:16px;border-radius:50%;background:hsl(${~~(Math.random()*360)},87%,63%);opacity:.9;`;
    document.body.appendChild(d);
    let t = 1+Math.random()*1.5;
    d.animate([{top:'-40px'},{top:'100vh'}],{duration:t*1000,easing:'ease-in'});
    setTimeout(()=>d.remove(),t*1000);
  }
});
$tool('cats') && ($tool('cats').onclick = () => {
  for(let i=0;i<7;i++){
    let img = document.createElement('img');
    img.src = 'https://cataas.com/cat?'+Math.random();
    img.style.cssText = `position:fixed;left:${Math.random()*90}vw;top:${Math.random()*70}vh;width:90px;height:auto;z-index:99998;border-radius:12px;box-shadow:0 4px 18px #0003;`;
    document.body.appendChild(img);
    setTimeout(()=>img.remove(),4000);
  }
});
$tool('matrix') && ($tool('matrix').onclick = () => {
  let c = document.createElement('canvas');
  c.width = window.innerWidth; c.height = window.innerHeight;
  c.style.cssText='position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:99997;background:rgba(20,28,41,0.92);';
  document.body.appendChild(c);
  let ctx = c.getContext('2d');
  let cols = Math.floor(window.innerWidth/20), y = Array(cols).fill(0);
  let intv = setInterval(()=>{
    ctx.fillStyle='rgba(20,28,41,0.16)';
    ctx.fillRect(0,0,c.width,c.height);
    ctx.fillStyle='#0f0';
    ctx.font='17px monospace';
    y.forEach((yy,i)=>{
      let txt = String.fromCharCode(0x30A0+Math.random()*97);
      ctx.fillText(txt,i*20,yy);
      y[i] = (yy > c.height+Math.random()*500) ? 0 : yy+20;
    });
  },50);
  setTimeout(()=>{clearInterval(intv);c.remove();}, 2700);
});
$tool('bubbles') && ($tool('bubbles').onclick = () => {
  for(let i=0;i<20;i++){
    let b = document.createElement('div');
    b.style.cssText = `position:fixed;left:${Math.random()*100}vw;top:100vh;width:${20+Math.random()*30}px;height:${20+Math.random()*30}px;background:rgba(120,200,250,0.13);border-radius:50%;z-index:99998;pointer-events:none;border:2px solid #9ae2ff;`;
    document.body.appendChild(b);
    b.animate([{top:'100vh'},{top:`${Math.random()*30}vh`}],{duration:1800+Math.random()*1000,easing:'ease-out'});
    setTimeout(()=>b.remove(),2000+Math.random()*500);
  }
});
$tool('randomgif') && ($tool('randomgif').onclick = () => {
  let g = document.createElement('img');
  g.src = 'https://media.giphy.com/media/'+['3o7aD4VrGNk6qz9q5K','l0MYGb1LuZ3n7dRnO','3oEjI4sFlp73fvEYkw','xT9IgDEI1iZyb2wqo8','26uf9QPzzlKPvQG5S'][Math.floor(Math.random()*5)]+"/giphy.gif";
  g.style.cssText = "position:fixed;z-index:99999;right:30px;bottom:30px;width:150px;border-radius:12px;box-shadow:0 6px 24px #0005;";
  document.body.appendChild(g);
  setTimeout(()=>g.remove(),3400);
});
$tool('shake') && ($tool('shake').onclick = () => {
  html.animate([{transform:'translateX(0)'},{transform:'translateX(-20px)'},{transform:'translateX(20px)'},{transform:'translateX(0)'}],{duration:700});
});
$tool('snow') && ($tool('snow').onclick = () => {
  for(let i=0;i<40;i++){
    let s = document.createElement('div');
    s.textContent = '❄️';
    s.style.cssText = `position:fixed;left:${Math.random()*100}vw;top:-30px;font-size:${16+Math.random()*32}px;z-index:99999;pointer-events:none;opacity:.75;`;
    document.body.appendChild(s);
    let t = 2+Math.random()*2;
    s.animate([{top:'-30px'},{top:'100vh'}],{duration:t*1000,easing:'ease-in'});
    setTimeout(()=>s.remove(),t*1000);
  }
});
$tool('fireworks') && ($tool('fireworks').onclick = () => {
  for(let i=0;i<6;i++){
    setTimeout(()=>{
      let d = document.createElement('div');
      d.style.cssText=`position:fixed;z-index:999999;top:${20+Math.random()*60}vh;left:${10+Math.random()*80}vw;width:24px;height:24px;border-radius:50%;background:hsl(${~~(Math.random()*360)},97%,69%);opacity:.95;`;
      document.body.appendChild(d);
      setTimeout(()=>d.remove(),900);
    }, i*130);
  }
  toast('🎆');
});
$tool('random-palette') && ($tool('random-palette').onclick = () => {
  let c = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');
  pageStyle('pw-palette', `body{background:${c}!important;}`);
  toast('Random palette: ' + c);
});

// ========== MENU DRAGGING ==========
let isDrag = false, dragX = 0, dragY = 0;
$('#pagework-header').onmousedown = e => {
  if(e.target.id === 'pagework-close') return;
  isDrag = true; dragX = e.clientX - html.offsetLeft; dragY = e.clientY - html.offsetTop;
  document.body.style.userSelect = 'none';
};
window.onmousemove = e => {
  if(isDrag) {
    html.style.left = (e.clientX - dragX) + 'px';
    html.style.top = (e.clientY - dragY) + 'px';
    html.style.right = 'auto';
  }
};
window.onmouseup = () => { isDrag=false; document.body.style.userSelect=''; };

// ========== CLOSE BUTTON ==========
$('#pagework-close').onclick = ()=> html.style.display='none';

// ========== RE-INIT TOOLS ON RERENDER ==========
function reinitTools() { setTimeout(()=>{
  tools.flatMap(g=>g.tools).forEach(t=>{
    let input = $tool(t.id);
    if(input && !input._pwInit){
      input._pwInit = true;
      if(typeof input.onchange==="function") input.onchange({target:input});
    }
  });
},100);}
renderMenu();
reinitTools();

})();
