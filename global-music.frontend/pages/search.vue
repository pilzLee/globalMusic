<template>
  <div>
    <!-- search sort bar -->
    <div
      class="col-12 text-light d-flex justify-content-around border-5 border-bottom border-light py-2"
    >
      <div><span class="handpointer">Tất Cả</span></div>
      <div><span class="handpointer">Bài Hát</span></div>
      <div><span class="handpointer">Ca Sĩ</span></div>
      <div><span class="handpointer">Album</span></div>
      <div><span class="handpointer">Thể Loại</span></div>
    </div>
    <div class="pt-5">
      <SongItem v-for="(song, index) in songs" :key="index" :song="song" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { getPlayListId } from "../helpers/local-storage.helper";

export default Vue.extend({
  name: "search",
  layout: "blank",
  computed: {
    ...mapState(["loading", "songs"]),
  },
  async mounted() {
    const { keyword, theloai, album } = this.$route.query;
    await this.loadPlaylist();
    await this.searchSong({
      keyword,
      musicType: theloai,
      album,
    });
  },
  methods: {
    ...mapActions(["searchSong"]),
    ...mapActions("playlist", ["listPlaylist"]),
    async loadPlaylist() {
      let id;
      if (this.profile) id = this.profile.id;
      else id = getPlayListId();
      this.userId = id;
      await this.listPlaylist(id);
    },
  },
});
</script>
