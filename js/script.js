const initslider = ()=> {
      const slideButtons = document.querySelectorAll(".slider-wrapper .btn");
      const videoList = document.querySelector(".slider-wrapper .video-list");
      const scrollBarWidth = document.querySelector(".container .scrollbar");
      const scrollBarThumbWidth = document.querySelector(".scrollbar-thumb")
      const maxScrollLeft = videoList.scrollWidth - videoList.clientWidth;

      scrollBarThumbWidth.addEventListener("mousedown", (e) => {

            const startX = e.clientX;
            const deltaThumbPosition = scrollBarThumbWidth.offsetLeft;

            const handleMouseMove = (e) => {
                  const deltaX = e.clientX - startX;
                  const newdeltaThumbPosition = deltaThumbPosition + deltaX;
                  const maxThumbPosition = scrollBarWidth.getBoundingClientRect().width - scrollBarThumbWidth.offsetWidth;
                  const boundedPosition = Math.max(0, Math.min(maxThumbPosition,newdeltaThumbPosition ))
                  scrollBarThumbWidth.style.left = `${boundedPosition}px`;
                  const scrollPosition = (boundedPosition/maxThumbPosition)*maxScrollLeft;
                  videoList.scrollLeft = scrollPosition;


            }

            const handleMouseUp = () => {
                   document.removeEventListener("mousemove", handleMouseMove);
                   document.removeEventListener("mouseup", handleMouseUp);
            }
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
      })


      slideButtons.forEach(button => {
            button.addEventListener("click", () => {
                 const direction = button.id==="slide-prev" ? -1 : 1;
                  // direction = button.class==="slide-next" ? 1 : -1;
                 const scrollAmount = videoList.clientWidth*direction;
                 videoList.scrollBy({ left:scrollAmount, behavior:"smooth" });
            })
      })

      const handleSlideButtons = () => {
            slideButtons[0].style.display = videoList.scrollLeft <= 0 ? "none" : "block";
            slideButtons[1].style.display = videoList.scrollLeft >= maxScrollLeft ? "none" : "block";
      }
      const updateScrollThumbPosition = () => {
           const scrollPosition = videoList.scrollLeft;
           const thumbPosition = (scrollPosition/maxScrollLeft)*(scrollBarWidth.clientWidth - scrollBarThumbWidth.offsetWidth)
           scrollBarThumbWidth.style.left = `${thumbPosition}px`
      }
      videoList.addEventListener("scroll", () => {
            handleSlideButtons();
            updateScrollThumbPosition();


            
            

      })

}
window.addEventListener("load", initslider);