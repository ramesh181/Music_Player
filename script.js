  
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationTimeEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music 
const songs = [
    {
        name:'track_1',
        displayName: 'Chinni Chinni AAsa',
        artist: 'A.R.Rehman',
    },
    {
        name:'track_2',
        displayName: 'Snehithudaa',
        artist: 'A.R.Rehman',
    },
    {
        name:'track_3',
        displayName: 'Nagamani Nagamani',
        artist: 'A.R.Rehman',
    },
    {
        name:'track_4',
        displayName: 'Seven Nation Army',
        artist: 'Jacob Creation',
    },
    {
        name:'track_5',
        displayName: 'Reggae Fusion',
        artist: 'Jacob Creation',
    },
    {
        name:'track_6',
        displayName: 'Front Row',
        artist: 'Jacob Creation',
    },
    {
        name:'track_7',
        displayName: 'Goodnight',
        artist: 'Jacob Creation',
    },
    {
        name:'track_8',
        displayName: 'Alalaipongeraa',
        artist: 'A.R.Rehman',
    },
    {
        name:'track_9',
        displayName: 'Kailove Chedugudu',
        artist: 'A.R.Rehman',
    },
    {
        name:'track_10',
        displayName: 'Septembermasam',
        artist: 'A.R.Rehman',
    },
    {
        name:'track_11',
        displayName: 'Naa Cheli Roja',
        artist: 'A.R.Rehman',
    },
    {
        name:'track_12',
        displayName: 'Yede Yedede',
        artist: 'A.R.Rehman',
    }
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
    music.volume = 0.2;
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play');
    music.pause();
}
// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}
// Current Song
let songIndex = 0;

// prev Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}
// Next Song

function nextSong() {
    songIndex++;
    if (songIndex > songs.length-1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration ) *100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }
        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationTimeEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
}
}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}


// Event Listeners

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);