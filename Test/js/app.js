const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById('repeat');
const progress = document.getElementById('progress');
const cover = document.getElementById('cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const album = document.getElementById('album');
const release = document.getElementById('release');
const currentTimeSpan = document.getElementById('currentTime');
const durationSpan = document.getElementById('duration');

const playlistUl = document.getElementById('playlist');

let musicIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

const HISTORY_MAX_SIZE = 10; // Max number of songs in history
let playHistory = []; // Stores the history of played songs

// Functions
function loadMusic(music) {
    cover.style.opacity = '0'; // Fade out current image
    setTimeout(() => {
        cover.src = music.img;
        title.textContent = music.name;
        artist.textContent = music.artist;
        audio.src = music.music;
        document.body.style.setProperty('--bg-image', `url(${music.img})`);
        highlightPlayingSong();

        // Add to play history
        const existingIndex = playHistory.findIndex(item => item === music);
        if (existingIndex !== -1) {
            playHistory.splice(existingIndex, 1); // Remove if already in history
        }
        playHistory.unshift(music); // Add to the beginning
        if (playHistory.length > HISTORY_MAX_SIZE) {
            playHistory.pop(); // Remove oldest if history exceeds size limit
        }
        renderPlayHistory(); // Update history UI

        cover.style.opacity = '1'; // Fade in new image
        playMusic(); // Start playing after new music is loaded
    }, 300); // Match CSS transition duration
}

function playMusic() {
    isPlaying = true;
    playBtn.querySelector('i').classList.remove('fa-play');
    playBtn.querySelector('i').classList.add('fa-pause');
    audio.play();
    cover.classList.add('playing'); // Add playing class
}

function pauseMusic() {
    isPlaying = false;
    playBtn.querySelector('i').classList.remove('fa-pause');
    playBtn.querySelector('i').classList.add('fa-play');
    audio.pause();
    cover.classList.remove('playing'); // Remove playing class
}

function nextMusic() {
    if (currentFilteredMusicList.length === 0) return; // No songs to play

    const currentSongInFilteredList = music_list[musicIndex];
    let currentIndexInFilteredList = currentFilteredMusicList.findIndex(music => music === currentSongInFilteredList);

    if (isRepeat) {
        // If repeat is on, just replay the current song
        loadMusic(music_list[musicIndex]);
        return;
    }

    if (isShuffle) {
        let randIndex;
        do {
            randIndex = Math.floor(Math.random() * currentFilteredMusicList.length);
        } while (randIndex === currentIndexInFilteredList && currentFilteredMusicList.length > 1);
        musicIndex = music_list.indexOf(currentFilteredMusicList[randIndex]);
    } else {
        currentIndexInFilteredList++;
        if (currentIndexInFilteredList >= currentFilteredMusicList.length) {
            currentIndexInFilteredList = 0; // Loop back to the start of the filtered list
        }
        musicIndex = music_list.indexOf(currentFilteredMusicList[currentIndexInFilteredList]);
    }

    loadMusic(music_list[musicIndex]);
}

function prevMusic() {
    if (currentFilteredMusicList.length === 0) return; // No songs to play

    const currentSongInFilteredList = music_list[musicIndex];
    let currentIndexInFilteredList = currentFilteredMusicList.findIndex(music => music === currentSongInFilteredList);

    if (isShuffle) {
        let randIndex;
        do {
            randIndex = Math.floor(Math.random() * currentFilteredMusicList.length);
        } while (randIndex === currentIndexInFilteredList && currentFilteredMusicList.length > 1);
        musicIndex = music_list.indexOf(currentFilteredMusicList[randIndex]);
    } else {
        currentIndexInFilteredList--;
        if (currentIndexInFilteredList < 0) {
            currentIndexInFilteredList = currentFilteredMusicList.length - 1; // Loop back to the end of the filtered list
        }
        musicIndex = music_list.indexOf(currentFilteredMusicList[currentIndexInFilteredList]);
    }

    loadMusic(music_list[musicIndex]);
}

// Event Listeners
playBtn.addEventListener('click', () => {
    isPlaying ? pauseMusic() : playMusic();
});

prevBtn.addEventListener('click', prevMusic);
nextBtn.addEventListener('click', nextMusic);

shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active', isShuffle);
    if (isShuffle) {
        isRepeat = false;
        repeatBtn.classList.remove('active');
    }
});

repeatBtn.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('active', isRepeat);
    if (isRepeat) {
        isShuffle = false;
        shuffleBtn.classList.remove('active');
    }
});

loadMusic(music_list[musicIndex]);
renderPlaylist(music_list);

function renderPlaylist(musicArray) {
    playlistUl.innerHTML = '';
    musicArray.forEach((music) => {
        const li = document.createElement('li');
        li.setAttribute('data-index', music_list.indexOf(music)); // Use original index for playback
        li.innerHTML = `
            <img src="${music.img}" alt="Cover">
            <div>
                <h4>${music.name}</h4>
                <small>${music.artist}</small>
            </div>
        `;
        li.addEventListener('click', () => {
            musicIndex = music_list.indexOf(music);
            loadMusic(music_list[musicIndex]);
            playMusic();
        });
        playlistUl.appendChild(li);
    });
    highlightPlayingSong();
}

const playHistoryListUl = document.getElementById('playHistoryList');

function renderPlayHistory() {
    playHistoryListUl.innerHTML = '';
    playHistory.forEach((music) => {
        const li = document.createElement('li');
        li.setAttribute('data-index', music_list.indexOf(music));
        li.innerHTML = `
            <img src="${music.img}" alt="Cover">
            <div>
                <h4>${music.name}</h4>
                <small>${music.artist}</small>
            </div>
        `;
        li.addEventListener('click', () => {
            musicIndex = music_list.indexOf(music);
            loadMusic(music_list[musicIndex]);
            playMusic();
        });
        playHistoryListUl.appendChild(li);
    });
    // No highlight for history items usually, but can be added if needed
}

function highlightPlayingSong() {
    const allPlaylistItems = playlistUl.querySelectorAll('li');
    allPlaylistItems.forEach(item => {
        item.classList.remove('active');
    });
    const playingSongItem = playlistUl.querySelector(`[data-index="${musicIndex}"]`);
    if (playingSongItem) {
        playingSongItem.classList.add('active');
        playingSongItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); // Scroll to the active song
    }
}

audio.addEventListener('ended', nextMusic);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', setDuration);
progress.addEventListener('change', changeProgress);

function updateProgress() {
    const { currentTime, duration } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.value = progressPercent;

    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }
    currentTimeSpan.textContent = `${currentMinutes}:${currentSeconds}`;
}

function setDuration() {
    const { duration } = audio;
    let totalMinutes = Math.floor(duration / 60);
    let totalSeconds = Math.floor(duration % 60);
    if (totalSeconds < 10) {
        totalSeconds = `0${totalSeconds}`;
    }
    durationSpan.textContent = `${totalMinutes}:${totalSeconds}`;
}

function changeProgress() {
    const duration = audio.duration;
    audio.currentTime = (progress.value * duration) / 100;
}



const searchInput = document.getElementById('search');
searchInput.addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredMusic = music_list.filter(music => {
        return music.name.toLowerCase().includes(searchTerm) ||
               music.artist.toLowerCase().includes(searchTerm) ||
               music.album.toLowerCase().includes(searchTerm);
    });
    renderPlaylist(filteredMusic);
});

const sortSelect = document.getElementById('sort-by');
const artistFilterDiv = document.querySelector('.artist-filter');
const filterArtistSelect = document.getElementById('filter-artist');

let currentFilteredMusicList = [...music_list]; // Initialize with full list

// Populate artist filter dropdown
function populateArtistFilter() {
    const artists = [...new Set(music_list.map(music => music.artist))].sort();
    filterArtistSelect.innerHTML = '<option value="all">All Artists</option>'; // Reset
    artists.forEach(artist => {
        const option = document.createElement('option');
        option.value = artist;
        option.textContent = artist;
        filterArtistSelect.appendChild(option);
    });
}

populateArtistFilter(); // Call on load

function applyFiltersAndSort() {
    let filtered = [...music_list];

    // Apply artist filter
    const selectedArtist = filterArtistSelect.value;
    if (selectedArtist !== 'all') {
        filtered = filtered.filter(music => music.artist === selectedArtist);
    }

    // Apply sort
    const sortBy = sortSelect.value;
    if (sortBy === 'artist') {
        filtered.sort((a, b) => a.artist.localeCompare(b.artist));
    } else if (sortBy === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    // If sort is 'default', no extra sort needed

    currentFilteredMusicList = filtered; // Update the global filtered list
    renderPlaylist(currentFilteredMusicList); // Re-render the playlist with the filtered/sorted list
    
    // If the currently playing song is not in the filtered list, load the first song of the filtered list
    if (currentFilteredMusicList.length > 0 && !currentFilteredMusicList.some(music => music_list[musicIndex] === music)) {
        musicIndex = music_list.indexOf(currentFilteredMusicList[0]);
        loadMusic(music_list[musicIndex]);
        if (isPlaying) {
            playMusic(); // Continue playing if it was playing
        } else {
            pauseMusic(); // Stay paused if it was paused
        }
    } else if (currentFilteredMusicList.length === 0) {
        // Handle case where no songs match the filter
        pauseMusic();
        // Optionally display a message to the user
    }

}

sortSelect.addEventListener('change', (e) => {
    const sortBy = e.target.value;
    if (sortBy === 'artist') {
        artistFilterDiv.style.display = 'block';
        applyFiltersAndSort(); // Apply filters and sort when changing sort option
    } else {
        artistFilterDiv.style.display = 'none';
        filterArtistSelect.value = 'all'; // Reset artist filter
        applyFiltersAndSort(); // Apply filters and sort when changing sort option
    }
});

filterArtistSelect.addEventListener('change', applyFiltersAndSort);

const mobileCover = document.getElementById('mobileCover');
const mobileTitle = document.getElementById('mobileTitle');
const mobileArtist = document.getElementById('mobileArtist');
const mobilePlayBtn = document.getElementById('mobilePlay');

function updateMobilePlayer() {
    mobileCover.src = cover.src;
    mobileTitle.textContent = title.textContent;
    mobileArtist.textContent = artist.textContent;
    if (isPlaying) {
        mobilePlayBtn.querySelector('i').classList.remove('fa-play');
        mobilePlayBtn.querySelector('i').classList.add('fa-pause');
    } else {
        mobilePlayBtn.querySelector('i').classList.remove('fa-pause');
        mobilePlayBtn.querySelector('i').classList.add('fa-play');
    }
}

mobilePlayBtn.addEventListener('click', () => {
    isPlaying ? pauseMusic() : playMusic();
});

// Call updateMobilePlayer whenever music loads or play/pause state changes
const originalLoadMusic = loadMusic;
loadMusic = (music) => {
    originalLoadMusic(music);
    updateMobilePlayer();
    updateMediaSession(); // Call here when a new song loads
};

const originalPlayMusic = playMusic;
playMusic = () => {
    originalPlayMusic();
    updateMobilePlayer();
    updateMediaSession(); // Call here when music starts playing
};

const originalPauseMusic = pauseMusic;
pauseMusic = () => {
    originalPauseMusic();
    updateMobilePlayer();
    updateMediaSession();
};

const playlistToggleBtn = document.getElementById('playlistToggleBtn');
const sidebar = document.querySelector('.container');

const playlistTab = document.getElementById('playlistTab');
const historyTab = document.getElementById('historyTab');

playlistTab.addEventListener('click', () => {
    playlistTab.classList.add('active');
    historyTab.classList.remove('active');
    playlistUl.style.display = 'block';
    playHistoryListUl.style.display = 'none';
});

historyTab.addEventListener('click', () => {
    historyTab.classList.add('active');
    playlistTab.classList.remove('active');
    playlistUl.style.display = 'none';
    playHistoryListUl.style.display = 'block';
});

playlistToggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('show');
});


// Media Session API
function updateMediaSession() {
    if ('mediaSession' in navigator) {
        const currentMusic = music_list[musicIndex];
        navigator.mediaSession.metadata = new MediaMetadata({
            title: currentMusic.name,
            artist: currentMusic.artist,
            album: currentMusic.album,
            artwork: [
                { src: currentMusic.img, sizes: '96x96', type: 'image/jpeg' },
                { src: currentMusic.img, sizes: '128x128', type: 'image/jpeg' },
                { src: currentMusic.img, sizes: '192x192', type: 'image/jpeg' },
                { src: currentMusic.img, sizes: '256x256', type: 'image/jpeg' },
                { src: currentMusic.img, sizes: '384x384', type: 'image/jpeg' },
                { src: currentMusic.img, sizes: '512x512', type: 'image/jpeg' },
            ]
        });

        navigator.mediaSession.setActionHandler('play', () => { playMusic(); });
        navigator.mediaSession.setActionHandler('pause', () => { pauseMusic(); });
        navigator.mediaSession.setActionHandler('nexttrack', () => { nextMusic(); });
        navigator.mediaSession.setActionHandler('previoustrack', () => { prevMusic(); });
    }
}