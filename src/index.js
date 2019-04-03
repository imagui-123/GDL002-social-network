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
    )
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


//FUNCIONES PARA PUBLICAR EN MURO PRINCIPAL

   document.addEventListener('DOMContentLoaded', init);

  const btnPublic=document.getElementById("btnPublic");
  const btnFriends=document.getElementById("btnFriends");
  let select= document.getElementById("filterPost");
  // collectionName ='userPost';

  if(btnFriends){
    btnFriends.addEventListener("click", ()=> {
      collectionName="userPostFriends";
      selected ="Amigos";
      readPost();
    });
  }

  if(btnPublic){
    btnPublic.addEventListener("click", ()=> {
      collectionName ='userPost';
      selected ="Publico";
      readPost();
    });
  }

   function init () {
   collectionName ='userPost';
   readPost();
 }



function filterSelected(){
  let selected= select.value;
  if (selected=="Publico") {
    collectionName ='userPost';
  } else if (selected =="Amigos") {
    collectionName='userPostFriends';
  }
}


 
// let collectionName="";
  
  let btnPost= document.getElementById("btnPost");
  if(btnPost){
    btnPost.addEventListener("click", ()=> {
      let post = document.getElementById('post').value; 
    if (post == '' || select.value=="") {
      alert('Necesitas crear el post ó seleccionar el droplist');
      post.value = '';
    } else{

      filterSelected();

      db.collection(collectionName)
        .add({
          post: post,
          filter: select.value,
          //last: lastName,
          //born: date,
        })
        .then(function(docRef) {
          console.log('Document written with ID: ', docRef.id);
          document.getElementById('post').value = '';
          document.getElementById("filterPost").value="";
        })
        .catch(function(error) {
          console.error('Error adding document: ', error);
        });
      }
  })

}

// Leer Documentos
let tableData = document.getElementById('table-data');

function readPost (){
  db.collection(collectionName).onSnapshot(querySnapshot => {
    tableData.innerHTML = '';
    querySnapshot.forEach(doc => {
      console.log(`${doc.id} => ${doc.data().post}`);
      tableData.innerHTML +=
        `
        <div class="card mb-3">
            <h5 class="card-header">${doc.id}</h5>
          <div class="card-body">
            <p class="card-text">${doc.data().post}</p>
            <button class= "btn btn-danger" onclick ="deletePost('${doc.id}' )" >Eliminar</button>
            <button class= "btn btn-warning" onclick ="editionPost('${doc.id}', '${doc.data().post}')" >Editar</button>
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

//editar documentos

function editionPost(id, post) {
  document.getElementById('post').value = post;

  let editButton = document.getElementById('btnSave');
  editButton.innerHTML = 'Guardar';

  // boton.addEventListener("click",)
  editButton.onclick = function() {
    let washingtonRef = db.collection(collectionName).doc(id);

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
        editButton.style.display="none";
        document.getElementById('post').value = '';
       
      })

      .catch(function(error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  };
}




