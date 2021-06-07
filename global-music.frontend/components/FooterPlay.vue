<template>
  <div class="footerplay pt-3 row pr-0">
    <div class="col-3 row ml-3">
      <img class="rounded-circle img-spin" src="@/assets/images/genre/us.jpg" />
      <div class="col-6 pt-2">
        <h6>{{ song.title }}</h6>
        <p>{{ song.name || song.singer.name }}</p>
      </div>
    </div>
    <div class="col-6 audio-footer mt-3">
      <div class="audio-player-container">
        <audio id="audioEl" controls autoplay controlsList="nodownload">
          <source :src="song.url | mp3Url" type="audio/mpeg" />
        </audio>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.component("song-component", {
  props: ["song"],
  updated() {
    const audioEl = document.getElementById("audioEl");
    audioEl.load();
  },
});
</script>
