let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');
let track_released = document.querySelector('.track-released');


let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');
let download_btn = document.querySelector('.download-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let isRepeat = 0; // 0: off, 1: repeat all, 2: repeat one
let updateTimer;
let playlistContainer = document.getElementById('playlist-container');
let playlistSongs = document.getElementById('playlist-songs');


totalMusic = document.querySelector(".total-music-list");

// Initialize the volume slider CSS variable
document.documentElement.style.setProperty('--volume-before-width', '99%');

// Music loading state
let musicLoaded = false;
let musicLoadPromise = new Promise((resolve) => {
    if (typeof music_list !== 'undefined') {
        musicLoaded = true;
        resolve();
    } else {
        const checkMusic = setInterval(() => {
            if (typeof music_list !== 'undefined') {
                musicLoaded = true;
                clearInterval(checkMusic);
                resolve();
            }
        }, 100);
    }
});

// Load the first track after music is available
musicLoadPromise.then(() => {
    loadTrack(track_index);
    populateArtistFilter();
    initPlaylist();
});

// Add event listener for track end to handle repeat functionality
curr_track.addEventListener('ended', function() {
    if (isRepeat === 2) { // Repeat one
        curr_track.currentTime = 0;
        playTrack();
    } else if (isRepeat === 1) { // Repeat all
        nextTrack();
    } else if (isRandom) { // Random mode
        nextTrack();
    } else { // Normal mode - stop at end of playlist
        if (track_index < music_list.length - 1) {
            nextTrack();
        } else {
            pauseTrack();
        }
    }
});

// Function to toggle keyboard shortcuts tooltip
function toggleShortcutsTooltip() {
    const tooltip = document.querySelector('.shortcuts-tooltip');
    tooltip.classList.toggle('show');
    
    // Close tooltip when clicking outside
    if (tooltip.classList.contains('show')) {
        setTimeout(() => {
            document.addEventListener('click', closeTooltipOnClickOutside);
        }, 10);
    } else {
        document.removeEventListener('click', closeTooltipOnClickOutside);
    }
}

// Function to close tooltip when clicking outside
function closeTooltipOnClickOutside(event) {
    const tooltip = document.querySelector('.shortcuts-tooltip');
    const button = document.querySelector('.shortcuts-button');
    
    if (!tooltip.contains(event.target) && !button.contains(event.target)) {
        tooltip.classList.remove('show');
        document.removeEventListener('click', closeTooltipOnClickOutside);
    }
}

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const themeCheckbox = document.getElementById('theme-checkbox');
    
    if (themeCheckbox.checked) {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme on page load
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeCheckbox = document.getElementById('theme-checkbox');
    
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeCheckbox.checked = true;
    } else {
        themeCheckbox.checked = false;
    }
    
    // Add event listener to checkbox
    themeCheckbox.addEventListener('change', toggleTheme);
}

// Add keyboard shortcuts for playback control
document.addEventListener('keydown', function(event) {
    // Space bar - Play/Pause
    if (event.code === 'Space' && document.activeElement.tagName !== 'INPUT') {
        event.preventDefault();
        playpauseTrack();
    }
    // Right arrow - Next track
    else if (event.code === 'ArrowRight' && document.activeElement.tagName !== 'INPUT') {
        nextTrack();
    }
    // Left arrow - Previous track
    else if (event.code === 'ArrowLeft' && document.activeElement.tagName !== 'INPUT') {
        prevTrack();
    }
    // Up arrow - Volume up
    else if (event.code === 'ArrowUp' && document.activeElement.tagName !== 'INPUT') {
        event.preventDefault();
        let currentVolume = volume_slider.value / 100;
        let newVolume = Math.min(1, currentVolume + 0.1);
        volume_slider.value = newVolume * 100;
        setVolume();
    }
    // Down arrow - Volume down
    else if (event.code === 'ArrowDown' && document.activeElement.tagName !== 'INPUT') {
        event.preventDefault();
        let currentVolume = volume_slider.value / 100;
        let newVolume = Math.max(0, currentVolume - 0.1);
        volume_slider.value = newVolume * 100;
        setVolume();
    }
    // M key - Mute/Unmute
    else if (event.code === 'KeyM' && document.activeElement.tagName !== 'INPUT') {
        if (volume_slider.value > 0) {
            volume_slider.dataset.lastVolume = volume_slider.value;
            volume_slider.value = 0;
        } else {
            volume_slider.value = volume_slider.dataset.lastVolume || 80;
        }
        setVolume();
    }
    // R key - Toggle repeat
    else if (event.code === 'KeyR' && document.activeElement.tagName !== 'INPUT') {
        repeatTrack();
    }
    // S key - Toggle shuffle
    else if (event.code === 'KeyS' && document.activeElement.tagName !== 'INPUT') {
        randomTrack();
    }
    // P key - Toggle playlist
    else if (event.code === 'KeyP' && document.activeElement.tagName !== 'INPUT') {
        togglePlaylist();
    }
});

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();
    
    // Add loading animation class
    document.querySelector('.wrapper').classList.add('track-loading');

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    track_released.textContent = "Release Date:  " + music_list[track_index].released;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    updateActivePlaylistItem();
    random_bg_color();
    
    // Remove loading animation when track is ready to play
    curr_track.addEventListener('canplay', function() {
        setTimeout(() => {
            document.querySelector('.wrapper').classList.remove('track-loading');
        }, 500); // Short delay for visual effect
    });
    
    notification();
}


function random_bg_color(){
    // Use the track art element directly instead of creating a new image
    // This avoids CORS issues since the image is already loaded in the DOM
    setTimeout(() => {
        try {
            // First, add a class to trigger the transition animation
            document.body.classList.add('bg-transitioning');
            
            // Create a small canvas for color extraction
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Get computed style of track art to extract the background image URL
            const trackArtStyle = getComputedStyle(track_art);
            const backgroundImage = trackArtStyle.backgroundImage;
            
            // If we can't get the background image, use the direct URL from music_list
            if (!backgroundImage || backgroundImage === 'none') {
                extractColorsFromURL(music_list[track_index].img);
                return;
            }
            
            // Extract the URL from the backgroundImage CSS property
            // Format is typically: url("http://example.com/image.jpg")
            const urlMatch = backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
            if (urlMatch && urlMatch[1]) {
                extractColorsFromURL(urlMatch[1]);
            } else {
                // Fallback to the URL from music_list
                extractColorsFromURL(music_list[track_index].img);
            }
        } catch (e) {
            console.error('Error in color extraction:', e);
            fallbackRandomColor();
        }
    }, 300); // Small delay to ensure track art is loaded
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    notification();
}

// Store extracted colors globally for color loop animations
let extractedColors = {
    primary: null,
    secondary: null,
    accent: null
};

function extractColorsFromURL(url) {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
        // Create a canvas to draw the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size to match image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0);
        
        // Get colors from different parts of the image
        const topLeftColor = getAverageColor(ctx, 0, 0, img.width / 3, img.height / 3);
        const centerColor = getAverageColor(ctx, img.width / 3, img.height / 3, img.width / 3, img.height / 3);
        const bottomRightColor = getAverageColor(ctx, img.width * 2/3, img.height * 2/3, img.width / 3, img.height / 3);
        
        // Store extracted colors for animation
        extractedColors.primary = topLeftColor;
        extractedColors.secondary = bottomRightColor;
        extractedColors.accent = centerColor;
        
        // Create a gradient with the extracted colors
        const angle = 'to right';
        const gradient = `linear-gradient(${angle}, ${topLeftColor}, ${bottomRightColor})`;
        
        // Apply the gradient to the body
        document.body.style.background = gradient;
        
        // Remove the transition class after animation completes
        setTimeout(() => {
            document.body.classList.remove('bg-transitioning');
            
            // If music is playing, ensure the playing-music class is applied
            if (isPlaying) {
                document.body.classList.add('playing-music');
            }
        }, 1500);
    };
    
    img.onerror = function() {
        console.error('Error loading image for color extraction');
        fallbackRandomColor();
    };
    
    img.src = url;
}

function getAverageColor(ctx, x, y, width, height) {
    // Get image data from the specified region
    const imageData = ctx.getImageData(x, y, width, height);
    const data = imageData.data;
    
    let r = 0, g = 0, b = 0;
    const pixelCount = data.length / 4;
    
    // Sum all RGB values
    for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
    }
    
    // Calculate average
    r = Math.floor(r / pixelCount);
    g = Math.floor(g / pixelCount);
    b = Math.floor(b / pixelCount);
    
    // Add some brightness to ensure colors aren't too dark
    const brightness = 1.2;
    r = Math.min(255, Math.floor(r * brightness));
    g = Math.min(255, Math.floor(g * brightness));
    b = Math.min(255, Math.floor(b * brightness));
    
    return `rgb(${r}, ${g}, ${b})`;
}

function fallbackRandomColor() {
    // Generate random colors for fallback
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    
    function populate(a) {
        for(let i=0; i<6; i++) {
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';
    
    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
    
    // Remove the transition class after animation completes
    setTimeout(() => {
        document.body.classList.remove('bg-transitioning');
    }, 1500);
}

// Color animation variables
let colorLoopInterval;
let colorShiftActive = false;

function startColorLoop() {
    if (colorShiftActive) return; // Already running
    colorShiftActive = true;
    
    // Initial color extraction from current track art
    if (isPlaying) {
        // Add the playing-music class if not already added
        if (!document.body.classList.contains('playing-music')) {
            document.body.classList.add('playing-music');
        }
        
        // Start color shifting if we have extracted colors
        if (extractedColors.primary && extractedColors.secondary) {
            // Clear any existing interval
            if (colorLoopInterval) clearInterval(colorLoopInterval);
            
            // Set up the color loop interval that runs while music is playing
            colorLoopInterval = setInterval(() => {
                if (!isPlaying || !colorShiftActive) {
                    clearInterval(colorLoopInterval);
                    return;
                }
                
                // Apply subtle variations to the background while keeping the main colors
                const currentTime = new Date().getTime() / 1000;
                const pulseValue = Math.sin(currentTime) * 0.2 + 0.8; // Value between 0.6 and 1.0
                
                // Adjust the background-size CSS property for a subtle pulsing effect
                document.body.style.backgroundSize = `${150 + pulseValue * 50}% ${150 + pulseValue * 50}%`;
            }, 100); // Update every 100ms for smooth animation
        }
    }
}

function stopColorLoop() {
    colorShiftActive = false;
    document.body.classList.remove('playing-music');
    
    if (colorLoopInterval) {
        clearInterval(colorLoopInterval);
        colorLoopInterval = null;
    }
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
    notification();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
    notification();
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
    notification();
}
function repeatTrack(){
    const repeatIcon = document.querySelector('.repeat-track i');
    
    // Cycle through repeat modes: 0 (off) -> 1 (repeat all) -> 2 (repeat one) -> 0
    isRepeat = (isRepeat + 1) % 3;
    
    // Update visual state
    repeatIcon.classList.remove('repeatActive', 'repeatOneActive');
    
    switch(isRepeat) {
        case 0: // Off
            repeatIcon.style.color = '';
            repeatIcon.title = 'Repeat: Off';
            break;
        case 1: // Repeat All
            repeatIcon.classList.add('repeatActive');
            repeatIcon.style.color = '#3774ff';
            repeatIcon.title = 'Repeat: All';
            break;
        case 2: // Repeat One
            repeatIcon.classList.add('repeatOneActive');
            repeatIcon.style.color = '#ff6b6b';
            repeatIcon.title = 'Repeat: One';
            break;
    }
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack(); notification();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    document.body.classList.add('playing-music');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    setUpdate();
    startColorLoop();
    updatePlaybackState('playing');
    updatePositionState();
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    document.body.classList.remove('playing-music');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    setUpdate();
    stopColorLoop();
    updatePlaybackState('paused');
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
    notification();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
    notification();
}

function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
    notification();
}
function setVolume(){
    const volumeValue = volume_slider.value;
    curr_track.volume = volumeValue / 100;
    
    // Update the CSS variable for the volume slider animation
    document.documentElement.style.setProperty('--volume-before-width', `${volumeValue}%`);
    
    notification();
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;
        
        // Update the CSS variable for the progress bar animation
        document.documentElement.style.setProperty('--seek-before-width', `${seekPosition}%`);

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
        
        // Update media session position state for Apple devices
        updatePositionState();
    }
    if(isPlaying){
        updateTimer = setTimeout(setUpdate, 1000);
    }
}
// Function to update media session position state
function updatePositionState() {
    if ('mediaSession' in navigator && 'setPositionState' in navigator.mediaSession) {
        try {
            navigator.mediaSession.setPositionState({
                duration: curr_track.duration || 0,
                playbackRate: curr_track.playbackRate || 1,
                position: curr_track.currentTime || 0
            });
        } catch (error) {
            console.log('Error updating position state:', error);
        }
    }
}

// Function to update media session playback state
function updatePlaybackState(state) {
    if ('mediaSession' in navigator) {
        try {
            navigator.mediaSession.playbackState = state;
        } catch (error) {
            console.log('Error updating playback state:', error);
        }
    }
}

function notification(){
    sessionimg = music_list[track_index].img;
if ( 'mediaSession' in navigator ) {
	navigator.mediaSession.metadata = new MediaMetadata({
	  title: track_name.textContent,
		artist: track_artist.textContent,
		album: 'Dope Music',
        
          	artwork: [
                  { src: sessionimg, sizes: '96x96', type: 'image/jpeg' },
                  { src: sessionimg, sizes: '128x128', type: 'image/jpeg' },
                  { src: sessionimg, sizes: '192x192', type: 'image/jpeg' },
                  { src: sessionimg, sizes: '256x256', type: 'image/jpeg' },
                  { src: sessionimg, sizes: '384x384', type: 'image/jpeg' },
                  { src: sessionimg, sizes: '512x512', type: 'image/jpeg' }
          ]
		  
	});
  
	navigator.mediaSession.setActionHandler('pause', () => {
	  pauseTrack();
	});
	navigator.mediaSession.setActionHandler('play', () => {
	  playTrack();
	});
	navigator.mediaSession.setActionHandler('previoustrack', () => {
	  prevTrack();
	});
	navigator.mediaSession.setActionHandler('nexttrack', () => {
	  nextTrack();
	});
	
	// Add seekto handler for better Apple compatibility
	navigator.mediaSession.setActionHandler('seekto', (event) => {
		if (event.seekTime) {
			curr_track.currentTime = event.seekTime;
			updatePositionState();
		}
	});
	
	let defaultSkipTime = 10; /* Time to skip in seconds by default */

	navigator.mediaSession.setActionHandler('seekbackward', function(event) {
  		const skipTime = event.seekOffset || defaultSkipTime;
  		curr_track.currentTime = Math.max(curr_track.currentTime - skipTime, 0);
  		updatePositionState();
	});

	navigator.mediaSession.setActionHandler('seekforward', function(event) {
  		const skipTime = event.seekOffset || defaultSkipTime;
  		curr_track.currentTime = Math.min(curr_track.currentTime + skipTime, curr_track.duration);
  		updatePositionState();
	});

	// Update position state when metadata is set
	updatePositionState();
  }
}




function downloadTrack(){
    open(music_list[track_index].music);
}

// Playlist Functions
let currentSearchQuery = '';
let currentArtistFilter = '';

// Function to populate artist filter dropdown
function populateArtistFilter() {
    const artistSelect = document.getElementById('artist-filter-select');
    if (!artistSelect) return;
    
    // Clear existing options except the first one (All Artists)
    while (artistSelect.options.length > 1) {
        artistSelect.remove(1);
    }
    
    // Get unique artists from music list (case-insensitive)
    const artistMap = {};
    music_list.forEach(song => {
        // Use lowercase as key for case-insensitive comparison
        const artistKey = song.artist.toLowerCase();
        // Store the original case version (first occurrence)
        if (!artistMap[artistKey]) {
            artistMap[artistKey] = song.artist;
        }
    });
    
    // Convert map to array and sort alphabetically
    const artists = Object.values(artistMap).sort();
    
    // Add artist options to select
    artists.forEach(artist => {
        const option = document.createElement('option');
        option.value = artist;
        option.textContent = artist;
        artistSelect.appendChild(option);
    });
}

// Function to filter by artist
function filterByArtist() {
    const artistSelect = document.getElementById('artist-filter-select');
    if (!artistSelect) return;
    
    currentArtistFilter = artistSelect.value;
    initPlaylist(currentSearchQuery, currentArtistFilter);
}

function initPlaylist(searchQuery = '', artistFilter = '') {
    // Update current filters
    currentSearchQuery = searchQuery;
    currentArtistFilter = artistFilter;
    
    // Clear existing content
    playlistSongs.innerHTML = '';
    
    // Filter songs based on search query and artist filter
    let filteredSongs = music_list;
    
    // Apply search query filter if provided
    if (searchQuery) {
        filteredSongs = filteredSongs.filter(song => 
            song.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            song.artist.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    
    // Apply artist filter if provided (case-insensitive)
    if (artistFilter) {
        const artistFilterLower = artistFilter.toLowerCase();
        filteredSongs = filteredSongs.filter(song => 
            song.artist.toLowerCase() === artistFilterLower
        );
    }
    
    // Update song counter
    const songCounter = document.getElementById('song-counter');
    if (songCounter) {
        if ((searchQuery || artistFilter) && filteredSongs.length !== music_list.length) {
            songCounter.textContent = `${filteredSongs.length} of ${music_list.length} songs`;
        } else {
            songCounter.textContent = `${music_list.length} songs`;
        }
    }
    
    // Display message if no songs match the filters
    if (filteredSongs.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'no-search-results';
        noResults.textContent = 'No songs found matching your criteria.';
        playlistSongs.appendChild(noResults);
        return;
    }
    
    // Create playlist items for each filtered song
    filteredSongs.forEach((song, filteredIndex) => {
        // Find the original index in the music_list array
        const originalIndex = music_list.findIndex(s => s.name === song.name && s.artist === song.artist);
        
        const playlistItem = document.createElement('div');
        playlistItem.className = 'playlist-song';
        if (originalIndex === track_index) {
            playlistItem.classList.add('active');
        }
        
        playlistItem.innerHTML = `
            <img src="${song.img}" alt="${song.name}" class="playlist-song-img">
            <div class="playlist-song-info">
                <div class="playlist-song-name">${song.name}</div>
                <div class="playlist-song-artist">${song.artist}</div>
            </div>
        `;
        
        // Add click event to play the song
        playlistItem.addEventListener('click', () => {
            track_index = originalIndex;
            loadTrack(track_index);
            playTrack();
            togglePlaylist();
        });
        
        playlistSongs.appendChild(playlistItem);
    });
}

function togglePlaylist() {
    if (playlistContainer.classList.contains('show')) {
        playlistContainer.classList.remove('show');
    } else {
        playlistContainer.classList.add('show');
        updateActivePlaylistItem();
    }
}

function updateActivePlaylistItem() {
    // Remove active class from all items
    const playlistItems = document.querySelectorAll('.playlist-song');
    playlistItems.forEach((item, index) => {
        if (index === track_index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function searchPlaylist() {
    const searchInput = document.getElementById('playlist-search-input');
    const searchQuery = searchInput.value.trim();
    initPlaylist(searchQuery, currentArtistFilter);
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme
    loadSavedTheme();
    
    // Initialize the playlist
    initPlaylist();
    
    // Populate artist filter dropdown
    populateArtistFilter();
    
    // Add event listener for search input to search as you type
    const searchInput = document.getElementById('playlist-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchQuery = this.value.trim();
            initPlaylist(searchQuery, currentArtistFilter);
        });
        
        // Add event listener for Enter key in search input
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchPlaylist();
            }
        });
    }
    
    // Add event listener for artist filter
    const artistSelect = document.getElementById('artist-filter-select');
    if (artistSelect) {
        artistSelect.addEventListener('change', filterByArtist);
    }
});
