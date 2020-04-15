modalbutton=document.querySelector('.modalboton');
modal=document.querySelector('.modal');
span=document.querySelector('.close');
container=document.querySelector('.container');
adder=document.querySelector('.adder');
inputnumber=Array.from(document.querySelector('.modal-content').querySelectorAll('input'))[2];
textfilter=document.querySelector('.searchc').querySelector('input');

let readstatus=[];
let deletebuttonsarray=[];

let myLibrary = [];

function filter(){
    for(i=0;i<container.children.length;i++){
        txtvalue=container.children[i].querySelector('.title').innerText;
        if(txtvalue.toUpperCase().indexOf(textfilter.value.toUpperCase())>-1){
            container.children[i].style.display='';
        } else {
            container.children[i].style.display='none';
        }
    }
}

function Book(title,author,pages,read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}

function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
      textbox.addEventListener(event, function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      });
    });
  };

  

function populateStorage(){
    localStorage.setItem('library',JSON.stringify(myLibrary));
}

function addBookToLibrary(book){
    myLibrary.push(book);
}

function readstatusclicker(){
        readstatus[readstatus.length-1].querySelector('input').addEventListener('click',(e)=>{
            e.target.hasAttribute('checked')?e.target.removeAttribute('checked'):e.target.setAttribute('checked','checked');
            myLibrary[readstatus.indexOf(e.target.parentNode)].read=!(myLibrary[readstatus.indexOf(e.target.parentNode)].read);
            populateStorage();
        });
};

function deleteclicker(){
    
        deletebuttonsarray[deletebuttonsarray.length-1].addEventListener('click',(e)=>{
            container.removeChild(e.target.parentNode.parentNode);
            myLibrary.splice(deletebuttonsarray.indexOf(e.target),1);
            readstatus.splice(deletebuttonsarray.indexOf(e.target),1);
            deletebuttonsarray.splice(deletebuttonsarray.indexOf(e.target),1);
            populateStorage();
        })
   
};

function setStyles(){
    myLibrary=JSON.parse(localStorage.getItem("library"));

    for(i=0;i<myLibrary.length;i++){
        myLibrary[i].printed=false;
    }
    render();
    for(i=0;i<container.children.length;i++){
        deletebuttonsarray.push(container.children[i].querySelector('.delete'));
    }
    
    for(i=0;i<container.children.length;i++){
        readstatus.push(container.children[i].querySelector('.readla'));
    }
    if(deletebuttonsarray.length!=0){
        for(i=0;i<deletebuttonsarray.length;i++){
            deletebuttonsarray[i].addEventListener('click',(e)=>{
                container.removeChild(e.target.parentNode.parentNode);
                myLibrary.splice(deletebuttonsarray.indexOf(e.target),1);
                readstatus.splice(deletebuttonsarray.indexOf(e.target),1);
                deletebuttonsarray.splice(deletebuttonsarray.indexOf(e.target),1);
                populateStorage();
            })
        }
        for(i=0;i<readstatus.length;i++){
            readstatus[i].querySelector('input').addEventListener('click',(e)=>{
                e.target.hasAttribute('checked')?e.target.removeAttribute('checked'):e.target.setAttribute('checked','checked');
                myLibrary[readstatus.indexOf(e.target.parentNode)].read=!(myLibrary[readstatus.indexOf(e.target.parentNode)].read);
                populateStorage();
            });
        }
        
    }
    
};

function render(){
    for(i=0;i<myLibrary.length;i++){
        abook=myLibrary[i];
        thenewbook=document.createElement('div');
        thenewbook.className='book';
        if(!abook.printed){
            if (abook.read){
                thenewbook.innerHTML=
                `
                    <div class="title">
                        ${abook.title}
                    </div>
                    <div class="apr">
                        <div class="author">
                            Author:${abook.author}
                        </div>
    
                        <div class="pages">
                            Number of pages:${abook.pages}
                        </div>
    
                        <div class="read">
                            <label class="readla">Read status <input type="checkbox" checked="checked"><span class="checkmark"></span></label> 
                        </div>
                        <div class="delete">
                            Delete
                        </div>
                    </div>
                `;
            } else {
                thenewbook.innerHTML=
                `
                    <div class="title">
                        ${abook.title}
                    </div>
                    <div class="apr">
                        <div class="author">
                            Author:${abook.author}
                        </div>
    
                        <div class="pages">
                            Number of pages:${abook.pages}
                        </div>
    
                        <div class="read">
                            <label class="readla">Read status <input type="checkbox" ><span class="checkmark"></span></label> 
                        </div>
                        <div class="delete">
                            Delete
                        </div>
                    </div>
                `;
            };
            abook.printed=true;
            container.appendChild(thenewbook);
        };
    }
}




if(!localStorage.getItem('library')) {
    populateStorage();
  } else {
    setStyles();
  }



modalbutton.addEventListener('click',()=>{
    modal.style.display = "block";
});

window.addEventListener('storage', function(e) {  
    document.querySelector('.my-key').textContent = e.key;
    document.querySelector('.my-old').textContent = e.oldValue;
    document.querySelector('.my-new').textContent = e.newValue;
    document.querySelector('.my-url').textContent = e.url;
    document.querySelector('.my-storage').textContent = JSON.stringify(e.storageArea);
  });

span.addEventListener('click',()=>{
    modal.style.display = "none";
});

window.addEventListener('click',(e)=>{
    if (event.target == modal) {
        modal.style.display = "none";
      }
});

setInputFilter(inputnumber, function(value) {
    return /^\d*$/.test(value); });

adder.addEventListener('click',()=>{
    inputsgenerales=Array.from(adder.parentNode.querySelectorAll('input'));
    if(inputsgenerales[0].value==''||inputsgenerales[1].value==''||inputsgenerales[2].value==''){
        alert('You must complete the title, author, and pages field.')
    } else {
        book=new Book(inputsgenerales[0].value,inputsgenerales[1].value,inputsgenerales[2].value,inputsgenerales[3].checked);
        addBookToLibrary(book);
        render();
        modal.style.display = "none";
        inputsgenerales[0].value='';
        inputsgenerales[1].value='';
        inputsgenerales[2].value='';
        inputsgenerales[3].checked=false;
        readstatus.push(container.children[container.children.length-1].querySelector('.readla'));
        readstatusclicker();
        deletebuttonsarray.push(container.children[container.children.length-1].querySelector('.delete'));
        deleteclicker();
        populateStorage();
    };
    
});

textfilter.addEventListener('keyup',filter);

