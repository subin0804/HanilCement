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
// ========== 공통 함수(순서/내용 그대로) ==========
function animateFrom(elem, direction) {
  direction = direction || 1;
  var x = 0, y = direction * 100;
  if (elem.classList.contains("gs_reveal_fromLeft")) { 
    x = -100; 
    y = 0; 
  } else if (elem.classList.contains("gs_reveal_fromRight")) { 
    x = 100; 
    y = 0; 
  }

  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(elem, { x: x, y: y, autoAlpha: 0 }, {
    duration: 1.25, 
    x: 0, 
    y: 0, 
    autoAlpha: 1, 
    ease: "expo", 
    overwrite: "auto"
  });
}
function hide(elem) { gsap.set(elem, { autoAlpha: 0 }); }

document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(ScrollTrigger);

  // ================== [항시 실행] 타이틀 애니메이션 ==================
  // - 뷰포트와 무관하게 항상 동작
  // - 다른 구간에서 clearProps로 지우지 않도록 데스크탑 초기화 대상에서 제외할 것
  (function setupAlwaysOnTitle() {
    const title = document.querySelector(".esg_title.gs_reveal");
    if (!title) return;
    hide(title);
    ScrollTrigger.create({
      trigger: title,
      start: "top 60%",                 // 필요시 조정
      onEnter: () => animateFrom(title),
      onEnterBack: () => animateFrom(title, -1),
      onLeave: () => hide(title)
    });
  })();
  // ================== [항시 실행] 끝 ==================

  // ================== 반응형 분기 ==================
  ScrollTrigger.matchMedia({
    // <= 1023px : 기존 .gs_reveal 전부(타이틀 포함) 작동
    "(max-width: 1023px)": function () {
      gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
        // 타이틀은 이미 위에서 트리거 생성했지만, 중복 생성되어도 큰 문제는 없음.
        // 원치 않으면 여기서 타이틀을 건너뛰어도 됩니다.
        hide(elem);
        ScrollTrigger.create({
          trigger: elem,
          // markers: true,
          onEnter: function() { animateFrom(elem) },
          onEnterBack: function() { animateFrom(elem, -1) },
          onLeave: function() { hide(elem) }
        });
      });
    },

    // >= 1024px : 카드별 "이미지 -> 텍스트" 순서 등장
    "(min-width: 1024px)": function () {
      // ⚠️ clearProps 대상은 .features 내부의 gs_reveal만!
      //    → 타이틀(.esg_title)은 제외해야 '항시 실행' 트리거가 정상 동작
      gsap.set(".features .gs_reveal", { clearProps: "opacity,visibility,transform" });

      const rows = gsap.utils.toArray(".features__item");
      rows.forEach((row) => {
        const img = row.querySelector(".features__card");
        const txt = row.querySelector(".features__content");

        // 초기 상태
        gsap.set([img, txt], { autoAlpha: 0, y: 40 });

        // 한 카드씩: 이미지 -> 텍스트
        gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 70%",
            end: "bottom 40%",
            toggleActions: "play none none reverse",
            // markers: true,
          }
        })
        .to(img, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" })
        .to(txt, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3");
      });
    }
  });
  // ================== 반응형 분기 끝 ==================
});




// function animateFrom(elem, direction) {
//   direction = direction || 1;
//   var x = 0,
//       y = direction * 100;
//   if(elem.classList.contains("gs_reveal_fromLeft")) {
//     x = -100;
//     y = 0;
//   } else if (elem.classList.contains("gs_reveal_fromRight")) {
//     x = 100;
//     y = 0;
//   }
//   elem.style.transform = "translate(" + x + "px, " + y + "px)";
//   elem.style.opacity = "0";
//   gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
//     duration: 1.25, 
//     x: 0,
//     y: 0, 
//     autoAlpha: 1, 
//     ease: "expo", 
//     overwrite: "auto"
//   });
// }

// function hide(elem) {
//   gsap.set(elem, {autoAlpha: 0});
// }

// document.addEventListener("DOMContentLoaded", function() {
//   gsap.registerPlugin(ScrollTrigger);
  
//   gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
//     hide(elem); // assure that the element is hidden when scrolled into view
    
//     ScrollTrigger.create({
//       trigger: elem,
//       // markers: true,
//       onEnter: function() { animateFrom(elem) }, 
//       onEnterBack: function() { animateFrom(elem, -1) },
//       onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
//     });
//   });
// });




/* business */
function business() {
  const tl = gsap.timeline();

  tl.fromTo('.business .main_b1', { opacity: 1, yPercent: 30 }, { opacity: 1, yPercent: 0, duration: 1 })
  // .fromTo('.section-solution .section-1 .thumbnail .image', 0.6, { scale: 1.3 }, { scale: 1 }, '<')
  .fromTo('.business .main_b2', { opacity: 1, yPercent: 45 }, { opacity: 1, yPercent: 0, duration: 1 })
  // .fromTo('.section-solution .section-2 .thumbnail .image', 0.6, { scale: 1.3 }, { scale: 1 }, '<')
  .fromTo('.business .main_b3', { opacity: 1, yPercent: 45 }, { opacity: 1, yPercent: 0, duration: 1 })
  // .fromTo('.section-solution .section-3 .thumbnail .image', 0.6, { scale: 1.3 }, { scale: 1 }, '<')

  ScrollTrigger.create({
      animation: tl,
      trigger: '.business',
      start: 'top 80%',
      end: 'bottom 80%',
      scrub: 1,
      // markers: true
  });
}

document.addEventListener("DOMContentLoaded", () => {
  business();
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


/* 고객 서비스 */
const mouse = document.querySelector('.service .mouse');
const service = document.querySelector('.service');

service.addEventListener('mousemove', e => {
  mouse.style.left = e.clientX + 'px';
  mouse.style.top = e.clientY + 'px';
});

service.addEventListener('mouseenter', () => {
  mouse.style.display = 'block';
});

service.addEventListener('mouseleave', () => {
  mouse.style.display = 'none';
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







