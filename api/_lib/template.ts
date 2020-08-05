import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

function getCss(theme: string, fontSize: string) {
  const bgLight = '#FFFFFF';
  const radialLight = '#E4E9F1';
  const bgDark = '#15283B';
  const radialDark = '#2D3B4E';
  const colorDarkPri = '#FBB13C';
  const colorDarkSec = '#FF9A1F';
  const colorLightPri = '#0169DF';
  const colorLightSec = '#362EDC';
  const colorSec = '#7a8c97';

  let background = bgLight;
  let radial = radialLight;

  if (theme === 'dark') {
    background = bgDark;
    radial = radialDark;
  }

  return `
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
      font-family: 'Nunito', sans-serif;
      font-size: ${sanitizeHtml(fontSize)};
      font-style: normal;
      letter-spacing: -.01em;
    }

    code {
      font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, sans-serif;
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
      color: ${colorSec};
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
      color: ${colorSec};
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .brand--emphasis {
      color: ${theme === 'dark' ? colorDarkPri : colorLightPri};
      font-weight: 700;
      font-size: 100px;
      padding-left: .25em;
    }
    
    .heading {
      ${
        theme === 'dark'
          ? `background-image: linear-gradient(to bottom right, ${colorDarkPri} 60%, ${colorDarkSec});`
          : `background-image: linear-gradient(to bottom right, ${colorLightPri} 80%, ${colorLightSec});`
      };
      background-repeat: no-repeat;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 100px 50px 0;
      padding-bottom: 25px;
      font-weight: 700;
      line-height: 0.875;
      letter-spacing: -.06em;
    }

    .heading * {
      margin: 0;
    }

    .caption {
      font-size: ${Number(sanitizeHtml(fontSize).match(/\d+/)) * 0.375}px;
      text-transform: uppercase;
      color: ${colorSec};
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
  <style>
    ${getCss(theme, fontSize)}
  </style>
  <body>
    <div class="brand">
      <img class="avatar" src="https://saharsh.tech/assets/images/saharsh.png">
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
      <div class="heading">${emojify(md ? marked(text) : sanitizeHtml(text))}</div>
      ${caption !== 'undefined' ? `<div class="caption">${emojify(sanitizeHtml(caption))}</div>` : ''}
    </div>
  </body>
</html>`;
}
