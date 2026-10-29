let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let songImg = document.getElementById("song-img");
let prevImg = document.getElementById("prev-img");
let nextImg = document.getElementById("next-img");
let songTitle = document.getElementById("song-title");
let songArtist = document.getElementById("song-artist");
let playlistElement = document.getElementById("playlist");
let playerRight = document.querySelector(".player-right");
let themeIcon = document.getElementById("themeIcon");
let shuffleBtn = document.getElementById("shuffleBtn");
let replayBtn = document.getElementById("replayBtn");
let currentTimeEl = document.getElementById("current-time");
let durationEl = document.getElementById("duration");
let artistFilter = document.getElementById("artistFilter");
let playlistSearch = document.getElementById("playlistSearch");

let currentSongIndex = 0;
let isShuffle = false;
let isReplay = false;
let filtered_music_list = [...music_list];

function filterPlaylist() {
    const selectedArtist = artistFilter.value;
    const searchText = playlistSearch.value.toLowerCase().trim();
    
    filtered_music_list = music_list.filter(song => {
        const matchesArtist = selectedArtist === "all" || song.artist === selectedArtist;
        const matchesSearch = song.name.toLowerCase().includes(searchText) || 
                              song.artist.toLowerCase().includes(searchText);
        return matchesArtist && matchesSearch;
    });
    
    currentSongIndex = 0;
    initPlaylist();
    if (filtered_music_list.length > 0) {
        loadSong(currentSongIndex);
    }
    pauseSong();
}

artistFilter.onchange = filterPlaylist;
playlistSearch.oninput = filterPlaylist;

function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min}:${sec}`;
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        themeIcon.classList.replace("fa-moon", "fa-sun");
    } else {
        themeIcon.classList.replace("fa-sun", "fa-moon");
    }
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle("active");
    if (isShuffle && isReplay) {
        isReplay = false;
        replayBtn.classList.remove("active");
    }
}

function toggleReplay() {
    isReplay = !isReplay;
    replayBtn.classList.toggle("active");
    if (isReplay && isShuffle) {
        isShuffle = false;
        shuffleBtn.classList.remove("active");
    }
}

function togglePlaylist() {
    playerRight.classList.toggle("hidden");
}

function loadSong(index, direction = "next") {
    const currentSong = filtered_music_list[index];
    const prevIndex = (index - 1 + filtered_music_list.length) % filtered_music_list.length;
    const nextIndex = (index + 1) % filtered_music_list.length;

    song.src = currentSong.music;
    songTitle.innerText = currentSong.name;
    songArtist.innerText = currentSong.artist;
    songImg.src = currentSong.img;
    prevImg.src = filtered_music_list[prevIndex].img;
    nextImg.src = filtered_music_list[nextIndex].img;

    currentTimeEl.innerText = "0:00";
    durationEl.innerText = "0:00";
    
    // Trigger Animation
    const animationClass = direction === "prev" ? "slide-left" : "slide-right";
    
    songImg.classList.remove("slide-left", "slide-right");
    songTitle.classList.remove("slide-left", "slide-right");
    songArtist.classList.remove("slide-left", "slide-right");
    
    void songImg.offsetWidth; // Trigger reflow
    
    songImg.classList.add(animationClass);
    songTitle.classList.add(animationClass);
    songArtist.classList.add(animationClass);
    
    // Remove animation class after it finishes so it doesn't conflict with rotation
    setTimeout(() => {
        songImg.classList.remove(animationClass);
        songTitle.classList.remove(animationClass);
        songArtist.classList.remove(animationClass);
    }, 600);
    
    // Update active class in playlist
    const playlistItems = document.querySelectorAll("#playlist li");
    playlistItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add("active");
            // Scroll into view if not visible
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            item.classList.remove("active");
        }
    });

    // Media Session API
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: currentSong.name,
            artist: currentSong.artist,
            album: currentSong.album || 'Unknown Album',
            artwork: [
                { src: currentSong.img, sizes: '96x96', type: 'image/png' },
                { src: currentSong.img, sizes: '128x128', type: 'image/png' },
                { src: currentSong.img, sizes: '192x192', type: 'image/png' },
                { src: currentSong.img, sizes: '256x256', type: 'image/png' },
                { src: currentSong.img, sizes: '384x384', type: 'image/png' },
                { src: currentSong.img, sizes: '512x512', type: 'image/png' },
            ]
        });

        navigator.mediaSession.setActionHandler('play', playSong);
        navigator.mediaSession.setActionHandler('pause', pauseSong);
        navigator.mediaSession.setActionHandler('previoustrack', prevSong);
        navigator.mediaSession.setActionHandler('nexttrack', nextSong);
        navigator.mediaSession.setActionHandler('seekto', (details) => {
            if (details.seekTime) {
                song.currentTime = details.seekTime;
                progress.value = song.currentTime;
            }
        });
    }
}

function initPlaylist() {
    playlistElement.innerHTML = "";
    filtered_music_list.forEach((s, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${s.img}" alt="${s.name}">
            <div class="song-details">
                <span>${s.name}</span>
                <span>${s.artist}</span>
            </div>
        `;
        li.onclick = () => {
            const direction = index > currentSongIndex ? "next" : "prev";
            currentSongIndex = index;
            loadSong(currentSongIndex, direction);
            playSong();
        };
        playlistElement.appendChild(li);
    });
}

function initArtistFilter() {
    const artists = [...new Set(music_list.map(song => song.artist))].sort();
    artists.forEach(artist => {
        const option = document.createElement("option");
        option.value = artist;
        option.textContent = artist;
        artistFilter.appendChild(option);
    });
}

song.onloadedmetadata = function() {
    progress.max = song.duration;
    progress.value = song.currentTime;
    durationEl.innerText = formatTime(song.duration);
}

function playPause() {
    if (ctrlIcon.classList.contains("fa-pause")) {
        pauseSong();
    } else {
        playSong();
    }
}

function playSong() {
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
    document.body.classList.add("playing");
    if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'playing';
    }
}

function pauseSong() {
    song.pause();
    ctrlIcon.classList.add("fa-play");
    ctrlIcon.classList.remove("fa-pause");
    document.body.classList.remove("playing");
    if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'paused';
    }
}

setInterval(() => {
    progress.value = song.currentTime;
    currentTimeEl.innerText = formatTime(song.currentTime);
    if ('mediaSession' in navigator && !isNaN(song.duration)) {
        navigator.mediaSession.setPositionState({
            duration: song.duration,
            playbackRate: song.playbackRate,
            position: song.currentTime
        });
    }
}, 500);

progress.onchange = function() {
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
    document.body.classList.add("playing");
    currentTimeEl.innerText = formatTime(song.currentTime);
}

function nextSong() {
    if (isShuffle) {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * filtered_music_list.length);
        } while (newIndex === currentSongIndex && filtered_music_list.length > 1);
        currentSongIndex = newIndex;
    } else {
        currentSongIndex++;
        if (currentSongIndex > filtered_music_list.length - 1) {
            currentSongIndex = 0;
        }
    }
    loadSong(currentSongIndex, "next");
    playSong();
}

function prevSong() {
    if (isShuffle) {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * filtered_music_list.length);
        } while (newIndex === currentSongIndex && filtered_music_list.length > 1);
        currentSongIndex = newIndex;
    } else {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = filtered_music_list.length - 1;
        }
    }
    loadSong(currentSongIndex, "prev");
    playSong();
}

// Initial load
initArtistFilter();
initPlaylist();
loadSong(currentSongIndex);

// Auto-play next song when current one ends
song.onended = function() {
    if (isReplay) {
        song.currentTime = 0;
        playSong();
    } else {
        nextSong();
    }
};
