const packages = [].slice.call(document.getElementsByClassName('package'));


packages.forEach((element, index) => {
    element.addEventListener('mouseenter', e => {
        if (window.matchMedia("(min-width: 1181px)").matches) {
            e.currentTarget.classList.add('package_active');

            for (let i = 0; i < packages.length; i++) {
                if (i !== index) {
                    let element = packages[i];
                    element.classList.remove('package_active');
                }
            }
        }
    });
});


function packagesMedia(x) {
    if (x.matches) { // If media query matches
        for (let i = 0; i < packages.length; i++) {
            let element = packages[i];
            if (!element.classList.contains('package_active')) {
                element.classList.add('package_active');
            }
        }
    } else {
        for (let i = 0; i < packages.length; i++) {
            if (i !== 1) {
                let element = packages[i];
                element.classList.remove('package_active');
            }
        }
    }
}

let slickGreen = false;

function getSlick(x) {
    if (x.matches && !slickGreen) {
        $('.packages').slick({
            arrows: false,
            autoplay: false,
            centerMode: true,
            initialSlide: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerPadding: '20px',
        });
        slickGreen = true;
    } else if (slickGreen) {
        $('.packages').slick('unslick');
        slickGreen = false;
    }
}

let media1180 = window.matchMedia("(max-width: 1180px)");
let media640 = window.matchMedia("(max-width: 640px)");

packagesMedia(media1180);
getSlick(media640);
media1180.addListener(packagesMedia);
media640.addListener(getSlick);




