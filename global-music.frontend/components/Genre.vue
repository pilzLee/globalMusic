<template>
  <div class="col-11">
    <div class="card genre-item">
      <div class="card-body">
        <h4>
          <nuxt-link :to="`/search?theloai=${musicType.id}`">{{
            musicType.name
          }}</nuxt-link>
        </h4>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";

export default Vue.component("singer-component", {
  props: ["musicType"],
});
</script>
