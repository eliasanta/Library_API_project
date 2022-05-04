//variabili const. Queste sono le URL delle API e non devono essere modificate

const URL_DESCRIPTION = "https://openlibrary.org";
const URL_USERS = "https://jsonplaceholder.typicode.com/users";
const URL_PHOTOS = "https://jsonplaceholder.typicode.com/photos";
const URL_TODOS = "https://jsonplaceholder.typicode.com/todos";
const URL_ALBUMS = "https://jsonplaceholder.typicode.com/albums";
const URL_POST = "https://jsonplaceholder.typicode.com/posts";
const URL_COMMENTS = "https://jsonplaceholder.typicode.com/comments";

var api = new Request();
var post = new Posts(); //creo array vuoti
var desc = new Description();
var albums = new Albums();
var todos = new Todo();

let ListaLibri = []; //dove inserirò libri filtrati e non

//**************************************************************for sidebar */

$(document).ready(function () {
  $("#sidebarCollapse").on("click", function () {
    $("#sidebar").toggleClass("active");
  });
});
//*************************************************************************** */
//************************************imposto un piccolo ritardo in quanto devono prima caricarsi gli script */
setTimeout(() => {
  document.getElementsByClassName("spinner-border")[0].style.display = "none";
  let btn = document.getElementById("getListId");
  btn.addEventListener("click", function () {
    let targetValue = document.getElementById("subList").value;
    //in base a quello selezionato in lista carico i libri
    recuperaUtenti(targetValue);
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
    console.log(SearchString);
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
  //passo oggetto completo fantasy

  let str = `<h2 class="mb-3">Lista libri</h2>`;

  elemResp.forEach((elem) => {
    //lista libri completa

    //gli autori li limito al primo
    str += `<div class="card card-body mb-3 ">
                    <h4 class="mt-1">${elem.title}</h4>
                    <h6 class="pr-6">Autore:</h6>
                        <div class="Lista Autori mb-3" >
                        ${elem.authors
                          .map((ele) => `<span> ${ele.name}</span>`)
                          .slice(0, 1)}
                        </div>
                    <div>
                    <button class='btn btn-success' data-bs-toggle="modal" data-bs-target="#modalDesc" onclick='showDescription("${
                      elem.key
                    }")'>Book Description</button>
                    </div>
             </div> `;
  });

  document.getElementById("output").innerHTML = str;
}

//creo la funzione per mostrarmi la descrizione
function showDescription(userKey) {
  //gli ho passato la chiave
  document.getElementsByClassName("spinner-border")[0].style.display = "block";
  desc.showPostByUserKey(userKey); //gli passo la chiave
}
