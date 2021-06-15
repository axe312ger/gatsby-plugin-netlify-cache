exports.onPreInit = async function ({ reporter }) {
  reporter.warn(
    'gatsby-plugin-netlify-cache got deprecated. This version of the plugin will do nothing. Please migrate to https://github.com/netlify/netlify-plugin-gatsby'
  )
}
