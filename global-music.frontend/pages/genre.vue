<template>
  <div>
    <div
      class="d-flex justify-content-around row pt-4"
      v-for="item in musicType"
      :key="item.id"
    >
      <Genre :musicType="item" />
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { mapActions, mapState } from "vuex";

export default Vue.extend({
  name: "musictype",
  layout: "blank",
  computed: {
    ...mapState("genre", ["loading", "musicType"]),
  },
  created() {
    this.listMusicType();
  },
  methods: {
    ...mapActions("genre", ["listMusicType"]),
  },
});
</script>
