const text = document.querySelector('.type').textContent;
const typeSpan = document.querySelector('.type');
typeSpan.textContent = '';  // 초기화

let index = 0;
function type() {
  if (index < text.length) {
    typeSpan.textContent += text.charAt(index);
    index++;
    setTimeout(type, 50); // 글자 속도 (50ms)
  }
}
type();
