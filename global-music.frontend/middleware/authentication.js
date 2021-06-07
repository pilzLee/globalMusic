const middleware = async ({ route, store, redirect }) => {
  await store.dispatch("getProfile");
};

export default middleware;
