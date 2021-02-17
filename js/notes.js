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

// --------- firebase reference--------------
var loadbtn = document.getElementById("submit");
let resourceDocs = [];
var $htmlWrapper = document.querySelector("#resoures");
var htmlTemplate = `<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="resorces/images/pdf icon.png" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Control Systems Engineering</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="" class="btn btn-primary">Go To course</a>
  </div>
</div>`;

function loadNotes() {
  var year = document.getElementById("year").value;
  var semester = document.getElementById("semester").value;
  var resource = document.getElementById("resource_type").value;
  var course_code = document.getElementById("course_code").value;

  const storageRef = firebase
    .database()
    .ref(
      "university/makerere/cedat/school of engineering/mechanical engineering/" +
        year +
        "/" +
        semester +
        "/" +
        course_code +
        "/" +
        resource
    );

  storageRef.once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      console.log(
        childData.name,
        "\n download link = ",
        childData.download_link
      );
    });
  });
}

loadbtn.addEventListener("click", (e) => {
  e.preventDefault();

  loadNotes();
});
