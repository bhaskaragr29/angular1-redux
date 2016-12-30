export default function httpmiddleware($http) {
    
    const sendRequest = (method, request, config) => {
        const url = request.path;
        const {data, params} = request;
        const headers = request.headers;
        
        return $http({ method, url, params, data, headers })
            .then(res => res.data);
            // .catch(handleError.bind(null, config));
    };
    
    return {
        get: (request, config) => sendRequest('GET', request, config)
    }
}

httpmiddleware.$inject = ['$http'];