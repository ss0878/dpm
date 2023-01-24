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
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;


const music_list = [
	{
        img : 'https://cover.djpunjab.is/53108/300x700/Combination-Nawab.jpg',
        name : 'Combination',
        artist : 'Nawab',
      	album : 'Nawab Music',
	    released : '23-01-2023',
        music : 'https://s320.djpunjab.is/data/320/53108/301221/Combination%20-%20Nawab.mp3'
     },
     {
        img : 'https://cover.djpunjab.is/53103/300x700/Soorma-2-Jazzy-B.jpg',
        name : 'Soorma 2',
        artist : 'Jazzy B',
      	album : 'Jazzy B Music',
	    released : '22-01-2023',
        music : 'https://s320.djpunjab.is/data/320/53103/301216/Soorma%202%20-%20Jazzy%20B.mp3'
     },
     {
        img : 'https://cover.djpunjab.is/53102/300x700/Me-Nijjar.jpg',
        name : 'ME',
        artist : 'Nijjar Ft. Deep Jandu',
      	album : 'Nijjar Music',
	    released : '22-01-2023',
        music : 'https://s320.djpunjab.is/data/320/53102/301215/Me%20-%20Nijjar.mp3'
     },
     {
        img : 'https://cover.djpunjab.is/53096/300x700/Faraan-Wali-Jacket-Guri-Lahoria.jpg',
        name : 'Faraan Wali Jacket',
        artist : 'Guri Lahoria',
      	album : 'Music',
	    released : '21-01-2023',
        music : 'https://s320.djpunjab.is/data/320/53096/301209/Faraan%20Wali%20Jacket%20-%20Guri%20Lahoria.mp3'
     },
     {
        img : 'https://cover.djpunjab.is/53096/300x700/Faraan-Wali-Jacket-Guri-Lahoria.jpg',
        name : 'Faraan Wali Jacket',
        artist : 'Guri Lahoria',
      	album : 'Music',
	    released : '21-01-2023',
        music : 'https://s320.djpunjab.is/data/320/53096/301209/Faraan%20Wali%20Jacket%20-%20Guri%20Lahoria.mp3'
     },
     {
        img : 'https://cover.djpunjab.is/53081/300x700/Where-Do-I-Go-Deep-Jandu.jpg',
        name : 'Where Do I Go',
        artist : 'Deep Jandu',
      	album : 'Deep Jandu Entertainment Inc.',
	    released : '19-01-2023',
        music : 'https://s320.djpunjab.is/data/320/53081/301194/Where%20Do%20I%20Go%20-%20Deep%20Jandu.mp3'
     },
     {
        img : 'https://cover.djpunjab.is/53073/300x700/Dil-Da-Black-Runbir.jpg',
        name : 'Dil Da Black',
        artist : 'Runbir',
      	album : 'Crown Records',
	    released : '18-01-2023',
        music : 'https://s320.djpunjab.is/data/320/53073/301177/Dil%20Da%20Black%20-%20Runbir.mp3'
     },
     {
        img : 'https://lq.djjohal.com/covers/729142/Tu%20Kaafi%20Ae.jpg',
        name : 'Tu Kaafi Ae',
        artist : 'Pav Dharia',
      	album : 'Pav Dharia Music',
	    released : '18-01-2023',
        music : 'https://hd1.djjohal.com/320/515154/Tu%20Kaafi%20Ae%20-%20Pav%20Dharia%20(DJJOhAL.Com).mp3'
     },
	{
        img : 'https://lq.djjohal.com/covers/729123/Skills.jpg',
        name : 'Skills',
        artist : 'Tyson Sidhu',
 	    album : 'Tyson Sidhu Music',
	    released : '18-01-2023',
        music : 'https://hd1.djjohal.com/320/515117/Skills%20-%20Tyson%20Sidhu%20(DJJOhAL.Com).mp3'
     },
     {
         img : 'https://cover.djpunjab.is/53018/300x700/Pecha-Gur-Sidhu.jpg',
         name : 'Pecha',
         artist : 'Gur Sidhu',
          album : 'Brown Town Music',
         released : '18-01-2023',
         music : 'https://s320.djpunjab.is/data/320/53018/301109/Pecha%20-%20Gur%20Sidhu.mp3'
      },
      {
          img : 'https://cover.djpunjab.is/53050/300x700/Taur-Tappa-shivjot.jpg',
          name : 'Taur Tappa',
          artist : 'Shivjot',
           album : 'Dose Of Music',
          released : '18-01-2023',
          music : 'https://s320.djpunjab.is/data/320/53050/301154/Taur%20Tappa%20-%20shivjot.mp3'
       },
       {
           img : 'https://cover.djpunjab.is/53049/300x700/Thirty-Six-Penny.jpg',
           name : 'Thirty Six',
           artist : 'Penny',
            album : 'Jatt Land Music',
           released : '14-01-2023',
           music : 'https://s320.djpunjab.is/data/320/53049/301153/Thirty%20Six%20-%20Penny.mp3'
        },
        {
            img : 'https://cover.djpunjab.is/53048/300x700/Unique-Jimmy-Mahal.jpg',
            name : 'Unique',
            artist : 'Jimmy Mahal',
             album : 'Jimmy Mahal Music',
            released : '14-01-2023',
            music : 'https://s320.djpunjab.is/data/320/53048/301152/Unique%20-%20Jimmy%20Mahal.mp3'
         },
         {
             img : 'https://cover.djpunjab.is/53046/300x700/Handmade-Gurmaan-Sahota.jpg',
             name : 'Handmade',
             artist : 'Gurmaan Sahota',
              album : 'Jass Records',
             released : '14-01-2023',
             music : 'https://s320.djpunjab.is/data/320/53046/301150/Handmade%20-%20Gurmaan%20Sahota.mp3'
          },
          {
              img : 'https://cover.djpunjab.is/53041/300x700/No-Cap-Harp-Multani.jpg',
              name : 'No Cap',
              artist : 'Harp Multani',
               album : '84 Records',
              released : '12-01-2023',
              music : 'https://s320.djpunjab.is/data/320/53041/301145/No%20Cap%20-%20Harp%20Multani.mp3'
           },
           {
               img : 'https://cover.djpunjab.is/53039/300x700/Hold-Sway-Harman-Brar.jpg',
               name : 'Hold Sway',
               artist : 'Harman Brar',
                album : 'Jatt Life Records',
               released : '12-01-2023',
               music : 'https://s320.djpunjab.is/data/320/53039/301143/Hold%20Sway%20-%20Harman%20Brar.mp3'
            },
            {
                img : 'https://cover.djpunjab.is/53036/300x700/Dil-Mangda-Rajvir-Jawanda.jpg',
                name : 'Dil Mangda',
                artist : 'Rajvir Jawanda',
                 album : 'Rajvir Jawanda Music',
                released : '12-01-2023',
                music : 'https://s320.djpunjab.is/data/320/53036/301140/Dil%20Mangda%20-%20Rajvir%20Jawanda.mp3'
             },
             {
                img : 'https://cover.djpunjab.is/53026/300x700/Iko-Zindagi-Inder-Chahal.jpg',
                name : 'Iko Zindagi',
                artist : 'Inder Chahal',
                album : 'Alpha Studio',
                released : '10-01-2023',
                music : 'https://s320.djpunjab.is/data/320/53026/301117/Iko%20Zindagi%20-%20Inder%20Chahal.mp3'
              },
            {
                img : 'https://cover.djpunjab.is/53024/300x700/Court-Gulab-Sidhu.jpg',
                name : 'Court',
                artist : 'Gulab Sidhu',
                album : 'Speed Records',
                released : '10-01-2023',
                music : 'https://s320.djpunjab.is/data/320/53024/301115/Court%20-%20Gulab%20Sidhu.mp3'
              },
              {
                img : 'https://cover.djpunjab.is/53023/300x700/Tauheen-Karan-Sehmbi.jpg',
                name : 'Tauheen',
                artist : 'Karan Sehmbi',
                album : 'Karan Sehmbi Music',
                released : '10-01-2023',
                music : 'https://s320.djpunjab.is/data/320/53023/301114/Tauheen%20-%20Karan%20Sehmbi.mp3'
               },
               {
                img : 'https://cover.djpunjab.is/53019/300x700/Khrey-Khrey-Hunar-Sidhu.jpg',
                name : 'Khrey Khrey',
                artist : 'Hunar Sidhu',
                album : 'One Take Worldwide',
                released : '10-01-2023',
                music : 'https://s320.djpunjab.is/data/320/53019/301110/Khrey%20Khrey%20-%20Hunar%20Sidhu.mp3'
                },
                {
                img : 'https://cover.djpunjab.is/53017/300x700/Long-Route-Amar-Sehmbi.jpg',
                name : 'Long Route',
                artist : 'Hunar Sidhu',
                album : 'Jass Records',
                released : '10-01-2023',
                music : 'https://s320.djpunjab.is/data/320/53017/301108/Long%20Route%20-%20Amar%20Sehmbi.mp3'
                 },
                 {
                img : 'https://cover.djpunjab.is/53016/300x700/Jawani-Simar-Doraha.jpg',
                name : 'Jawani',
                artist : 'Simar Doraha',
                album : 'Urban Pendu Records',
                released : '10-01-2023',
                music : 'https://s320.djpunjab.is/data/320/53016/301107/Jawani%20-%20Simar%20Doraha.mp3'
                  },
                  {
                img : 'https://cover.djpunjab.is/53013/300x700/Ikki-Na-Dukki-Vicky.jpg',
                name : 'Ikki Na Dukki',
                artist : 'Vicky',
                album : 'Times Music',
                released : '09-01-2023',
                music : 'https://s320.djpunjab.is/data/320/53013/301104/Ikki%20Na%20Dukki%20-%20Vicky.mp3'
                   },
                   {
                 img : 'https://cover.djpunjab.is/52994/300x700/Chaklo-Chaklo-Mani-Longia.jpg',
                 name : 'Chaklo Chaklo',
                 artist : 'Mani Longia',
                 album : 'Mani Longia Music',
                 released : '06-01-2023',
                 music : 'https://s320.djpunjab.is/data/320/52994/301085/Chaklo%20Chaklo%20-%20Mani%20Longia.mp3'
                    },
                    {
                  img : 'https://cover.djpunjab.is/52993/300x700/Laado-Gill-Armaan.jpg',
                  name : 'Laado Gill',
                  artist : 'Armaan',
                  album : 'Single Track Music',
                  released : '06-01-2023',
                  music : 'https://s320.djpunjab.is/data/320/52993/301084/Laado%20-%20Gill%20Armaan.mp3'
                     },
                     {
                   img : 'https://cover.djpunjab.is/52976/300x700/Jatt-Nu-Sambhle-Deep-Chahal.jpg',
                   name : 'Jatt Nu Sambhle',
                   artist : 'Deep Chahal',
                   album : 'Jass Records',
                   released : '03-01-2023',
                   music : 'https://s320.djpunjab.is/data/320/52976/301067/Jatt%20Nu%20Sambhle%20-%20Deep%20Chahal.mp3'
                      },
                      {
                    img : 'https://cover.djpunjab.is/52970/300x700/Da-Bomb-Ellde-Fazilka.jpg',
                    name : 'Da Bomb',
                    artist : 'Ellde Fazilka',
                    album : 'Ellde Fazilka Music',
                    released : '01-01-2023',
                    music : 'https://s320.djpunjab.is/data/320/52970/301061/Da%20Bomb%20-%20Ellde%20Fazilka.mp3'
                       },
                      {
                    img : 'https://cover.djpunjab.is/52968/300x700/2023-FLOW-Sikander-Kahlon.jpg',
                    name : '2023 FLOW',
                    artist : 'Sikander Kahlon',
                    album : 'Sikander Kahlon Music',
                    released : '01-01-2023',
                    music : 'https://s320.djpunjab.is/data/320/52968/301059/2023%20FLOW%20-%20Sikander%20Kahlon.mp3'
                       },
                      {
                    img : 'https://cover.djpunjab.is/52965/300x700/Poh-Da-Mahina-Kirat-Gill.jpg',
                    name : 'Poh Da Mahina',
                    artist : 'Kirat Gill',
                    album : 'Gringo Entertainments',
                    released : '30-12-2022',
                    music : 'https://s320.djpunjab.is/data/320/52965/301056/Poh%20Da%20Mahina%20-%20Kirat%20Gill.mp3'
                       },
                      {
                    img : 'https://cover.djpunjab.is/52964/300x700/Hirni-Navaan-Sandhu.jpg',
                    name : 'Hirni',
                    artist : 'Navaan Sandhu',
                    album : 'Husky Music',
                    released : '30-12-2022',
                    music : 'https://s320.djpunjab.is/data/320/52964/301055/Hirni%20-%20Navaan%20Sandhu.mp3'
                       },
                      {
                    img : 'https://cover.djpunjab.is/52963/300x700/YDY-Zora-Randhawa.jpg',
                    name : 'YDY',
                    artist : 'Zora Randhawa',
                    album : 'Zora Randhawa Music',
                    released : '30-12-2022',
                    music : 'https://s320.djpunjab.is/data/320/52963/301054/YDY%20-%20Zora%20Randhawa.mp3'
                       },
                      {
                    img : 'https://cover.djpunjab.is/52960/300x700/Goddamn-Jerry.jpg',
                    name : 'Goddamn',
                    artist : 'Jerry',
                    album : 'T-Series',
                    released : '28-12-2022',
                    music : 'https://s320.djpunjab.is/data/320/52960/301051/Goddamn%20-%20Jerry.mp3'
                       },
                       {
                     img : 'https://cover.djpunjab.is/52951/300x700/Afterhours-BIR.jpg',
                     name : 'Afterhours',
                     artist : 'BIR',
                     album : 'Unbothered Records',
                     released : '27-12-2022',
                     music : 'https://s320.djpunjab.is/data/320/52951/301042/Afterhours%20-%20BIR.mp3'
                        },
                        {
                      img : 'https://cover.djpunjab.is/52925/300x700/Me-and-You-Yuvraj.jpg',
                      name : 'Me And You',
                      artist : 'Yuvraj',
                      album : 'Yuvraj Studios',
                      released : '21-12-2022',
                      music : 'https://s320.djpunjab.is/data/320/52925/301016/Me%20And%20You%20-%20Yuvraj.mp3'
                         },
                         {
                       img : 'https://cover.djpunjab.is/52924/300x700/Players-Badshah.jpg',
                       name : 'Players',
                       artist : 'Badshah Ft. Karan Aujla',
                       album : 'Badshah Music',
                       released : '21-12-2022',
                       music : 'https://s320.djpunjab.is/data/320/52924/301015/Players%20-%20Badshah.mp3'
                          },
                          {
                        img : 'https://cover.djpunjab.is/52917/300x700/Never-Back-Down-Robyn-Sandhu.jpg',
                        name : 'Never Back Down',
                        artist : 'Robyn Sandhu',
                        album : 'T-Series',
                        released : '20-12-2022',
                        music : 'https://s320.djpunjab.is/data/320/52917/301008/Never%20Back%20Down%20-%20Robyn%20Sandhu.mp3'
                           },
                           {
                         img : 'https://cover.djpunjab.is/52911/300x700/True-Talks-Jassa-Dhillon.jpg',
                         name : 'True Talks',
                         artist : 'Jassa Dhillon',
                         album : 'Jassa Dhillon Music',
                         released : '19-12-2022',
                         music : 'https://s320.djpunjab.is/data/320/52911/301002/True%20Talks%20-%20Jassa%20Dhillon.mp3'
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
    playTrack(); notification();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack(); notification();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
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
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
function notification(){
if ( 'mediaSession' in navigator ) {
	navigator.mediaSession.metadata = new MediaMetadata({
	  title: track_name.textContent,
		  artist: track_artist.textContent,
		album: 'Dope Music',
          	artwork: [
            { src: 'https://cdn-icons-png.flaticon.com/512/9280/9280598.png', sizes: 'auto', type: 'image/png' }/*,
                  { src: 'https://www.dropbox.com/s/9s99pr2e5lv2b4j/1.png?dl=1', sizes: '128x128', type: 'image/png' },
                   { src: 'https://assets.codepen.io/4358584/1.300.jpg', sizes: '192x192', type: 'image/png' },
                   { src: 'https://assets.codepen.io/4358584/1.300.jpg', sizes: '256x256', type: 'image/png' },
                   { src: 'https://assets.codepen.io/4358584/1.300.jpg', sizes: '384x384', type: 'image/png' },
                   { src: 'https://assets.codepen.io/4358584/1.300.jpg', sizes: '512x512', type: 'image/png' }*/
          ]
		  //album: track_name.textContent,
		 // artwork: track_art.style.backgroundImage
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
  	updatePositionState();
	});

	navigator.mediaSession.setActionHandler('seekforward', function(event) {
  	const skipTime = event.seekOffset || defaultSkipTime;
  	curr_track.currentTime = Math.min(curr_track.currentTime + skipTime, curr_track.duration);
  	updatePositionState();
	});
  }
}
