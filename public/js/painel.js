const btnPainel1 = document.querySelector('#btn-painel1'),
btnPainel2 = document.querySelector('#btn-painel2'),
menuPainel = document.querySelector('#menu-painel'),
burger = document.querySelector('.btn-painel__burger'),
iconSinalizadorPainel = document.querySelector('.iconSinalizadorPainel'),
tituloPainel = document.querySelector('.titulo-painel'),
menuUsuarioRight = document.querySelector('.menu-usuario-right'),
btnclientRight = document.querySelector('.client__content'),
btnCloseMenuUsuario = document.querySelector('.close-menu-usuario'),
painel = document.querySelector('#painel'),
nomePainel = document.querySelector('.nome-painel'),
imobiliaria = document.querySelector('#imobiliaria'),
nomeImobiliaria = document.querySelector('.nome-imobiliaria'),
chaves = document.querySelector('#chaves'),
nomeChaves = document.querySelector('.nome-chaves')
cadastro = document.querySelector('#cadastro'),
nomeCadastro = document.querySelector('.nome-cadastro')

let painelOpen = false, menuOpen = false

btnPainel1.addEventListener('click', () => {
    eventoMenuPainel()
})

btnPainel2.addEventListener('click', () => {
    eventoMenuPainel()
})

btnclientRight.addEventListener('click', () => {
        menuUsuarioRight.classList.add('open')
        menuOpen = true
        painelOpen = false
        closes()
})

btnCloseMenuUsuario.addEventListener('click', () => {
        menuUsuarioRight.classList.remove('open')
        menuOpen = false
})

painel.addEventListener('click', (e) => {
    e.preventDefault()
    tituloPainel.innerHTML = nomePainel.innerHTML
})

imobiliaria.addEventListener('click', (e) => {
    e.preventDefault()
    tituloPainel.innerHTML = nomeImobiliaria.innerHTML
})

chaves.addEventListener('click', (e) => {
    e.preventDefault()
    tituloPainel.innerHTML = nomeChaves.innerHTML
})

cadastro.addEventListener('click', (e) => {
    e.preventDefault()
    tituloPainel.innerHTML = nomeCadastro.innerHTML
})

function eventoMenuPainel() {
    if(!painelOpen) {
        opens()
        painelOpen = true
        menuUsuarioRight.classList.remove('open')
        menuOpen = false
    } else {
        closes()
        painelOpen = false
    }
}

function opens() {
    btnPainel1.classList.add('open')
    btnPainel2.classList.add('open')
    menuPainel.classList.add('open')
    burger.classList.add('open')
    iconSinalizadorPainel.classList.add('open')
    tituloPainel.classList.add('open')
}

function closes() {
    btnPainel1.classList.remove('open')
    btnPainel2.classList.remove('open')
    menuPainel.classList.remove('open')
    burger.classList.remove('open')
    iconSinalizadorPainel.classList.remove('open')
    tituloPainel.classList.remove('open')
}