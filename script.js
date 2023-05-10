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
       img : 'https://cover.djpunjab.is/53748/300x700/Kath-Ft.-Sidhu-Moose-Wala-AI-Sidhu-Moose-Wala.jpg',
       name : 'Kath',
       artist : 'Sidhu Moose Wala Ft. AI',
       album : 'MRA',
       released : '10-5-2023',
       music : 'https://s320.djpunjab.is/data/320/53748/301978/Kath%20Ft.%20Sidhu%20Moose%20Wala%20AI%20-%20Sidhu%20Moose%20Wala.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53745/300x700/Jatta-Ve-The-Landers.jpg',
       name : 'Jatta Ve',
       artist : 'The Landers',
       album : 'Koinage Records',
       released : '10-5-2023',
       music : 'https://s320.djpunjab.is/data/320/53745/301975/Jatta%20Ve%20-%20The%20Landers.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53744/300x700/Picture-Perfect-Navaan-Sandhu.jpg',
       name : 'Picture Perfect',
       artist : 'Navaan Sandhu',
       album : 'Navaan Sandhu',
       released : '9-5-2023',
       music : 'https://s320.djpunjab.is/data/320/53744/301974/Picture%20Perfect%20-%20Navaan%20Sandhu.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53742/300x700/OMG-Amrit-Maan.jpg',
       name : 'OMG',
       artist : 'Amrit Maan',
       album : 'Amrit Maan',
       released : '8-5-2023',
       music : 'https://s320.djpunjab.is/data/320/53742/301972/OMG%20-%20Amrit%20Maan.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53738/300x700/No-F**ks-Given-Freestyle-Sidhu-Moose-Wala.jpg',
       name : 'No F**ks Given Freestyle',
       artist : 'Sidhu Moose Wala',
       album : 'Shah',
       released : '8-5-2023',
       music : 'https://s320.djpunjab.is/data/320/53738/301968/No%20F**ks%20Given%20Freestyle%20-%20Sidhu%20Moose%20Wala.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53726/300x700/Waaka-Nirvair-Pannu.jpg',
       name : 'Waaka',
       artist : 'Nirvair Pannu',
       album : 'Juke Dock',
       released : '5-5-2023',
       music : 'https://s320.djpunjab.is/data/320/53726/301956/Waaka%20-%20Nirvair%20Pannu.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53722/300x700/Hard-Knock-Life-Deep-Jandu.jpg',
       name : 'Hard Knock Life',
       artist : 'Deep Jandu',
       album : 'True Rebellion Music',
       released : '4-5-2023',
       music : 'https://s320.djpunjab.is/data/320/53722/301948/Hard%20Knock%20Life%20-%20Deep%20Jandu.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53723/300x700/Never-Before-Jordan-Sandhu.jpg',
       name : 'Jutti',
       artist : 'Jordan Sandhu',
       album : 'Never Before',
       released : '4-5-2023',
       music : 'https://p320.djpunjab.is/data/320/53723/301951/Jutti%20-%20Jordan%20Sandhu.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53723/300x700/Never-Before-Jordan-Sandhu.jpg',
       name : 'Najaare',
       artist : 'Jordan Sandhu',
       album : 'Never Before',
       released : '4-5-2023',
       music : 'https://p320.djpunjab.is/data/320/53723/301950/Najaare%20-%20Jordan%20Sandhu.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53723/300x700/Never-Before-Jordan-Sandhu.jpg',
       name : 'Rank 1',
       artist : 'Jordan Sandhu',
       album : 'Never Before',
       released : '4-5-2023',
       music : 'https://p320.djpunjab.is/data/320/53723/301949/Rank%201%20-%20Jordan%20Sandhu.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53716/300x700/We-Made-It-Parmish-Verma.jpg',
       name : 'We Made It',
       artist : 'Parmish Verma',
       album : 'Parmish Verma Films',
       released : '3-5-2023',
       music : 'https://s320.djpunjab.is/data/320/53716/301942/We%20Made%20It%20-%20Parmish%20Verma.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53699/300x700/Death-Row-Ninja.jpg',
       name : 'Death Row',
       artist : 'Ninja',
       album : 'Khaki Entertainmnet',
       released : '27-4-2023',
       music : 'https://s320.djpunjab.is/data/320/53699/301925/Death%20Row%20-%20Ninja.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53696/300x700/Busy-Getting-Paid-Ammy-Virk.jpg',
       name : 'Busy Getting Paid',
       artist : 'Ammy Virk Ft. Divine',
       album : 'Universal Music India',
       released : '26-4-2023',
       music : 'https://s320.djpunjab.is/data/320/53696/301922/Busy%20Getting%20Paid%20-%20Ammy%20Virk.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53695/300x700/Suba-Punjab-Sarrb.jpg',
       name : 'Suba Punjab',
       artist : 'Sarrb Ft. Azadd',
       album : 'Times Music',
       released : '26-4-2023',
       music : 'https://s320.djpunjab.is/data/320/53695/301921/Suba%20Punjab%20-%20Sarrb.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53659/300x700/All-Sorted-Guri-Singh.jpg',
       name : 'All Sorted',
       artist : 'Guri Singh',
       album : 'The Landers',
       released : '21-4-2023',
       music : 'https://s320.djpunjab.is/data/320/53659/301885/All%20Sorted%20-%20Guri%20Singh.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53633/300x700/Pinda-Aale-G-Sidhu.jpg',
       name : 'Pinda Aale',
       artist : 'G Sidhu Ft Naseeb',
       album : 'G Sidhu Production',
       released : '17-4-2023',
       music : 'https://s320.djpunjab.is/data/320/53633/301859/Pinda%20Aale%20-%20G%20Sidhu.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53631/300x700/My-Name-Jassi-Likhari.jpg',
       name : 'My Name',
       artist : 'Jassi Likhari',
       album : 'Jassi Likhari Music',
       released : '16-4-2023',
       music : 'https://s320.djpunjab.is/data/320/53631/301857/My%20Name%20-%20Jassi%20Likhari.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53620/300x700/Muchh-ft-Simar-Kaur-Dilpreet-Dhillon.jpg',
       name : 'Muchh',
       artist : 'Dilpreet Dhillon Ft Simar Kaur',
       album : 'Orrange Studioz',
       released : '15-4-2023',
       music : 'https://s320.djpunjab.is/data/320/53620/301846/Muchh%20Ft%20Simar%20Kaur%20-%20Dilpreet%20Dhillon.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53614/300x700/Kise-Naal-Ni-Bolda-Arjan-Dhillon.jpg',
       name : 'Kise Naal Ni Bolda',
       artist : 'Arjan Dhillon',
       album : 'Panj-abb Records',
       released : '14-4-2023',
       music : 'https://s320.djpunjab.is/data/320/53614/301840/Kise%20Naal%20Ni%20Bolda%20-%20Arjan%20Dhillon.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53608/300x700/Kunndhi-Muchhh-Ammy-Virk.jpg',
       name : 'Kunndhi Muchhh',
       artist : 'Ammy Virk',
       album : 'Rhythm Boyz',
       released : '12-4-2023',
       music : 'https://s320.djpunjab.is/data/320/53608/301834/Kunndhi%20Muchhh%20-%20Ammy%20Virk.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53607/300x700/Colourfull-Roban-Bal.jpg',
       name : 'Colourfull',
       artist : 'Roban Bal',
       album : 'Collab Music',
       released : '12-4-2023',
       music : 'https://s320.djpunjab.is/data/320/53607/301833/Colourfull%20-%20Roban%20Bal.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53603/300x700/Not-Mine-Pav-Dharia.jpg',
       name : 'Not Mine',
       artist : 'Pav Dharia',
       album : 'Pav Dharia Music',
       released : '12-4-2023',
       music : 'https://s320.djpunjab.is/data/320/53603/301829/Not%20Mine%20-%20Pav%20Dharia.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53600/300x700/Showstopper-Jerry.jpg',
       name : 'Showstopper',
       artist : 'Jerry',
       album : 'Jerry Music',
       released : '12-4-2023',
       music : 'https://s320.djpunjab.is/data/320/53600/301826/Showstopper%20-%20Jerry.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53596/300x700/Minna-Minna-Garry-Sandhu.jpg',
       name : 'Minna Minna',
       artist : 'Garry Sandhu',
       album : 'Fresh Media Records',
       released : '10-4-2023',
       music : 'https://s320.djpunjab.is/data/320/53596/301822/Minna%20Minna%20-%20Garry%20Sandhu.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53584/300x700/Rise-N-Shine-Mankirt-Aulakh.jpg',
       name : 'Rise N Shine',
       artist : 'Mankirt Aulakh',
       album : 'Orrange Studioz',
       released : '09-4-2023',
       music : 'https://s320.djpunjab.is/data/320/53584/301810/Rise%20N%20Shine%20-%20Mankirt%20Aulakh.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53575/300x700/Gang-Inderpal-Moga.jpg',
       name : 'Gang',
       artist : 'Inderpal Moga',
       album : 'Chani Nattan',
       released : '08-4-2023',
       music : 'https://s320.djpunjab.is/data/320/53575/301801/Gang%20-%20Inderpal%20Moga.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53573/300x700/Mera-Na-Sidhu-Moose-Wala.jpg',
       name : 'Mera Na',
       artist : 'Sidhu Moose Wala',
       album : 'Steel Banglez',
       released : '7-4-2023',
       music : 'https://s320.djpunjab.is/data/320/53573/301799/Mera%20Na%20-%20Sidhu%20Moose%20Wala.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53572/300x700/Routine-Gur-Sidhu.jpg',
       name : 'Routine',
       artist : 'Gur Sidhu Ft. Jasmine',
       album : 'Brown town Music',
       released : '7-4-2023',
       music : 'https://s320.djpunjab.is/data/320/53572/301798/Routine%20-%20Gur%20Sidhu.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53561/300x700/Rutbaa-Jordan-Sandhu.jpg',
       name : 'Rutbaa',
       artist : 'Jordan Sandhu',
       album : 'Orrange Studioz',
       released : '5-4-2023',
       music : 'https://s320.djpunjab.is/data/320/53561/301787/Rutbaa%20-%20Jordan%20Sandhu.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53512/300x700/Thaa-Varinder-Brar.jpg',
       name : 'Thaa',
       artist : 'Varinder Brar',
       album : 'Varinder Brar',
       released : '25-03-2023',
       music : 'https://s320.djpunjab.is/data/320/53512/301728/Thaa%20-%20Varinder%20Brar.mp3'
        },
	{
       img : 'https://i1.sndcdn.com/artworks-mf7Xi2K5jBV7DPqH-4VW06g-t500x500.jpg',
       name : 'Charged Up(Uddna Sapp)',
       artist : 'Jxggi',
       album : 'Jxggi Music',
       released : '22-03-2023',
       music : 'https://s320.djpunjab.is/data/320/53501/301714/Charged%20Up%20(Uddna%20Sapp)%20-%20Jxggi.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53485/300x700/Challa-Gurdas-Maan.jpg',
       name : 'Challa (2023)',
       artist : 'Gurdas Maan Ft. Diljit Dosanjh',
       album : 'Ikky',
       released : '19-03-2023',
       music : 'https://s320.djpunjab.is/data/320/53485/301698/Challa%20-%20Gurdas%20Maan.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53484/300x700/Night-Out-Arjan-Dhillon.jpg',
       name : 'Night Out',
       artist : 'Arjan Dhillon',
       album : 'Panj-aab Records',
       released : '19-03-2023',
       music : 'https://s320.djpunjab.is/data/320/53484/301697/Night%20Out%20-%20Arjan%20Dhillon.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53470/300x700/Ahhi-Kuj-Khatteya-Gurtaj.jpg',
       name : 'Ahhi Kuj Khatteya',
       artist : 'Gurtaj',
       album : 'The Landers Music',
       released : '16-03-2023',
       music : 'https://s320.djpunjab.is/data/320/53470/301679/Ahhi%20Kuj%20Khatteya%20-%20Gurtaj.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53429/300x700/Rebel-Inderpal-Moga.jpg',
       name : 'Rebel',
       artist : 'Inderpal Moga Ft. Fateh',
       album : 'WinWin Records',
       released : '10-03-2023',
       music : 'https://s320.djpunjab.is/data/320/53429/301631/Rebel%20-%20Inderpal%20Moga.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53414/300x700/Dilawara-The-Prophec.jpg',
       name : 'Dilawara',
       artist : 'The Prophec',
       album : 'Ezu',
       released : '08-03-2023',
       music : 'https://s320.djpunjab.is/data/320/53414/301616/Dilawara%20-%20The%20Prophec.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53410/300x700/Outta-Reach-Prince-Narula.jpg',
       name : 'Outta Reach',
       artist : 'Prince Narula',
       album : 'Jaymeet',
       released : '08-03-2023',
       music : 'https://s320.djpunjab.is/data/320/53410/301612/Outta%20Reach%20-%20Prince%20Narula.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53408/300x700/Ittar-Jasmine-Sandlas.jpg',
       name : 'Ittar',
       artist : 'Jasmine Sandlas',
       album : 'B Praak',
       released : '08-03-2023',
       music : 'https://s320.djpunjab.is/data/320/53408/301610/Ittar%20-%20Jasmine%20Sandlas.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53403/300x700/Legacy-Gursharan.jpg',
       name : 'Legacy',
       artist : 'Gursharan',
       album : 'Vinatge Records',
       released : '05-03-2023',
       music : 'https://s320.djpunjab.is/data/320/53403/301605/Legacy%20-%20Gursharan.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53401/300x700/AKH-DA-SHIKAAR-Akhil.jpg',
       name : 'AKH DA SHIKAAR',
       artist : 'Akhil',
       album : 'Akhil Music',
       released : '04-03-2023',
       music : 'https://s320.djpunjab.is/data/320/53401/301603/AKH%20DA%20SHIKAAR%20-%20Akhil.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53392/300x700/Salute-Arjan-Dhillon.jpg',
       name : 'Salute',
       artist : 'Arjan Dhillon',
       album : 'Panj-aab Records',
       released : '03-03-2023',
       music : 'https://s320.djpunjab.is/data/320/53392/301589/Salute%20-%20Arjan%20Dhillon.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53389/300x700/Kuwait-Kauri-Jhamat.jpg',
       name : 'Kuwait',
       artist : 'Kauri Jhamat',
       album : 'Parmish Verma',
       released : '03-03-2023',
       music : 'https://s320.djpunjab.is/data/320/53389/301586/Kuwait%20-%20Kauri%20Jhamat.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53386/300x700/Khalaare-GURJ-SIDHU.jpg',
       name : 'Khalaare',
       artist : 'GURJ SIDHU',
       album : 'Mani Longia Music',
       released : '03-03-2023',
       music : 'https://s320.djpunjab.is/data/320/53386/301583/Khalaare%20-%20GURJ%20SIDHU.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53384/300x700/6-6-Foot-Arjan-Dhillon.jpg',
       name : '6-6 Foot',
       artist : 'Arjan Dhillon',
       album : 'Panj-aab Records',
       released : '03-03-2023',
       music : 'https://s320.djpunjab.is/data/320/53384/301581/6-6%20Foot%20-%20Arjan%20Dhillon.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53374/300x700/After-Math-Sabi-Bhinder.jpg',
       name : 'After Math',
       artist : 'Sabi Bhinder',
       album : 'Sabi Bhinder',
       released : '01-03-2023',
       music : 'https://s320.djpunjab.is/data/320/53374/301571/After%20Math%20-%20Sabi%20Bhinder.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53358/300x700/Gaddiyan-Kaaliyan-Gurp-Sandhu.jpg',
       name : 'Gaddiyan Kaaliyan',
       artist : 'Gurp Sandhu',
       album : 'Midland Records',
       released : '27-02-2023',
       music : 'https://s320.djpunjab.is/data/320/53358/301555/Gaddiyan%20Kaaliyan%20-%20Gurp%20Sandhu.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53352/300x700/Akaal-Nseeb.jpg',
       name : 'Akaal',
       artist : 'Nseeb',
       album : 'Nseeb',
       released : '26-02-2023',
       music : 'https://s320.djpunjab.is/data/320/53352/301549/Akaal%20-%20Nseeb.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53337/300x700/That-Guy-Sunny-Malton.jpg',
       name : 'That Guy',
       artist : 'Sunny Malton',
       album : 'Gur3',
       released : '23-02-2023',
       music : 'https://s320.djpunjab.is/data/320/53337/301534/That%20Guy%20-%20Sunny%20Malton.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53336/300x700/Naam-Jatt-Da-Davi-Singh.jpg',
       name : 'Naam Jatt Da',
       artist : 'Davi Singh',
       album : 'The Landers Music',
       released : '23-02-2023',
       music : 'https://s320.djpunjab.is/data/320/53336/301533/Naam%20Jatt%20Da%20-%20Davi%20Singh.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53327/300x700/8055-Nijjar.jpg',
       name : '8055',
       artist : 'Nijjar',
       album : 'Nijjar',
       released : '22-02-2023',
       music : 'https://s320.djpunjab.is/data/320/53327/301524/8055%20-%20Nijjar.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53323/300x700/My-World-Avtar.jpg',
       name : 'My World',
       artist : 'Avtar',
       album : 'Saaz Records',
       released : '22-02-2023',
       music : 'https://s320.djpunjab.is/data/320/53323/301520/My%20World%20-%20Avtar.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53319/300x700/Guitar-Wale-Munde-Ranjit-Bawa.jpg',
       name : 'Guitar Wale Munde',
       artist : 'Ranjit Bawa',
       album : 'Bless Studios',
       released : '22-02-2023',
       music : 'https://s320.djpunjab.is/data/320/53319/301516/Guitar%20Wale%20Munde%20-%20Ranjit%20Bawa.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53314/300x700/Suit-Jatti-De-Karamvir-Dhumi.jpg',
       name : 'Suit Jatti De',
       artist : 'Karamvir Dhumi',
       album : 'Vehli Janta Records',
       released : '21-02-2023',
       music : 'https://s320.djpunjab.is/data/320/53314/301511/Suit%20Jatti%20De%20-%20Karamvir%20Dhumi.mp3'
        },
	{
       img : "https://cover.djpunjab.is/53311/300x700/SPAIN-(Extended-Version)-Jassa-Dhillon.jpg",
       name : 'SPAIN (Extended Version)',
       artist : 'Jassa Dhillon',
       album : 'Jassa Dhillon Music',
       released : '21-02-2023',
       music : 'https://s320.djpunjab.is/data/320/53311/301508/SPAIN%20(Extended%20Version)%20-%20Jassa%20Dhillon.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53289/300x700/Jelly-Bean-Garry-Sandhu.jpg',
       name : 'Jelly Bean',
       artist : 'Garry Sandhu',
       album : 'Fresh Media Records',
       released : '17-02-2023',
       music : 'https://s320.djpunjab.is/data/320/53289/301486/Jelly%20Bean%20-%20Garry%20Sandhu.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53282/300x700/No.1-Nijjar.jpg',
       name : 'No.1',
       artist : 'Nijjar',
       album : 'Nijjar Inc',
       released : '15-02-2023',
       music : 'https://s320.djpunjab.is/data/320/53282/301479/No.1%20-%20Nijjar.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53263/300x700/Small-Circle-Ekam-Sudhar.jpg',
       name : 'Small Circle',
       artist : 'Ekam Sudhar',
       album : 'Collab Creations',
       released : '13-02-2023',
       music : 'https://s320.djpunjab.is/data/320/53263/301449/Small%20Circle%20-%20Ekam%20Sudhar.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53258/300x700/Mohali-Block-Sharry-Maan.jpg',
       name : 'Mohali Block',
       artist : 'Sharry Maan',
       album : 'T-Series',
       released : '11-02-2023',
       music : 'https://s320.djpunjab.is/data/320/53258/301444/Mohali%20Block%20-%20Sharry%20Maan.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53254/300x700/Queen-Fateh.jpg',
       name : 'Queen',
       artist : 'Fateh',
       album : 'WINWIN Records',
       released : '10-02-2023',
       music : 'https://s320.djpunjab.is/data/320/53254/301440/Queen%20-%20Fateh.mp3'
        },
	{
       img : 'https://cover.djpunjab.is/53247/300x700/You-Know-Shipra-Goyal.jpg',
       name : 'You Know',
       artist : 'Shipra Goyal',
       album : 'Speed Records',
       released : '10-02-2023',
       music : 'https://s320.djpunjab.is/data/320/53247/301433/You%20Know%20-%20Shipra%20Goyal.mp3'
        },
	{
         img : 'https://cover.djpunjab.is/53233/300x700/Supreme-Nseeb.jpg',
         name : 'Supreme',
         artist : 'Nseeb',
         album : 'Nseeb Music',
         released : '07-02-2023',
         music : 'https://s320.djpunjab.is/data/320/53233/301413/Supreme%20-%20Nseeb.mp3'
        },
	{
         img : 'https://cover.djpunjab.is/53228/300x700/Naam-Sunuga-Khan-Bhaini.jpg',
         name : 'Naam Sunuga',
         artist : 'Khan Bhaini',
         album : 'Khan Bhaini Music',
         released : '06-02-2023',
         music : 'https://s320.djpunjab.is/data/320/53228/301408/Naam%20Sunuga%20-%20Khan%20Bhaini.mp3'
        },
	{
         img : 'https://cover.djpunjab.is/53223/300x700/Graveyard-Veer-Sandhu.jpg',
         name : 'Graveyard',
         artist : 'Veer Sandhu',
         album : 'Sword Music',
         released : '06-02-2023',
         music : 'https://s320.djpunjab.is/data/320/53223/301403/Graveyard%20-%20Veer%20Sandhu.mp3'
        },
	{
         img : 'https://cover.djpunjab.is/53222/300x700/Tu-Te-Sharab-Jordan-Sandhu.jpg',
         name : 'Tu Te Sharab',
         artist : 'Jordan Sandhu',
         album : 'Speed Records',
         released : '05-02-2023',
         music : 'https://s320.djpunjab.is/data/320/53222/301402/Tu%20Te%20Sharab%20-%20Jordan%20Sandhu.mp3'
        },
	{
         img : 'https://cover.djpunjab.is/53216/300x700/Four-You-Karan-Aujla.jpg',
         name : 'Yeah Naah',
         artist : 'Karan Aujla',
         album : 'Karan Aujla',
         released : '04-02-2023',
         music : 'https://s320.djpunjab.is/data/320/53216/301384/Yeah%20Naah%20-%20Karan%20Aujla.mp3'
        },
	{
         img : 'https://cover.djpunjab.is/53216/300x700/Four-You-Karan-Aujla.jpg',
         name : 'Take It Easy',
         artist : 'Karan Aujla',
         album : 'Karan Aujla',
         released : '04-02-2023',
         music : 'https://s320.djpunjab.is/data/320/53216/301382/Take%20It%20Easy%20-%20Karan%20Aujla.mp3'
        },
	{
         img : 'https://cover.djpunjab.is/53216/300x700/Four-You-Karan-Aujla.jpg',
         name : '52 Bars',
         artist : 'Karan Aujla',
         album : 'Karan Aujla',
         released : '04-02-2023',
         music : 'https://s320.djpunjab.is/data/320/53216/301381/52%20Bars%20-%20Karan%20Aujla.mp3'
        },
	{
         img : 'https://cover.djpunjab.is/53177/300x700/Nazare-Sunny-Randhawa.jpg',
         name : 'Nazare',
         artist : 'Sunny Randhawa',
         album : 'Street Gang Music',
         released : '31-01-2023',
         music : 'https://s320.djpunjab.is/data/320/53177/301334/Nazare%20-%20Sunny%20Randhawa.mp3'
        },
	{
         img : 'https://cover.djpunjab.is/53153/300x700/Jodia-Inderpal-Moga.jpg',
         name : 'Jodia',
         artist : 'Inderpal Moga',
         album : 'Chani Nattan Music',
         released : '29-01-2023',
         music : 'https://s320.djpunjab.is/data/320/53153/301310/Jodia%20-%20Inderpal%20Moga.mp3'
        },
	{
         img : 'https://cover.djpunjab.is/53152/300x700/Nazarya-Ch-Yaar-Deep-Chahal.jpg',
         name : 'Nazarya Ch Yaar',
         artist : 'Deep Chahal',
         album : 'Well Music',
         released : '29-01-2023',
         music : 'https://s320.djpunjab.is/data/320/53152/301309/Nazarya%20Ch%20Yaar%20-%20Deep%20Chahal.mp3'
        },
	{
         img : 'https://cover.djpunjab.is/53147/300x700/Folk-Boliyan-Rami-Randhawa.jpg',
         name : 'Folk Boliyan',
         artist : 'Rami Randhawa',
         album : 'Jass Records',
         released : '28-01-2023',
         music : 'https://s320.djpunjab.is/data/320/53147/301304/Folk%20Boliyan%20-%20Rami%20Randhawa.mp3'
        },
	{
         img : 'https://cover.djpunjab.is/53140/300x700/Swaad-Gurluv.jpg',
         name : 'Swaad',
         artist : 'Gurluv',
         album : 'Sidhu Brothers Entertainment',
         released : '27-01-2023',
         music : 'https://s320.djpunjab.is/data/320/53140/301297/Swaad%20-%20Gurluv.mp3'
        },
	{
         img : 'https://cover.djpunjab.is/53137/300x700/Rise-And-Shine-Gagan-Kokri.jpg',
         name : 'Rise And Shine',
         artist : 'Gagan Kokri',
         album : 'T-Series',
         released : '27-01-2023',
         music : 'https://s320.djpunjab.is/data/320/53137/301291/Rise%20And%20Shine%20-%20Gagan%20Kokri.mp3'
        },
	{
         img : 'https://cover.djpunjab.is/53130/300x700/Trust-Me-I-Know-Big-Boi-Deep.jpg',
         name : 'Trust Me I Know',
         artist : 'Big Boi Deep',
         album : 'Brown Boys Records',
         released : '27-01-2023',
         music : 'https://s320.djpunjab.is/data/320/53130/301274/Trust%20Me%20I%20Know%20-%20Big%20Boi%20Deep.mp3'
        },
	{
         img : 'https://cover.djpunjab.is/53128/300x700/Fab-Janda-Lakhi-Ghuman.jpg',
         name : 'Fab Janda',
         artist : 'Lakhi Ghuman',
         album : 'Noble Music',
         released : '26-01-2023',
         music : 'https://s320.djpunjab.is/data/320/53128/301272/Fab%20Janda%20-%20Lakhi%20Ghuman.mp3'
        },
	{
         img : 'https://cover.djpunjab.is/53124/300x700/Hustle-Hard-Babbal-Rai.jpg',
         name : 'Hustle Hard',
         artist : 'Babbal Rai',
         album : 'Satti Grewal & Eyp Creations',
         released : '26-01-2023',
         music : 'https://s320.djpunjab.is/data/320/53124/301268/Hustle%20Hard%20-%20Babbal%20Rai.mp3'
        },
        {
         img : 'https://cover.djpunjab.is/53116/300x700/Investigate-Karan-Aujia.jpg',
         name : 'Investigate',
         artist : 'Karan Aujia',
         album : 'Karan Aujia Music',
         released : '25-01-2023',
         music : 'https://s320.djpunjab.is/data/320/53116/301246/Investigate%20-%20Karan%20Aujla.mp3'
        },
        {
         img : 'https://cover.djpunjab.is/53114/300x700/Jaan-%20(Slowed%20Version)%20-Arjan-Dhillon.jpg',
         name : 'Jaan (Slow Version)',
         artist : 'Arjan Dhillon',
         album : 'Arjan Dhillon Music',
         released : '25-01-2023',
         music : 'https://s320.djpunjab.is/data/320/53114/301237/Jaan%20(Slowed%20Version)%20-%20Arjan%20Dhillon.mp3'
        },
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
            },
           {
        img : 'https://cover.djpunjab.is/52911/300x700/True-Talks-Jassa-Dhillon.jpg',
        name : 'True Talks',
        artist : 'Jassa Dhillon',
        album : 'Jassa Dhillon Music',
        released : '19-12-2022',
        music : 'https://s320.djpunjab.is/data/320/52911/301002/True%20Talks%20-%20Jassa%20Dhillon.mp3'
                  },
            {
        img : 'https://cover.djpunjab.is/52905/300x700/Our-Beginning-Himmat-Sandhu.jpg',
        name : 'Our Beginning',
        artist : 'Himmat Sandhu',
        album : 'Majhail Creations',
        released : '17-12-2022',
        music : 'https://s320.djpunjab.is/data/320/52905/300996/Our%20Beginning%20-%20Himmat%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52901/300x700/Never-Change-Sucha-Yaar.jpg',
         name : 'Never Change',
         artist : 'Sucha Yaar',
         album : 'Paapi Production',
         released : '17-12-2022',
         music : 'https://s320.djpunjab.is/data/320/52901/300992/Never%20Change%20-%20Sucha%20Yaar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52898/300x700/Chaal-Rahat-Fateh-Ali-Khan.jpg',
         name : 'Chaal',
         artist : 'Rahat Fateh Ali Khan',
         album : 'Dr Zeus WorldWide',
         released : '16-12-2022',
         music : 'https://s320.djpunjab.is/data/320/52898/300989/Chaal%20-%20Rahat%20Fateh%20Ali%20Khan.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52896/300x700/If-I-Die-Guri-Lahoria.jpg',
         name : 'If I Die',
         artist : 'Guri Lahoria',
         album : 'Grand Studio',
         released : '16-12-2022',
         music : 'https://s320.djpunjab.is/data/320/52896/300987/If%20I%20Die%20-%20Guri%20Lahoria.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52894/300x700/Ambran-De-Taare-Shipra-Goyal.jpg',
         name : 'If I Die',
         artist : 'Guri Lahoria',
         album : 'Grand Studio',
         released : '16-12-2022',
         music : 'https://s320.djpunjab.is/data/320/52896/300987/If%20I%20Die%20-%20Guri%20Lahoria.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52889/300x700/2-Percent-Garry-Sandhu.jpg',
         name : '2 Percent',
         artist : 'Garry Sandhu',
         album : 'Fresh Media Records',
         released : '16-12-2022',
         music : 'https://s320.djpunjab.is/data/320/52889/300980/2%20Percent%20-%20Garry%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52885/300x700/Insomnia-The-Prophec.jpg',
         name : 'Insomnia',
         artist : 'The Prophec',
         album : 'The Prophec Music',
         released : '15-12-2022',
         music : 'https://s320.djpunjab.is/data/320/52885/300976/Insomnia%20-%20The%20Prophec.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52876/300x700/Tootan-Wala-Khoo-Chani-Nattan.jpg',
         name : 'Tootan Wala Khoo',
         artist : 'Chani Nattan',
         album : 'Chani Nattan Music',
         released : '15-12-2022',
         music : 'https://s320.djpunjab.is/data/320/52876/300967/Tootan%20Wala%20Khoo%20-%20Chani%20Nattan.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52872/300x700/Exotic-Rangrez-Sidhu.jpg',
         name : 'Exotic',
         artist : 'Rangrez Sidhu',
         album : 'Taz Studios',
         released : '14-12-2022',
         music : 'https://s320.djpunjab.is/data/320/52872/300963/Exotic%20-%20Rangrez%20Sidhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52860/300x700/Bet-On-Me-Jerry.jpg',
         name : 'Bet On Me',
         artist : 'Jerry',
         album : 'VIP Records Ltd',
         released : '12-12-2022',
         music : 'https://s320.djpunjab.is/data/320/52860/300944/Bet%20On%20Me%20-%20Jerry.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52857/300x700/Tareefan-Harnoor.jpg',
         name : 'Tareefan',
         artist : 'Harnoor',
         album : 'Jatt Life Studios',
         released : '11-12-2022',
         music : 'https://s320.djpunjab.is/data/320/52857/300941/Tareefan%20-%20Harnoor.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52855/300x700/Zulfaan-Sarrb.jpg',
         name : 'Zulfaan',
         artist : 'Sarrb',
         album : 'NorthWest Music',
         released : '10-12-2022',
         music : 'https://s320.djpunjab.is/data/320/52855/300939/Zulfaan%20-%20Sarrb.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52853/300x700/The-Lion-Varinder-Brar.jpg',
         name : 'The Lion',
         artist : 'Varinder Brar',
         album : 'Varinder Brar Music',
         released : '10-12-2022',
         music : 'https://s320.djpunjab.is/data/320/52853/300937/The%20Lion%20-%20Varinder%20Brar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52849/300x700/Red-Eyes-Ekam-Chanoli.jpg',
         name : 'Red Eyes',
         artist : 'Ekam Chanoli',
         album : 'Jass Records',
         released : '10-12-2022',
         music : 'https://s320.djpunjab.is/data/320/52849/300927/Red%20Eyes%20-%20Ekam%20Chanoli.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52845/300x700/Khanabadosh-Akhil.jpg',
         name : 'Khanabadosh',
         artist : 'Akhil',
         album : 'Times Music',
         released : '09-12-2022',
         music : 'https://s320.djpunjab.is/data/320/52845/300923/Khanabadosh%20-%20Akhil.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52840/300x700/White-Brown-Black-Avvy-Sra.jpg',
         name : 'White Brown Black',
         artist : 'Avvy Sra Ft. Karan Aujla',
         album : 'Desi Melodies',
         released : '08-12-2022',
         music : 'https://s320.djpunjab.is/data/320/52840/300918/White%20Brown%20Black%20-%20Avvy%20Sra.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52836/300x700/Jaan-Ke-Bhulekhe-Satinder-Sartaaj.jpg',
         name : 'Jaan Ke Bhulekhe',
         artist : 'Satinder Sartaaj',
         album : 'Jugnu Music',
         released : '08-12-2022',
         music : 'https://s320.djpunjab.is/data/320/52836/300914/Jaan%20Ke%20Bhulekhe%20-%20Satinder%20Sartaaj.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52833/300x700/My-Dear-Punjab-Ranjit-Bawa.jpg',
         name : 'My Dear Punjab',
         artist : 'Ranjit Bawa',
         album : 'Bless Studios',
         released : '07-12-2022',
         music : 'https://s320.djpunjab.is/data/320/52833/300911/My%20Dear%20Punjab%20-%20Ranjit%20Bawa.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52830/300x700/Aam-Jahi-Sukh-Lotey.jpg',
         name : 'Aam Jahi',
         artist : 'Sukh Lotey',
         album : 'Red Leaf Music',
         released : '07-12-2022',
         music : 'https://s320.djpunjab.is/data/320/52830/300904/Aam%20Jahi%20-%20Sukh%20Lotey.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52826/300x700/Lalkaare-Harjot.jpg',
         name : 'Lalkaare',
         artist : 'Harjot',
         album : 'True Music',
         released : '07-12-2022',
         music : 'https://s320.djpunjab.is/data/320/52826/300900/Lalkaare%20-%20Harjot.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52818/300x700/Sad-Song-Ravinder-Grewal.jpg',
         name : 'Sad Song',
         artist : 'Ravinder Grewal',
         album : 'Hot Shot Music',
         released : '05-12-2022',
         music : 'https://s320.djpunjab.is/data/320/52818/300892/Sad%20Song%20-%20Ravinder%20Grewal.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52793/300x700/3---4-Yaar-Karaj-Randhawa.jpg',
         name : '3 - 4 Yaar',
         artist : 'Karaj Randhawa',
         album : 'Karaj Randhawa Music',
         released : '01-12-2022',
         music : 'https://s320.djpunjab.is/data/320/52793/300857/3%20-%204%20Yaar%20-%20Karaj%20Randhawa.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52790/300x700/2NI-Garry-Sandhu.jpg',
         name : '2NI',
         artist : 'Garry Sandhu',
         album : 'Fresh Media Records',
         released : '01-12-2022',
         music : 'https://s320.djpunjab.is/data/320/52790/300854/2NI%20-%20Garry%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52779/300x700/Tu-He-Dass-Harvi.jpg',
         name : 'Tu He Dass',
         artist : 'Harvi',
         album : 'Bang Music',
         released : '30-11-2022',
         music : 'https://s320.djpunjab.is/data/320/52779/300843/Tu%20He%20Dass%20-%20Harvi.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52775/300x700/Her-Shubh.jpg',
         name : 'Her',
         artist : 'Shubh',
         album : 'Shubh Music',
         released : '29-11-2022',
         music : 'https://s320.djpunjab.is/data/320/52775/300839/Her%20-%20Shubh.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52766/300x700/Jatt-Life-Zone-Varinder-Brar.jpg',
         name : 'Jatt Life Zone',
         artist : 'Varinder Brar',
         album : 'white Hill Music',
         released : '28-11-2022',
         music : 'https://s320.djpunjab.is/data/320/52766/300830/Jatt%20Life%20Zone%20-%20Varinder%20Brar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52755/300x700/WYTB-Karan-Aujla.jpg',
         name : 'WYTB',
         artist : 'Karan Aujla Ft. Gurlez Akhtar',
         album : 'Karan Aujla Music',
         released : '24-11-2022',
         music : 'https://s320.djpunjab.is/data/320/52755/300807/WYTB%20-%20Karan%20Aujla.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52753/300x700/10-Outta-10-Shipra-Goyal.jpg',
         name : '10 Outta 10',
         artist : 'Shipra Goyal Ft. Amrit Maan',
         album : 'Blue Beat Studios',
         released : '24-11-2022',
         music : 'https://s320.djpunjab.is/data/320/52753/300805/10%20Outta%2010%20-%20Shipra%20Goyal.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52751/300x700/On-Top-Karan-Aujla.jpg',
         name : 'On Top',
         artist : 'Karan Aujla',
         album : 'Karan Aujla Music',
         released : '24-11-2022',
         music : 'https://s320.djpunjab.is/data/320/52751/300803/On%20Top%20-%20Karan%20Aujla.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52750/300x700/Sifat-Nirvair-Pannu.jpg',
         name : 'Sifat',
         artist : 'Nirvair Pannu',
         album : 'Juke Dock',
         released : '24-11-2022',
         music : 'https://s320.djpunjab.is/data/320/52750/300802/Sifat%20-%20Nirvair%20Pannu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52745/300x700/So-Mean-Navaan-Sandhu.jpg',
         name : 'So Mean',
         artist : 'Navaan Sandhu',
         album : 'T-Series',
         released : '23-11-2022',
         music : 'https://s320.djpunjab.is/data/320/52745/300794/So%20Mean%20-%20Navaan%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52725/300x700/Jagga-Daaku-Varinder-Brar.jpg',
         name : 'Jagga Daaku',
         artist : 'Varinder Brar',
         album : 'Varinder Brar Music',
         released : '20-11-2022',
         music : 'https://s320.djpunjab.is/data/320/52725/300774/Jagga%20Daaku%20-%20Varinder%20Brar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52691/300x700/Boss-Walk-Nirvair-Pannu.jpg',
         name : 'Boss Walk',
         artist : 'Nirvair Pannu',
         album : 'Juke Dock',
         released : '14-11-2022',
         music : 'https://s320.djpunjab.is/data/320/52691/300740/Boss%20Walk%20-%20Nirvair%20Pannu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52689/300x700/Munda-Sardaran-Da-Jordan-Sandhu.jpg',
         name : 'Munda Sardaran Da',
         artist : 'Jordan Sandhu',
         album : 'Jordan Sandhu Music',
         released : '14-11-2022',
         music : 'https://s320.djpunjab.is/data/320/52689/300738/Munda%20Sardaran%20Da%20-%20Jordan%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52665/300x700/High-Life-Jass-Bajwa.jpg',
         name : 'High Life',
         artist : 'Jass Bajwa',
         album : 'Jass Bajwa Music',
         released : '10-11-2022',
         music : 'https://s320.djpunjab.is/data/320/52665/300714/High%20Life%20-%20Jass%20Bajwa.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52660/300x700/Live-Till-Death-Veer-Sandhu.jpg',
         name : 'Live Till Death',
         artist : 'Veer Sandhu',
         album : 'Veer Sandhu Music',
         released : '08-11-2022',
         music : 'https://s320.djpunjab.is/data/320/52660/300709/Live%20Till%20Death%20-%20Veer%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52658/300x700/Vaar-Sidhu-Moose-Wala.jpg',
         name : 'Vaar',
         artist : 'Sidhu Moose Wala',
         album : 'Sidhu Moose Wala',
         released : '08-11-2022',
         music : 'https://s320.djpunjab.is/data/320/52658/300707/Vaar%20-%20Sidhu%20Moose%20Wala.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52656/300x700/Trucker-Arjan-Dhillon.jpg',
         name : 'Trucker',
         artist : 'Arjan Dhillon',
         album : 'Panjaab Records',
         released : '07-11-2022',
         music : 'https://s320.djpunjab.is/data/320/52656/300705/Trucker%20-%20Arjan%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52655/300x700/Jee-Jeha-Karda-Jasmine-Sandlas.jpg',
         name : 'Jee Jeha Karda',
         artist : 'Jasmine Sandlas',
         album : 'Jasmine Sandlas Records',
         released : '06-11-2022',
         music : 'https://s320.djpunjab.is/data/320/52655/300704/Jee%20Jeha%20Karda%20-%20Jasmine%20Sandlas.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52652/300x700/BBBB-Khan-Bhaini.jpg',
         name : 'BBBB',
         artist : 'Khan Bhaini',
         album : 'Times Music',
         released : '06-11-2022',
         music : 'https://s320.djpunjab.is/data/320/52652/300701/BBBB%20-%20Khan%20Bhaini.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52651/300x700/Kundi-Muchh-Love-Pannu.jpg',
         name : 'Kundi Muchh',
         artist : 'Love Pannu',
         album : 'Midland Records',
         released : '06-11-2022',
         music : 'https://s320.djpunjab.is/data/320/52651/300700/Kundi%20Muchh%20-%20Love%20Pannu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52648/300x700/Violence-Varinder-Brar.jpg',
         name : 'Violence',
         artist : 'Varinder Brar',
         album : 'Varinder Brar Music',
         released : '05-11-2022',
         music : 'https://s320.djpunjab.is/data/320/52648/300697/Violence%20-%20Varinder%20Brar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52642/300x700/Tutta-Dil-Sharry-Maan.jpg',
         name : 'Tutta ',
         artist : 'Sharry Maan',
         album : 'Desi Verse',
         released : '03-11-2022',
         music : 'https://s320.djpunjab.is/data/320/52642/300691/Tutta%20Dil%20-%20Sharry%20Maan.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52639/300x700/Zara-Faasley-Te-Satinder-Sartaaj.jpg',
         name : 'Zara Faasley Te',
         artist : 'Satinder Sartaaj',
         album : 'Saregama Punjabi',
         released : '03-11-2022',
         music : 'https://s320.djpunjab.is/data/320/52639/300688/Zara%20Faasley%20Te%20-%20Satinder%20Sartaaj.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52636/300x700/13-Pind-Rajvir-Jawanda.jpg',
         name : '13 Pind',
         artist : 'Rajvir Jawanda',
         album : 'Rajvir Jawanda Music',
         released : '03-11-2022',
         music : 'https://s320.djpunjab.is/data/320/52636/300685/13%20Pind%20-%20Rajvir%20Jawanda.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52619/300x700/Osoyoos-Blues-Bhalwaan.jpg',
         name : 'Osoyoos Blues',
         artist : 'Bhalwaan',
         album : 'Freq Records',
         released : '30-10-2022',
         music : 'https://s320.djpunjab.is/data/320/52619/300663/Osoyoos%20Blues%20-%20Bhalwaan.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52613/300x700/2-Bloodas-Varinder-Brar.jpg',
         name : '2 Bloodas',
         artist : 'Varinder Brar',
         album : 'Varinder Brar Music',
         released : '29-10-2022',
         music : 'https://s320.djpunjab.is/data/320/52613/300657/2%20Bloodas%20-%20Varinder%20Brar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52594/300x700/AK-Di-Barrel-Himmat-Sandhu.jpg',
         name : 'AK Di Barrel',
         artist : 'Himmat Sandhu',
         album : 'Himmat Sandhu  Music',
         released : '26-10-2022',
         music : 'https://s320.djpunjab.is/data/320/52594/300638/AK%20Di%20Barrel%20-%20Himmat%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52582/300x700/Mehrma-The-Prophec.jpg',
         name : 'Mehrma',
         artist : 'The Prophec',
         album : 'The Prophec Music',
         released : '21-10-2022',
         music : 'https://s320.djpunjab.is/data/320/52582/300626/Mehrma%20-%20The%20Prophec.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52579/300x700/Balle-Jatta-Diljit-Dosanjh.jpg',
         name : 'Balle Jatta',
         artist : 'Diljit Dosanjh',
         album : 'Diljit Dosanjh Music',
         released : '20-10-2022',
         music : 'https://s320.djpunjab.is/data/320/52579/300623/Balle%20Jatta%20-%20Diljit%20Dosanjh.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52578/300x700/Detail-Amrit-Maan.jpg',
         name : 'Detail',
         artist : 'Amrit Maan',
         album : 'Amrit Maan Music',
         released : '20-10-2022',
         music : 'https://s320.djpunjab.is/data/320/52578/300622/Detail%20-%20Amrit%20Maan.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52572/300x700/Mehflan-Kulbir-Jhinjer.jpg',
         name : 'Mehflan',
         artist : 'Kulbir Jhinjer',
         album : 'Kulbir Jhinjer Worldwide',
         released : '19-10-2022',
         music : 'https://s320.djpunjab.is/data/320/52572/300616/Mehflan%20-%20Kulbir%20Jhinjer.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52561/300x700/Snowfall-Jordan-Sandhu.jpg',
         name : 'Snowfall',
         artist : 'Jordan Sandhu',
         album : 'Planet Recordz',
         released : '17-10-2022',
         music : 'https://s320.djpunjab.is/data/320/52561/300594/Snowfall%20-%20Jordan%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52557/300x700/6-L-Tarsem-Jassar.jpg',
         name : '6 L',
         artist : 'Tarsem Jassar',
         album : 'Vehli Janta Records',
         released : '15-10-2022',
         music : 'https://s320.djpunjab.is/data/320/52557/300590/6%20L%20-%20Tarsem%20Jassar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52546/300x700/Trouble-Maker-Jassa-Dhillon.jpg',
         name : 'Trouble Maker',
         artist : 'Jassa Dhillon',
         album : 'Jassa Dhillon Music',
         released : '12-10-2022',
         music : 'https://s320.djpunjab.is/data/320/52546/300579/Trouble%20Maker%20-%20Jassa%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52541/300x700/Dekhya-Kite-Davy.jpg',
         name : 'Dekhya Kite',
         artist : 'Davy',
         album : 'Brown Town Music',
         released : '12-10-2022',
         music : 'https://s320.djpunjab.is/data/320/52541/300571/Dekhya%20Kite%20-%20Davy.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52539/300x700/The-Umbrella-Song-Bilal-Saeed.jpg',
         name : 'The Umbrella',
         artist : 'Bilal Saeed Ft. Fateh',
         album : 'One Two Records',
         released : '11-10-2022',
         music : 'https://s320.djpunjab.is/data/320/52539/300569/The%20Umbrella%20Song%20-%20Bilal%20Saeed.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52527/300x700/Blood-Talks-Jordan-Sandhu.jpg',
         name : 'Blood Talks',
         artist : 'Jordan Sandhu',
         album : 'Jordan Sandhu Music',
         released : '10-10-2022',
         music : 'https://s320.djpunjab.is/data/320/52527/300557/Blood%20Talks%20-%20Jordan%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52522/300x700/Faizal-Varinder-Brar.jpg',
         name : 'Faizal',
         artist : 'Varinder Brar',
         album : 'Varinder Brar Music',
         released : '08-10-2022',
         music : 'https://s320.djpunjab.is/data/320/52522/300552/Faizal%20-%20Varinder%20Brar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52516/300x700/Jugni-Diljit-Dosanjh.jpg',
         name : 'Jugni',
         artist : 'Diljit Dosanjh',
         album : 'Diljit Dosanjh Music',
         released : '07-10-2022',
         music : 'https://s320.djpunjab.is/data/320/52516/300546/Jugni%20-%20Diljit%20Dosanjh.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52509/300x700/Ferozi-Koka-Ranjit-Bawa.jpg',
         name : 'Ferozi Koka',
         artist : 'Ranjit Bawa',
         album : 'Amrit Maan Music',
         released : '05-10-2022',
         music : 'https://s320.djpunjab.is/data/320/52509/300539/Ferozi%20Koka%20-%20Ranjit%20Bawa.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52494/300x700/2-Velly-Harvi.jpg',
         name : '2 Velly',
         artist : 'Harvi',
         album : 'Tree Music Labe',
         released : '03-10-2022',
         music : 'https://s320.djpunjab.is/data/320/52494/300524/2%20Velly%20-%20Harvi.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52473/300x700/DOABA-Garry-Sandhu.jpg',
         name : 'DOABA',
         artist : 'Garry Sandhu',
         album : 'Fresh Media Records',
         released : '29-09-2022',
         music : 'https://s320.djpunjab.is/data/320/52473/300500/DOABA%20-%20Garry%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52465/300x700/Mobster-Singga.jpg',
         name : 'Mobster',
         artist : 'Singga Ft. Deep Jandu',
         album : 'Singga Music',
         released : '27-09-2022',
         music : 'https://s320.djpunjab.is/data/320/52465/300487/Mobster%20-%20Singga.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52460/300x700/Ainak-Gulab-Sidhu.jpg',
         name : 'Ainak',
         artist : 'Gulab Sidhu',
         album : 'Red Leaf Music',
         released : '26-09-2022',
         music : 'https://s320.djpunjab.is/data/320/52460/300482/Ainak%20-%20Gulab%20Sidhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52461/300x700/Grace-Gurnam-Bhullar.jpg',
         name : 'Grace',
         artist : 'Gurnam Bhullar',
         album : 'Diamondstar Worldwide',
         released : '26-09-2022',
         music : 'https://s320.djpunjab.is/data/320/52461/300483/Grace%20-%20Gurnam%20Bhullar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52459/300x700/Dont-You-Jassa-Dhillon.jpg',
         name : 'Dont You',
         artist : 'Jassa Dhillon',
         album : 'Thiarajxtt Music',
         released : '24-09-2022',
         music : 'https://s320.djpunjab.is/data/320/52459/300481/Dont%20You%20-%20Jassa%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52453/300x700/Gun-n-Mic-Amantej-Hundal.jpg',
         name : 'Gun N Mic',
         artist : 'Amantej Hundal',
         album : 'Amantej Hundal Music',
         released : '23-09-2022',
         music : 'https://s320.djpunjab.is/data/320/52453/300475/Gun%20N%20Mic%20-%20Amantej%20Hundal.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52452/300x700/Keep-It-Gangsta-Wazir-Patar.jpg',
         name : 'Outlaw',
         artist : 'Wazir Patar',
         album : 'Wazir Patar Music',
         released : '23-09-2022',
         music : 'https://s320.djpunjab.is/data/320/52452/300474/Outlaw%20-%20Wazir%20Patar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52452/300x700/Keep-It-Gangsta-Wazir-Patar.jpg',
         name : 'Pind Da Riwaaz',
         artist : 'Wazir Patar',
         album : 'Wazir Patar Music',
         released : '23-09-2022',
         music : 'https://s320.djpunjab.is/data/320/52452/300473/Pind%20Da%20Riwaaz%20-%20Wazir%20Patar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52452/300x700/Keep-It-Gangsta-Wazir-Patar.jpg',
         name : 'Tattoo',
         artist : 'Wazir Patar',
         album : 'Wazir Patar Music',
         released : '23-09-2022',
         music : 'https://s320.djpunjab.is/data/320/52452/300472/Tattoo%20-%20Wazir%20Patar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52452/300x700/Keep-It-Gangsta-Wazir-Patar.jpg',
         name : 'Chup Chup',
         artist : 'Wazir Patar',
         album : 'Wazir Patar Music',
         released : '23-09-2022',
         music : 'https://s320.djpunjab.is/data/320/52452/300471/Chup%20Chup%20-%20Wazir%20Patar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52452/300x700/Keep-It-Gangsta-Wazir-Patar.jpg',
         name : 'One Way',
         artist : 'Wazir Patar',
         album : 'Wazir Patar Music',
         released : '23-09-2022',
         music : 'https://s320.djpunjab.is/data/320/52452/300470/One%20Way%20-%20Wazir%20Patar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52443/300x700/Yaad-Jassa-Dhillon.jpg',
         name : 'Yaad',
         artist : 'Jassa Dhillon',
         album : 'Jassa Dhillon Music',
         released : '22-09-2022',
         music : 'https://s320.djpunjab.is/data/320/52443/300447/Yaad%20-%20Jassa%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52430/300x700/Hanji-Hanji-Amrit-Maan.jpg',
         name : 'Hanji Hanji',
         artist : 'Amrit Maan FT. PropheC',
         album : 'WhiteHill Music',
         released : '18-09-2022',
         music : 'https://s320.djpunjab.is/data/320/52430/300434/Hanji%20Hanji%20-%20Amrit%20Maan.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52417/300x700/Swag-Tarsem-Jassar.jpg',
         name : 'Swag',
         artist : 'Tarsem Jassar',
         album : 'Gem Tunes',
         released : '16-09-2022',
         music : 'https://s320.djpunjab.is/data/320/52417/300421/Swag%20-%20Tarsem%20Jassar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52398/300x700/Punjab-Jeha-Wazir-Patar.jpg',
         name : 'Punjab Jeha',
         artist : 'Wazir Patar',
         album : 'Gem Tunes Punjabi',
         released : '10-09-2022',
         music : 'https://s320.djpunjab.is/data/320/52398/300402/Punjab%20Jeha%20-%20Wazir%20Patar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52396/300x700/Baller-Shubh.jpg',
         name : 'Baller',
         artist : 'Shubh',
         album : 'Shubh Music',
         released : '09-09-2022',
         music : 'https://s320.djpunjab.is/data/320/52396/300400/Baller%20-%20Shubh.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52393/300x700/Cause-Of-You-Zehr-Vibe.jpg',
         name : 'Cause Of You',
         artist : 'Zehr Vibe',
         album : 'Jatt Life Studios',
         released : '09-09-2022',
         music : 'https://s320.djpunjab.is/data/320/52393/300397/Cause%20Of%20You%20-%20Zehr%20Vibe.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52388/300x700/Kajla-Jassa-Dhillon.jpg',
         name : 'Kajla',
         artist : 'Jassa Dhillon',
         album : 'Jassa Dhillon Music',
         released : '09-09-2022',
         music : 'https://s320.djpunjab.is/data/320/52388/300392/Kajla%20-%20Jassa%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52370/300x700/Yaar-Mere-Himmat-Sandhu.jpg',
         name : 'Yaar Mere',
         artist : 'Himmat Sandhu',
         album : 'Himmat Sandhu Music',
         released : '02-09-2022',
         music : 'https://s320.djpunjab.is/data/320/52370/300374/Yaar%20Mere%20-%20Himmat%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52368/300x700/Panjab-Warga-Arjan-Dhillon.jpg',
         name : 'Panjab Warga',
         artist : 'Arjan Dhillon',
         album : 'Panjaab Records',
         released : '01-09-2022',
         music : 'https://s320.djpunjab.is/data/320/52368/300372/Panjab%20Warga%20-%20Arjan%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52367/300x700/Band-Theke-Jordan-Sandhu.jpg',
         name : 'Band Theke',
         artist : 'Jordan Sandhu',
         album : 'Times Music',
         released : '01-09-2022',
         music : 'https://s320.djpunjab.is/data/320/52367/300371/Band%20Theke%20-%20Jordan%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52365/300x700/Just-Round-Jass-Bajwa.jpg',
         name : 'Just Round',
         artist : 'Jass Bajwa',
         album : 'Mee Muzic',
         released : '31-08-2022',
         music : 'https://s320.djpunjab.is/data/320/52365/300369/Just%20Round%20-%20Jass%20Bajwa.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52361/300x700/Sheesha-Karan-Aujla.jpg',
         name : 'Sheesha',
         artist : 'Karan Aujla',
         album : 'Karan Aujla Music',
         released : '29-08-2022',
         music : 'https://s320.djpunjab.is/data/320/52361/300365/Sheesha%20-%20Karan%20Aujla.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52353/300x700/By-Pass-KpTaan.jpg',
         name : 'By Pass',
         artist : 'KpTaan',
         album : 'Studio 7 Records',
         released : '26-08-2022',
         music : 'https://s320.djpunjab.is/data/320/52353/300357/By%20Pass%20-%20KpTaan.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52347/300x700/Haaye-Jatiye-Pavitar-Lassoi.jpg',
         name : 'Haaye Jatiye',
         artist : 'Pavitar Lassoi',
         album : 'Vibe Music Studios',
         released : '25-08-2022',
         music : 'https://s320.djpunjab.is/data/320/52347/300351/Haaye%20Jatiye%20-%20Pavitar%20Lassoi.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52321/300x700/Feel-Safe-Garry-Sandhu.jpg',
         name : 'Feel Safe',
         artist : 'Garry Sandhu',
         album : 'Fresh Media Records',
         released : '19-08-2022',
         music : 'https://s320.djpunjab.is/data/320/52321/300315/Feel%20Safe%20-%20Garry%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52316/300x700/Secrets-The-Prophec.jpg',
         name : 'Secrets',
         artist : 'The Prophec',
         album : 'The Prophec Music',
         released : '19-08-2022',
         music : 'https://s320.djpunjab.is/data/320/52316/300310/Secrets%20-%20The%20Prophec.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52313/300x700/New-Bars-Wazir-Patar.jpg',
         name : 'New Bars',
         artist : 'Wazir Patar',
         album : 'Wazir Patar Music',
         released : '17-08-2022',
         music : 'https://s320.djpunjab.is/data/320/52313/300307/New%20Bars%20-%20Wazir%20Patar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52311/300x700/Nava-Nava-Pyar-Gippy-Grewal.jpg',
         name : 'Nava Nava Pyar',
         artist : 'Gippy Grewal',
         album : 'Gem Tunes Punjabi',
         released : '17-08-2022',
         music : 'https://s320.djpunjab.is/data/320/52311/300305/Nava%20Nava%20Pyar%20-%20Gippy%20Grewal.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52310/300x700/Karobar-R-Nait.jpg',
         name : 'Karobar',
         artist : 'R Nait Ft. Gurlez Akhtar',
         album : 'Times Music',
         released : '16-08-2022',
         music : 'https://s320.djpunjab.is/data/320/52310/300304/Karobar%20-%20R%20Nait.mp3'
            },
            {
         img : 'https://lq.djjohal.com/covers/728021/LV.jpg',
         name : 'LV',
         artist : 'Singga Ft. SMG',
         album : 'Singga Music',
         released : '14-08-2022',
         music : 'https://hd1.djjohal.com/320/513590/LV%20-%20Singga%20(DJJOhAL.Com).mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52295/300x700/Plug-Talk-Navaan-Sandhu.jpg',
         name : 'Plug Talk',
         artist : 'Navaan Sandhu',
         album : 'Navaan Sandhu Music',
         released : '12-08-2022',
         music : 'https://s320.djpunjab.is/data/320/52295/300281/Plug%20Talk%20-%20Navaan%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52292/300x700/26-Boulevard-Prem-Dhillon.jpg',
         name : '26 Boulevard',
         artist : 'Prem Dhillon',
         album : 'Prem Dhillon Music',
         released : '11-08-2022',
         music : 'https://s320.djpunjab.is/data/320/52292/300278/26%20Boulevard%20-%20Prem%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52283/300x700/Wrangler-Tarsem-Jassar.jpg',
         name : 'Wrangler',
         artist : 'Tarsem Jassar',
         album : 'Tpz Records',
         released : '09-08-2022',
         music : 'https://s320.djpunjab.is/data/320/52283/300260/Wrangler%20-%20Tarsem%20Jassar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52268/300x700/Summer-High-AP-Dhillon.jpg',
         name : 'Summer High',
         artist : 'AP Dhillon',
         album : 'Run-Up Records',
         released : '05-08-2022',
         music : 'https://s320.djpunjab.is/data/320/52268/300232/Summer%20High%20-%20AP%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52263/300x700/Photo-Nimrat-Khaira.jpg',
         name : 'Photo',
         artist : 'Nimrat Khaira',
         album : 'Brown Studios',
         released : '04-08-2022',
         music : 'https://s320.djpunjab.is/data/320/52263/300227/Photo%20-%20Nimrat%20Khaira.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52262/300x700/Right-Left-Kulwinder-Billa.jpg',
         name : 'Right Left',
         artist : 'Kulwinder Billa',
         album : 'Times Music',
         released : '04-08-2022',
         music : 'https://s320.djpunjab.is/data/320/52262/300226/Right%20Left%20-%20Kulwinder%20Billa.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52258/300x700/Batua-Veer-Sandhu.jpg',
         name : 'Batua',
         artist : 'Veer Sandhu',
         album : 'Sword Music',
         released : '03-08-2022',
         music : 'https://s320.djpunjab.is/data/320/52258/300222/Batua%20-%20Veer%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52250/300x700/Dubda-Sooraj-Amrinder-Gill.jpg',
         name : 'Dubda Sooraj',
         artist : 'Amrinder Gill',
         album : 'Rhythm Boyz',
         released : '31-07-2022',
         music : 'https://s320.djpunjab.is/data/320/52250/300214/Dubda%20Sooraj%20-%20Amrinder%20Gill.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52250/300x700/Dubda-Sooraj-Amrinder-Gill.jpg',
         name : 'Doongiyan Baatan',
         artist : 'Amrinder Gill',
         album : 'Rhythm Boyz',
         released : '31-07-2022',
         music : 'https://s320.djpunjab.is/data/320/52240/300187/Doongiyan%20Baatan%20-%20Amrinder%20Gill.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52231/300x700/Lutt-Lai-Giya-Ranjit-Bawa.jpg',
         name : 'Lutt Lai Giya',
         artist : 'Ranjit Bawa',
         album : 'Brand B',
         released : '28-07-2022',
         music : 'https://s320.djpunjab.is/data/320/52231/300178/Lutt%20Lai%20Giya%20-%20Ranjit%20Bawa.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52230/300x700/Definitely-(Laazmi)-The-Landers.jpg',
         name : 'Definitely (Laazmi)',
         artist : 'The Landers',
         album : 'Koinage Records',
         released : '28-07-2022',
         music : 'https://s320.djpunjab.is/data/320/52230/300177/Definitely%20(Laazmi)%20-%20The%20Landers.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52216/300x700/Allah-Maaf-Kre-Amrit-Maan.jpg',
         name : 'Allah Maaf Kre',
         artist : 'Amrit Maan',
         album : 'Cocktail Music',
         released : '25-07-2022',
         music : 'https://s320.djpunjab.is/data/320/52216/300163/Allah%20Maaf%20Kre%20-%20Amrit%20Maan.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52201/300x700/DJ-Walle-Kulwinder-Billa.jpg',
         name : 'Allah Maaf Kre',
         artist : 'Amrit Maan',
         album : 'Cocktail Music',
         released : '25-07-2022',
         music : 'https://s320.djpunjab.is/data/320/52216/300163/Allah%20Maaf%20Kre%20-%20Amrit%20Maan.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52180/300x700/Moonroof-Nseeb.jpg',
         name : 'Moonroof',
         artist : 'Nseeb',
         album : 'Nseeb Music',
         released : '14-07-2022',
         music : 'https://s320.djpunjab.is/data/320/52180/300123/Moonroof%20-%20Nseeb.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52168/300x700/Akh-Laal-Sabi-Bhinder.jpg',
         name : 'Akh Laal',
         artist : 'Sabi Bhinder',
         album : 'Jatt Life Studios',
         released : '12-07-2022',
         music : 'https://s320.djpunjab.is/data/320/52168/300107/Akh%20Laal%20-%20Sabi%20Bhinder.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52165/300x700/GODSPEED-Tyson-Sidhu.jpg',
         name : 'GODSPEED',
         artist : 'Tyson Sidhu',
         album : 'Game Time',
         released : '12-07-2022',
         music : 'https://s320.djpunjab.is/data/320/52165/300104/GODSPEED%20-%20Tyson%20Sidhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52164/300x700/Patake-Khan-Bhaini.jpg',
         name : 'Patake',
         artist : 'Khan Bhain',
         album : 'Single Track Studio',
         released : '11-07-2022',
         music : 'https://s320.djpunjab.is/data/320/52164/300103/Patake%20-%20Khan%20Bhaini.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52155/300x700/Mella-Singga.jpg',
         name : 'Mella',
         artist : 'Singga',
         album : 'Singga Music',
         released : '09-07-2022',
         music : 'https://s320.djpunjab.is/data/320/52155/300094/Mella%20-%20Singga.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52138/300x700/Gucci-Di-Sole-Kahlon.jpg',
         name : 'Gucci Di',
         artist : 'Sole Kahlon',
         album : 'Gringo Entertainments',
         released : '07-07-2022',
         music : 'https://s320.djpunjab.is/data/320/52138/300077/Gucci%20Di%20Sole%20-%20Kahlon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/52057/300x700/Nakhre-Arjan-Dhillon.jpg',
         name : 'Nakhre',
         artist : 'Arjan Dhillon',
         album : 'Brown studios',
         released : '19-06-2022',
         music : 'https://s320.djpunjab.is/data/320/52057/299991/Nakhre%20-%20Arjan%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51942/300x700/No-Count-Tarsem-Jassar.jpg',
         name : 'No Count',
         artist : 'Tarsem Jassar',
         album : 'Tpz Records',
         released : '20-05-2022',
         music : 'https://s320.djpunjab.is/data/320/51942/299876/No%20Count%20-%20Tarsem%20Jassar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51932/300x700/Will-Nseeb.jpg',
         name : 'Will',
         artist : 'Nseeb',
         album : 'Nseeb Music',
         released : '17-05-2022',
         music : 'https://s320.djpunjab.is/data/320/51932/299866/Will%20-%20Nseeb.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51930/300x700/Mob-Jassa-Dhillon.jpg',
         name : 'Mob',
         artist : 'Jassa Dhillon',
         album : 'Jassa Dhillon Music',
         released : '16-05-2022',
         music : 'https://s320.djpunjab.is/data/320/51930/299864/Mob%20-%20Jassa%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51922/300x700/The-Last-Ride-Sidhu-Moose-Wala.jpg',
         name : 'The Last Ride',
         artist : 'Sidhu Moose Wala',
         album : 'Sidhu Moose Wala Music',
         released : '15-05-2022',
         music : 'https://s320.djpunjab.is/data/320/51922/299856/The%20Last%20Ride%20-%20Sidhu%20Moose%20Wala.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51902/300x700/Thabba-Ku-Zulfan-Arjan-Dhillon.jpg',
         name : 'Thabba Ku Zulfan',
         artist : 'Arjan Dhillon',
         album : 'Brown Studios',
         released : '12-05-2022',
         music : 'https://s320.djpunjab.is/data/320/51902/299836/Thabba%20Ku%20Zulfan%20-%20Arjan%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51895/300x700/Trouble-Deep-Jandu.jpg',
         name : 'Trouble',
         artist : 'Deep Jandu',
         album : 'Deep Jandu Ent',
         released : '11-05-2022',
         music : 'https://s320.djpunjab.is/data/320/51895/299829/Trouble%20-%20Deep%20Jandu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51870/300x700/Positivity-Jordan-Sandhu.jpg',
         name : 'Positivity',
         artist : 'Jordan Sandhu',
         album : 'Jordan Sandhu Music',
         released : '09-05-2022',
         music : 'https://s320.djpunjab.is/data/320/51870/299799/Positivity%20-%20Jordan%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51865/300x700/Kuwait-Wala-Koka-Gurman-Sandhu.jpg',
         name : 'Kuwait Wala Koka',
         artist : 'Gurman Sandhu',
         album : 'Desi Junction',
         released : '09-05-2022',
         music : 'https://s320.djpunjab.is/data/320/51865/299794/Kuwait%20Wala%20Koka%20-%20Gurman%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51862/300x700/Pasoori-Ali-Sethi.jpg',
         name : 'Pasoori',
         artist : 'Ali Sethi',
         album : 'Xulfi',
         released : '08-05-2022',
         music : 'https://s320.djpunjab.is/data/320/51862/299781/Pasoori%20-%20Ali%20Sethi.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51842/300x700/Gal-Sun-Jaz-Dhami.jpg',
         name : 'Gal Sun',
         artist : 'Jaz Dhami',
         album : 'Jaz Dhami',
         released : '05-05-2022',
         music : 'https://s320.djpunjab.is/data/320/51842/299759/Gal%20Sun%20-%20Jaz%20Dhami.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51840/300x700/Dss-Bhabhiye-Rajvir-Jawanda.jpg',
         name : 'Dss Bhabhiye',
         artist : 'Rajvir Jawanda',
         album : 'Prince Saggu',
         released : '05-05-2022',
         music : 'https://s320.djpunjab.is/data/320/51840/299757/Dss%20Bhabhiye%20-%20Rajvir%20Jawanda.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51828/300x700/Way-Ahead---Aukaat-Karan-Aujla.jpg',
         name : 'Way Ahead - Aukaat',
         artist : 'Karan Aujla',
         album : 'Rehaan Records',
         released : '03-05-2022',
         music : 'https://s320.djpunjab.is/data/320/51828/299745/Way%20Ahead%20-%20Aukaat%20-%20Karan%20Aujla.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51820/300x700/Wahzirinthehood-Wazir-Patar.jpg',
         name : 'Wahzirinthehood',
         artist : 'Wazir Patar',
         album : 'Wazir Patar Music',
         released : '02-05-2022',
         music : 'https://s320.djpunjab.is/data/320/51820/299737/Wahzirinthehood%20-%20Wazir%20Patar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51788/300x700/Time-Keeps-Tickin-Deep-Jandu.jpg',
         name : 'Time Keeps Tickin',
         artist : 'Deep Jandu',
         album : 'Deep Jandu Ent.',
         released : '26-04-2022',
         music : 'https://s320.djpunjab.is/data/320/51788/299705/Time%20Keeps%20Tickin%20-%20Deep%20Jandu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51775/300x700/End-Amrit-Maan.jpg',
         name : 'End',
         artist : 'Amrit Maan',
         album : 'Times Music',
         released : '20-04-2022',
         music : 'https://s320.djpunjab.is/data/320/51775/299679/End%20-%20Amrit%20Maan.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51774/300x700/LA-Nirvair-Pannu.jpg',
         name : 'LA',
         artist : 'Nirvair Pannu',
         album : 'Juke Dock',
         released : '20-04-2022',
         music : 'https://s320.djpunjab.is/data/320/51774/299678/LA%20-%20Nirvair%20Pannu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51763/300x700/Mob-N-Love-Prem-Dhillon.jpg',
         name : 'Mob N Love',
         artist : 'Prem Dhillon',
         album : 'Prem Dhillon Music',
         released : '18-04-2022',
         music : 'https://s320.djpunjab.is/data/320/51763/299667/Mob%20N%20Love%20-%20Prem%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51747/300x700/Rajdhani-Gulab-Sidhu.jpg',
         name : 'Rajdhani',
         artist : 'Gulab Sidhu',
         album : 'Leaf Records',
         released : '15-04-2022',
         music : 'https://s320.djpunjab.is/data/320/51747/299651/Rajdhani%20-%20Gulab%20Sidhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51742/300x700/Chauffeur-Diljit-Dosanjh.jpg',
         name : 'Chauffeur',
         artist : 'Diljit Dosanjh',
         album : 'Warner Music India',
         released : '13-04-2022',
         music : 'https://s320.djpunjab.is/data/320/51742/299646/Chauffeur%20-%20Diljit%20Dosanjh.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51733/300x700/Jattan-de-Putt-Sharry-Maan.jpg',
         name : 'Jattan De Putt',
         artist : 'Sharry Maan',
         album : 'Sharry Maan Music',
         released : '11-04-2022',
         music : 'https://s320.djpunjab.is/data/320/51733/299637/Jattan%20De%20Putt%20-%20Sharry%20Maan.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51715/300x700/Nain-Dilpreet-Dhillon.jpg',
         name : 'Nain',
         artist : 'Dilpreet Dhillon',
         album : 'White Hill Music',
         released : '08-04-2022',
         music : 'https://s320.djpunjab.is/data/320/51715/299619/Nain%20-%20Dilpreet%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51714/300x700/Still-Rollin-Srmn.jpg',
         name : 'Still Rollin',
         artist : 'Srmn',
         album : 'Srmn Music',
         released : '08-04-2022',
         music : 'https://s320.djpunjab.is/data/320/51714/299618/Still%20Rollin%20-%20Srmn.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51689/300x700/Magic-Akhil.jpg',
         name : 'Magic',
         artist : 'Akhil',
         album : 'Akhil Music',
         released : '04-04-2022',
         music : 'https://s320.djpunjab.is/data/320/51689/299593/Magic%20-%20Akhil.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51667/300x700/Mucho-Mafia-Karan-Aujla.jpg',
         name : 'Mucho Mafia',
         artist : 'Karan Aujla',
         album : 'Karan Aujla Music',
         released : '30-03-2022',
         music : 'https://s320.djpunjab.is/data/320/51667/299571/Mucho%20Mafia%20-%20Karan%20Aujla.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51664/300x700/Nabzan-Arjan-Dhillon.jpg',
         name : 'Nabzan',
         artist : 'Arjan Dhillon',
         album : 'VLC',
         released : '30-03-2022',
         music : 'https://s320.djpunjab.is/data/320/51664/299568/Nabzan%20-%20Arjan%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51651/300x700/COLT-Pavitar-Lassoi.jpg',
         name : 'COLT',
         artist : 'Pavitar Lassoi',
         album : 'Pavitar Lassoi',
         released : '26-03-2022',
         music : 'https://s320.djpunjab.is/data/320/51651/299555/COLT%20-%20Pavitar%20Lassoi.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51651/300x700/COLT-Pavitar-Lassoi.jpg',
         name : 'COLT',
         artist : 'Pavitar Lassoi',
         album : 'Pavitar Lassoi',
         released : '26-03-2022',
         music : 'https://s320.djpunjab.is/data/320/51651/299555/COLT%20-%20Pavitar%20Lassoi.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51635/300x700/Fuck-Em-All-Sidhu-Moose-Wala.jpg',
         name : 'Fuck Em All',
         artist : 'Sidhu Moose Wala',
         album : 'Sidhu Moose Wala',
         released : '23-03-2022',
         music : 'https://s320.djpunjab.is/data/320/51635/299539/Fuck%20Em%20All%20-%20Sidhu%20Moose%20Wala.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51632/300x700/Bae-Wazir-Patar.jpg',
         name : 'Bae',
         artist : 'Wazir Patar',
         album : 'Enury Day Records',
         released : '22-03-2022',
         music : 'https://s320.djpunjab.is/data/320/51632/299536/Bae%20-%20Wazir%20Patar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51630/300x700/Shehar-Vichon-Geda-Jordan-Sandhu.jpg',
         name : 'Shehar Vichon Geda',
         artist : 'Jordan Sandhu',
         album : 'Speed Records',
         released : '21-03-2022',
         music : 'https://s320.djpunjab.is/data/320/51630/299534/Shehar%20Vichon%20Geda%20-%20Jordan%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51619/300x700/Chak-Chak-Chak-Khan-Bhaini.jpg',
         name : 'Chak Chak Chak',
         artist : 'Khan Bhaini',
         album : 'Bang Music',
         released : '18-03-2022',
         music : 'https://s320.djpunjab.is/data/320/51619/299512/Chak%20Chak%20Chak%20-%20Khan%20Bhaini.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51618/300x700/Zindagi-Parmish-Verma.jpg',
         name : 'Zindagi',
         artist : 'Parmish Verma',
         album : 'Parmish Verma Music',
         released : '18-03-2022',
         music : 'https://s320.djpunjab.is/data/320/51618/299511/Zindagi%20-%20Parmish%20Verma.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51616/300x700/Bas-Jaz-Dhami.jpg',
         name : 'Bas',
         artist : 'Jaz Dhami',
         album : 'Jaz Dhami Music',
         released : '18-03-2022',
         music : 'https://s320.djpunjab.is/data/320/51616/299509/Bas%20-%20Jaz%20Dhami.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51612/300x700/Order-Rajvir-Jawanda.jpg',
         name : 'Order',
         artist : 'Rajvir Jawanda',
         album : 'T-Series',
         released : '17-03-2022',
         music : 'https://s320.djpunjab.is/data/320/51612/299505/Order%20-%20Rajvir%20Jawanda.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51612/300x700/Order-Rajvir-Jawanda.jpg',
         name : 'Order',
         artist : 'Rajvir Jawanda',
         album : 'T-Series',
         released : '17-03-2022',
         music : 'https://s320.djpunjab.is/data/320/51612/299505/Order%20-%20Rajvir%20Jawanda.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51605/300x700/Shakti-Water-Sharry-Maan.jpg',
         name : 'Shakti Water',
         artist : 'Sharry Maan',
         album : 'The Maple Music',
         released : '16-03-2022',
         music : 'https://s320.djpunjab.is/data/320/51605/299498/Shakti%20Water%20-%20Sharry%20Maan.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51598/300x700/Missing-Me-Mickey-Singh.jpg',
         name : 'Missing Me',
         artist : 'Mickey Singh',
         album : 'Treehouse V.H.T',
         released : '15-03-2022',
         music : 'https://s320.djpunjab.is/data/320/51598/299491/Missing%20Me%20-%20Mickey%20Singh.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51596/300x700/Dil-Mangeya-Sajjan-Adeeb.jpg',
         name : 'Dil Mangeya',
         artist : 'Sajjan Adeeb',
         album : 'Sajjan Adeeb',
         released : '15-03-2022',
         music : 'https://s320.djpunjab.is/data/320/51596/299489/Dil%20Mangeya%20-%20Sajjan%20Adeeb.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51589/300x700/Wait-And-Watch-Prem-Dhillon.jpg',
         name : 'Wait And Watch',
         artist : 'Prem Dhillon',
         album : 'Bamb Beats',
         released : '14-03-2022',
         music : 'https://s320.djpunjab.is/data/320/51589/299482/Wait%20And%20Watch%20-%20Prem%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51588/300x700/Vip-Diljit-Dosanjh.jpg',
         name : 'Vip',
         artist : 'Diljit Dosanjh',
         album : 'Raj Ranjodh Music',
         released : '13-03-2022',
         music : 'https://s320.djpunjab.is/data/320/51588/299481/Vip%20-%20Diljit%20Dosanjh.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51578/300x700/Remix-Mashup-Gur-Sidhu.jpg',
         name : 'Remix Mashup',
         artist : 'Gur Sidhu',
         album : 'Times Music',
         released : '12-03-2022',
         music : 'https://s320.djpunjab.is/data/320/51578/299471/Remix%20Mashup%20-%20Gur%20Sidhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51573/300x700/Trouble-Maker-Amrit-Maan.jpg',
         name : 'Trouble Maker',
         artist : 'Amrit Maan',
         album : 'Times Music',
         released : '09-03-2022',
         music : 'https://s320.djpunjab.is/data/320/51573/299457/Trouble%20Maker%20-%20Amrit%20Maan.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51566/300x700/Jaane-Jassa-Dhillon.jpg',
         name : 'Jaane',
         artist : 'Jassa Dhillon',
         album : 'Jassa Dhillon Music',
         released : '08-03-2022',
         music : 'https://s320.djpunjab.is/data/320/51566/299450/Jaane%20-%20Jassa%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51563/300x700/Shadow-Jassa-Dhillon.jpg',
         name : 'Shadow',
         artist : 'Jassa Dhillon',
         album : 'Jassa Dhillon Music',
         released : '08-03-2022',
         music : 'https://s320.djpunjab.is/data/320/51563/299447/Shadow%20-%20Jassa%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51545/300x700/Kikli-(Babbar)-Amrit-Maan.jpg',
         name : 'Kikli (Babbar)',
         artist : 'Amrit Maan',
         album : 'Times Music',
         released : '04-03-2022',
         music : 'https://s320.djpunjab.is/data/320/51545/299429/Kikli%20(Babbar)%20-%20Amrit%20Maan.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51538/300x700/Velly-Deepak-Dhillon.jpg',
         name : 'Velly',
         artist : 'Deepak Dhillon Ft. Nijjar',
         album : 'Nijjar Inc',
         released : '04-03-2022',
         music : 'https://s320.djpunjab.is/data/320/51538/299422/Velly%20-%20Deepak%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51528/300x700/Good-In-Bad-Mani-Longia.jpg',
         name : 'Good In Bad',
         artist : 'Mani Longia',
         album : 'Mani Longia Music',
         released : '01-03-2022',
         music : 'https://s320.djpunjab.is/data/320/51528/299412/Good%20In%20Bad%20-%20Mani%20Longia.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51525/300x700/Notaan-Wang-Nirvair-Pannu.jpg',
         name : 'Notaan Wang',
         artist : 'Nirvair Pannu',
         album : 'Juke Dock',
         released : '28-02-2022',
         music : 'https://s320.djpunjab.is/data/320/51525/299409/Notaan%20Wang%20-%20Nirvair%20Pannu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51515/300x700/No-Love-Shubh.jpg',
         name : 'No Love',
         artist : 'Shubh',
         album : 'Shubh',
         released : '26-02-2022',
         music : 'https://s320.djpunjab.is/data/320/51515/299399/No%20Love%20-%20Shubh.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51506/300x700/Nadaan-Jehi-Aas-Satinder-Sartaaj.jpg',
         name : 'Nadaan Jehi Aas',
         artist : 'Satinder Sartaaj',
         album : 'Firdaus Production Inc',
         released : '24-02-2022',
         music : 'https://s320.djpunjab.is/data/320/51506/299390/Nadaan%20Jehi%20Aas%20-%20Satinder%20Sartaaj.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51503/300x700/Jatti-Di-Torh-JK.jpg',
         name : 'Jatti Di Torh',
         artist : 'JK',
         album : 'Check One Recordz',
         released : '23-02-2022',
         music : 'https://s320.djpunjab.is/data/320/51503/299387/Jatti%20Di%20Torh%20-%20JK.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51497/300x700/Blackia-Prem-Dhillon.jpg',
         name : 'Blackia',
         artist : 'Prem Dhillon',
         album : 'Prem Dhillon',
         released : '22-02-2022',
         music : 'https://s320.djpunjab.is/data/320/51497/299374/Blackia%20-%20Prem%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51469/300x700/Entry-Amar-Sehmbi.jpg',
         name : 'Entry',
         artist : 'Amar Sehmbi',
         album : 'Jass Records',
         released : '16-02-2022',
         music : 'https://s320.djpunjab.is/data/320/51469/299346/Entry%20-%20Amar%20Sehmbi.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51458/300x700/Loveholic-Prabh-Gill.jpg',
         name : 'Shukarguzar',
         artist : 'Prabh Gill',
         album : 'Prabh Gill Music',
         released : '16-02-2022',
         music : 'https://s320.djpunjab.is/data/320/51458/299330/Shukarguzar%20-%20Prabh%20Gill.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51455/300x700/Feels-Like-Mickey-Singh.jpg',
         name : 'Feels Like',
         artist : 'Mickey Singh',
         album : 'TreeHouse V.H.T',
         released : '15-02-2022',
         music : 'https://s320.djpunjab.is/data/320/51455/299324/Feels%20Like%20-%20Mickey%20Singh.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51448/300x700/Rose-Bud-Tarsem-Jassar.jpg',
         name : 'Rose Bud',
         artist : 'Tarsem Jassar',
         album : 'Vehli Janta Records',
         released : '14-02-2022',
         music : 'https://s320.djpunjab.is/data/320/51448/299317/Rose%20Bud%20-%20Tarsem%20Jassar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51444/300x700/Adore-Amrinder-Gill.jpg',
         name : 'Adore',
         artist : 'Amrinder Gill',
         album : 'Rhythm Boyz',
         released : '14-02-2022',
         music : 'https://s320.djpunjab.is/data/320/51444/299313/Adore%20-%20Amrinder%20Gill.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51442/300x700/Youngest-In-Charge-Sidhu-Moose-Wala.jpg',
         name : 'Youngest In Charge',
         artist : 'Sidhu Moose Wala',
         album : 'Sidhu Moose Wala Music',
         released : '13-02-2022',
         music : 'https://s320.djpunjab.is/data/320/51442/299311/Youngest%20In%20Charge%20-%20Sidhu%20Moose%20Wala.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51437/300x700/Dreams-Unfold-Prem-Dhillon.jpg',
         name : 'Dreams Unfold',
         artist : 'Prem Dhillon',
         album : 'Melody House',
         released : '12-02-2022',
         music : 'https://s320.djpunjab.is/data/320/51437/299306/Dreams%20Unfold%20-%20Prem%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51431/300x700/Munda-Arjan-Dhillon.jpg',
         name : 'Munda',
         artist : 'Arjan Dhillon',
         album : 'Brown Studios',
         released : '10-02-2022',
         music : 'https://s320.djpunjab.is/data/320/51431/299300/Munda%20-%20Arjan%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51425/300x700/Madkan-(Up-&-Down)-Kulbir-Jhinjer.jpg',
         name : 'Madkan (Up & Down)',
         artist : 'Kulbir Jhinjer',
         album : 'Kulbir Jhinjer Music',
         released : '09-02-2022',
         music : 'https://s320.djpunjab.is/data/320/51425/299294/Madkan%20(Up%20&%20Down)%20-%20Kulbir%20Jhinjer.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51385/300x700/Waja-The-Prophec.jpg',
         name : 'Waja',
         artist : 'The Prophec',
         album : 'PropheC Productions',
         released : '03-02-2022',
         music : 'https://s320.djpunjab.is/data/320/51385/299243/Waja%20-%20The%20Prophec.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51352/300x700/All-Okk-AP-Dhillon.jpg',
         name : 'All Okk',
         artist : 'AP Dhillon',
         album : 'AP Dhillon Music',
         released : '27-01-2022',
         music : 'https://s320.djpunjab.is/data/320/51352/299201/All%20Okk%20-%20AP%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51325/300x700/Jatt-Flex-Amrit-Maan.jpg',
         name : 'Jatt Flex',
         artist : 'Amrit Maan',
         album : 'Cocktail Music',
         released : '22-01-2022',
         music : 'https://s320.djpunjab.is/data/320/51325/299171/Jatt%20Flex%20-%20Amrit%20Maan.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51323/300x700/Untouchable-Tegi-Pannu.jpg',
         name : 'Untouchable',
         artist : 'Tegi Pannu',
         album : 'Manni Sandhu',
         released : '21-01-2022',
         music : 'https://s320.djpunjab.is/data/320/51323/299169/Untouchable%20-%20Tegi%20Pannu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51321/300x700/Raundi-A-Kay.jpg',
         name : 'Raundi',
         artist : 'A Kay',
         album : 'Pendu boyz',
         released : '21-01-2022',
         music : 'https://s320.djpunjab.is/data/320/51321/299155/Raundi%20-%20A%20Kay.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51312/300x700/Aaja-Ni-Aaja-Manj-Musik.jpg',
         name : 'Aaja Ni Aaja',
         artist : 'Manj Musik Ft. Arjun/Fateh',
         album : 'Saregama Music',
         released : '19-01-2022',
         music : 'https://s320.djpunjab.is/data/320/51312/299146/Aaja%20Ni%20Aaja%20-%20Manj%20Musik.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51308/300x700/Gustakhiyan-The-Landers.jpg',
         name : 'Gustakhiyan',
         artist : 'The Landers',
         album : 'The Landers Music',
         released : '19-01-2022',
         music : 'https://s320.djpunjab.is/data/320/51308/299142/Gustakhiyan%20-%20The%20Landers.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51300/300x700/Gaddi-Kaali-Jassie-Gill.jpg',
         name : 'Gaddi Kaali',
         artist : 'Jassie Gill',
         album : 'Jassie Gill Music',
         released : '18-01-2022',
         music : 'https://s320.djpunjab.is/data/320/51300/299134/Gaddi%20Kaali%20-%20Jassie%20Gill.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51295/300x700/YKWIM-Karan-Aujla.jpg',
         name : 'YKWIM',
         artist : 'Karan Aujla',
         album : 'Rehaan Records',
         released : '17-01-2022',
         music : 'https://s320.djpunjab.is/data/320/51295/299129/YKWIM%20-%20Karan%20Aujla.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51286/300x700/Fake-AP-Dhillon.jpg',
         name : 'Fake',
         artist : 'AP Dhillon',
         album : 'Run-Up Records',
         released : '14-01-2022',
         music : 'https://s320.djpunjab.is/data/320/51286/299120/Fake%20-%20AP%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51273/300x700/Diamond-Koka-Gurnam-Bhullar.jpg',
         name : 'Diamond Koka',
         artist : 'Gurnam Bhullar',
         album : 'Desi Junction',
         released : '12-01-2022',
         music : 'https://s320.djpunjab.is/data/320/51273/299107/Diamond%20Koka%20-%20Gurnam%20Bhullar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51248/300x700/All-Ace-Prem-Dhillon.jpg',
         name : 'All Ace',
         artist : 'Prem Dhillon',
         album : 'Prem Dhillon Music',
         released : '06-01-2022',
         music : 'https://s320.djpunjab.is/data/320/51248/299082/All%20Ace%20-%20Prem%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51247/300x700/Black-Effect-Jordan-Sandhu.jpg',
         name : 'Black Effect',
         artist : 'Jordan Sandhu',
         album : 'Times Music',
         released : '06-01-2022',
         music : 'https://s320.djpunjab.is/data/320/51247/299081/Black%20Effect%20-%20Jordan%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51239/300x700/Janaza-Wazir-Patar.jpg',
         name : 'Janaza',
         artist : 'Wazir Patar',
         album : 'Wazir Patar Music',
         released : '04-01-2022',
         music : 'https://s320.djpunjab.is/data/320/51239/299073/Janaza%20-%20Wazir%20Patar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51228/300x700/Kul-Milake-Jatt-Gurnam-Bhullar.jpg',
         name : 'Kul Milake Jatt',
         artist : 'Gurnam Bhullar',
         album : 'Desi Junction',
         released : '03-01-2022',
         music : 'https://s320.djpunjab.is/data/320/51228/299062/Kul%20Milake%20Jatt%20-%20Gurnam%20Bhullar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51216/300x700/2022-FLOW-Sikander-Kahlon.jpg',
         name : '2022 FLOW',
         artist : 'Sikander Kahlon',
         album : 'Sikander Kahlon Music',
         released : '01-01-2022',
         music : 'https://s320.djpunjab.is/data/320/51216/299050/2022%20FLOW%20-%20Sikander%20Kahlon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51203/300x700/Khaab-AP-Dhillon.jpg',
         name : 'Khaab',
         artist : 'AP Dhillon',
         album : 'AP Dhillon Music',
         released : '30-12-2021',
         music : 'https://s320.djpunjab.is/data/320/51203/299037/Khaab%20-%20AP%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51191/300x700/Payback-Pavitar-Lassoi.jpg',
         name : 'Payback',
         artist : 'Pavitar Lassoi',
         album : 'PB Studios',
         released : '29-12-2021',
         music : 'https://s320.djpunjab.is/data/320/51191/299024/Payback%20-%20Pavitar%20Lassoi.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51180/300x700/To-The-Warrior-Nseeb.jpg',
         name : 'To The Warrior',
         artist : 'Nseeb FT. Tarsem Jasar',
         album : 'NseeB Music',
         released : '28-12-2021',
         music : 'https://s320.djpunjab.is/data/320/51180/299013/To%20The%20Warrior%20-%20Nseeb.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51164/300x700/Unforgettable-Diljit-Dosanjh.jpg',
         name : 'Unforgettable',
         artist : 'Diljit Dosanjh',
         album : 'Double Up Entertainment',
         released : '24-12-2021',
         music : 'https://s320.djpunjab.is/data/320/51164/298997/Unforgettable%20-%20Diljit%20Dosanjh.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51140/300x700/Too-Much-Garry-Sandhu.jpg',
         name : 'Too Much',
         artist : 'Garry Sandhu',
         album : 'Fresh Media Records',
         released : '21-12-2021',
         music : 'https://s320.djpunjab.is/data/320/51140/298966/Too%20Much%20-%20Garry%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51134/300x700/Sira-Dilpreet-Dhillon.jpg',
         name : 'Sira',
         artist : 'Dilpreet Dhillon',
         album : 'Times Music',
         released : '20-12-2021',
         music : 'https://s320.djpunjab.is/data/320/51134/298960/Sira%20-%20Dilpreet%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51096/300x700/Tom-Ford-Amantej-Hundal.jpg',
         name : 'Tom Ford',
         artist : 'Amantej Hundal',
         album : 'PB 26 Records',
         released : '16-12-2021',
         music : 'https://s320.djpunjab.is/data/320/51096/298918/Tom%20Ford%20-%20Amantej%20Hundal.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51095/300x700/What-Ve--Diljit-Dosanjh.jpg',
         name : 'What Ve',
         artist : 'Diljit Dosanjh',
         album : 'Diljit Dosanjh Music',
         released : '16-12-2021',
         music : 'https://s320.djpunjab.is/data/320/51095/298917/What%20Ve%20-%20Diljit%20Dosanjh.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/51021/300x700/Lakh-Rupiya-Veer-Sandhu.jpg',
         name : 'Lakh Rupiya',
         artist : 'Veer Sandhu',
         album : 'Mediaone Network',
         released : '08-12-2021',
         music : 'https://s320.djpunjab.is/data/320/51021/298839/Lakh%20Rupiya%20-%20Veer%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50970/300x700/Pehchan-Ranjit-Bawa.jpg',
         name : 'Pehchan',
         artist : 'Ranjit Bawa',
         album : 'Ranjit Bawa Music',
         released : '02-12-2021',
         music : 'https://s320.djpunjab.is/data/320/50970/298769/Pehchan%20-%20Ranjit%20Bawa.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50930/300x700/Spaceship-AP-Dhillon.jpg',
         name : 'Spaceship',
         artist : 'AP Dhillon',
         album : 'Run-Up Records',
         released : '23-11-2021',
         music : 'https://s320.djpunjab.is/data/320/50930/298717/Spaceship%20-%20AP%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50930/300x700/Spaceship-AP-Dhillon.jpg',
         name : 'Tere Te',
         artist : 'AP Dhillon',
         album : 'Run-Up Records',
         released : '23-11-2021',
         music : 'https://s320.djpunjab.is/data/320/50929/298716/Tere%20Te%20-%20AP%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50930/300x700/Spaceship-AP-Dhillon.jpg',
         name : 'Majhe Ale',
         artist : 'AP Dhillon FT Shinda, Gurinder',
         album : 'Run-Up Records',
         released : '23-11-2021',
         music : 'https://s320.djpunjab.is/data/320/50928/298715/Majhe%20Aale%20-%20AP%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50930/300x700/Spaceship-AP-Dhillon.jpg',
         name : 'War',
         artist : 'AP Dhillon FT Shinda, Gurinder',
         album : 'Run-Up Records',
         released : '23-11-2021',
         music : 'https://s320.djpunjab.is/data/320/50927/298714/War%20-%20AP%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50930/300x700/Spaceship-AP-Dhillon.jpg',
         name : 'Desires',
         artist : 'AP Dhillon FT Shinda, Gurinder',
         album : 'Run-Up Records',
         released : '23-11-2021',
         music : 'https://s320.djpunjab.is/data/320/50926/298713/Desires%20-%20AP%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50930/300x700/Spaceship-AP-Dhillon.jpg',
         name : 'Against All Odds',
         artist : 'AP Dhillon FT Shinda, Gurinder',
         album : 'Run-Up Records',
         released : '23-11-2021',
         music : 'https://s320.djpunjab.is/data/320/50925/298712/Against%20All%20Odds%20-%20AP%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50908/300x700/Satisfy-Sidhu-Moose-Wala.jpg',
         name : 'Satisfy',
         artist : 'Sidhu Moose Wala Ft. Shooter',
         album : '5911 Records',
         released : '17-11-2021',
         music : 'https://s320.djpunjab.is/data/320/50908/298695/Satisfy%20-%20Sidhu%20Moose%20Wala.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50901/300x700/Rahiye-Hasde-Khan-Bhaini.jpg',
         name : 'Rahiye Hasde',
         artist : 'Khan Bhaini',
         album : 'Sycostyle Music',
         released : '16-11-2021',
         music : 'https://s320.djpunjab.is/data/320/50901/298688/Rahiye%20Hasde%20-%20Khan%20Bhaini.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50899/300x700/Galbaat-Arjan-Dhillon.jpg',
         name : 'Galbaat',
         artist : 'Arjan Dhillon',
         album : 'Brown Studios',
         released : '15-11-2021',
         music : 'https://s320.djpunjab.is/data/320/50899/298686/Galbaat%20-%20Arjan%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50889/300x700/Waare-Waare-Navaan-Sandhu.jpg',
         name : 'Waare Waare',
         artist : 'Navaan Sandhu',
         album : 'Navaan Sandhu Music',
         released : '12-11-2021',
         music : 'https://s320.djpunjab.is/data/320/50889/298676/Waare%20Waare%20-%20Navaan%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50886/300x700/My-Talk-Nseeb.jpg',
         name : 'My Talk',
         artist : 'Nseeb',
         album : 'NseeB Music',
         released : '12-11-2021',
         music : 'https://s320.djpunjab.is/data/320/50886/298673/My%20Talk%20-%20Nseeb.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50864/300x700/Gangwar-Sabi-Bhinder.jpg',
         name : 'Gangwar',
         artist : 'Sabi Bhinder',
         album : 'Jatt Life Studios',
         released : '08-11-2021',
         music : 'https://s320.djpunjab.is/data/320/50864/298646/Gangwar%20-%20Sabi%20Bhinder.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50863/300x700/Jawani-Khan-Bhaini.jpg',
         name : 'Jawani',
         artist : 'Khan Bhaini',
         album : 'Khan Bhaini Music',
         released : '07-11-2021',
         music : 'https://s320.djpunjab.is/data/320/50863/298645/Jawani%20-%20Khan%20Bhaini.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50861/300x700/Dabde-Ni-Ammy-Virk.jpg',
         name : 'Dabde Ni',
         artist : 'Ammy Virk',
         album : 'Burfi Music',
         released : '07-11-2021',
         music : 'https://s320.djpunjab.is/data/320/50861/298643/Dabde%20Ni%20-%20Ammy%20Virk.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50847/300x700/Mashup-Amantej-Hundal.jpg',
         name : 'Mashup',
         artist : 'Amantej Hundal',
         album : 'PB 26 Records',
         released : '01-11-2021',
         music : 'https://s320.djpunjab.is/data/320/50847/298629/Mashup%20-%20Amantej%20Hundal.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50792/300x700/Koke-Arjan-Dhillon.jpg',
         name : 'Koke',
         artist : 'Arjan Dhillon',
         album : 'Blue Beat Studios',
         released : '17-10-2021',
         music : 'https://s320.djpunjab.is/data/320/50792/298574/Koke%20-%20Arjan%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50786/300x700/Kingpin-Tarsem-Jassar.jpg',
         name : 'Kingpin',
         artist : 'Tarsem Jassar',
         album : 'Vehli Janta Records',
         released : '15-10-2021',
         music : 'https://s320.djpunjab.is/data/320/50786/298568/Kingpin%20-%20Tarsem%20Jassar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50785/300x700/Fully-Loaded-Tegi-Pannu.jpg',
         name : 'Fully Loaded',
         artist : 'Tegi Pannu',
         album : 'Collab Creations',
         released : '15-10-2021',
         music : 'https://s320.djpunjab.is/data/320/50785/298567/Fully%20Loaded%20-%20Tegi%20Pannu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50775/300x700/12-Bande-Varinder-Brar.jpg',
         name : '12 Bande',
         artist : 'Varinder Brar',
         album : 'Varinder Brar Music',
         released : '12-10-2021',
         music : 'https://s320.djpunjab.is/data/320/50775/298559/12%20Bande%20-%20Varinder%20Brar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50770/300x700/Taaz-Navaan-Sandhu.jpg',
         name : 'Taaz',
         artist : 'Navaan Sandhu',
         album : 'Legacy Records',
         released : '10-10-2021',
         music : 'https://s320.djpunjab.is/data/320/50770/298554/Taaz%20-%20Navaan%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50753/300x700/Jaan-Arjan-Dhillon.jpg',
         name : 'Jaan',
         artist : 'Arjan Dhillon',
         album : 'Arjan Dhillon Music',
         released : '05-10-2021',
         music : 'https://s320.djpunjab.is/data/320/50753/298537/Jaan%20-%20Arjan%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50713/300x700/Stand-Navaan-Sandhu.jpg',
         name : 'Stand',
         artist : 'Navaan Sandhu',
         album : 'Navaan Sandhu Music',
         released : '27-09-2021',
         music : 'https://s320.djpunjab.is/data/320/50713/298484/Stand%20-%20Navaan%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50711/300x700/Kalli-Sohni-Arjan-Dhillon.jpg',
         name : 'Kalli Sohni',
         artist : 'Arjan Dhillon',
         album : 'Arjan Dhillon Music',
         released : '27-09-2021',
         music : 'https://s320.djpunjab.is/data/320/50711/298479/Kalli%20Sohni%20-%20Arjan%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50699/300x700/Shinin-Tegi-Pannu.jpg',
         name : 'Shinin',
         artist : 'Tegi Pannu',
         album : 'Collab Creations',
         released : '25-09-2021',
         music : 'https://s320.djpunjab.is/data/320/50699/298445/Shinin%20-%20Tegi%20Pannu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50697/300x700/Churi-Khan-Bhaini.jpg',
         name : 'Churi',
         artist : 'Khan Bhaini',
         album : 'Collab Creations',
         released : '23-09-2021',
         music : 'https://s320.djpunjab.is/data/320/50697/298443/Churi%20-%20Khan%20Bhaini.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50653/300x700/Hanji-Hanji-Navaan-Sandhu.jpg',
         name : 'Hanji Hanji',
         artist : 'Navaan Sandhu',
         album : 'B Major Records',
         released : '10-09-2021',
         music : 'https://s320.djpunjab.is/data/320/50653/298382/Hanji%20Hanji%20-%20Navaan%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50647/300x700/Click-That-B-Kickin-It-(Yaar-Jatt-De)-Karan-Aujla.jpg',
         name : 'Click That B Kickin It',
         artist : 'Karan Aujla',
         album : 'Speed Records',
         released : '09-09-2021',
         music : 'https://s320.djpunjab.is/data/320/50647/298376/Click%20That%20B%20Kickin%20It%20(Yaar%20Jatt%20De)%20-%20Karan%20Aujla.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50621/300x700/Jailaan-(Moosa-Jatt)-Sidhu-Moose-Wala.jpg',
         name : 'Jailaan (Moosa Jatt)',
         artist : 'Sidhu Moose Wala',
         album : 'Times Music',
         released : '02-09-2021',
         music : 'https://s320.djpunjab.is/data/320/50621/298351/Jailaan%20(Moosa%20Jatt)%20-%20Sidhu%20Moose%20Wala.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50606/300x700/Mi-Amor-Fateh.jpg',
         name : 'Mi Amor',
         artist : 'Fateh',
         album : 'WinWin Records',
         released : '28-08-2021',
         music : 'https://s320.djpunjab.is/data/320/50606/298327/Mi%20Amor%20-%20Fateh.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50600/300x700/Shah-Ji-Prem-Dhillon.jpg',
         name : 'Shah Ji',
         artist : 'Prem Dhillon',
         album : 'Prem Dhillon Music',
         released : '27-08-2021',
         music : 'https://s320.djpunjab.is/data/320/50600/298318/Shah%20Ji%20-%20Prem%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50581/300x700/Schedule-Tegi-Pannu.jpg',
         name : 'Schedule',
         artist : 'Tegi Pannu',
         album : 'Collab Creations',
         released : '21-08-2021',
         music : 'https://s320.djpunjab.is/data/320/50581/298268/Schedule%20-%20Tegi%20Pannu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50579/300x700/Lover-Diljit-Dosanjh.jpg',
         name : 'Lover',
         artist : 'Diljit Dosanjh',
         album : 'Diljit Dosanjh Music',
         released : '21-08-2021',
         music : 'https://s320.djpunjab.is/data/320/50579/298266/Lover%20-%20Diljit%20Dosanjh.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50556/300x700/NA-NA-Mickey-Singh.jpg',
         name : 'NA NA',
         artist : 'Mickey Singh',
         album : 'TreeHouse V.H.T',
         released : '17-08-2021',
         music : 'https://s320.djpunjab.is/data/320/50556/298241/NA%20NA%20-%20Mickey%20Singh.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50533/300x700/My-Rulez-Arjan-Dhillon.jpg',
         name : 'My Rulez',
         artist : 'Arjan Dhillon',
         album : 'White Hill Music',
         released : '10-08-2021',
         music : 'https://s320.djpunjab.is/data/320/50533/298219/My%20Rulez%20-%20Arjan%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50532/300x700/Celebrity-Killer-Sidhu-Moose-Wala.jpg',
         name : 'Celebrity Kille',
         artist : 'Sidhu Moose Wala',
         album : 'Sidhu Moose Wala Music',
         released : '09-08-2021',
         music : 'https://s320.djpunjab.is/data/320/50532/298218/Celebrity%20Killer%20-%20Sidhu%20Moose%20Wala.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50514/300x700/Yaar-Jatt-De-Karan-Aujla.jpg',
         name : 'Yaar Jatt',
         artist : 'Karan Aujla',
         album : 'Karan Aujla Music',
         released : '05-08-2021',
         music : 'https://s320.djpunjab.is/data/320/50514/298192/Yaar%20Jatt%20De%20-%20Karan%20Aujla.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50457/300x700/GOAT-Sidhu-Moose-Wala.jpg',
         name : 'GOAT',
         artist : 'Sidhu Moose Wala',
         album : 'Sidhu Moose Wala Music',
         released : '25-07-2021',
         music : 'https://s320.djpunjab.is/data/320/50457/298135/GOAT%20-%20Sidhu%20Moose%20Wala.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50441/300x700/Power-Sidhu-Moose-Wala.jpg',
         name : 'Power',
         artist : 'Sidhu Moose Wala',
         album : 'Sidhu Moose Wala Music',
         released : '21-07-2021',
         music : 'https://s320.djpunjab.is/data/320/50441/298119/Power%20-%20Sidhu%20Moose%20Wala.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50438/300x700/Mastani-Varinder-Brar.jpg',
         name : 'Mastani',
         artist : 'Varinder Brar',
         album : 'White Hill Music',
         released : '21-07-2021',
         music : 'https://s320.djpunjab.is/data/320/50438/298116/Mastani%20-%20Varinder%20Brar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50423/300x700/IDGAF-Sidhu-Moose-Wala.jpg',
         name : 'IDGAF',
         artist : 'Sidhu Moose Wala',
         album : 'Sidhu Moose Wala Music',
         released : '21-07-2021',
         music : 'https://s320.djpunjab.is/data/320/50423/298101/IDGAF%20-%20Sidhu%20Moose%20Wala.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50418/300x700/Ma-Belle-AP-Dhillon.jpg',
         name : 'Ma Belle',
         artist : 'AP Dhillon',
         album : 'Run-Up Records',
         released : '16-07-2021',
         music : 'https://s320.djpunjab.is/data/320/50418/298096/Ma%20Belle%20-%20AP%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50416/300x700/Loud-Ranjit-Bawa.jpg',
         name : 'Loud',
         artist : 'Ranjit Bawa',
         album : 'Speed Records',
         released : '16-07-2021',
         music : 'https://s320.djpunjab.is/data/320/50416/298093/Loud%20-%20Ranjit%20Bawa.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50413/300x700/295-Sidhu-Moose-Wala.jpg',
         name : '295',
         artist : 'Sidhu Moose Wala',
         album : 'Sidhu Moose Wala Music',
         released : '14-07-2021',
         music : 'https://s320.djpunjab.is/data/320/50413/298090/295%20-%20Sidhu%20Moose%20Wala.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50412/300x700/Shartan-Mankirat-Pannu.jpg',
         name : 'Shartan',
         artist : 'Khan Bhaini Mankirat Pannu',
         album : 'Thuglife Records',
         released : '14-07-2021',
         music : 'https://s320.djpunjab.is/data/320/50412/298089/Shartan%20-%20Mankirat%20Pannu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50404/300x700/Calaboose-Sidhu-Moose-Wala.jpg',
         name : 'Calaboose',
         artist : 'Sidhu Moose Wala',
         album : 'Sidhu Moose Wala Music',
         released : '10-07-2021',
         music : 'https://s320.djpunjab.is/data/320/50404/298080/Calaboose%20-%20Sidhu%20Moose%20Wala.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50398/300x700/Koi-Na-Nseeb.jpg',
         name : 'Koi Na',
         artist : 'Nseeb',
         album : '4N Recrods Inc',
         released : '09-07-2021',
         music : 'https://s320.djpunjab.is/data/320/50398/298074/Koi%20Na%20-%20Nseeb.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50393/300x700/Built-Different-Sidhu-Moose-Wala.jpg',
         name : 'Calaboose',
         artist : 'Sidhu Moose Wala',
         album : 'Sidhu Moose Wala Music',
         released : '08-07-2021',
         music : 'https://s320.djpunjab.is/data/320/50393/298069/Built%20Different%20-%20Sidhu%20Moose%20Wala.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50391/300x700/Chu-Gon-Do-Karan-Aujla.jpg',
         name : 'Chu Gon Do',
         artist : 'Karan Aujla',
         album : 'Speed Records',
         released : '07-07-2021',
         music : 'https://s320.djpunjab.is/data/320/50391/298067/Chu%20Gon%20Do%20-%20Karan%20Aujla.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50389/300x700/Balle-Balle-Nirvair-Pannu.jpg',
         name : 'Balle Balle',
         artist : 'Nirvair Pannu',
         album : 'Juke Dock',
         released : '07-07-2021',
         music : 'https://s320.djpunjab.is/data/320/50389/298065/Balle%20Balle%20-%20Nirvair%20Pannu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50383/300x700/Pehli-Peshi-Arjan-Dhillon.jpg',
         name : 'Pehli Peshi',
         artist : 'Arjan Dhillon',
         album : 'Brown Studios',
         released : '06-07-2021',
         music : 'https://s320.djpunjab.is/data/320/50383/298060/Pehli%20Peshi%20-%20Arjan%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50376/300x700/G-Shit-Sidhu-Moose-Wala.jpg',
         name : 'G Shit',
         artist : 'Sidhu Moose Wala',
         album : 'Sidhu Moose Wala Music',
         released : '04-07-2021',
         music : 'https://s320.djpunjab.is/data/320/50376/298052/G%20Shit%20-%20Sidhu%20Moose%20Wala.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50366/300x700/Umbrella-Diljit-Dosanjh.jpg',
         name : 'Umbrella',
         artist : 'Diljit Dosanjh',
         album : 'Double Up Entertainment',
         released : '02-07-2021',
         music : 'https://s320.djpunjab.is/data/320/50366/298042/Umbrella%20-%20Diljit%20Dosanjh.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50364/300x700/Aroma-Sidhu-Moose-Wala.jpg',
         name : 'Aroma',
         artist : 'Sidhu Moose Wala',
         album : 'Sidhu Moose Wala Music',
         released : '02-07-2021',
         music : 'https://s320.djpunjab.is/data/320/50364/298039/Aroma%20-%20Sidhu%20Moose%20Wala.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50354/300x700/Midnight-Mob-Nseeb.jpg',
         name : 'Midnight Mob',
         artist : 'Nseeb',
         album : 'Nseeb Music',
         released : '30-06-2021',
         music : 'https://s320.djpunjab.is/data/320/50354/298030/Midnight%20Mob%20-%20Nseeb.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50349/300x700/The-Real-Men-Gopi-Waraich.jpg',
         name : 'The Real Men',
         artist : 'Gopi Waraich',
         album : 'Vehli Janta Records',
         released : '29-06-2021',
         music : 'https://s320.djpunjab.is/data/320/50349/298017/The%20Real%20Men%20-%20Gopi%20Waraich.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50331/300x700/Malwa-Block-Sidhu-Moose-Wala.jpg',
         name : 'Malwa Block',
         artist : 'Sidhu Moose Wala',
         album : 'Sidhu Moose Wala Music',
         released : '23-06-2021',
         music : 'https://s320.djpunjab.is/data/320/50331/297967/Malwa%20Block%20-%20Sidhu%20Moose%20Wala.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50311/300x700/Mere-Wala-Jatt-Prem-Dhillon.jpg',
         name : 'Mere Wala Jatt',
         artist : 'Prem Dhillon',
         album : 'Speed Records',
         released : '19-06-2021',
         music : 'https://s320.djpunjab.is/data/320/50311/297947/Mere%20Wala%20Jatt%20-%20Prem%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50299/300x700/Signed-To-God-Sidhu-Moose-Wala.jpg',
         name : 'Signed To God',
         artist : 'Sidhu Moose Wala',
         album : 'Sidhu Moose Wala Music',
         released : '16-06-2021',
         music : 'https://s320.djpunjab.is/data/320/50299/297935/Signed%20To%20God%20-%20Sidhu%20Moose%20Wala.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50295/300x700/Surma-Khan-Bhaini.jpg',
         name : 'Surma',
         artist : 'Khan Bhaini',
         album : 'Speed Records',
         released : '15-06-2021',
         music : 'https://s320.djpunjab.is/data/320/50295/297931/Surma%20-%20Khan%20Bhaini.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50269/300x700/Me-And-My-Girlfriend-Sidhu-Moose-Wala.jpg',
         name : 'Me And My Girlfriend',
         artist : 'Sidhu Moose Wala',
         album : 'Sidhu Moose Wala Music',
         released : '07-06-2021',
         music : 'https://s320.djpunjab.is/data/320/50269/297905/Me%20And%20My%20Girlfriend%20-%20Sidhu%20Moose%20Wala.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50244/300x700/Brown-Shortie-Sidhu-Moose-Wala.jpg',
         name : 'Brown Shortie',
         artist : 'Sidhu Moose Wala',
         album : 'Sidhu Moose Wala Music',
         released : '29-05-2021',
         music : 'https://s320.djpunjab.is/data/320/50244/297880/Brown%20Shortie%20-%20Sidhu%20Moose%20Wala.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50237/300x700/80-90-Te-Garry-Sandhu.jpg',
         name : '80-90 Te',
         artist : 'Garry Sandhu',
         album : '4N Records Inc',
         released : '27-05-2021',
         music : 'https://s320.djpunjab.is/data/320/50237/297873/80-90%20Te%20-%20Garry%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50223/300x700/Us-Sidhu-Moose-Wala.jpg',
         name : 'Us',
         artist : 'Sidhu Moose Wala',
         album : 'Sidhu Moose Wala Music',
         released : '23-05-2021',
         music : 'https://s320.djpunjab.is/data/320/50223/297859/Us%20-%20Sidhu%20Moose%20Wala.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50216/300x700/Racks-And-Rounds-Sidhu-Moose-Wala.jpg',
         name : 'Racks And Rounds',
         artist : 'Sidhu Moose Wala',
         album : 'Sidhu Moose Wala Music',
         released : '21-05-2021',
         music : 'https://s320.djpunjab.is/data/320/50216/297852/Racks%20And%20Rounds%20-%20Sidhu%20Moose%20Wala.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50209/300x700/UNFUCKWITHABLE-Sidhu-Moose-Wala.jpg',
         name : 'UNFUCKWITHABLE',
         artist : 'Sidhu Moose Wala',
         album : 'Sidhu Moose Wala Music',
         released : '18-05-2021',
         music : 'https://s320.djpunjab.is/data/320/50209/297839/UNFUCKWITHABLE%20-%20Sidhu%20Moose%20Wala.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50207/300x700/Jodi-Sajjan-Adeeb.jpg',
         name : 'Jodi',
         artist : 'Sajjan Adeeb',
         album : 'Leaf Record',
         released : '17-05-2021',
         music : 'https://s320.djpunjab.is/data/320/50207/297837/Jodi%20-%20Sajjan%20Adeeb.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50206/300x700/Ishq-Shipra-Goyal.jpg',
         name : 'Ishq',
         artist : 'Shipra Goyal',
         album : 'Fresh Media Records',
         released : '17-05-2021',
         music : 'https://s320.djpunjab.is/data/320/50206/297836/Ishq%20-%20Shipra%20Goyal.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50203/300x700/Burberry-Sidhu-Moose-Wala.jpg',
         name : 'Burberry',
         artist : 'Sidhu Moose Wala',
         album : 'Sidhu Moose Wala Music',
         released : '17-05-2021',
         music : 'https://s320.djpunjab.is/data/320/50203/297833/Burberry%20-%20Sidhu%20Moose%20Wala.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50200/300x700/Bitch-Im-Back-Sidhu-Moose-Wala.jpg',
         name : 'Bitch Im Back',
         artist : 'Sidhu Moose Wala',
         album : 'Sidhu Moose Wala Music',
         released : '17-05-2021',
         music : 'https://s320.djpunjab.is/data/320/50200/297829/Bitch%20Im%20Back%20-%20Sidhu%20Moose%20Wala.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50190/300x700/Deaf-N-Dumb-Himmat-Sandhu.jpg',
         name : 'Deaf N Dumb',
         artist : 'Himmat Sandhu',
         album : 'Himmat Sandhu Music',
         released : '13-05-2021',
         music : 'https://s320.djpunjab.is/data/320/50190/297818/Deaf%20N%20Dumb%20-%20Himmat%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50182/300x700/Teri-Meri-Kulbir-Jhinjer.jpg',
         name : 'Teri Meri',
         artist : 'Kulbir Jhinjer',
         album : 'Juke Dock',
         released : '12-05-2021',
         music : 'https://s320.djpunjab.is/data/320/50182/297810/Teri%20Meri%20-%20Kulbir%20Jhinjer.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50180/300x700/Kingdom-Gagan-Kokri.jpg',
         name : 'Kingdom',
         artist : 'Gagan Kokri',
         album : 'Saga Music',
         released : '12-05-2021',
         music : 'https://s320.djpunjab.is/data/320/50180/297808/Kingdom%20-%20Gagan%20Kokri.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50132/300x700/Badle-Sukh-Sandhu.jpg',
         name : 'Badle',
         artist : 'Sukh Sandhu',
         album : 'Mavee Records',
         released : '2-05-2021',
         music : 'https://s320.djpunjab.is/data/320/50132/297759/Badle%20-%20Sukh%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50123/300x700/Notorious-Wazir-Patar.jpg',
         name : 'Notorious',
         artist : 'Wazir Patar',
         album : 'Wazir Patar Music',
         released : '1-05-2021',
         music : 'https://s320.djpunjab.is/data/320/50123/297749/Notorious%20-%20Wazir%20Patar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50111/300x700/Be-Ready-Ninja.jpg',
         name : 'Be Ready',
         artist : 'Ninja',
         album : 'Happy Raikoti',
         released : '27-04-2021',
         music : 'https://s320.djpunjab.is/data/320/50111/297737/Be%20Ready%20-%20Ninja.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50110/300x700/Chan-Vekhya-Harnoor.jpg',
         name : 'Chan Vekhya',
         artist : 'Harnoor',
         album : 'Jatt Life Studios',
         released : '26-04-2021',
         music : 'https://s320.djpunjab.is/data/320/50110/297736/Chan%20Vekhya%20-%20Harnoor.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50098/300x700/Yaar-Arjan-Dhillon.jpg',
         name : 'Yaar',
         artist : 'Arjan Dhillon',
         album : 'Brown Studios',
         released : '23-04-2021',
         music : 'https://s320.djpunjab.is/data/320/50098/297724/Yaar%20-%20Arjan%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50077/300x700/Mitha-Mitha-Amrit-Maan.jpg',
         name : 'Mitha Mitha',
         artist : 'Amrit Maan',
         album : 'Speed Records',
         released : '17-04-2021',
         music : 'https://s320.djpunjab.is/data/320/50077/297703/Mitha%20Mitha%20-%20Amrit%20Maan.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50071/300x700/Insane-AP-Dhillon.jpg',
         name : 'Insane',
         artist : 'AP Dhillon',
         album : 'Run-Up Records',
         released : '17-04-2021',
         music : 'https://s320.djpunjab.is/data/320/50071/297697/Insane%20-%20AP%20Dhillon.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50040/300x700/Pehredaariyan-Himmat-Sandhu.jpg',
         name : 'Pehredaariyan',
         artist : 'Himmat Sandhu',
         album : 'White Hill Music',
         released : '11-04-2021',
         music : 'https://s320.djpunjab.is/data/320/50040/297665/Pehredaariyan%20-%20Himmat%20Sandhu.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50032/300x700/Agg-Att-Koka-Kehar-Gurnam-Bhullar.jpg',
         name : 'Agg Att Koka Kehar',
         artist : 'Gurnam Bhullar',
         album : 'Desi Junction',
         released : '09-04-2021',
         music : 'https://s320.djpunjab.is/data/320/50032/297657/Agg%20Att%20Koka%20Kehar%20-%20Gurnam%20Bhullar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50022/300x700/Few-Days-Karan-Aujla.jpg',
         name : 'Few Days',
         artist : 'Karan Aujla',
         album : 'Rehaan Records',
         released : '06-04-2021',
         music : 'https://s320.djpunjab.is/data/320/50022/297647/Few%20Days%20-%20Karan%20Aujla.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50021/300x700/El-Jatt-Varinder-Brar.jpg',
         name : 'El Jatt',
         artist : 'Varinder Brar',
         album : 'Varinder Brar Music',
         released : '06-04-2021',
         music : 'https://s320.djpunjab.is/data/320/50021/297646/El%20Jatt%20-%20Varinder%20Brar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50015/300x700/Aapna-Hi-Shehar-Wazir-Patar.jpg',
         name : 'Aapna Hi Shehar',
         artist : 'Wazir Patar',
         album : 'Wazir Patar Music',
         released : '05-04-2021',
         music : 'https://s320.djpunjab.is/data/320/50015/297640/Aapna%20Hi%20Shehar%20-%20Wazir%20Patar.mp3'
            },
            {
         img : 'https://cover.djpunjab.is/50006/300x700/Chahal-Saab-Gurchahal.jpg',
         name : 'Chahal Saab',
         artist : 'Gurchahal',
         album : 'Sultaan Inc',
         released : '03-04-2021',
         music : 'https://s320.djpunjab.is/data/320/50006/297631/Chahal%20Saab%20-%20Gurchahal.mp3'
            }
	
	/* https://djpunjab.is/page/newlatest.php?page=171 */
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
