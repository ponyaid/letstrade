import * as popup from './indexPopup'


const errorValidMail = 'The E-mail you have entered is not valid!',
    successMessage = 'Your application has been submitted!\n' +
        'We kindly welcome you to our community and will soon begin to send you news and offers!',
    emailPattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,20}\.)?[a-z]{2,20}$/i;

const indexForm = document.querySelector('#index-form');

let alert = false;


indexForm && indexForm.addEventListener('submit', formListener);

function formListener(e) {
    e.preventDefault();
    if (!alert) {


        let form = e.target;
        let email = form.querySelector('[name="email"]').value;

        if (!emailPattern.test(email)) {
            getAlert(errorValidMail);
        } else {
            let data = {email};
            fetch('/index_form/', {
                method: 'POST',
                credentials: "include",
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(data)
            })
                .then(() => {
                    form.querySelector('[name="email"]').value = '';
                    getAlert(successMessage)
                })
                .catch(e => console.log(e))
        }
    }
}


function getAlert(text) {
    let wrapper = document.createElement('div');
    wrapper.classList.add('alert-wrapper');
    let div = document.createElement('div');
    div.classList.add('alert');
    let p = document.createElement('p');
    p.classList.add('alert__text');
    p.innerHTML = text;
    let button = document.createElement('button');
    button.classList.add('alert__button');
    button.innerHTML = 'Ok';

    div.appendChild(p);
    div.appendChild(button);
    wrapper.appendChild(div);

    document.body.appendChild(wrapper);
    popup.hideScroll();

    button.addEventListener('click', (e) => {
            document.body.removeChild(wrapper);
            popup.showScroll();
            alert = false;
        }
    );

    document.addEventListener('keyup', (e) => {
        let wrapper = document.querySelector('.alert-wrapper');
        if (wrapper && e.keyCode === 27) {
            document.body.removeChild(wrapper);
            popup.showScroll();
            alert = false;
        }
    });

    alert = true;
}