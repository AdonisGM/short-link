# Short Link Project

## Introduction

<div style="text-align: center">
    <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/AdonisGM/short-link">
    <img alt="GitHub package.json version (subfolder of monorepo)" src="https://img.shields.io/github/package-json/v/AdonisGM/short-link?color=green&filename=server-api%2Fpackage.json&label=version%20server">
</div>

[![Azure Static Web App](https://github.com/AdonisGM/short-link/actions/workflows/azure-static-web-apps-jolly-beach-084eeab00.yml/badge.svg)](https://github.com/AdonisGM/short-link/actions/workflows/azure-static-web-apps-jolly-beach-084eeab00.yml)
[![Build and deploy](https://github.com/AdonisGM/short-link/actions/workflows/master_short-link-adonisgm.yml/badge.svg)](https://github.com/AdonisGM/short-link/actions/workflows/master_short-link-adonisgm.yml)

Project is a simple short link project. It's a simple web application that allows you to create a short link and redirect to the original link.

## Features

- Create a short link
- Create QR code for the link
- Share the link with your friends
- Customize the short link
- Protect the link with password

## Plans

We have 3 types of plans: Basic, Vip and Premium.

Don't worry, all accounts are upgraded for free. Please contact [me](admin@nmtung.dev) for an upgrade.

|                | Basic |    Vip     |   Premium   |
|----------------|:-----:|:----------:|:-----------:|
| **Price**      | Free  | $2 / Month | $6 / Month  |
| **Short URL**  |  10   |    100     | _Unlimited_ |
| **Custom URL** |   1   |     10     | _Unlimited_ |
| **Password**   |   1   |     50     | _Unlimited_ |
| **QR Code**    |       |     50     | _Unlimited_ |

## Installation

### Server

Prepare evironment for server.

- [Nodejs](https://nodejs.org/en/download/) (LTS)
- [MongoDB](https://www.mongodb.com/try/download/community)

```bash
cd ./server-api
npm intall
npm start
```

After that, see in terminal:

```bash
> server-api@1.0.0 dev
> nodemon ./src/index.js

[nodemon] 2.0.19
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node ./src/index.js`
-= server started =-
-= listening on port 3000 =-
```

Ok, server is running and you can access it by http://localhost:3000/
