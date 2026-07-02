const webpack = require('webpack')

module.exports = function tailwindPlugin(context, options) {
  return {
    name: 'tailwind-plugin',

    // Adds Tailwind CSS v4 to the PostCSS pipeline.
    // Uses .push() instead of replacing the array so that Docusaurus's
    // built-in PostCSS plugins (like autoprefixer) are preserved.
    configurePostCss(postcssOptions) {
      postcssOptions.plugins.push(require('@tailwindcss/postcss'))
      return postcssOptions
    },

    // Workaround: Docusaurus 3.8+ uses webpack filesystem cache, but
    // webpack-dev-server applies HotModuleReplacementPlugin *after* the
    // compiler is created. When webpack restores cached modules, the HMR
    // parser hooks haven't been registered yet, so `module.hot` is treated
    // as dead code (`if (false)`) and the dev server throws:
    //   "Uncaught Error: [HMR] Hot Module Replacement is disabled."
    //
    // By including the plugin here in the webpack config, it gets registered
    // *before* the compiler is created, ensuring the parser recognizes
    // `module.hot` even when modules are restored from cache.
    //
    // webpack-dev-server will log a warning that HMR plugin is already
    // applied — this is expected and can be safely ignored.
    configureWebpack(config, isServer) {
      if (!isServer) {
        return {
          plugins: [new webpack.HotModuleReplacementPlugin()],
        }
      }
      return {}
    },
  }
}