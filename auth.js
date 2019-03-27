const welcomeScreen= document.getElementById("welcomeScreen");
const homeScreen= document.getElementById("homeScreen");
// signup
const signupForm = document.querySelector('.signup-form');
// login
const loginForm = document.querySelector('.login-form');
// obtener el usuario que accedio
let user= auth.currentUser;

//listen for auth status changes
function status(){
 auth.onAuthStateChanged(user => {
   if(user){
     //console.log('user logged in', user);
     welcomeScreen.style.display ="none";
     homeScreen.style.display= "block";
   }else {
     //console.log('user logged out');
     welcomeScreen.style.display = "block";
   }
 });
}

/*function prueba(){
 console.log(auth.currentUser);
 status();
}*/

signupForm.addEventListener('submit', (e) => {
 e.preventDefault();
 // get user info
 const email = signupForm['signup-email'].value;
 const password = signupForm['signup-password'].value;
 // sign up the user
 auth.createUserWithEmailAndPassword(email, password).then(cred => {
   // close the signup modal & reset form
   const modal = document.querySelector('#modal-signup');
   sendVerification();
   alert('verifique su correo');
   //M.Modal.getInstance(modal).close();
   signupForm.reset();
 });
});

// logout
// const logout = document.querySelector('#logout');
// logout.addEventListener('click', (e) => {
//   e.preventDefault();
//   auth.signOut();
// });



loginForm.addEventListener('submit', (e) => {
 e.preventDefault();  
 // get user info

 const email = loginForm['login-email'].value;
 const password = loginForm['login-password'].value;
 // log the user in
 auth.signInWithEmailAndPassword(email, password).then((credential) => {
   // close the signup modal & reset form
   const modal = document.querySelector('#modal-login');
   //M.Modal.getInstance(modal).close();
   console.log(credential);
   user = credential.user;
   loginForm.reset();
   status();
   $("#modal-login").modal("hide");
   if(!user.emailVerified){
     console.log("email no verificado");
   }
 
 });
});
/*
if(user){
 console.log("user is signed in");
 
} else {
 console.log("no user is signed in."); 
}
*/

   // user.reauthenticateAndRetrieveDataWithCredential(cred).then(function() {
   //   // User re-authenticated.
   // }).catch(function(error) {
   //   // An error happened.
   // });

// email verification
function sendVerification () {
 const user = auth.currentUser;

 user.sendEmailVerification().then(cred => {
   console.log("Se envio email de verificación");
 }).catch(function(error) {
   // An error happened.
 });
}

function outSesion(){
firebase.auth().signOut().then(function() {
 // Sign-out successful.
 console.log("estamos fuera");
}).catch(function(error) {
 // An error happened.
});
}
document.getElementById("closeSesion").addEventListener('click',outSesion);

