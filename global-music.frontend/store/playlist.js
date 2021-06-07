export const state = () => ({
    loading: false,
    playList: [],
});

export const actions = {
    setLoading({ commit }, payload) {
        commit("SET_LOADING", payload);
    },
    async listPlaylist({ commit, dispatch }, id) {
        dispatch("setLoading", true);
        try {
            const response = await this.$axios.$get(`/playlist/list/${id}`);
            const { data } = response;
            if (data) {
                commit("SET_LISTPLAYLIST", data);
            } else {
                commit("SET_LISTPLAYLIST", []);
            }
        } catch (err) {
            // ignore err
        }
        dispatch("setLoading", false);
    },
    async createPlaylist({ dispatch }, args) {
        dispatch("setLoading", true);
        try {
            await this.$axios.$post("/playlist/create", args);
        } catch (err) {
            // ignore err
        }
        dispatch("setLoading", false);
    },
    async deletePlaylist({ dispatch }, id) {
        dispatch("setLoading", true);
        try {
            await this.$axios.$delete(`/playlist/delete/${id}`);
        } catch (err) {
            // ignore err
        }
        dispatch("setLoading", false);
    },
    async getPlaylist({ }, id) {
        try {
            const response = await this.$axios.$get(`/playlist/detail/${id}`);
            return response.data;
        } catch (err) {
            // ignore err
        }
    },
    async addMusicToPlaylist({ }, { playListId, musicId }) {
        try {
            await this.$axios.$post("/playlist/add-music", {
                playListId,
                musicId
            });
        } catch (err) {
            throw new Error(err);
        }
    },
    async removeMusicFromPlaylist({ }, { playListId, musicId }) {
        try {
            await this.$axios.$post("/playlist/remove-music", {
                playListId,
                musicId
            });
        } catch (err) {
            throw new Error(err);
        }
    },
};

export const mutations = {
    SET_LOADING(state, payload) {
        state.loading = payload;
    },
    SET_LISTPLAYLIST(state, payload) {
        state.playList = payload;
    },
}