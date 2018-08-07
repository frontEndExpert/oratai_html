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

module.exports = {
  distDir: "../functions/next"
}