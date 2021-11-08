const ipuntFoto = document.querySelector(".input__foto__user"),
      divFoto = document.querySelector(".img__user"),
      olhoMagico = document.querySelector(".icon__olho__magico"),
      inputSenha = document.querySelectorAll(".input__senha__registro")
      
olhoMagico.addEventListener("click", () => {
    inputSenha.forEach(input => {
        if (input.type == "password") {
            input.type = "text";
            olhoMagico.classList.add('bx-show-alt')
            olhoMagico.classList.remove('bx-low-vision')
        }else{
            input.type = "password";
            olhoMagico.classList.add('bx-low-vision')
            olhoMagico.classList.remove('bx-show-alt')
        }
    });
})

divFoto.addEventListener("click", () => {
    ipuntFoto.click()
})

function readImage() {
    if (this.files && this.files[0]) {
        var file = new FileReader();
        file.onload = function(e) {
            divFoto.src = e.target.result;
        };       
        file.readAsDataURL(this.files[0]);
    }
}

ipuntFoto.addEventListener("change", readImage, false);