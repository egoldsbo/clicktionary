if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}



document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById("gallery");
    const videoPlayer = document.getElementById("videoPlayer");

    fetch('/images')
        .then(response => response.json())
        .then(images => {
            images.forEach(image => {
                const button = document.createElement("button");
                button.style.backgroundImage = `url('media/${image}')`;
                button.className = "gallery-button";
                button.onclick = () => playVideo(image);
                gallery.appendChild(button);
            });
        });

    function playVideo(imageName) {
        const videoSrc = `media/${imageName.split('.')[0]}.mp4`;
        videoPlayer.src = videoSrc;
        videoPlayer.style.display = "block";
        videoPlayer.play();

        videoPlayer.onended = () => {
            videoPlayer.style.display = "none";
        };
    }
});
