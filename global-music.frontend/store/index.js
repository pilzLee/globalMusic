export const state = () => ({
  loading: false,
  profile: undefined,
  songs: [],
  songPlaying: undefined
});

export const actions = {
  setLoading({ commit }, payload) {
    commit("SET_LOADING", payload);
  },
  async Login({ commit, dispatch }, { username, password }) {
    dispatch("setLoading", true);
    try {
      const response = await this.$axios.$post("/auth/token", {
        username,
        password
      });
      const { data } = response;
      this.$router.push("/");
      if (data) {
        commit("SET_PROFILE", data.user);
      } else {
        commit("SET_PROFILE", []);
      }
    } catch (err) {
      throw new Error(err);
    }
    dispatch("setLoading", false);
  },
  async Register({ commit, dispatch }, { name, username, password }) {
    dispatch("setLoading", true);
    await this.$axios.$post("/auth/register", {
      name,
      username,
      password
    });
    dispatch("setLoading", false);
  },
  async Logout({ commit, dispatch }) {
    dispatch("setLoading", true);
    try {
      const response = await this.$axios.$post("/auth/logout");
      commit("SET_PROFILE", undefined);
    } catch (err) {
      // ignore err
    }
    dispatch("setLoading", false);
  },
  async getProfile({ commit, dispatch }) {
    dispatch("setLoading", true);
    try {
      const response = await this.$axios.$get("/auth/me");
      const { data } = response;
      if (data) {
        commit("SET_PROFILE", data);
      }
    } catch (err) {
      // ignore err
    }
    dispatch("setLoading", false);
  },
  async searchSong({ commit }, { keyword, musicType, album }) {
    try {
      const response = await this.$axios.$get(`/search`, {
        params: {
          keyword,
          musicType,
          album
        }
      });
      const { data } = response;
      if (data) {
        commit("SET_SONGS", data);
      }
    } catch (err) {
      // ignore err
    }
  },
  playSong({ commit }, song) {
    commit("SET_SONG_PLAYING", song);
  },
  async getTopMusic({ }, num) {
    try {
      const response = await this.$axios.$get(`/music/top/${num}`);
      return response.data;
    } catch (err) {
      // ignore err
    }
  },
  async updateUserAvatar({ }, { formData, userId }) {
    try {
      await this.$axios.$put(`/user/avatar/${userId}`, formData);
    } catch (err) {
      throw new Error(err);
    }
  },
  async findOneSong({ }, id) {
    try {
      const response = await this.$axios.$get(`/music/one/${id}`);
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  },
  async getCommentOnMusic({ }, id) {
    try {
      const response = await this.$axios.$get(`/music/comment/list/${id}`);
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  },
  async addComment({ }, { musicId, userId, content }) {
    try {
      await this.$axios.$post(`/music/comment/add`, {
        musicId,
        userId,
        content
      });
    } catch (err) {
      throw new Error(err);
    }
  },
  async editProfile({ }, args) {
    try {
      await this.$axios.$put(`/user/edit`, args);
    } catch (err) {
      throw new Error(err);
    }
  }
};

//set state
export const mutations = {
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
  SET_PROFILE(state, payload) {
    state.profile = payload;
  },
  SET_SONGS(state, payload) {
    state.songs = payload;
  },
  SET_SONG_PLAYING(state, payload) {
    state.songPlaying = payload;
  }
};
