const btn = document.querySelectorAll(".btn_coletar"),
      infocoinItems = document.querySelectorAll(".infocoin__item")

btn.forEach((btns) => {
    btns.addEventListener('click', (evt) => {
        evt.currentTarget.textContent = "COLETADO ✅"
    })
});

infocoinItems.forEach((item) => {
    const infocoinHeader = item.querySelector(".infocoin__header");

    infocoinHeader.addEventListener('click', () => {
        const openItem = document.querySelector('.infocoin-open');
        toggleItem(item)

        if(openItem && openItem !== item) {
            toggleItem(openItem)
        }
    })
})

const toggleItem = (item) => {
    const infocoinContent = item.querySelector(".infocoin__content");

    if(item.classList.contains('infocoin-open')) {
        infocoinContent.removeAttribute('style')
        item.classList.remove('infocoin-open')
    } else {
        infocoinContent.style.height = infocoinContent.scrollHeight + 'px';
        item.classList.add('infocoin-open')
    }
}
