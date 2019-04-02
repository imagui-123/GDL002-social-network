// const home = document.getElementById("home");

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
    history.replaceState({}, 'Home', '#home');
    window.addEventListener('popstate', app.poppin);
  },
  nav: function(ev) {
    ev.preventDefault();
    // home.style.display="block";
    let currentPage = ev.target.getAttribute('data-target');
    document.querySelector('.active').classList.remove('active');
    document.getElementById(currentPage).classList.add('active');
    console.log(currentPage);
    history.pushState({}, currentPage, `#${currentPage}`);
    document.getElementById(currentPage).dispatchEvent(app.show);
  },
  pageShown: function(ev) {
    console.log('Page', ev.target.id, 'just shown');
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
  poppin: function(ev) {
    console.log(location.hash, 'popstate event');
    let hash = location.hash.replace('#', '');
    document.querySelector('.active').classList.remove('active');
    document.getElementById(hash).classList.add('active');
    console.log(hash);

    //history.pushState({}, currentPage, `#${currentPage}`);
    document.getElementById(hash).dispatchEvent(app.show);
  },
};
document.addEventListener('DOMContentLoaded', app.init);

// document.addEventListener('DOMContentLoaded', routePage);
// refresh
// $(window).on('hashchange', routePage);

// function routePage() {
// var pageName = (window.location.hash) ? window.location.hash : "#home";
// $('div.pages').hide(); // Hide all pages
// $(pageName).show();    // Show the current page

/* switch for page specific functions, not used now */
//   switch(pageName) {
//     case '#home':
//       alert('Go to Home');
//       location.hash="home"
//       break;
//     case '#perfil':
//       alert('Go to perfil');
//       break;
//   }
// }
// window.onhashchange=function(e){
//   if(window.location.hash === "#"){
//     location.hash="#home";
//   } else if( window.location.hash=== "#perfil"){
//     location.hash="#perfil";
//   }
// }

// function Home(firebaseUser) {
//   location.hash = "#home";
// }

// function Perfil() {
//   location.hash = "#perfil";
// }

//FUNCIONES PARA PUBLICAR EN MURO PRINCIPAL
// Agregar documentos
function save() {
  let post = document.getElementById('post').value;
  //const lastName =document.getElementById("apellido").value;
  //const date =document.getElementById("fecha").value;
  if (post == '') {
    alert('Necesitas crear el post');
    post.value = '';
  } else {
    db.collection('userPost')
      .add({
        post: post,
        //last: lastName,
        //born: date,
      })
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
        document.getElementById('post').value = '';
        //document.getElementById("apellido").value = "";
        //document.getElementById("fecha").value = "";
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  }
}
// Leer Documentos
const tableData = document.getElementById('table-data');
db.collection('userPost').onSnapshot(querySnapshot => {
  tableData.innerHTML = '';
  querySnapshot.forEach(doc => {
    console.log(`${doc.id} => ${doc.data().post}`);
    tableData.innerHTML +=
      `
          <tr>
              <th scope="row">${doc.id}</th>
              <td>${doc.data().post}</td>` +
      //<td>${doc.data().last}</td>
      //<td>${doc.data().born}</td>
      `<td><button class= "btn btn-danger" onclick ="deletePost('${
        doc.id
      }' )" >Eliminar</button></td>
              <td><button class= "btn btn-warning" onclick ="editionPost('${doc.id}', '${
        doc.data().post
      }')" >Editar</button></td>
            </tr>`;
  });
});

//borrar datos
function deletePost(id) {
  if (!confirm('Realmente desea eliminar?') == true) {
    event.preventDefault();
    return false;
  }
  db.collection('userPost')
    .doc(id)
    .delete()
    .then(function() {
      console.log('Document successfully deleted!');
    })
    .catch(function(error) {
      console.error('Error removing document: ', error);
    });
}

//editar documentos

function editionPost(id, post) {
  document.getElementById('post').value = post;

  let editButton = document.getElementById('btnPost');
  editButton.innerHTML = 'Guardar';

  // boton.addEventListener("click",)
  editButton.onclick = function() {
    let washingtonRef = db.collection('userPost').doc(id);

    var newPost = document.getElementById('post').value;
    newPost.innerHTML = '';
    //var apellido =   document.getElementById('apellido').value;
    //var fecha =   document.getElementById('fecha').value;

    // Set the "capital" field of the city 'DC'
    return washingtonRef
      .update({
        post: newPost,
        //last: apellido,
        //born: fecha,
      })
      .then(function() {
        console.log('Document successfully updated!');
        editButton.innerHTML = 'Compartir';
        document.getElementById('post').value = '';
        if (editButton.innerHTML == 'Compartir') {
          // save();
          // document.location.href = document.location.href;
        }
      })

      .catch(function(error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  };
}

// DOM elements
// const guideList = document.querySelector('.guides');

// setup guides
// const setupGuides = (data) => {

//   if (data.length) {
//     let html = '';
//     data.forEach(doc => {
//       const guide = doc.data();
//       const li = `
//         <li>
//           <div class="collapsible-header grey lighten-4"> ${guide.title} </div>
//           <div class="collapsible-body white"> ${guide.content} </div>
//         </li>
//       `;
//       html += li;
//     });
//     guideList.innerHTML = html
//   } else {
//     guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
//   }

// };

//setup materialize components
// document.addEventListener('DOMContentLoaded', function() {

//   var modals = document.querySelectorAll('.modal');
//   M.Modal.init(modals);

// //   var items = document.querySelectorAll('.collapsible');
// //   M.Collapsible.init(items);

// });
