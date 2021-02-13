// ----------firebase initialise-----------------

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

// --------- firebase auth--------------
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
      document_type
  );

var submitbtn = document.getElementById("submit_btn");
var input = document.querySelector("input");
var progress_value = document.getElementById("progress-bar");
var semester = document.getElementById("semester").value;
var year = document.getElementById("year").value;
var document_type = document.getElementById("document_type").value;
var course_code = document.getElementById("course_code").value;

submitbtn.addEventListener("click", function () {
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
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // Handle unsuccessful uploads
      console.log("error occurred during upload");
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log("File available at", downloadURL);
        var promise = firebase
          .database()
          .ref(
            "university/makerere/cedat/school of engineering/mechanical engineering/year4/semsester2/mec4201/pastpapers"
          )
          .set({
            name: "exams.pdf",
            download_link: downloadURL,
          });

        promise.catch((e) => {
          console.log(e.message());
        });
        promise.then((e) => {
          alert("Successfully Uploaded to the dataBase ");
        });
      });
    }
  );
});
