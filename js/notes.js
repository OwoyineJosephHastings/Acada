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
var htmlTemplate = ``;

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

  storageRef
    .once("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        resourceDocs.push(childData);
      });
    })
    .then((e) => {
      showNotes(resourceDocs);
      loadbtn.removeAttribute("disabled");
      document.getElementById(
        "selector"
      ).innerHTML = `<button  class="btn-outline-success" role="button"><a href="notes.html" role="button">BACK NOTES</a></button>`;
    });
}

function showNotes(resourceDocs) {
  htmlTemplate = "";
  $htmlWrapper.innerHTML = "";

  var year = document.getElementById("year").value;
  var semester = document.getElementById("semester").value;
  var resource = document.getElementById("resource_type").value;
  var course_code = document.getElementById("course_code").value;
  htmlTemplate = ``;
  $htmlWrapper.innerHTML = ``;
  resourceDocs.forEach((resourceDoc) => {
    htmlTemplate += `<div class="card" style="width: 18rem; display: flex;">
    <img class="card-img-top" width="50rem" height="40rem" src="resorces/images/PDF_file_icon.svg" alt="Card image cap">
    <h5 class="card-title">${
      year + "," + semester + "," + course_code + "," + resource
    }</h5>
    <div class="card-body" style= "display-flex;">
    <p class="card-text">${resourceDoc.name}</p>
    <p class="card-text">${resourceDoc.downloads} downloads</p>
      
      <a id =${resourceDoc.uplodedAt} href="${
      resourceDoc.download_link
    }" class="btn btn-primary}" >Download</a>
    </div>
  </div>`;
  });

  $htmlWrapper.innerHTML = htmlTemplate;
}

loadbtn.addEventListener("click", (e) => {
  loadbtn.setAttribute("disabled", "disabled");
  resourceDocs = [];
  e.preventDefault();
  loadNotes();
});

function updateDounload() {
  console.log("success");
}
