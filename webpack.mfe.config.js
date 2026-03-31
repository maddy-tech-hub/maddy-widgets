/* eslint-disable @typescript-eslint/no-var-requires */
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies


module.exports = {
        mfePlugin: new ModuleFederationPlugin({
            name: 'ui_remote',
            library: { type: 'global', name: 'ui_remote' },
            filename: 'remoteEntry.js',
            exposes: {
              './Header': './src/components/Header',
              './Footer': './src/components/Footer',
              './WhatsAppWidget': './src/components/WhatsAppWidget',
              './Profile': './src/components/Profile',
              './ContactWidget': './src/components/ContactWidget',
              './CardSection': './src/components/Card/CardSection',
              './Card': './src/components/Card/Card',
              './Button': './src/shared/ui/Button',
              './SectionHeading': './src/shared/ui/SectionHeading',
              './SurfaceCard': './src/shared/ui/SurfaceCard',
             },             
            remotes: {},
            shared: {
                react: { singleton: true, requiredVersion: deps.react },
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
