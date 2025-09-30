// ---- 텍스트 타이핑 효과 ----
const typeElement = document.querySelector('.type');
if(typeElement){
  const text = typeElement.textContent;
  typeElement.textContent = '';

  let index = 0;
  function type() {
    if (index < text.length) {
      typeElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 50);
    }
  }
  type();
}

// ---- 카드 클릭 → 모달 열기 (Work + Web Design 통합) ----
const allCards = document.querySelectorAll('.card-grid .card, .cards'); // 기존 + 새 카드
allCards.forEach(card => {
  card.addEventListener('click', () => {
    const modalId = card.dataset.design;
    const modal = modalId ? document.getElementById(modalId) : null;
    if (modal) {
      modal.style.display = 'flex';
      const content = modal.querySelector('.design-content') || modal.querySelector('.video-content');
      if(content) content.scrollTop = 0;
    }
  });
});

// ---- Video 카드 클릭 → 모달 ----
const videoCards = document.querySelectorAll('.video-card');
videoCards.forEach(card => {
  card.addEventListener('click', () => {
    const modalId = card.dataset.video;
    const modal = document.getElementById(modalId);
    if(modal){
      modal.style.display = 'flex';
      const content = modal.querySelector('.video-content');
      if(content) content.scrollTop = 0;
    }
  });
});

// ---- 모든 모달 닫기 버튼 ----
const closeBtns = document.querySelectorAll('.design-modal .close-btn, .video-modal .close-btn');
closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const parentModal = btn.closest('.design-modal, .video-modal');
    if(parentModal) parentModal.style.display = 'none';
  });
});

// ---- 섹션 순환 구조 (Work → Video → Web Design) ----
const sections = [
  document.getElementById('work'),
  document.getElementById('videoSection'),
  document.getElementById('webDesign')
];

let currentIndex = 0;

// 초기 표시
sections.forEach(sec => { if(sec) sec.style.display = 'none'; });
if(sections[currentIndex]) sections[currentIndex].style.display = 'block';

// 각 섹션 좌우 버튼
const nextBtns = [
  document.getElementById('nextBtn'),       // Work → Video
  document.getElementById('nextBtnVideo'),  // Video → Web Design
  document.getElementById('nextBtnWeb')     // Web Design → Work
];

const prevBtns = [
  document.getElementById('prevBtn'),       // Work → Web Design
  document.getElementById('prevBtnVideo'),  // Video → Work
  document.getElementById('prevBtnWeb')     // Web Design → Video
];

// 다음 버튼 클릭
nextBtns.forEach(btn => {
  if(btn) btn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % sections.length;
    showCurrentSection();
  });
});

// 이전 버튼 클릭
prevBtns.forEach(btn => {
  if(btn) btn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + sections.length) % sections.length;
    showCurrentSection();
  });
});

// 현재 섹션 표시 함수
function showCurrentSection() {
  sections.forEach(sec => { if(sec) sec.style.display = 'none'; });
  if(sections[currentIndex]) sections[currentIndex].style.display = 'block';
  window.scrollTo({ top: sections[currentIndex].offsetTop, behavior: 'smooth' });
}

// ---- CONTACT 타이핑 효과 ----
document.addEventListener("DOMContentLoaded", () => {
  const terminalHeader = document.querySelector(".terminal-header");
  if(terminalHeader){
    const text = "> CONTACT";
    let i = 0;
    terminalHeader.textContent = "";

    function typing() {
      if (i < text.length) {
        terminalHeader.textContent += text.charAt(i);
        i++;
        setTimeout(typing, 100);
      }
    }
    typing();
  }
});

// ---- 스크롤 버튼 ----
const scrollBtn = document.getElementById("scrollTopBtn");
if(scrollBtn){
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ---- 페이드인 섹션 ----
document.addEventListener('DOMContentLoaded', () => {
  const fadeSections = document.querySelectorAll('section, header');

  fadeSections.forEach(sec => sec.classList.add('fade-in-section'));

  function handleScrollFadeIn() {
    const triggerBottom = window.innerHeight * 0.85;

    fadeSections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top < triggerBottom) {
        sec.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', handleScrollFadeIn);
  handleScrollFadeIn();
});
