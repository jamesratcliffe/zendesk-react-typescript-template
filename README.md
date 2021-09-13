# Simple Zendesk Garden React App

## Global Setup

Install the following if you haven't already.

- [Node](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [Zendesk CLI](https://github.com/zendesk/zcli)

## Package Setup

Click 'Use this Template' on the Github page to make a new repository copied from the template. Clone the new repo.

```shell script
# Install dependencies in your repo directory
$ yarn
```


## Scripts

You can use these scripts defined in `package.json`.

These scripts build the app in the `dist/assets` directory. If you want to run `zcli` or `zat` manually, run them from the `dist` directory.

### Build for Development

Build once for local testing:

```shell
$ yarn dev
```

Tell Webpack to watch for changes and re-build:

```shell script
$ yarn watch
```

### Serve App Locally for Zendesk

This serves the app from the `dist` directory using zcli. Add `?zcli_apps=true` to the end of your Zendesk URL to see the app in Zendesk.

```shell script
$ yarn serve
```

### Expose Your Local ZendeskConnector

The app makes request through Zendesk's proxy server, so it can't connect to `zendesk-connector.lightspeedservices.test`.
You can open a tunnel with Expose:

```shell
yarn tunnel
```

### Build for Production

Production builds won't work with zlci because it doesn't support secure app settings.

```shell script
$ yarn prod
```

## Running the App Locally

To test your app locally, run `yarn watch`, `yarn serve`, and `yarn tunnel` at the same time in two different terminals.
You can set up some IDEs and editors to do this for you with one click.