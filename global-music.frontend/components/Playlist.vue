<template>
  <div class="card bg-dark item-hover playlist-height">
    <nuxt-link :to="`/playlist-detail?id=${playlist.id}`">
      <div class="card-body">
        <h5 class="text-white pb-5">Tên playlist: {{ playlist.name }}</h5>
        <button
          type="button"
          class="btn btn-outline-danger col-6 mt-5"
          @click="handleDelete()"
        >
          Xóa
        </button>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
import Vue from "vue";
import { mapActions } from "vuex";
export default Vue.component("playlist-component", {
  props: ["playlist", "refetch"],
  methods: {
    ...mapActions("playlist", ["deletePlaylist"]),
    async handleDelete() {
      event.preventDefault();
      await this.deletePlaylist(this.playlist.id);
      await this.refetch();
    },
  },
});
</script>