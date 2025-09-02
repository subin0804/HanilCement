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
  

/* esg */
gsap.registerPlugin(ScrollTrigger);

// 1. 패널 겹치기 zIndex
gsap.set(".panel", { zIndex: (i, target, targets) => targets.length - i });
gsap.set(".panel-text", { zIndex: (i, target, targets) => targets.length - i });

// 2. 이미지 패널 애니메이션
const panels = gsap.utils.toArray('.panel');
panels.forEach((panel, i) => {
  gsap.to(panel, {
    height: 0,
    ease: "none",
    scrollTrigger: {
      trigger: "section.e_black",
      start: () => "top -" + (window.innerHeight * (i + 0.5)),
      end: "+=" + window.innerHeight,
      scrub: true,
      invalidateOnRefresh: true
    }
  });
});

// 3. 텍스트 애니메이션
const texts = gsap.utils.toArray('.panel-text');
texts.forEach((text, i) => {
  gsap.timeline({
    scrollTrigger: {
      trigger: "section.e_black",
      start: () => "top -" + (window.innerHeight * i),
      end: "+=" + window.innerHeight,
      scrub: true,
      invalidateOnRefresh: true
    }
  })
  .to(text, { opacity: 1, yPercent: -50, duration: 0.33 })
  .to(text, { opacity: 0, yPercent: 0, duration: 0.33 }, 0.66);
});

// 4. 섹션 고정 (pin)
ScrollTrigger.create({
  trigger: "section.e_black",
  pin: true,
  start: "top top",
  end: () => "+=" + (panels.length * window.innerHeight),
  scrub: true,
  invalidateOnRefresh: true,
  // markers:true // 디버깅용
});




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
    breakpoints: {
    // 0~767px (모바일)
    0: {
      direction: 'horizontal',   
      slidesPerView:3
      },
    767: {
      direction: 'horizontal',
      slidesPerView:4
    }
    
    }
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







