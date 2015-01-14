#Gulp Template

Contains Node and Gulp build system with Express web server for quick testing

All deliverable work should be taken from build directory

##Requirements
Node

##Installation

1. Install node if not present
2. Clone Repository
3. Navigate to root directory containing package.json file
4. run npm install

###For Dev & Build:

Run `gulp` from root directory

* Will copy file structure from src directory to dist directory
* Runs jshint on js files and will output any errors/warnings to the console 
* starts Express webserver at localhost:2000, webroot is the build directory
* Will copy file structure from src directory to dist directory
* minification is currently set to false, can be turned on in gulpfile.js