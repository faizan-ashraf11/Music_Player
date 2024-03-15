document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeControl = document.getElementById('volumeControl');
    const seekBar = document.getElementById('seekBar');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');

    const songs = ["Hakari Song.mp3" , "Heat_waves.mp3" , "Mashle_Intro.mp3"];
    let currentSongIndex = 0;
    let isPlaying = false;

    audioPlayer.volume = 0.1;

    playPauseBtn.addEventListener('click', function () {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong(currentSongIndex);
        }
    });

    volumeControl.addEventListener('input', function () {
        audioPlayer.volume = volumeControl.value / 100;
    });

    seekBar.addEventListener('input', function () {
        const seekTime = audioPlayer.duration * (seekBar.value / 100);
        audioPlayer.currentTime = seekTime;
    });

    audioPlayer.addEventListener('timeupdate', function () {
        const seekPercentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        seekBar.value = seekPercentage;

        currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    });

    audioPlayer.addEventListener('durationchange', function () {
        durationDisplay.textContent = formatTime(audioPlayer.duration);
    });

    audioPlayer.addEventListener('ended', function () {
        nextSong();
    });

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function playSong(index) {
        currentSongIndex = index;
        const selectedSong = songs[index];
        audioPlayer.src = selectedSong;
        audioPlayer.play();
        isPlaying = true;
        togglePlayPauseButton(true);
    }

    function pauseSong() {
        audioPlayer.pause();
        isPlaying = false;
        togglePlayPauseButton(false);
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        playSong(currentSongIndex);
    }

    function togglePlayPauseButton(isPlaying) {
        if (isPlaying) {
            playPauseBtn.innerHTML = `
                <svg viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg" class="pause">
                    <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"></path>
                </svg>
            `;
        } else {
            playPauseBtn.innerHTML = `
                <svg viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg" class="play">
                    <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"></path>
                </svg>
            `;
        }
    }
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.addEventListener('click', function () {
        previousSong();
    });

    nextBtn.addEventListener('click', function () {
        nextSong();
    });

  
    function previousSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playSong(currentSongIndex);
    }
});
