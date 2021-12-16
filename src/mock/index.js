import Mock from 'mockjs';

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send;
Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
        this.custom.xhr.withCredentials = this.withCredentials || false;
        this.custom.xhr.responseType = this.responseType;
    }
    this.proxy_send(...arguments);
};

// Mock.setup({
//   timeout: '350-600'
// })

Mock.mock(/\/api\/apolloConfig/, 'get', config => {
    return {
        code: 200,
        data: {
            ...config,
            ...Mock.mock({
                'number0|+1': 3,
                'number1|1-100.1-10': 1,
                'number2|123.1-10': 1,
                'number3|123.3': 1,
                'number4|123.10': 1.123,
                'string1|1-4': 'str',
                'string2|5': 'str0',
                'boolean1|1': true,
                'boolean2|1-3': true,
                'obj1|2': {
                    a: 1,
                    b: 2,
                    c: 3,
                    d: 4
                },
                'obj2|2-3': {
                    a: 1,
                    b: 2,
                    c: 3,
                    d: 4
                },
                'regexp1': /[a-z][A-Z][0-9]/,
                'regexp2': /\w\W\s\S\d\D/,
                'regexp3': /\d{5,10}/,
                'array1|2': [1, 2, 3, 4, 5, 6],
                'array2|+1': [0, 1, 2, 3, 4, 5, 6],
                'array3|1-3': [1, 2, 3, 4, 5, 6],
                'array4|2': [1, 2, 3, 4, 5, 6],
                email: '@email'
            })
        },
        msg: ''
    };
});
Mock.mock(/\/api\/login/, 'post', config => {
    return {
        code: 200,
        data: config,
        msg: ''
    };
});

export default Mock;
