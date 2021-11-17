// Apaga mensagem de erros dentro de site
const node = document.querySelector(".alert");
setTimeout(() => {
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
}, 4500);

// Mudando o ano anualmente no footer copyright
let data = document.querySelector('.copyright'),
ano = new Date().getFullYear();
window.addEventListener('load', async () => {
    data.innerHTML = `&copy; CliqueCoin | ${ano}`
})
        
