// Select all the elements in the HTML page
// and assign them to a variable

let playing = document.querySelector("playing");
let track_art = document.querySelector("track-art");
let track_name = document.querySelector("track-name");
let track_artist = document.querySelector("track-artist");

 
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
  
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;
  
// Create the audio element
let curr_track = document.createElement('audio');
  
// Define the list of tracks that have to be played

let track_list = [
    {
        name: "Highway To Hell",
        arist: "AC DC",
        image: "assets/images/Acdc-_Highway_to_Hell.JPG",
        path: "music tracks/ACDC Highway To Hell.mp3"
    },
    {
        name: "House Of Cards",
        arist:"Bad Wolves",
        image: "assets/images/House Of Cards.jpg",
        path: "music tracks/Bad Wolves House Of Cards.mp3"
    },
    {
        name: "I will not bow",
        artist: "Breaking Benjamin",
        image: "assets/images/Breaking_benjamin_i_will_not_bow.png",
        path: "music tracks/Breaking Benjamin I will not bow.mp3"
    },
    {
        name: "SpringField Summer",
        arist: "Bad Wolves",
        image: "assets/images/SpringField Summer.jpg",
        path: "music tracks/Bad Wolves SpringField Summer.mp3"
    },
    {
        name: "Livin On A Prayer",
        arist: "Bon Jovi",
        image: "Bon-Jovi-Livin-On-A-Prayer.webp",
        path: "music tracks/Bon Jovi Livin On A Prayer.mp3"
    },
    {
        name: "Animal",
        arist: "Def Leppard",
        image: "assets/images/Def Leppard Animal.jpg",
        path: "music tracks/Def_Leppard Animal.mp3"
    },
    {
        name: "American Dream",
        arist: "DIAMANTE",
        image: "assets/images/American Dream.webp",
        path: "music tracks/DIAMANTE American Dream.mp3"
    },
    {
        name: "Victory",
        arist: "Fire From The Gods",
        image: "assets/images/Fire from the gods victory.jpg",
        path: "music tracks/Fire From The Gods Victory.mp3"
    },
    {
        name: "Wash It All Away",
        arist: "Five Finger Death Punch",
        image: "assets/images/FFDP Wash it all away.jpg",
        path: "music tracks/Five Finger Death Punch Wash It All Away.mp3"    
    },
    {
        name: "Here I Go Again",
        arist: "WhiteSnake",
        image: "assets/images/WhiteSnake Here I Go Again.jpg",
        path: "music tracks/Here I Go Again WhiteSnake.mp3"
    },
    {
        name: "The Devil Inside",
        arist: "Like A Storm",
        image: "assets/images Like A Storm Devil Inside.jpg",
        path: "music tracks/Like A Storm The Devil Inside.mp3"
    },
    {
        name: "Entersandman",
        arist: "Metallica",
        image: "assets/images/Metlalica_-_Enter_Sandman_cover.jpg",
        path: "music tracks/Metallica Entersandman.mp3"
    },
    {
        name: "Nothin But A Good Time",
        arist: "Poison",
        image: "assets/images/Nothinbutagoodtime.jpg",
        path: "music tracks/Nothing But A Good Time Poision.mp3"
    },
    {
        name: "Until The Day I Die",
        arist: "Like A Storm",
        image: "assets/images/Like A Storm Until The Day I Die.jpg",
        path: "music tracks/Like A Storm Until The Day I Die.mp3"
    },

];

function random_bg_color() {
  let red = Math.floor(Math.random() * 256) +64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color in the values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";
  
   // Set the background to that color
   document.body.style.background = bgColor;
  }

  function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].arist;
    now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

    updateTimer = setInterval(seekUpdate, 1000);
    curr_track.addEventListener("ended", nextTrack);
    random_bg_color();
  }
  function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
  }
  // Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}


