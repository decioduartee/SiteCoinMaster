const btn = document.querySelectorAll(".btn_coletar")

btn.forEach((btns) => {
    btns.addEventListener('click', (evt) => {
        evt.currentTarget.textContent = "COLETADO ✅"
    })
})
