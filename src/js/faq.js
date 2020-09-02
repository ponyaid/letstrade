const tabs = [].slice.call(document.getElementsByClassName('tab'));

tabs.forEach((element, index) => {
    element.addEventListener('click', (e) => {

        e.currentTarget.classList.add('tab_active');
        e.currentTarget.querySelector('.tab__expand').classList.add('tab__expand_active');
        e.currentTarget.querySelector('.tab__text').classList.add('tab__text_active');

        for (let i = 0; i < tabs.length; i++) {
            if (i !== index) {
                let element = tabs[i];
                element.classList.remove('tab_active');
                element.querySelector('.tab__expand').classList.remove('tab__expand_active');
                element.querySelector('.tab__text').classList.remove('tab__text_active');
            }
        }
    });
});

