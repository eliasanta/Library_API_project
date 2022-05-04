     
//variabili const. Queste sono le URL delle API e non devono essere modificate

const URL_DESCRIPTION="https://openlibrary.org"
const URL_USERS = "https://jsonplaceholder.typicode.com/users";
const URL_PHOTOS = "https://jsonplaceholder.typicode.com/photos";
const URL_TODOS = "https://jsonplaceholder.typicode.com/todos";
const URL_ALBUMS = "https://jsonplaceholder.typicode.com/albums";
const URL_POST = "https://jsonplaceholder.typicode.com/posts";
const URL_COMMENTS = "https://jsonplaceholder.typicode.com/comments";


var api = new Request();
var post = new Posts();//creo array vuoti
var desc =new Description();
var albums = new Albums();
var todos = new Todo();

//**************************************************************for sidebar */
let ListaLibri = []; //creo variabile lista libri
$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});
//*************************************************************************** */
//************************************imposto un piccolo ritardo in quanto devono prima caricarsi gli script */
const myTimeout = setTimeout(()=>{
    document.getElementsByClassName("spinner-border")[0].style.display = "none";
    let btn=document.getElementById('getListId');
    btn.addEventListener('click',function () {
        let targetValue = document.getElementById("subList").value;
        //in base a quello selezionato in lista carico i libri
        recuperaUtenti(targetValue);
      });
}, 100);


/*  window.addEventListener("load", function(){
    recuperaUtenti();
})  */
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

function searchTitle(){
    const srcTitle = document.getElementById('searchTitle');
    //********************funzione per filtrare la ricerca */
     srcTitle.addEventListener("keyup", (e) => {
      const SearchString = e.target.value;
      console.log(SearchString)
      const filteredBooks = ListaLibri.filter((book) => {
        return book.title.includes(SearchString);
      });
      printBooks(filteredBooks);
    });
}

 
async function recuperaUtenti(subject){
    console.log(subject)
    const URL_LIBRI =`https://openlibrary.org/subjects/${subject}.json`;
    document.getElementsByClassName("spinner-border")[0].style.display = "block"; // visualizza lo spinner che viene disattivato alla conclusione della chiamata. Riga 44
    try{
        let libri = await api.getFetch(URL_LIBRI);
        printBooks(libri.works);
        searchTitle();
        
    }
    catch(e){
        console.log(e);
    }
    finally{
        document.getElementsByClassName("spinner-border")[0].style.display = "none";
    }
}


function printBooks(elemResp){//passo oggetto completo fantasy
    
    ListaLibri = elemResp;
    let str = `<h2 class="mb-3">Lista libri</h2>`;
    
    ListaLibri.forEach((elem) => {//lista libri completa
      str += `<div class="card card-body mb-2 mt-2">
                    <h3>${elem.title}</h3>
                    <p>elenco autori</p>
                    <ul id="listAuthor">
                    ${elem.authors.map((ele) => `<li >${ele.name}</li>`)}
                    </ul>
                    <div>
                    <button class='btn btn-success' data-bs-toggle="modal" data-bs-target="#modalDesc" onclick='showDescription("${elem.key}")'>DESCRIPTION_test</button>
                    </div>
             </div> `;                 
    });
    
    document.getElementById("output").innerHTML = str;
    }

   
   

//creo la funzione per mostrarmi la descrizione
 function showDescription(userKey) {//gli ho passato la chiave
    document.getElementsByClassName("spinner-border")[0].style.display = "block";
    desc.showPostByUserKey(userKey);//gli passo la chiave
} 



