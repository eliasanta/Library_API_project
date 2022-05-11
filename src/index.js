import './css/style.css'; // connect css to template.html
import { Description } from './js/description';
import { Request } from './js/request';

/* import {Description} from "./description.js";
import {Request} from "./request.js"; */

/* const URL_DESCRIPTION = "https://openlibrary.org"; */

var api = new Request();
var desc = new Description();

let ListaLibri = []; //dove inserirò libri filtrati e non

//**************************************************************for sidebar */

$(document).ready(function () {
  $("#sidebarCollapse").on("click", function () {
    $("#sidebar").toggleClass("active");
  });
});
//*************************************************************************** */
//************************************imposto un piccolo ritardo in quanto devono prima caricarsi gli script */

//metodo alternativo per caricare lista Libri
setTimeout(() => {
    document.getElementsByClassName("spinner-border")[0].style.display = "none";

    myList=document.getElementById('homeSubmenu');
    myList2=document.getElementById('pageSubmenu');
    myList3=document.getElementById('pageSubmenu2');
    myList4=document.getElementById('pageSubmenu3');

    myList4.addEventListener("click", function (e) {
      let targetSub= e.target.id;
      recuperaUtenti(targetSub);
    });
    myList3.addEventListener("click", function (e) {
      let targetSub= e.target.id;
      recuperaUtenti(targetSub);
    });
    myList2.addEventListener("click", function (e) {
      let targetSub= e.target.id;
      recuperaUtenti(targetSub);
    });
    myList.addEventListener("click", function (e) {
      let targetSub= e.target.id;
      recuperaUtenti(targetSub);
    });
  }, 200);

/**
 * mostra il messaggio di errore nell'HTML
 * @param {string} message
 */
 function showMessageError(message) {
  document.getElementById("errorTxt").textContent = message;
  document.getElementById("errorTxt").style.display = "block";
}
/**
 * nasconde il messaggio di errore nell'HTML
 */
 function hideMessageError() {
  document.getElementById("errorTxt").style.display = none;
}


setTimeout(() => {
  const srcTitle = document.getElementById("searchTitle");
  //********************funzione per filtrare la ricerca */
  srcTitle.addEventListener("keyup", (e) => {
    const SearchString = e.target.value.toLowerCase();
    //console.log(SearchString);per vedere cosa digito nel filter
    const filteredBooks = ListaLibri.works.filter((book) => {
      return book.title.toLowerCase().includes(SearchString);
    });

    printBooks(filteredBooks);
  });
}, 100);

 async function recuperaUtenti(subject) {
  const URL_LIBRI = `https://openlibrary.org/subjects/${subject}.json`;
  document.getElementsByClassName("spinner-border")[0].style.display = "block"; // visualizza lo spinner che viene disattivato alla conclusione della chiamata. Riga 44
  try {
    ListaLibri = await api.getFetch(URL_LIBRI);
    printBooks(ListaLibri.works);

  } catch (e) {
    console.log(e);
  } finally {
    document.getElementsByClassName("spinner-border")[0].style.display = "none";
  }
}

function printBooks(elemResp) {
  //passo oggetto completo 
  let str = `<h2 class="mb-4 text-center">Lista libri</h2>`;
  elemResp.forEach((elem) => {
    str += `<div  class="card card-body mb-5 p-3">
                    <h4 class="mt-2 mb-2">${elem.title}</h4>
                        <div id="cardFormat" class="d-flex justify-content-around mt-3 mb-3">                          
${elem.authors.map((ele) => `<div id="title" class="Lista Autori mb-4 mt-3"> Autore:
                                <div id="author" class="mt-3">
                                ${ele.name}
                                </div>
                             </div>`)
                            .slice(0, 1)}
                        <div id="imageCover"><img  src="https://covers.openlibrary.org/b/olid/${elem.cover_edition_key}-M.jpg" /></div>
                          <div id="buttonDesc" class="align-self-end">
                            <button class='btn btn-success mt-3 text-center ' data-bs-toggle="modal" data-bs-target="#modalDesc" onclick='showDescription("${elem.key}")'>Book Description</button>
                          </div>
                        </div>
                      </div> `;
  });

  document.getElementById("output").innerHTML = str;
}

/* export function showCover(cover){
  //console.log(cover)
  cov.showCoverByUser(cover)
} */

//creo la funzione per mostrarmi la descrizione
 function showDescription(userKey) {
  //gli ho passato la chiave
  desc.showPostByUserKey(userKey); //gli passo la chiave
}
