
document.addEventListener("DOMContentLoaded", () => {
    // Back to Top 버튼
    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
        backToTop.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 카드 hover
    const cards = document.querySelectorAll('.card-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => card.classList.add('hovered'));
        card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
    });

    // 태그 hover
    const tags = document.querySelectorAll('.tag-item');
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', () => tag.classList.add('hovered'));
        tag.addEventListener('mouseleave', () => tag.classList.remove('hovered'));
    });
});

// 상단바
document.addEventListener("DOMContentLoaded", () => {
    const scrollTopBtn = document.querySelector('.scroll_top a');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// header 스크롤
window.addEventListener('scroll', () => {
    const header = document.querySelector('header'); // CSS 배경 방식이면 .header로 선택 가능
    if (window.scrollY > 50) {
        header.classList.add('on'); // 스크롤 시 .on 추가
    } else {
        header.classList.remove('on');
    }
});


 $(function () {
            //.delay() - 실행이 되기전 지연시간 / 1s(seconds) = 1000ms
            $('.sub_bg_text > h2').delay(500).animate({
                opacity: 1
            }, 800, function () {
                $('.sub_bg_text > p').delay(300).animate({
                    opacity: 0.7
                }, 800)
            })
        })


/* AOS */
AOS.init();