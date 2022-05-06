class Cover{
    constructor(){
        this.cover = new Array();
       // this.comments = new Comments();
    }
    async showCoverByUser(key){ 
        console.log(key)
       
        try{
            /* const url = `https://covers.openlibrary.org/b/olid/${key}-L.jpg`;
            
            this.data = await api.getFetchCover(url);  
            let imageBlob;
            this.data=imageBlob;
            console.log(imageBlob)
            */
            
          /*   const imageUrl = "https://picsum.photos/200/300";

            const reader = new FileReader();
            reader.onloadend = () => {
              const base64data = reader.result;                
              console.log(base64data);
            }
            
            (async () => {
              const response = await fetch(imageUrl)
              const imageBlob = await response.blob()
              console.log(imageBlob)
              reader.readAsDataURL(imageBlob);  
            })()
   */
            this.showModalImage();
        }
        catch(e){
            console.log("errore posts: "+e);
        }
        finally{
            document.getElementsByClassName("spinner-border")[0].style.display = "none";     
        }
    }
    showModalImage(){
        document.getElementById("modal-body").innerHTML=`<img src="https://covers.openlibrary.org/b/isbn/9780385533225-M.jpg" />`
    }
 
}