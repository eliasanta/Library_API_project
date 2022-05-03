class Description{
    constructor(){
        this.description = new Array();
       // this.comments = new Comments();
    }
    async showPostByUserKey(key){ 
        document.getElementsByClassName("spinner-border")[0].style.display = "block";
        try{
            const url = `https://openlibrary.org${key}.json`;
            this.data = await api.getFetch(url);            
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
        document.getElementById("modal-body").innerText = this.data.description; 
       //document.getElementById("postDiv").style.display = "block";
    }
 
}