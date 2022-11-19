let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'https://lq.djjohal.com/covers/728705/Jagga%20Daaku.jpg',
        name : 'Jagga Daaku',
        artist : 'Varinder Brar',
        music : 'https://hd1.djjohal.com/320/514518/Jagga%20Daaku%20-%20Varinder%20Brar%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728692/Gal%20Ban%20Jae.jpg',
        name : 'Gal Ban Jae',
        artist : 'Ammy Virk',
        music : 'https://hd1.djjohal.com/320/514489/Gal%20Ban%20Jae%20-%20Ammy%20Virk%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728691/Wallpaper.jpg',
        name : 'Wallpaper',
        artist : 'Kadir Thind',
        music : 'https://hd1.djjohal.com/320/514488/Wallpaper%20-%20Kadir%20Thind%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728688/Geet%20Banuga.jpg',
        name : 'Geet Banuga',
        artist : 'Kaka',
        music : 'https://hd1.djjohal.com/320/514485/Geet%20Banuga%20-%20Kaka%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728686/Kangne.jpg',
        name : 'Geet Banuga',
        artist : 'Kaka',
        music : 'https://hd1.djjohal.com/320/514485/Geet%20Banuga%20-%20Kaka%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728700/Trucker.jpg',
        name : 'Kangne',
        artist : 'Kaur B',
        music : 'https://hd1.djjohal.com/320/514483/Kangne%20-%20Kaur%20B%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728673/Hustler.jpg',
        name : 'Hustler',
        artist : 'Sukh Lotey',
        music : 'https://hd1.djjohal.com/320/514470/Hustler%20-%20Sukh%20Lotey%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728677/Karobaar.jpg',
        name : 'Karobaar',
        artist : 'Zora Randhawa',
        music : 'https://hd1.djjohal.com/320/514474/Karobaar%20-%20Zora%20Randhawa%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728670/Wang%20Golden.jpg',
        name : 'Wang Golden',
        artist : 'Sajjan Adeeb',
        music : 'https://hd1.djjohal.com/320/514467/Wang%20Golden%20-%20Sajjan%20Adeeb%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728672/Mehfilan.jpg',
        name : 'Mehfilan',
        artist : 'Shooter Kahlon',
        music : 'https://hd1.djjohal.com/320/514469/Mehfilan%20-%20Shooter%20Kahlon%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728662/Boss%20Walk.jpg',
        name : 'Boss Walk',
        artist : 'Nirvair Pannu',
        music : 'https://hd1.djjohal.com/320/514454/Boss%20Walk%20-%20Nirvair%20Pannu%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728653/Jhumka.jpg',
        name : 'Jhumka',
        artist : 'Ekam Chanoli',
        music : 'https://hd1.djjohal.com/320/514445/Jhumka%20-%20Ekam%20Chanoli%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728659/Wangan.jpg',
        name : 'Wangan',
        artist : 'Shivjot',
        music : 'https://hd1.djjohal.com/320/514451/Wangan%20-%20Shivjot%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728658/Munda%20Sardaran%20Da.jpg',
        name : 'Munda Sardaran Da',
        artist : 'Jordan Sandhu',
        music : 'https://hd1.djjohal.com/320/514450/Munda%20Sardaran%20Da%20-%20Jordan%20Sandhu%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728656/Jatt%20Bolde.jpg',
        name : 'Jatt Bolde',
        artist : 'Gippy Grewal, Jazzy B',
        music : 'https://hd1.djjohal.com/320/514448/Jatt%20Bolde%20-%20Gippy%20Grewal%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728651/Pariyan%20De%20Desh.jpg',
        name : 'Pariyan De Desh',
        artist : 'Gurnam Bhullar',
        music : 'https://hd1.djjohal.com/320/514443/Pariyan%20De%20Desh%20-%20Gurnam%20Bhullar%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728279/Ainak.jpg',
        name : 'Anak',
        artist : 'Gulab Sidhu',
        music : 'https://hd1.djjohal.com/320/513936/Ainak%20-%20Gulab%20Sidhu%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/726955/Colt.jpg',
        name : 'Colt',
        artist : 'Pavitar Lassoi',
        music : 'https://hd1.djjohal.com/320/512214/Colt%20-%20Pavitar%20Lassoi%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728610/Pooranmashi.jpg',
        name : 'Pooranmashi',
        artist : 'Kulwinder Billa',
        music : 'https://hd1.djjohal.com/320/514387/Pooranmashi%20-%20Kulwinder%20Billa%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728609/Wanted.jpg',
        name : 'Wanted',
        artist : 'Ninja & Korala Maan',
        music : 'https://hd1.djjohal.com/320/514386/Wanted%20-%20Ninja%20%20Korala%20Maan%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728606/Vaar.jpg',
        name : 'Vaar',
        artist : 'Sidhu Moose Wala',
        music : 'https://hd1.djjohal.com/320/514382/Vaar%20-%20Sidhu%20Moose%20Wala%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728600/Jee%20Jeha%20Karda.jpg',
        name : 'Jee Jeha Karda',
        artist : 'Jasmine Sandlas',
        music : 'https://hd1.djjohal.com/320/514375/Jee%20Jeha%20Karda%20-%20Jasmine%20Sandlas%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728597/BBBB.jpg',
        name : 'BBBB',
        artist : 'Khan Bhaini',
        music : 'https://hd1.djjohal.com/320/514372/BBBB%20-%20Khan%20Bhaini%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728590/Chobbar.jpg',
        name : 'Chobbar',
        artist : 'Jordan Sandhu',
        music : 'https://hd1.djjohal.com/320/514362/Chobbar%20-%20Jordan%20Sandhu%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728580/Tutta%20Dil.jpg',
        name : 'Tutta Dil',
        artist : 'Sharry Maan',
        music : 'https://hd1.djjohal.com/320/514352/Tutta%20Dil%20-%20Sharry%20Maan%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728579/Zara%20Faasley%20Te.jpg',
        name : 'Zara Faasley Te',
        artist : 'Satinder Sartaaj',
        music : 'https://hd1.djjohal.com/320/514351/Zara%20Faasley%20Te%20-%20Satinder%20Sartaaj%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728563/Mithiyan%20Jailan.jpg',
        name : 'Mithiyan Jailan',
        artist : 'Ranjit Bawa',
        music : 'https://hd1.djjohal.com/320/514326/Mithiyan%20Jailan%20-%20Ranjit%20Bawa%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728561/13%20Pind.jpg',
        name : '13 Pind',
        artist : 'Rajvir Jawanda',
        music : 'https://hd1.djjohal.com/320/514324/13%20Pind%20-%20Rajvir%20Jawanda%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728560/Letter%20to%20Sidhu.jpg',
        name : 'Letter to Sidhu',
        artist : 'Sunny Malton',
        music : 'https://hd1.djjohal.com/320/514323/Letter%20to%20Sidhu%20-%20Sunny%20Malton%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728542/Ak%2047.jpg',
        name : 'Ak 47',
        artist : 'Ninja',
        music : 'https://hd1.djjohal.com/320/514296/Ak%2047%20-%20Ninja%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728541/Mera%20Jee%20Karda.jpg',
        name : 'Mera Jee Karda (Remix)',
        artist : 'Byg Byrd',
        music : 'https://hd1.djjohal.com/320/514295/Mera%20Jee%20Karda%20-%20Byg%20Byrd%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728538/2%20Bloodas.jpg',
        name : '2 Bloodas',
        artist : 'Varinder Brar',
        music : 'https://hd1.djjohal.com/320/514292/2%20Bloodas%20-%20Varinder%20Brar%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728529/Hello%20Hello%20Hola.jpg',
        name : 'Hello Hello Hola',
        artist : 'Garry Sandhu Ft. Las Villa ',
        music : 'https://hd1.djjohal.com/320/514271/Hello%20Hello%20Hola%20-%20Garry%20Sandhu%20(DJJOhAL.Com).mp3'
    }
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
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
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
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
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
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
        total_duration.textContent = durationMinutes + ":" + durationMinutes;
    }
}
