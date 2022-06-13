# Homeday Assignment

[Live](https://homeday-assignment.vercel.app/)

This is a test assignment for @homeday-de

Project uses:
* [Vue 2](https://v2.vuejs.org/) with Vue Router and Vuex
* [Homeday Blocks](https://blocks.homeday.dev/) as UI library
* [Vite](https://vitejs.dev/) as dev server and bundler
* [Vitest](https://vitest.dev/) as tests runner

## Setup
|NPM|Yarn|
|--|--|
|<code>npm install</code>|<code>yarn</code>|

## Commands
|Command|Meaning|
|--|--|
|`npm run build`|Build production version and output bundle stats to stats.html|
|`npm run coverage`|Run tests coverage|
|`npm run dev`|Run local dev server|
|`npm run lint`|Run ESLint|
|`npm run test`|Run tests|

## Code structure
|Folder|Description|
|--|--|
|`public`|Static data|
|`src`|Source code|
|`src/assets`|App assets|
|`src/components`|App components|
|`src/router`|Router configuration|
|`src/store`|Store|
|`src/store/credentials`|Store module with data entered by user|
|`src/store/githubUser`|Store module with GitHub user loaded data and it's status|
|`src/store/githubRepos`|Store module with GitHub user's repositories and their status|
|`src/store/navigation`|Store module with navigation guards and buttons|
|`src/styles`|App styles|
|`src/utils`|Misc functions and constants|
|`src/views`|Application pages|

## Room for improvement
* Add `<link rel="preload" ... />` and `<link rel="prefetch" ... />` for resources
* Virtual scroll element for repositories list and better scroll handling of load on reaching scroll end
* Better keyboard handling including `Enter` press and focus order
