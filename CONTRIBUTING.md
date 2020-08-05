# Contributing

There are two pieces to `thought-cards` that are worth noting before you begin development.

1. The backend image generator located in [/api/index.ts](https://github.com/saharshy29/thought-cards/blob/master/api/index.ts)
2. The frontend inputs located in [/web/index.ts](https://github.com/saharshy29/tought-cards/blob/master/web/index.ts)

The Vercel 2.0 platform handles [routing](https://github.com/saharshy29/thought-cards/blob/f2849aafa6d50a56658b8835678659ccf3837b7d/now.json#L6) in an elegate way for us so deployment is easy.

To start hacking, do the following:

1. Clone this repo with `git clone https://github.com/saharshy29/thought-cards`
2. Change directory with `cd thought-cards`
3. Run `yarn` or `npm install` to install all dependencies
4. Run locally with `vercel dev` and visit [localhost:3000](http://localhost:3000) (if nothing happens, run `npm install -g vercel`)
5. If necessary, edit the `exePath` in [options.ts](https://github.com/saharshy29/thought-cards/blob/master/api/_lib/options.ts) to point to your local Chrome executable

Now you're ready to start local development!

You can set an environment variable to assist with debugging `export OG_HTML_DEBUG=1`. This will render the image as HTML so you can play around with your browser's dev tools before committing changes to the template.
