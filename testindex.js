// nodejs teat for above /api/suspend
var request = require("request");

var options = { method: 'POST',
  url: 'http://localhost:6707/api/suspend',
  headers: 
   { 'Postman-Token': '5c475411-9699-436b-b89f-d1ba45bda6a3',
     'cache-control': 'no-cache',
     'Content-Type': 'application/json' },
  body: { student: 'iii@me.me' },
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




var options = { method: 'GET',
  url: 'http://localhost:6707/api/commonstudents',
  qs: { teacher: [ 'offire@gmail.com', 'dudu@gmail.com' ] },
  headers: 
   { 'Postman-Token': 'e638a31f-9ace-4f80-8879-3fbab95b3191',
     'cache-control': 'no-cache' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
// Request example 2: GET /api/commonstudents?teacher=teacherken%40example.com&teacher=teacherjoe%40example.com
// Success response body 2:
// {
//   "students" :
//     [
//       "commonstudent1@gmail.com", 
//       "commonstudent2@gmail.com"
//     ]
// }



var options = { method: 'POST',
  url: 'http://localhost:6707/api/retrievefornotifications',
  headers: 
   { 'Postman-Token': '3a4bd8a8-2d51-48ba-8612-933541b0352c',
     'cache-control': 'no-cache',
     'Content-Type': 'application/json' },
  body: 
   { teacher: 'ajmindsoffire@gmail.com',
     notification: 'Hello students, no class this week! @andrew@gmail.com @leo@gmail.com @linus@gmail.com' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
// 4. As a teacher, I want to retrieve a list of students who can receive a given notification.
// A notification consists of:

// the teacher who is sending the notification, and
// the text of the notification itself.
// To receive notifications from e.g. 'teacherken@example.com', a student:

// MUST NOT be suspended,
// AND MUST fulfill AT LEAST ONE of the following:
// is registered with “teacherken@example.com"
// has been @mentioned in the notification
// The list of students retrieved should not contain any duplicates/repetitions.

// Endpoint: POST /api/retrievefornotifications
// Headers: Content-Type: application/json
// Success response status: HTTP 200
// Request body example 1:
// {
//   "teacher":  "teacherken@example.com",
//   "notification": "Hello students! @studentagnes@example.com @studentmiche@example.com"
// }
// Success response body 1:
// {
//   "recipients":
//     [
//       "studentbob@example.com",
//       "studentagnes@example.com", 
//       "studentmiche@example.com"
//     ]   
// }
// In the example above, studentagnes@example.com and studentmiche@example.com can receive the notification from teacherken@example.com, regardless whether they are registered to him, because they are @mentioned in the notification text. studentbob@example.com however, has to be registered to teacherken@example.com.

// Request body example 2:
// {
//   "teacher":  "teacherken@example.com",
//   "notification": "Hey everybody"
// }
// Success response body 2:
// {
//   "recipients":
//     [
//       "studentbob@example.com",
//     ]   
// }