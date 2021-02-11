
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

        function signin(){
        var email = document.getElementById("email_login").value;
        var password = document.getElementById("password_login").value;
        
        const promise = auth.signInWithEmailAndPassword(email,password);
        promise.catch(e => alert(e.message) );
        console.log(email )
        promise.then(e=>{
            
            alert("Signed " + email + " successfully")
            window.location ="register.html";
    })

      }

      var signinbtn = document.getElementById("signin");
      signinbtn.addEventListener("click",signin);