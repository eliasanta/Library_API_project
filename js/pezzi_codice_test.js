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
