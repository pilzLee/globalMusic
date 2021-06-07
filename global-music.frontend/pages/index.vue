<template>
  <div>
    <div class="px-5 mt-5 mb-5">
      <VueSlickCarousel v-bind="settings">
        <div>
          <h3><img src="@/assets/images/slide/slide1.jpg" /></h3>
        </div>
        <div>
          <h3><img src="@/assets/images/slide/slide3.jpg" /></h3>
        </div>
        <div>
          <h3><img src="@/assets/images/slide/slide4.jpg" /></h3>
        </div>
        <div>
          <h3><img src="@/assets/images/slide/slide2.jpg" /></h3>
        </div>
        <div>
          <h3><img src="@/assets/images/slide/slide5.jpg" /></h3>
        </div>
        <div>
          <h3><img src="@/assets/images/slide/slide6.jpg" /></h3>
        </div>
        <div>
          <h3><img src="@/assets/images/slide/slide7.jpg" /></h3>
        </div>
        <div>
          <h3><img src="@/assets/images/slide/slide8.jpg" /></h3>
        </div>
        <div>
          <h3><img src="@/assets/images/slide/slide9.jpg" /></h3>
        </div>
      </VueSlickCarousel>
    </div>
    <!-- end slide -->

    <!-- ca sy -->
    <h3 class="pt-5 text-secondary">Ca Sĩ Nổi Bật</h3>
    <div class="row pt-5">
      <div class="col-3 pb-3" v-for="(singer, index) in topSingers" :key="index">
        <Singer :avt="singer" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions } from "vuex";

export default Vue.extend({
  name: "Home",
  layout: "blank",
});
</script>
<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import { mapActions } from "vuex";

export default {
  name: "MyComponent",
  components: { VueSlickCarousel },
  data() {
    return {
      settings: {
        centerMode: true,
        arrows: true,
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        // pauseOnDotsHover: true,
        pauseOnFocus: true,
        pauseOnHover: true,
      },
      settings2: {
        focusOnSelect: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 5,
        touchThreshold: 5,
      },
      topSingers: [],
    };
  },
  async mounted() {
    const data = await this.selectTopSinger(8);
    this.topSingers = data;
  },
  methods: {
    ...mapActions("singer", ["selectTopSinger"]),
  },
};
</script>
