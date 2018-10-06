/* module.exports = {
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    return config
  }
} */

// src/app/next.config.js

// defaultLoaders.babel.options.plugins.push(["transform-define", "./env-config.js"])
// config.module.rules.push({
//   test: /\.+(js|jsx)$/,
//   use: defaultLoaders.babel,
//   include: [internalNodeModulesRegExp],
// })

module.exports = {
  //distDir: "../functions/next"
  
  distDir: "../../dist/functions/next"
}
