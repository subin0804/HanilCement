gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);


/* 헤더 스크롤*/
let lastScrollY = window.scrollY;
const headerS = document.querySelector('header');

window.addEventListener('scroll', function () {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 10) {
    // 아래로 스크롤 중 + 약간 내려간 상태 → 헤더 숨김
    headerS.classList.add('hide');
  } else {
    // 위로 스크롤 중 → 헤더 표시
    headerS.classList.remove('hide');
  }

  lastScrollY = currentScrollY;
});

/* 헤더 util */
const utilBtn = document.querySelector('.header_util button')
const utilList = document.querySelector('.header_util ul')

utilBtn.addEventListener('click', function () {
  if (utilList.style.display === 'none') {
    utilList.style.display = 'block'
  } else {
    utilList.style.display = 'none'
  }
})


/* 헤더 gnb 열고 닫기 */
const header = document.querySelector('header');
const menuItems = document.querySelectorAll('header #gnb .dep1 > li');
const dep2Links = document.querySelectorAll('header .dep2 a');

// 메뉴 hover 시 열기
menuItems.forEach((item) => {
  item.addEventListener('mouseenter', function () {
    header.classList.add('on');
    this.classList.add('over');
  });

  item.addEventListener('mouseleave', function () {
    this.classList.remove('over');
  });
});

// dep2 클릭 시 닫기
dep2Links.forEach(link => {
  link.addEventListener('click', () => {
    header.classList.remove('on');
    menuItems.forEach(item => item.classList.remove('over'));
  });
});

// header 전체에서 마우스 빠져나가면 닫기
header.addEventListener('mouseleave', function (e) {
  if (!header.contains(e.relatedTarget)) {
    header.classList.remove('on');
    menuItems.forEach(item => item.classList.remove('over'));
  }
});



/* esg */
// ========== 공통 함수 ==========
function animateFrom(elem, direction) {
  direction = direction || 1;
  var x = 0, y = direction * 100;
  if (elem.classList.contains("gs_reveal_fromLeft")) { 
    x = -100; 
    y = 0; 
  }
  else if (elem.classList.contains("gs_reveal_fromRight")) { 
    x = 100; 
    y = 0; 
  }

  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(elem, { x, y, autoAlpha: 0 }, {
    duration: 1.25, x: 0, y: 0, autoAlpha: 1, ease: "expo", overwrite: "auto"
  });
}

function hide(elem) { gsap.set(elem, { autoAlpha: 0 }); }

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // ================== [항시 실행] 타이틀 애니메이션 ==================
  (function setupAlwaysOnTitle() {
    const title = document.querySelector(".esg_title.gs_reveal");
    if (!title) return;
    hide(title);
    ScrollTrigger.create({
      trigger: title,
      start: "top 70%",
      onEnter: () => animateFrom(title),
      onEnterBack: () => animateFrom(title, -1),
      onLeave: () => hide(title)
    });
  })();
  // ================== [항시 실행] 끝 ==================

  // ================== 반응형 분기(이것만 사용) ==================
  const mm = gsap.matchMedia();

  // <= 1023px : 기존 .gs_reveal 전부(타이틀 포함) 작동
  mm.add("(max-width: 1023px)", () => {
    const elems = gsap.utils.toArray(".gs_reveal");
    elems.forEach((elem) => {
      hide(elem);
      ScrollTrigger.create({
        trigger: elem,
        // markers: true,
        onEnter: () => animateFrom(elem),
        onEnterBack: () => animateFrom(elem, -1),
        onLeave: () => hide(elem),
        invalidateOnRefresh: true
      });
    });

    // cleanup
    return () => {
      ScrollTrigger.getAll().forEach(st => {
        // 이 구간에서 만든 것만 정리하고 싶다면 id나 trigger로 필터링하세요.
      });
    };
  });

  // >= 1024px : 카드별 "이미지 -> 텍스트" 순서 등장 (단일 TL에 쌍으로)
  mm.add("(min-width: 1024px)", () => {
    // 1) .features 내부 .gs_reveal만 초기화 (타이틀은 건드리지 않음)
    gsap.set(".features .gs_reveal", { clearProps: "opacity,visibility,transform" });

    // 2) 왼→오 순서를 화면상의 x좌표로 보장
    const rows = gsap.utils.toArray(".features__item")
      .sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);

    // 3) 각 아이템의 img/txt 쌍 만들기
    const pairs = rows.map(row => ({
      img: row.querySelector(".features__card"),
      txt: row.querySelector(".features__content"),
    })).filter(p => p.img && p.txt); // 안전장치

    // 4) 초기 상태
    // 초기값은 그대로
    gsap.set(pairs.flatMap(p => [p.img, p.txt]), { autoAlpha: 0, y: 40, x: -16 });

    // 단일 타임라인
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".features",
        start: "top 55%",
        end: "bottom 40%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
        // markers: true,
      }
    });

    // ★ 변경 포인트: 각 쌍에서 img+txt를 '동시에' 등장
    pairs.forEach(({ img, txt }) => {
      tl.to([img, txt], {
        autoAlpha: 1,
        y: 0,
        x: 0,
        duration: 0.55,
        ease: "power2.out"
      }, ">"); // 이전 쌍이 끝난 직후 시작
    });

  });
});



/* business */
function business() {
  const tl = gsap.timeline();

  tl.fromTo('.business .main_b1', { opacity: 1, yPercent: 25 }, { opacity: 1, yPercent: 0, duration: 1 })
  // .fromTo('.section-solution .section-1 .thumbnail .image', 0.6, { scale: 1.3 }, { scale: 1 }, '<')
  .fromTo('.business .main_b2', { opacity: 1, yPercent: 40 }, { opacity: 1, yPercent: 0, duration: 1 })
  // .fromTo('.section-solution .section-2 .thumbnail .image', 0.6, { scale: 1.3 }, { scale: 1 }, '<')
  .fromTo('.business .main_b3', { opacity: 1, yPercent: 40 }, { opacity: 1, yPercent: 0, duration: 1 })
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
      slidesPerView:2
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







