><template>
  <div class="position-relative newbg">
    <div id="sign-in" ref="logintab" class="container-fluid disabled">
      <div class="d-sm-flex justify-content-around pt-5 px-5 row">
        <div class="col-12 col-sm-auto mb-4">
          <h1 class="letter-3">Global Music.</h1>
          <p class="text-secondary">
            Mang âm nhạc đến với mọi người.<br />
            Tham gia cùng chúng thôi và thả mình vào những giai điệu...
          </p>
          <nuxt-link to="/">Trang chủ >></nuxt-link>
        </div>
        <div
          class="newbg-form col-12 col-sm-8 col-md-4 p-5 rounded text-white"
          style="box-shadow: 0 0 20px #2f2739"
        >
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Tài khoản</label>
              <input
                type="email"
                class="form-control sign-in-input"
                v-model="dataLogin.username"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="form-group mb-4">
              <label for="exampleInputPassword1">Mật khẩu</label>
              <input
                type="password"
                v-model="dataLogin.password"
                class="form-control"
                id="exampleInputPassword1"
              />
              <small v-if="err" class="form-text text-muted"
                ><code>{{ err }}</code></small
              >
              <small id="emailHelp" class="form-text text-muted"
                >Trải nghiệm tốt hơn, mượt mà hơn.</small
              >
            </div>
            <div class="d-flex justify-content-center">
              <button
                type="button"
                class="btn btn-primary mx-1 border-radius"
                @click="handleLogin()"
              >
                Đăng nhập
              </button>
              <button
                id="btn-sign"
                ref="btnsign"
                v-on:click="hide()"
                type="button"
                class="btn btn-success mx-1"
              >
                Đăng ký
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- register -->

    <div class="newbg-form d-flex justify-content-center mt-3">
      <div
        id="sign-up"
        ref="registertab"
        style="box-shadow: 0 0 10px #2f2739; top: 4rem; padding: 20px"
        class="d-none position-absolute col-8 col-md-4 align=center py-4"
      >
        <div class="border-bottom position-relative">
          <div>
            <h1>Đăng ký</h1>
            <p>Dễ dàng và thuận tiện</p>
          </div>
          <div
            style="top: -0.3rem; right: 0; cursor: pointer"
            class="position-absolute"
          >
            <i v-on:click="registerhide()" class="fas fa-times-circle"></i>
          </div>
        </div>
        <div>
          <form class="needs-validation" novalidate>
            <div class="form-row">
              <div class="col-md-12 mb-3">
                <label for="validationCustom02">Tên</label>
                <input
                  class="form-control"
                  v-model="Iuser.name"
                  type="text"
                  id="validationCustom02"
                  required
                />
                <small v-if="regisErr.name"
                  ><code>{{ regisErr.name }}</code></small
                >
              </div>
            </div>
            <div class="">
              <label for="validationCustom03">Tài khoản</label>
              <input
                class="form-control"
                type="email"
                id="validationCustom03"
                v-model="Iuser.username"
                required
              />
              <small v-if="regisErr.username"
                ><code>{{ regisErr.username }}</code></small
              >
            </div>
            <div>
              <label for="validationCustom04">Mật khẩu</label>
              <input
                class="form-control"
                type="password"
                id="validationCustom04"
                v-model="Iuser.password"
                minlength="8"
                required
              />
              <small v-if="regisErr.password"
                ><code>{{ regisErr.password }}</code></small
              >
            </div>
            <div>
              <label for="validationCustom044">Nhập lại mật khẩu</label>
              <input
                class="form-control"
                v-model="Iuser.repassword"
                type="password"
                id="validationCustom044"
                required
              />
              <small v-if="regisErr.repassword"
                ><code>{{ regisErr.repassword }}</code></small
              >
            </div>
            <div class="text-center mt-4">
              <button
                class="btn btn-success btn-block"
                type="button"
                @click="_Register()"
              >
                Xác nhận
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import "@/assets/scss/login/main.scss";
</style>
<script>
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { sliceError } from "../helpers/system.helper";

export default Vue.extend({
  name: "login",
  layout: "empty",
  data() {
    return {
      err: null,
      dataLogin: {
        username: "",
        password: "",
      },
      regisErr: {
        name: null,
        username: null,
        password: null,
        repassword: null,
      },
      Iuser: {
        name: "",
        username: "",
        password: "",
        repassword: "",
      },
    };
  },
  computed: {
    ...mapState(["loading", "profile"]),
  },
  updated() {},
  methods: {
    ...mapActions(["Login", "Register"]),
    async handleLogin() {
      this.err = null;
      if (!this.dataLogin.username || !this.dataLogin.password) {
        this.err = "Tài khoản hoặc mật khẩu không được để trống";
        return;
      }
      try {
        await this.Login(this.dataLogin);
      } catch (error) {
        window.alert(sliceError(error));
      }
    },
    async _Register() {
      this.regisErr = {
        name: null,
        username: null,
        password: null,
        repassword: null,
      };
      if (!this.Iuser.name) {
        this.regisErr.name = "Tên không được để trống!";
        return;
      }
      if (!this.Iuser.username) {
        this.regisErr.username = "Tài khoản không được để trống!";
        return;
      }
      if (!this.Iuser.password) {
        this.regisErr.password = "Mật khẩu không được để trống!";
        return;
      }
      if (!this.Iuser.repassword) {
        this.regisErr.repassword = "Không được để trống!";
        return;
      }

      if (this.Iuser.password !== this.Iuser.repassword) {
        this.regisErr.repassword = "Nhập lại mật khẩu chưa khớp!";
        return;
      }
      try {
        await this.Register({
          name: this.Iuser.name,
          username: this.Iuser.username,
          password: this.Iuser.password,
        });
        window.alert("Đăng ký thành công");
      } catch (err) {
        window.alert(sliceError(err));
      }
    },
    hide() {
      this.$refs.logintab.classList.add("hidecontent");
      this.$refs.registertab.classList.remove("d-none");
    },
    registerhide() {
      this.$refs.registertab.classList.add("d-none");
      this.$refs.logintab.classList.remove("hidecontent");
    },
  },
});
</script>
