import Errors from './Errors';

class Form {
    /**
     * Create a new Form instance.
     *
     * @param {object} data
     */
    constructor(axios, data) {
        this.axios = axios;

        this.originalData = data;

        for (let field in data) {
            this[field] = data[field];
        }

        this.form = null;

        this.errors = new Errors();
    }


    /**
     * Fetch all relevant data for the form.
     */
    /*data() {
        // let data = {}; -> 이러면 파일 업로드 못함
        let data = new FormData();

        for (let property in this.originalData) {
            // data[property] = this[property];
            if(Array.isArray(this[property])){
                this[property].map(item => data.append(property + "[]", item));
            }else{
                data.append(property, this[property]);
            }
        }

        return data;
    }*/
    data() {
        return Object.keys(this.originalData).reduce((data, attribute) => {
            data[attribute] = this[attribute];
            return data;
        }, {});
    }

    buildFormData(data, parentKey){
        if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File) && !(data instanceof Blob)) {
            Object.keys(data).forEach(key => {
                this.buildFormData(data[key], parentKey ? `${parentKey}[${key}]` : key);
            });
        } else {
            const value = data == null ? '' : data;
            this.form.append(parentKey, value);
        }
    }


    /**
     * Reset the form fields.
     */
    reset() {
        for (let field in this.originalData) {
            this[field] = '';
        }

        this.errors.clear();
    }

    set(data) {
        this.originalData = data;

        for(let field in data){
            this[field] = data[field];
        }
    }

    /**
     * Send a get request to the given URL.
     * .
     * @param {string} url
     */
    get(url) {
        return this.submit('get', url);
    }

    /**
     * Send a POST request to the given URL.
     * .
     * @param {string} url
     */
    post(url) {
        return this.submit('post', url);
    }


    /**
     * Send a PUT request to the given URL.
     * .
     * @param {string} url
     */
    put(url) {
        return this.submit('put', url);
    }


    /**
     * Send a PATCH request to the given URL.
     * .
     * @param {string} url
     */
    patch(url) {
        return this.submit('patch', url);
    }


    /**
     * Send a DELETE request to the given URL.
     * .
     * @param {string} url
     */
    delete(url) {
        return this.submit('delete', url);
    }


    /**
     * Submit the form.
     *
     * @param {string} requestType
     * @param {string} url
     */
    submit(requestType, url) {
        this.form = new FormData();
        this.buildFormData(this.data());

        if(requestType === 'patch' || requestType === 'put'){
            this.form.append('_method', 'patch');

            return new Promise((resolve, reject) => {
                this.axios['post'](url, this.form).then(response => {
                    this.onSuccess(response.data);
                    resolve(response.data);
                })
                    .catch(error => {
                        this.onFail(error.response.data);
                        reject(error.response.data);
                    });
            });
        }

        if(requestType === 'delete'){
            this.form.append('_method', 'delete');

            return new Promise((resolve, reject) => {
                this.axios['post'](url, this.form).then(response => {
                    this.onSuccess(response.data);
                    resolve(response.data);
                })
                    .catch(error => {
                        this.onFail(error.response.data);
                        reject(error.response.data);
                    });
            });
        }

        return new Promise((resolve, reject) => {
            this.axios[requestType](url, this.form).then(response => {
                this.onSuccess(response.data);
                resolve(response.data);
            })
                .catch(error => {
                    this.onFail(error.response.data);
                    reject(error.response.data);
                });
        });
    }


    /**
     * Handle a successful form submission.
     *
     * @param {object} data
     */
    onSuccess(data) {
        // this.reset();
    }


    /**
     * Handle a failed form submission.
     *
     * @param {object} errors
     */
    onFail(errors) {
        this.errors.record(errors.errors);
    }
}

export default Form;
