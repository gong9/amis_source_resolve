/**
 * @file entry of this example.
 * @author liaoxuezhi@cloud.com
 */
import './polyfills/index';
import React from 'react';
import { render } from 'react-dom';
// import App from './components/App';
import { render as amisRender } from '../src/index'

import axios from 'axios';
import { toast } from '../src/components/Toast';
import { normalizeLink } from '../src/utils/normalizeLink';
import copy from 'copy-to-clipboard';
const App = () => {

  const env = {
    updateLocation: (location, replace) => {
      router[replace ? 'replace' : 'push'](normalizeLink(location));
    },
    jumpTo: (to, action) => {
      if (to === 'goBack') {
        return router.location.goBack();
      }
      to = normalizeLink(to);
      if (action && action.actionType === 'url') {
        action.blank === false
          ? (window.location.href = to)
          : window.open(to);
        return;
      }
      if (/^https?:\/\//.test(to)) {
        window.location.replace(to);
      } else {
        router.push(to);
      }
    },
    isCurrentUrl: to => {
      if (!to) {
        return false;
      }
      const link = normalizeLink(to);
      return router.isActive(link);
    },
    fetcher: ({ url, method, data, config, headers }) => {
      config = config || {};
      config.headers = headers || {};

      if (config.cancelExecutor) {
        config.cancelToken = new axios.CancelToken(config.cancelExecutor);
      }

      if (data && data instanceof FormData) {
        // config.headers = config.headers || {};
        // config.headers['Content-Type'] = 'multipart/form-data';
      } else if (
        data &&
        typeof data !== 'string' &&
        !(data instanceof Blob) &&
        !(data instanceof ArrayBuffer)
      ) {
        data = JSON.stringify(data);
        config.headers['Content-Type'] = 'application/json';
      }

      if (method !== 'post' && method !== 'put' && method !== 'patch') {
        if (data) {
          if (method === 'delete') {
            config.data = data;
          } else {
            config.params = data;
          }
        }

        return axios[method](url, config);
      }

      return axios[method](url, data, config);
    },
    isCancel: value => axios.isCancel(value),
    copy: content => {
      copy(content);
      toast.success('内容已复制到粘贴板');
    },
    blockRouting: fn => {
      return router.setRouteLeaveHook(route, nextLocation => {
        return fn(nextLocation);
      });
    },
    // ...envOverrides
  };
  const jsx = amisRender({
    type: 'page',
    body: 'test'
  }, {}, env)
  console.log(jsx);
  return jsx

}
export function bootstrap(mountTo, initalState) {
  render(<App />, mountTo);
}
