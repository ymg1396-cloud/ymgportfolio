
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".energy-swiper .swiper-slide");

  slides.forEach(slide => {
    slide.addEventListener("mouseenter", () => {
      slides.forEach(s => {
        s.style.flex = "1";
        s.style.zIndex = "1";
      });
      slide.style.flex = "3";
      slide.style.zIndex = "10";
    });

    slide.addEventListener("mouseleave", () => {
      slides.forEach(s => {
        s.style.flex = "1";
        s.style.zIndex = "1";
      });
    });
  });
});

const swiper = new Swiper('.energy-swiper', {
  // 원하는 옵션들...
  on: {
    slideChangeTransitionEnd: function () {
      document.querySelectorAll('.energy-swiper .text').forEach(el => {
        el.style.fontSize = '16px'; // 전부 작게
      });
      const activeText = this.slides[this.activeIndex].querySelector('.text');
      if (activeText) activeText.style.fontSize = '24px'; // 활성 슬라이드만 크게
    }
  }
});
document.addEventListener("DOMContentLoaded", function() {
  const thumbnails = document.querySelectorAll(".image-thumbnails img");
  const textItems = document.querySelectorAll(".text-item");
  const sniImg = document.querySelector(".sni img");
  let currentIndex = 0;
  const slideInterval = 5000; // 5초마다 자동 전환
  let timer;

  function showSlide(index) {
    // 메인 이미지 변경
    sniImg.src = thumbnails[index].src;

    // 텍스트 변경
    textItems.forEach(item => item.classList.remove("active"));
    textItems[index].classList.add("active");

    // 썸네일 active 상태
    thumbnails.forEach(img => img.classList.remove("active"));
    thumbnails[index].classList.add("active");

    currentIndex = index;
  }

  function nextSlide() {
    let nextIndex = (currentIndex + 1) % thumbnails.length;
    showSlide(nextIndex);
  }

  // 썸네일 클릭 이벤트
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      showSlide(index);
      resetTimer(); // 클릭 시 자동 슬라이드 타이머 리셋
    });
  });

  // 자동 슬라이드 시작
  function startTimer() {
    timer = setInterval(nextSlide, slideInterval);
  }

  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  // 초기 화면 설정
  showSlide(0);
  startTimer();
});
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const header = document.querySelector(".main-header");

  menuBtn.addEventListener("click", () => {
    header.classList.toggle("menu-open");
  });
});
window.addEventListener("scroll", () => {
    const header = document.querySelector(".main-header");
    if(window.scrollY > 50) {
        header.classList.add("scrolled");
        header.classList.remove("transparent");
    } else {
        header.classList.remove("scrolled");
        header.classList.add("transparent");
    }
});
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");

  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("menu-open"); // 메뉴 슬라이드 토글
  });
});

window.addEventListener("scroll", () => {
  const header = document.querySelector(".main-header");
  if(window.scrollY > 50) {
      header.classList.add("scrolled");
      header.classList.remove("transparent");
  } else {
      header.classList.remove("scrolled");
      header.classList.add("transparent");
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const sideMenu = document.querySelector(".side-menu");
  const closeBtn = document.querySelector(".side-menu .close-btn");

  // 메뉴 열기
  menuBtn.addEventListener("click", () => {
    sideMenu.classList.add("open");
  });

  // 메뉴 닫기
  closeBtn.addEventListener("click", () => {
    sideMenu.classList.remove("open");
  });
});

// 스크롤 시 헤더 배경
window.addEventListener("scroll", () => {
  const header = document.querySelector(".main-header");
  if(window.scrollY > 50) {
    header.classList.add("scrolled");
    header.classList.remove("transparent");
  } else {
    header.classList.remove("scrolled");
    header.classList.add("transparent");
  }
});
const menuBtn = document.querySelector(".menu-btn");
const sideMenu = document.querySelector(".side-menu");
const closeBtn = document.querySelector(".side-menu .close-btn");

menuBtn.addEventListener("click", () => sideMenu.classList.add("open"));
closeBtn.addEventListener("click", () => sideMenu.classList.remove("open"));
document.addEventListener("DOMContentLoaded", () => {
  // Hero 제외하고 모든 section + footer 잡기
  const sections = document.querySelectorAll("section:not(.hero), footer");

  // 각 요소에 scroll-reveal 클래스 추가
  sections.forEach(sec => sec.classList.add("scroll-reveal"));

  // IntersectionObserver 설정
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(sec => observer.observe(sec));
});
const scrollBtn = document.getElementById("scrollTopBtn");

scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
