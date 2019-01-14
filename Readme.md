# Requests Overview

## Installation

Simply clone project on a webserver (Apache, Nginx or everything able to 
serve files throush HTTP) and configure the application by copying
`js/settings.dist.js` to `js/settings.js` and set the variables inside:

- `gitlabInstance` : The Gitlab instance URL with the trailing `api/v4` part.
- `gitlabToken` : Your Gitlab token (available at *https://gitlab.instance/profile/personal_access_tokens*).
- `secondsToRefresh` : The number of the seconds before refreshing the list.
