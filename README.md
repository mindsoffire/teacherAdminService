# TeacherAdminServiceModule

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.8.

## Production services

Andrew J. Tan 26Mar2019
Git clone repo inside a project directory say 'TeacherAdmin', origin at https://github.com/mindsoffire/teacherAdminService.git.
Install angular and nodejs modules dependencies by running `npm i`.  Run the two commands post build:

(1) ssh -R ajafsnode.serveo.net:80:localhost:6707 serveo.net
(2) ssh -R ajverilink.serveo.net:80:localhost:6707 serveo.net

A replicated teacher-student datastore is initialised for production at a Google Firestore site, which feeds the teacher-student cache on the front end.

## Development server

Comment out these lines at the end of index.js to run in dev mode. 

`aj.serve.app.use(aj.serve.express.static(__dirname + '/dist'));` ;

`aj.serve.app.get('/*', (req, res) => {`
`    res.sendFile(path.join(__dirname + '/dist/index.html'));`
`});`

In ngsw-config.json file, change the "urls" under "dataGroups" to reflect "http://localhost:6707/**"
`     "urls": [`
`        " https://ajafsnode.serveo.net/**"`
`      ],`

and in src/app/services/auth.service.ts file, change the following to:
readonly SERVER = "http://localhost:6707"; // instead of "https://ajafsnode.serveo.net"

Run `node index` to start the backend server.  
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## A.  Registering as HOD or principal.

Say you are department head or principal.  Sign up with your email and pw (required).  Verify with your email.  Log in with verified credentials.
Add your details under the Personal-Data accordian tab.  Press 'Update-Save' once finished.  Press 'Reset-PW' to change your PW, or press 'Logout' to exit.  On the top left corner, press soft logout to remain perpetually in PWA.

## B.  Registering multiple teachers and students to teachers.

Press 'next' from A without exiting or go to the Teacher-Students accordian tab.  Press 'Add New Teacher-Student' button to add teacher ID and student email.  If a new student email is to be registered under a given teacher, press the same button 'Add New Teacher-Student' and ensure that the teacher's name under Teacher-ID is the same as the previous teacher name as previously added.  A 200 response-code for success is returned to ensure refresh of the 'select teacher' options, instead of the given 204.  To delete a given student under a particular teacher, select the teacher then press 'Delete' under the appropriate student.  Adding teacher and student together, even for the same teacher as a previously registered entry is done one teacher-student mapping at a time, by pressing the 'Save all teacher-students' button when done.

By keeping the teacher name similar in spelling, inclusive of spacing, the same teacher (by name) can be registered to have multiple students. Teacher email and mobile can then be modfied accordingly from the first given-teacher entry and pressing the 'Save all teacher-students' button when done.

## Browsing all students.

All students can be browsed by clicking on the home icon on the top right and clicking/pressing 'BrowseAllStudents'.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Please run tests following postman collection in the sequence - these test only endpts 2,3,4.  Endpt 1 can be tested by loading the front end and checking propylist-master.json per change.  All posts are replicated into firestore, can be verified on frontEnd indexDB - irestore[DEFAULT] - remoteDocuments.
Note, further tests can be made by replacing all 'true' to 'false' and removing 'notifications' to '' in propylist-master.json file, and then restarting node index.js.
https://web.postman.co/collections/7052732-eb2f09cd-984d-4996-876b-d5d17d3e48fa?workspace=7395ad5a-11af-46f5-88cb-2697a558a560#7cd61628-936c-4cd8-98d4-1f92822033d0
Side test after the above run 'node testindex.js'

## Running end-to-end tests
## Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

