const book = document.getElementById('biblebooks')
const chapter = document.getElementById('chapters')
const verse = document.getElementById('verse')
const versediv = document.getElementById('versediv')
const btnsearch = document.getElementById('send')
const btnzoom = document.getElementById('zoom')

const otherOPbtn = document.getElementById('other-options')
const otherOPdialog = document.getElementById('other-op-dialog')
const closeDIALOGbtn = document.getElementById('close-btn')

const bcBTN = document.getElementById('background-color-btn')

const helpBTN = document.getElementById('help-btn')
const helpDialog = document.getElementById('help-dialog')
const closeHELPdialog = document.getElementById('close-help-dialog')

const direitos = document.getElementById('direitos')

let clickvar=0
let themevar=0
document.body.style.backgroundColor = localStorage.getItem('theme') || 'white' 
let lcgetted = JSON.parse(localStorage.getItem('chapEbook')) || "none"
if(lcgetted != 'none'){
    book.value = lcgetted['book']
    chapter.value = lcgetted['chapter']
    alert('seu progresso ficou salvo desde quando voce saiu')
}else{
    
}


helpBTN.addEventListener('click',()=>{
    helpDialog.showModal()
    
})
closeHELPdialog.addEventListener('click',()=>{
    helpDialog.close()
})


otherOPbtn.addEventListener('click',()=>{
     otherOPdialog.showModal()
})
closeDIALOGbtn.addEventListener('click',()=>{
    otherOPdialog.close()
})
bcBTN.addEventListener('click',()=>{    
    themevar++
    if(themevar == 0){
        localStorage.setItem('theme','white')
        document.body.style.backgroundColor = 'white'
        bcBTN.innerHTML = '<i class="fa-solid fa-arrow-down"></i> branco'

        direitos.style.color = 'rgb(135, 135, 135)'

    }else if(themevar == 1){
        localStorage.setItem('theme','gray')
        bcBTN.innerHTML = '<i class="fa-solid fa-arrow-down"></i> cinza'
        document.body.style.backgroundColor = 'gray'
        document.body.style.color = 'rgb(53, 53, 53)'


        direitos.style.color = 'rgb(223, 223, 223)'
    }
    if (themevar == 2){
        localStorage.setItem('theme','white')
        themevar = 0
        bcBTN.innerHTML = '<i class="fa-solid fa-arrow-down"></i> branco'
        document.body.style.backgroundColor = 'white'

        direitos.style.color = 'rgb(135, 135, 135)'


    }

})



btnsearch.addEventListener('click',()=>{
    versediv.innerHTML = ''
    if (book.value == '' || chapter.value == ''){
     alert('por favor,digite o livro e capitulo,ou até mesmo o versiculo, que deseja ler')
    }else if(book.value != '' && chapter.value != '' ){ 
        document.getElementById('errorp').setAttribute('hidden',1)

         let obj = {
            "book":book.value,
            "chapter":chapter.value,
         }

        localStorage.setItem('chapEbook',JSON.stringify(obj))
       
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