# LandABMaster

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.8.

## Production services

Andrew J. Tan 23Jul2018
Git clone repo inside a project directory say 'ajhaus'.  `cd NodeServer`.  Run `npm i`.  Install localtunnel.me by runninng `npm i -g localtunnel@latest`. Run `node pagent.js`, then `lt -port 6700 -s ajbnode`, then `lt -p 6701 -s ajverilink`.  Running `npm run start` is not reliable with the package.json script.

`cd ..`.  Install angular node modules dependencies by running `npm i` followed by building the runtime 'dist' output folder with `ng build --prod`.  `cd dist`. Run `http-server . -c-1 -p 3700`, then `lt -p 3700 -s ajhaus`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
#   t e a c h e r A d m i n S e r v i c e  
 