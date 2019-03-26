
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
    // db.settings({ timestampsInSnapshots: true });
  