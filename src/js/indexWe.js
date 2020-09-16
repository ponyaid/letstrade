const rolls = Array.from(document.getElementsByClassName('roll'))


rolls.forEach((elem, index) => {
    elem.addEventListener('click', e => {
        for (let iter in rolls) {
            if (iter !== String(index)) {
                rolls[iter].classList.remove('roll_active')
            } else {
                rolls[iter].classList.add('roll_active')
            }
        }
    })
})