// ==== Updated script.js ====

// Selectors / elements
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
let isRepeat = 0;  // 0: off, 1: repeat all, 2: repeat one

let updateTimer;
let playlistContainer = document.getElementById('playlist-container');
let playlistSongs = document.getElementById('playlist-songs');
let totalMusic = document.querySelector(".total-music-list");

// Set up initial volume slider style
document.documentElement.style.setProperty('--volume-before-width', '99%');

// Load the first track
loadTrack(track_index);

// === Single ended handler ===
// This listener is only added once, so we avoid duplicates
curr_track.addEventListener('ended', handleTrackEnd);

/**
 * Handler for when the current track ends.
 * Chooses what to do based on repeat/random settings.
 */
function handleTrackEnd() {
  // Logging for debugging:
  console.log("Track ended: index =", track_index,
              "isRepeat =", isRepeat,
              "isRandom =", isRandom);

  if (isRepeat === 2) {
    // Repeat one: replay same track
    curr_track.currentTime = 0;
    playTrack();
  }
  else if (isRepeat === 1) {
    // Repeat all
    nextTrack();
  }
  else if (isRandom) {
    nextTrack();
  }
  else {
    // Normal mode: go to next if exists, else stop/pause
    if (track_index < music_list.length - 1) {
      nextTrack();
    } else {
      pauseTrack();
    }
  }
}

// --- (other listeners, initialization, etc.) ---

// Example: page visibility / wake lock etc.
// ...

// Function to load a given track
function loadTrack(index) {
  clearInterval(updateTimer);
  reset();
  document.querySelector('.wrapper').classList.add('track-loading');

  curr_track.src = music_list[index].music;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + music_list[index].img + ")";
  track_name.textContent = music_list[index].name;
  track_artist.textContent = music_list[index].artist;
  track_released.textContent = "Release Date: " + music_list[index].released;

  now_playing.textContent = "Playing music " + (index + 1) + " of " + music_list.length;

  updateTimer = setInterval(setUpdate, 1000);

  // Remove any duplicate ended listeners if they were added previously
  // (In this version, we aim to avoid ever adding more than the one above.)
  // If you want, you can explicitly remove before adding, but here we do not re-add.

  // Update playlist UI etc.
  updateActivePlaylistItem();
  updateSongNavigationPreview();
  random_bg_color();

  curr_track.addEventListener('canplay', function() {
    setTimeout(() => {
      document.querySelector('.wrapper').classList.remove('track-loading');
    }, 500);
  });

  notification();
}

// --- Playback control functions ---

function playTrack(){
  curr_track.play();
  isPlaying = true;
  track_art.classList.add('rotate');
  document.body.classList.add('playing-music');
  playpause_btn.innerHTML = '';  // adjust this as needed
  setUpdate();
  startColorLoop();
  updatePlaybackState('playing');
  updatePositionState();
  requestWakeLock();
}

function pauseTrack(){
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove('rotate');
  document.body.classList.remove('playing-music');
  playpause_btn.innerHTML = '';  // adjust this as needed
  setUpdate();
  stopColorLoop();
  updatePlaybackState('paused');
  releaseWakeLock();
}

function nextTrack(){
  if (!isRandom) {
    if (track_index < music_list.length - 1) {
      track_index += 1;
    } else {
      track_index = 0;
    }
  } else {
    // Random mode
    let random_index;
    do {
      random_index = Math.floor(Math.random() * music_list.length);
    } while (random_index === track_index && music_list.length > 1);
    track_index = random_index;
  }

  loadTrack(track_index);
  playTrack();
  notification();
}

function prevTrack(){
  if (!isRandom) {
    if (track_index > 0) {
      track_index -= 1;
    } else {
      track_index = music_list.length - 1;
    }
  } else {
    // Optionally, random previous
    let random_index;
    do {
      random_index = Math.floor(Math.random() * music_list.length);
    } while (random_index === track_index && music_list.length > 1);
    track_index = random_index;
  }

  loadTrack(track_index);
  playTrack();
  notification();
}

// ... rest of your functions (seekTo, setVolume, setUpdate, etc.) remain mostly the same.
// Make sure none of them add another `ended` listener or call nextTrack redundantly.

// ==== End of updates ====
