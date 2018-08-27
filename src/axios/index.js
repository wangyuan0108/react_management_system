import JsonP from 'jsonp';
export default class Axios {
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, { param: 'callback' }, function(err, respone) {
                if (respone.status === 'success') {
                    resolve(respone);
                } else {
                    reject(respone.message);
                }
            });
        });
    }
}
