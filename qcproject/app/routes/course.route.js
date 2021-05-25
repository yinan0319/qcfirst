const {courseCont} = require('../controllers');
const {signupHelpers} = require('../middlewares')
module.exports = function(app){
    app.use(function(res,req,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })
    
    app.post('/api/course/create',[signupHelpers.checkLogin],[courseCont.createCourse]);
    app.post('/api/course/search',[signupHelpers.checkLogin],[courseCont.searchCourse]);
    app.post('/api/course/enroll',[signupHelpers.checkLogin],[courseCont.enrollCourse]);
    app.post('/api/course/get-student-roster',[signupHelpers.checkLogin],[courseCont.getStudentRoster]);
    app.post('/api/course/getcourses',[signupHelpers.checkLogin],[courseCont.getCoursesbyId]);
    app.delete('/api/course/delete',[signupHelpers.checkLogin],[courseCont.deleteCourse]);
}