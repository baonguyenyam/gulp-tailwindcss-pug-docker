This project using:

-   GulpJS
-   ExpressJS
-   SASS/SCSS
-   TailwindCSS
-   Babel
-   BrowserSync
-   Docker
-   ...

# SETUP

## Method 1

Run `sh app.sh` and follow the instructions

## Method 2

-   Run `npm install` to install components
-   Start the development environment by running `npm start`
-   To build production, run `npm build`

## Edit MAP_API

Open `src/scripts/main.js` and edit:

```js
const NGUYEN_CONST = {
	map_API: "YOUR_API_KEY",
	map_Info: "My Company",
	map_Address: "1234 Main St, Fort Worth, TX 76102",
	map_Loc: { lat: 31.7415642, lng: -97.350922 },
	map_Pin: {
		icon: "/images/logo.png",
		scaledSize: [120, 40],
	},
};
```

## Docker

Run `sh docker.sh`

# SUPPORT

-   TailWindCSS
-   SASS
-   Babel
-   BrowserSync
-   PUG Template
