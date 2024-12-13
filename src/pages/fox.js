<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>

<script>
document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger)
  console.log(gsap)
 
 });
 
 let inactiveSlides = []
 let swiperTl

  const swiper = new Swiper('.swiper', {
    centeredSlides: true,
    slidesPerView: 1.5,
    loop: true,
    spaceBetween: 20,
     navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    slideChangeTransitionEnd: function () {
     
      inactiveSlides = [];

     
      this.slides.forEach((slide, i) => {
        if (i !== this.activeIndex) {
          inactiveSlides.push(slide);
        }
      });

    swiperTl.clear()
	

	 
    
    },
    init: function () {
      // Populate inactiveSlides on initialization
      this.slides.forEach((slide, i) => {
        if (i !== this.activeIndex) {
          inactiveSlides.push(slide);
        }
      });
       gsap.set(inactiveSlides,{opacity:0})
	  swiperTl = gsap.timeline({
		scrollTrigger:{
			trigger:".landing-hero-bg-video",
			start:"bottom 10%",
			toggleActions:'play none none reverse',
		
		}
	  })

	  swiperTl.to(inactiveSlides,{opacity:1})

      console.log("Initial inactive slides:", inactiveSlides);

     
    },
  },
  });
  
  
  let stickyWrapper = document.querySelector('.landing-hero-bg-video') 
	let sliderStickyWrapper = document.querySelector('.landing-slider-sticky-wrapper')
	let sectionOne = document.querySelector('.landing-hero-section') 
	let sectionTwo = document.querySelector('.landing-section-two') 


	function setHeight(){
	let sectionHeight = sectionOne.offsetHeight+sectionTwo.offsetHeight
     stickyWrapper.style.height=`${sectionHeight+200}px`
	 sliderStickyWrapper.style.height = `${sectionHeight}px`
	
	console.log(sectionHeight)
	}
 

	window.addEventListener('resize', setHeight);
	
     setHeight()
	

	
	
  	
  	let tl = gsap.timeline({
  		scrollTrigger:{
  		trigger:'.landing-hero-section',
  		start:'top top',
  		end: '+=600',
  		scrub:true
  	}
  	})
  
    tl.to('.landing-hero-content',{
  	opacity:0,
  	
    })
   tl.to('.landing-video-cover',{opacity:1})
   tl.set('.landing-product-video',{opacity:0})
  

  
   document.querySelectorAll('.landing-detail').forEach((element,i)=>{
        gsap.to(element,{
              opacity:1,
              y:0,
              duration:0.3,
	          ease:'none',
      scrollTrigger:{
      	trigger:element,
      	start:'top 90%',
      	toggleActions:'play none none reverse'
      
      
      }
      })
      
      
      })


	  gsap.to(".swiper",{scale:1,

		scrollTrigger:{
			trigger:".landing-hero-bg-video",
			start:"bottom 70%",
            end:"bottom top",
			scrub:true,
			toggleActions:'play none none reverse',
		
		}
	 })


	 
	 gsap.to(".swiper-button-prev,.swiper-button-next",{opacity:1,
		scrollTrigger:{
			trigger:".hero-bg-video",
			start:"bottom 10%",
			toggleActions:'play none none reverse',
		
		}
	 })
	 
</script>