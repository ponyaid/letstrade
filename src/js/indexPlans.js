const plans = Array.from(document.getElementsByClassName('plan'))
const planDetails = document.querySelector('.plans-details')


plans.forEach((elem, index) => {
    elem.addEventListener('click', () => {
        window.location.href = '#plans'
        for (let iter in plans) {
            if (iter !== String(index)) {
                plans[iter].classList.remove('plan_active')
            } else {
                plans[iter].classList.add('plan_active')
            }
            if (index === 0) {
                planDetails.classList.add('plans-details_free')
            } else {
                planDetails.classList.remove('plans-details_free')
            }
        }
    })
})