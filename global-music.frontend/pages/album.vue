<template>
  <div>
    <img
      class="col-12"
      src="@/assets/images/common/top100.jpg"
      height="400px"
    />
    <div class="card-group">
      <div class="p-3 col-3" v-for="item in albums.data" :key="item.id">
        <Item :album="item" />
      </div>
      <button v-if="albums.hasMore">Xem them</button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { mapActions, mapState } from "vuex";

export default Vue.extend({
  name: "album",
  layout: "blank",
  computed: {
    ...mapState("albums", ["loading", "albums"]),
  },
  created() {
    this.listAlbum();
  },
  methods: {
    ...mapActions("albums", ["listAlbum"]),
  },
});
</script>
