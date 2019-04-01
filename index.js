// const home = document.getElementById("home");

const app = {
    pages: [],
    show: new Event('show'),
    init: function(){
        app.pages = document.querySelectorAll('.page');
        app.pages.forEach((pg)=>{
            pg.addEventListener('show', app.pageShown);
        })
  
        document.querySelectorAll('.nav-link').forEach((link)=>{
            link.addEventListener('click', app.nav);
        })
        history.replaceState({}, 'Home', '#home');
        window.addEventListener('popstate', app.poppin);
    },
    nav: function(ev){
        ev.preventDefault();
        // home.style.display="block";
        let currentPage = ev.target.getAttribute('data-target');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(currentPage).classList.add('active');
        console.log(currentPage)
        history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(currentPage).dispatchEvent(app.show);
        Home(firebaseUser);
    },
    pageShown: function(ev){
        console.log('Page', ev.target.id, 'just shown');
        let h1 = ev.target.querySelector('h1');
        h1.classList.add('big')
        setTimeout((h)=>{
            h.classList.remove('big');
        }, 1200, h1);
    },
    poppin: function(ev){
        console.log(location.hash, 'popstate event');
        let hash = location.hash.replace('#' ,'');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(hash).classList.add('active');
        console.log(hash)
        //history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(hash).dispatchEvent(app.show);
    }
  }
  document.addEventListener('DOMContentLoaded', app.init);

   //FUNCIONES PARA PUBLICAR EN MURO PRINCIPAL
// Agregar documentos
function save(){
    let firstName =document.getElementById("nombre").value;
    //const lastName =document.getElementById("apellido").value;
    //const date =document.getElementById("fecha").value;
    if(firstName == "" ) {
      alert("Necesitas crear el post")
      firstName.value="";
    }
    else {
      db.collection("users").add({
        first: firstName,
        //last: lastName,
        //born: date,
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById("nombre").value = "";
        //document.getElementById("apellido").value = "";
        //document.getElementById("fecha").value = "";
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    
  }
  }
     // Leer Documentos
    const tableData = document.getElementById("table-data");
     db.collection("users").onSnapshot((querySnapshot) => {
       tableData.innerHTML ="";
      querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data().first}`);
          tableData.innerHTML += `
          <tr>
              <th scope="row">${doc.id}</th>
              <td>${doc.data().first}</td>`+
              //<td>${doc.data().last}</td>
               //<td>${doc.data().born}</td>
               `<td><button class= "btn btn-danger" onclick ="deletePost('${doc.id}' )" >Eliminar</button></td>
              <td><button class= "btn btn-warning" onclick ="editionPost('${doc.id}', '${doc.data().first}')" >Editar</button></td>
            </tr>`
      });
    });
    
    //borrar datos
    function deletePost (id){
      if(!confirm("Realmente desea eliminar?")==true){
        event.preventDefault();
        return false;
      }
        db.collection("users").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
        
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
    }
    
    
    //editar documentos 
    
    
    function editionPost (id, nombre){
    
      document.getElementById('nombre').value = nombre;
     // document.getElementById('apellido').value = apellido;
      //document.getElementById('fecha').value = fecha;
      
      var editButton = document.getElementById('boton');
      editButton.innerHTML = 'Editar';
    
    // boton.addEventListener("click",)
      boton.onclick = function (){
      var washingtonRef = db.collection("users").doc(id);
    
      var nombre =   document.getElementById('nombre').value;
      nombre.innerHTML="";
      //var apellido =   document.getElementById('apellido').value;
      //var fecha =   document.getElementById('fecha').value;
    
    
      // Set the "capital" field of the city 'DC'
      return washingtonRef.update({
        first: nombre,
        //last: apellido,
        //born: fecha,
      })
      .then(function() {
          console.log("Document successfully updated!");
          boton.innerHTML = "Guardar";
        })
    
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
      
      }
      
    }


  function Home(firebaseUser) {
      location.hash = "#home";
   }
   
   function Perfil() {
      location.hash = "#perfil";
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