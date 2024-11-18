// script.js

document.addEventListener("DOMContentLoaded", () => {
    const uploadForm = document.getElementById("uploadForm");
    const videoList = document.getElementById("videoList");

    // Function to add video to the gallery
    const addVideo = (title, url) => {
        const videoItem = document.createElement("div");
        videoItem.classList.add("video-item");
        videoItem.innerHTML = `
            <h3>${title}</h3>
            <video src="${url}" controls class="video-preview"></video>
            <div class="controls">
                <span class="views">Views: 0</span>
                <button class="speedUpBtn">Speed Up</button>
                <button class="qualityToggleBtn">Toggle Quality</button>
            </div>
        `;

        // Add event listeners for controls
        let views = 0;
        videoItem.querySelector(".video-preview").addEventListener("play", () => {
            views++;
            videoItem.querySelector(".views").textContent = `Views: ${views}`;
        });

        videoItem.querySelector(".speedUpBtn").addEventListener("click", () => {
            const video = videoItem.querySelector(".video-preview");
            video.playbackRate = video.playbackRate === 1 ? 1.5 : 1;
        });

        videoItem.querySelector(".qualityToggleBtn").addEventListener("click", () => {
            alert("Quality settings will be implemented soon!");
        });

        videoList.appendChild(videoItem);
    };

    // Handle form submission
    uploadForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("videoTitle").value;
        const file = document.getElementById("videoFile").files[0];
        
        if (file) {
            const videoURL = URL.createObjectURL(file);
            addVideo(title, videoURL);
        }
    });
});
