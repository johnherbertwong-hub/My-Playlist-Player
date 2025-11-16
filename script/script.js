const slider = document.getElementById("slider-song");
const audio = document.getElementById("audioPlayer");
const cover = document.getElementById("cover-img");
const base_bg = document.getElementById("base-bg");

const playBtn = document.getElementById("playSong-btn");
const playBtn_display = document.getElementById("playSong-btn-display");

const nextBtn = document.getElementById("nextSong-btn");
const prevBtn = document.getElementById("prevSong-btn");

const currentTimeText = document.getElementById("currentTime-song");
const durationText = document.getElementById("duration-song");

const songTitle = document.getElementById("songTitle") 
const songArtist = document.getElementById("songArtist") 

const playlist = [
    {
        title : "Dead Man",
        artist : "David Kushner", 
        audio_src : "./audio/David Kushner - Dead Man.mp3", 
        cover_src : "./cover/Dead Man.jpeg", 
        gradient_bg : "linear-gradient(180deg, rgb(58, 42, 25), rgb(246, 210, 173))"
    },

    {
        title : "this is what autumn feels like",
        artist : "JVKE", 
        audio_src : "./audio/JVKE - this is what autumn feels like.mp3", 
        cover_src : "./cover/this is what autumn feels like.jpeg", 
        gradient_bg : "linear-gradient(180deg, rgba(233, 126, 18, 1), rgb(105, 57, 10))"
    },

    {
        title : "Skin and Bones",
        artist : "David Kushner", 
        audio_src : "./audio/David Kushner - Skin and Bones.mp3", 
        cover_src : "./cover/Skin and Bones.jpeg", 
        gradient_bg : "linear-gradient(180deg, rgba(13, 50, 4, 1), rgba(2, 4, 2, 1))"
    }
]

let songIndex = 0

function updatePlayBtn() {
    if (audio.paused) {
        audio.play();
        playBtn_display.className = "fa-solid fa-pause";
        playBtn.style.paddingLeft = "0px";
        
    } else {
        audio.pause();
        playBtn_display.className = "fa-solid fa-play";
        playBtn.style.paddingLeft = "5px";
    }
};

function updateSong(index) {
    audio.src = playlist[index]["audio_src"];
    cover.src = playlist[index]["cover_src"];

    base_bg.style.backgroundImage = playlist[index]["gradient_bg"];

    if (playlist[index]["title"].length >= 19) {
        songTitle.style.fontSize = "28px";
    } else {
        songTitle.style.fontSize = "36px";
    }
    songTitle.innerHTML = playlist[index]["title"];
    songArtist.innerHTML = playlist[index]["artist"];

    audio.load();
    audio.play();

    updatePlayBtn();
}

nextBtn.addEventListener("click", () => {

    if (songIndex !== (playlist.length - 1)) {
        songIndex += 1
    }
    updateSong(songIndex);

});

prevBtn.addEventListener("click", () => {

    if (songIndex !== 0) {
        songIndex -= 1
    }
    updateSong(songIndex);

});

playBtn.addEventListener("click", updatePlayBtn);

audio.addEventListener("loadedmetadata", () => {
    durationText.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    if (!slider.dragging) {
        const progress = (audio.currentTime / audio.duration) * 100;
        slider.value = progress
        slider.style.backgroundSize = `${progress}% 100%`;
    }
    currentTimeText.textContent = formatTime(audio.currentTime);

    if (audio.currentTime === audio.duration) {
        songIndex += 1;
        updateSong(songIndex);
    }
    
});

slider.addEventListener("input", () => {
    slider.dragging = true;

    const value = slider.value;
    slider.style.backgroundSize = `${value}% 100%`;
});

slider.addEventListener("change", () => {
    audio.currentTime = (slider.value / 100) * audio.duration;
    slider.dragging = false;
});

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}