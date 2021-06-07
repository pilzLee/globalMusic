<template>
  <div>
    <div class="row text-light pl-3" v-if="profile">
      <div class="col-4 mt-3">
        <img
          v-if="avatarPreview"
          :src="avatarPreview"
          alt=""
          class="avatar-img rounded-circle p-0"
          width="300px"
          height="300px"
        />
        <img
          v-else
          :src="profile.avatar | pathUrl"
          alt=""
          class="avatar-img rounded-circle p-0"
          width="300px"
          height="300px"
        />
        <p>
          <input
            id="avatar"
            class="avatar-file"
            type="file"
            title="change file"
            @change="onFileChange"
          />
        </p>
        <div>
          <button type="submit" class="btn-update" @click="uploadFile()">
            Cập nhật avatar
          </button>
        </div>
      </div>
      <form class="mt-4 col-6 pt-4 ml-5">
        <div v-if="successMsg" class="text-success">{{ successMsg }}</div>
        <br />
        <div class="mb-3">
          <label for="name" class="form-label">Tên</label>
          <input
            type="text"
            v-model="profileDetail.name"
            class="form-control"
            id="name"
          />
          <small v-if="editErr.name"
            ><code>{{ editErr.name }}</code></small
          >
        </div>
        <div class="collapse" id="profile-collapse">
          <div class="mb-3">
            <label for="password" class="form-label">Mật khẩu</label>
            <input
              type="password"
              v-model="profileDetail.password"
              class="form-control"
              id="password"
            />
            <small v-if="editErr.password"
              ><code>{{ editErr.password }}</code></small
            >
          </div>
          <div class="mb-3">
            <label for="repassword" class="form-label">Nhập lại mật khẩu</label>
            <input
              type="password"
              v-model="profileDetail.rePassword"
              class="form-control"
              id="repassword"
            />
            <small v-if="editErr.rePassword"
              ><code>{{ editErr.rePassword }}</code></small
            >
          </div>
          <button
            type="button"
            class="btn btn-success"
            @click="updateProfile()"
          >
            Xác nhận
          </button>
        </div>
      </form>
      <div class="col-1 pt-3">
        <a
          class="btn btn-primary"
          data-toggle="collapse"
          href="#profile-collapse"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Sửa
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { sliceError } from "../helpers/system.helper";

export default Vue.extend({
  layout: "blank",
  data() {
    return {
      profileDetail: {
        name: "",
        password: "",
        rePassword: "",
      },
      editErr: {
        name: "",
        password: "",
        rePassword: "",
      },
      file: null,
      avatarPreview: "",
      successMsg: "",
    };
  },
  computed: {
    ...mapState(["profile"]),
  },
  async mounted() {
    if (!this.profile) {
      this.$router.push("/");
      return;
    }
    const { name, password } = this.profile;
    this.profileDetail = {
      name: name.trim(),
      password: password.trim(),
      rePassword: password.trim(),
      file: null,
    };
  },
  methods: {
    ...mapActions(["updateUserAvatar", "getProfile", "editProfile"]),
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      this.file = files[0];
      this.avatarPreview = URL.createObjectURL(files[0]);
    },
    async uploadFile() {
      if (!this.file || !this.profile) {
        return;
      }
      const formData = new FormData();
      formData.append("avatar", this.file);
      await this.updateUserAvatar({ formData, userId: this.profile.id });
      await this.getProfile();
      this.successMsg = "Thay đổi ảnh đại diện thành công";
    },
    async updateProfile() {
      const { name, password, rePassword } = this.profileDetail;
      this.editErr = {
        name: "",
        password: "",
        rePassword: "",
      };
      if (!name) {
        this.editErr.name = "Tên không được để trống";
        return;
      }
      if (!password) {
        this.editErr.password = "Mật khẩu không được để trống";
        return;
      }
      if (!rePassword) {
        this.editErr.rePassword = "Xác nhận mật khẩu không được để trống";
        return;
      }
      if (password !== rePassword) {
        this.editErr.rePassword = "Xác nhận mật khẩu chưa khớp";
        return;
      }
      if (!this.profile) {
        window.alert("Vui lòng đăng nhập trước");
        return;
      }
      try {
        const args = {
          id: this.profile.id,
          name: this.profileDetail.name,
          password: this.profileDetail.password,
        };
        await this.editProfile(args);
        await this.getProfile();
        this.successMsg = "Cập nhật thông tin thành công";
      } catch (err) {
        window.alert(sliceError(err));
      }
    },
  },
});
</script>