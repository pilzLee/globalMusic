export const state = () => ({
    loading: false,
    singers: {
        data: [],
        hasMore: true
    },
});

export const actions = {
    setLoading({ commit }, payload) {
        commit("SET_LOADING", payload);
    },
    async listSinger({ commit, dispatch }, page) {
        dispatch("setLoading", true);
        try {
            const response = await this.$axios.$get(`/singer/list/${page}`);
            const { data } = response;
            if (data) {
                commit("SET_SINGERS", data);
            } else {
                commit("SET_SINGERS", []);
            }
        } catch (err) {
            // ignore err
        }
        dispatch("setLoading", false);
    },
    async findOneSinger({ }, id) {
        try {
            const response = await this.$axios.$get(`/singer/detail/${id}`);
            return response.data;
        } catch (err) {
            throw new Error(err);
        }
    },
    async selectTopSinger({ }, num) {
        try {
            const response = await this.$axios.$get(`/singer/top/${num}`);
            return response.data;
        } catch (err) {
            throw new Error(err);
        }
    }
};

export const mutations = {
    SET_LOADING(state, payload) {
        state.loading = payload;
    },
    SET_SINGERS(state, payload) {
        state.singers = payload;
    },

    SET_HASMORE(state, payload){
        state.hasMore = payload;
    }
}