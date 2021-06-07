<template>
  <div>
    <div class="text-light" v-if="song">
      <div class="col-12 pt-2">
        <h2>{{ song.title }} - {{ song.singer.name }}</h2>
      </div>
      <div class="col-8 pt-3 song-audio my-3">
        <audio id="audioEl" controls autoplay>
          <source :src="song.url | pathUrl" type="audio/mpeg" />
        </audio>
      </div>
      <div class="col-8 pt-3 my-3">
        <h4>Lời bài hát:</h4>
        <p class="pre-info">
          {{ song.lyrics }}
        </p>
      </div>
      <div class="col-8 border-top py-3">
        <div class="page-header">
          <h1>Bình luận</h1>
        </div>
        <div class="comments-list">
          <Comment v-for="(cmt, index) in comments" :key="index" :cmt="cmt" />
        </div>
        <div class="py-3">
          <form class="form-floating">
            <textarea
              class="form-control"
              placeholder="Để lại bình luận tại đây..."
              v-model="content"
            ></textarea>
            <button
              type="button"
              class="btn btn-secondary my-3"
              @click="onComment"
            >
              Gửi
            </button>
          </form>
        </div>
      </div>
    </div>

    <div v-else class="container">
      <div class="text-white">Không tìm thấy bài hát</div>
      <nuxt-link to="/">Trang chủ</nuxt-link>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { sliceMusicId } from "../../helpers/system.helper";

export default Vue.extend({
  name: "singer",
  layout: "blank",
  data() {
    return {
      songId: "",
      song: null,
      content: "",
      comments: [],
    };
  },
  async mounted() {
    const id = this.$route.params.play_id;
    this.songId = id;
    const data = await this.findOneSong(id);
    if (data.id) {
      this.song = data;
      await this.listComment();
    }
  },
  updated() {
    const audioEl = document.getElementById("audioEl");
    audioEl.load();
  },
  computed: {
    ...mapState(["profile"]),
  },
  methods: {
    ...mapActions(["findOneSong", "getCommentOnMusic", "addComment"]),
    async listComment() {
      const data = await this.getCommentOnMusic(sliceMusicId(this.song.id));
      this.comments = data;
    },
    async onComment() {
      if (!this.profile) {
        window.alert("Đăng nhập để bình luận");
        return;
      }
      if (!this.content) {
        window.alert("Nhập gì đó");
        return;
      }
      await this.addComment({
        userId: this.profile.id,
        musicId: sliceMusicId(this.song.id),
        content: this.content,
      });
      await this.listComment();
      this.content = "";
    },
  },
});
</script>