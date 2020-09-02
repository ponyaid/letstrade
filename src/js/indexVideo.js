// let headVideoBtn = document.querySelector('.head__video-button');
// let headVideo = document.querySelector(".head__video");
let headVideoBg = document.querySelector('.head__bg-video');


// headVideoBtn && headVideoBtn.addEventListener('click', playPause);

// function playPause() {
//     headVideoBtn.classList.toggle('head__video-button_active');
//     headVideo.paused ? headVideo.play() : headVideo.pause();
// }

function changeVideoBg(x) {
    if (x.matches) {
        headVideoBg.innerHTML = '<source src="../static/video/bg4.mp4" type="video/mp4">'
    } else {
        headVideoBg.innerHTML = '<source src="../static/video/bg3.mp4" type="video/mp4">'
    }
    headVideoBg.play();
}

let media640 = window.matchMedia("(max-width: 640px)");

headVideoBg && changeVideoBg(media640);