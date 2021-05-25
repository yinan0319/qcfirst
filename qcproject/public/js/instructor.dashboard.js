$(document).ready(() => {
 getCourses();
});
const getCourses = async () =>{
  const instructorId = localStorage.getItem("userId");
  const response = await fetch(
    "/api/course/getcourses",
    {
      method: "post",
      body: JSON.stringify({ instructorId }),
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      if (data.message != undefined) {
        alert(data.message);
      } else {
        let markup = "";
        if ($("#courseList").children().length != 0) {
          $("#courseList").empty();
        }
        if (data.result.length != 0) {
          data.result.map((course) => {
            markup = `<tr>
                                <td>${course.courseName}</td>
                                <td>${course.semester}</td>
                                <td>${course.department}</td>
                                <td>${course.capacity}</td>
                                <td>${course.schedule}</td>
                                <td>${course.students.length}</td>
                                <td><button id="${course._id}" class="primary-btn" onclick="getRoster('${course._id}')">open roster</button></td>
                                <td><button id="${course._id}" class="action-icon" onclick="deleteCourse('${course._id}')"><i class="fas fa-trash"></i></button></td>
                               
                                </tr>`;

           
                              
            $("#courseList").append(markup);
            if (course.students.length == 0) {
              $(`#${course._id}`).addClass("btn-fade");
              $(`#${course._id}`).prop("disabled", true);
            }
          });
        } else {
          $("#courseList").append(
            "<td colspan='8'><h3>You have not added any course yet<h3></td>"
          );
        }
      }
    })
    .catch((err) => {
      alert(err);
    });
}
const deleteCourse = async(courseId)=>{
  if (confirm("Do you want to delete the course?")) {
    const response = await fetch(
      "/api/course/delete",
      {
        method: "delete",
        body: JSON.stringify({ courseId }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
          getCourses();
          alert("Course deleted successfully")
    })
  
  }
  else{
    //do nothing
  }
  }

const getRoster = async (courseId) => {
  localStorage.setItem("courseId", courseId);
  window.location.replace("/student-roster");
};
