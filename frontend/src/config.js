export const axios = Axios.create({
    baseURL: config.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
})
axios.interceptors.request.use(function (config1) {

    // Do something before request is sent
    const {GET_COOKIE} = config
    const token = GET_COOKIE('auth-token')
    if (token) {
        config1.headers.Authorization = `Bearer ${token}`
    }

    return config1;
  }, function (error) {

    // Do something with request error
    // return Promise.reject(error);
});