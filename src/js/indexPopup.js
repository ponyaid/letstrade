const benefitPopups = [].slice.call(document.getElementsByClassName('benefit-popup'));
const benefits = [].slice.call(document.getElementsByClassName('benefit'));

const teamPopups = [].slice.call(document.getElementsByClassName('team-popup-wrapper'));
const persons = [].slice.call(document.getElementsByClassName('person'));

const menuPopup = document.querySelector('.menu-popup');
const menuBtn = document.querySelector('.header__menu-btn');



menuBtn.addEventListener('click', evt => {
    menuPopup.classList.add('menu-popup_active');
    hideScroll()
});


menuPopup.addEventListener('click', evt => {
    if (evt.target.classList.contains('menu-popup__close')
        || evt.target.classList.contains('menu-popup__list-item')) {
        menuPopup.classList.remove('menu-popup_active');
        showScroll()
    }
});



benefits.forEach((element, index) => {
    element.addEventListener('click', (e) => {
        if (e.target.classList.contains('benefit__button')) {
            benefitPopups[index].classList.add('benefit-popup_active');
            hideScroll()
        }
    });
});

benefitPopups.forEach((element, index) => {
    element.addEventListener('click', (e) => {
        if (e.target.classList.contains('benefit-popup__close')) {
            benefitPopups[index].classList.remove('benefit-popup_active');
            showScroll()
        }
    });
});



persons.forEach((element, index) => {
    element.addEventListener('click', (e) => {
        if (e.target.classList.contains('person__button')) {
            teamPopups[index].classList.add('team-popup-wrapper_active');
            hideScroll()
        }
    });
});

teamPopups.forEach((element, index) => {
    element.addEventListener('click', (e) => {
        if (e.target.tagName !== 'P') {
            teamPopups[index].classList.remove('team-popup-wrapper_active');
            showScroll()
        }
    });
});


document.addEventListener('click', e => {
    if (e.target.classList.contains('team-popup-wrapper')) {
        e.target.classList.remove('team-popup-wrapper_active');
        showScroll()
    }
});


document.addEventListener('click', e => {
    if (e.target.classList.contains('benefit-popup')) {
        e.target.classList.remove('benefit-popup_active');
        showScroll()
    }
});


let scrollTop = 0;


function hideScroll() {
    document.body.classList.add('body-popup-active');

    scrollTop = window.pageYOffset; // запоминаем текущую прокрутку сверху
    document.body.style.position = 'fixed';
    if (hasScrollbar()) {
    // с учетом горизонтального скролла. Чтобы небыло рывка при открытии модального окна
        document.body.style.width = `calc(100% - ${getScrollbarSize()}px)`;
    } else {
        document.body.style.width = '100%';
    }
    document.body.style.top = - scrollTop + 'px';
}

function getScrollbarSize() { // получение ширины скролла
    let outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

    document.body.appendChild(outer);

    let widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = 'scroll';

    // add innerdiv
    let inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    let widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}

function hasScrollbar() { // проверка на боковой скролл
    return document.body.scrollHeight > document.body.clientHeight;
}


function showScroll() {
    document.body.classList.remove('body-popup-active');

    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    window.scroll(0, scrollTop);
}


export {scrollTop, hideScroll, getScrollbarSize, hasScrollbar, showScroll};