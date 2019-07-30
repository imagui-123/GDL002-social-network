// const home = document.getElementById("home");

db = firebase.firestore();
// import firebase from "firebase";
let collectionName = '';
const app = {
  pages: [],
  show: new Event('show'),
  init: function() {
    app.pages = document.querySelectorAll('.page');
    app.pages.forEach(pg => {
      pg.addEventListener('show', app.pageShown);
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', app.nav);
    });
    // history.replaceState({}, 'bienvenida', '#bienvenida');
    history.replaceState({}, 'Home', '#home');
    window.addEventListener('popstate', app.poppin);
  },
  nav: function(ev) {
    ev.preventDefault();
    // home.style.display="block";
    let currentPage = ev.target.getAttribute('data-target');
    document.querySelector('.active').classList.remove('active');
    document.getElementById(currentPage).classList.add('active');
    // console.log(currentPage);
    history.pushState({}, currentPage, `#${currentPage}`);
    document.getElementById(currentPage).dispatchEvent(app.show);
  },
  pageShown: function(ev) {
    // console.log('Page', ev.target.id, 'just shown');
    let h1 = ev.target.querySelector('h1');
    h1.classList.add('big');
    setTimeout(
      h => {
        h.classList.remove('big');
      },
      1200,
      h1,
    );
  },
  poppin: function() {
    console.log(location.hash, 'popstate event');
    let hash = location.hash.replace('#', '');
    document.querySelector('.active').classList.remove('active');
    document.getElementById(hash).classList.add('active');
    console.log(hash);
    document.getElementById(hash).dispatchEvent(app.show);
  },
};
document.addEventListener('DOMContentLoaded', app.init);

//FUNCIONES PARA PUBLICAR EN MURO PRINCIPAL

document.addEventListener('DOMContentLoaded', init);

const btnPublic = document.getElementById('btnPublic');
const btnFriends = document.getElementById('btnFriends');
let select = document.getElementById('filterPost');

let selected;

if (btnFriends) {
  btnFriends.addEventListener('click', () => {
    collectionName = 'userPostFriends';
    selected = 'Amigos';
    readPost();
  });
}

if (btnPublic) {
  btnPublic.addEventListener('click', () => {
    collectionName = 'userPost';
    selected = 'Publico';
    readPost();
  });
}

function init() {
  collectionName = 'userPost';
  readPost();
}

function filterSelected() {
   selected = select.value;
  if (selected == 'Publico') {
    collectionName = 'userPost';
  } else if (selected == 'Amigos') {
    collectionName = 'userPostFriends';
  }
}

// AGREGAR POST

let btnPost = document.getElementById('btnPost');
if (btnPost) {
  btnPost.addEventListener('click', () => {
    let post = document.getElementById('post').value;
    let likes = 0;

    // let likes=0;
    if (post == '' || select.value == '') {
      alert('Necesitas crear el post ó seleccionar el droplist');
      post.value = '';
    } else {
      filterSelected();
     
      db.collection(collectionName)
        .add({
          post: post,
          filter: select.value,
          like: likes,
          date: new Date()
  
        })
        .then(function(docRef) {
          console.log('Document written with ID: ', docRef.id);
          document.getElementById('post').value = '';
          document.getElementById('filterPost').value = '';
          db.collection('users');
          
          
        })
        .catch(function(error) {
          console.error('Error adding document: ', error);
        });
    }
  });
}

// Leer Documentos
let tableData = document.getElementById('table-data');

function readPost() {
  editButton.style.display = 'none';
   db.collection(collectionName).onSnapshot(querySnapshot => {
    tableData.innerHTML = '';
    querySnapshot.forEach(doc => {
      // console.log(`${doc.id} => ${doc.data().post} primero`);
      // console.log(`${doc.id} => ${doc.data().nombre}`);
      tableData.innerHTML += `
        <div class="card mb-3 border-secondary mb-3">
            <h5 class="card-header border-primary"> <div class= "likeCount"><button class="btn btnLike" onclick="addLikes('${doc.id}', '${doc.data().like}')"><img src="../img/likeHeart.png"><label id="likes${doc.id}">${doc.data().like}</label></button></div></h5>
          <div class="card-body">
          <p class="card-text">${doc.data().post}</p>
            <button class= "btn btn-danger" onclick ="deletePost('${doc.id}' )" >Eliminar</button>
            <button class= "btn btn-warning" onclick ="editionPost('${doc.id}', '${
        doc.data().post
      }')" >Editar</button>
          </div>
        </div>   `;
    });
  });
}

//borrar datos
function deletePost(id) {
  if (!confirm('Realmente desea eliminar?') == true) {
    event.preventDefault();
    return false;
  }
  db.collection(collectionName)
    .doc(id)
    .delete()
    .then(function() {
      console.log('Document successfully deleted!');
    })
    .catch(function(error) {
      console.error('Error removing document: ', error);
     
    });
}
console.log(deletePost);

//editar documentos
let editButton = document.getElementById('btnSave');
function editionPost(id, post) {
  btnPost.style.display = 'none';
  editButton.style.display = 'block';
  document.getElementById('post').value = post;

  editButton = document.getElementById('btnSave');
  editButton.innerHTML = 'Guardar';

  // boton.addEventListener("click",)
  editButton.onclick = function() {
    let washingtonRef = db.collection(collectionName).doc(id);

    let newPost = document.getElementById('post').value;
    newPost.innerHTML = '';

    return washingtonRef
      .update({
        post: newPost,
        
        
      })
      .then(function() {
        // console.log('Document successfully updated!');
        editButton.style.display = 'none';
        document.getElementById('post').value = '';
        btnPost.style.display = 'block';
      })

      .catch(function(error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
        
      });
  };
}
console.log(editionPost);

function addLikes(id, likes) {
  
  likes++;

  likes = parseInt(likes);
  let washingtonRef = db.collection(collectionName).doc(id);

  return washingtonRef
    .update({
      like: likes,
    })
    .then(function() {
      console.log('Document successfully updated!');
    })

    .catch(function(error) {
    
      console.error('Error updating document: ', error);
    });
}
console.log(addLikes);


// $('.modal-content').resizable({
//   //alsoResize: ".modal-dialog",
//   minHeight: 300,
//   minWidth: 300
// });
// $('.modal-dialog').draggable();

// $('#myModal').on('show.bs.modal', function() {
//   $(this).find('.modal-body').css({
//     'max-height': '100%'
//   });
// });