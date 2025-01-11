const book = document.getElementById('biblebooks')
const chapter = document.getElementById('chapters')
const verse = document.getElementById('verse')
const versediv = document.getElementById('versediv')
const btnsearch = document.getElementById('send')
const btnzoom = document.getElementById('zoom')
let clickvar=0
btnsearch.addEventListener('click',()=>{
    versediv.innerHTML = ''
    if (book.value == '' || chapter.value == ''){
     alert('por favor,digite o livro e capitulo,ou até mesmo o versiculo, que deseja ler')
    }else if(book.value != '' && chapter.value != '' && verse.value != ''){ 
        document.getElementById('errorp').setAttribute('hidden',1)
       
        fetch(`https://bible-api.com/${book.value} ${chapter.value}${verse.value == '' ? '' : ":" + verse.value}?translation=almeida`)
        .then(resp => {
            return resp.json()
        })
        .then(data =>{
          data.verses.forEach(verse => {
            const versep = document.createElement('div')
            versep.id ='versep' 
            versep.innerHTML = `${verse.verse}   ${verse.text}`
  
           versediv.appendChild(versep)
          });
        }) 
        .catch(error => {
            document.getElementById('errorp').removeAttribute('hidden')
          });

    }
})
btnzoom.addEventListener('click',()=>{
    clickvar ++
    if(clickvar >1 ){
     clickvar = 0
    }
    if (clickvar == 0){
        versediv.style.fontSize = 30 +'px'
        btnzoom.innerHTML ='<i class="fa-solid fa-magnifying-glass-minus"></i>'
    }else if(clickvar == 1){
        versediv.style.fontSize ='medium'
        btnzoom.innerHTML = '<i class="fa-solid fa-magnifying-glass-plus"></i>'
    }
})