document.addEventListener('DOMContentLoaded', () => {
  // --- 슬라이드 & numbers ---
  const slides = document.querySelectorAll('.main-visual .slide');
  const numbers = document.querySelectorAll('.numbers .number-item');
  const visualText = [
    { title: '세상에 없던 원료', desc: '천연물의 가치를 발견해 건강한 세상을 만들어 갑니다.' },
    { title: '세상을 위한 제품', desc: '자연에서 얻은 원료로 혁신적인 제품을 만듭니다.' },
    { title: '세상을 바꾸는 기술', desc: '고객에게 더 나은 건강과 가치를 전달합니다.' }
  ];

  let currentSlide = 0;
  let slideTimeout;

  function resetNumbers() {
    numbers.forEach(num => {
      const line = num.querySelector('.line');
      line.style.transition = 'none';
      line.style.transform = 'scaleX(0)';
      line.style.opacity = '0';
      void line.offsetWidth;
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

    if (slideTimeout) clearTimeout(slideTimeout);

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

    slideTimeout = setTimeout(() => {
      activeLine.style.opacity = '0';
      activeNum.style.color = '#ccc';
      h1.style.color = '#ccc';
      p.style.color = '#ccc';

      currentSlide = (currentSlide + 1) % numbers.length;
      showSlide(currentSlide);
    }, 3000);
  }

  numbers.forEach((num, i) => {
    num.addEventListener('click', () => {
      clearTimeout(slideTimeout);
      showSlide(i);
    });
  });

  showSlide(0);

  // --- 바로가기 버튼 클릭 방지 ---
  document.querySelectorAll('.btn-disabled').forEach(btn => {
    btn.addEventListener('click', e => e.preventDefault());
  });

  // --- 헤더 스크롤 + 로고 변경 + 글자 색상 ---
  const header = document.querySelector('header');
  const logo = document.querySelector('header .logo img');
const defaultLogo = '../youhan/img/yuhancare_logo_white.png';

  const whiteLogo = '../youhan/img/yuhancare_logo_all_white.png';
  const visualH1 = document.querySelector('.visual-text h1');
  const visualP = document.querySelector('.visual-text p');

  let lastScrollY = 0;

  header.classList.add('transparent');
  header.style.transform = 'translateY(0)';
  if (logo) logo.src = defaultLogo;
  if (visualH1) visualH1.style.color = '#ccc';
  if (visualP) visualP.style.color = '#ccc';

  function handleHeaderScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY === 0) {
      header.classList.remove('visible', 'hidden', 'active');
      header.classList.add('transparent');
      header.style.transform = 'translateY(0)';
      if (logo) logo.src = defaultLogo;
      if (visualH1) visualH1.style.color = '#ccc';
      if (visualP) visualP.style.color = '#ccc';
    } else if (currentScrollY > lastScrollY) {
      header.classList.remove('transparent', 'visible', 'active');
      header.classList.add('hidden');
      header.style.transform = 'translateY(-100%)';
    } else {
      header.classList.remove('transparent', 'hidden');
      header.classList.add('visible', 'active');
      header.style.transform = 'translateY(0)';
      if (logo) logo.src = whiteLogo;
      if (visualH1) visualH1.style.color = '#fff';
      if (visualP) visualP.style.color = '#fff';
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleHeaderScroll);

  // --- redefine 섹션 버튼 & 이미지 ---
  const brand = document.querySelector('.redefine .brand');
  const buttons = document.querySelectorAll('.redefine .buttons button');

  if (brand) {
    brand.style.setProperty('--after-img', "../youhan/img/text_to_img1.jpg");
    brand.classList.add('animate-after');
  }

  buttons.forEach(btn => {
    btn.style.backgroundColor = 'transparent';
    btn.style.color = '#000';
  });

buttons.forEach(button => {
  button.addEventListener('click', () => {
    let imgUrl = '';
    if (button.textContent === '기업소개') imgUrl = "https://ymg1396-cloud.github.io/portfolio/youhan/img/text_to_img1.jpg";
    if (button.textContent === '사업소개') imgUrl = "https://ymg1396-cloud.github.io/portfolio/youhan/img/text_to_img2.jpg";
    if (button.textContent === '기업문화') imgUrl = "https://ymg1396-cloud.github.io/portfolio/youhan/img/text_to_img3.jpg";

    if (!brand) return;

    // 1️⃣ 텍스트 이미지 즉시 적용
    brand.style.background = `url('${imgUrl}') no-repeat center/cover`;
    brand.style.webkitBackgroundClip = 'text';
    brand.style.webkitTextFillColor = 'transparent';
    brand.style.backgroundSize = 'cover';

    // 2️⃣ 텍스트 이미지가 나오고 1초 후에 --after-img로 배경처럼 깔리게
    setTimeout(() => {
      brand.style.setProperty('--after-img', `url('${imgUrl}')`);
      brand.classList.remove('animate-after');
      void brand.offsetWidth; // 리셋
      brand.classList.add('animate-after');
    }, 1000);

    // 3️⃣ 버튼 색상 처리
    buttons.forEach(btn => {
      btn.style.backgroundColor = 'transparent';
      btn.style.color = '#000';
    });
    button.style.backgroundColor = '#000';
    button.style.color = '#fff';
  });
});



  // --- main-menu hover line & bold ---
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
      item.style.fontWeight = '700';
    });

    item.addEventListener('mouseleave', () => {
      hoverLine.style.width = '0';
      item.style.fontWeight = '400';
    });
  });

  // --- KOR 메뉴 토글 ---
  const korMenu = document.querySelector('.kor-menu');
  if (korMenu) {
    korMenu.addEventListener('click', () => {
      korMenu.classList.toggle('active');
    });
  }

  // --- banner 스크롤 효과 + 이미지 호버 ---
  const banner = document.querySelector('.banner');
  if (banner) {
    const bannerImg = banner.querySelector('img');
    const bannerText = banner.querySelector('.banner-text');

    if (bannerImg && bannerText) {
      bannerImg.style.opacity = '0';
      bannerImg.style.transform = 'scale(1.1)';
      bannerText.style.opacity = '0';
      bannerText.style.transform = 'translate(-50%, -40%)';

      function checkBannerInView() {
        const rect = banner.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight * 0.8) {
          banner.classList.add('active');

          bannerImg.style.transition = 'opacity 1s ease, transform 1s ease';
          bannerText.style.transition = 'opacity 1s ease, transform 1s ease';

          bannerImg.style.opacity = '1';
          bannerImg.style.transform = 'scale(1)';

          bannerText.style.opacity = '1';
          bannerText.style.transform = 'translate(-50%, -50%)';

          window.removeEventListener('scroll', checkBannerInView);
        }
      }

      window.addEventListener('scroll', checkBannerInView);
      checkBannerInView();

      bannerImg.addEventListener('mouseenter', () => {
        bannerImg.style.transition = 'transform 0.5s ease';
        bannerImg.style.transform = 'scale(1.05)';
      });

      bannerImg.addEventListener('mouseleave', () => {
        bannerImg.style.transition = 'transform 0.5s ease';
        bannerImg.style.transform = 'scale(1)';
      });
    }
  }

  // --- founder 슬라이드 ---
  const founderSlides = document.querySelectorAll('.founder-slide');
  let currentFounder = 0;

  if (founderSlides.length) {
    founderSlides[currentFounder].classList.add('active');

    setInterval(() => {
      founderSlides[currentFounder].classList.remove('active');
      currentFounder = (currentFounder + 1) % founderSlides.length;
      founderSlides[currentFounder].classList.add('active');
    }, 3000);
  }
});
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) { // 200px 이상 스크롤하면
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
const banners = document.querySelectorAll('.image-banner');

banners.forEach(banner => {
  const img = banner.querySelector('img');

  let scale = 1;
  let targetScale = 1;

  function animate() {
    // 부드러운 보간
    scale += (targetScale - scale) * 0.05;
    img.style.transform = `scale(${scale})`;
    requestAnimationFrame(animate);
  }

  animate(); // 애니메이션 루프 시작

  banner.addEventListener('mouseenter', () => {
    targetScale = 1.02; // 살짝 확대
  });

  banner.addEventListener('mouseleave', () => {
    targetScale = 1; // 원래 크기로
  });
});
