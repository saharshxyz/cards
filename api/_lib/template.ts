import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

function getCss(theme: string, fontSize: string) {
  const lightBG__primary = '#e4e9f1';
  const lightBG__secondary = '#ffffff';
  const darkBG__primary = '#15283b';
  const darkBG__secondary = '#2d3b4e';
  const darkCOLOR__primary = '#ff9a1f';
  const darkCOLOR__secondary = '#fbb13c';
  const lightCOLOR__primary = '#01a7c2';
  const lightCOLOR__secondary = '#086c71';
  const colorGray = '#7a8c97';

  let background = lightBG__primary;
  let radial = lightBG__secondary;

  if (theme === 'dark') {
    background = darkBG__primary;
    radial = darkBG__secondary;
  }

  return `
    :root {
      --fonts-sans: 'IBM Plex Sans', 'Helvetica Neue', '-apple-system',
        'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
        'Fira Sans', 'Droid Sans', 'sans-serif';
      --fonts-serif: 'IBM Plex Serif', 'Georgia', 'Times', 'serif';
      --fonts-mono: 'IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono',
        'Bitstream Vera Sans Mono', 'Courier', 'monospace';
    }

    body {
      background: ${background};
      background-image: radial-gradient(circle at 25px 25px, ${radial} 3%, transparent 0%),   
        radial-gradient(circle at 75px 75px, ${radial} 3%, transparent 0%);
      background-size: 100px 100px;
      height: 100vh;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      font-family: var(--fonts-sans);
      font-size: ${sanitizeHtml(fontSize)};
      font-style: normal;
      letter-spacing: -.01em;
    }

    heading, brand--emphasis {
      font-family: var(--fonts-serif);
    }

    code {
      font-family: var(--fonts-mono);
      font-size: .875em;
      white-space: pre-wrap;
    }

    code:before, code:after {
      content: '\`';
    }

    .img-wrapper {
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: center;
    }

    .logo {
      width: 275px;
      height: 275px;
    }

    .plus {
      color: ${colorGray};
      font-size: 100px;
      padding: 0 50px;
    }

    .spacer {
      margin: 100px 150px 150px;
    }

    .brand {
      font-size: 90px;
      padding: 50px;
      text-align: center;
      position: absolute;
      top: 0;
      width: 100%;
      color: ${colorGray};
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .brand--emphasis {
      color: ${theme === 'dark' ? darkCOLOR__primary : lightCOLOR__primary};
      font-weight: 700;
      font-size: 100px;
      padding-left: .25em;
    }
    
    .heading {
      ${
        theme === 'dark'
          ? `background-image: linear-gradient(to bottom right, ${darkCOLOR__primary} 60%, ${darkCOLOR__secondary});`
          : `background-image: linear-gradient(to bottom right, ${lightCOLOR__primary} 80%, ${lightCOLOR__secondary});`
      };
      background-repeat: no-repeat;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 100px 50px 0;
      padding-bottom: 25px;
      font-weight: 700;
      line-height: 0.875;
    }

    .heading * {
      margin: 0;
    }

    .caption {
      font-size: ${Number(sanitizeHtml(fontSize).match(/\d+/)) * 0.375}px;
      text-transform: uppercase;
      color: ${colorGray};
      font-weight: 400;
      letter-spacing: 0;
    }
    
    .avatar {
      width: 125px;
      border-radius: 125px;
      margin: 0 50px;
    }
    
    .emoji {
      height: 1em;
      width: 1em;
      margin: 0 .05em 0 .1em;
      vertical-align: -0.1em;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { text, theme, md, fontSize, images, caption } = parsedReq;
  return `<!DOCTYPE html>
  <html>
  <meta charset="utf-8">
  <title>Generated Image</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link
          key="fonts-preconnect"
          rel="preconnect"
          href="https://fonts.gstatic.com"
        />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,700;1,400;1,700&family=IBM+Plex+Sans:ital,wght@0,400;0,700;1,400;1,700&family=IBM+Plex+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
  <style>
    ${getCss(theme, fontSize)}
  </style>
  <body>
    <div class="brand">
      <img class="avatar" src="https://assets.saharsh.tech/saharsh/pfp--2020__circle.png">
      @saharshy29 | <span class="brand--emphasis">thoughts.</span>
    </div>
    <div class="spacer">
      ${
        images.length > 0
          ? `<div class="img-wrapper">
          <img class="logo" src="${sanitizeHtml(images[0])}" />
          ${images.slice(1).map((img) => {
            return `<div class="plus">+</div>
            <img class="logo" src="${sanitizeHtml(img)}" />`;
          })}
        </div>`
          : ''
      }
      <div class="heading">${emojify(
        md ? marked(text) : sanitizeHtml(text)
      )}</div>
      ${
        caption !== 'undefined'
          ? `<div class="caption">${emojify(sanitizeHtml(caption))}</div>`
          : ''
      }
    </div>
  </body>
</html>`;
}
