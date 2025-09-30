var swiper = new Swiper(".banner-swiper", {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

const autoplayToggleBtn = document.querySelector('.autoplay-toggle');

autoplayToggleBtn.addEventListener('click', function () {
    if (swiper.autoplay.running) {
        swiper.autoplay.stop();
        this.classList.add('paused'); // 'paused' 클래스 추가
    } else {
        swiper.autoplay.start();
        this.classList.remove('paused'); // 'paused' 클래스 제거
    }
});



var swiper = new Swiper(".eventSlide", {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
});