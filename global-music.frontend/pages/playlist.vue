<template>
  <div>
    <div class="card-group">
      <!-- card add -->
      <form class="p-3 col-3 card bg-dark item-hover playlist-height">
        <div class="card-body">
          <p>
            <button
              class="btn btn-info col-12"
              type="button"
              data-toggle="collapse"
              data-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Tạo mới
            </button>
          </p>
          <div class="collapse" id="collapseExample">
            <div class="card card-body">
              <input
                type="text"
                v-model="name"
                class="form-control"
                id="add-playlist"
              />
              <button
                type="button"
                class="btn btn-secondary mt-3"
                @click="handleCreatePlaylist"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      </form>
      <div class="pb-3 pr-3 pl-3 col-3" v-for="item in playList" :key="item.id">
        <Playlist :playlist="item" :refetch="refetch" />
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { getPlayListId } from "../helpers/local-storage.helper";

export default Vue.extend({
  name: "playlist",
  data() {
    return {
      name: "",
      userId: "",
    };
  },
  layout: "blank",
  computed: {
    ...mapState("playlist", ["loading", "playList"]),
    ...mapState(["profile"]),
  },
  async mounted() {
    let id;
    if (this.profile) id = this.profile.id;
    else id = getPlayListId();
    this.userId = id;
    await this.listPlaylist(id);
  },
  methods: {
    ...mapActions("playlist", ["listPlaylist", "createPlaylist"]),
    async refetch() {
      await this.listPlaylist(this.userId);
    },
    async handleCreatePlaylist() {
      if (!this.name) {
        return;
      }
      await this.createPlaylist({ userId: this.userId, name: this.name });
      await this.refetch();
    },
  },
});
</script>
