document.addEventListener('DOMContentLoaded', () => {
  // --- 슬라이드 & numbers ---
  const slides = document.querySelectorAll('.main-visual .slide');
  const numbers = document.querySelectorAll('.numbers .number-item');
  const visualText = [
    { title: '세상에 없던 원료', desc: '천연물의 가치를 발견해 건강한 세상을 만들어 갑니다.' },
    { title: '세상을 위한 제품', desc: '자연에서 얻은 원료로 혁신적인 제품을 만듭니다.' },
    { title: '세상을 바꾸는 기술', desc: '고객에게 더 나은 건강과 가치를 전달합니다.' }
  ];

  let current = 0;
  let activeTimeout;

  function resetNumbers() {
    numbers.forEach(num => {
      const line = num.querySelector('.line');
      line.style.transition = 'none';
      line.style.transform = 'scaleX(0)';
      line.style.opacity = '0';
      void line.offsetWidth; // 강제 reflow
      line.style.transition = 'transform 3s linear, opacity 0s';
      num.style.color = '#ccc';
    });
  }

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    slides[index].classList.add('active');

    const textContainer = document.querySelector('.visual-text');
    const h1 = textContainer.querySelector('h1');
    const p = textContainer.querySelector('p');
    h1.textContent = visualText[index].title;
    p.textContent = visualText[index].desc;

    if (activeTimeout) clearTimeout(activeTimeout);

    resetNumbers();

    const activeNum = numbers[index];
    const activeLine = activeNum.querySelector('.line');
    activeNum.style.color = '#fff';
    h1.style.color = '#fff';
    p.style.color = '#fff';

    activeLine.style.opacity = '1';
    requestAnimationFrame(() => {
      activeLine.style.transform = 'scaleX(1)';
    });

    activeTimeout = setTimeout(() => {
      activeLine.style.opacity = '0';
      activeNum.style.color = '#ccc';
      h1.style.color = '#ccc';
      p.style.color = '#ccc';

      current = (current + 1) % numbers.length;
      showSlide(current);
    }, 3000);
  }

  numbers.forEach((num, i) => {
    num.addEventListener('click', () => {
      clearTimeout(activeTimeout);
      showSlide(i);
    });
  });

  showSlide(0);

  // --- 바로가기 버튼 클릭 방지 ---
  document.querySelectorAll('.btn-disabled').forEach(btn => {
    btn.addEventListener('click', e => e.preventDefault());
  });

  // --- 헤더 스크롤 + 로고 변경 + 슬라이드 글자 색 ---
  const header = document.querySelector('header');
  const logo = document.querySelector('header .logo img');
  const defaultLogo = '../img/yuhancare_logo_white.png';
  const whiteLogo = '../img/yuhancare_logo_all_white.png';
  const h1 = document.querySelector('.visual-text h1');
  const p = document.querySelector('.visual-text p');
  let lastScrollY = window.scrollY;

  function handleScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY === 0) {
      // 맨 위: 투명 헤더, 기본 로고, 글자 회색
      header.classList.remove('scrolled');
      header.style.transform = 'translateY(0)';
      logo.src = defaultLogo;
      if (h1) h1.style.color = '#ccc';
      if (p) p.style.color = '#ccc';
    } else if (currentScrollY > lastScrollY) {
      // 내릴 때: 헤더 숨김
      header.style.transform = 'translateY(-100%)';
    } else {
      // 올릴 때: 검정 배경, 흰 로고, 글자 흰색
      header.classList.add('scrolled');
      header.style.transform = 'translateY(0)';
      logo.src = whiteLogo;
      if (h1) h1.style.color = '#fff';
      if (p) p.style.color = '#fff';
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // 초기 상태 적용

  // --- redefine 섹션 버튼 & 이미지 ---
  const brand = document.querySelector('.redefine .brand');
  const buttons = document.querySelectorAll('.redefine .buttons button');

  brand.style.setProperty('--after-img', "../img/text_to_img1.jpg");
  brand.classList.add('animate-after');

  buttons.forEach(btn => {
    btn.style.backgroundColor = 'transparent';
    btn.style.color = '#000';
  });

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      let imgUrl = '';
      if (button.textContent === '기업소개') imgUrl = "../img/text_to_img1.jpg";
      if (button.textContent === '사업소개') imgUrl = "../img/text_to_img2.jpg";
      if (button.textContent === '기업문화') imgUrl = "../img/text_to_img3.jpg";

      brand.style.background = `url('${imgUrl}') no-repeat center/cover`;
      brand.style.webkitBackgroundClip = 'text';
      brand.style.webkitTextFillColor = 'transparent';
      brand.style.backgroundSize = 'cover';
      brand.classList.remove('white-text');

      brand.style.setProperty('--after-img', `url('${imgUrl}')`);
      brand.classList.remove('animate-after');
      void brand.offsetWidth;
      brand.classList.add('animate-after');

      buttons.forEach(btn => {
        btn.style.backgroundColor = 'transparent';
        btn.style.color = '#000';
      });

      button.style.backgroundColor = '#000';
      button.style.color = '#fff';
    });
  });

  // --- main-menu hover line ---
  const menuItems = document.querySelectorAll('.main-menu .menu-item');
  menuItems.forEach(item => {
    const hoverLine = document.createElement('div');
    hoverLine.classList.add('hover-line');
    item.appendChild(hoverLine);

    item.addEventListener('mouseenter', () => {
      const rect = item.getBoundingClientRect();
      hoverLine.style.left = rect.width / 2 + 'px';
      hoverLine.style.transform = 'translateX(-50%)';
      hoverLine.style.width = '160px';
    });

    item.addEventListener('mouseleave', () => {
      hoverLine.style.width = '0';
    });
  });

  // --- KOR 메뉴 토글 ---
  const korMenu = document.querySelector('.kor-menu');
  if (korMenu) {
    korMenu.addEventListener('click', () => {
      korMenu.classList.toggle('active');
    });
  }
});
// --- main-menu hover line & bold text on hover ---
const menuItems = document.querySelectorAll('.main-menu .menu-item');
menuItems.forEach(item => {
  const hoverLine = document.createElement('div');
  hoverLine.classList.add('hover-line');
  item.appendChild(hoverLine);

  item.addEventListener('mouseenter', () => {
    const rect = item.getBoundingClientRect();
    hoverLine.style.left = rect.width / 2 + 'px';
    hoverLine.style.transform = 'translateX(-50%)';
    hoverLine.style.width = '160px';

    // 글씨 볼드로
    item.style.fontWeight = '700';
  });

  item.addEventListener('mouseleave', () => {
    hoverLine.style.width = '0';

    // 글씨 원래 굵기
    item.style.fontWeight = '400';
  });
});
// --- banner 스크롤 효과 + 이미지 호버 효과 ---
const banner = document.querySelector('.banner');
const bannerImg = banner.querySelector('img');
const bannerText = banner.querySelector('.banner-text');

// 초기 상태 설정
bannerImg.style.opacity = '0';
bannerImg.style.transform = 'scale(1.1)';
bannerText.style.opacity = '0';
bannerText.style.transform = 'translate(-50%, -40%)';

// 스크롤 시 나타나는 효과
function checkBannerInView() {
  const rect = banner.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top < windowHeight * 0.8) {
    banner.classList.add('active');

    // 이미지 & 텍스트 애니메이션
    bannerImg.style.transition = 'opacity 1s ease, transform 1s ease';
    bannerText.style.transition = 'opacity 1s ease, transform 1s ease';

    bannerImg.style.opacity = '1';
    bannerImg.style.transform = 'scale(1)';

    bannerText.style.opacity = '1';
    bannerText.style.transform = 'translate(-50%, -50%)';

    window.removeEventListener('scroll', checkBannerInView); // 한 번만 실행
  }
}

window.addEventListener('scroll', checkBannerInView);
checkBannerInView(); // 초기 체크

// 마우스 오버 시 이미지 확대 (텍스트는 그대로)
bannerImg.addEventListener('mouseenter', () => {
  bannerImg.style.transition = 'transform 0.5s ease';
  bannerImg.style.transform = 'scale(1.05)';
});

bannerImg.addEventListener('mouseleave', () => {
  bannerImg.style.transition = 'transform 0.5s ease';
  bannerImg.style.transform = 'scale(1)';
});
const slides = document.querySelectorAll('.founder-slide');
let current = 0;

function showNextSlide() {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}

slides[current].classList.add('active');
setInterval(showNextSlide, 3000);
