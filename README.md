# maddy-widgets

Reusable UI and widget microfrontend for the Maddy platform.

## Ownership

This repo owns:
- header
- footer
- profile
- contact widget
- WhatsApp widget
- card and section components
- shared UI primitives
- design tokens and reusable visual building blocks

This repo does not own:
- auth business logic
- shell integration logic
- host routing/state orchestration

## Local Development

Requirements:
- Node `24.14.1`
- npm `10+`

Install and run:

```powershell
cd "D:\Repository's\Maddy tech site\maddy-widgets"
npm install
npm run start:dev
```

Default local port:
- `3002`

## Remote Contract

Module Federation container:
- `ui_remote`

Exposed modules:
- `./Header`
- `./Footer`
- `./WhatsAppWidget`
- `./Profile`
- `./ContactWidget`
- `./CardSection`
- `./Card`
- `./Button`
- `./SectionHeading`
- `./SurfaceCard`

Contract source:
- [webpack.mfe.config.js](/D:/Repository's/Maddy tech site/maddy-widgets/webpack.mfe.config.js)

## Folder Direction

Recommended ownership inside this repo:
- `src/components`: widget-level components
- `src/shared/ui`: reusable UI primitives
- `src/shared/theme`: tokens and theme helpers
- `src/hooks`: reusable widget hooks
- `src/utils`: helper utilities
- `src/styles`: component styling
