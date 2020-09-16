const grows = Array.from(document.getElementsByClassName('grow__items'))
const growTabs = Array.from(document.getElementsByClassName('grow__tab'))


growTabs.forEach((elem, index) => {
    elem.addEventListener('click', () => {
        for (let iter in grows) {
            if (iter !== String(index)) {
                grows[iter].classList.remove('grow__items_active')
            } else {
                grows[iter].classList.add('grow__items_active')
            }
        }
        for (let iter in growTabs) {
            if (iter !== String(index)) {
                growTabs[iter].classList.remove('grow__tab_active')
            } else {
                growTabs[iter].classList.add('grow__tab_active')
            }
        }
    })
})