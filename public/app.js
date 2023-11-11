const searchBar=document.querySelector('.searchBar')
const searchBtn=document.querySelector('.searchBtn')
const searchInput=document.getElementById('searchInput')
const searchClose=document.getElementById('searchClose')


searchBtn.addEventListener('click',()=>{
    searchBar.style.visibility='visible'
    searchBar.classList.add('open')

})

searchClose.addEventListener('click',()=>{
    searchBar.style.visibility='hidden'
    searchBar.classList.remove('open')

})
