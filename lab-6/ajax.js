export class Ajax {
    /**
     * @param {Object} settings
     */
    constructor(settings = {}) {
        this.baseURL = settings.baseURL || '';
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            ...settings.headers
        };
        this.defaultTimeout = settings.timeout || 5000;
    }

    async _request(endpoint, method, data = null, customOptions = {}) {
        const url = `${this.baseURL}${endpoint}`.replace(/([^:]\/)\/+/g, "$1/");

        const headers = { ...this.defaultHeaders, ...(customOptions.headers || {}) };
        const timeout = customOptions.timeout || this.defaultTimeout;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const fetchOptions = {
            method,
            headers,
            signal: controller.signal
        };

        if (data) {
            fetchOptions.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, fetchOptions);

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorBody = await response.text(); 
                throw new Error(`HTTP Error: ${response.status} ${response.statusText} - ${errorBody}`);
            }

            if (response.status === 204) return null;
            
            return await response.json();

        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error(`Request timeout: Przekroczono limit czasu ${timeout}ms`);
            }
            throw error;
        }
    }


    async get(url, options = {}) {
        return this._request(url, 'GET', null, options);
    }

    async post(url, data, options = {}) {
        return this._request(url, 'POST', data, options);
    }

    async put(url, data, options = {}) {
        return this._request(url, 'PUT', data, options);
    }

    async delete(url, options = {}) {
        return this._request(url, 'DELETE', null, options);
    }
}