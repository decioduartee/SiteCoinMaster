// Apaga mensagem de erros dentro de site
const node = document.querySelector(".alert"),
ano = new Date().getFullYear();
// Mudando o ano anualmente no footer copyright
let data = document.querySelector('.copyright')
window.addEventListener('load', async () => {
    data.innerHTML = `&copy; CliqueCoin | ${ano}`
})

setTimeout(() => {
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
}, 3500)
        
