// ========================
// 🎵 Music Data
// ========================
const songs = [
    { name: "Kalank Title Song", img: "kalank img.jpg", song: "Kalank (title Track) Arijit Singh 320 Kbps" },
    { name: "Akhiyan", img: "akhiyan.jpeg", song: "Akhiyan - Harkirat Sangha" },
    { name: "Enna Sona (Arijit-Singh)", img: "enna sona.jpeg", song: "Enna Sona Ok Jaanu 320 Kbps" },
    { name: "Summer High", img: "high summer.jpeg", song: "128-Summer High - Ap Dhillon 128 Kbps" },
    { name: "Heer", img: "heer.jpeg", song: "Heer - Haider Ali 320 Kbps" },
    { name: "Jhol Coke-Studio", img: "jhol.jpeg", song: "Jhol - Coke Studio Pakistan (pagalall.com)" },
    { name: "Aj Bhi", img: "aj bhi.jpeg", song: "Aaj Bhi Vishal Mishra 320 Kbps" },
    { name: "Aj Bhi 2", img: "aj bhi 2.jpeg", song: "Aaj Bhi 2 - Vishal Mishra 320 Kbps" },
    { name: "Rehly Mery Kol", img: "rehly mery kol.jpeg", song: "Rehle Mere Kol Simran Choudhary 320 Kbps" },
    { name: "Water", img: "water.jpeg", song: "Water Diljit Dosanjh 320 Kbps" },
    { name: "Paro (Aditya)", img: "paro.jpeg", song: "Paaro - Aditya Rikhari 320 Kbps" },
    { name: "tu hy to mae hu", img: "tu ha tu main hon.jpeg", song: "Tu Hain Toh Main Hoon Sky Force 320 Kbps" }
  ];
  
  // ========================
  // 🎛 DOM Elements
  // ========================
  const player = document.querySelector("audio");
  const musicCard = document.querySelector(".music_card");
  const songTitle = document.querySelector(".name");
  const playBtn = document.querySelector(".play_btn");
  const playInput = document.querySelector(".ply_inp");
  const nextBtn = document.querySelector(".forward_btn");
  const prevBtn = document.querySelector(".back_btn");
  const repeatBtn = document.querySelector(".repeat_btn");
  const range = document.querySelector(".range");
  const currentTime = document.querySelector(".str_time");
  const durationTime = document.querySelector(".end_time");
  const graph1 = document.querySelector(".loading-wave");
  const graph2 = document.querySelector(".loading-wave2");
  const playlistContainer = document.querySelector(".ply_list_innerdiv");
  const shuffleBtn = document.querySelector(".shuffle_btn");
  const playlistToggle = document.querySelector(".playlist");
  const muteToggle = document.querySelector(".chk_box");
  
  let isPlaying = false;
  let index = 0;
  
  // ========================
  // ⏯ Load & Control Songs
  // ========================
  function loadSong(idx) {
    index = idx;
    const { name, song, img } = songs[index];
    player.src = `${song}.mp3`;
    musicCard.style.backgroundImage = `url("${img}")`;
    songTitle.textContent = name;
  }
  
  function playSong() {
    isPlaying = true;
    playInput.checked = true;
    musicCard.classList.add("ply_song");
    musicCard.classList.remove("song_pause");
    player.play();
    graph1.classList.add("opc");
    graph2.classList.add("opc");
  }
  
  function pauseSong() {
    isPlaying = false;
    playInput.checked = false;
    musicCard.classList.add("song_pause");
    musicCard.classList.remove("ply_song");
    player.pause();
    graph1.classList.remove("opc");
    graph2.classList.remove("opc");
  }
  
  function togglePlayPause(e) {
    e.preventDefault();
    e.stopPropagation();
    isPlaying ? pauseSong() : playSong();
  }
  
  function nextSong() {
    index = (index + 1) % songs.length;
    loadSong(index);
    playSong();
  }
  
  function prevSong() {
    index = (index - 1 + songs.length) % songs.length;
    loadSong(index);
    playSong();
  }
  
  // ========================
  // 🔊 Audio Events
  // ========================
  player.onloadedmetadata = () => {
    range.max = player.duration;
    durationTime.textContent = formatTime(player.duration);
  };
  
  player.ontimeupdate = () => {
    range.value = player.currentTime;
    currentTime.textContent = formatTime(player.currentTime);
  };
  
  range.addEventListener("input", () => {
    player.currentTime = range.value;
  });
  
  player.addEventListener("ended", () => {
    nextSong();
  });
  
  repeatBtn.addEventListener("click", () => {
    player.currentTime = 0;
  });
  
  muteToggle.addEventListener("change", () => {
    player.muted = !muteToggle.checked;
  });
  
  window.addEventListener("keydown", (e) => {
    if (e.code === "ArrowRight") nextSong();
    if (e.code === "ArrowLeft") prevSong();
    if (e.code === "Space") togglePlayPause(e);
  });
  
  // ========================
  // 🕹 UI Controls
  // ========================
  playBtn.addEventListener("click", togglePlayPause);
  nextBtn.addEventListener("click", nextSong);
  prevBtn.addEventListener("click", prevSong);
  
  shuffleBtn.addEventListener("click", () => {
    playlistToggle.classList.toggle("ply_left");
  });
  
  // ========================
  // 📜 Playlist Rendering
  // ========================
  songs.forEach((song) => {
    playlistContainer.innerHTML += `
      <div class="ply_div">
        <div class="ply_img_div"><img src="${song.img}" alt="${song.name}"></div>
        <h3>${song.name}</h3>
      </div>
    `;
  });
  
  function activatePlaylist() {
    document.querySelectorAll(".ply_div").forEach((ele, idx) => {
      ele.addEventListener("click", () => {
        loadSong(idx);
        playSong();
      });
    });
  }
  
  // ========================
  // 🕒 Helper
  // ========================
  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  }
  
  // Initial Load
  loadSong(index);
  activatePlaylist();
  player.muted = !muteToggle.checked;
  