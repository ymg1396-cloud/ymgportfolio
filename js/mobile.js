document.addEventListener("DOMContentLoaded", function () {
    const sections = [
        document.querySelector(".section-work"),
        document.querySelector("#videoSection"),
        document.querySelector(".section-web-design")
    ];
    let currentSection = 0;

    // 모든 섹션 숨기기
    function hideAllSections() {
        sections.forEach(sec => {
            if (sec) sec.style.display = "none";
        });
    }

    // 현재 섹션 표시 + 카드 모두 보여주기
    function showCurrentSection() {
        hideAllSections();
        const sec = sections[currentSection];
        if (!sec) return;
        sec.style.display = "block";

        // 섹션 안의 모든 카드/이미지 보이기
        const cards = sec.querySelectorAll(".card, .cards, .video-card, img");
        cards.forEach(card => {
            card.style.display = "flex"; // flex로 통일
        });

        // 웹디자인 카드 높이 맞추기
        if (sec.classList.contains("section-web-design")) {
            const webCards = sec.querySelectorAll(".card");
            let maxHeight = 0;

            // 카드 높이 중 최대값 찾기
            webCards.forEach(card => {
                card.style.height = "auto"; // 초기화
                const cardHeight = card.offsetHeight;
                if (cardHeight > maxHeight) maxHeight = cardHeight;
            });

            // 모든 카드 높이를 최대값으로 설정
            webCards.forEach(card => {
                card.style.height = maxHeight + "px";
            });
        }
    }

    // 버튼 클릭 이벤트
    function goPrev() {
        currentSection = Math.max(0, currentSection - 1);
        showCurrentSection();
    }

    function goNext() {
        currentSection = Math.min(sections.length - 1, currentSection + 1);
        showCurrentSection();
    }

    // 모바일 화면일 때만 버튼 생성
    if (window.innerWidth <= 768) {
        sections.forEach(sec => {
            if (!sec) return;

            const btnContainer = document.createElement("div");
            btnContainer.className = "section-btn-container";

            const prevBtn = document.createElement("button");
            prevBtn.className = "section-btn";
            prevBtn.textContent = "이전";
            prevBtn.addEventListener("click", goPrev);

            const nextBtn = document.createElement("button");
            nextBtn.className = "section-btn";
            nextBtn.textContent = "다음";
            nextBtn.addEventListener("click", goNext);

            btnContainer.appendChild(prevBtn);
            btnContainer.appendChild(nextBtn);

            sec.appendChild(btnContainer);
        });
    }

    // 초기 화면 표시
    showCurrentSection();

    // 창 크기 변경 시 높이 재조정
    window.addEventListener("resize", function() {
        showCurrentSection();
    });
});
