# FRC Pit [![Node CI](https://github.com/SumiGovindaraju/frc-pit/workflows/Node%20CI/badge.svg)](https://github.com/SumiGovindaraju/frc-pit/actions?query=workflow%3A%22Node+CI%22)

Progressive Web App that provides teams with functionalities 

## Current Features
* Pit View, which displays schedule, rankings, live streams, awards, and countdown to next match
* Offline use for pit mode, which allows you to load the site and the last cached event data without internet connection
* Tools Checkout Views, which allows you to keep track of tools that are lent to other teams using Firebase authentication and Firestore
* Statistics View, which currently mirrors the TBA Rankings table

## TODO
* [ ] Statistics Modal w/ Team Info ()
* [ ] Icon to make it a downloadable PWA
* [ ] Pit Inventory features with Firebase

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- [Node.js](http://nodejs.org)

### Installing

Clone this repository

```
$ git clone https://github.com/SumiGovindaraju/frc-pit.git
```

Install all necessary tools: Gradle, Third-Party libraries, etc.

```
$ npm install
```

## Usage

To run a development version, run

```
$ npm start
```

To build a production build, run 

```
$ npm run build
```

To deploy to a production environment, run

```
$ npm run deploy
```

## Acknowledgements

Special thanks to the following people for their help with testing and requesting features for this project:
* Weston White
* Daniel George
* Brandon Chuang
* Cory Molloy
* Travis Covington