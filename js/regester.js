
var signupbtn = document.getElementById("signupbtn");
var cancelbtn = document.getElementById("cancelbtn")



    // -----------------firebase config ----------
    var firebaseConfig = {
        apiKey: "AIzaSyDzcaQsMg9-3vSzg8ekuOxdMg9OuG_oEzo",
        authDomain: "ssn-project-b13d6.firebaseapp.com",
        projectId: "ssn-project-b13d6",
        storageBucket: "ssn-project-b13d6.appspot.com",
        messagingSenderId: "743494701844",
        appId: "1:743494701844:web:359881ba2bbb5279efa801"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);


      // --------- firebase auth--------------
      const auth = firebase.auth();
      
      function signup(){
        var password = document.getElementById("passwordtxt").value,
        password_repeate= document.getElementById("password_repeat").value,
        email =document.getElementById("email").value;
        
        const promise = auth.createUserWithEmailAndPassword(email,password);
        promise.catch(e => alert(e.message) );
        
      }
           signupbtn.addEventListener("click",signup);
           cancelbtn.addEventListener("click",function(){
             window.location ="index.html";
           });
