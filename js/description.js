class Description{
    constructor(){
        this.description = new Array();
       
    }
    async showPostByUserKey(key){ 
       
        try{
            const url = `https://openlibrary.org${key}.json`;
            
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
            
            document.getElementById("modal-body").innerText="Non vi è alcuna descrizione"
        }else {
            this.data.description.value != null ? document.getElementById("modal-body").innerText = this.data.description.value : document.getElementById("modal-body").innerText = this.data.description
          
        }
        
       //document.getElementById("postDiv").style.display = "block";
    }
 
}