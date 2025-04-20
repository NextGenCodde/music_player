let data = [
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
]

let song_name = document.querySelector(".name")
let music = document.querySelector(".music_card")
let play_btn = document.querySelector(".play_btn");
let play_input = document.querySelector(".ply_inp");
let next_btn = document.querySelector(".forward_btn")
let prev_btn = document.querySelector(".back_btn")
let repeat_btn = document.querySelector(".repeat_btn")
let range = document.querySelector(".range")
let crnt_time = document.querySelector(".str_time")
let duration = document.querySelector(".end_time")
let player = document.querySelector("audio")
let graph = document.querySelector(".loading-wave")
let graph2 = document.querySelector(".loading-wave2")
let isplaying = false;
let index = 0
let playlist_border = document.querySelector(".ply_list_innerdiv")

load(index)

function load(idx) {
    index = idx
    let { name, song, img } = data[idx]
    player.src = `${song}.mp3`
    music.style.backgroundImage = `url("${img}")`
    song_name.innerHTML = `${name}`

}

function next_song() {
    index = (index + 1) % data.length
    load(index)
    playSong()
}
function prev_song() {
    if (index == 0) {
        index = data.length
    }
    index = (index - 1) % data.length
    load(index)
    playSong()
}
next_btn.addEventListener("click", () => {
    next_song()
})
prev_btn.addEventListener("click", () => {
    prev_song()
})

function togglePlayPause(event) {
    event.preventDefault();
    event.stopPropagation();

    if (isplaying) {
        pauseSong();
    } else {
        playSong();
    }
}

play_btn.addEventListener("click", togglePlayPause);


window.addEventListener("keydown", (e)=>{
    // console.log(e.code);
    // console.log(e.key);
    if(e.code === "ArrowRight"){
        next_song()
    }
    if(e.code === "ArrowLeft"){
        prev_song()
    }
    if (e.code === "Space") {
        togglePlayPause(e);
    }
    
})


function playSong() {
    isplaying = true;
    play_input.checked = true;
    music.classList.remove("song_pause");
    music.classList.add("ply_song");
    player.play();
    graph.classList.add("opc")
    graph2.classList.add("opc")
}

function pauseSong() {
    isplaying = false;
    play_input.checked = false;
    music.classList.add("song_pause");
    player.pause();
    graph.classList.remove("opc")
    graph2.classList.remove("opc")
}
player.onloadedmetadata = () => {
    player.duration
    range.max = player.duration
    duration.innerHTML = formatTime(player.duration)
}
player.ontimeupdate = () => {
    player.currentTime
    range.value = player.currentTime
    crnt_time.innerHTML = formatTime(player.currentTime)
}
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds - minutes * 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

range.addEventListener("input", () => {
    player.currentTime = range.value
})
player.addEventListener("ended", () => {
    next_song()
})
repeat_btn.addEventListener("click", () => {
    player.currentTime = 0
})

data.forEach((ele) => {
    playlist_border.innerHTML += `
    <div class="ply_div">
        <div class="ply_img_div"><img src="${ele.img}" alt=""></div>
        <h3>${ele.name}</h3>
    </div>
  `
  ply_list()
})

function ply_list() {
    document.querySelectorAll(".ply_div").forEach((ele, idx) => {
        ele.addEventListener("click", () => {
            console.log(idx);
            load(idx)
            playSong()
        })
    })
}
let lst_div = document.querySelector(".playlist")
document.querySelector(".shuffle_btn").addEventListener("click",()=>{
    lst_div.classList.toggle("ply_left")
})

let chk_box = document.querySelector(".chk_box")
player.muted = !chk_box.checked;

chk_box.addEventListener("change", () => {
    player.muted = !chk_box.checked;
});







