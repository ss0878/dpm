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
        img : 'https://lq.djjohal.com/covers/728730/Enigma.jpg',
        name : 'Enigma',
        artist : 'Tarsem Jassar',
        music : 'https://hd1.djjohal.com/320/514552/Enigma%20-%20Tarsem%20Jassar%20(DJJOhAL.Com).mp3'
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
        img : 'https://lq.djjohal.com/covers/727349/The%20Last%20Ride.jpg',
        name : 'The Last Ride',
        artist : 'Sidhu Moose Wala',
        music : 'https://hd1.djjohal.com/320/512702/The%20Last%20Ride%20-%20Sidhu%20Moose%20Wala%20(DJJOhAL.Com).mp3'
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
        img : 'https://lq.djjohal.com/covers/728001/Plug%20Talk.jpg',
        name : 'Plug Talk',
        artist : 'Navaan Sandhu',
        music : 'https://hd1.djjohal.com/320/513558/Plug%20Talk%20-%20Navaan%20Sandhu%20(DJJOhAL.Com).mp3'
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
