/* 로딩화면 */
const heading = document.querySelector("#loading div p"); 
const loadingArea = document.querySelector("#loading");

// border-radius 애니메이션용 keyframes
const keyframes = {
  borderRadius: [
    '100% 50% 70% 50% / 60% 50% 100% 70%',
    '60% 100% 50% 70% / 70% 60% 50% 100%',
    '70% 50% 60% 100% / 100% 50% 60% 70%',
    '50% 70% 60% 100% / 60% 50% 70% 100%',
    '100% 50% 70% 50% / 60% 50% 100% 70%' // 다시 처음으로
  ],
};

document.addEventListener("DOMContentLoaded", () => {
  // border-radius 애니메이션 실행
  if (heading) {
    heading.animate(keyframes, {
      duration: 3000,        // 3초마다 변형
      iterations: Infinity,  // 무한 반복
      easing: "ease-in-out", // 부드럽게
      direction: "alternate" // 왔다갔다
    });
  }

  // 탭 단위로 첫 방문에만 로딩 표시
  const firstVisit = !sessionStorage.getItem("visited");

  if (firstVisit) {
    window.addEventListener("load", () => {
      // 로딩 화면 페이드아웃 애니메이션
      const animation = loadingArea.animate(
        {
          backdropFilter: ["blur(10px)", "blur(0)"],
          background: ["rgba(238,221,136,1)", "rgba(238,221,136,0)"],
          opacity: [1, 0],
        },
        {
          duration: 700,
          delay: 500,
          fill: "forwards",
          easing: "ease-in-out",
        }
      );

      // 애니메이션이 끝나면 완전히 제거
      animation.onfinish = () => {
        loadingArea.style.display = "none";
        loadingArea.style.pointerEvents = "none";
      };

      // 안전장치 (혹시 애니메이션 콜백이 실행 안 될 경우)
      setTimeout(() => {
        loadingArea.style.display = "none";
        loadingArea.style.pointerEvents = "none";
      }, 2500);
    });

    // 방문 기록 저장
    sessionStorage.setItem("visited", "true");
  } else {
    // 재방문 시 로딩 화면 바로 제거
    loadingArea.style.display = "none";
    loadingArea.style.pointerEvents = "none";
  }
});


const closeBtn = document.querySelector(".head_notice .close");
const headNotice = document.querySelector(".head_notice");
const header01 = document.querySelector("header");

closeBtn.addEventListener("click", () => {
  headNotice.style.display = "none"; // 공지 없애기
  header01.style.top = "0"; // header 위로 이동
});


// 날짜 API ===============================================
const today = new Date();


const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');

const days = ['일', '월', '화', '수', '목', '금', '토'];
const dayOfWeek = days[today.getDay()];

const dateString = `${String(year).slice(2)}.${month}.${day} (${dayOfWeek})`;

document.querySelector('.date').textContent = dateString;



// // 날씨 정보 API ===============================================
// window.onload = function () {
//   // API 호출 코드
//   // 발급받은 API 키를 여기에 넣어주세요.
//   const apiKey = 'f61c9b24c4f89c40630a1727bf575394';
//   const city = 'Jeju-si'; // 예보를 가져올 도시

//   const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=kr&units=metric`;

//   fetch(url)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('네트워크 응답에 문제가 있습니다.');
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log(data); // 데이터 구조 확인용

//       const container = document.getElementById('forecast-container');
//       container.innerHTML = ''; // 기존 내용 초기화

//       // 3시간 간격 예보 데이터는 'list' 배열 안에 있습니다.
//       data.list.forEach(forecast => {
//         const date = new Date(forecast.dt * 1000);
//         const time = date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
//         const temp = Math.round(forecast.main.temp);
//         const description = forecast.weather[0].description;
//         const iconCode = forecast.weather[0].icon;
//         const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

//         // 각 예보 정보를 담을 div 생성
//         const forecastItem = document.createElement('div');
//         forecastItem.className = 'forecast-item';

//         forecastItem.innerHTML = `
//         <p><strong>${date.toLocaleDateString('ko-KR')} ${time}</strong></p>
//         <p>${temp}°C</p>
//         <p>${description}</p>
//         <img src="${iconUrl}" alt="${description}">
//       `;

//         container.appendChild(forecastItem);
//       });
//     })
//     .catch(error => {
//       console.error('날씨 예보를 가져오는 데 실패했습니다:', error);
//       document.getElementById('forecast-container').innerHTML = '<p>정보 없음</p>';
//     });
// };


// 헤더 스크롤 다운 ===============================================

const sections = document.querySelectorAll('.main_bg_text');
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || window.pageYOffset;

  const section = sections[0];
  const rect = section.getBoundingClientRect();

  const sectionTop = rect.top + scrollTop;

  if (scrollTop > sectionTop) {
    header.classList.add('on');
  } else {
    header.classList.remove('on');
  }
});


// 상세페이지 비디오 =======================================

$(function () {
  const $articles = $('.video_wrap article');
  const $videos = $articles.find('video');

  $articles.eq(0).addClass('active');
  $videos.eq(0).get(0).play();

  $articles.on('mouseenter', function () {
    $articles.removeClass('active');
    $videos.each(function () { this.pause(); });

    $(this).addClass('active');
    const thisVideo = $(this).find('video').get(0);
    thisVideo.currentTime = 0;
    thisVideo.play();
  });

  $('.video_wrap').on('mouseleave', function () {
    $articles.removeClass('active');
    $articles.eq(0).addClass('active');
    $videos.each(function () { this.pause(); });
    $videos.eq(0).get(0).play();
  });
});