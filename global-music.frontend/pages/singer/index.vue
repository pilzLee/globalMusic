<template>
  <div>
    <img
      class="col-12"
      src="@/assets/images/common/top100.jpg"
      height="400px"
    />
    <div class="card-group">
      <div class="col-3 p-3" v-for="item in singers.data" :key="item.id">
        <Singer :avt="item" />
      </div>
      
    </div>
    <!-- <button type="button" v-if="hasMore" class="more">Xem thêm</button> -->

  </div>
</template>
<script>
import Vue from "vue";
import { mapActions, mapState } from "vuex";

export default Vue.extend({
  name: "singer",
  layout: "blank",
  computed: {
    ...mapState("singer", ["loading", "singers"]),
  },
  created() {
    this.listSinger(1);
  },
  methods: {
    ...mapActions("singer", ["listSinger"]),
  },
});
</script>

