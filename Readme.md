# Requests Overview

![](https://raw.githubusercontent.com/martin-damien/requests-overview/master/img/screenshot.png)

## What is it for?

Requests Overview is a single page application with low dependencies and complexity to have
an overview of the Merge Request of a Gitlab instance.

It is designede to be displayed on a distant screen with no interaction.

## Installation

Simply clone project on a webserver (Apache, Nginx or everything able to 
serve files throush HTTP) and configure the application by copying
`js/settings.dist.js` to `js/settings.js` and set the variables inside:

- `gitlabInstance` : The Gitlab instance URL with the trailing `api/v4` part.
- `gitlabToken` : Your Gitlab token (available at *https://gitlab.instance/profile/personal_access_tokens*).
- `secondsToRefresh` : The number of the seconds before refreshing the list.

You will also have to run `npm install` at the root of the project.

## About

This project aims to replace https://github.com/Hexanet/MergeRequestsCI
by keeping the [KISS](https://en.wikipedia.org/wiki/KISS_principle)
principles.

## Credits

Background image: https://www.toptal.com/designers/subtlepatterns/dark-sharp-edges/

## License

This software is under the GPL v3 license.