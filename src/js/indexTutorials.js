const tutorials = Array.from(document.getElementsByClassName('tutorial'))
const tutorialTabs = Array.from(document.getElementsByClassName('tutorials__tab'))


tutorialTabs.forEach((elem, index) => {
    elem.addEventListener('click', () => {
        for (let iter in tutorials) {
            if (iter !== String(index)) {
                tutorials[iter].classList.remove('tutorial_active')
                tutorials[iter].querySelector('video').pause()
            } else {
                tutorials[iter].classList.add('tutorial_active')
                tutorials[iter].querySelector('video').play()
            }
        }
        for (let iter in tutorialTabs) {
            if (iter !== String(index)) {
                tutorialTabs[iter].classList.remove('tutorials__tab_active')
            } else {
                tutorialTabs[iter].classList.add('tutorials__tab_active')
            }
        }
    })
})