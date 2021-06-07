<template>
  <div ref="hover" class="row pt-2 text-light hover-opacity song-position">
    <div class="col-1 pt-3 pl-4">#</div>
    <div class="col-6 pb-1 row border-bottom border-secondary">
      <img class="col-3" src="@/assets/images/genre/us.jpg" />
      <div class="col-9">
        <a :href="`/play/${sliceMusicId(song.id)}`"
          ><h6 class="text-white">{{ song.title }}</h6></a
        >
        <span class="text-secondary">{{ song.name || song.singer.name }}</span>
      </div>
    </div>
    <div class="col-2 border-bottom border-secondary pt-2"></div>
    <div
      class="col-3 border-bottom border-secondary d-flex justify-content-around pt-3"
    >
      <i class="fas fa-play" @click="handlePlaySong()"></i>
      <i v-if="onRemove" class="far fa-trash-alt" @click="RemoveMusic()"></i>
      <i v-if="onAddMusic" class="fas fa-plus" @click="AddToPLayList()"></i>

      <i
        class="fas fa-ellipsis-h"
        @click="displayAddPlaylist()"
        title="Add to playlist"
      ></i>

      <div class="position-fixed popup d-none" ref="popup">
        <div class="close-playlist" @click="addHide()">
          <i class="fas fa-times"></i>
        </div>
        <div class="" v-for="item in playList" :key="item.id">
          <div>{{ item.name }} <small><i class="fas fa-plus pl-2"></i></small></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { sliceMusicId } from "../helpers/system.helper";

export default Vue.component("songItem", {
  name: "addlistplaylist",
  data() {
    return {
      name: "",
      userId: "",
    };
  },
  layout: "blank",
  computed: {
    ...mapState(["loading", "profile"]),
    ...mapState("playlist", ["playList"]),
  },
  props: ["song", "onAddMusic", "onRemove"],
  methods: {
    ...mapActions(["playSong"]),
    handlePlaySong() {
      event.preventDefault();
      this.playSong(this.song);
    },
    async AddToPLayList() {
      event.preventDefault();
      if (this.onAddMusic) {
        await this.onAddMusic(sliceMusicId(this.song.id));
      }
    },
    async RemoveMusic() {
      event.preventDefault();
      if (this.onRemove) {
        await this.onRemove(sliceMusicId(this.song.id));
      }
    },
    displayAddPlaylist() {
      this.$refs.popup.classList.remove("d-none");
      this.$refs.hover.classList.remove("hover-opacity");
    },
    addHide() {
      this.$refs.popup.classList.add("d-none");
      this.$refs.hover.classList.add("hover-opacity");
    },
    sliceMusicId(id) {
      return sliceMusicId(id);
    },
  },
});
</script>
