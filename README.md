# Movie Database
Medior Coderbyte assignment

## How to start an application
1. Navigate into root app directory and run `npm install`
2. Run script `npm start`

## Information
This app was developed and styled on 1920x1080 resolution screen. So **is NOT mobile responsive**. App was also optimalized only in Google Chrome desktop browser.

## Tech stack
- App is configured with Webpack (*create-react-app*) and is using **JavaScript ES6+** syntax
- React v18 with **hooks**
- **Redux Toolkit** as main state management system
- **React Router v6.14** for page navigation
- Styles are powered by open-source component library **BULMA** and **Sass** (.scss syntax) together with *React CSS modules*
- All movie data are fetching from **OMDb API** via **axios** library

## Features
- infinite scroll + scroll position remembering (**not always works properly**)
- scrolling is **throttled** via `lodash.throttle` function for better performance.
- default poster image if doesn't exist on the server
- *Go Up* button if user scrolls too much
- ability to add/remove movie from favorites on its detail page (click on golden star)
- limited movie title length (`titleLengthReducer` function in `helpers.js` file)
- `localStorage` is used to persist content of favourite movies (`readDataFromLS`, `writeDataToLS` and `deleteDataInLS` function in `helpers.js` file)
