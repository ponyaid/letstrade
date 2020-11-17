const plans = Array.from(document.getElementsByClassName('plan'))
const planDetails = document.querySelector('.plans-details')
const plansAnc = document.querySelector('.plans__anc')


plans.forEach((elem, index) => {
    elem.addEventListener('click', () => {
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            planDetails.scrollIntoView({ block: "start", behavior: "smooth" });
        }
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


function currentSlide() {
    const slides = Array.from(document.getElementsByClassName('slick-slide'))
    for (let iter in slides) {
        if (slides[iter].classList.contains('slick-current')) {
            slides[iter].firstElementChild.classList.add('plan_active')
            plansAnc.scrollIntoView({ block: "start", behavior: "smooth" });

            if (slides[iter].firstElementChild.classList.contains('plan_green')) {
                planDetails.classList.add('plans-details_free') 
            } else {
                planDetails.classList.remove('plans-details_free')
            }
        } else {
            slides[iter].firstElementChild.classList.remove('plan_active')
        }
    }
}


let slickGreen = false;

function getSlick(x) {
    if (x.matches && !slickGreen) {
        $('.plans__items').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: true,
            arrows: false,
            dots: false,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: '48px',
                    }
                },
            ]
        });

        $('.slick-slider').on('click', '.slick-slide', function (e) {
            e.stopPropagation();
            var index = $(this).data("slick-index");
            if ($('.slick-slider').slick('slickCurrentSlide') !== index) {
                $('.slick-slider').slick('slickGoTo', index);
            }
        });

        $('.slick-slider').on('afterChange', e => {
            e.preventDefault()
            currentSlide()
        })

        slickGreen = true;
    } else if (slickGreen) {
        $('.plans__items').slick('unslick');
        slickGreen = false;
    }
}

let media1024 = window.matchMedia("(max-width: 1024px)");

getSlick(media1024);
media1024.addListener(getSlick);