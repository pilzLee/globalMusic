<template>
  <div class="row mx-0 px-0">
    <div class="col-12 row px-0 mx-0">
      <div class="col-2 px-0">
        <Sidebar />
      </div>
      <div class="col-10 pl-0 pr-0 right-content">
        <Navbar class="col-12" />
        <Nuxt class="col-12 container-custom" />
      </div>
    </div>

    <div class="col-12 pr-0">
      <FooterPlay v-if="songPlaying" :song="songPlaying" />
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["profile", "songPlaying"]),
  },
};
</script>
