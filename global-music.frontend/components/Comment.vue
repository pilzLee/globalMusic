<template>
  <div>
    <div class="media pt-3">
      <a class="media-left" href="#">
        <img :src="cmt.avatar | pathUrl" />
      </a>
      <div class="media-body pl-3">
        <h4 class="media-heading user_name">{{ cmt.name || "Anonymous" }}</h4>
        {{ cmt.content }}
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.component("cmt-component", {
  props: ["cmt"],
});
</script>