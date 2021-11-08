var olhoMagicoLogin = document.querySelector(".icon__olho__magico"),
inputSenhaLogin = document.querySelector(".input__senha__login")

olhoMagicoLogin.addEventListener("click", () => {
    if (inputSenhaLogin.type == "password") {
        inputSenhaLogin.type = "text";
        olhoMagicoLogin.classList.add('bx-show-alt')
        olhoMagicoLogin.classList.remove('bx-low-vision')
    }else{
        inputSenhaLogin.type = "password";
        olhoMagicoLogin.classList.add('bx-low-vision')
        olhoMagicoLogin.classList.remove('bx-show-alt')
    }
})