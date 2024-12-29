
document.addEventListener('DOMContentLoaded', function () {

  
  
  function getDeviceType() {
    const width = window.innerWidth;
    if (width <= 767) return 'mobile';
    if (width <= 991) return 'tablet';
    return 'desktop';
  }
  
  
  function updateVideoSource(video) {
    const deviceType = getDeviceType();  
    const videoSrc = video.dataset[`video${deviceType.charAt(0).toUpperCase() + deviceType.slice(1)}`];
    const posterSrc = video.dataset[`poster${deviceType.charAt(0).toUpperCase() + deviceType.slice(1)}`];
    
    
    video.querySelector('source').src = videoSrc;
    video.poster = posterSrc;
    
    const button = video.parentElement.querySelector('[video-playback="button"]');
                button.querySelector('[video-playback="play"]').style.opacity = '0';
                button.querySelector('[video-playback="pause"]').style.opacity = '1';
    
    
    video.load();

  }
  






  document.querySelectorAll('.unique-global-video-class').forEach(function (video) {
    const button = video.parentElement.querySelector('[video-playback="button"]');
    const loader = button.querySelector('#progress-circle');


    updateVideoSource(video);

    video.addEventListener('timeupdate', () => {
        
        let duration = video.duration
        let val = video.currentTime/duration
        let rounded = Number(val.toFixed(2))*100;
        
         loader.style.strokeDashoffset = rounded;
         
        
    });



    button.addEventListener('click', function () {
      if (video.paused) {
        video.play();
        button.querySelector('[video-playback="pause"]').style.opacity="1";
        button.querySelector('[video-playback="play"]').style.opacity="0";
      } else {
        video.pause();
         button.querySelector('[video-playback="play"]').style.opacity="1";
        button.querySelector('[video-playback="pause"]').style.opacity="0";
      }
    });



  });




  
  
 






});
