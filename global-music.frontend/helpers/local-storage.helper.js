const PLAY_LIST_KEY = "PLAY_LIST_ID";

export const setPlayListId = id => {
  if (!id) {
    id = Math.floor(Math.random() * 1e7); // generate id
  }
  localStorage.setItem(PLAY_LIST_KEY, id);
  return id;
};

export const getPlayListId = () => {
  const dataJson = localStorage.getItem(PLAY_LIST_KEY);
  if (!dataJson) {
    return setPlayListId();
  }
  return dataJson;
};

export const removePlayListId = () => {
  localStorage.removeItem(PLAY_LIST_KEY);
};
