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
let updateTimer;
let playlistContainer = document.getElementById('playlist-container');
let playlistSongs = document.getElementById('playlist-songs');


totalMusic = document.querySelector(".total-music-list");

// Initialize the playlist
initPlaylist();

// Load the first track
loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

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
    notification();
}


function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
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
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    notification(); 
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
    let current_index = track_index;
    loadTrack(current_index);
    playTrack(); 
    notification();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack(); notification();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    setUpdate();
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    setUpdate();
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
    curr_track.volume = volume_slider.value / 100;
    notification();
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

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
    }
    notification();
}
function notification(){
    sessionimg = music_list[track_index].img;
if ( 'mediaSession' in navigator ) {
	navigator.mediaSession.metadata = new MediaMetadata({
	  title: track_name.textContent,
		artist: track_artist.textContent,
		album: 'Dope Music',
        
          	artwork: [
                  { src: sessionimg, sizes: '96x96', type: 'auto' },
                  { src: sessionimg, sizes: '128x128', type: 'auto' },
                  { src: sessionimg, sizes: '192x192', type: 'auto' },
                  { src: sessionimg, sizes: '256x256', type: 'auto' },
                  { src: sessionimg, sizes: '384x384', type: 'auto' },
                  { src: sessionimg, sizes: '512x512', type: 'auto' }
          ]
		  
	});
  
	navigator.mediaSession.setActionHandler('pause', () => {
	  pauseTrack();
	});
	navigator.mediaSession.setActionHandler('play', () => {
	  playTrack();
	});
	navigator.mediaSession.setActionHandler('previoustrack', () => {
	  //find the index of the audio src in our srcs array to know what src to set next
	  prevTrack();
	});
	navigator.mediaSession.setActionHandler('nexttrack', () => {
	  //find the index of the audio src in our srcs array to know what src to set next
	  nextTrack();
	});
	let defaultSkipTime = 5; /* Time to skip in seconds by default */

	navigator.mediaSession.setActionHandler('seekbackward', function(event) {
  	const skipTime = event.seekOffset || defaultSkipTime;
  	curr_track.currentTime = Math.max(curr_track.currentTime - skipTime, 0);
  	setUpdate();
   updatePositionState();
	});

	navigator.mediaSession.setActionHandler('seekforward', function(event) {
  	const skipTime = event.seekOffset || defaultSkipTime;
  	curr_track.currentTime = Math.min(curr_track.currentTime + skipTime, curr_track.duration);
  	setUpdate();
   updatePositionState();
	});

   


  }
}




function downloadTrack(){
    open(music_list[track_index].music);
}

// Playlist Functions
function initPlaylist(searchQuery = '') {
    // Clear existing content
    playlistSongs.innerHTML = '';
    
    // Filter songs based on search query if provided
    const filteredSongs = searchQuery ? 
        music_list.filter(song => 
            song.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            song.artist.toLowerCase().includes(searchQuery.toLowerCase())
        ) : 
        music_list;
    
    // Update song counter
    const songCounter = document.getElementById('song-counter');
    if (songCounter) {
        if (searchQuery && filteredSongs.length !== music_list.length) {
            songCounter.textContent = `${filteredSongs.length} of ${music_list.length} songs`;
        } else {
            songCounter.textContent = `${music_list.length} songs`;
        }
    }
    
    // Display message if no songs match the search
    if (filteredSongs.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'no-search-results';
        noResults.textContent = 'No songs found matching your search.';
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
    if (playlistContainer.style.display === 'flex') {
        playlistContainer.style.display = 'none';
    } else {
        playlistContainer.style.display = 'flex';
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
    initPlaylist(searchQuery);
}

// Add event listener for search input to search as you type
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('playlist-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchQuery = this.value.trim();
            initPlaylist(searchQuery);
        });
        
        // Add event listener for Enter key in search input
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchPlaylist();
            }
        });
    }
});
