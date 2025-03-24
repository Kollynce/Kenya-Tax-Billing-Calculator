const { defineConfig } = require('@vue/cli-service')
require('dotenv').config()

module.exports = defineConfig({
  transpileDependencies: true,
  // Make sure environment variables are properly passed to the app
  chainWebpack: config => {
    config.plugin('define').tap(definitions => {
      Object.assign(definitions[0], {
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
        'process.env': {
          ...definitions[0]['process.env'],
          VUE_APP_ADMIN_EMAIL: JSON.stringify(process.env.VUE_APP_ADMIN_EMAIL)
        }
      })
      return definitions
    })
  }
})
