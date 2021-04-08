import React from 'react';

// import 'amis/lib/themes/default.css';
// 或 import 'amis/lib/themes/cxd.css';
// 或 import 'amis/lib/themes/dark.css';

// import 'font-awesome/css/font-awesome.css';
// import './app.css'
import axios from 'axios';
import copy from 'copy-to-clipboard';

import { render as renderAmis } from './factory';



// amis 环境配置
const env = {
    // 下面三个接口必须实现
    fetcher: ({
        url, // 接口地址
        method, // 请求方法 get、post、put、delete
        data, // 请求数据
        responseType,
        config, // 其他配置
        headers // 请求头
    }: any) => {
        config = config || {};
        config.withCredentials = true;
        responseType && (config.responseType = responseType);

        if (config.cancelExecutor) {
            config.cancelToken = new (axios as any).CancelToken(
                config.cancelExecutor
            );
        }

        config.headers = headers || {};

        if (method !== 'post' && method !== 'put' && method !== 'patch') {
            if (data) {
                config.params = data;
            }
            return (axios as any)[method](url, config);
        } else if (data && data instanceof FormData) {
            config.headers = config.headers || {};
            config.headers['Content-Type'] = 'multipart/form-data';
        } else if (
            data &&
            typeof data !== 'string' &&
            !(data instanceof Blob) &&
            !(data instanceof ArrayBuffer)
        ) {
            data = JSON.stringify(data);
            config.headers = config.headers || {};
            config.headers['Content-Type'] = 'application/json';
        }

        return (axios as any)[method](url, data, config);
    },
    isCancel: (value: any) => (axios as any).isCancel(value),
};

class AMISComponent extends React.Component<any, any> {
    render() {
        return renderAmis(
            // 这里是 amis 的 Json 配置。
            {
                type: 'page',
                body: '你好'
            },
            {
                // props...
            },
            env
        );
    }
}


export default AMISComponent;
