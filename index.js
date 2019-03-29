const home = document.getElementById("home");

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
        home.style.display="block";
        let currentPage = ev.target.getAttribute('data-target');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(currentPage).classList.add('active');
        console.log(currentPage)
        history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(currentPage).dispatchEvent(app.show);
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