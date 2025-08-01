gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);


/* 헤더 스크롤*/
let lastScrollY = window.scrollY;
const header = document.querySelector('header');

window.addEventListener('scroll', function () {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 10) {
    // 아래로 스크롤 중 + 약간 내려간 상태 → 헤더 숨김
    header.classList.add('hide');
  } else {
    // 위로 스크롤 중 → 헤더 표시
    header.classList.remove('hide');
  }

  lastScrollY = currentScrollY;
});


/* business */

// main_b_card 요소들을 순회하며 애니메이션 적용
// gsap.utils.toArray(".main_b_card").forEach((card, i) => {
//   gsap.from(card, {
//     y: 80,              // 아래에서 올라오듯
//     opacity: 0,         // 처음에는 투명
//     duration: 1,        // 애니메이션 지속 시간
//     delay: i * 0.2,     // 순차 등장 효과
//     ease: "power2.out", // 부드러운 효과
//     scrollTrigger: {
//       trigger: card,
//       start: "top 85%",               // 화면의 85% 지점 도달 시 시작
//       toggleActions: "play none none none"

//     }
//   });
// });
// gsap.utils.toArray(".main_b_card").forEach((card, i) => {
//   gsap.fromTo(card,
//     {
//       y: 80,
//       opacity: 0
//     },
//     {
//       y: 0,
//       opacity: 1,
//       duration: 1,
//       delay: i * 0.05, // 💡 너무 겹치지 않게 간격 줄이기
//       ease: "power2.out",
//       scrollTrigger: {
//         trigger: card,
//         start: "top 85%",
//         toggleActions: "play reverse play reverse"
//       }
//     }
//   );
// });

gsap.utils.toArray(".main_b_card").forEach((card, i) => {
  gsap.fromTo(card,
    {
      y: 80,
      opacity: 0,
      zIndex: i        // 초기 zIndex 설정
    },
    {
      y: 0,
      opacity: 1,
      zIndex: i + 10,  // 스크롤로 등장할 때 더 위로
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play reverse play reverse"
      }
    }
  );
});


/* News */
const swiper = new Swiper(".news-swiper", {
    slidesPerView: '4',
    loop: true,
    loopedSlides: 8,
    spaceBetween: 20,
    scrollbar: {
      el: ".swiper-scrollbar",
    },
    mousewheel: true,
  });


  /* 푸터 패밀리사이트 */
const famBtn = document.querySelector(".family_site button");
const famList = document.querySelector(".family_site ul");

// famBtn.addEventListener('click', function() {})
famBtn.addEventListener("click", function () {
  if (famList.style.display === "none") {
    famList.style.display = "block";
  } else {
    famList.style.display = "none";
  }
});