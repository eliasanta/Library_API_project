
export function printBooks(elemResp) {
    //passo oggetto completo
    let str = `<h2 class="mb-4 text-center">Books List</h2>`;
    elemResp.forEach((elem) => {
      str += `<div  class="card card-body mb-5 p-3">
                      <h4 class="mt-2 mb-2">${elem.title}</h4>
                          <div id="cardFormat" class="d-flex justify-content-around mt-3 mb-3">                          
  ${elem.authors
    .map(
      (ele) => `<div id="title" class="Lista Autori mb-4 mt-3"> Autore:
                                  <div id="author" class="mt-3">
                                  ${ele.name}
                                  </div>
                               </div>`
    )
    .slice(0, 1)}
                          <div id="imageCover"><img  src="https://covers.openlibrary.org/b/olid/${
                            elem.cover_edition_key
                          }-M.jpg" /></div>
                            <div id="buttonDesc" >
                            <button class='description-button btn btn-success mt-3 text-center' id="${
                              elem.key
                            }" data-bs-toggle="modal" data-bs-target="#modalDesc" >Book Description</button>
                            </div>
                          </div>
                        </div> `;
    });
    document.getElementById('choose').style.display='none';
    document.getElementById("output").innerHTML = str;
    
  }
  