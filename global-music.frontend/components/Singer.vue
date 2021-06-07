<template>
  <div class="card item-hover bg-dark">
    <nuxt-link :to="`/singer/${avt.name.trim()}?poll=${avt.id}`">
      <img
        class="card-img-top"
        :src="avt.avatar | pathUrl"
        height="200px"
        alt=""
      />
      <div class="card-body">
        <h5 class="text-white">Tên ca sĩ: {{ avt.name }}</h5>
        <p class="text-white">Ngày sinh: {{ avt.dob }}</p>
        <small class="text-white">{{ avt.info }}</small>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.component("singer-component", {
  props: ["avt"],
});
</script>
