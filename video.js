// Add background video to home3-banner-section
document.addEventListener("DOMContentLoaded", function() {
  const section = document.querySelector(".home3-banner-section");
  if (section) {
    const video = document.createElement("video");
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsinline = true;
    video.style.position = "absolute";
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.objectFit = "cover";
    video.style.top = "0";
    video.style.left = "0";
    video.style.zIndex = "-1";
    
    const source = document.createElement("source");
    source.src = "videos/ksa/ksafoot.mp4";
    source.type = "video/mp4";
    
    video.appendChild(source);
    section.insertBefore(video, section.firstChild);
  }
}); 