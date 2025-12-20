new Vue({
  el: "#app",
  data() {
    return {
      audio: new Audio(),
      isTimerPlaying: false,
      isShowCover: true,
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null,
      tracks: [
        { name: "Amplifier", source: "List of Music/Amplifier.mp3", cover: "img/Amplifier.png", artist: "Imran Khan", favorited: false },
        { name: "Angrezi Beat", source: "List of Music/Angrezi Beat.mp3", cover: "img/Honey_Singh.png", artist: "Yo Yo Honey Singh", favorited: false },
        { name: "Baato Ko Teri", source: "List of Music/Baato Ko Teri.mp3", cover: "img/Baato Ko Teri.png", artist: "Arjit Singh & Himmesh Reshamiya", favorited: false },
        { name: "Blue Eyes", source: "List of Music/Blue Eyes.mp3", cover: "img/Blue Eyes.png", artist: "Yo Yo Honey Singh", favorited: false },
        { name: "Brown Rang", source: "List of Music/Brown Rang.mp3", cover: "img/Honey_Singh.png", artist: "Yo Yo Honey Singh", favorited: false },
        { name: "Character Dheela", source: "List of Music/Character Dheela.mp3", cover: "img/Salman.png", artist: "Pritam, Amrita Kak", favorited: false },
        { name: "Cheques", source: "List of Music/Cheques.mp3", cover: "img/Cheques.png", artist: "Still Rollin", favorited: false },
        { name: "Dil Meri Na Sune", source: "List of Music/Dil Meri Na Sune.mp3", cover: "img/Genius.png", artist: "Atif Aslam", favorited: false },
        { name: "DJ Na Rok Diye", source: "List of Music/DJ Na Rok Diye.mp3", cover: "img/Haryanvi_1.png", artist: "Khasa Aala Chahar", favorited: false },
        { name: "Dope Shope", source: "List of Music/Dope Shope.mp3", cover: "img/Honey_Singh.png", artist: "Yo Yo Honey Singh", favorited: false },
        { name: "Fortuner", source: "List of Music/Fortuner.mp3", cover: "img/Haryanvi_2.png", artist: "Vikram Sarkar", favorited: false },
        { name: "Heroine", source: "List of Music/Heroine.mp3", cover: "img/NeelKamal.png", artist: "NeelKamal Singh", favorited: false },
        { name: "I Hate Luv Story", source: "List of Music/I Hate Luv Story.mp3", cover: "img/I Hate Luv Story.png", artist: "Vishal-Shekhar", favorited: false },
        { name: "I Love You", source: "List of Music/I Love You.mp3", cover: "img/Bodyguard.png", artist: "Pritam, Clinton Cerejo", favorited: false },
        { name: "Loot Liya", source: "List of Music/Loot Liya.mp3", cover: "img/Loot Liya.png", artist: "Khasa Aala Chahar", favorited: false },
        { name: "Lut Gaye", source: "List of Music/Lut Gaye.mp3", cover: "img/Lut gaye.png", artist: "Jubin Nautiyal", favorited: false },
        { name: "Mat Aazma Re", source: "List of Music/Mat Aazma Re.mp3", cover: "img/Murder 3.png", artist: "Pritam, KK", favorited: false },
        { name: "Mere Rashke Qamar", source: "List of Music/Mere Rashke Qamar.mp3", cover: "img/Baadshaho.png", artist: "Nusrat Fateh Ali Khan & Rahat Fateh Ali Khan", favorited: false },
        { name: "OverConfidence", source: "List of Music/OverConfidence.mp3", cover: "img/Overconfidence.png", artist: "Billa Sonipat Ala", favorited: false },
        { name: "Prem Ki Naiyya", source: "List of Music/Prem Ki Naiyya.mp3", cover: "img/Ranbir Kapoor.png", artist: "Neeraj Shridhar", favorited: false },
        { name: "Rabba Main Toh Mar Gaya Oye", source: "List of Music/Rabba Main Toh Mar Gaya Oye.mp3", cover: "img/Mausam.png", artist: "Pritam & Rahat Fateh Ali Khan", favorited: false },
        { name: "Shukran Allah", source: "List of Music/Shukran Allah.mp3", cover: "img/Kurbaan.png", artist: "Sonu Nigam", favorited: false },
        { name: "System pe System", source: "List of Music/System pe System.mp3", cover: "img/System pe System.png", artist: "R Maan", favorited: false },
        { name: "Tera Fitoor", source: "List of Music/Tera Fitoor.mp3", cover: "img/Genius.png", artist: "Atif Aslam", favorited: false },
        { name: "Vele", source: "List of Music/Vele.mp3", cover: "img/Student Of The Year.png", artist: "Vishal-Shekar", favorited: false },
      ],
      currentFavorite: null
    };
  },
  computed: {
    progressPercentage() {
      return (this.audio.duration ? (this.audio.currentTime / this.audio.duration) * 100 : 0);
    },
    // NEW: Computed property for favorites list
    favoritesList() {
      return this.tracks.filter(track => track.favorited);
    }
  },
  mounted() {
    this.currentTrack = this.tracks[this.currentTrackIndex];
    this.audio.src = this.currentTrack.source;
    this.loadFavorite();
    this.audio.addEventListener('timeupdate', () => {
      this.$forceUpdate();
    });
    this.audio.addEventListener('loadedmetadata', () => {
      this.$forceUpdate();
    });
  },
  methods: {
    playPause() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    resetPlayer() {
      this.audio.src = this.currentTrack.source;
      this.audio.load();
      if (this.isTimerPlaying) this.audio.play();
    },
    prevTrack() {
      this.transitionName = "fade";
      this.isShowCover = false;
      this.currentTrackIndex =
        this.currentTrackIndex > 0
          ? this.currentTrackIndex - 1
          : this.tracks.length - 1;
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
      setTimeout(() => this.isShowCover = true, 200);
    },
    nextTrack() {
      this.transitionName = "fade";
      this.isShowCover = false;
      this.currentTrackIndex =
        this.currentTrackIndex < this.tracks.length - 1
          ? this.currentTrackIndex + 1
          : 0;
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
      setTimeout(() => this.isShowCover = true, 200);
    },
    toggleFavorite() {
      // Toggle the favorite status
      this.currentTrack.favorited = !this.currentTrack.favorited;
      this.tracks[this.currentTrackIndex].favorited = this.currentTrack.favorited;
      
      // Update currentFavorite based on the new status
      if (this.currentTrack.favorited) {
        this.currentFavorite = { name: this.currentTrack.name, artist: this.currentTrack.artist };
      } else {
        this.currentFavorite = null;
      }
      
      this.saveFavorite();
    },
    updateProgress() {
      this.audio.currentTime = this.audio.currentTime;
    },
    formatTime(seconds) {
      if (isNaN(seconds)) return '0:00';
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    },
    loadFavorite() {
      try {
        const favorite = localStorage.getItem('favorite');
        if (favorite) {
          this.currentFavorite = JSON.parse(favorite);
          this.tracks.forEach(track => {
            track.favorited = (this.currentFavorite && this.currentFavorite.name === track.name && this.currentFavorite.artist === track.artist);
          });
        }
      } catch (e) {
        console.error('Error loading favorite:', e);
      }
    },
    saveFavorite() {
      if (this.currentFavorite) {
        localStorage.setItem('favorite', JSON.stringify(this.currentFavorite));
      } else {
        localStorage.removeItem('favorite');
      }
    },
    // NEW: Method to play a song from favorites list
    playFavorite(favorite) {
      const trackIndex = this.tracks.findIndex(track => 
        track.name === favorite.name && track.artist === favorite.artist
      );
      
      if (trackIndex !== -1) {
        this.transitionName = "fade";
        this.isShowCover = false;
        this.currentTrackIndex = trackIndex;
        this.currentTrack = this.tracks[this.currentTrackIndex];
        this.resetPlayer();
        setTimeout(() => this.isShowCover = true, 200);
      }
    }
  }
});