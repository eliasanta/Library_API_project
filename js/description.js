class Description{
    constructor(){
        this.description = new Array();
       // this.comments = new Comments();
    }
    async showPostByUserKey(key){ 
        console.log(key)
        document.getElementsByClassName("spinner-border")[0].style.display = "block";
        try{
            const url = `https://openlibrary.org${key}.json`;
            console.log(url)
            this.data = await api.getFetch(url);  
            console.log(this.data)          
            this.showModal();
        }
        catch(e){
            console.log("errore posts: "+e);
        }
        finally{
            document.getElementsByClassName("spinner-border")[0].style.display = "none";     
        }
    }
    showModal(){
        /* anche in caso non trovi un adescription o sia su description.value la visualizza */
        if(this.data.description == null || this.data.description == undefined){
            console.log('trovato undefined')
            document.getElementById("modal-body").innerText="Non vi è alcuna descrizione"
        }else {
            this.data.description.value != null ? document.getElementById("modal-body").innerText = this.data.description.value : document.getElementById("modal-body").innerText = this.data.description
            console.log('entro nel secondoperche la prima è falsa')
        }
        
       //document.getElementById("postDiv").style.display = "block";
    }
 
}