<template>
  <div>
    <div class="text-white" v-if="singer">
      <div class="row">
        <div class="col-3 pl-5 ml-5">
          <h5>Ca sĩ: {{ singer.name }}</h5>
          <p>Ngày sinh: {{ singer.dob }}</p>
        </div>
        <div class="col-4">
          <img
            :src="singer.avatar | pathUrl"
            alt=""
            width="300"
            height="300"
            class="rounded-circle"
          />
        </div>
        <div class="col-4 pr-0">
          <h4>Thông tin:</h4>
          <p class="pre-info">
            {{ singer.info }}
          </p>
        </div>
      </div>
      <div class="pt-3 mt-3 row">
        <h3 class="col-8">Bài hát</h3>
        <div class="col-8 pt-3 pl-3 ml-3">
          <SongItem
            v-for="(song, index) in singer.musics"
            :key="index"
            :song="song"
          />
        </div>
      </div>
    </div>

    <div v-else class="text-white">Không tìm thấy ca sĩ</div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { getPlayListId } from "../../helpers/local-storage.helper";

export default Vue.extend({
  name: "singer",
  layout: "blank",
  data() {
    return {
      singerId: "",
      singer: null,
    };
  },
  computed: {
    ...mapState(["loading"]),
  },
  async created() {
    const { poll } = this.$route.query;
    this.singerId = poll;
    const data = await this.findOneSinger(poll);
    this.singer = data;
  },
  methods: {
    ...mapActions("singer", ["findOneSinger"]),
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