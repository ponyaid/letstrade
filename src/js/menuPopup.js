const menuPopupList = document.querySelector('.menu-popup__list');


function getMarker() {
    let pathname = window.location.pathname.slice(1);
    let items = [].slice.call(menuPopupList.querySelectorAll('li'));
    for (let i = 0; i < items.length; i++) {
        let id = items[i].id;
        if (pathname.length > 0 && id.includes(pathname)) {
            items[i].classList.add('active-list-item')
        }
    }
}

getMarker();