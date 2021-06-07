<template>
  <div class="px-0 navbar-custom">
    <b-navbar toggleable="lg" type="dark">
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="col-1">
          <b-nav-item @click="onBack()" class="ml-2"
            ><i class="fas fa-arrow-left"></i
          ></b-nav-item>
          <b-nav-item @click="onNext()" class="ml-2"
            ><i class="fas fa-arrow-right"></i
          ></b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="col">
          <div class="col-11">
            <b-nav class="col-6 pt-1 ml-5">
              <b-form-input
                class="rounded-pill"
                placeholder="Search"
                v-model="keyword"
                @keydown="handleSearch"
              ></b-form-input>
            </b-nav>
          </div>
          <b-nav-item-dropdown class="col-1 btn">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>
                <div v-if="profile" class="p-0 m-0">
                  <img
                    v-if="profile.avatar"
                    :src="profile.avatar | pathUrl"
                    alt=""
                    class="scale avatar-img rounded-circle p-0"
                    width="17px"
                    height="17px"
                  />
                  <img
                    v-else
                    :src="avatarPreview"
                    alt=""
                    class="scale avatar-img rounded-circle p-0"
                    width="17px"
                    height="17px"
                  />
                  
                </div>

                <i
                  v-else
                  class="scale rounded-circle bg-secondary fas fa-user-circle"
                ></i>
              </em>
            </template>
            <b-dropdown-item v-if="profile" class="" href="/profile"
              >Cá nhân</b-dropdown-item
            >
            <b-dropdown-item v-if="profile" class="" href="/" @click="_Logout()"
              >Đăng xuất</b-dropdown-item
            >
            <b-dropdown-item v-else class="" href="/login"
              >Đăng nhập</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapState } from "vuex";

export default Vue.component("navbar", {
  data() {
    return {
      keyword: "",
    };
  },
  mounted() {
    const { keyword } = this.$route.query;
    this.keyword = keyword;
  },
  computed: { ...mapState(["profile"]) },
  methods: {
    ...mapActions(["searchSong", "Logout"]),
    async handleSearch(event) {
      if (event.key === "Enter" && this.keyword) {
        await this.searchSong({
          keyword: this.keyword,
        });
        this.$router.push(`/search?keyword=${this.keyword}`);
      }
    },
    async _Logout() {
      await this.Logout();
    },
    onBack() {
      window.history.back();
    },
    onNext() {
      window.history.forward();
    },
  },
});
</script>
