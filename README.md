# MES-CloudCharge

## Version - 1.6.0

Mambati Enterprise Shell for Cloud Charge

Mambati Enterprise Shell is a sleek, intuitive, and powerful implementation of the Angular Material Powered [DuoWorld](https://duoworld.com) Shell, for faster and easier enterprise application development.
Created by [Eshwaran Veerabahu], and maintained with the support of DuoSoftware (Pvt) Ltd.

## Table of contents

* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Folder structure](#folder structure)
* [Versioning](#versioning)
* [Copyright and license](#copyright-and-license)

## Prerequisites

Make sure prerequisites listed below are met before the instalation process is carried out.

Download and install [node.js](https://nodejs.org/en/) on your system.
(gotcha - make sure you enable the wizard to automatically set a referance to the node.js enviornment on the systems enviornment variable.)

Use node package manager to install gulp, you can do this by runing the command `npm install gulp -g`
(gotcha - make sure you use the `-g` notation after the instalation command to make gulp available globaly in your system.)

## Installation

Perform these commands on the root of your project repository.

* Install node dependancies by running `npm install` (Ignore warnings and errors when this operation is running).
* Install bower packages by running `bower install`.
* Instantiate shell by running `gulp serve` or `gulp serve:dist` to get a distributable version which you can host.

Above tasks will inject necesary dependancies to the applications main module automaticaly while .scss files will be compiled into .css files.

## Folder structure

```
src/
├── app/
│   ├── core/
│   │   ├── config/
│   │   │   └── mes-config.provider.js
│   │   ├── directives/
│   │   │   ├── ms-card/
│   │   │   ├── ms-datepicker-fix/
│   │   │   ├── ms-material-color-picker/
│   │   │   ├── ms-nav/
│   │   │   ├── ms-navigation/
│   │   │   ├── ms-responsive-table/
│   │   │   ├── ms-scroll/
│   │   │   ├── ms-search-bar/
│   │   │   ├── ms-sidenav-helper/
│   │   │   ├── ms-splash-screen/
│   │   │   ├── ms-stepper/
│   │   │   ├── ms-timeline/
│   │   │   ├── ms-widget/
│   │   │   └── highlight.directive.js
│   │   ├── filters/
│   │   │   ├── basic.filter.js
│   │   │   └── tag.filter.js
│   │   ├── layouts/
│   │   │   ├── content-only.html
│   │   │   ├── content-with-toolbar.html
│   │   │   ├── horizontal-navigation.html
│   │   │   └── vertical-navigation.html
│   │   ├── scss/
│   │   │   ├── partials/
│   │   │   │   ├── plugins/
│   │   │   │   │   ├── angular-google-map.scss
│   │   │   │   │   ├── angular-moment-picker.scss
│   │   │   │   │   ├── c3.scss
│   │   │   │   │   ├── chartist.scss
│   │   │   │   │   ├── chartjs.scss
│   │   │   │   │   ├── datatable.scss
│   │   │   │   │   ├── highlight.scss
│   │   │   │   │   ├── nvd3.scss
│   │   │   │   │   ├── perfect-scrollbar.scss
│   │   │   │   │   └── text-angular.scss
│   │   │   │   ├── angular-material-extend.scss
│   │   │   │   ├── animations.scss
│   │   │   │   ├── colors.scss
│   │   │   │   ├── helpers.scss
│   │   │   │   ├── layouts-page.scss
│   │   │   │   ├── layouts-template.scss
│   │   │   │   ├── material.scss
│   │   │   │   ├── mixins.scss
│   │   │   │   ├── print.scss
│   │   │   │   ├── reset.scss
│   │   │   │   ├── typography.scss
│   │   │   │   └── variables.scss
│   │   │   └── global.scss
│   │   ├── services/
│   │   │   ├── api-resolver.service.js
│   │   │   ├── ms-api.provider.js
│   │   │   └── ms-utils.service.js
│   │   ├── theme-options/
│   │   │   ├── theme-options.directive.js
│   │   │   ├── theme-options.html
│   │   │   └── theme-options.scss
│   │   ├── theming/
│   │   │   ├── mes-generator.factory.js
│   │   │   ├── mes-palettes.constant.js
│   │   │   ├── mes-themes.constant.js
│   │   │   ├── mes-theming.config.js
│   │   │   └── mes-theming.provider.js
│   │   ├── core.config.js
│   │   ├── core.module.js
│   │   └── core.run.js
│   ├── data/
│   ├── main/
│   ├── navigation/
│   ├── quick-panel/
│   ├── toolbar/
│   │   ├── layouts/
│   │   │   ├── content-with-toolbar/
│   │   │   │   ├── toolbar.html
│   │   │   │   └── toolbar.scss
│   │   │   ├── horizontal-navigation/
│   │   │   │   ├── toolbar.html
│   │   │   │   └── toolbar.scss
│   │   │   ├── vertical-navigation/
│   │   │   │   └── toolbar.html
│   │   │   ├── toolbar.controller.js
│   │   │   ├── toolbar.module.js
│   │   │   └── toolbar.scss
│   ├── index.api.js
│   ├── index.config.js
│   ├── index.constants.js
│   ├── index.controller.js
│   ├── index.module.js
│   ├── index.route.js
│   ├── index.run.js
│   └── index.scss
├── assets/
├── favicon.ico
└── index.html

``` 
