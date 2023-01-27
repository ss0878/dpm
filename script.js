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
