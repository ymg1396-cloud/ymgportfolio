const airplane = document.querySelector('.airplane');
const flyBtn = document.getElementById('flyBtn');

flyBtn.addEventListener('click', () => {
  airplane.classList.remove('takeoff'); // 여러 번 실행할 수 있게 초기화
  void airplane.offsetWidth;            // reflow 강제 → 애니메이션 재실행 가능
  airplane.classList.add('takeoff');
});
