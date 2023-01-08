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
        img : 'https://lq.djjohal.com/covers/729059/Gedi%20Route.jpg',
        name : 'Gedi Route',
        artist : 'Kulbir Jhinjer',
 	album : 'Super Beat & Records',
	released : '06-01-2023',
        music : 'https://hd1.djjohal.com/320/515022/Gedi%20Route%20-%20Kulbir%20Jhinjer%20(DJJOhAL.Com).mp3'
     },
	{
        img : 'https://lq.djjohal.com/covers/729047/All%20Eyez%20On%20Me.jpg',
        name : 'All Eyez On Me',
        artist : 'Ranjit Bawa',
 	album : 'Ranjit Bawa Music',
	released : '05-01-2023',
        music : 'https://hd1.djjohal.com/320/515010/All%20Eyez%20On%20Me%20-%20Ranjit%20Bawa%20(DJJOhAL.Com).mp3'
     },
	{
        img : 'https://lq.djjohal.com/covers/729022/2023%20FLOW.jpg',
        name : '2023 FLOW',
        artist : 'Sikander Kahlon',
 	album : 'Sikander Kahlon Music',
	released : '01-01-2023',
        music : 'https://hd1.djjohal.com/320/514985/2023%20FLOW%20-%20Sikander%20Kahlon%20(DJJOhAL.Com).mp3'
     },
	{
        img : 'https://lq.djjohal.com/covers/729018/Da%20Bomb.jpg',
        name : 'Da Bomb',
        artist : 'Ellde Fazilka',
 	album : 'Ellde Fazilka Music',
	released : '01-01-2023',
        music : 'https://hd1.djjohal.com/320/514981/Da%20Bomb%20-%20Ellde%20Fazilka%20(DJJOhAL.Com).mp3'
     },
	{
        img : 'https://lq.djjohal.com/covers/729017/Shokeen.jpg',
        name : 'Shokeen',
        artist : 'Fateh',
 	album : 'WinWin Records',
	released : '30-12-2022',
        music : 'https://hd1.djjohal.com/320/514980/Shokeen%20-%20Fateh%20(DJJOhAL.Com).mp3'
     },
	{
        img : 'https://lq.djjohal.com/covers/729013/Hirni.jpg',
        name : 'Hirni',
        artist : 'Navaan Sandhu',
 	album : 'Husky Music',
	released : '30-12-2022',
        music : 'https://hd1.djjohal.com/320/514976/Hirni%20-%20Navaan%20Sandhu%20(DJJOhAL.Com).mp3'
     },
	{
        img : 'https://lq.djjohal.com/covers/729012/Poh%20Da%20Mahina.jpg',
        name : 'Poh Da Mahina',
        artist : 'Kirat Gill',
 	album : 'Gringo Entertainments',
	released : '30-12-2022',
        music : 'https://hd1.djjohal.com/320/514975/Poh%20Da%20Mahina%20-%20Kirat%20Gill%20(DJJOhAL.Com).mp3'
     },
	{
        img : 'https://lq.djjohal.com/covers/728958/Players.jpg',
        name : 'Players',
        artist : 'Badshah & Karan Aujla',
 	album : 'Badshah Music',
	released : '21-12-2022',
        music : 'https://hd1.djjohal.com/320/514878/Players%20-%20Badshah%20%20Karan%20Aujla%20(DJJOhAL.Com).mp3'
     },
	{
        img : 'https://lq.djjohal.com/covers/728964/Me%20and%20You.jpg',
        name : 'Me and You',
        artist : 'Yuvraj',
 	album : 'Yuvraj Studios',
	released : '21-12-2022',
        music : 'https://hd1.djjohal.com/320/514884/Me%20and%20You%20-%20Yuvraj%20(DJJOhAL.Com).mp3'
     },
	{
        img : 'https://lq.djjohal.com/covers/728931/Our%20Beginning.jpg',
        name : 'Our Beginning',
        artist : 'Himmat Sandhu',
 	album : 'Majhail Creations',
	released : '17-12-2022',
        music : 'https://hd1.djjohal.com/320/514842/Our%20Beginning%20-%20Himmat%20Sandhu%20(DJJOhAL.Com).mp3'
     },
	{
        img : 'https://lq.djjohal.com/covers/728917/2%20Percent.jpg',
        name : '2 Percent',
        artist : 'Garry Sandhu',
 	album : 'Fresh Media Records',
	released : '16-12-2022',
        music : 'https://hd1.djjohal.com/320/514828/2%20Percent%20-%20Garry%20Sandhu%20(DJJOhAL.Com).mp3'
     },
	{
        img : 'https://lq.djjohal.com/covers/728913/Stampede.jpg',
        name : 'Stampede',
        artist : 'Pavitar Lassoi',
 	album : 'Times Music',
        music : 'https://hd1.djjohal.com/320/514824/Stampede%20-%20Pavitar%20Lassoi%20(DJJOhAL.Com).mp3'
     },
	{
	img : 'https://lq.djjohal.com/covers/728904/Good%20Luck.jpg',
        name : 'Good Luck',
	artist : 'Jordan Sandhu',
 	album : 'Times Music',
        music : 'https://hd1.djjohal.com/320/514810/Good%20Luck%20-%20Jordan%20Sandhu%20(DJJOhAL.Com).mp3'
      },
	{
	img : 'https://lq.djjohal.com/covers/728892/Raule.jpg',
        name : 'Raule',
	artist : 'Mani Sandhu',
 	album : 'Golden Tunes',
        music : 'https://hd1.djjohal.com/320/514798/Raule%20-%20Mani%20Sandhu%20(DJJOhAL.Com).mp3'
      },
	{
        img : 'https://lq.djjohal.com/covers/728880/Bet%20On%20Me.jpg',
        name : 'Bet On Me',
        artist : 'Jerry',
	album : 'VIP Records Ltd',
        music : 'https://lq.djjohal.com/48/514779/Bet%20On%20Me%20-%20Jerry%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728873/The%20Lion.jpg',
        name : 'The Lion',
        artist : 'Varinder Brar',
	album : 'Varinder Brar Music',
        music : 'https://hd1.djjohal.com/320/514772/The%20Lion%20-%20Varinder%20Brar%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728839/DONT%20YOU%20KNOW.jpg',
        name : 'SUPREME',
        artist : 'Amrit Maan',
	album : 'XPENSIVE',
        music : 'https://hd1.djjohal.com/320/514725/SUPREME%20-%20Amrit%20Maan%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728843/Lalkaare.jpg',
        name : 'Lalkaare',
        artist : 'Harjot , Deepak Dhillon',
	album : 'True Music',
        music : 'https://hd1.djjohal.com/320/514729/Lalkaare%20-%20Harjot%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728845/Landlord.jpg',
        name : 'Landlord',
        artist : 'Geeta Zaildar',
	album : 'T-Series',
        music : 'https://hd1.djjohal.com/320/514731/Landlord%20-%20Geeta%20Zaildar%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728833/Amsterdam.jpg',
        name : 'Amsterdam',
        artist : 'Jaz Dhami',
	album : 'Jaz Dhami Music',
        music : 'https://hd1.djjohal.com/320/514701/Amsterdam%20-%20Jaz%20Dhami%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728839/DONT%20YOU%20KNOW.jpg',
        name : 'DONT YOU KNOW',
        artist : 'Amrit Maan',
	album : 'XPENSIVE',
        music : 'https://hd1.djjohal.com/320/514722/DONT%20YOU%20KNOW%20-%20Amrit%20Maan%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728802/Slang.jpg',
        name : 'Slang',
        artist : 'Mani Longia',
	album : 'Single Track Studios',
        music : 'https://hd1.djjohal.com/320/514655/Slang%20-%20Mani%20Longia%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728793/2NI.jpg',
        name : '2NI',
        artist : 'Garry Sandhu',
	album : 'Fresh Media Records',
        music : 'https://hd1.djjohal.com/320/514643/2NI%20-%20Garry%20Sandhu%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728796/3%20-%204%20Yaar.jpg',
        name : '3 - 4 Yaar',
        artist : 'Karaj Randhawa',
	album : 'Karaj Randhawa Music',
        music : 'https://hd1.djjohal.com/320/514646/3%20%204%20Yaar%20-%20Karaj%20Randhawa%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728780/Her.jpg',
        name : 'Her',
        artist : 'Shubh',
	album : 'Shubh Music',
        music : 'https://hd1.djjohal.com/320/514625/Her%20-%20Shubh%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728781/Tu%20He%20Dass.jpg',
        name : 'Tu He Dass',
        artist : 'Harvi',
	album : 'Bang Music',
        music : 'https://hd1.djjohal.com/320/514626/Tu%20He%20Dass%20-%20Harvi%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728776/Taur%20Tappa.jpg',
        name : 'Taur Tappa',
        artist : 'Shooter Kahlon',
        music : 'https://hd1.djjohal.com/320/514621/Taur%20Tappa%20-%20Shooter%20Kahlon%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728772/Best%20Friends.jpg',
        name : 'Best Friends',
        artist : 'The Landers & Guri Singh',
        music : 'https://hd1.djjohal.com/320/514617/Best%20Friends%20-%20The%20Landers%20%20Guri%20Singh%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728761/Jatt%20Life%20Zone.jpg',
        name : 'Jatt Life Zone',
        artist : 'Varinder Brar',
        music : 'https://hd1.djjohal.com/320/514606/Jatt%20Life%20Zone%20-%20Varinder%20Brar%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728765/Rude%20Boy.jpg',
        name : 'Rude Boy',
        artist : 'Jazzy B',
        music : 'https://hd1.djjohal.com/320/514610/Rude%20Boy%20-%20Jazzy%20B%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://i.imgur.com/b7k4od1.jpg',
        name : 'On Top',
        artist : 'Karan Aujla',
        music : 'https://hd1.djjohal.com/320/514579/On%20Top%20-%20Karan%20Aujla%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://i.imgur.com/2AyYePC.jpg',
        name : '10 Outta 10',
        artist : 'Amrit Maan & Shipra Goyal',
        music : 'https://hd1.djjohal.com/320/514582/10%20Outta%2010%20-%20Amrit%20Maan%20%20Shipra%20Goyal%20(DJJOhAL.Com).mp3'
    },
       {
        img : 'https://lq.djjohal.com/covers/728730/Enigma.jpg',
        name : 'Enigma',
        artist : 'Tarsem Jassar',
        music : 'https://hd1.djjohal.com/320/514552/Enigma%20-%20Tarsem%20Jassar%20(DJJOhAL.Com).mp3'
    },
       {
        img : 'https://lq.djjohal.com/covers/728750/WYTB.jpg',
        name : 'WYTB',
        artist : 'Karan Aujla & Gurlez Akhtar',
        music : 'https://hd1.djjohal.com/320/514580/WYTB%20-%20Karan%20Aujla%20%20Gurlez%20Akhtar%20(DJJOhAL.Com).mp3'
    },
       {
        img : 'https://lq.djjohal.com/covers/728751/Blast.jpg',
        name : 'Blast',
        artist : 'R. Nait & Gurlez Akhtar',
        music : 'https://hd1.djjohal.com/320/514581/Blast%20-%20R%20Nait%20%20Gurlez%20Akhtar%20(DJJOhAL.Com).mp3'
    },
       {
        img : 'https://lq.djjohal.com/covers/728396/Faizal.jpg',
        name : 'Faizal',
        artist : 'Varinder Brar',
	album : 'Varinder Brar Music',
        music : 'https://hd1.djjohal.com/320/514076/Faizal%20-%20Varinder%20Brar%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728738/So%20Mean.jpg',
        name : 'So Mean',
        artist : 'Navaan Sandhu',
        music : 'https://hd1.djjohal.com/320/514568/So%20Mean%20-%20Navaan%20Sandhu%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728739/Sifat.jpg',
        name : 'Sifat',
        artist : 'Nirvair Pannu',
        music : 'https://hd1.djjohal.com/320/514569/Sifat%20-%20Nirvair%20Pannu%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728741/Aho%20Aho.jpg',
        name : 'Aho Aho',
        artist : 'Gur Sidhu & Sultaan',
        music : 'https://hd1.djjohal.com/320/514571/Aho%20Aho%20-%20Gur%20Sidhu%20%20Sultaan%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728716/Ailaan.jpg',
        name : 'Ailaan',
        artist : 'Gulab Sidhu , Gur Sidhu',
        music : 'https://hd1.djjohal.com/320/514529/Ailaan%20-%20Gulab%20Sidhu%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728419/The%20Umbrella%20Song.jpg',
        name : 'The Umbrella Song',
        artist : 'Bilal Saeed Ft. Fateh',
	album: 'One Two Records',
        music : 'https://hd1.djjohal.com/320/514106/The%20Umbrella%20Song%20-%20Bilal%20Saeed%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728332/2%20Velly.jpg',
        name : '2 Velly',
        artist : 'Harvi & Veer Sandhu',
	album: 'Tree Music Labe',
        music : 'https://hd1.djjohal.com/320/514005/2%20Velly%20-%20Harvi%20%20Veer%20Sandhu%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728715/Blona%20Shad%20Ta.jpg',
        name : 'Blona Shad Ta',
        artist : 'Guntaj Dandiwal, Korala Maan & Desi Crew',
        music : 'https://hd1.djjohal.com/320/514528/Blona%20Shad%20Ta%20-%20Guntaj%20Dandiwal%20(DJJOhAL.Com).mp3'
    },
	{
        img : 'https://lq.djjohal.com/covers/728712/Same%20Same.jpg',
        name : 'Same Same',
        artist : 'Singga',
        music : 'https://hd1.djjohal.com/320/514525/Same%20Same%20-%20Singga%20(DJJOhAL.Com).mp3'
    },
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
        img : 'https://lq.djjohal.com/covers/728688/Geet%20Banuga.jpg',
        name : 'Geet Banuga',
        artist : 'Kaka',
        music : 'https://hd1.djjohal.com/320/514485/Geet%20Banuga%20-%20Kaka%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728455/Real%20Talks.jpg',
        name : 'Real Talks',
        artist : 'Dilbag Sandhu',
        music : 'https://hd1.djjohal.com/320/514146/Real%20Talks%20-%20Dilbag%20Sandhu%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728673/Hustler.jpg',
        name : 'Hustler',
        artist : 'Sukh Lotey',
        music : 'https://hd1.djjohal.com/320/514470/Hustler%20-%20Sukh%20Lotey%20(DJJOhAL.Com).mp3'
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
        img : 'https://lq.djjohal.com/covers/728423/Dekhya%20Kite.jpg',
        name : 'Dekhya Kite',
        artist : 'Davy',
        music : 'https://hd1.djjohal.com/320/514113/Dekhya%20Kite%20-%20Davy%20(DJJOhAL.Com).mp3'
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
        artist : 'Ninja & Deep Jandu',
        music : 'https://hd1.djjohal.com/320/514296/Ak%2047%20-%20Ninja%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728517/AK%20Di%20Barrel.jpg',
        name : 'AK Di Barrel',
        artist : 'Himmat Sandhu',
        music : 'https://hd1.djjohal.com/320/514255/AK%20Di%20Barrel%20-%20Himmat%20Sandhu%20(DJJOhAL.Com).mp3'
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
    },
    {
        img : 'https://lq.djjohal.com/covers/728506/Trust.jpg',
        name : 'Trust',
        artist : 'Nseeb',
        music : 'https://hd1.djjohal.com/320/514241/Trust%20-%20Nseeb%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728500/Balle%20Jatta.jpg',
        name : 'Balle Jatta',
        artist : 'Diljit Dosanjh',
        music : 'https://hd1.djjohal.com/320/514225/Balle%20Jatta%20-%20Diljit%20Dosanjh%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728483/Mehflan.jpg',
        name : 'Mehflan',
        artist : 'Kulbir Jhinjer',
        music : 'https://hd1.djjohal.com/320/514208/Mehflan%20-%20Kulbir%20Jhinjer%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728480/25-25.jpg',
        name : '25-25',
        artist : 'Arjan Dhillon',
        music : 'https://hd1.djjohal.com/320/514194/2525%20-%20Arjan%20Dhillon%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728717/Gall%20Mukk%20Gyi.jpg',
        name : 'Gall Mukk Gyi',
        artist : 'Nimrat Khaira',
        music : 'https://hd1.djjohal.com/320/514530/Gall%20Mukk%20Gyi%20-%20Nimrat%20Khaira%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728713/Jaane%20Meriye.jpg',
        name : 'Jaane Meriye',
        artist : 'Akhil',
        music : 'https://hd1.djjohal.com/320/514526/Jaane%20Meriye%20-%20Akhil%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728619/Kam%20Lout.jpg',
        name : 'Kam Lout',
        artist : 'A Kay',
        music : 'https://hd1.djjohal.com/320/514401/Kam%20Lout%20-%20A%20Kay%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728612/High%20Life.jpg',
        name : 'High Life',
        artist : 'Jass Bajwa',
        music : 'https://hd1.djjohal.com/320/514390/High%20Life%20-%20Jass%20Bajwa%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728492/Mehrma.jpg',
        name : 'Mehrma',
        artist : 'The PropheC',
        music : 'https://hd1.djjohal.com/320/514217/Mehrma%20-%20The%20PropheC%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728489/Detail.jpg',
        name : 'Detail',
        artist : 'Amrit Maan',
        music : 'https://hd1.djjohal.com/320/514214/Detail%20-%20Amrit%20Maan%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728468/Snowfall.jpg',
        name : 'Snowfall',
        artist : 'Jordan Sandhu',
        music : 'https://hd1.djjohal.com/320/514180/Snowfall%20-%20Jordan%20Sandhu%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728363/Ferozi%20Koka.jpg',
        name : 'Ferozi Koka',
        artist : 'Ranjit Bawa',
	album : 'Cocktail Music',
        music : 'https://hd1.djjohal.com/320/514037/Ferozi%20Koka%20-%20Ranjit%20Bawa%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728459/6%20L.jpg',
        name : '6 L',
        artist : 'Tarsem Jassar & Kulbir Jhinjer',
        music : 'https://hd1.djjohal.com/320/514151/6%20L%20-%20Tarsem%20Jassar%20%20Kulbir%20Jhinjer%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728421/Trouble%20Maker.jpg',
        name : 'Trouble Maker',
        artist : 'Jassa',
        music : 'https://hd1.djjohal.com/320/514111/Trouble%20Maker%20-%20Jassa%20Dhillon%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728398/Blood%20Talks.jpg',
        name : 'Blood Talks',
        artist : 'Jordan Sandhu & Zikar Sandhu',
        music : 'https://hd1.djjohal.com/320/514078/Blood%20Talks%20-%20Jordan%20Sandhu%20%20Zikar%20Sandhu%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728375/Jugni.jpg',
        name : 'Jugni',
        artist : 'Diljit Dosanjh & Diamond Platnumz',
        music : 'https://hd1.djjohal.com/320/514054/Jugni%20-%20Diljit%20Dosanjh%20%20Diamond%20Platnumz%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728305/DOABA.jpg',
        name : 'DOABA',
        artist : 'Garry Sandhu',
        music : 'https://hd1.djjohal.com/320/513974/DOABA%20-%20Garry%20Sandhu%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728292/Mobster.jpg',
        name : 'Mobster',
        artist : 'Singga Ft. Deep Jandu',
        music : 'https://hd1.djjohal.com/320/513961/Mobster%20-%20Singga%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728280/Grace.jpg',
        name : 'Grace',
        artist : 'Gurnam Bhullar',
        music : 'https://hd1.djjohal.com/320/513937/Grace%20-%20Gurnam%20Bhullar%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728276/Dont%20You.jpg',
        name : 'Dont You',
        artist : 'Jassa Dhillon',
        music : 'https://hd1.djjohal.com/320/513933/Dont%20You%20-%20Jassa%20Dhillon%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/725876/All%20Ace.jpg',
        name : 'All Ace',
        artist : 'Prem Dhillon Ft. Byg Byrd',
	album : 'Prem Dhillon Music',
        music : 'https://hd1.djjohal.com/320/510852/All%20Ace%20-%20Prem%20Dhillon%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/726961/94%20Flow.jpg',
        name : '94 Flow',
        artist : 'Big Boi Deep Ft. Byg Byrd',
	album : 'Brown Boys Records',
        music : 'https://hd1.djjohal.com/320/512220/94%20Flow%20-%20Big%20Boi%20Deep%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://i.imgur.com/KjweaqA.jpg',
        name : 'Kaala Ghoda',
        artist : 'Amrit Maan Ft. Divine',
	album : 'Times Music',
        music : 'https://hd1.djjohal.com/320/507330/Kaala%20Ghoda%20Ft%20Divine%20Original%20-%20Amrit%20Maan%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/722291/Eddan%20Ni%20Ft.%20Bohemia.jpg',
        name : 'Eddan Ni',
        artist : 'Amrit Maan Ft. Bohemia',
	album : 'Bang Music',
        music : 'https://hd1.djjohal.com/320/506266/Eddan%20Ni%20Ft%20Bohemia%20-%20Amrit%20Maan%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/727137/LA.jpg',
        name : 'LA',
        artist : 'Nirvair Pannu',
	album : 'Juke Dock',
        music : 'https://hd1.djjohal.com/320/512420/LA%20-%20Nirvair%20Pannu%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728273/Koka.jpg',
        name : 'Koka',
        artist : 'Diljit Dosanjh',
        music : 'https://hd1.djjohal.com/320/513929/Koka%20-%20Diljit%20Dosanjh%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728257/Jionda%20Reh.jpg',
        name : 'Jionda Reh',
        artist : 'Prabh Gill',
        music : 'https://hd1.djjohal.com/320/513904/Jionda%20Reh%20-%20Prabh%20Gill%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728244/Yaad.jpg',
        name : 'Yaad',
        artist : 'Jassa Dhillon',
        music : 'https://hd1.djjohal.com/320/513883/Yaad%20-%20Jassa%20Dhillon%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728233/Wrong%20Report.jpg',
        name : 'Wrong Report',
        artist : 'Korala Maan',
        music : 'https://hd1.djjohal.com/320/513865/Wrong%20Report%20-%20Korala%20Maan%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728216/Hanji%20Hanji.jpg',
        name : 'Hanji Hanji',
        artist : 'Amrit Maan',
        music : 'https://hd1.djjohal.com/320/513848/Hanji%20Hanji%20-%20Amrit%20Maan%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728207/Swag.jpg',
        name : 'Swag',
        artist : 'Tarsem Jassar',
        music : 'https://hd1.djjohal.com/320/513838/Swag%20-%20Tarsem%20Jassar%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/722003/Ayen%20Kiven%20Ft.%20Amrit%20Maan.jpg',
        name : 'Ayen Kiven',
        artist : 'Gippy Grewal Ft. Amrit Maan',
	album : 'Geet MP3',
        music : 'https://hd1.djjohal.com/320/505918/Ayen%20Kiven%20Ft%20Amrit%20Maan%20-%20Gippy%20Grewal%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/724892/Mashup.jpg',
        name : 'Mashup',
        artist : 'Amantej Hundal',
        music : 'https://hd1.djjohal.com/320/509586/Mashup%20-%20Amantej%20Hundal%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/727349/The%20Last%20Ride.jpg',
        name : 'The Last Ride',
        artist : 'Sidhu Moose Wala',
        music : 'https://hd1.djjohal.com/320/512702/The%20Last%20Ride%20-%20Sidhu%20Moose%20Wala%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/725500/Offshore.jpg',
        name : 'Offshore',
        artist : 'Shubh',
        music : 'https://hd1.djjohal.com/320/510383/Offshore%20-%20Shubh%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/725027/Holiday.jpg',
        name : 'Holiday',
        artist : 'Garry Sandhu',
	album : 'Fresh Media Records',
        music : 'https://hd1.djjohal.com/320/509797/Holiday%20-%20Garry%20Sandhu%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/725027/Holiday.jpg',
        name : 'Fitoor',
        artist : 'Garry Sandhu',
	album : 'Fresh Media Records',
        music : 'https://hd1.djjohal.com/320/509794/Fitoor%20-%20Garry%20Sandhu%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/723217/Munda%20Takda.jpg',
        name : 'Munda Takda',
        artist : 'Nirvair Pannu',
	album : 'Juke Dock',
        music : 'https://hd1.djjohal.com/320/507279/Munda%20Takda%20-%20Nirvair%20Pannu%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/727181/Sunburn.jpg',
        name : 'Sunburn',
        artist : 'Pavitar Lassoi',
        music : 'https://hd1.djjohal.com/320/512482/Sunburn%20-%20Pavitar%20Lassoi%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/727699/Call.jpg',
        name : 'Call',
        artist : 'Nirvair Pannu',
        music : 'https://hd1.djjohal.com/320/513130/Call%20-%20Nirvair%20Pannu%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/718916/Tu%20Hi%20Ah.jpg',
        name : 'Tu Hi Ah',
        artist : 'The Prophec',
	album : 'The Prophec Music',
        music : 'https://hd1.djjohal.com/320/502078/Tu%20Hi%20Ah%20-%20The%20Prophec%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/68304/Raat%20Di%20Gedi-Peg%20Di%20Waashna%20Mashup.jpg',
        name : 'Raat Di Gedi-Peg Di Waashna Mashup',
        artist : 'Diljit Dosanjh & Amrit Maan',
	album : 'Speed Records',
        music : 'https://hd1.djjohal.com/320/496406/Raat%20Di%20GediPeg%20Di%20Waashna%20Mashup%20-%20Diljit%20Dosanjh%20%20Amrit%20Maan%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728001/Plug%20Talk.jpg',
        name : 'Plug Talk',
        artist : 'Navaan Sandhu',
        music : 'https://hd1.djjohal.com/320/513558/Plug%20Talk%20-%20Navaan%20Sandhu%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728164/Baller.jpg',
        name : 'Baller',
        artist : 'Shubh',
        music : 'https://hd1.djjohal.com/320/513781/Baller%20-%20Shubh%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728727/Its%20a%20Good%20Day.jpg',
        name : 'Its a Good Day',
        artist : 'Amantej Hundal',
        music : 'https://hd1.djjohal.com/320/514546/Its%20a%20Good%20Day%20-%20Amantej%20Hundal%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/725501/Elevated.jpg',
        name : 'Elevated',
        artist : 'Shubh',
        music : 'https://hd1.djjohal.com/320/510384/Elevated%20-%20Shubh%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728269/Gun%20n%20Mic.jpg',
        name : 'Gun n Mic',
        artist : 'Amantej Hundal',
        music : 'https://hd1.djjohal.com/320/513925/Gun%20n%20Mic%20-%20Amantej%20Hundal%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728871/Gaddi%20Red%20Challenger.jpg',
        name : 'Gaddi Red Challenger',
        artist : 'Babbu',
        music : 'https://hd1.djjohal.com/320/514770/Gaddi%20Red%20Challenger%20-%20Babbulicious%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/725368/Lakh%20Rupiya.jpg',
        name : 'Lakh Rupiya',
        artist : 'Veer Sandhu',
	album : 'Punjab Central Channel',
        music : 'https://hd1.djjohal.com/320/510236/Lakh%20Rupiya%20-%20Veer%20Sandhu%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728152/Kajla.jpg',
        name : 'Kajla',
        artist : 'Jassa Dhillon & Pavitar Lassoih',
	album : 'Jassa Dhillon Music',
        music : 'https://hd1.djjohal.com/320/513769/Kajla%20-%20Jassa%20Dhillon%20%20Pavitar%20Lassoi%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/725573/Too%20Much.jpg',
        name : 'Too Much',
        artist : 'Garry Sandhu',
	album : 'Fresh Media Records',
        music : 'https://hd1.djjohal.com/320/510485/Too%20Much%20-%20Garry%20Sandhu%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/723316/Dont%20Know%20Why%20Ft.%20Byg%20Byrd.jpg',
        name : 'Dont Know Why',
        artist : 'Nirvair Pannu Ft. Byg Byrd',
	album : 'Single Track Studio',
        music : 'https://hd1.djjohal.com/320/507430/Dont%20Know%20Why%20Ft%20Byg%20Byrd%20-%20Nirvair%20Pannu%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/726750/Shadow.jpg',
        name : 'Shadow',
        artist : 'Jassa Dhillon',
	album : 'Jassa Dhillon Music',
        music : 'https://hd1.djjohal.com/320/511960/Shadow%20-%20Jassa%20Dhillon%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/723322/Koka.jpg',
        name : 'Koka',
        artist : 'Ranjit Bawa',
	album : 'Brand B',
        music : 'https://hd1.djjohal.com/320/507450/Koka%20-%20Ranjit%20Bawa%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/49802/Yaari%20Chandigarh%20Waliye%20(Trap%20Mix).jpg',
        name : 'Yaari Chandigarh Waliye',
        artist : 'Ranjit Bawa, TaTva',
	album : 'Trap Mix',
        music : 'https://hd1.djjohal.com/320/468482/Yaari%20Chandigarh%20Waliye%20Trap%20Mix%20-%20Ranjit%20Bawa%20TaTva%20K%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/723849/80%2090%20Ft.%20Ikky.jpg',
        name : '80 90',
        artist : 'Amrit Maan & Garry Sandhu Ft. Ikky',
	album : '4N Records Inc',
        music : 'https://hd1.djjohal.com/320/508146/80%2090%20Ft%20Ikky%20-%20Amrit%20Maan%20%20Garry%20Sandhu%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/723187/Above%20All%20Ft.%20Gur%20Sidhu.jpg',
        name : 'Above All',
        artist : 'Jassa Dhillon Ft. Gur Sidhu',
	album : 'Browntown Entertainment Ltd.',
        music : 'https://hd1.djjohal.com/320/507249/Above%20All%20Ft%20Gur%20Sidhu%20-%20Jassa%20Dhillon%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728191/Gaddi%20Vich.jpg',
        name : 'Gaddi Vich',
        artist : 'Dilpreet Dhillon & Kuar B',
	album : 'Times Music',
        music : 'https://hd1.djjohal.com/320/513819/Gaddi%20Vich%20-%20Dilpreet%20Dhillon%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728117/Band%20Theke.jpg',
        name : 'Band Theke',
        artist : 'Jordan Sandhu',
	album : 'Times Music',
        music : 'https://hd1.djjohal.com/320/513723/Band%20Theke%20-%20Jordan%20Sandhu%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/728113/Just%20Round.jpg',
        name : 'Just Round',
        artist : 'Jass Bajwa',
	album : 'Mee Muzic',
        music : 'https://hd1.djjohal.com/320/513708/Just%20Round%20-%20Jass%20Bajwa%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/722175/Mutiyaare%20Ni%20Ft.%20Bohemia.jpg',
        name : 'Mutiyaare Ni',
        artist : 'Jassa Dhillon Ft. Bohemia',
	album : 'Saga Music & YRF',
        music : 'https://hd1.djjohal.com/320/506136/Mutiyaare%20Ni%20Ft%20Bohemia%20-%20Jassa%20Dhillon%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/727948/Right%20Left.jpg',
        name : 'Right Left',
        artist : 'Kulwinder Billa',
	album : 'Times Music',
        music : 'https://hd1.djjohal.com/320/513475/Right%20Left%20-%20Kulwinder%20Billa%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/727800/Patake.jpg',
        name : 'Patake',
        artist : 'Khan Bhaini & Gurlez Akhtar',
	album : 'Single Track Studio',
        music : 'https://hd1.djjohal.com/320/513275/Patake%20-%20Khan%20Bhaini%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/727286/Kuwait%20Wala%20Koka.jpg',
        name : 'Kuwait Wala Koka',
        artist : 'Gurman Sandhu & Baani Sandhue',
	album : 'Desi Junction',
        music : 'https://hd1.djjohal.com/320/512621/Kuwait%20Wala%20Koka%20-%20Gurman%20Sandhu%20%20Baani%20Sandhu%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/721433/Faraar%20Ft.%20Gur%20Sidhu.jpg',
        name : 'Faraar',
        artist : 'Jassa Dhillon Ft. Gur Sidhu',
	album : 'Brown Town Music',
        music : 'https://hd1.djjohal.com/320/505234/Faraar%20Ft%20Gur%20Sidhu%20-%20Jassa%20Dhillon%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/727060/Nain.jpg',
        name : 'Nain',
        artist : 'Dilpreet Dhillon Ft. Mehar Vaani',
	album : 'White Hill Music',
        music : 'https://hd1.djjohal.com/320/512335/Nain%20-%20Dilpreet%20Dhillon%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/723254/IDGAF%20Ft.%20Asli%20Maharaja.jpg',
        name : 'IDGAF',
        artist : 'Sidhu Moose Wala Ft. Asli Maharaja',
	album : 'Sidhu Moose Wala',
        music : 'https://hd1.djjohal.com/320/507346/IDGAF%20Ft%20Asli%20Maharaja%20-%20Sidhu%20Moose%20Wala1%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/727012/Tej%20Mitha.jpg',
        name : 'Tej Mitha',
        artist : 'Deep Bajwa',
	album : 'Team 7 Picture',
        music : 'https://hd1.djjohal.com/320/512275/Tej%20Mitha%20-%20Deep%20Bajwa%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/720423/Low%20Rider.jpg',
        name : 'Low Rider',
        artist : 'Jassa Dhillon',
	album : 'Brown Town Music',
        music : 'https://hd1.djjohal.com/320/504054/Low%20Rider%20-%20Jassa%20Dhillon%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/726849/Dil%20Mangeya.jpg',
        name : 'Dil Mangeya',
        artist : 'Sajjan Adeeb',
	album : 'Sajjan Adeeb Music',
        music : 'https://hd1.djjohal.com/320/512080/Dil%20Mangeya%20-%20Sajjan%20Adeeb%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/726830/Shehar%20Vichon%20Geda.jpg',
        name : 'Shehar Vichon Geda',
        artist : 'Jordan Sandhu',
	album : 'Times Music',
        music : 'https://hd1.djjohal.com/320/512061/Shehar%20Vichon%20Geda%20-%20Jordan%20Sandhu%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/726106/Jatt%20Flex.jpg',
        name : 'Jatt Flex',
        artist : 'Amrit Maan',
	album : 'Cocktail Music',
        music : 'https://hd1.djjohal.com/320/511151/Jatt%20Flex%20-%20Amrit%20Maan%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/725994/Black%20Effect.jpg',
        name : 'Black Effect',
        artist : 'Jordan Sandhu',
	album : 'Times Music',
        music : 'https://hd1.djjohal.com/320/510999/Black%20Effect%20-%20Jordan%20Sandhu%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/725816/Kul%20Milake%20Jatt.jpg',
        name : 'Kul Milake Jatt',
        artist : 'Gurnam Bhullar',
	album : 'Desi Junction',
        music : 'https://hd1.djjohal.com/320/510776/Kul%20Milake%20Jatt%20-%20Gurnam%20Bhullar%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/725561/Sira%20Ft.%20Shipra%20Goyal.jpg',
        name : 'Sira',
        artist : 'Dilpreet Dhillon, Shipra Goyal',
	album : 'Times Music',
        music : 'https://hd1.djjohal.com/320/510473/Sira%20Ft%20Shipra%20Goyal%20-%20Dilpreet%20Dhillon%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/725551/Teri%20Life%20Meri%20Life%20Ft.%20Kaur%20B.jpg',
        name : 'Teri Life Meri Life',
        artist : 'R Nait & Kaur B',
	album : 'Times Music',
        music : 'https://hd1.djjohal.com/320/510450/Teri%20Life%20Meri%20Life%20Ft%20Kaur%20B%20-%20R%20Nait%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/725502/What%20Ve.jpg',
        name : 'What Ve',
        artist : 'Diljit Dosanjh & Nimrat Khaira',
	album : 'Diljit Dosanjh Music',
        music : 'https://hd1.djjohal.com/320/510385/What%20Ve%20-%20Diljit%20Dosanjh%20%20Nimrat%20Khaira%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/718263/Sohne%20Lagde%20Ft.%20The%20Prophec.jpg',
        name : 'Sohne Lagde ',
        artist : 'Sidhu Moose Wala Ft. The Prophec',
	album : 'Sidhu Moose Wala Music',
        music : 'https://hd1.djjohal.com/320/501163/Sohne%20Lagde%20Ft%20The%20Prophec%20-%20Sidhu%20Moose%20Wala1%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/724582/Loud.jpg',
        name : 'Loud',
        artist : 'Ranjit Bawa',
	album : 'Loud',
        music : 'https://hd1.djjohal.com/320/509156/Loud%20-%20Ranjit%20Bawa%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/720561/My%20Block.jpg',
        name : 'My Block',
        artist : 'Sidhu Moose Wala',
	album : 'Sidhu Moose Wala',
        music : 'https://hd1.djjohal.com/320/504228/My%20Block%20-%20Sidhu%20Moose%20Wala1%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/723626/Be%20Ready%20Ft.%20Desi%20Crew.jpg',
        name : 'Be Ready',
        artist : 'Ninja Ft. Desi Crew',
	album : 'Happy Raikoti Music',
        music : 'https://hd1.djjohal.com/320/507830/Be%20Ready%20Ft%20Desi%20Crew%20-%20Ninja%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/723058/Jatt%20Te%20Jawani.jpg',
        name : 'Jatt Te Jawani',
        artist : 'Dilpreet Dhillon & Karan Aujla',
	album : 'Times Music',
        music : 'https://hd1.djjohal.com/320/507096/Jatt%20Te%20Jawani%20-%20Dilpreet%20Dhillon%20%20Karan%20Aujla%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/719510/Yaara%20Tu%20Ft.%20The%20Prophec.jpg',
        name : 'Yaara Tu',
        artist : 'The Prophec Ft. Ezu',
	album : 'VIP Records',
        music : 'https://hd1.djjohal.com/320/502907/Yaara%20Tu%20Ft%20The%20Prophec%20-%20Ezu%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/719510/Yaara%20Tu%20Ft.%20The%20Prophec.jpg',
        name : 'B Town',
        artist : 'Sidhu Moose Wala & Sunny Malton',
	album : 'Sidhu Moose Wala',
        music : 'https://hd1.djjohal.com/320/502532/B%20Town%20Original%20-%20Sidhu%20Moose%20Wala%20%20Sunny%20Malton%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/721277/Bandook.jpg',
        name : 'Bandook',
        artist : 'Nirvair Pannu',
	album : 'Juke Dock',
        music : 'https://hd1.djjohal.com/320/505031/Bandook%20-%20Nirvair%20Pannu%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/70408/East%20Side%20Flow%20Ft.%20Byg%20Byrd.jpg',
        name : 'East Side Flow',
        artist : 'Sidhu Moose Wala',
	album : 'Sidhu Moose Wala',
        music : 'https://hd1.djjohal.com/320/499274/East%20Side%20Flow%20Ft%20Byg%20Byrd%20-%20Sidhu%20Moose%20Wala1%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/70619/Sidhus%20Anthem%20Ft.%20Byg%20Byrd.jpg',
        name : 'Sidhus Anthem',
        artist : 'Sidhu Moose Wala',
	album : 'Sidhu Moose Wala',
        music : 'https://hd1.djjohal.com/320/499601/Sidhus%20Anthem%20Ft%20Byg%20Byrd%20-%20Sidhu%20Moose%20Wala%20%20Sunny%20Malton%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/722476/City%20Of%20Gold.jpg',
        name : 'City Of Gold',
        artist : 'Nirvair Pannu',
	album : 'Juke Dock',
        music : 'https://hd1.djjohal.com/320/506462/City%20Of%20Gold%20-%20Nirvair%20Pannu%20(DJJOhAL.Com).mp3'
    },
    {
        img : 'https://lq.djjohal.com/covers/724084/Balle%20Balle.jpg',
        name : 'Balle Balle',
        artist : 'Nirvair Pannu',
	album : 'Juke Dock',
        music : 'https://hd1.djjohal.com/320/508486/Balle%20Balle%20-%20Nirvair%20Pannu%20(DJJOhAL.Com).mp3'
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
            { src: 'https://assets.codepen.io/4358584/1.300.jpg', sizes: '96x96', type: 'image/png' },
                  { src: 'https://assets.codepen.io/4358584/1.300.jpg', sizes: '128x128', type: 'image/png' },
                   { src: 'https://assets.codepen.io/4358584/1.300.jpg', sizes: '192x192', type: 'image/png' },
                   { src: 'https://assets.codepen.io/4358584/1.300.jpg', sizes: '256x256', type: 'image/png' },
                   { src: 'https://assets.codepen.io/4358584/1.300.jpg', sizes: '384x384', type: 'image/png' },
                   { src: 'https://assets.codepen.io/4358584/1.300.jpg', sizes: '512x512', type: 'image/png' }
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
  }
}
