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

Currently it does cache your files locally, too. I wonder if it should do that and will remove that functionality probably soon.

### Netlify

It automatically restores your cache and caches new files within the Netlify cache folder. This folder is [undocumented but works fine](https://www.contentful.com/blog/2018/05/17/faster-static-site-builds-part-one-process-only-what-you-need/#caching-for-the-win). To reset the cache, hit the `Clear build cache` checkbox in the Netlify app.

## ⚙️ Configuration

There is no configuration yet.
