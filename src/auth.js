const welcomeScreen = document.getElementById('bienvenida');

const homeScreen = document.getElementById('navInicio');

const home=document.getElementById('home');
const carouselScreen= document.getElementById('carouselExampleSlidesOnly');
// const btnPublic=document.getElementById("btnPublic");
// const btnFriends=document.getElementById("btnFriends");
const callShowFriends="";
home.style.display="none";




// signup
const signupForm = document.querySelector('.signup-form');
// login
const loginForm = document.querySelector('.login-form');
// // obtener el usuario que accedio
let user = auth.currentUser;


signupForm.addEventListener("submit", e => {
  e.preventDefault();
  // get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;
  
  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    // close the signup modal & reset form
    
    const modal = document.querySelector("#modal-signup");
    sendVerification();
    signupForm.reset();
    
    $("#modal-signup").modal("hide"); 
   
  })
  .catch(function(error){
    let errorMessage=error.message;
    let errors=errorMessages (errorMessage);
    alert(errors);
  })
});

//listen for auth status changes
function status() {
  auth.onAuthStateChanged(user => {
    if (user) {
      console.log(user);
      // console.log(user.emailVerified);
    //  let uid=user.uid;
    //  saveData(uid);
      //console.log('user logged in', user);
      welcomeScreen.style.display ="none";
      homeScreen.style.display ="block";
      home.style.display="block";
     
    } else {
      //console.log('user logged out');
      welcomeScreen.style.display = "block";
      homeScreen.style.display ="none";
      home.style.display="none";
    }
  });
}

//   db.collection("users").add({
//       first: nombre,
//       last: apellido

// function saveData(uid){
// let nombre= document.getElementById("nombre").value;
// let apellido= document.getElementById("apellido").value;
//   let user= {
//     nombre: nombre.value,
//     apellido: apellido.value,
//   }
//   //dentro de la rama usuarios, se guarda el usuario con su uid
//   db.collection.add("/users/" + uid)
//   .set(user);
// }

loginForm.addEventListener("submit", e => {
  e.preventDefault();
  // get user info

  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;
  // log the user in
  auth.signInWithEmailAndPassword(email, password).then(cred => {
    // close the signup modal & reset form
    const modal = document.querySelector("#modal-login");
    // console.log(cred);
    user = cred.user;
    status();
    $("#modal-login").modal("hide"); 
    loginForm.reset();
    if (!user.emailVerified) {
      const errorMessage="Verifica la dirección de tú correo electrónico";
      console.log("email no verificado");
      alert(errorMessage);
      auth.signOut();
    }

  })
  .catch(function(error){
    let errorMessage=error.message;
    let errors= errorMessages (errorMessage);
    alert(errors);
    console.log("error log in");
    
  });
 
});


// email verification
function sendVerification() {
  let user = auth.currentUser;
  user.updateProfile({
    displayName:name,
  })

  user
    .sendEmailVerification()
    .then(credential => {
      alert("Te enviamos un correo de verificación");
      // console.log("Se envio email de verificación");
    })
    .catch(function(error) {
      // An error happened.
      console.log(error);
    });
}


function outSesion() {
 
    auth.signOut()
    .then(function() {
      // window.location.reload(true);
      welcomeScreen.style.display = "block";
      
      homeScreen.style.display = "none";
      home.style.display="none";
      // home.style.display="none";
    })
    .catch(function(error) {
      console.log(error);
      // An error happened.
    });
}
document.getElementById("closeSesion").addEventListener("click", outSesion);

//Función para mostrar mensajes de error en español
const errorMessages = (errorMessage)=>{
  switch (errorMessage) {
  case 'Password should be at least 6 characters':
    return "La contraseña debe tener al menos 6 dígitos";
  case 'The email address is badly formatted.':
    return "Introduce un email válido";
  case "The email address is already in use by another account.":
    return "Este email ya está registrado";
  case "The password is invalid or the user does not have a password.":
    return "La contrseña es incorrecta";
  case "There is no user record corresponding to this identifier. The user may have been deleted.":
    return "No hay un usuario registrado con éste correo";
    break;
    default:
    return errorMessage;
}
  }

 
