let audioplay=new Audio('song/1.mp3');
let songIndex=0;
let play = document.querySelector("#play");
let progressbar=document.querySelector("#audio");
let playbutton= Array.from(document.querySelectorAll('.playbutton'));
let songitems= Array.from(document.querySelectorAll(".songitem"));
let songs=[
   {songName: "winning speech " , filePath: "song/1.mp3" },
   {songName: "AntiDote " , filePath: "song/2.mp3" },
   {songName: "100Million " , filePath: "song/3.mp3" },
   {songName: "God Damn " , filePath: "song/4.mp3" },
   {songName: "Top Class/overseas " , filePath: "song/5.mp3" },
   {songName: "Admirin' You " , filePath: "song/6.mp3" },
]
//play/pause

function updatePlayPauseButton(isPlaying) {
    if (isPlaying) {
        play.classList.remove('play');
        play.classList.add('pause');
    } else {
        play.classList.remove('pause');
        play.classList.add('play');
    }
}
songitems.forEach((element,i)=> {
    let nameElement = element.querySelector(".name"); // Use querySelector
    if (nameElement) {
        nameElement.innerText = songs[i].songName; // Correct property name
    }
});





play.addEventListener('click',()=>{
    if(audioplay.paused || audioplay.currentTime===0){
        audioplay.play();
        updatePlayPauseButton(true);
        play.classList.remove('play');
        play.classList.add('pause');
        console.log("audio playing");
        
       }
       else{
           audioplay.pause();
           updatePlayPauseButton(false);
           play.classList.remove('pause');
           play.classList.add('play');
           console.log("Audio paused");
       }
       })

audioplay.addEventListener('timeupdate',()=>{
    //update the bar
    progress=parseInt((audioplay.currentTime/audioplay.duration)*100);
    progressbar.value=progress;
})

progressbar.addEventListener('input' , () => {
if(audioplay.duration >0){
    audioplay.currentTime = progressbar.value * audioplay.duration / 100;}

});

// Handle play button clicks for individual songs
if (playbutton.length > 0) {
    playbutton.forEach((button, i) => {
        button.addEventListener('click', () => {
            songIndex = i;
            audioplay.src = songs[songIndex].filePath;
            audioplay.currentTime = 0;
            audioplay.play();
            console.log('audio was started')
            updatePlayPauseButton(true);
        });
        button.addEventListener('dblclick',()=>{
            audioplay.pause();
            console.log('audio was stopped')
            updatePlayPauseButton(false);
        })
    });
} else {
    
    console.log("No play buttons found.");
};

document.querySelector('#next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioplay.src = songs[songIndex].filePath;
    audioplay.currentTime = 0;
    audioplay.play();
    updatePlayPauseButton(true);
    console.log('Playing next song');
});

// Previous button click event
document.querySelector('#previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioplay.src = songs[songIndex].filePath;
    audioplay.currentTime = 0;
    audioplay.play();
    updatePlayPauseButton(true);
    console.log('Playing previous song');
});
