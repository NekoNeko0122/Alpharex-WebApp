var swiper = new Swiper(".swiper", {
    effect: "cube",
    allowTouchMove:false,
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
          // Get the current slide index
          const currentIndex = swiper.realIndex;
    
          // Remove 'activeLink' class from all links
          document.querySelectorAll('.Links li').forEach(link => link.classList.remove('activeLink'));
    
          // Add 'activeLink' class to the current active link
          Array.from(document.querySelectorAll('.Links li'))[currentIndex].classList.add('activeLink');
        }
    }
});
function Navigate(indx) {
    for (let i of document.querySelectorAll(".Links li")) i.classList.remove("activeLink")
    Array.from(document.querySelectorAll(".Links li"))[indx].classList.add("activeLink")
    swiper.slideTo(indx, 1000, true)
}


