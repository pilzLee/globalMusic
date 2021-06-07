export default function({ $axios }, inject) {
  const serverUrl = process.env.SERVER_URL || "";
  if (!serverUrl) {
    throw new Error("[SERVER_URL] is missing, let config in .env");
  }

  $axios.onResponseError(interceptorError => {
    const { response } = interceptorError;
    if (response && response.status === 400) {
      return new Promise((resolve, reject) => {
        reject(response.data.message);
      });
    }
    return Promise.reject(interceptorError);
  });
}
