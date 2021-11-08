// Apaga mensagem de erros dentro de site
var node = document.querySelector(".alert");
setTimeout(() => {
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
}, 3500)
        
