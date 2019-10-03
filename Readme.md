# Requests Overview

![](https://raw.githubusercontent.com/martin-damien/requests-overview/master/img/screenshot.png)

## What is it for?

Requests Overview is a single page application, with low dependencies and complexity, to have
an overview of the Merge Request of Gitlab instances.

It is designed to be displayed on a distant screen with no interaction.

## Installation

Simply clone the project on a webserver (Apache, Nginx or everything able to 
serve files through HTTP) and configure the application by copying
`js/settings.dist.js` to `js/settings.js` and set the variables inside:

- `instances` : The Gitlab instances you want to get the MR from :
```javascript
const instances = [
    {
        server: 'https://gitlab.instance/api/v4',
        token: 'token_api'
    }
];
```
- `itemsByPage` : The number of requests you want to display at once.
- `secondsToChangePage` : The number of the seconds before changing the page result.
- `secondsToRefresh` : The number of the seconds before refreshing the list.

**NB:** Your Gitlab token is available at *https://gitlab.instance/profile/personal_access_tokens*.

You will also have to run `npm install` at the root of the project.

## Credits

Emojis are provided by https://www.joypixels.com/emoji

## License

This software is under the GPL v3 license.
