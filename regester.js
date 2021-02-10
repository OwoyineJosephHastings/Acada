
var signupbtn = document.getElementById("signupbtn");

/*

signupbtn.addEventListener("click",function(){

 var password = document.getElementById("passwordtxt").value,
password_repeate= document.getElementById("password_repeat").value,
email =document.getElementById("email").value;

    if(password==password_repeate){
        console.log(true);

    }else{
        console.log(false)
    }


    
});

*/


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


      // --------- 
      const auth = firebase.auth();
      
      function signup(){
        var password = document.getElementById("passwordtxt").value,
        password_repeate= document.getElementById("password_repeat").value,
        email =document.getElementById("email").value;
        
        const promise = auth.createUserWithEmailAndPassword(email,password);
        promise.catch(e => alert(e.message) );
        
      }
      
      signupbtn.addEventListener("click",signup);