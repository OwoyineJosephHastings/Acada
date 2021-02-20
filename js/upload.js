// ----------firebase initialise-----------------
var submitbtn = document.getElementById("submit_btn");

var firebaseConfig = {
  apiKey: "AIzaSyDzcaQsMg9-3vSzg8ekuOxdMg9OuG_oEzo",
  authDomain: "ssn-project-b13d6.firebaseapp.com",
  projectId: "ssn-project-b13d6",
  storageBucket: "ssn-project-b13d6.appspot.com",
  messagingSenderId: "743494701844",
  appId: "1:743494701844:web:359881ba2bbb5279efa801",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// --------- firebase authorisation--------------

submitbtn.addEventListener("click", function () {
  var progress_value = document.getElementById("progress-bar");
  var semester = document.getElementById("semester").value;
  var year = document.getElementById("year").value;
  var document_type = document.getElementById("document_type").value;
  var course_code = document.getElementById("course_code").value;

  var input = document.querySelector("#file_input");
  var file_name = document.getElementById("file_name").value;
  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/docx",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (
    file_name &&
    input.files[0] &&
    allowedTypes.includes(input.files[0].type)
  ) {
    console.log(input.files[0].type);
    const storageRef = firebase
      .storage()
      .ref(
        "university/makerere/cedat/school of engineering/mechanical engineering/" +
          year +
          "/" +
          semester +
          "/" +
          course_code +
          "/" +
          document_type +
          "/" +
          input.files[0].name
      );

    var uploadTask = storageRef.put(input.files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progress_value.style.width = progress.toString() + "%";
        progress_value.innerHTML = Math.round(progress).toString() + "%";
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            alert("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            // do something while upload state running
            break;
        }
      },
      (error) => {
        alert("error occurred during upload");
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          var promise = firebase
            .database()
            .ref(
              "university/makerere/cedat/school of engineering/mechanical engineering/" +
                year +
                "/" +
                semester +
                "/" +
                course_code +
                "/" +
                document_type +
                "/" +
                file_name
            )
            .set({
              uplodedAt: firebase.database.ServerValue.TIMESTAMP,
              downloads: 0,
              name: file_name,
              download_link: downloadURL,
            });

          promise.catch((e) => {
            alert(e.message());
          });
          promise.then((e) => {
            // successful upload to the database
            alert("Successfully Uploaded \n Thank you!");
            progress_value.style.width = "0%";
            progress_value.innerHTML = "";
          });
        });
      }
    );
  } else {
    alert(
      "File Name can not have punctuation marks  \n and choose allowed file types:\n " +
        allowedTypes
    );
  }
});
