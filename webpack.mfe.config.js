/* eslint-disable @typescript-eslint/no-var-requires */
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies


module.exports = {
        mfePlugin: new ModuleFederationPlugin({
            name: 'maddy_mfe',
            library: { type: 'global', name: 'maddy_mfe' },
            filename: 'remoteEntry.js',
            exposes: {
              './Header': './src/components/Header',
              './Footer': './src/components/Footer',
              './WhatsAppWidget': './src/components/WhatsAppWidget',
              './Profile': './src/components/Profile',
              './ContactWidget': '/src/components/ContactWidget',
              './MaddyCardSection': './src/components/Card/MaddyCardSection',
              './MaddyCard': './src/components/Card/MaddyCard',
             },             
            remotes: {},
            shared: {
                ...deps,
                react: { singleton: true,  requiredVersion: deps.react },
                'react-dom': {
                    singleton: true,
                    requiredVersion: deps['react-dom'],
                },
                'styled-components': {
                    singleton: true,
                    requiredVersion: deps['styled-components'],
                },
            },
        })
};