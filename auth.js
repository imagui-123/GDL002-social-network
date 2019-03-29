const welcomeScreen = document.getElementById("bienvenida");
const homeScreen = document.getElementById("navInicio");
// signup
const signupForm = document.querySelector(".signup-form");
// login
const loginForm = document.querySelector(".login-form");
// obtener el usuario que accedio
let user = auth.currentUser;

//listen for auth status changes
function status() {
  auth.onAuthStateChanged(user => {
    if (user) {
      //console.log('user logged in', user);
      welcomeScreen.style.display ="none";
      homeScreen.style.display ="block";
      
      // document.addEventListener('click', app());
      // reloadS();
    } else {
      //console.log('user logged out');
      welcomeScreen.style.display = "block";
    }
  });
}

/*function prueba(){
 console.log(auth.currentUser);
 status();
}*/

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
    alert("verifique su correo");
    $("#modal-login").modal("hide"); 
    signupForm.reset();

  });
});

// logout
// const logout = document.querySelector('#logout');
// logout.addEventListener('click', (e) => {
//   e.preventDefault();
//   auth.signOut();
// });

loginForm.addEventListener("submit", e => {
  e.preventDefault();
  // get user info

  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;
  // log the user in
  auth.signInWithEmailAndPassword(email, password).then(credential => {
    // close the signup modal & reset form
    const modal = document.querySelector("#modal-login");
    console.log(credential);
    user = credential.user;
    loginForm.reset();
    status();
    $("#modal-login").modal("hide");
    
    if (!user.emailVerified) {
      
      console.log("email no verificado");
    }
  });
  
});


// user.reauthenticateAndRetrieveDataWithCredential(cred).then(function() {
//   // User re-authenticated.
// }).catch(function(error) {
//   // An error happened.
// });

// email verification
function sendVerification() {
  const user = auth.currentUser;

  user
    .sendEmailVerification()
    .then(cred => {
      console.log("Se envio email de verificación");
    })
    .catch(function(error) {
      // An error happened.
    });
}

function outSesion() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      // Sign-out successful.
      welcomeScreen.style.display = "block";
      homeScreen.style.display = "none";
    })
    .catch(function(error) {
      // An error happened.
    });
}
document.getElementById("closeSesion").addEventListener("click", outSesion);

//   const app = {
//   pages: [],
//   show: new Event('show'),
//   init: function(){
//       app.pages = document.querySelectorAll('.page');
//       app.pages.forEach((pg)=>{
//           pg.addEventListener('show', app.pageShown);
//       })

//       document.querySelectorAll('.nav-link').forEach((link)=>{
//           link.addEventListener('click', app.nav);
//       })
//       history.replaceState({}, 'Home', '#home');
//       window.addEventListener('popstate', app.poppin);
//   },
//   nav: function(ev){
//       ev.preventDefault();
//       let currentPage = ev.target.getAttribute('data-target');
//       document.querySelector('.active').classList.remove('active');
//       document.getElementById(currentPage).classList.add('active');
//       console.log(currentPage)
//       history.pushState({}, currentPage, `#${currentPage}`);
//       document.getElementById(currentPage).dispatchEvent(app.show);
//   },
//   pageShown: function(ev){
//       console.log('Page', ev.target.id, 'just shown');
//       let h1 = ev.target.querySelector('h1');
//       h1.classList.add('big')
//       setTimeout((h)=>{
//           h.classList.remove('big');
//       }, 1200, h1);
//   },
//   poppin: function(ev){
//       console.log(location.hash, 'popstate event');
//       let hash = location.hash.replace('#' ,'');
//       document.querySelector('.active').classList.remove('active');
//       // document.getElementById(hash).classList.add('active');
//       console.log(hash)
//       //history.pushState({}, currentPage, `#${currentPage}`);
//       document.getElementById(hash).dispatchEvent(app.show);
//   }
// }
// document.addEventListener('DOMContentLoaded', app.init);
 

