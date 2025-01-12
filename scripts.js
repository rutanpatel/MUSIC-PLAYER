const songs = [
    { 
        songName: "Kissik", 
        url: "./songs/128-Kissik - Pushpa 2 The Rule 128 Kbps.mp3", 
        img: "./images/image.png", 
        time: "4:01" 
    },
    { 
        songName: "Bhool Bhulaiyaa 3 - Title Track", 
        url: "./songs/128-Bhool Bhulaiyaa 3 - Title Track (Feat. Pitbull) - Bhool Bhulaiyaa 3 128 Kbps.mp3", 
        img: "./images/image copy.png", 
        time: "5:00" 
    },
    { 
        songName: "Hauli Hauli", 
        url: "./songs/128-Hauli Hauli - Khel Khel Mein 128 Kbps.mp3", 
        img: "./images/image copy 2.png", 
        time: "3:47" 
    },
    { 
        songName: "Mere Mehboob", 
        url: "./songs/128-Mere Mehboob Mere Sanam - Bad Newz 128 Kbps.mp3", 
        img: "./images/image copy 3.png", 
        time: "2:59" 
    },
    { 
        songName: "Romantic Song", 
        url: "./songs/romantic-240213.mp3", 
        img: "./images/image romantic.png", 
        time: "3:02" 
    },
    { 
        songName: "Dil Se Door", 
        url: "./songs/dil-se-door-nahi-hindi-song-hindi-song-238290.mp3", 
        img: "./images/image 3.png", 
        time: "5:02" 
    },
    { 
        songName: "Kissik", 
        url: "./songs/128-Kissik - Pushpa 2 The Rule 128 Kbps.mp3", 
        img: "./images/image.png", 
        time: "4:01" 
    },
    { 
        songName: "Bhool Bhulaiyaa 3 - Title Track", 
        url: "./songs/128-Bhool Bhulaiyaa 3 - Title Track (Feat. Pitbull) - Bhool Bhulaiyaa 3 128 Kbps.mp3", 
        img: "./images/image copy.png", 
        time: "5:00" 
    },
    { 
        songName: "Hauli Hauli", 
        url: "./songs/128-Hauli Hauli - Khel Khel Mein 128 Kbps.mp3", 
        img: "./images/image copy 2.png", 
        time: "3:47" 
    },
    { 
        songName: "Mere Mehboob", 
        url: "./songs/128-Mere Mehboob Mere Sanam - Bad Newz 128 Kbps.mp3", 
        img: "./images/image copy 3.png", 
        time: "2:59" 
    },
    { 
        songName: "Romantic Song", 
        url: "./songs/romantic-240213.mp3", 
        img: "./images/image romantic.png", 
        time: "3:02" 
    },
    { 
        songName: "Dil Se Door", 
        url: "./songs/dil-se-door-nahi-hindi-song-hindi-song-238290.mp3", 
        img: "./images/image 3.png", 
        time: "5:02" 
    },
];

const allSongsContainer = document.querySelector("#all-songs");
const audio = new Audio();
let currentSongIndex = 0;

const playButton = document.querySelector("#play");
const backButton = document.querySelector("#back");
const forwardButton = document.querySelector("#forward");
const progressBar = document.querySelector(".progress");
const progressBarContainer = document.querySelector(".progress-bar");

const currentSongName = document.querySelector("#current-song-name");
const currentSongImage = document.querySelector("#current-song-image");
const currentTimeDisplay = document.querySelector("#current-time");

// Format seconds into MM:SS format
const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
};

// Update progress bar and time
const updateProgressBar = () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    currentTimeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
};

// Populate song list dynamically
const renderSongs = () => {
    allSongsContainer.innerHTML = songs
        .map(
            (song, index) => `
        <div class="song-card ${index === currentSongIndex ? "active" : ""}" data-index="${index}">
            <img src="${song.img}" alt="${song.songName}" />
            <div>
                <h4>${song.songName}</h4>
                <p>${song.time}</p>
            </div>
        </div>
    `
        )
        .join("");
};

// Load and play a song
const loadSong = (index) => {
    currentSongIndex = index;
    const song = songs[currentSongIndex];
    audio.src = song.url;
    currentSongName.textContent = song.songName;
    currentSongImage.src = song.img;
    renderSongs();
};

// Play the current song
const playSong = () => {
    playButton.innerHTML = `<i class="ri-pause-fill"></i>`;
    audio.play();
};

// Pause the current song
const pauseSong = () => {
    playButton.innerHTML = `<i class="ri-play-fill"></i>`;
    audio.pause();
};

// Event listeners
playButton.addEventListener("click", () => {
    audio.paused ? playSong() : pauseSong();
});

forwardButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
});

backButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
});

progressBarContainer.addEventListener("click", (e) => {
    const clickX = e.offsetX;
    const width = progressBarContainer.offsetWidth;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

// Handle song card click
allSongsContainer.addEventListener("click", (e) => {
    const songCard = e.target.closest(".song-card");
    if (songCard) {
        const index = parseInt(songCard.dataset.index, 10);
        loadSong(index);
        playSong();
    }
});

// Automatically play the next song when current song ends
audio.addEventListener("ended", () => {
    forwardButton.click();
});

// Update progress bar as song plays
audio.addEventListener("timeupdate", updateProgressBar);

// Initial render
loadSong(currentSongIndex);
renderSongs();
