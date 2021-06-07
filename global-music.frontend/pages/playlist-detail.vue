<template>
  <div>
    <div class="row pt-3" v-if="playlist">
      <div class="col-4">
        <h3 class="text-white">{{ playlist.name }}</h3>
        <button
          type="button"
          class="btn btn-info col-6"
          @click="onPlayRandom()"
        >
          Phát ngẫu nhiên
        </button>
      </div>
      <div class="col-8">
        <h3 class="text-white">Danh sách bài hát</h3>
        <div>
          <SongItem
            v-for="(music, index) in playlist.musics"
            :key="index"
            :song="music"
            :onRemove="onRemoveMusic"
          />
        </div>
        <div class="mt-5"></div>
        <h3 class="text-white">Có thể bạn sẽ thích</h3>
        <SongItem
          v-for="(music, index) in musicsTop"
          :key="index"
          :song="music"
          :onAddMusic="onAddMusic"
        />
      </div>
    </div>

    <div v-else class="text-white">Không tìm thấy playlist</div>
  </div>
</template>


<script>
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { sliceMusicId } from "../helpers/system.helper";
import { getPlayListId } from "../helpers/local-storage.helper";

export default Vue.extend({
  layout: "blank",
  data() {
    return {
      playlist: null,
      musicsTop: [],
      dataMusicTop: [],
    };
  },
  computed: {
    ...mapState(["loading"]),
    ...mapState("playlist"),
  },
  async mounted() {
    await this.onGetPlaylist();
    await this.loadPlaylist();
    await this.onGetTopMusic();
    this.loadSuggestMusic();
  },
  methods: {
    ...mapActions(["playSong", "getTopMusic"]),
    ...mapActions("playlist", [
      "listPlaylist",
      "createPlaylist",
      "removeMusicFromPlaylist",
      "addMusicToPlaylist",
      "getPlaylist",
    ]),
    async onGetPlaylist() {
      const { id } = this.$route.query;
      const data = await this.getPlaylist(id);
      if (data && data.id) {
        this.playlist = data;
      }
    },
    async onGetTopMusic() {
      const data = await this.getTopMusic(10);
      this.musicsTop = data;
      this.dataMusicTop = data;
    },
    async loadSuggestMusic() {
      const musicIds = this.playlist.musics.map((x) => sliceMusicId(x.id));
      this.musicsTop = this.dataMusicTop.filter(
        (x) => !musicIds.includes(sliceMusicId(x.id))
      );
    },
    async onAddMusic(musicId) {
      const { id } = this.$route.query;
      try {
        await this.addMusicToPlaylist({ playListId: id, musicId });
        await this.onGetPlaylist();
        this.loadSuggestMusic();
      } catch (err) {
        // TODO: handleErr
      }
    },
    async onRemoveMusic(musicId) {
      const { id } = this.$route.query;
      try {
        await this.removeMusicFromPlaylist({ playListId: id, musicId });
        await this.onGetPlaylist();
        this.loadSuggestMusic();
      } catch (err) {
        // TODO: handleErr
      }
    },
    async onPlayRandom() {
      const musicsLength = this.playlist.musics.length;
      const indexRandom = Math.floor(Math.random() * (musicsLength + 1)) + 0;
      const songRandom = this.playlist.musics[indexRandom];
      this.playSong(songRandom);
    },
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
