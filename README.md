# milanavuckovic.github.io

[![Build Status](https://img.shields.io/github/workflow/status/milanavuckovic/milanavuckovic.github.io/Test)](https://github.com/milanavuckovic/milanavuckovic.github.io/actions/workflows/checks.yml)
[![Powered by VuePress](https://img.shields.io/github/package-json/dependency-version/milanavuckovic/milanavuckovic.github.io/dev/vuepress)](https://vuepress.vuejs.org)
[![License](https://img.shields.io/github/package-json/license/milanavuckovic/milanavuckovic.github.io?color=white)](http://www.wtfpl.net/)

VuePress instance for the website [back2string.art](https://back2string.art).

## Installation

### Dependencies

```sh
npm install --no-save
```

### Setup Environment

Create the `.env` file in the root folder, and set the following variables:

```
GOOGLE_MAPS_API_KEY=<your_google_maps_javascript_api_key>
GOOGLE_ANALYTICS_ID=<your_google_analytics_id>
OBJECT2VR_PLAYER=<url_to_object2vr_player_lib>
```

Links:
* [Google Cloud Console Credentials](https://console.cloud.google.com/apis/credentials/)
* [Google Analytics Web](https://analytics.google.com/analytics/web/)
* [Object2VR](https://ggnome.com/object2vr/)

## Development Server

```sh
npm run dev
```

## Linting

```sh
npm run lint
```

## Production

```sh
npm start
```

### Build

```sh
npm run build
```

### Serve

```sh
npm run serve
```

## Testing

```sh
npm test
```

Or:

```sh
npm run serve
npm run test:all
```

### Unit Tests

```sh
npm run test:unit
npm run test:unit:debug
```

### End-to-end Tests

```sh
npm run test:e2e
npm run test:e2e:debug
```
