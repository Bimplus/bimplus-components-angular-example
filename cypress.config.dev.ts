import { defineConfig } from 'cypress'
import baseConfig from './cypress.config'

module.exports = defineConfig({
    ...baseConfig,
    e2e: {
        ...baseConfig.e2e,
    },
    env: {
        ...baseConfig.env,
    },
})

