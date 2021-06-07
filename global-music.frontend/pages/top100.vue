<template>
  <div>
    <img class="col-12" src="@/assets/images/common/top100.jpg" />
    <div class="row pt-4 pl-2"></div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapState } from "vuex";

export default Vue.extend({
  name: "Top100",
  layout: "blank",
  data() {
    return {
      nameSong: "",
    };
  },
  computed: {
    ...mapState(["loading", "musics"]),
  },
  methods: {
    ...mapActions(["listMusicsByTitle"]),
  },
});
</script>