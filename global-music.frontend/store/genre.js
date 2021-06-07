export const state = () => ({
    loading: false,
    musicType: [],
});

export const actions = {
    setLoading({ commit }, payload) {
        commit("SET_LOADING", payload);
    },
    async listMusicType({ commit, dispatch }) {
        dispatch("setLoading", true);
        try {
            const response = await this.$axios.$get("/music-type/list");
            const { data } = response;

            if (data) {
                commit("SET_MUSICSTYPE", data);
            } else {
                commit("SET_MUSICSTYPE", []);
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
    SET_MUSICSTYPE(state, payload) {
        state.musicType = payload;
    },
}