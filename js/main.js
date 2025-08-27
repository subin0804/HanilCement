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


// 섹션 부드럽게 넘기기
// document.addEventListener("DOMContentLoaded", () => {
//     const sections = document.querySelectorAll('.main_visual, .esg, .business, .mid, .news, .recruit, .service');

//     let current = 0;
//     let isAnimating = false;
  
//     function goToSection(index) {
//       if (index < 0 || index >= sections.length || isAnimating) return;
//       isAnimating = true;
//       gsap.to(window, {
//         duration: 1,
//         scrollTo: { y: sections[index].offsetTop, offsetY: 0 },
//         ease: "power2.out",
//         onComplete: () => {
//           current = index;   
//           isAnimating = false;
//         }
//       });
//     }
  
//     window.addEventListener("wheel", (e) => {
//       if (isAnimating) return;
//       if (e.deltaY > 0) {
//         goToSection(current + 1); // 아래로
//       } else {
//         goToSection(current - 1); // 위로
//       }
//     });
//   });
  





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


/* business */
  // [초급자용 주석] sticky가 “겹치고 밀리는” 큰 흐름을 만들고,
  // GSAP은 오직 ‘부드러운 보정(살짝 떠오르며/사라지며)’만 담당합니다.
  document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray('.business .main_b_card');

    cards.forEach((card, i) => {
      const prev = cards[i - 1];

      // 새 카드가 들어올 때: 살짝 아래(y:40) & 옅게(opacity:0) → 제자리 & 불투명
      gsap.fromTo(
        card,
        { y: 40},                     // [초기] 아래쪽에서 살짝 보이기
        { y: 0, ease: "none",          // [도착] 제자리, ease 없음(스크럽 반응형)
          immediateRender: false,                    // [중요] 시작 전 미리 0으로 안 바꿈 → “띡” 방지
          scrollTrigger: {
            trigger: card,
            start: "top 75%",                        // [진입 지점] 카드 상단이 화면 75%에 닿을 때부터
            end:   "top 35%",                        // [완료 지점] 35%까지 오면 완전히 자리잡음
            scrub: 0.6                               // [부드러움] 값↑일수록 스무스(0.5~1 추천)
          }
        }
      );

      if (prev) {
        // 이전 카드는 살짝 위로 밀려 올라가며(=아래 카드가 덮는 느낌 강화)
        gsap.fromTo(
          prev,
          { y: 0 },
          { y: -40, ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: card,                         // 다음 카드가 올라올 때 같이 반응
              start: "top 75%",
              end:   "top 35%",
              scrub: 0.6
            }
          }
        );
      }
    });
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







