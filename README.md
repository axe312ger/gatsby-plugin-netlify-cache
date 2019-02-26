# gatsby-plugin-netlify-cache

<p align="center">
  <a href="https://www.npmjs.com/package/gatsby-plugin-netlify-cache">
    <img src="https://img.shields.io/npm/v/gatsby-plugin-netlify-cache.svg" alt="NPM">
  </a>
  &nbsp;
  <a href="http://npm-stat.com/charts.html?package=gatsby-plugin-netlify-cache">
    <img src="https://img.shields.io/npm/dm/gatsby-plugin-netlify-cache.svg" alt="NPM downloads">
  </a>
</p>

> This plugin caches your build files locally or in the Netlify cache directory. It will massively speed up subsequent builds.

## ☁️ Installation

```sh
npm install gatsby-plugin-netlify-cache
```

## 🛫 Setup

Add `'gatsby-plugin-netlify-cache'` to the plugins in your `gatsby-config.js` file.

## ✋ Usage

### Locally

In your local environment nothing happens to avoid conflicts with your development process. It actually checks if `process.env.NETLIFY_BUILD_BASE` exists to detect a Netlify environment.

### Netlify

It automatically restores your cache and caches new files within the Netlify cache folder. This folder is [undocumented but works fine](https://www.contentful.com/blog/2018/05/17/faster-static-site-builds-part-one-process-only-what-you-need/#caching-for-the-win). To reset the cache, hit the `Clear build cache` checkbox in the Netlify app.

These folders are cached by default:

* `.cache` directory
* `public` directory


## ⚙️ Configuration

### `cachePublic` - default: `false`

Caching the public directory on long term can result in a huge directory size which can break your netlify build. Enable this with caution.

```js
plugins: [
  {
    resolve: "gatsby-plugin-netlify-cache",
    options: {
      cachePublic: true
    }
  }
]
```

### `extraDirsToCache` - default: `[]`

If you need additionals directories to be cached, you can use the option `extraDirsToCache` to include one or multiple directories to Netlify cache:

```js
plugins: [
  {
    resolve: "gatsby-plugin-netlify-cache",
    options: {
      extraDirsToCache: [
        "extraDir",
        ".extraDotDir",
        "extra/dir"
      ]
    }
  }
]
```

> Note: the directory path is relative to the project root directory
