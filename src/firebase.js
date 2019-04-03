
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCEe4i1ctA_0VP28SkTxUADjksses3iLo4",
      authDomain: "soy-viajera.firebaseapp.com",
      databaseURL: "https://soy-viajera.firebaseio.com",
      projectId: "soy-viajera",
      storageBucket: "soy-viajera.appspot.com",
      messagingSenderId: "621266714862"
    };
    firebase.initializeApp(config);
    // make auth and firestore references
    const auth = firebase.auth();
    const db = firebase.firestore();
    // update firestore settings
    const database = firebase.database();
    // db.settings({ timestampsInSnapshots: true });
 
// let uid=user.uid;

  
// function guardar() {
// let nombre= document.getElementById("nombre").value;
// let apellido= document.getElementById("apellido").value;
//   db.collection("users").add({
//       first: nombre,
//       last: apellido
   
//   })
//     .then(function (docRef) {
//       console.log("Document written with ID: ", docRef.id);
//       document.getElementById("nombre").value = "";
//       document.getElementById("apellido").value = "";
//     })
//     .catch(function (error) {
//       console.error("Error adding document: ", error);
//     });

// }