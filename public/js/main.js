const menu = document.getElementById("menu");
const container = document.getElementById("container");
const guessBtn = document.getElementById("home-guest-btn");
const servBtn = document.getElementById("home-service-btn");
const items = document.querySelectorAll(".cardslider .item");
const nextSlide = document.getElementById("next");
const prevSlide = document.getElementById("prev");
const cardwrapper = document.getElementById("card-container");


var hammer = new Hammer(document.documentElement);

// ------- SWIPER -------

var swiper = new Swiper(".swiper", {
    effect: "cube",
    allowTouchMove: false,
    grabCursor: false,
    cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
    },
    mousewheel:true,

    on: {
        slideChange: function () {
          const currentIndex = swiper.realIndex;
          document.querySelectorAll('.Links li').forEach(link => link.classList.remove('activeLink'));
          Array.from(document.querySelectorAll('.Links li'))[currentIndex].classList.add('activeLink');
        }
    }
});
function Navigate(indx) {
    for (let i of document.querySelectorAll(".Links li")) i.classList.remove("activeLink")
    Array.from(document.querySelectorAll(".Links li"))[indx].classList.add("activeLink")
    swiper.slideTo(indx, 1000, true)
}

// ------- TOUCH -------

// hammer.on('swiperight', function() {
//     var currentIndex = swiper.realIndex;  
//     if (currentIndex > 0) {
//         Navigate(currentIndex - 1);
//     }
// });

// hammer.on('swipeleft', function() {
//     var currentIndex = swiper.realIndex; 
//     if (currentIndex < swiper.slides.length - 1) {
//         Navigate(currentIndex + 1);
//     }
// });

// ------- HAMBURGER SLIDE -------

function toggleMenu() {
    menu.classList.toggle('open');  
    container.classList.toggle('open'); 
}

let active = 7;
const mySlide = [...items];
function slideShow() {
    let count = 0;
    
    if (active === mySlide.length - 3) {
        mySlide[mySlide.length - 3].classList.add("activeSlide");
        let firstItem = mySlide.shift();
        mySlide.push(firstItem);
        active--;
    } else if (active === 2) {
        mySlide[2].classList.add("activeSlide");
        let lastItem = mySlide.pop();
        mySlide.unshift(lastItem);
        active++; 
    } else {
        mySlide[active].classList.add("activeSlide");
    }
    
    console.log(active);
    for(var i = active + 1; i < mySlide.length; i++) {
        count++;
        mySlide[i].style.transform = `translateX(${10*count}vw) scale(${1 - 0.2*count}) perspective(20px) rotateY(-1deg)`;
        mySlide[i].style.zIndex = -count;
        mySlide[i].style.filter = "blur(5px)";
        mySlide[i].style.opacity = count > 2 ? 0 : 0.6;
    }
    count = 0;
    for(var i = active - 1; i >=0 ; i--) {
        count ++;
        mySlide[i].style.transform = `translateX(${-10*count}vw) scale(${1 - 0.2*count}) perspective(20px) rotateY(1deg)`;
        mySlide[i].style.zIndex = -count;
        mySlide[i].style.filter = "blur(5px)";
        mySlide[i].style.opacity = count > 2 ? 0 : 0.6;
    }
}
slideShow();

const activeSlide = document.querySelector(".activeSlide");

cardwrapper.addEventListener("click", function(event) {
    const contWidth = cardwrapper.offsetWidth;
    const clickPos = event.clientX - cardwrapper.getBoundingClientRect().left;
    console.log(event.target);
    const activeSlideElement = event.target.closest('.activeSlide');

    if (event.target.closest('.activeSlide') || [nextSlide, prevSlide].includes(event.target)) {
        return; 
    }

    if (clickPos > contWidth / 2) {
        nextSlideClick();
    } else {
        prevSlideClick();
    }
});

function nextSlideClick() {
    active = active + 1 < items.length ? active + 1 : active;
    mySlide[active - 1].classList.remove("activeSlide");
    slideShow();
}

function prevSlideClick() {
    active = active - 1 >= 0 ? active - 1 : active;
    mySlide[active + 1].classList.remove("activeSlide");
    slideShow();
}

// ------- CORE VALUES SLIDER -------

const valueSlide = new Swiper('.values-container', {
    loop: true, 
    slidesPerView: 2, 
    spaceBetween: 20,
    slideClass: "core-values",
    wrapperClass:"values-wrapper",
    
    speed: 7000, 
    autoplay: {
      delay: 0, 
      disableOnInteraction: false, 
    },
    
    
    
    
    navigation: {
      nextEl: '.swiper-button-next', 
      prevEl: '.swiper-button-prev', 
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
  
    
  });


// ------- RESIZE -------

function handleResize() {
    const width = window.innerWidth;
    
    if (width > 992) {
        menu.classList.remove('open');
        container.classList.remove('open');
    }

    if (width < 1450) {
        guessBtn.textContent = "As Guest";
        servBtn.textContent = "Our Services";
    } else {
        guessBtn.textContent = "Continue As Guest";
        servBtn.textContent = "See Our Services"
    }

}

window.addEventListener('resize', handleResize);
handleResize();

