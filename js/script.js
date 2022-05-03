     
//variabili const. Queste sono le URL delle API e non devono essere modificate
const URL_LIBRI_FANTASY ="https://openlibrary.org/subjects/fantasy.json";
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

let ListaLibri = []; //creo variabile lista libri
$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});

window.addEventListener("load", function(){
    recuperaUtenti();
})
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

 
async function recuperaUtenti(){
    document.getElementsByClassName("spinner-border")[0].style.display = "block"; // visualizza lo spinner che viene disattivato alla conclusione della chiamata. Riga 44
    try{
        let libri = await api.getFetch(URL_LIBRI_FANTASY);
        
        //stampaUtenti(libri.works);
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
//*******************************************************************************************non la sto usando */
            function stampaUtenti(listaLibri){ //passato la lista di libri fantasy
                //console.log(listaLibri)  
                let str = "";
                listaLibri.forEach(element => {
                    str += "<tr>";
                    str += recuperoInfoUser(element);
                    str += "</tr>";
                });
                document.getElementById('userList').innerHTML = str;
            
            }
            function recuperoInfoUser(element){//elemento singolo
                str="";
                str += "<td>"+ (element.title)+"</td>";
                str += "<td>"+ buttonUser(element.key) + "</td>";
                str += "<td>"+ element.authors.map((ele) => `<span>${ele.name}</span>`) +"</td>";
                //console.log(element.key)//chiave singola
                return str;
            }
            const buttonUser = function(key){//gli passo l'indirizzo completo
                let str = "";    
            // str += `<button class='btn btn-success' onclick='descriptionApiRequest("${key}")'>DESCRIPTION</button>`;
            // str += `<button class='btn btn-success' data-bs-toggle="modal" data-bs-target="#modalDesc" onclick='showDescription("${key}")'>DESCRIPTION_test</button>`;
                return str;
            } 
//******************************************************************************************************* */    

function printBooks(elemResp){//passo oggetto completo fantasy
    console.log(elemResp)
    ListaLibri = elemResp;
    let str = `<h2 class="mb-3">Lista libri</h2>`;
    
    ListaLibri.forEach((elem) => {//lista libri completa
      str += `<div class="card card-body mb-2">
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

   
    
    /* function printBooksTest(elemResp){
       
        ListaLibri = elemResp.works;
        ListaLibri.forEach((elem) => {
            const card= userCardTemplate.content.cloneNode(true).children[0];
            const header=card.querySelector('[data-header]');
            const body=card.querySelector('[data-body]');
            header.textContent=elem.title;
            body.textContent=elem.authors.forEach(elem=>elem.name);
            userCardContainer.append(card);


        })

    }
     */

 /* const descriptionApiRequest = async (key) => {//questo funziona
    //console.log(bookElements)
    try {
        
        const url = `https://openlibrary.org${key}.json`;
        const response = await api.getFetch(url);

        const description=response.description
        console.log(description)
    
    } catch (error) {
        console.log(error)
       log('ERROR: descriptionApiRequest function')
      logErrors(error) 
    }
  }  */


//creo la funzione per mostrarmi la descrizione
 function showDescription(userKey) {//gli ho passato la chiave
    document.getElementsByClassName("spinner-border")[0].style.display = "block";
    desc.showPostByUserKey(userKey);//gli passo la chiave
} 



