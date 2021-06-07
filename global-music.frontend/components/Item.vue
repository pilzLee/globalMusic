<template>
  <div class="card bg-dark item-hover">
    <nuxt-link :to="`/search?album=${album.id}`">
      <img class="card-img-top" :src="album.url | pathUrl" height="200px" />
      <div class="card-body">
        <h5 class="text-white">Album: {{ album.name }}</h5>
        <p v-if="album.released_date" class="text-white">
          Phát hành: {{ album.released_date }}
        </p>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
import Vue from "vue";

export default Vue.component("album-component", {
  props: ["album"],
});
</script>
