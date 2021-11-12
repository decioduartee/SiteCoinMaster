const btnMenuMobile = document.querySelector("#btnMenuMobile"),
      iconMenuMobile = document.querySelector("#iconMenuMobile")
      navbarMenu = document.querySelector('.navbar__menu');

let contagem = 0
btnMenuMobile.addEventListener('click', async () => {
    if(iconMenuMobile.classList.contains('bx-menu')) {
        iconMenuMobile.classList.replace('bx-menu','bx-x')
    } else if(iconMenuMobile.classList.contains('bx-x')) {
        iconMenuMobile.classList.replace('bx-x','bx-menu')
    }
    if(contagem == 0) {
        navbarMenu.style.left = "50%"
        contagem++
    } else if(contagem == 1) {
        navbarMenu.style.left = "150%"
        contagem--
    }
})