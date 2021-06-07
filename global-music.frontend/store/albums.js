export const state = () => ({
    loading: false,
    albums: {
        data: [],
        hasMore: true
    },
});

export const actions = {
    setLoading({ commit }, payload) {
        commit("SET_LOADING", payload);
    },
    async listAlbum({ commit, dispatch }) {
        dispatch("setLoading", true);
        try {
            const response = await this.$axios.$get("/album/list");
            const { data } = response;
            if (data) {
                commit("SET_ALBUM", data);
            } else {
                commit("SET_ALBUM", []);
            }
        } catch (err) {
            // ignore err
        }
        dispatch("setLoading", false);
    },
};

export const mutations = {
    SET_LOADING(state, payload) {
        state.loading = payload;
    },
    SET_ALBUM(state, payload) {
        state.albums = payload;
    },
}