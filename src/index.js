import "./css/style.css"; // connect css to template.html
import { displayBookDescription } from "./js/displayDescription";
import { printBooks } from "./js/printBooks";
import axios from "axios";

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

  let myList = document.getElementById("homeSubmenu");
  let myList2 = document.getElementById("pageSubmenu");
  let myList3 = document.getElementById("pageSubmenu2");
  let myList4 = document.getElementById("pageSubmenu3");

  myList4.addEventListener("click", function (e) {
    let targetSub = e.target.id;
    recuperaUtenti(targetSub);
  });
  myList3.addEventListener("click", function (e) {
    let targetSub = e.target.id;
    recuperaUtenti(targetSub);
  });
  myList2.addEventListener("click", function (e) {
    let targetSub = e.target.id;
    recuperaUtenti(targetSub);
  });
  myList.addEventListener("click", function (e) {
    let targetSub = e.target.id;
    recuperaUtenti(targetSub);
  });
}, 200);

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
    ListaLibri = await axios.get(URL_LIBRI);
    let axiosBooks = ListaLibri.data.works;
    printBooks(axiosBooks);
    displayBookDescription();
  } catch (e) {
    console.log(e);
  } finally {
    document.getElementsByClassName("spinner-border")[0].style.display = "none";
  }
}
