


document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger)
  
 
 });
 let gap_between_slides = 12
 let inactiveSlides = []
 let swiperTl
 
 function initVideoControls(videoClass, playIconClass, pauseIconClass,icons_wrapper,progress_loader) {
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', () => {
        
        
        const video = document.querySelector(videoClass);
        const playIcon = document.querySelector(playIconClass);
        const pauseIcon = document.querySelector(pauseIconClass);
        const controller = document.querySelector(icons_wrapper);
        const progressLoader = document.querySelector(progress_loader);
        
        

        if (!video || !playIcon || !pauseIcon || !controller) {
            
            return;
        }

        
        

        controller.addEventListener('click', () => {
        
            if (video.paused) {
            
                video.play();
                playIcon.style.opacity = "0";
                pauseIcon.style.opacity = "1";
            } else {
            
                video.pause();
                playIcon.style.opacity = "1";
                pauseIcon.style.opacity = "0";
            }
        });
        
        video.addEventListener('timeupdate', () => {
          
      let duration = video.duration
			let val = video.currentTime/duration
			let rounded = Number(val.toFixed(2))*100;
      
      
			
			
			 progressLoader.style.strokeDashoffset = rounded;
			
			
			
			
            
            
        });

    });
}

  const swiper = new Swiper('.landing-swiper', {
    centeredSlides: true,
    slidesPerView: 1.5,
    loop: true,
    allowTouchMove:false,
    spaceBetween: gap_between_slides,
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
	 sliderStickyWrapper.style.height = `${sectionHeight+800}px`
	
	
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


	  gsap.to(".landing-swiper",{scale:1,

		scrollTrigger:{
			trigger:".landing-hero-bg-video",
			start:"bottom top",
      end:"+=800",
			scrub:true,
			toggleActions:'play none none reverse',
		
		}
	 })


	 
	 gsap.to(".swiper-button-prev,.swiper-button-next",{opacity:1,duration:0.5,
		scrollTrigger:{
			trigger:".landing-hero-bg-video",
			start:"bottom 10%",
			toggleActions:'play none none reverse',
		
		}
	 })
   
   let tween
let tween_two


function createMarqueeInstance(anim, marqueeinner, direction, speed) {
    let progress = anim ? anim.progress() : 0
    anim && anim.progress(0).kill()
    const marqueeInnerOne = marqueeinner

    const marqueeOne = marqueeInnerOne.children[0];
    const marqueeOneClone = marqueeOne?.cloneNode(true)
    marqueeInnerOne.append(marqueeOneClone)

    const marqueeWidth = parseInt(getComputedStyle(marqueeOne).getPropertyValue("width"), 10)
    const marqueeGap = parseInt(getComputedStyle(marqueeOne).getPropertyValue("column-gap"), 10)

    const distanceToTranslate = direction * (marqueeWidth + marqueeGap)

    const newAnim = gsap.fromTo(marqueeInnerOne.children, { x: 0 }, { x: distanceToTranslate, duration: speed, ease: "none", repeat: -1 })
    newAnim.progress(progress)

    return newAnim
}

const marqueeInnerOne = document.querySelector(".marquee-inner-1") 
const marqueeInnerTwo = document.querySelector(".marquee-inner-2") 
const marqueeWrapper = document.querySelector(".marquee-wrapper")

function playMarquee() {
    const speed = parseFloat(marqueeWrapper.getAttribute('duration') || '12');
   
    tween = createMarqueeInstance(tween, marqueeInnerOne, -1, speed)
    tween_two = createMarqueeInstance(tween_two, marqueeInnerTwo, 1, speed)
    
}


window.addEventListener('resize',debounce(playMarquee))
playMarquee()

function timeScaler(target, gsapTween) {
  
    if (window.innerWidth > 650) {
        const originalTimeScale = gsapTween ? gsapTween.timeScale() : 1;

        target.addEventListener("mouseenter", function() {
            if (gsapTween) {
                gsapTween.timeScale(0.3);
            }
        });

        target.addEventListener("mouseleave", function() {
            if (gsapTween) {
                gsapTween.timeScale(originalTimeScale);
            }
        });
    }
}

const marqueePause = document.querySelector(".pause-icon-marquee")
const marqueePlay = document.querySelector(".play-icon-marquee")
const marqueeController = document.querySelector(".video-controls-marquee")

function pauseMarquee(){
	if(tween.paused() && tween_two.paused()){
		tween.play()
		tween_two.play()
		marqueePlay.style.opacity="0"
		marqueePause.style.opacity="1"
	}else{
		tween.pause()
		tween_two.pause()
		marqueePlay.style.opacity="1"
		marqueePause.style.opacity="0"
	}
}

marqueeController.addEventListener("click",pauseMarquee)


timeScaler(marqueeInnerOne,tween)
timeScaler(marqueeInnerTwo,tween_two)

function debounce(func){
let timer;
return function(event){
	if(timer) clearTimeout(timer);
	timer = setTimeout(()=>{func()},200,event)
}
}

  let loaderTl


const controller = document.querySelector('.video-controls')
const productVideo = document.querySelector('.product-video') 
const playIcon = document.querySelector('.play-icon') 
const pauseIcon = document.querySelector('.pause-icon') 
const progressCircle = document.querySelector('#progress-circle')





productVideo.addEventListener('timeupdate', () => {
            // Calculate the current progress of the video (between 0 and 1)
            let duration = productVideo.duration
			let val = productVideo.currentTime/duration
			let rounded = Number(val.toFixed(2))*100;
			
			progressCircle.style.strokeDashoffset = rounded;
			
			
			
			
            
            
        });






		

		function handleControls(){
			
			
				
				if(productVideo.paused){
					
					productVideo.play()
					playIcon.style.opacity="0"
					pauseIcon.style.opacity="1"
					
				}else{
					
					productVideo.pause()
					playIcon.style.opacity="1"
					pauseIcon.style.opacity="0"
				}
			


		}

		controller.addEventListener("click",handleControls)

		gsap.to(controller,{opacity:0,duration:0.3,scrollTrigger:{
			trigger:'.landing-section-two',
			start:'top 30%',
			toggleActions:'play none none reverse',

  
		}
    })
    
    gsap.to(".landing-slide-text",{opacity:1,scrollTrigger:{
			trigger:".landing-hero-bg-video",
			start:"bottom top",
			end:"+=800",
			scrub:true
		}})
    



    
    
initVideoControls('.video-revealer', '.play-icon-revealer', '.pause-icon-revealer','.video-play-pause-revealer','#progress-circle-revealer');

let marquee_Wrapper = document.querySelector(".marquee-wrapper")
let swiper_wrapper = document.querySelector(".landing-swiper-sticky-wrapper") 

let swiperHeight = swiper_wrapper.offsetHeight
let marqueeMargin =  ((window.innerHeight - swiperHeight)/2) - 20
console.log(marqueeMargin)
marquee_Wrapper.style.marginTop = `${-marqueeMargin}px`

