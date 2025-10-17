let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name-text');
let track_artist = document.querySelector('.track-artist-text');
let track_released = document.querySelector('.track-released');
let trackArtPreloadLink = null;


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
let currentBandwidth = 'high'; // Default bandwidth setting
let playlistOutsideClickHandlerBound = false;

// Wake Lock variables
let wakeLock = null;


totalMusic = document.querySelector(".total-music-list");

// Initialize the volume slider CSS variable
document.documentElement.style.setProperty('--volume-before-width', '99%');


// Function to change audio bandwidth
function changeBandwidth(quality) {
    // Store the current time and playing state
    const currentTime = curr_track.currentTime;
    const wasPlaying = !curr_track.paused;
    
    // Update the current bandwidth setting
    currentBandwidth = quality;
    
    // Update visual indicators
    updateBandwidthUI();
    
    // Hide the bandwidth selector after selection
    closeBandwidthOptions();
    
    // Get the current track's URL and modify it based on quality
    const currentTrack = music_list[track_index];
    const newUrl = getQualityUrl(currentTrack.music, quality);
    
    // Update the audio source
    curr_track.src = newUrl;
    
    // Load the new audio source
    curr_track.load();
    
    // Restore playback position and state
    curr_track.addEventListener('loadedmetadata', function onLoaded() {
        curr_track.currentTime = currentTime;
        if (wasPlaying) {
            curr_track.play();
        }
        curr_track.removeEventListener('loadedmetadata', onLoaded);
    });
}

// Function to convert URL to different quality versions
function getQualityUrl(url, quality) {
    // Extract the base URL and file name
    const urlParts = url.split('/');
    const fileName = urlParts[urlParts.length - 1];
    
    // Create the new URL based on quality
    let newUrl;
    if (quality === 'high') {
        newUrl = url.replace(/\/data\/\d+\//, '/data/320/');
    } else if (quality === 'medium') {
        newUrl = url.replace(/\/data\/\d+\//, '/data/128/');
    } else if (quality === 'low') {
        newUrl = url.replace(/\/data\/\d+\//, '/data/48/');
    } else {
        // Default to high quality if invalid option
        newUrl = url.replace(/\/data\/\d+\//, '/data/320/');
    }
    
    return newUrl;
}

// Bandwidth selector open/close with outside-click handling
let bandwidthOpen = false;
function openBandwidthOptions() {
    const selector = document.querySelector('.bandwidth-selector');
    const overlay = document.querySelector('.bandwidth-overlay');
    selector.classList.add('show');
    if (overlay) overlay.classList.add('show');
    // Delay attaching to avoid immediate close from the opening click
    setTimeout(() => document.addEventListener('click', closeBandwidthOnClickOutside), 10);
    bandwidthOpen = true;
}

function closeBandwidthOptions() {
    const selector = document.querySelector('.bandwidth-selector');
    const overlay = document.querySelector('.bandwidth-overlay');
    selector.classList.remove('show');
    if (overlay) overlay.classList.remove('show');
    document.removeEventListener('click', closeBandwidthOnClickOutside);
    bandwidthOpen = false;
}

function toggleBandwidthOptions() {
    if (bandwidthOpen) {
        closeBandwidthOptions();
    } else {
        openBandwidthOptions();
    }
}

function closeBandwidthOnClickOutside(e) {
    const selector = document.querySelector('.bandwidth-selector');
    const button = document.querySelector('.bandwidth-button');
    if (!selector.contains(e.target) && !button.contains(e.target)) {
        closeBandwidthOptions();
    }
}

// Function to update the UI to reflect current bandwidth selection
function updateBandwidthUI() {
    // Remove active class from all options
    const options = document.querySelectorAll('.bandwidth-option');
    options.forEach(option => {
        option.classList.remove('active');
    });
    
    // Add active class to selected option
    const selectedOption = document.querySelector(`.bandwidth-option[data-quality="${currentBandwidth}"]`);
    if (selectedOption) {
        selectedOption.classList.add('active');
    }
}

// Load the first track
loadTrack(track_index);

// Initialize bandwidth UI
document.addEventListener('DOMContentLoaded', function() {
    updateBandwidthUI();
});



// Clear cache and reset session state on page load/refresh
window.addEventListener('load', function() {
    // Detect if this navigation is a reload
    const isReload = (() => {
        const navEntries = performance && performance.getEntriesByType ? performance.getEntriesByType('navigation') : [];
        if (navEntries && navEntries.length > 0) {
            return navEntries[0].type === 'reload';
        }
        // Legacy fallback
        return performance && performance.navigation && performance.navigation.type === 1;
    })();

    // Register service worker (supported on modern major browsers)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').then((reg) => {
            // If this is a reload, signal the SW to bypass caches briefly
            if (isReload) {
                const sendReloadSignal = () => {
                    if (navigator.serviceWorker.controller) {
                        navigator.serviceWorker.controller.postMessage({ type: 'reload' });
                    } else if (reg.active) {
                        reg.active.postMessage({ type: 'reload' });
                    }
                };
                // SW may not be immediately active; try once ready
                navigator.serviceWorker.ready.then(() => sendReloadSignal());
                // Also attempt immediately
                sendReloadSignal();
            }
        }).catch((err) => {
            console.log('Service worker registration failed:', err);
        });
    }

    if (isReload) {
        // Clear Cache Storage to remove any stale SW-managed caches
        if ('caches' in window) {
            caches.keys().then((cacheNames) => Promise.all(cacheNames.map((name) => caches.delete(name))));
        }

        // Light-touch session reset while preserving theme preference
        const savedTheme = localStorage.getItem('theme');
        try { sessionStorage.clear(); } catch {}
        if (wakeLock) { releaseWakeLock(); }
        if (updateTimer) { clearInterval(updateTimer); }
        if (savedTheme) { localStorage.setItem('theme', savedTheme); }

        // Force reload of media elements only on reload (avoid extra cost on first load)
        const mediaElements = document.querySelectorAll('audio, video');
        const ts = Date.now();
        mediaElements.forEach((media) => {
            const currentSrc = media.currentSrc || media.src;
            if (currentSrc) {
                const sep = currentSrc.includes('?') ? '&' : '?';
                media.src = currentSrc + sep + 'v=' + ts;
            }
        });

        console.log('Cache cleared for reload and state refreshed');
    }
});

// Add event listener for page visibility changes to handle wake lock
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible' && isPlaying) {
        // Re-request wake lock when page becomes visible and music is playing
        requestWakeLock();
    } else if (document.visibilityState === 'hidden') {
        // Wake lock is automatically released when page becomes hidden
        wakeLock = null;
    }
});

// Add event listener for track end to handle repeat functionality
function nextTrack() {
    if (isRepeat === 2) {
        // Repeat one track
        loadTrack(track_index);
    } else if (isRandom) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * music_list.length);
        } while (randomIndex === track_index && music_list.length > 1);
        track_index = randomIndex;
        loadTrack(track_index);
    } else {
        // Normal or Repeat All
        if (track_index < music_list.length - 1) {
            track_index++;
            loadTrack(track_index);
        } else if (isRepeat === 1) {
            // Repeat all from start
            track_index = 0;
            loadTrack(track_index);
        } else {
            // End of playlist
            pauseTrack();
            return;
        }
    }

    playTrack(); // Start playing the next track
}


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
    const themeIcon = document.getElementById('theme-icon');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        themeIcon.className = 'fa fa-moon-o';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fa fa-sun-o';
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme on page load
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('theme-icon');
    const mediaQuery = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    const prefersDark = mediaQuery && mediaQuery.matches;

    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fa fa-sun-o';
    } else if (savedTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        themeIcon.className = 'fa fa-moon-o';
    } else {
        // No manual override, follow system preference via CSS media query
        document.body.removeAttribute('data-theme');
        themeIcon.className = prefersDark ? 'fa fa-sun-o' : 'fa fa-moon-o';

        // Update icon on system theme changes when in auto mode
        const handleSchemeChange = (e) => {
            if (!localStorage.getItem('theme')) {
                themeIcon.className = e.matches ? 'fa fa-sun-o' : 'fa fa-moon-o';
            }
        };
        if (mediaQuery) {
            if (typeof mediaQuery.addEventListener === 'function') {
                mediaQuery.addEventListener('change', handleSchemeChange);
            } else if (typeof mediaQuery.addListener === 'function') {
                mediaQuery.addListener(handleSchemeChange);
            }
        }
    }
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
    // Escape - Close bandwidth selector if open
    else if (event.code === 'Escape') {
        if (typeof bandwidthOpen !== 'undefined' && bandwidthOpen) {
            closeBandwidthOptions();
        }
    }
});

// Function to request wake lock to prevent device from sleeping
async function requestWakeLock() {
    try {
        if ('wakeLock' in navigator) {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('Wake lock acquired');
            
            // Listen for wake lock release (e.g., when tab becomes inactive)
            wakeLock.addEventListener('release', () => {
                console.log('Wake lock released');
                wakeLock = null;
            });
        }
    } catch (err) {
        console.log('Wake lock request failed:', err);
    }
}

// Function to release wake lock
function releaseWakeLock() {
    if (wakeLock) {
        wakeLock.release();
        wakeLock = null;
        console.log('Wake lock manually released');
    }
}

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();
    
    // Add loading animation class
    document.querySelector('.wrapper').classList.add('track-loading');
    
    // Add transition class for smooth background change
    document.body.classList.add('bg-transitioning');

    // Load new track with current bandwidth setting
    curr_track.preload = 'metadata';
    const trackUrl = getQualityUrl(music_list[track_index].music, currentBandwidth);
    curr_track.src = trackUrl;
    curr_track.load();

    // Preload album art and set background only after image is decoded
    const imgUrl = music_list[track_index].img;
    if (trackArtPreloadLink) {
        try { document.head.removeChild(trackArtPreloadLink); } catch (e) {}
    }
    trackArtPreloadLink = document.createElement('link');
    trackArtPreloadLink.rel = 'preload';
    trackArtPreloadLink.as = 'image';
    trackArtPreloadLink.href = imgUrl;
    trackArtPreloadLink.setAttribute('fetchpriority', 'high');
    document.head.appendChild(trackArtPreloadLink);

    const img = new Image();
    img.decoding = 'async';
    img.src = imgUrl;
    img.onload = () => {
        track_art.style.backgroundImage = `url(${imgUrl})`;
    };
    img.onerror = () => {
        track_art.style.backgroundImage = '';
    };
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    track_released.textContent = "Release Date:  " + music_list[track_index].released;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    // Reset playback position for a clean start on new sessions
    try { curr_track.currentTime = 0; } catch {}

    // Ensure a single end handler to avoid duplicate calls
    curr_track.onended = nextTrack;

    // Update media session position once metadata is available
    curr_track.addEventListener('loadedmetadata', function() {
        updatePositionState();
        updatePlaybackState('paused');
    });

    updateActivePlaylistItem();
    updateSongNavigationPreview();
    
    // Extract colors from album art for background
    if (music_list[track_index].img) {
        extractColorsFromURL(music_list[track_index].img);
    } else {
        random_bg_color();
    }
    
    // Remove loading animation when track is ready to play
    curr_track.addEventListener('canplay', function() {
        setTimeout(() => {
            document.querySelector('.wrapper').classList.remove('track-loading');
        }, 500); // Short delay for visual effect
    });
    
    notification();
}

// Function to format duration from seconds to mm:ss format
function formatDuration(seconds) {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
    
    return formattedMinutes + ":" + formattedSeconds;
}

// Function to update song navigation preview (both previous and next)
function updateSongNavigationPreview() {
    const prevSongArtwork = document.querySelector('.prev-song-artwork');
    const prevSongTitle = document.querySelector('.prev-song-title');
    const prevSongArtist = document.querySelector('.prev-song-artist');
    const prevSongDuration = document.querySelector('.prev-song-duration');
    const nextSongArtwork = document.querySelector('.next-song-artwork');
    const nextSongTitle = document.querySelector('.next-song-title');
    const nextSongArtist = document.querySelector('.next-song-artist');
    const nextSongDuration = document.querySelector('.next-song-duration');
    const songNavigationPreview = document.querySelector('.song-navigation-preview');
    
    let nextIndex, prevIndex;
    
    // Determine next song index based on current mode
    if (isRandom) {
        // For random mode, generate a random next song (excluding current)
        do {
            nextIndex = Math.floor(Math.random() * music_list.length);
        } while (nextIndex === track_index && music_list.length > 1);
    } else {
        // For normal/repeat mode, get next song in sequence
        nextIndex = (track_index + 1) % music_list.length;
    }
    
    // Determine previous song index
    if (isRandom) {
        // For random mode, generate a random previous song (excluding current)
        do {
            prevIndex = Math.floor(Math.random() * music_list.length);
        } while (prevIndex === track_index && music_list.length > 1);
    } else {
        // For normal/repeat mode, get previous song in sequence
        prevIndex = track_index === 0 ? music_list.length - 1 : track_index - 1;
    }
    
    // Show the navigation preview
    songNavigationPreview.style.display = 'flex';
    
    // Update next song section
    if (nextIndex < music_list.length) {
        const nextSong = music_list[nextIndex];
        nextSongArtwork.style.backgroundImage = `url(${nextSong.img})`;
        nextSongTitle.textContent = nextSong.name;
        nextSongArtist.textContent = nextSong.artist;
        
        // Get duration for next song
        const nextAudio = new Audio(nextSong.music);
        nextAudio.preload = 'metadata';
        nextAudio.addEventListener('loadedmetadata', function() {
            nextSongDuration.textContent = formatDuration(nextAudio.duration);
        });
        nextAudio.addEventListener('error', function() {
            nextSongDuration.textContent = "0:00";
        });
    }
    
    // Update previous song section
    if (prevIndex >= 0 && prevIndex < music_list.length) {
        const prevSong = music_list[prevIndex];
        prevSongArtwork.style.backgroundImage = `url(${prevSong.img})`;
        prevSongTitle.textContent = prevSong.name;
        prevSongArtist.textContent = prevSong.artist;
        
        // Get duration for previous song
        const prevAudio = new Audio(prevSong.music);
        prevAudio.preload = 'metadata';
        prevAudio.addEventListener('loadedmetadata', function() {
            prevSongDuration.textContent = formatDuration(prevAudio.duration);
        });
        prevAudio.addEventListener('error', function() {
            prevSongDuration.textContent = "0:00";
        });
    }
    
    // Store indices for direct playback
    window.previewNextIndex = nextIndex;
    window.previewPrevIndex = prevIndex;
    
    // Add click functionality for navigation
    const prevSongSection = document.querySelector('.prev-song-section');
    const nextSongSection = document.querySelector('.next-song-section');
    
    prevSongSection.onclick = () => playPreviewTrack(window.previewPrevIndex);
    nextSongSection.onclick = () => playPreviewTrack(window.previewNextIndex);
}


// Function to play a specific track from preview
function playPreviewTrack(index) {
    if (index >= 0 && index < music_list.length) {
        track_index = index;
        loadTrack(track_index);
        playTrack();
    }
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
    try { curr_track.currentTime = 0; } catch {}
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
        
        // Create a more dynamic gradient with the extracted colors
        const angle = Math.random() > 0.5 ? '135deg' : '45deg';
        const gradient = `linear-gradient(${angle}, ${topLeftColor}, ${centerColor}, ${bottomRightColor})`;
        
        // Apply the gradient to the body with enhanced transition
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
    // Generate random colors for fallback with enhanced visual appeal
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
    let Color3 = populate('#');
    let angle = Math.random() > 0.5 ? '135deg' : '45deg';
    
    let gradient = `linear-gradient(${angle}, ${Color1}, ${Color2}, ${Color3})`;
    document.body.style.background = gradient;
    
    // Remove the transition class after animation completes with longer duration
    setTimeout(() => {
        document.body.classList.remove('bg-transitioning');
    }, 2000);
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
                
                // Create a dynamic pulsing effect that responds to the music
                document.body.style.backgroundSize = `${150 + pulseValue * 50}% ${150 + pulseValue * 50}%`;
                
                // Subtle shift in background position for more dynamic feel
                const shiftX = Math.sin(currentTime * 0.5) * 5;
                const shiftY = Math.cos(currentTime * 0.5) * 5;
                document.body.style.backgroundPosition = `${50 + shiftX}% ${50 + shiftY}%`;
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
    updateSongNavigationPreview();
    notification();
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
    updateSongNavigationPreview();
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
    updateSongNavigationPreview();
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
    
    // Request wake lock when music starts playing
    requestWakeLock();
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
    
    // Release wake lock when music is paused
    releaseWakeLock();
}
function nextTrack(){
    // Check if artist focus mode is active
    if (isArtistFocusMode) {
        const nextArtistTrackIndex = getNextArtistTrack();
        if (nextArtistTrackIndex !== null) {
            track_index = nextArtistTrackIndex;
            loadTrack(track_index);
            playTrack();
            notification();
            return;
        }
    }
    
    if (isRandom) {
        // Use the next song index from the preview container for synchronization
        if (typeof window.previewNextIndex !== 'undefined' && window.previewNextIndex >= 0) {
            track_index = window.previewNextIndex;
        } else {
            // Fallback to random generation if preview index is not available
            let random_index = Number.parseInt(Math.random() * music_list.length);
            track_index = random_index;
        }
    } else {
        // Normal sequential mode
        if(track_index < music_list.length - 1){
            track_index += 1;
        } else {
            track_index = 0;
        }
    }
    loadTrack(track_index);
    playTrack();
    notification();
}
function prevTrack(){
    // Check if artist focus mode is active
    if (isArtistFocusMode) {
        const prevArtistTrackIndex = getPrevArtistTrack();
        if (prevArtistTrackIndex !== null) {
            track_index = prevArtistTrackIndex;
            loadTrack(track_index);
            playTrack();
            notification();
            return;
        }
    }
    
    if (isRandom) {
        // Use the previous song index from the preview container for synchronization
        if (typeof window.previewPrevIndex !== 'undefined' && window.previewPrevIndex >= 0) {
            track_index = window.previewPrevIndex;
        } else {
            // Fallback to random generation if preview index is not available
            let random_index = Number.parseInt(Math.random() * music_list.length);
            track_index = random_index;
        }
    } else {
        // Normal sequential mode
        if(track_index > 0){
            track_index -= 1;
        } else {
            track_index = music_list.length - 1;
        }
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
	// Explicit stop resets position to start for the current track
	navigator.mediaSession.setActionHandler('stop', () => {
	  pauseTrack();
	  try { curr_track.currentTime = 0; } catch {}
	  updatePositionState();
	  updatePlaybackState('paused');
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

// Artist-focused playback state
let isArtistFocusMode = false;
let focusedArtist = '';
let artistFocusedTracks = [];

// Function to normalize artist names for deduplication
function normalizeArtistName(artistName) {
    if (!artistName) return '';
    
    // Convert to lowercase for comparison
    let normalized = artistName.toLowerCase().trim();
    
    // Remove common featuring patterns and everything after them
    const featuringPatterns = [
        /\s+(ft\.?|feat\.?|featuring)\s+.*/i,
        /\s+x\s+.*/i,
        /\s+&\s+.*/i,
        /\s+,\s+.*/i,
        /\s+\(.*(feat|ft).*\).*/i
    ];
    
    for (const pattern of featuringPatterns) {
        normalized = normalized.replace(pattern, '');
    }
    
    // Remove extra whitespace
    normalized = normalized.trim();
    
    return normalized;
}

// Function to get the primary artist name (for display)
function getPrimaryArtistName(artistName) {
    if (!artistName) return '';
    
    // Keep original case but extract primary artist
    let primary = artistName.trim();
    
    // Extract everything before featuring patterns
    const featuringPatterns = [
        /\s+(ft\.?|feat\.?|featuring)\s+.*/i,
        /\s+x\s+.*/i,
        /\s+&\s+.*/i,
        /\s+,\s+.*/i,
        /\s+\(.*(feat|ft).*\).*/i
    ];
    
    for (const pattern of featuringPatterns) {
        const match = primary.match(pattern);
        if (match) {
            primary = primary.substring(0, match.index).trim();
            break;
        }
    }
    
    return primary;
}

// Function to populate artist filter dropdown
function populateArtistFilter() {
    const artistSelect = document.getElementById('artist-filter-select');
    if (!artistSelect) return;
    
    // Clear existing options except the first one (All Artists)
    while (artistSelect.options.length > 1) {
        artistSelect.remove(1);
    }
    
    // Create a map to store normalized artists and their information
    const artistMap = new Map();
    
    music_list.forEach(song => {
        const originalArtist = song.artist;
        const normalizedArtist = normalizeArtistName(originalArtist);
        const primaryArtist = getPrimaryArtistName(originalArtist);
        
        if (normalizedArtist && !artistMap.has(normalizedArtist)) {
            artistMap.set(normalizedArtist, {
                displayName: primaryArtist,
                originalName: originalArtist,
                normalizedName: normalizedArtist,
                variations: [originalArtist]
            });
        } else if (normalizedArtist && artistMap.has(normalizedArtist)) {
            // Add this variation to the existing entry
            const existing = artistMap.get(normalizedArtist);
            if (!existing.variations.includes(originalArtist)) {
                existing.variations.push(originalArtist);
            }
        }
    });
    
    // Convert map to array and sort alphabetically by display name
    const artists = Array.from(artistMap.values()).sort((a, b) => 
        a.displayName.localeCompare(b.displayName)
    );
    
    // Add artist options to select
    artists.forEach(artistInfo => {
        const option = document.createElement('option');
        option.value = artistInfo.normalizedName;
        option.textContent = artistInfo.displayName;
        // Store additional info as data attributes
        option.setAttribute('data-original', artistInfo.originalName);
        option.setAttribute('data-variations', JSON.stringify(artistInfo.variations));
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
    
    // Apply artist filter if provided (using normalized comparison)
    if (artistFilter) {
        filteredSongs = filteredSongs.filter(song => {
            const songNormalizedArtist = normalizeArtistName(song.artist);
            return songNormalizedArtist === artistFilter;
        });
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
                <div class="playlist-song-artist song-artist">${song.artist}</div>
            </div>
        `;
        
        // Add data attribute for artist focus highlighting
        if (isArtistFocusMode && song.artist === focusedArtist) {
            playlistItem.setAttribute('data-artist-focused', 'true');
        }
        
        // Add click event to play the song
        playlistItem.addEventListener('click', (event) => {
            // Prevent event bubbling for nested elements
            event.stopPropagation();
            
            // Check if user clicked on artist name to enable artist focus mode
            const clickedElement = event.target;
            const isArtistClick = clickedElement.classList.contains('song-artist') || 
                                clickedElement.closest('.song-artist');
            
            if (isArtistClick) {
                // Enable artist focus mode
                enableArtistFocusMode(song.artist);
            } else {
                // Regular song selection
                track_index = originalIndex;
                loadTrack(track_index);
                playTrack();
                togglePlaylist();
            }
        });
        
        // Add separate click handler for artist element to ensure it's always clickable
        const artistElement = playlistItem.querySelector('.song-artist');
        if (artistElement) {
            artistElement.addEventListener('click', (event) => {
                event.stopPropagation();
                enableArtistFocusMode(song.artist);
            });
        }
        
        playlistSongs.appendChild(playlistItem);
    });
}

function togglePlaylist() {
    if (playlistContainer.classList.contains('show')) {
        playlistContainer.classList.remove('show');
        if (playlistOutsideClickHandlerBound) {
            document.removeEventListener('mousedown', closePlaylistOnClickOutside);
            playlistOutsideClickHandlerBound = false;
        }
    } else {
        playlistContainer.classList.add('show');
        updateActivePlaylistItem();
        if (!playlistOutsideClickHandlerBound) {
            // Defer binding to avoid closing from the same opening click
            setTimeout(() => {
                document.addEventListener('mousedown', closePlaylistOnClickOutside);
                playlistOutsideClickHandlerBound = true;
            }, 0);
        }
    }
}

// Close playlist when clicking outside of its container
function closePlaylistOnClickOutside(event) {
    if (!playlistContainer || !playlistContainer.classList.contains('show')) return;
    const target = event.target;
    // If click occurred inside the playlist container, ignore
    if (playlistContainer.contains(target)) return;
    // Otherwise close the playlist
    playlistContainer.classList.remove('show');
    document.removeEventListener('mousedown', closePlaylistOnClickOutside);
    playlistOutsideClickHandlerBound = false;
}

function updateActivePlaylistItem() {
    // Remove active class from all items
    const playlistItems = document.querySelectorAll('.playlist-song');
    playlistItems.forEach((item, index) => {
        if (index === track_index) {
            item.classList.add('active');
            // Scroll to center the active item with smooth behavior
            setTimeout(() => {
                item.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 100); // Small delay to ensure DOM is updated
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

// Open playlist filtered by a specific artist without changing playback
function openPlaylistForArtist(artistName) {
    if (!artistName) return;
    // Normalize artist for filtering
    const normalized = normalizeArtistName(artistName);

    // Sync the artist filter dropdown if present
    const artistSelect = document.getElementById('artist-filter-select');
    if (artistSelect) {
        artistSelect.value = normalized;
    }

    // Initialize playlist with only artist filter (reset search for clarity)
    initPlaylist('', normalized);

    // Ensure playlist view is shown
    if (!playlistContainer.classList.contains('show')) {
        playlistContainer.classList.add('show');
        updateActivePlaylistItem();
        if (!playlistOutsideClickHandlerBound) {
            setTimeout(() => {
                document.addEventListener('mousedown', closePlaylistOnClickOutside);
                playlistOutsideClickHandlerBound = true;
            }, 0);
        }
    }
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
    
    // Initialize scroll-to-top functionality
    initializeScrollToTop();

    // Clicking main page artist opens playlist filtered by that artist
    if (track_artist) {
        track_artist.style.cursor = 'pointer';
        track_artist.title = 'View all songs by this artist';
        track_artist.addEventListener('click', function(e) {
            e.preventDefault();
            const artistText = track_artist.textContent ? track_artist.textContent.trim() : '';
            if (!artistText) return;
            openPlaylistForArtist(artistText);
        });
    }
});

// Scroll to Top Functionality
function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const playlistSongs = document.getElementById('playlist-songs');
    
    if (!scrollToTopBtn || !playlistSongs) return;
    
    let scrollTimeout;
    
    // Show/hide button based on scroll position with enhanced responsiveness
    playlistSongs.addEventListener('scroll', function() {
        // Clear existing timeout
        clearTimeout(scrollTimeout);
        
        // Show button immediately when scrolling past threshold
        if (this.scrollTop > 100) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
        
        // Add a subtle pulse effect during active scrolling
        scrollToTopBtn.style.transform = scrollToTopBtn.classList.contains('show') 
            ? 'translateY(0) scale(1.02)' 
            : 'translateY(30px) scale(0.8)';
        
        // Reset transform after scrolling stops
        scrollTimeout = setTimeout(() => {
            if (scrollToTopBtn.classList.contains('show')) {
                scrollToTopBtn.style.transform = 'translateY(0) scale(1)';
            }
        }, 150);
    });
}

function scrollPlaylistToTop() {
    const playlistSongs = document.getElementById('playlist-songs');
    
    if (!playlistSongs) return;
    
    // Immediate and precise scroll to top
    playlistSongs.scrollTop = 0;
    
    // Add visual feedback to the playlist title
    const playlistTitle = document.querySelector('.playlist-title');
    if (playlistTitle) {
        playlistTitle.style.transform = 'translateY(0) scale(0.98)';
        setTimeout(() => {
            playlistTitle.style.transform = 'translateY(-1px) scale(1)';
        }, 100);
    }
}

function scrollToTop() {
    const playlistSongs = document.getElementById('playlist-songs');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    if (!playlistSongs) return;
    
    // Add active state animation for better visual feedback
    if (scrollToTopBtn) {
        scrollToTopBtn.style.transform = 'translateY(-1px) scale(0.95)';
        setTimeout(() => {
            scrollToTopBtn.style.transform = 'translateY(0) scale(1)';
        }, 100);
    }
    
    // Enhanced smooth scroll with custom easing
    const startPosition = playlistSongs.scrollTop;
    const startTime = performance.now();
    const duration = 600; // Slightly longer for smoother animation
    
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    function animateScroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        
        playlistSongs.scrollTop = startPosition * (1 - easedProgress);
        
        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    }
    
    requestAnimationFrame(animateScroll);
}






// Artist Focus Mode Functions
function enableArtistFocusMode(artist) {
    isArtistFocusMode = true;
    focusedArtist = artist;
    
    // Normalize the focused artist name for comparison
    const normalizedFocusedArtist = normalizeArtistName(artist);
    
    // Filter tracks by the selected artist using normalized comparison
    artistFocusedTracks = music_list.filter(song => 
        normalizeArtistName(song.artist) === normalizedFocusedArtist
    );
    
    if (artistFocusedTracks.length === 0) {
        console.warn('No tracks found for artist:', artist);
        disableArtistFocusMode();
        return;
    }
    
    // Update UI to show artist focus mode
    updateArtistFocusUI();
    
    // Update song navigation preview to reflect artist focus mode
    updateSongNavigationPreview();
    
    // Show notification with primary artist name
    const primaryArtistName = getPrimaryArtistName(artist);
    showArtistFocusNotification(primaryArtistName);
    
    // Start playing the first track by this artist using normalized comparison
    const firstTrackIndex = music_list.findIndex(song => 
        normalizeArtistName(song.artist) === normalizedFocusedArtist
    );
    if (firstTrackIndex !== -1) {
        track_index = firstTrackIndex;
        loadTrack(track_index);
        playTrack();
    }
    
    // Update playlist to highlight focused artist
    initPlaylist(currentSearchQuery, currentArtistFilter);
}

function disableArtistFocusMode() {
    isArtistFocusMode = false;
    focusedArtist = '';
    artistFocusedTracks = [];
    
    // Update UI to remove artist focus indicators
    updateArtistFocusUI();
    
    // Update song navigation preview to reflect normal mode
    updateSongNavigationPreview();
    
    // Refresh playlist
    initPlaylist(currentSearchQuery, currentArtistFilter);
}

function updateArtistFocusUI() {
    const playlistHeader = document.querySelector('.playlist-header');
    const existingIndicator = document.querySelector('.artist-focus-indicator');
    
    if (isArtistFocusMode && focusedArtist) {
        // Add or update artist focus indicator
        if (!existingIndicator) {
            const indicator = document.createElement('div');
            indicator.className = 'artist-focus-indicator';
            indicator.innerHTML = `
                <span class="focus-text">Playing: ${focusedArtist}</span>
                <button class="clear-focus-btn" onclick="disableArtistFocusMode()">
                    <i class="fas fa-times"></i>
                </button>
            `;
            playlistHeader.appendChild(indicator);
        } else {
            existingIndicator.querySelector('.focus-text').textContent = `Playing: ${focusedArtist}`;
        }
        
        // Add focused class to playlist container
        playlistContainer.classList.add('artist-focused');
    } else {
        // Remove artist focus indicator
        if (existingIndicator) {
            existingIndicator.remove();
        }
        
        // Remove focused class from playlist container
        playlistContainer.classList.remove('artist-focused');
    }
}

function showArtistFocusNotification(artist) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'artist-focus-notification';
    notification.innerHTML = `
        <i class="fas fa-user-music"></i>
        <span>Now playing only ${artist} tracks</span>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function getNextArtistTrack() {
    if (!isArtistFocusMode || artistFocusedTracks.length === 0) {
        return null;
    }
    
    const currentSong = music_list[track_index];
    const currentIndexInArtistTracks = artistFocusedTracks.findIndex(song => 
        song.name === currentSong.name && song.artist === currentSong.artist
    );
    
    if (currentIndexInArtistTracks === -1) {
        // Current song is not by the focused artist, play first artist track
        const normalizedFocusedArtist = normalizeArtistName(focusedArtist);
        return music_list.findIndex(song => 
            normalizeArtistName(song.artist) === normalizedFocusedArtist
        );
    }
    
    // Get next track by the same artist
    const nextArtistTrackIndex = (currentIndexInArtistTracks + 1) % artistFocusedTracks.length;
    const nextArtistTrack = artistFocusedTracks[nextArtistTrackIndex];
    
    return music_list.findIndex(song => 
        song.name === nextArtistTrack.name && song.artist === nextArtistTrack.artist
    );
}

function getPrevArtistTrack() {
    if (!isArtistFocusMode || artistFocusedTracks.length === 0) {
        return null;
    }
    
    const currentSong = music_list[track_index];
    const currentIndexInArtistTracks = artistFocusedTracks.findIndex(song => 
        song.name === currentSong.name && song.artist === currentSong.artist
    );
    
    if (currentIndexInArtistTracks === -1) {
        // Current song is not by the focused artist, play last artist track
        const lastArtistTrack = artistFocusedTracks[artistFocusedTracks.length - 1];
        return music_list.findIndex(song => 
            song.name === lastArtistTrack.name && song.artist === lastArtistTrack.artist
        );
    }
    
    // Get previous track by the same artist
    const prevArtistTrackIndex = currentIndexInArtistTracks === 0 
        ? artistFocusedTracks.length - 1 
        : currentIndexInArtistTracks - 1;
    const prevArtistTrack = artistFocusedTracks[prevArtistTrackIndex];
    
    return music_list.findIndex(song => 
        song.name === prevArtistTrack.name && song.artist === prevArtistTrack.artist
    );
}
