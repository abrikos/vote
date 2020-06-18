import axios from "axios";


class API {

    authenticatedUser = async () => {
        const auth = await this.postData('/authenticatedUser');
        return auth.authenticated;
    };


    async postData(path = '', data = {}, options = {}) {
        if(!options.noLog) console.log('POST', path)
        const url = '/api' + path;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then(res => resolve(res.data))
                .catch(err => {
                    resolve({error: err.response.status, message: err.response.data.message || err.response.statusText})
                })

        })

        //const start = new Date().valueOf();


    }

    async postDataBak(path = '', data = {}) {
        console.log('POST', path)
        const url = '/api' + path;
        //const start = new Date().valueOf();
        this.isLoading = true;
        try {
            const res = await axios.post(url, data);
            if (res.data.error) {
                console.warn('WARN', res.data, path);
            }
            return res.data;

        } catch (e) {

            if (!e.response) {

                return {error: 500, message: e.toJSON().message}
            }
            return {error: e.response.status, message: e.response.statusText}
        }

    }

}

//window.APP_STORE = new API();
export default new API();
