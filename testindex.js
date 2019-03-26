// nodejs teat for above /api/suspend
var request = require("request");

var options = { method: 'POST',
  url: 'http://localhost:6707/api/suspend',
  headers: 
   { 'Postman-Token': '5c475411-9699-436b-b89f-d1ba45bda6a3',
     'cache-control': 'no-cache',
     'Content-Type': 'application/json' },
  body: { student: 'andrew@gmail.com' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log({body});
});
// 3. As a teacher, I want to suspend a specified student.
// Endpoint: POST /api/suspend
// Headers: Content-Type: application/json
// Success response status: HTTP 204
// Request body example:
// {
//   "student" : "studentmary@gmail.com"
// }

// propylist-master.json is written into as the JSON-db but the changes are not replicated into Google Firestore collection 'teacher-student-master'.

// Run node testindex.js to test this endpoint, after starting up 'node index.js'




var options = { method: 'GET',
  url: 'http://localhost:6707/api/commonstudents',
  qs: { teacher: 'aj@ajschool.net' },
  headers: 
   { 'Postman-Token': '0778daae-b03a-4825-a73c-98f29e549f56',
     'cache-control': 'no-cache' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
// 2. As a teacher, I want to retrieve a list of students common to a given list of teachers (i.e. retrieve students who are registered to ALL of the given teachers).
// Endpoint: GET /api/commonstudents
// Success response status: HTTP 200
// Request example 1: GET /api/commonstudents?teacher=teacherken%40example.com
// Success response body 1:
// {
//   "students" :
//     [
//       "commonstudent1@gmail.com", 
//       "commonstudent2@gmail.com",
//       "student_only_under_teacher_ken@gmail.com"
//     ]
// }