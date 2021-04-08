amis.require.resourceMap({
  "res": {
    "node_modules/tslib/tslib": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/object-assign/index": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react/cjs/react.production.min": {
      "type": "js",
      "deps": [
        "node_modules/object-assign/index"
      ],
      "pkg": "p0"
    },
    "node_modules/prop-types/lib/ReactPropTypesSecret": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/prop-types/checkPropTypes": {
      "type": "js",
      "deps": [
        "node_modules/prop-types/lib/ReactPropTypesSecret"
      ],
      "pkg": "p0"
    },
    "node_modules/react/cjs/react.development": {
      "type": "js",
      "deps": [
        "node_modules/object-assign/index",
        "node_modules/prop-types/checkPropTypes"
      ],
      "pkg": "p0"
    },
    "node_modules/react/index": {
      "type": "js",
      "deps": [
        "node_modules/react/cjs/react.production.min",
        "node_modules/react/cjs/react.development"
      ],
      "pkg": "p0"
    },
    "node_modules/scheduler/cjs/scheduler.production.min": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/scheduler/cjs/scheduler.development": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/scheduler/index": {
      "type": "js",
      "deps": [
        "node_modules/scheduler/cjs/scheduler.production.min",
        "node_modules/scheduler/cjs/scheduler.development"
      ],
      "pkg": "p0"
    },
    "node_modules/react-dom/cjs/react-dom.production.min": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/object-assign/index",
        "node_modules/scheduler/index"
      ],
      "pkg": "p0"
    },
    "node_modules/scheduler/cjs/scheduler-tracing.production.min": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/scheduler/cjs/scheduler-tracing.development": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/scheduler/tracing": {
      "type": "js",
      "deps": [
        "node_modules/scheduler/cjs/scheduler-tracing.production.min",
        "node_modules/scheduler/cjs/scheduler-tracing.development"
      ],
      "pkg": "p0"
    },
    "node_modules/react-dom/cjs/react-dom.development": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/object-assign/index",
        "node_modules/scheduler/index",
        "node_modules/prop-types/checkPropTypes",
        "node_modules/scheduler/tracing"
      ],
      "pkg": "p0"
    },
    "node_modules/react-dom/index": {
      "type": "js",
      "deps": [
        "node_modules/react-dom/cjs/react-dom.production.min",
        "node_modules/react-dom/cjs/react-dom.development"
      ],
      "pkg": "p0"
    },
    "node_modules/axios/lib/helpers/bind": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/axios/lib/utils": {
      "type": "js",
      "deps": [
        "node_modules/axios/lib/helpers/bind"
      ],
      "pkg": "p0"
    },
    "node_modules/axios/lib/helpers/buildURL": {
      "type": "js",
      "deps": [
        "node_modules/axios/lib/utils"
      ],
      "pkg": "p0"
    },
    "node_modules/axios/lib/core/InterceptorManager": {
      "type": "js",
      "deps": [
        "node_modules/axios/lib/utils"
      ],
      "pkg": "p0"
    },
    "node_modules/axios/lib/core/transformData": {
      "type": "js",
      "deps": [
        "node_modules/axios/lib/utils"
      ],
      "pkg": "p0"
    },
    "node_modules/axios/lib/cancel/isCancel": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/axios/lib/helpers/normalizeHeaderName": {
      "type": "js",
      "deps": [
        "node_modules/axios/lib/utils"
      ],
      "pkg": "p0"
    },
    "node_modules/axios/lib/core/enhanceError": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/axios/lib/core/createError": {
      "type": "js",
      "deps": [
        "node_modules/axios/lib/core/enhanceError"
      ],
      "pkg": "p0"
    },
    "node_modules/axios/lib/core/settle": {
      "type": "js",
      "deps": [
        "node_modules/axios/lib/core/createError"
      ],
      "pkg": "p0"
    },
    "node_modules/axios/lib/helpers/cookies": {
      "type": "js",
      "deps": [
        "node_modules/axios/lib/utils"
      ],
      "pkg": "p0"
    },
    "node_modules/axios/lib/helpers/isAbsoluteURL": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/axios/lib/helpers/combineURLs": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/axios/lib/core/buildFullPath": {
      "type": "js",
      "deps": [
        "node_modules/axios/lib/helpers/isAbsoluteURL",
        "node_modules/axios/lib/helpers/combineURLs"
      ],
      "pkg": "p0"
    },
    "node_modules/axios/lib/helpers/parseHeaders": {
      "type": "js",
      "deps": [
        "node_modules/axios/lib/utils"
      ],
      "pkg": "p0"
    },
    "node_modules/axios/lib/helpers/isURLSameOrigin": {
      "type": "js",
      "deps": [
        "node_modules/axios/lib/utils"
      ],
      "pkg": "p0"
    },
    "node_modules/axios/lib/adapters/xhr": {
      "type": "js",
      "deps": [
        "node_modules/axios/lib/utils",
        "node_modules/axios/lib/core/settle",
        "node_modules/axios/lib/helpers/cookies",
        "node_modules/axios/lib/helpers/buildURL",
        "node_modules/axios/lib/core/buildFullPath",
        "node_modules/axios/lib/helpers/parseHeaders",
        "node_modules/axios/lib/helpers/isURLSameOrigin",
        "node_modules/axios/lib/core/createError"
      ],
      "pkg": "p0"
    },
    "node_modules/axios/lib/defaults": {
      "type": "js",
      "deps": [
        "node_modules/axios/lib/utils",
        "node_modules/axios/lib/helpers/normalizeHeaderName",
        "node_modules/axios/lib/adapters/xhr"
      ],
      "pkg": "p0"
    },
    "node_modules/axios/lib/core/dispatchRequest": {
      "type": "js",
      "deps": [
        "node_modules/axios/lib/utils",
        "node_modules/axios/lib/core/transformData",
        "node_modules/axios/lib/cancel/isCancel",
        "node_modules/axios/lib/defaults"
      ],
      "pkg": "p0"
    },
    "node_modules/axios/lib/core/mergeConfig": {
      "type": "js",
      "deps": [
        "node_modules/axios/lib/utils"
      ],
      "pkg": "p0"
    },
    "node_modules/axios/lib/core/Axios": {
      "type": "js",
      "deps": [
        "node_modules/axios/lib/utils",
        "node_modules/axios/lib/helpers/buildURL",
        "node_modules/axios/lib/core/InterceptorManager",
        "node_modules/axios/lib/core/dispatchRequest",
        "node_modules/axios/lib/core/mergeConfig"
      ],
      "pkg": "p0"
    },
    "node_modules/axios/lib/cancel/Cancel": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/axios/lib/cancel/CancelToken": {
      "type": "js",
      "deps": [
        "node_modules/axios/lib/cancel/Cancel"
      ],
      "pkg": "p0"
    },
    "node_modules/axios/lib/helpers/spread": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/axios/lib/helpers/isAxiosError": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/axios/lib/axios": {
      "type": "js",
      "deps": [
        "node_modules/axios/lib/utils",
        "node_modules/axios/lib/helpers/bind",
        "node_modules/axios/lib/core/Axios",
        "node_modules/axios/lib/core/mergeConfig",
        "node_modules/axios/lib/defaults",
        "node_modules/axios/lib/cancel/Cancel",
        "node_modules/axios/lib/cancel/CancelToken",
        "node_modules/axios/lib/cancel/isCancel",
        "node_modules/axios/lib/helpers/spread",
        "node_modules/axios/lib/helpers/isAxiosError"
      ],
      "pkg": "p0"
    },
    "node_modules/axios/index": {
      "type": "js",
      "deps": [
        "node_modules/axios/lib/axios"
      ],
      "pkg": "p0"
    },
    "node_modules/toggle-selection/index": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/copy-to-clipboard/index": {
      "type": "js",
      "deps": [
        "node_modules/toggle-selection/index"
      ],
      "pkg": "p0"
    },
    "node_modules/path-to-regexp/dist/index": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/qs/lib/utils": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/qs/lib/formats": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/qs/lib/stringify": {
      "type": "js",
      "deps": [
        "node_modules/qs/lib/utils",
        "node_modules/qs/lib/formats"
      ],
      "pkg": "p0"
    },
    "node_modules/qs/lib/parse": {
      "type": "js",
      "deps": [
        "node_modules/qs/lib/utils"
      ],
      "pkg": "p0"
    },
    "node_modules/qs/lib/index": {
      "type": "js",
      "deps": [
        "node_modules/qs/lib/stringify",
        "node_modules/qs/lib/parse",
        "node_modules/qs/lib/formats"
      ],
      "pkg": "p0"
    },
    "node_modules/jquery/dist/jquery": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/immutability-helper/index": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-is/cjs/react-is.production.min": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-is/cjs/react-is.development": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-is/index": {
      "type": "js",
      "deps": [
        "node_modules/react-is/cjs/react-is.production.min",
        "node_modules/react-is/cjs/react-is.development"
      ],
      "pkg": "p0"
    },
    "node_modules/prop-types/factoryWithTypeCheckers": {
      "type": "js",
      "deps": [
        "node_modules/react-is/index",
        "node_modules/object-assign/index",
        "node_modules/prop-types/lib/ReactPropTypesSecret",
        "node_modules/prop-types/checkPropTypes"
      ],
      "pkg": "p0"
    },
    "node_modules/prop-types/factoryWithThrowingShims": {
      "type": "js",
      "deps": [
        "node_modules/prop-types/lib/ReactPropTypesSecret"
      ],
      "pkg": "p0"
    },
    "node_modules/prop-types/index": {
      "type": "js",
      "deps": [
        "node_modules/react-is/index",
        "node_modules/prop-types/factoryWithTypeCheckers",
        "node_modules/prop-types/factoryWithThrowingShims"
      ],
      "pkg": "p0"
    },
    "node_modules/react-cropper/node_modules/cropperjs/dist/cropper": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-cropper/dist/react-cropper": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index",
        "node_modules/react-cropper/node_modules/cropperjs/dist/cropper"
      ],
      "pkg": "p0"
    },
    "node_modules/react-dropzone/dist/index": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index"
      ],
      "pkg": "p0"
    },
    "node_modules/classnames/index": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/exceljs/dist/exceljs.min": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/moment/moment": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/mobx/lib/mobx.min": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/mobx/lib/mobx": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/mobx/lib/index": {
      "type": "js",
      "deps": [
        "node_modules/mobx/lib/mobx.min",
        "node_modules/mobx/lib/mobx"
      ],
      "pkg": "p0"
    },
    "node_modules/mobx-state-tree/dist/mobx-state-tree": {
      "type": "js",
      "deps": [
        "node_modules/mobx/lib/index"
      ],
      "pkg": "p0"
    },
    "node_modules/@babel/runtime/helpers/interopRequireDefault": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/dom-helpers/class/hasClass": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/dom-helpers/class/addClass": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/dom-helpers/class/hasClass"
      ],
      "pkg": "p0"
    },
    "node_modules/dom-helpers/class/removeClass": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-lifecycles-compat/react-lifecycles-compat.cjs": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-transition-group/utils/PropTypes": {
      "type": "js",
      "deps": [
        "node_modules/prop-types/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-transition-group/Transition": {
      "type": "js",
      "deps": [
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/react-dom/index",
        "node_modules/react-lifecycles-compat/react-lifecycles-compat.cjs",
        "node_modules/react-transition-group/utils/PropTypes"
      ],
      "pkg": "p0"
    },
    "node_modules/react-transition-group/CSSTransition": {
      "type": "js",
      "deps": [
        "node_modules/prop-types/index",
        "node_modules/dom-helpers/class/addClass",
        "node_modules/dom-helpers/class/removeClass",
        "node_modules/react/index",
        "node_modules/react-transition-group/Transition",
        "node_modules/react-transition-group/utils/PropTypes"
      ],
      "pkg": "p0"
    },
    "node_modules/react-transition-group/utils/ChildMapping": {
      "type": "js",
      "deps": [
        "node_modules/react/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-transition-group/TransitionGroup": {
      "type": "js",
      "deps": [
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/react-lifecycles-compat/react-lifecycles-compat.cjs",
        "node_modules/react-transition-group/utils/ChildMapping"
      ],
      "pkg": "p0"
    },
    "node_modules/react-transition-group/ReplaceTransition": {
      "type": "js",
      "deps": [
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/react-dom/index",
        "node_modules/react-transition-group/TransitionGroup"
      ],
      "pkg": "p0"
    },
    "node_modules/react-transition-group/index": {
      "type": "js",
      "deps": [
        "node_modules/react-transition-group/CSSTransition",
        "node_modules/react-transition-group/ReplaceTransition",
        "node_modules/react-transition-group/TransitionGroup",
        "node_modules/react-transition-group/Transition"
      ],
      "pkg": "p0"
    },
    "node_modules/papaparse/papaparse.min": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/node_modules/tslib/tslib": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/lib/core/env": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/lib/core/util": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/node_modules/tslib/tslib": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/lib/core/vector": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/lib/mixin/Draggable": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/lib/core/Eventful": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/lib/core/fourPointsTransform": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/lib/core/dom": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/env",
        "node_modules/zrender/lib/core/fourPointsTransform"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/core/event": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/Eventful",
        "node_modules/zrender/lib/core/env",
        "node_modules/zrender/lib/core/dom"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/core/GestureMgr": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/event"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/Handler": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/core/vector",
        "node_modules/zrender/lib/mixin/Draggable",
        "node_modules/zrender/lib/core/Eventful",
        "node_modules/zrender/lib/core/event",
        "node_modules/zrender/lib/core/GestureMgr"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/core/matrix": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/lib/core/Transformable": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/matrix",
        "node_modules/zrender/lib/core/vector"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/animation/easing": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/lib/animation/Clip": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/animation/easing"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/core/LRU": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/lib/tool/color": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/LRU"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/animation/Animator": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/animation/Clip",
        "node_modules/zrender/lib/tool/color",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/core/Point": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/lib/core/BoundingRect": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/matrix",
        "node_modules/zrender/lib/core/Point"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/contain/text": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/BoundingRect",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/core/LRU"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/config": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/lib/Element": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/Transformable",
        "node_modules/zrender/lib/animation/Animator",
        "node_modules/zrender/lib/core/BoundingRect",
        "node_modules/zrender/lib/core/Eventful",
        "node_modules/zrender/lib/contain/text",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/config",
        "node_modules/zrender/lib/tool/color",
        "node_modules/zrender/lib/core/env"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/core/timsort": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/lib/Storage": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/core/env",
        "node_modules/zrender/lib/Element",
        "node_modules/zrender/lib/core/timsort"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/animation/requestAnimationFrame": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/lib/animation/Animation": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/Eventful",
        "node_modules/zrender/lib/animation/requestAnimationFrame",
        "node_modules/zrender/lib/animation/Animator"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/dom/HandlerProxy": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/event",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/core/Eventful",
        "node_modules/zrender/lib/core/env"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/Displayable": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/Element",
        "node_modules/zrender/lib/core/BoundingRect",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/core/curve": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/vector"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/core/bbox": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/vector",
        "node_modules/zrender/lib/core/curve"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/core/PathProxy": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/vector",
        "node_modules/zrender/lib/core/BoundingRect",
        "node_modules/zrender/lib/config",
        "node_modules/zrender/lib/core/bbox",
        "node_modules/zrender/lib/core/curve"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/contain/line": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/lib/contain/cubic": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/curve"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/contain/quadratic": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/curve"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/contain/util": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/lib/contain/arc": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/contain/util"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/contain/windingLine": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/lib/contain/path": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/PathProxy",
        "node_modules/zrender/lib/contain/line",
        "node_modules/zrender/lib/contain/cubic",
        "node_modules/zrender/lib/contain/quadratic",
        "node_modules/zrender/lib/contain/arc",
        "node_modules/zrender/lib/core/curve",
        "node_modules/zrender/lib/contain/windingLine"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/Path": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Displayable",
        "node_modules/zrender/lib/Element",
        "node_modules/zrender/lib/core/PathProxy",
        "node_modules/zrender/lib/contain/path",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/tool/color",
        "node_modules/zrender/lib/config"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/tool/transformPath": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/PathProxy",
        "node_modules/zrender/lib/core/vector"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/tool/path": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Path",
        "node_modules/zrender/lib/core/PathProxy",
        "node_modules/zrender/lib/tool/transformPath",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/Group": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/Element",
        "node_modules/zrender/lib/core/BoundingRect"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/Image": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Displayable",
        "node_modules/zrender/lib/core/BoundingRect",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/shape/Circle": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Path"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/helper/roundRect": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/helper/subPixelOptimize": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/shape/Rect": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Path",
        "node_modules/zrender/lib/graphic/helper/roundRect",
        "node_modules/zrender/lib/graphic/helper/subPixelOptimize"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/shape/Ellipse": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Path"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/shape/Line": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Path",
        "node_modules/zrender/lib/graphic/helper/subPixelOptimize"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/helper/smoothSpline": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/vector"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/helper/smoothBezier": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/vector"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/helper/poly": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/graphic/helper/smoothSpline",
        "node_modules/zrender/lib/graphic/helper/smoothBezier"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/shape/Polygon": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Path",
        "node_modules/zrender/lib/graphic/helper/poly"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/shape/Polyline": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Path",
        "node_modules/zrender/lib/graphic/helper/poly"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/Gradient": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/LinearGradient": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Gradient"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/TSpan": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Displayable",
        "node_modules/zrender/lib/contain/text",
        "node_modules/zrender/lib/graphic/Path",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/tool/parseSVG": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/graphic/Group",
        "node_modules/zrender/lib/graphic/Image",
        "node_modules/zrender/lib/graphic/shape/Circle",
        "node_modules/zrender/lib/graphic/shape/Rect",
        "node_modules/zrender/lib/graphic/shape/Ellipse",
        "node_modules/zrender/lib/graphic/shape/Line",
        "node_modules/zrender/lib/graphic/Path",
        "node_modules/zrender/lib/graphic/shape/Polygon",
        "node_modules/zrender/lib/graphic/shape/Polyline",
        "node_modules/zrender/lib/core/matrix",
        "node_modules/zrender/lib/tool/path",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/graphic/LinearGradient",
        "node_modules/zrender/lib/graphic/TSpan"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/helper/roundSector": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/PathProxy"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/shape/Sector": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Path",
        "node_modules/zrender/lib/graphic/helper/roundSector"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/tool/morphPath": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/PathProxy",
        "node_modules/zrender/lib/core/curve",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/core/vector",
        "node_modules/zrender/lib/graphic/shape/Rect",
        "node_modules/zrender/lib/graphic/shape/Sector"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/CompoundPath": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Path"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/IncrementalDisplayable": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Displayable",
        "node_modules/zrender/lib/core/BoundingRect"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/helper/image": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/LRU"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/helper/parseText": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/graphic/helper/image",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/contain/text"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/Text": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/helper/parseText",
        "node_modules/zrender/lib/graphic/TSpan",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/contain/text",
        "node_modules/zrender/lib/graphic/Image",
        "node_modules/zrender/lib/graphic/shape/Rect",
        "node_modules/zrender/lib/core/BoundingRect",
        "node_modules/zrender/lib/core/matrix",
        "node_modules/zrender/lib/graphic/Displayable"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/shape/Arc": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Path"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/shape/BezierCurve": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Path",
        "node_modules/zrender/lib/core/vector",
        "node_modules/zrender/lib/core/curve"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/shape/Droplet": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Path"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/shape/Heart": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Path"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/shape/Isogon": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Path"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/shape/Ring": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Path"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/shape/Rose": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Path"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/shape/Star": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Path"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/shape/Trochoid": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Path"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/RadialGradient": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Gradient"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/Pattern": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/lib/core/OrientedBoundingRect": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/Point"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/debug/showDebugDirtyRect": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/lib/export": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/core/matrix",
        "node_modules/zrender/lib/core/vector",
        "node_modules/zrender/lib/tool/color",
        "node_modules/zrender/lib/tool/path",
        "node_modules/zrender/lib/tool/parseSVG",
        "node_modules/zrender/lib/tool/morphPath",
        "node_modules/zrender/lib/core/Point",
        "node_modules/zrender/lib/Element",
        "node_modules/zrender/lib/graphic/Group",
        "node_modules/zrender/lib/graphic/Path",
        "node_modules/zrender/lib/graphic/Image",
        "node_modules/zrender/lib/graphic/CompoundPath",
        "node_modules/zrender/lib/graphic/TSpan",
        "node_modules/zrender/lib/graphic/IncrementalDisplayable",
        "node_modules/zrender/lib/graphic/Text",
        "node_modules/zrender/lib/graphic/shape/Arc",
        "node_modules/zrender/lib/graphic/shape/BezierCurve",
        "node_modules/zrender/lib/graphic/shape/Circle",
        "node_modules/zrender/lib/graphic/shape/Droplet",
        "node_modules/zrender/lib/graphic/shape/Ellipse",
        "node_modules/zrender/lib/graphic/shape/Heart",
        "node_modules/zrender/lib/graphic/shape/Isogon",
        "node_modules/zrender/lib/graphic/shape/Line",
        "node_modules/zrender/lib/graphic/shape/Polygon",
        "node_modules/zrender/lib/graphic/shape/Polyline",
        "node_modules/zrender/lib/graphic/shape/Rect",
        "node_modules/zrender/lib/graphic/shape/Ring",
        "node_modules/zrender/lib/graphic/shape/Rose",
        "node_modules/zrender/lib/graphic/shape/Sector",
        "node_modules/zrender/lib/graphic/shape/Star",
        "node_modules/zrender/lib/graphic/shape/Trochoid",
        "node_modules/zrender/lib/graphic/LinearGradient",
        "node_modules/zrender/lib/graphic/RadialGradient",
        "node_modules/zrender/lib/graphic/Pattern",
        "node_modules/zrender/lib/core/BoundingRect",
        "node_modules/zrender/lib/core/OrientedBoundingRect",
        "node_modules/zrender/lib/debug/showDebugDirtyRect"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/zrender": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/env",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/Handler",
        "node_modules/zrender/lib/Storage",
        "node_modules/zrender/lib/animation/Animation",
        "node_modules/zrender/lib/dom/HandlerProxy",
        "node_modules/zrender/lib/export",
        "node_modules/zrender/lib/tool/color",
        "node_modules/zrender/lib/config"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/util/number": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/util/log": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/util/model": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/core/env",
        "node_modules/echarts/lib/util/number",
        "node_modules/zrender/lib/animation/Animator",
        "node_modules/echarts/lib/util/log"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/util/clazz": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/model/mixin/makeStyleMapper": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/model/mixin/areaStyle": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/model/mixin/makeStyleMapper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/util/innerStore": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/util/states": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/LRU",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/innerStore",
        "node_modules/zrender/lib/tool/color",
        "node_modules/echarts/lib/util/model",
        "node_modules/zrender/lib/graphic/Path"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/util/graphic": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/tool/path",
        "node_modules/zrender/lib/core/matrix",
        "node_modules/zrender/lib/core/vector",
        "node_modules/zrender/lib/graphic/Path",
        "node_modules/zrender/lib/core/Transformable",
        "node_modules/zrender/lib/graphic/Image",
        "node_modules/zrender/lib/graphic/Group",
        "node_modules/zrender/lib/graphic/Text",
        "node_modules/zrender/lib/graphic/shape/Circle",
        "node_modules/zrender/lib/graphic/shape/Ellipse",
        "node_modules/zrender/lib/graphic/shape/Sector",
        "node_modules/zrender/lib/graphic/shape/Ring",
        "node_modules/zrender/lib/graphic/shape/Polygon",
        "node_modules/zrender/lib/graphic/shape/Polyline",
        "node_modules/zrender/lib/graphic/shape/Rect",
        "node_modules/zrender/lib/graphic/shape/Line",
        "node_modules/zrender/lib/graphic/shape/BezierCurve",
        "node_modules/zrender/lib/graphic/shape/Arc",
        "node_modules/zrender/lib/graphic/CompoundPath",
        "node_modules/zrender/lib/graphic/LinearGradient",
        "node_modules/zrender/lib/graphic/RadialGradient",
        "node_modules/zrender/lib/core/BoundingRect",
        "node_modules/zrender/lib/core/OrientedBoundingRect",
        "node_modules/zrender/lib/core/Point",
        "node_modules/zrender/lib/graphic/IncrementalDisplayable",
        "node_modules/zrender/lib/graphic/helper/subPixelOptimize",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/innerStore"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/label/labelStyle": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/graphic/Text",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/states",
        "node_modules/echarts/lib/util/log",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/util/graphic"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/model/mixin/textStyle": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/label/labelStyle",
        "node_modules/zrender/lib/graphic/Text"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/model/mixin/lineStyle": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/model/mixin/makeStyleMapper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/model/mixin/itemStyle": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/model/mixin/makeStyleMapper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/model/Model": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/env",
        "node_modules/echarts/lib/util/clazz",
        "node_modules/echarts/lib/model/mixin/areaStyle",
        "node_modules/echarts/lib/model/mixin/textStyle",
        "node_modules/echarts/lib/model/mixin/lineStyle",
        "node_modules/echarts/lib/model/mixin/itemStyle",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/util/component": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/clazz",
        "node_modules/echarts/lib/util/log"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/i18n/langEN": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/i18n/langZH": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/locale": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/model/Model",
        "node_modules/zrender/lib/core/env",
        "node_modules/echarts/lib/i18n/langEN",
        "node_modules/echarts/lib/i18n/langZH",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/util/time": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/locale",
        "node_modules/echarts/lib/model/Model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/legacy/getTextRect": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/log"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/util/format": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/util/time",
        "node_modules/echarts/lib/util/log",
        "node_modules/zrender/lib/graphic/helper/parseText",
        "node_modules/echarts/lib/legacy/getTextRect"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/util/layout": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/core/BoundingRect",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/util/format"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/model/Component": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/model/Model",
        "node_modules/echarts/lib/util/component",
        "node_modules/echarts/lib/util/clazz",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/util/layout"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/model/globalDefault": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/util/types": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/data/helper/sourceHelper": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/model",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/types"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/model/internalComponentCreator": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/model/mixin/palette": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/model/Global": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/model/Model",
        "node_modules/echarts/lib/model/Component",
        "node_modules/echarts/lib/model/globalDefault",
        "node_modules/echarts/lib/data/helper/sourceHelper",
        "node_modules/echarts/lib/model/internalComponentCreator",
        "node_modules/echarts/lib/model/mixin/palette"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/ExtensionAPI": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/CoordinateSystem": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/model/OptionManager": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/model",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/log"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/preprocessor/helper/compatStyle": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/util/log"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/preprocessor/backwardCompat": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/preprocessor/helper/compatStyle",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/util/log"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/processor/dataStack": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/data/Source": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/types",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/data/helper/dataProvider": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/data/Source",
        "node_modules/echarts/lib/util/types"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/model/mixin/dataFormat": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/data/helper/dataProvider",
        "node_modules/echarts/lib/util/format",
        "node_modules/echarts/lib/util/log"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/stream/task": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/data/helper/dataValueHelper": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/number",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/log"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/data/helper/transform": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/types",
        "node_modules/echarts/lib/util/model",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/data/helper/dataProvider",
        "node_modules/echarts/lib/data/helper/dataValueHelper",
        "node_modules/echarts/lib/data/helper/sourceHelper",
        "node_modules/echarts/lib/util/log",
        "node_modules/echarts/lib/data/Source"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/data/helper/sourceManager": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/data/Source",
        "node_modules/echarts/lib/util/types",
        "node_modules/echarts/lib/data/helper/sourceHelper",
        "node_modules/echarts/lib/data/helper/transform"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/tooltip/tooltipMarkup": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/format",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/data/helper/dataValueHelper",
        "node_modules/echarts/lib/util/number"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/tooltip/seriesFormatTooltip": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/component/tooltip/tooltipMarkup",
        "node_modules/echarts/lib/data/helper/dataProvider",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/model/Series": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/core/env",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/model/Component",
        "node_modules/echarts/lib/model/mixin/palette",
        "node_modules/echarts/lib/model/mixin/dataFormat",
        "node_modules/echarts/lib/util/layout",
        "node_modules/echarts/lib/stream/task",
        "node_modules/echarts/lib/util/clazz",
        "node_modules/echarts/lib/data/helper/sourceManager",
        "node_modules/echarts/lib/component/tooltip/seriesFormatTooltip"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/view/Component": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/graphic/Group",
        "node_modules/echarts/lib/util/component",
        "node_modules/echarts/lib/util/clazz"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/helper/createRenderPlanner": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/view/Chart": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/graphic/Group",
        "node_modules/echarts/lib/util/component",
        "node_modules/echarts/lib/util/clazz",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/util/states",
        "node_modules/echarts/lib/stream/task",
        "node_modules/echarts/lib/chart/helper/createRenderPlanner"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/util/throttle": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/visual/style": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/model/mixin/makeStyleMapper",
        "node_modules/echarts/lib/model/mixin/itemStyle",
        "node_modules/echarts/lib/model/mixin/lineStyle",
        "node_modules/echarts/lib/model/Model",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/loading/default": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/zrender/lib/contain/text"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/stream/Scheduler": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/stream/task",
        "node_modules/echarts/lib/util/component",
        "node_modules/echarts/lib/model/Global",
        "node_modules/echarts/lib/ExtensionAPI",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/theme/light": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/theme/dark": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/dataset": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/model/Component",
        "node_modules/echarts/lib/view/Component",
        "node_modules/echarts/lib/util/types",
        "node_modules/echarts/lib/data/helper/sourceManager"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/geo/mapDataStorage": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/tool/parseSVG"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/util/ECEventProcessor": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/clazz"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/visual/symbol": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/visual/helper": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/label/labelGuideHelper": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/graphic",
        "node_modules/zrender/lib/core/PathProxy",
        "node_modules/zrender/lib/contain/util",
        "node_modules/zrender/lib/core/curve",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/core/matrix",
        "node_modules/zrender/lib/core/vector",
        "node_modules/echarts/lib/util/states"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/label/labelLayoutHelper": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/graphic"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/label/LabelManager": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/innerStore",
        "node_modules/echarts/lib/util/number",
        "node_modules/zrender/lib/core/Transformable",
        "node_modules/echarts/lib/label/labelGuideHelper",
        "node_modules/echarts/lib/util/model",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/label/labelLayoutHelper",
        "node_modules/echarts/lib/label/labelStyle"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/legacy/dataSelectAction": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/log",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/canvas/helper": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/lib/graphic/helper/dashStyle": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/canvas/graphic": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/graphic/Displayable",
        "node_modules/zrender/lib/core/PathProxy",
        "node_modules/zrender/lib/graphic/helper/image",
        "node_modules/zrender/lib/canvas/helper",
        "node_modules/zrender/lib/graphic/Path",
        "node_modules/zrender/lib/graphic/Image",
        "node_modules/zrender/lib/graphic/TSpan",
        "node_modules/zrender/lib/contain/text",
        "node_modules/zrender/lib/export",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/graphic/helper/dashStyle",
        "node_modules/zrender/lib/Element"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/canvas/Layer": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/config",
        "node_modules/zrender/lib/core/Eventful",
        "node_modules/zrender/lib/Element",
        "node_modules/zrender/lib/canvas/helper",
        "node_modules/zrender/lib/canvas/graphic",
        "node_modules/zrender/lib/core/BoundingRect"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/canvas/Painter": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/config",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/canvas/Layer",
        "node_modules/zrender/lib/animation/requestAnimationFrame",
        "node_modules/zrender/lib/graphic/Image",
        "node_modules/zrender/lib/core/env",
        "node_modules/zrender/lib/canvas/graphic",
        "node_modules/zrender/lib/Element"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/canvas/canvas": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/canvas/graphic",
        "node_modules/zrender/lib/zrender",
        "node_modules/zrender/lib/canvas/Painter"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/util/event": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/lib/core/WeakMap": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/util/symbol": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/zrender/lib/core/BoundingRect",
        "node_modules/zrender/lib/contain/text"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/util/decal": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/WeakMap",
        "node_modules/zrender/lib/core/LRU",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/util/symbol",
        "node_modules/zrender/lib/canvas/graphic"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/visual/decal": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/decal"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/echarts": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/zrender",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/tool/color",
        "node_modules/zrender/lib/core/env",
        "node_modules/zrender/lib/core/timsort",
        "node_modules/zrender/lib/core/Eventful",
        "node_modules/echarts/lib/model/Global",
        "node_modules/echarts/lib/ExtensionAPI",
        "node_modules/echarts/lib/CoordinateSystem",
        "node_modules/echarts/lib/model/OptionManager",
        "node_modules/echarts/lib/preprocessor/backwardCompat",
        "node_modules/echarts/lib/processor/dataStack",
        "node_modules/echarts/lib/model/Component",
        "node_modules/echarts/lib/model/Series",
        "node_modules/echarts/lib/view/Component",
        "node_modules/echarts/lib/view/Chart",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/innerStore",
        "node_modules/echarts/lib/util/states",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/util/throttle",
        "node_modules/echarts/lib/visual/style",
        "node_modules/echarts/lib/loading/default",
        "node_modules/echarts/lib/stream/Scheduler",
        "node_modules/echarts/lib/theme/light",
        "node_modules/echarts/lib/theme/dark",
        "node_modules/echarts/lib/component/dataset",
        "node_modules/echarts/lib/coord/geo/mapDataStorage",
        "node_modules/echarts/lib/util/clazz",
        "node_modules/echarts/lib/util/ECEventProcessor",
        "node_modules/echarts/lib/visual/symbol",
        "node_modules/echarts/lib/visual/helper",
        "node_modules/echarts/lib/label/LabelManager",
        "node_modules/echarts/lib/util/log",
        "node_modules/echarts/lib/legacy/dataSelectAction",
        "node_modules/zrender/lib/canvas/canvas",
        "node_modules/echarts/lib/data/helper/transform",
        "node_modules/echarts/lib/locale",
        "node_modules/echarts/lib/util/event",
        "node_modules/echarts/lib/visual/decal"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/data/DataDiffer": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/data/helper/dimensionHelper": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/types"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/data/DataDimensionInfo": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/data/List": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/model/Model",
        "node_modules/echarts/lib/data/DataDiffer",
        "node_modules/echarts/lib/data/helper/dataProvider",
        "node_modules/echarts/lib/data/helper/dimensionHelper",
        "node_modules/echarts/lib/data/DataDimensionInfo",
        "node_modules/echarts/lib/util/types",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/util/innerStore",
        "node_modules/echarts/lib/data/helper/dataValueHelper",
        "node_modules/echarts/lib/data/Source"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/data/helper/completeDimensions": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/data/helper/sourceHelper",
        "node_modules/echarts/lib/data/Source",
        "node_modules/echarts/lib/util/types",
        "node_modules/echarts/lib/data/DataDimensionInfo"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/data/helper/createDimensions": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/data/helper/completeDimensions"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/model/referHelper": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/data/helper/dataStackHelper": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/helper/createListFromArray": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/data/List",
        "node_modules/echarts/lib/data/helper/createDimensions",
        "node_modules/echarts/lib/data/helper/dimensionHelper",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/CoordinateSystem",
        "node_modules/echarts/lib/model/referHelper",
        "node_modules/echarts/lib/data/Source",
        "node_modules/echarts/lib/data/helper/dataStackHelper",
        "node_modules/echarts/lib/data/helper/sourceHelper",
        "node_modules/echarts/lib/util/types"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/scale/Scale": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/clazz"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/data/OrdinalMeta": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/scale/helper": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/number"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/scale/Ordinal": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/scale/Scale",
        "node_modules/echarts/lib/data/OrdinalMeta",
        "node_modules/echarts/lib/scale/helper",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/scale/Interval": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/util/format",
        "node_modules/echarts/lib/scale/Scale",
        "node_modules/echarts/lib/scale/helper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/layout/barGrid": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/data/helper/dataStackHelper",
        "node_modules/echarts/lib/chart/helper/createRenderPlanner"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/scale/Time": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/util/time",
        "node_modules/echarts/lib/scale/helper",
        "node_modules/echarts/lib/scale/Interval",
        "node_modules/echarts/lib/scale/Scale",
        "node_modules/echarts/lib/util/log",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/scale/Log": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/scale/Scale",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/scale/helper",
        "node_modules/echarts/lib/scale/Interval"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/scaleRawExtentInfo": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/contain/text"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/axisHelper": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/scale/Ordinal",
        "node_modules/echarts/lib/scale/Interval",
        "node_modules/echarts/lib/scale/Scale",
        "node_modules/echarts/lib/layout/barGrid",
        "node_modules/zrender/lib/core/BoundingRect",
        "node_modules/echarts/lib/scale/Time",
        "node_modules/echarts/lib/scale/Log",
        "node_modules/echarts/lib/data/helper/dataStackHelper",
        "node_modules/echarts/lib/coord/scaleRawExtentInfo"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/axisModelCommonMixin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/helper": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/chart/helper/createListFromArray",
        "node_modules/echarts/lib/coord/axisHelper",
        "node_modules/echarts/lib/coord/axisModelCommonMixin",
        "node_modules/echarts/lib/model/Model",
        "node_modules/echarts/lib/util/layout",
        "node_modules/echarts/lib/data/helper/dataStackHelper",
        "node_modules/echarts/lib/util/innerStore",
        "node_modules/echarts/lib/data/helper/createDimensions",
        "node_modules/echarts/lib/util/symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/contain/polygon": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/contain/windingLine"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/geo/Region": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/BoundingRect",
        "node_modules/zrender/lib/core/bbox",
        "node_modules/zrender/lib/core/vector",
        "node_modules/zrender/lib/contain/polygon"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/geo/parseGeoJson": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/coord/geo/Region"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/axisTickLabelBuilder": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/contain/text",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/coord/axisHelper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/Axis": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/coord/axisTickLabelBuilder"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/export": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/zrender",
        "node_modules/zrender/lib/core/matrix",
        "node_modules/zrender/lib/core/vector",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/tool/color",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/util/format",
        "node_modules/echarts/lib/util/time",
        "node_modules/echarts/lib/util/throttle",
        "node_modules/echarts/lib/helper",
        "node_modules/echarts/lib/coord/geo/parseGeoJson",
        "node_modules/zrender/lib/canvas/graphic",
        "node_modules/echarts/lib/data/List",
        "node_modules/echarts/lib/model/Model",
        "node_modules/echarts/lib/coord/Axis",
        "node_modules/zrender/lib/core/env"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/util/conditionalExpression": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/log",
        "node_modules/echarts/lib/data/helper/dataValueHelper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/transform/filterTransform": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/conditionalExpression",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/log"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/transform/sortTransform": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/types",
        "node_modules/echarts/lib/util/log",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/data/helper/dataValueHelper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/transform": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/component/transform/filterTransform",
        "node_modules/echarts/lib/component/transform/sortTransform"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/line/LineSeries": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/chart/helper/createListFromArray",
        "node_modules/echarts/lib/model/Series"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/helper/labelHelper": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/data/helper/dataProvider",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/helper/Symbol": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/util/symbol",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/innerStore",
        "node_modules/echarts/lib/util/states",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/chart/helper/labelHelper",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/label/labelStyle",
        "node_modules/zrender/lib/graphic/Image"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/helper/SymbolDraw": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/chart/helper/Symbol",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/label/labelStyle"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/line/helper": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/data/helper/dataStackHelper",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/util/vendor": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/line/lineAnimationDiff": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/chart/line/helper",
        "node_modules/echarts/lib/util/vendor"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/line/poly": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Path",
        "node_modules/zrender/lib/core/PathProxy",
        "node_modules/zrender/lib/core/curve"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/helper/createClipPathFromCoordSys": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/number"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/CoordinateSystem": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/line/LineView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/chart/helper/SymbolDraw",
        "node_modules/echarts/lib/chart/helper/Symbol",
        "node_modules/echarts/lib/chart/line/lineAnimationDiff",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/chart/line/poly",
        "node_modules/echarts/lib/view/Chart",
        "node_modules/echarts/lib/chart/line/helper",
        "node_modules/echarts/lib/chart/helper/createClipPathFromCoordSys",
        "node_modules/echarts/lib/coord/CoordinateSystem",
        "node_modules/echarts/lib/util/states",
        "node_modules/echarts/lib/label/labelStyle",
        "node_modules/echarts/lib/chart/helper/labelHelper",
        "node_modules/echarts/lib/util/innerStore",
        "node_modules/echarts/lib/util/vendor"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/layout/points": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/chart/helper/createRenderPlanner",
        "node_modules/echarts/lib/data/helper/dataStackHelper",
        "node_modules/echarts/lib/util/vendor"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/processor/dataSample": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/axisDefault": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/axisCommonTypes": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/axisModelCreator": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/coord/axisDefault",
        "node_modules/echarts/lib/model/Component",
        "node_modules/echarts/lib/util/layout",
        "node_modules/echarts/lib/data/OrdinalMeta",
        "node_modules/echarts/lib/coord/axisCommonTypes"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/cartesian/AxisModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/model/Component",
        "node_modules/echarts/lib/coord/axisModelCreator",
        "node_modules/echarts/lib/coord/axisModelCommonMixin",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/axis/AxisBuilder": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/innerStore",
        "node_modules/echarts/lib/label/labelStyle",
        "node_modules/echarts/lib/model/Model",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/util/symbol",
        "node_modules/zrender/lib/core/matrix",
        "node_modules/zrender/lib/core/vector",
        "node_modules/echarts/lib/coord/axisHelper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/axisPointer/modelHelper": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/model/Model",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/axis/AxisView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/component/axisPointer/modelHelper",
        "node_modules/echarts/lib/view/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/cartesian/cartesianAxisHelper": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/axis/axisSplitHelper": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/axis/CartesianAxisView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/component/axis/AxisBuilder",
        "node_modules/echarts/lib/component/axis/AxisView",
        "node_modules/echarts/lib/coord/cartesian/cartesianAxisHelper",
        "node_modules/echarts/lib/component/axis/axisSplitHelper",
        "node_modules/echarts/lib/view/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/axis": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/coord/cartesian/AxisModel",
        "node_modules/echarts/lib/component/axis/CartesianAxisView"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/cartesian/defaultAxisExtentFromData": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/coord/cartesian/cartesianAxisHelper",
        "node_modules/echarts/lib/coord/axisHelper",
        "node_modules/echarts/lib/coord/scaleRawExtentInfo"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/cartesian/GridModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/coord/cartesian/AxisModel",
        "node_modules/echarts/lib/model/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/gridSimple": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/echarts",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/component/axis",
        "node_modules/echarts/lib/coord/cartesian/defaultAxisExtentFromData",
        "node_modules/echarts/lib/view/Component",
        "node_modules/echarts/lib/coord/cartesian/GridModel",
        "node_modules/echarts/lib/model/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/line": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/chart/line/LineSeries",
        "node_modules/echarts/lib/chart/line/LineView",
        "node_modules/echarts/lib/layout/points",
        "node_modules/echarts/lib/processor/dataSample",
        "node_modules/echarts/lib/component/gridSimple"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/cartesian/Cartesian": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/cartesian/Cartesian2D": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/BoundingRect",
        "node_modules/echarts/lib/coord/cartesian/Cartesian",
        "node_modules/zrender/lib/core/matrix",
        "node_modules/zrender/lib/core/vector"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/cartesian/Axis2D": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/coord/Axis"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/cartesian/Grid": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/layout",
        "node_modules/echarts/lib/coord/axisHelper",
        "node_modules/echarts/lib/coord/cartesian/Cartesian2D",
        "node_modules/echarts/lib/coord/cartesian/Axis2D",
        "node_modules/echarts/lib/CoordinateSystem",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/coord/cartesian/cartesianAxisHelper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/bar/BaseBarSeries": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/model/Series",
        "node_modules/echarts/lib/chart/helper/createListFromArray"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/bar/BarSeries": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/chart/bar/BaseBarSeries",
        "node_modules/echarts/lib/model/Series",
        "node_modules/echarts/lib/util/component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/util/shape/sausage": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/util/graphic"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/bar/BarView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Path",
        "node_modules/zrender/lib/graphic/Group",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/innerStore",
        "node_modules/echarts/lib/util/states",
        "node_modules/echarts/lib/label/labelStyle",
        "node_modules/echarts/lib/util/throttle",
        "node_modules/echarts/lib/chart/helper/createClipPathFromCoordSys",
        "node_modules/echarts/lib/util/shape/sausage",
        "node_modules/echarts/lib/view/Chart",
        "node_modules/echarts/lib/coord/CoordinateSystem",
        "node_modules/echarts/lib/chart/helper/labelHelper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/action/changeAxisOrder": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/bar": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/layout/barGrid",
        "node_modules/echarts/lib/coord/cartesian/Grid",
        "node_modules/echarts/lib/chart/bar/BarSeries",
        "node_modules/echarts/lib/chart/bar/BarView",
        "node_modules/echarts/lib/action/changeAxisOrder",
        "node_modules/echarts/lib/component/gridSimple",
        "node_modules/echarts/lib/processor/dataSample"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/helper/createListSimply": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/data/helper/createDimensions",
        "node_modules/echarts/lib/data/List",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/visual/LegendVisualProvider": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/pie/PieSeries": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/chart/helper/createListSimply",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/data/helper/sourceHelper",
        "node_modules/echarts/lib/visual/LegendVisualProvider",
        "node_modules/echarts/lib/model/Series"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/pie/labelLayout": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/label/labelGuideHelper",
        "node_modules/echarts/lib/label/labelLayoutHelper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/helper/pieHelper": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/contain/text"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/pie/PieView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/states",
        "node_modules/echarts/lib/view/Chart",
        "node_modules/echarts/lib/chart/pie/labelLayout",
        "node_modules/echarts/lib/label/labelGuideHelper",
        "node_modules/echarts/lib/label/labelStyle",
        "node_modules/echarts/lib/chart/helper/pieHelper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/pie/pieLayout": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/util/layout",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/processor/dataFilter": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/pie": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/chart/pie/PieSeries",
        "node_modules/echarts/lib/chart/pie/PieView",
        "node_modules/echarts/lib/legacy/dataSelectAction",
        "node_modules/echarts/lib/chart/pie/pieLayout",
        "node_modules/echarts/lib/processor/dataFilter"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/scatter/ScatterSeries": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/chart/helper/createListFromArray",
        "node_modules/echarts/lib/model/Series"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/helper/LargeSymbolDraw": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/symbol",
        "node_modules/zrender/lib/graphic/IncrementalDisplayable",
        "node_modules/echarts/lib/util/innerStore"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/scatter/ScatterView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/chart/helper/SymbolDraw",
        "node_modules/echarts/lib/chart/helper/LargeSymbolDraw",
        "node_modules/echarts/lib/layout/points",
        "node_modules/echarts/lib/view/Chart"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/scatter": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/chart/scatter/ScatterSeries",
        "node_modules/echarts/lib/chart/scatter/ScatterView",
        "node_modules/echarts/lib/layout/points",
        "node_modules/echarts/lib/component/gridSimple"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/radar/IndicatorAxis": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/coord/Axis"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/radar/Radar": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/coord/radar/IndicatorAxis",
        "node_modules/echarts/lib/scale/Interval",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/coord/axisHelper",
        "node_modules/echarts/lib/CoordinateSystem",
        "node_modules/echarts/lib/coord/scaleRawExtentInfo"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/radar/RadarModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/coord/axisDefault",
        "node_modules/echarts/lib/model/Model",
        "node_modules/echarts/lib/coord/axisModelCommonMixin",
        "node_modules/echarts/lib/model/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/radar/RadarView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/component/axis/AxisBuilder",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/view/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/radar": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/coord/radar/Radar",
        "node_modules/echarts/lib/coord/radar/RadarModel",
        "node_modules/echarts/lib/component/radar/RadarView"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/radar/RadarSeries": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/model/Series",
        "node_modules/echarts/lib/chart/helper/createListSimply",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/visual/LegendVisualProvider",
        "node_modules/echarts/lib/component/tooltip/tooltipMarkup"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/radar/RadarView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/states",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/symbol",
        "node_modules/echarts/lib/view/Chart",
        "node_modules/echarts/lib/label/labelStyle",
        "node_modules/zrender/lib/graphic/Image"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/radar/radarLayout": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/radar/backwardCompat": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/radar": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/component/radar",
        "node_modules/echarts/lib/chart/radar/RadarSeries",
        "node_modules/echarts/lib/chart/radar/RadarView",
        "node_modules/echarts/lib/chart/radar/radarLayout",
        "node_modules/echarts/lib/processor/dataFilter",
        "node_modules/echarts/lib/chart/radar/backwardCompat"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/geo/fix/nanhai": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/coord/geo/Region"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/geo/fix/textCoord": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/geo/fix/geoCoord": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/geo/fix/diaoyuIsland": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/geo/geoJSONLoader": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/coord/geo/parseGeoJson",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/coord/geo/fix/nanhai",
        "node_modules/echarts/lib/coord/geo/fix/textCoord",
        "node_modules/echarts/lib/coord/geo/fix/geoCoord",
        "node_modules/echarts/lib/coord/geo/fix/diaoyuIsland"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/geo/geoSVGLoader": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/tool/parseSVG",
        "node_modules/zrender/lib/graphic/Group",
        "node_modules/zrender/lib/graphic/shape/Rect",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/core/BoundingRect",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/geo/geoSourceManager": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/coord/geo/mapDataStorage",
        "node_modules/echarts/lib/coord/geo/geoJSONLoader",
        "node_modules/echarts/lib/coord/geo/geoSVGLoader",
        "node_modules/zrender/lib/core/BoundingRect"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/map/MapSeries": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/chart/helper/createListSimply",
        "node_modules/echarts/lib/model/Series",
        "node_modules/echarts/lib/coord/geo/geoSourceManager",
        "node_modules/echarts/lib/data/helper/sourceHelper",
        "node_modules/echarts/lib/component/tooltip/tooltipMarkup"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/helper/interactionMutex": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/helper/RoamController": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/Eventful",
        "node_modules/zrender/lib/core/event",
        "node_modules/echarts/lib/component/helper/interactionMutex",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/helper/roamHelper": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/helper/cursorHelper": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/helper/MapDraw": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/component/helper/RoamController",
        "node_modules/echarts/lib/component/helper/roamHelper",
        "node_modules/echarts/lib/component/helper/cursorHelper",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/states",
        "node_modules/echarts/lib/coord/geo/geoSourceManager",
        "node_modules/echarts/lib/util/component",
        "node_modules/zrender/lib/core/Transformable",
        "node_modules/echarts/lib/label/labelStyle",
        "node_modules/echarts/lib/util/innerStore",
        "node_modules/echarts/lib/util/decal"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/map/MapView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/component/helper/MapDraw",
        "node_modules/echarts/lib/view/Chart",
        "node_modules/echarts/lib/label/labelStyle",
        "node_modules/echarts/lib/util/states"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/action/roamHelper": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/action/geoRoam": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/action/roamHelper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/View": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/core/vector",
        "node_modules/zrender/lib/core/matrix",
        "node_modules/zrender/lib/core/BoundingRect",
        "node_modules/zrender/lib/core/Transformable"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/geo/Geo": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/core/BoundingRect",
        "node_modules/echarts/lib/coord/View",
        "node_modules/echarts/lib/coord/geo/geoSourceManager",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/geo/geoCreator": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/coord/geo/Geo",
        "node_modules/echarts/lib/util/layout",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/coord/geo/geoSourceManager",
        "node_modules/echarts/lib/coord/geo/mapDataStorage"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/map/mapSymbolLayout": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/map/mapDataStatistic": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/map": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/chart/map/MapSeries",
        "node_modules/echarts/lib/chart/map/MapView",
        "node_modules/echarts/lib/action/geoRoam",
        "node_modules/echarts/lib/coord/geo/geoCreator",
        "node_modules/echarts/lib/chart/map/mapSymbolLayout",
        "node_modules/echarts/lib/chart/map/mapDataStatistic",
        "node_modules/echarts/lib/legacy/dataSelectAction"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/data/helper/linkList": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/data/Tree": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/data/helper/linkList",
        "node_modules/echarts/lib/data/List",
        "node_modules/echarts/lib/data/helper/createDimensions",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/tree/TreeSeries": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/model/Series",
        "node_modules/echarts/lib/data/Tree",
        "node_modules/echarts/lib/model/Model",
        "node_modules/echarts/lib/component/tooltip/tooltipMarkup"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/tree/layoutHelper": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/layout"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/tree/TreeView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/innerStore",
        "node_modules/echarts/lib/chart/helper/Symbol",
        "node_modules/echarts/lib/chart/tree/layoutHelper",
        "node_modules/zrender/lib/core/bbox",
        "node_modules/echarts/lib/coord/View",
        "node_modules/echarts/lib/component/helper/roamHelper",
        "node_modules/echarts/lib/component/helper/RoamController",
        "node_modules/echarts/lib/component/helper/cursorHelper",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/view/Chart",
        "node_modules/zrender/lib/graphic/Path",
        "node_modules/echarts/lib/util/states"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/tree/treeAction": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/action/roamHelper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/tree/traversalHelper": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/tree/treeLayout": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/chart/tree/traversalHelper",
        "node_modules/echarts/lib/chart/tree/layoutHelper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/tree/treeVisual": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/tree": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/chart/tree/TreeSeries",
        "node_modules/echarts/lib/chart/tree/TreeView",
        "node_modules/echarts/lib/chart/tree/treeAction",
        "node_modules/echarts/lib/chart/tree/treeLayout",
        "node_modules/echarts/lib/chart/tree/treeVisual"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/helper/treeHelper": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/helper/enableAriaDecalForTree": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/model/mixin/palette"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/treemap/TreemapSeries": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/model/Series",
        "node_modules/echarts/lib/data/Tree",
        "node_modules/echarts/lib/model/Model",
        "node_modules/echarts/lib/chart/helper/treeHelper",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/component/tooltip/tooltipMarkup",
        "node_modules/echarts/lib/chart/helper/enableAriaDecalForTree"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/treemap/Breadcrumb": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/innerStore",
        "node_modules/echarts/lib/util/layout",
        "node_modules/echarts/lib/chart/helper/treeHelper",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/util/animation": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/treemap/TreemapView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/innerStore",
        "node_modules/echarts/lib/util/states",
        "node_modules/echarts/lib/data/DataDiffer",
        "node_modules/echarts/lib/chart/helper/treeHelper",
        "node_modules/echarts/lib/chart/treemap/Breadcrumb",
        "node_modules/echarts/lib/component/helper/RoamController",
        "node_modules/zrender/lib/core/BoundingRect",
        "node_modules/zrender/lib/core/matrix",
        "node_modules/echarts/lib/util/animation",
        "node_modules/echarts/lib/model/mixin/makeStyleMapper",
        "node_modules/echarts/lib/view/Chart",
        "node_modules/zrender/lib/graphic/Displayable",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/util/format",
        "node_modules/echarts/lib/label/labelStyle"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/treemap/treemapAction": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/chart/helper/treeHelper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/visual/VisualMapping": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/tool/color",
        "node_modules/echarts/lib/util/number"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/treemap/treemapVisual": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/visual/VisualMapping",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/tool/color",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/treemap/treemapLayout": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/core/BoundingRect",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/util/layout",
        "node_modules/echarts/lib/chart/helper/treeHelper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/treemap": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/chart/treemap/TreemapSeries",
        "node_modules/echarts/lib/chart/treemap/TreemapView",
        "node_modules/echarts/lib/chart/treemap/treemapAction",
        "node_modules/echarts/lib/chart/treemap/treemapVisual",
        "node_modules/echarts/lib/chart/treemap/treemapLayout"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/data/Graph": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/helper/createGraphFromNodeEdge": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/data/List",
        "node_modules/echarts/lib/data/Graph",
        "node_modules/echarts/lib/data/helper/linkList",
        "node_modules/echarts/lib/data/helper/createDimensions",
        "node_modules/echarts/lib/CoordinateSystem",
        "node_modules/echarts/lib/chart/helper/createListFromArray",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/helper/multipleGraphEdgeHelper": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/graph/GraphSeries": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/data/List",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/model/Model",
        "node_modules/echarts/lib/chart/helper/createGraphFromNodeEdge",
        "node_modules/echarts/lib/visual/LegendVisualProvider",
        "node_modules/echarts/lib/model/Series",
        "node_modules/echarts/lib/component/tooltip/tooltipMarkup",
        "node_modules/echarts/lib/component/tooltip/seriesFormatTooltip",
        "node_modules/echarts/lib/chart/helper/multipleGraphEdgeHelper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/helper/LinePath": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/zrender/lib/core/vector"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/helper/Line": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/core/vector",
        "node_modules/echarts/lib/util/symbol",
        "node_modules/echarts/lib/chart/helper/LinePath",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/states",
        "node_modules/echarts/lib/label/labelStyle",
        "node_modules/echarts/lib/util/number"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/helper/LineDraw": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/chart/helper/Line",
        "node_modules/echarts/lib/label/labelStyle"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/graph/graphHelper": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/graph/adjustEdge": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/curve",
        "node_modules/zrender/lib/core/vector",
        "node_modules/echarts/lib/chart/graph/graphHelper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/graph/GraphView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/chart/helper/SymbolDraw",
        "node_modules/echarts/lib/chart/helper/LineDraw",
        "node_modules/echarts/lib/component/helper/RoamController",
        "node_modules/echarts/lib/component/helper/roamHelper",
        "node_modules/echarts/lib/component/helper/cursorHelper",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/chart/graph/adjustEdge",
        "node_modules/echarts/lib/chart/graph/graphHelper",
        "node_modules/echarts/lib/view/Chart",
        "node_modules/echarts/lib/util/innerStore"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/helper/focusNodeAdjacencyAction": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/graph/graphAction": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/action/roamHelper",
        "node_modules/echarts/lib/chart/helper/focusNodeAdjacencyAction"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/graph/categoryFilter": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/graph/categoryVisual": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/graph/edgeVisual": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/graph/simpleLayoutHelper": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/vector",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/chart/helper/multipleGraphEdgeHelper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/graph/simpleLayout": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/chart/graph/simpleLayoutHelper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/graph/circularLayoutHelper": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/vector",
        "node_modules/echarts/lib/chart/graph/graphHelper",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/chart/helper/multipleGraphEdgeHelper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/graph/circularLayout": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/chart/graph/circularLayoutHelper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/graph/forceHelper": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/vector"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/graph/forceLayout": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/chart/graph/forceHelper",
        "node_modules/echarts/lib/chart/graph/simpleLayoutHelper",
        "node_modules/echarts/lib/chart/graph/circularLayoutHelper",
        "node_modules/echarts/lib/util/number",
        "node_modules/zrender/lib/core/vector",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/chart/helper/multipleGraphEdgeHelper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/graph/createView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/coord/View",
        "node_modules/echarts/lib/util/layout",
        "node_modules/zrender/lib/core/bbox",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/graph": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/chart/graph/GraphSeries",
        "node_modules/echarts/lib/chart/graph/GraphView",
        "node_modules/echarts/lib/chart/graph/graphAction",
        "node_modules/echarts/lib/chart/graph/categoryFilter",
        "node_modules/echarts/lib/chart/graph/categoryVisual",
        "node_modules/echarts/lib/chart/graph/edgeVisual",
        "node_modules/echarts/lib/chart/graph/simpleLayout",
        "node_modules/echarts/lib/chart/graph/circularLayout",
        "node_modules/echarts/lib/chart/graph/forceLayout",
        "node_modules/echarts/lib/chart/graph/createView",
        "node_modules/echarts/lib/coord/View"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/gauge/GaugeSeries": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/chart/helper/createListSimply",
        "node_modules/echarts/lib/model/Series"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/gauge/PointerPath": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/graphic/Path"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/gauge/GaugeView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/chart/gauge/PointerPath",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/states",
        "node_modules/echarts/lib/label/labelStyle",
        "node_modules/echarts/lib/view/Chart",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/util/shape/sausage",
        "node_modules/echarts/lib/util/symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/gauge": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/chart/gauge/GaugeSeries",
        "node_modules/echarts/lib/chart/gauge/GaugeView"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/funnel/FunnelSeries": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/chart/helper/createListSimply",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/data/helper/sourceHelper",
        "node_modules/echarts/lib/visual/LegendVisualProvider",
        "node_modules/echarts/lib/model/Series",
        "node_modules/echarts/lib/model/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/funnel/FunnelView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/states",
        "node_modules/echarts/lib/view/Chart",
        "node_modules/echarts/lib/label/labelGuideHelper",
        "node_modules/echarts/lib/label/labelStyle"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/funnel/funnelLayout": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/layout",
        "node_modules/echarts/lib/util/number"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/funnel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/chart/funnel/FunnelSeries",
        "node_modules/echarts/lib/chart/funnel/FunnelView",
        "node_modules/echarts/lib/chart/funnel/funnelLayout",
        "node_modules/echarts/lib/processor/dataFilter"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/parallel/parallelPreprocessor": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/parallel/ParallelAxis": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/coord/Axis"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/helper/sliderMove": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/parallel/Parallel": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/core/matrix",
        "node_modules/echarts/lib/util/layout",
        "node_modules/echarts/lib/coord/axisHelper",
        "node_modules/echarts/lib/coord/parallel/ParallelAxis",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/component/helper/sliderMove"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/parallel/parallelCreator": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/coord/parallel/Parallel",
        "node_modules/echarts/lib/CoordinateSystem",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/parallel/AxisModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/model/Component",
        "node_modules/echarts/lib/model/mixin/makeStyleMapper",
        "node_modules/echarts/lib/coord/axisModelCreator",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/coord/axisModelCommonMixin"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/parallel/ParallelModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/model/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/axis/parallelAxisAction": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/helper/BrushController": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/core/Eventful",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/component/helper/interactionMutex",
        "node_modules/echarts/lib/data/DataDiffer"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/helper/brushHelper": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/BoundingRect",
        "node_modules/echarts/lib/component/helper/cursorHelper",
        "node_modules/echarts/lib/util/graphic"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/axis/ParallelAxisView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/component/axis/AxisBuilder",
        "node_modules/echarts/lib/component/helper/BrushController",
        "node_modules/echarts/lib/component/helper/brushHelper",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/view/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/parallelAxis": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/coord/parallel/parallelCreator",
        "node_modules/echarts/lib/coord/parallel/AxisModel",
        "node_modules/echarts/lib/coord/parallel/ParallelModel",
        "node_modules/echarts/lib/component/axis/parallelAxisAction",
        "node_modules/echarts/lib/component/axis/ParallelAxisView"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/parallel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/echarts",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/throttle",
        "node_modules/echarts/lib/coord/parallel/parallelPreprocessor",
        "node_modules/echarts/lib/coord/parallel/parallelCreator",
        "node_modules/echarts/lib/component/parallelAxis",
        "node_modules/echarts/lib/coord/parallel/ParallelModel",
        "node_modules/echarts/lib/view/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/parallel/ParallelSeries": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/model/Series",
        "node_modules/echarts/lib/chart/helper/createListFromArray"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/parallel/ParallelView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/states",
        "node_modules/echarts/lib/view/Chart",
        "node_modules/echarts/lib/util/number",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/parallel/parallelVisual": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/parallel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/component/parallel",
        "node_modules/echarts/lib/chart/parallel/ParallelSeries",
        "node_modules/echarts/lib/chart/parallel/ParallelView",
        "node_modules/echarts/lib/chart/parallel/parallelVisual"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/sankey/SankeySeries": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/model/Series",
        "node_modules/echarts/lib/chart/helper/createGraphFromNodeEdge",
        "node_modules/echarts/lib/model/Model",
        "node_modules/echarts/lib/component/tooltip/tooltipMarkup"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/sankey/SankeyView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/states",
        "node_modules/echarts/lib/view/Chart",
        "node_modules/echarts/lib/label/labelStyle",
        "node_modules/echarts/lib/util/innerStore"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/sankey/sankeyAction": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/chart/helper/focusNodeAdjacencyAction"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/sankey/sankeyLayout": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/layout",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/sankey/sankeyVisual": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/visual/VisualMapping"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/sankey": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/chart/sankey/SankeySeries",
        "node_modules/echarts/lib/chart/sankey/SankeyView",
        "node_modules/echarts/lib/chart/sankey/sankeyAction",
        "node_modules/echarts/lib/chart/sankey/sankeyLayout",
        "node_modules/echarts/lib/chart/sankey/sankeyVisual"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/helper/whiskerBoxCommon": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/chart/helper/createListSimply",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/data/helper/dimensionHelper",
        "node_modules/echarts/lib/data/helper/sourceHelper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/boxplot/BoxplotSeries": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/model/Series",
        "node_modules/echarts/lib/chart/helper/whiskerBoxCommon"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/boxplot/BoxplotView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/view/Chart",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/states",
        "node_modules/zrender/lib/graphic/Path"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/boxplot/boxplotVisual": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/boxplot/boxplotLayout": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/number"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/boxplot/prepareBoxplotData": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/number",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/boxplot/boxplotTransform": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/chart/boxplot/prepareBoxplotData",
        "node_modules/echarts/lib/util/log",
        "node_modules/echarts/lib/util/types"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/boxplot": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/chart/boxplot/BoxplotSeries",
        "node_modules/echarts/lib/chart/boxplot/BoxplotView",
        "node_modules/echarts/lib/chart/boxplot/boxplotVisual",
        "node_modules/echarts/lib/chart/boxplot/boxplotLayout",
        "node_modules/echarts/lib/chart/boxplot/boxplotTransform"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/candlestick/CandlestickSeries": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/model/Series",
        "node_modules/echarts/lib/chart/helper/whiskerBoxCommon"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/candlestick/CandlestickView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/view/Chart",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/states",
        "node_modules/zrender/lib/graphic/Path",
        "node_modules/echarts/lib/chart/helper/createClipPathFromCoordSys"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/candlestick/preprocessor": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/candlestick/candlestickVisual": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/chart/helper/createRenderPlanner",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/candlestick/candlestickLayout": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/chart/helper/createRenderPlanner",
        "node_modules/echarts/lib/util/number",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/candlestick": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/chart/candlestick/CandlestickSeries",
        "node_modules/echarts/lib/chart/candlestick/CandlestickView",
        "node_modules/echarts/lib/chart/candlestick/preprocessor",
        "node_modules/echarts/lib/chart/candlestick/candlestickVisual",
        "node_modules/echarts/lib/chart/candlestick/candlestickLayout"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/effectScatter/EffectScatterSeries": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/chart/helper/createListFromArray",
        "node_modules/echarts/lib/model/Series"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/helper/EffectSymbol": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/symbol",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/states",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/chart/helper/Symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/effectScatter/EffectScatterView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/chart/helper/SymbolDraw",
        "node_modules/echarts/lib/chart/helper/EffectSymbol",
        "node_modules/zrender/lib/core/matrix",
        "node_modules/echarts/lib/layout/points",
        "node_modules/echarts/lib/view/Chart"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/effectScatter": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/chart/effectScatter/EffectScatterSeries",
        "node_modules/echarts/lib/chart/effectScatter/EffectScatterView",
        "node_modules/echarts/lib/layout/points"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/lines/LinesSeries": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/model/Series",
        "node_modules/echarts/lib/data/List",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/CoordinateSystem",
        "node_modules/echarts/lib/component/tooltip/tooltipMarkup"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/helper/EffectLine": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/chart/helper/Line",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/symbol",
        "node_modules/zrender/lib/core/vector",
        "node_modules/zrender/lib/core/curve"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/helper/Polyline": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/states"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/helper/EffectPolyline": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/chart/helper/Polyline",
        "node_modules/echarts/lib/chart/helper/EffectLine",
        "node_modules/zrender/lib/core/vector"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/helper/LargeLineDraw": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/zrender/lib/graphic/IncrementalDisplayable",
        "node_modules/zrender/lib/contain/line",
        "node_modules/zrender/lib/contain/quadratic",
        "node_modules/echarts/lib/util/innerStore"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/lines/linesLayout": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/chart/helper/createRenderPlanner"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/lines/LinesView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/chart/helper/LineDraw",
        "node_modules/echarts/lib/chart/helper/EffectLine",
        "node_modules/echarts/lib/chart/helper/Line",
        "node_modules/echarts/lib/chart/helper/Polyline",
        "node_modules/echarts/lib/chart/helper/EffectPolyline",
        "node_modules/echarts/lib/chart/helper/LargeLineDraw",
        "node_modules/echarts/lib/chart/lines/linesLayout",
        "node_modules/echarts/lib/chart/helper/createClipPathFromCoordSys",
        "node_modules/echarts/lib/view/Chart"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/lines/linesVisual": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/lines": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/chart/lines/LinesSeries",
        "node_modules/echarts/lib/chart/lines/LinesView",
        "node_modules/echarts/lib/chart/lines/linesLayout",
        "node_modules/echarts/lib/chart/lines/linesVisual"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/heatmap/HeatmapSeries": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/model/Series",
        "node_modules/echarts/lib/chart/helper/createListFromArray",
        "node_modules/echarts/lib/CoordinateSystem"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/heatmap/HeatmapLayer": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/heatmap/HeatmapView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/states",
        "node_modules/echarts/lib/chart/heatmap/HeatmapLayer",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/view/Chart",
        "node_modules/echarts/lib/coord/CoordinateSystem",
        "node_modules/echarts/lib/label/labelStyle"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/heatmap": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/chart/heatmap/HeatmapSeries",
        "node_modules/echarts/lib/chart/heatmap/HeatmapView"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/bar/PictorialBarSeries": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/chart/bar/BaseBarSeries",
        "node_modules/echarts/lib/model/Series",
        "node_modules/echarts/lib/util/component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/bar/PictorialBarView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/states",
        "node_modules/echarts/lib/util/symbol",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/view/Chart",
        "node_modules/echarts/lib/chart/helper/labelHelper",
        "node_modules/echarts/lib/label/labelStyle",
        "node_modules/zrender/lib/graphic/Image",
        "node_modules/echarts/lib/util/innerStore"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/pictorialBar": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/coord/cartesian/Grid",
        "node_modules/echarts/lib/chart/bar/PictorialBarSeries",
        "node_modules/echarts/lib/chart/bar/PictorialBarView",
        "node_modules/echarts/lib/layout/barGrid",
        "node_modules/echarts/lib/component/gridSimple"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/single/SingleAxis": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/coord/Axis"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/single/Single": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/coord/single/SingleAxis",
        "node_modules/echarts/lib/coord/axisHelper",
        "node_modules/echarts/lib/util/layout",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/single/singleCreator": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/coord/single/Single",
        "node_modules/echarts/lib/CoordinateSystem",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/single/singleAxisHelper": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/axis/SingleAxisView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/component/axis/AxisBuilder",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/coord/single/singleAxisHelper",
        "node_modules/echarts/lib/component/axis/AxisView",
        "node_modules/echarts/lib/component/axis/axisSplitHelper",
        "node_modules/echarts/lib/view/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/single/AxisModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/model/Component",
        "node_modules/echarts/lib/coord/axisModelCreator",
        "node_modules/echarts/lib/coord/axisModelCommonMixin"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/axisPointer/findPointFromSeries": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/axisPointer/axisTrigger": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/component/axisPointer/modelHelper",
        "node_modules/echarts/lib/component/axisPointer/findPointFromSeries",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/axisPointer/globalListener": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/core/env",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/axisPointer/AxisPointerView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/component/axisPointer/globalListener",
        "node_modules/echarts/lib/view/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/axisPointer/BaseAxisPointer": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/component/axisPointer/modelHelper",
        "node_modules/zrender/lib/core/event",
        "node_modules/echarts/lib/util/throttle",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/axisPointer/viewHelper": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/zrender/lib/contain/text",
        "node_modules/echarts/lib/util/format",
        "node_modules/zrender/lib/core/matrix",
        "node_modules/echarts/lib/coord/axisHelper",
        "node_modules/echarts/lib/component/axis/AxisBuilder",
        "node_modules/echarts/lib/label/labelStyle"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/axisPointer/CartesianAxisPointer": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/component/axisPointer/BaseAxisPointer",
        "node_modules/echarts/lib/component/axisPointer/viewHelper",
        "node_modules/echarts/lib/coord/cartesian/cartesianAxisHelper",
        "node_modules/echarts/lib/component/axis/AxisView"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/axisPointer/AxisPointerModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/model/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/axisPointer": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/component/axisPointer/modelHelper",
        "node_modules/echarts/lib/component/axisPointer/axisTrigger",
        "node_modules/echarts/lib/component/axisPointer/AxisPointerView",
        "node_modules/echarts/lib/component/axisPointer/CartesianAxisPointer",
        "node_modules/echarts/lib/component/axisPointer/AxisPointerModel",
        "node_modules/echarts/lib/model/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/axisPointer/SingleAxisPointer": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/component/axisPointer/BaseAxisPointer",
        "node_modules/echarts/lib/component/axisPointer/viewHelper",
        "node_modules/echarts/lib/coord/single/singleAxisHelper",
        "node_modules/echarts/lib/component/axis/AxisView"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/singleAxis": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/coord/single/singleCreator",
        "node_modules/echarts/lib/component/axis/SingleAxisView",
        "node_modules/echarts/lib/coord/single/AxisModel",
        "node_modules/echarts/lib/component/axisPointer",
        "node_modules/echarts/lib/component/axisPointer/SingleAxisPointer"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/themeRiver/ThemeRiverSeries": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/model/Series",
        "node_modules/echarts/lib/data/helper/createDimensions",
        "node_modules/echarts/lib/data/helper/dimensionHelper",
        "node_modules/echarts/lib/data/List",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/visual/LegendVisualProvider",
        "node_modules/echarts/lib/component/tooltip/tooltipMarkup"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/themeRiver/ThemeRiverView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/chart/line/poly",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/states",
        "node_modules/echarts/lib/label/labelStyle",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/data/DataDiffer",
        "node_modules/echarts/lib/view/Chart"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/themeRiver/themeRiverLayout": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/number"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/themeRiver": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/component/singleAxis",
        "node_modules/echarts/lib/chart/themeRiver/ThemeRiverSeries",
        "node_modules/echarts/lib/chart/themeRiver/ThemeRiverView",
        "node_modules/echarts/lib/chart/themeRiver/themeRiverLayout",
        "node_modules/echarts/lib/processor/dataFilter"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/sunburst/SunburstSeries": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/model/Series",
        "node_modules/echarts/lib/data/Tree",
        "node_modules/echarts/lib/chart/helper/treeHelper",
        "node_modules/echarts/lib/model/Model",
        "node_modules/echarts/lib/chart/helper/enableAriaDecalForTree"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/sunburst/SunburstPiece": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/states",
        "node_modules/echarts/lib/label/labelStyle",
        "node_modules/echarts/lib/util/innerStore",
        "node_modules/echarts/lib/chart/helper/pieHelper",
        "node_modules/echarts/lib/util/decal"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/sunburst/sunburstAction": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/chart/helper/treeHelper",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/log"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/sunburst/SunburstView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/view/Chart",
        "node_modules/echarts/lib/chart/sunburst/SunburstPiece",
        "node_modules/echarts/lib/data/DataDiffer",
        "node_modules/echarts/lib/chart/sunburst/sunburstAction",
        "node_modules/echarts/lib/util/format"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/sunburst/sunburstLayout": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/number",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/sunburst/sunburstVisual": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/tool/color"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/sunburst": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/chart/sunburst/SunburstSeries",
        "node_modules/echarts/lib/chart/sunburst/SunburstView",
        "node_modules/echarts/lib/chart/sunburst/sunburstAction",
        "node_modules/echarts/lib/chart/sunburst/sunburstLayout",
        "node_modules/echarts/lib/chart/sunburst/sunburstVisual",
        "node_modules/echarts/lib/processor/dataFilter"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/cartesian/prepareCustom": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/geo/prepareCustom": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/single/prepareCustom": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/polar/prepareCustom": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/calendar/prepareCustom": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/util/styleCompat": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/chart/custom": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/states",
        "node_modules/echarts/lib/label/labelStyle",
        "node_modules/echarts/lib/chart/helper/labelHelper",
        "node_modules/echarts/lib/chart/helper/createListFromArray",
        "node_modules/echarts/lib/layout/barGrid",
        "node_modules/echarts/lib/data/DataDiffer",
        "node_modules/echarts/lib/model/Series",
        "node_modules/echarts/lib/view/Chart",
        "node_modules/echarts/lib/chart/helper/createClipPathFromCoordSys",
        "node_modules/echarts/lib/coord/cartesian/prepareCustom",
        "node_modules/echarts/lib/coord/geo/prepareCustom",
        "node_modules/echarts/lib/coord/single/prepareCustom",
        "node_modules/echarts/lib/coord/polar/prepareCustom",
        "node_modules/echarts/lib/coord/calendar/prepareCustom",
        "node_modules/echarts/lib/model/Component",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/util/styleCompat",
        "node_modules/zrender/lib/core/Transformable",
        "node_modules/zrender/lib/animation/Animator",
        "node_modules/echarts/lib/util/log",
        "node_modules/zrender/lib/tool/morphPath",
        "node_modules/zrender/lib/core/matrix",
        "node_modules/echarts/lib/util/decal"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/grid": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/component/gridSimple",
        "node_modules/echarts/lib/component/axisPointer/CartesianAxisPointer",
        "node_modules/echarts/lib/component/axisPointer"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/layout/barPolar": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/data/helper/dataStackHelper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/polar/PolarModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/model/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/polar/AxisModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/model/Component",
        "node_modules/echarts/lib/coord/axisModelCreator",
        "node_modules/echarts/lib/coord/axisModelCommonMixin",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/polar/RadiusAxis": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/coord/Axis"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/polar/AngleAxis": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/contain/text",
        "node_modules/echarts/lib/coord/Axis",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/polar/Polar": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/coord/polar/RadiusAxis",
        "node_modules/echarts/lib/coord/polar/AngleAxis"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/polar/polarCreator": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/coord/polar/Polar",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/coord/axisHelper",
        "node_modules/echarts/lib/CoordinateSystem",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/axis/AngleAxisView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/label/labelStyle",
        "node_modules/echarts/lib/model/Model",
        "node_modules/echarts/lib/component/axis/AxisView",
        "node_modules/echarts/lib/component/axis/AxisBuilder",
        "node_modules/echarts/lib/view/Component",
        "node_modules/echarts/lib/util/innerStore"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/angleAxis": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/coord/polar/polarCreator",
        "node_modules/echarts/lib/component/axis/AngleAxisView"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/axis/RadiusAxisView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/component/axis/AxisBuilder",
        "node_modules/echarts/lib/component/axis/AxisView"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/radiusAxis": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/coord/polar/polarCreator",
        "node_modules/echarts/lib/component/axis/RadiusAxisView"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/axisPointer/PolarAxisPointer": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/component/axisPointer/BaseAxisPointer",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/component/axisPointer/viewHelper",
        "node_modules/zrender/lib/core/matrix",
        "node_modules/echarts/lib/component/axis/AxisBuilder",
        "node_modules/echarts/lib/component/axis/AxisView"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/polar": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/layout/barPolar",
        "node_modules/echarts/lib/coord/polar/PolarModel",
        "node_modules/echarts/lib/coord/polar/AxisModel",
        "node_modules/echarts/lib/coord/polar/polarCreator",
        "node_modules/echarts/lib/component/angleAxis",
        "node_modules/echarts/lib/component/radiusAxis",
        "node_modules/echarts/lib/component/axisPointer",
        "node_modules/echarts/lib/component/axisPointer/PolarAxisPointer"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/geo/GeoView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/component/helper/MapDraw",
        "node_modules/echarts/lib/view/Component",
        "node_modules/echarts/lib/util/innerStore"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/geo/GeoModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/model/Component",
        "node_modules/echarts/lib/model/Model",
        "node_modules/echarts/lib/coord/geo/geoCreator"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/geo": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/coord/geo/geoCreator",
        "node_modules/echarts/lib/component/geo/GeoView",
        "node_modules/echarts/lib/action/geoRoam",
        "node_modules/echarts/lib/coord/geo/GeoModel"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/calendar/Calendar": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/layout",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/CoordinateSystem"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/coord/calendar/CalendarModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/model/Component",
        "node_modules/echarts/lib/util/layout"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/calendar/CalendarView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/label/labelStyle",
        "node_modules/echarts/lib/util/format",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/view/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/calendar": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/coord/calendar/Calendar",
        "node_modules/echarts/lib/coord/calendar/CalendarModel",
        "node_modules/echarts/lib/component/calendar/CalendarView"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/graphic": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/echarts",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/layout",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/model/Component",
        "node_modules/echarts/lib/view/Component",
        "node_modules/echarts/lib/util/innerStore",
        "node_modules/echarts/lib/util/styleCompat"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/toolbox/featureManager": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/toolbox/ToolboxModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/component/toolbox/featureManager",
        "node_modules/echarts/lib/model/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/helper/listComponent": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/layout",
        "node_modules/echarts/lib/util/format",
        "node_modules/echarts/lib/util/graphic"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/toolbox/ToolboxView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/contain/text",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/states",
        "node_modules/echarts/lib/model/Model",
        "node_modules/echarts/lib/data/DataDiffer",
        "node_modules/echarts/lib/component/helper/listComponent",
        "node_modules/echarts/lib/view/Component",
        "node_modules/echarts/lib/component/toolbox/featureManager",
        "node_modules/echarts/lib/util/component",
        "node_modules/zrender/lib/graphic/Text"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/toolbox/feature/SaveAsImage": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/env",
        "node_modules/echarts/lib/component/toolbox/featureManager"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/toolbox/feature/MagicType": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/echarts",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/component/toolbox/featureManager",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/toolbox/feature/DataView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/echarts",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/component/toolbox/featureManager",
        "node_modules/zrender/lib/core/event"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/helper/BrushTargetManager": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/component/helper/brushHelper",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/dataZoom/history": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/dataZoom/typeDefaulter": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/model/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/dataZoom/helper": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/dataZoom/DataZoomModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/model/Component",
        "node_modules/echarts/lib/component/dataZoom/helper",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/dataZoom/DataZoomView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/view/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/dataZoom/SelectZoomModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/component/dataZoom/DataZoomModel",
        "node_modules/echarts/lib/model/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/dataZoom/SelectZoomView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/component/dataZoom/DataZoomView",
        "node_modules/echarts/lib/view/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/dataZoom/AxisProxy": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/component/helper/sliderMove",
        "node_modules/echarts/lib/coord/axisHelper",
        "node_modules/echarts/lib/coord/scaleRawExtentInfo",
        "node_modules/echarts/lib/component/dataZoom/helper",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/dataZoom/dataZoomProcessor": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/component/dataZoom/helper",
        "node_modules/echarts/lib/component/dataZoom/AxisProxy"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/dataZoom/dataZoomAction": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/component/dataZoom/helper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/dataZoomSelect": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/component/dataZoom/typeDefaulter",
        "node_modules/echarts/lib/component/dataZoom/DataZoomModel",
        "node_modules/echarts/lib/component/dataZoom/DataZoomView",
        "node_modules/echarts/lib/component/dataZoom/SelectZoomModel",
        "node_modules/echarts/lib/component/dataZoom/SelectZoomView",
        "node_modules/echarts/lib/component/dataZoom/dataZoomProcessor",
        "node_modules/echarts/lib/component/dataZoom/dataZoomAction"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/toolbox/feature/DataZoom": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/component/helper/BrushController",
        "node_modules/echarts/lib/component/helper/BrushTargetManager",
        "node_modules/echarts/lib/component/dataZoom/history",
        "node_modules/echarts/lib/component/helper/sliderMove",
        "node_modules/echarts/lib/component/dataZoomSelect",
        "node_modules/echarts/lib/component/toolbox/featureManager",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/model/internalComponentCreator"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/toolbox/feature/Restore": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/component/dataZoom/history",
        "node_modules/echarts/lib/component/toolbox/featureManager"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/toolbox": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/component/toolbox/ToolboxModel",
        "node_modules/echarts/lib/component/toolbox/ToolboxView",
        "node_modules/echarts/lib/component/toolbox/feature/SaveAsImage",
        "node_modules/echarts/lib/component/toolbox/feature/MagicType",
        "node_modules/echarts/lib/component/toolbox/feature/DataView",
        "node_modules/echarts/lib/component/toolbox/feature/DataZoom",
        "node_modules/echarts/lib/component/toolbox/feature/Restore"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/tooltip/TooltipModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/model/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/tooltip/helper": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/tooltip/TooltipHTMLContent": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/tool/color",
        "node_modules/zrender/lib/core/event",
        "node_modules/zrender/lib/core/dom",
        "node_modules/zrender/lib/core/env",
        "node_modules/echarts/lib/util/format",
        "node_modules/echarts/lib/component/tooltip/helper",
        "node_modules/echarts/lib/component/tooltip/tooltipMarkup"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/tooltip/TooltipRichContent": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/graphic/Text",
        "node_modules/echarts/lib/component/tooltip/tooltipMarkup",
        "node_modules/echarts/lib/util/log"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/tooltip/TooltipView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/core/env",
        "node_modules/echarts/lib/component/tooltip/TooltipHTMLContent",
        "node_modules/echarts/lib/component/tooltip/TooltipRichContent",
        "node_modules/echarts/lib/util/format",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/component/axisPointer/findPointFromSeries",
        "node_modules/echarts/lib/util/layout",
        "node_modules/echarts/lib/model/Model",
        "node_modules/echarts/lib/component/axisPointer/globalListener",
        "node_modules/echarts/lib/coord/axisHelper",
        "node_modules/echarts/lib/component/axisPointer/viewHelper",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/view/Component",
        "node_modules/echarts/lib/util/time",
        "node_modules/echarts/lib/util/innerStore",
        "node_modules/echarts/lib/component/tooltip/helper",
        "node_modules/echarts/lib/model/mixin/dataFormat",
        "node_modules/echarts/lib/component/tooltip/tooltipMarkup",
        "node_modules/echarts/lib/util/event"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/tooltip": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/component/axisPointer",
        "node_modules/echarts/lib/component/tooltip/TooltipModel",
        "node_modules/echarts/lib/component/tooltip/TooltipView"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/brush/preprocessor": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/visual/visualSolution": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/visual/VisualMapping",
        "node_modules/echarts/lib/visual/helper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/brush/selector": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/contain/polygon",
        "node_modules/zrender/lib/core/BoundingRect",
        "node_modules/echarts/lib/util/graphic"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/brush/visualEncoding": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/core/BoundingRect",
        "node_modules/echarts/lib/visual/visualSolution",
        "node_modules/echarts/lib/component/brush/selector",
        "node_modules/echarts/lib/util/throttle",
        "node_modules/echarts/lib/component/helper/BrushTargetManager"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/brush/BrushModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/visual/visualSolution",
        "node_modules/echarts/lib/model/Model",
        "node_modules/echarts/lib/model/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/brush/BrushView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/component/helper/BrushController",
        "node_modules/echarts/lib/component/brush/visualEncoding",
        "node_modules/echarts/lib/view/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/brush/brushAction": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/toolbox/feature/Brush": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/component/toolbox/featureManager"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/brush": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/component/brush/preprocessor",
        "node_modules/echarts/lib/component/brush/visualEncoding",
        "node_modules/echarts/lib/component/brush/BrushModel",
        "node_modules/echarts/lib/component/brush/BrushView",
        "node_modules/echarts/lib/component/brush/brushAction",
        "node_modules/echarts/lib/component/toolbox/feature/Brush"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/title": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/innerStore",
        "node_modules/echarts/lib/label/labelStyle",
        "node_modules/echarts/lib/util/layout",
        "node_modules/echarts/lib/model/Component",
        "node_modules/echarts/lib/view/Component",
        "node_modules/echarts/lib/util/format"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/timeline/preprocessor": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/timeline/typeDefaulter": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/model/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/timeline/timelineAction": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/timeline/TimelineModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/model/Component",
        "node_modules/echarts/lib/data/List",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/model"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/timeline/SliderTimelineModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/component/timeline/TimelineModel",
        "node_modules/echarts/lib/model/mixin/dataFormat",
        "node_modules/echarts/lib/model/Component",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/timeline/TimelineView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/view/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/timeline/TimelineAxis": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/coord/Axis"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/timeline/SliderTimelineView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/BoundingRect",
        "node_modules/zrender/lib/core/matrix",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/label/labelStyle",
        "node_modules/echarts/lib/util/layout",
        "node_modules/echarts/lib/component/timeline/TimelineView",
        "node_modules/echarts/lib/component/timeline/TimelineAxis",
        "node_modules/echarts/lib/util/symbol",
        "node_modules/echarts/lib/util/number",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/view/Component",
        "node_modules/echarts/lib/scale/Ordinal",
        "node_modules/echarts/lib/scale/Time",
        "node_modules/echarts/lib/scale/Interval",
        "node_modules/zrender/lib/contain/text",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/util/innerStore",
        "node_modules/echarts/lib/util/states",
        "node_modules/echarts/lib/component/tooltip/tooltipMarkup"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/timeline": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/component/timeline/preprocessor",
        "node_modules/echarts/lib/component/timeline/typeDefaulter",
        "node_modules/echarts/lib/component/timeline/timelineAction",
        "node_modules/echarts/lib/component/timeline/SliderTimelineModel",
        "node_modules/echarts/lib/component/timeline/SliderTimelineView"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/marker/MarkerModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/core/env",
        "node_modules/echarts/lib/model/mixin/dataFormat",
        "node_modules/echarts/lib/model/Component",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/component/tooltip/tooltipMarkup"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/marker/MarkPointModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/component/marker/MarkerModel",
        "node_modules/echarts/lib/model/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/marker/markerHelper": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/data/helper/dataStackHelper",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/marker/MarkerView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/view/Component",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/component/marker/MarkerModel",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/util/states"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/marker/MarkPointView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/chart/helper/SymbolDraw",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/data/List",
        "node_modules/echarts/lib/component/marker/markerHelper",
        "node_modules/echarts/lib/component/marker/MarkerView",
        "node_modules/echarts/lib/view/Component",
        "node_modules/echarts/lib/component/marker/MarkerModel",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/innerStore",
        "node_modules/echarts/lib/visual/helper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/markPoint": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/component/marker/MarkPointModel",
        "node_modules/echarts/lib/component/marker/MarkPointView"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/marker/MarkLineModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/component/marker/MarkerModel",
        "node_modules/echarts/lib/model/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/marker/MarkLineView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/data/List",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/component/marker/markerHelper",
        "node_modules/echarts/lib/chart/helper/LineDraw",
        "node_modules/echarts/lib/component/marker/MarkerView",
        "node_modules/echarts/lib/data/helper/dataStackHelper",
        "node_modules/echarts/lib/coord/CoordinateSystem",
        "node_modules/echarts/lib/util/innerStore",
        "node_modules/echarts/lib/component/marker/MarkerModel",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/view/Component",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/visual/helper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/markLine": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/component/marker/MarkLineModel",
        "node_modules/echarts/lib/component/marker/MarkLineView"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/marker/MarkAreaModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/component/marker/MarkerModel",
        "node_modules/echarts/lib/model/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/marker/MarkAreaView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/tool/color",
        "node_modules/echarts/lib/data/List",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/states",
        "node_modules/echarts/lib/component/marker/markerHelper",
        "node_modules/echarts/lib/component/marker/MarkerView",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/coord/CoordinateSystem",
        "node_modules/echarts/lib/view/Component",
        "node_modules/echarts/lib/component/marker/MarkerModel",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/visual/helper",
        "node_modules/echarts/lib/label/labelStyle",
        "node_modules/echarts/lib/util/innerStore"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/markArea": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/component/marker/MarkAreaModel",
        "node_modules/echarts/lib/component/marker/MarkAreaView"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/legend/LegendModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/model/Model",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/model/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/legend/legendAction": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/legend/LegendView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/symbol",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/states",
        "node_modules/echarts/lib/label/labelStyle",
        "node_modules/echarts/lib/component/helper/listComponent",
        "node_modules/echarts/lib/util/layout",
        "node_modules/echarts/lib/view/Component",
        "node_modules/zrender/lib/tool/color"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/legend/legendFilter": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/legend": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/component/legend/LegendModel",
        "node_modules/echarts/lib/component/legend/legendAction",
        "node_modules/echarts/lib/component/legend/LegendView",
        "node_modules/echarts/lib/component/legend/legendFilter",
        "node_modules/echarts/lib/model/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/legend/ScrollableLegendModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/component/legend/LegendModel",
        "node_modules/echarts/lib/util/layout",
        "node_modules/echarts/lib/model/Component",
        "node_modules/echarts/lib/util/component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/legend/ScrollableLegendView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/layout",
        "node_modules/echarts/lib/component/legend/LegendView",
        "node_modules/echarts/lib/view/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/legend/scrollableLegendAction": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/legendScroll": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/component/legend",
        "node_modules/echarts/lib/component/legend/ScrollableLegendModel",
        "node_modules/echarts/lib/component/legend/ScrollableLegendView",
        "node_modules/echarts/lib/component/legend/scrollableLegendAction"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/dataZoom/SliderZoomModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/component/dataZoom/DataZoomModel",
        "node_modules/echarts/lib/model/Component",
        "node_modules/echarts/lib/util/component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/dataZoom/SliderZoomView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/core/event",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/throttle",
        "node_modules/echarts/lib/component/dataZoom/DataZoomView",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/util/layout",
        "node_modules/echarts/lib/component/helper/sliderMove",
        "node_modules/echarts/lib/view/Component",
        "node_modules/echarts/lib/component/dataZoom/helper",
        "node_modules/echarts/lib/util/states",
        "node_modules/echarts/lib/util/symbol",
        "node_modules/echarts/lib/util/log"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/dataZoomSlider": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/component/dataZoom/typeDefaulter",
        "node_modules/echarts/lib/component/dataZoom/DataZoomModel",
        "node_modules/echarts/lib/component/dataZoom/DataZoomView",
        "node_modules/echarts/lib/component/dataZoom/SliderZoomModel",
        "node_modules/echarts/lib/component/dataZoom/SliderZoomView",
        "node_modules/echarts/lib/component/dataZoom/dataZoomProcessor",
        "node_modules/echarts/lib/component/dataZoom/dataZoomAction"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/dataZoom/InsideZoomModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/component/dataZoom/DataZoomModel",
        "node_modules/echarts/lib/model/Component",
        "node_modules/echarts/lib/util/component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/dataZoom/roams": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/component/helper/RoamController",
        "node_modules/echarts/lib/util/throttle",
        "node_modules/echarts/lib/util/model",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/component/dataZoom/helper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/dataZoom/InsideZoomView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/component/dataZoom/DataZoomView",
        "node_modules/echarts/lib/component/helper/sliderMove",
        "node_modules/echarts/lib/component/dataZoom/roams",
        "node_modules/echarts/lib/view/Component",
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/dataZoomInside": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/component/dataZoom/typeDefaulter",
        "node_modules/echarts/lib/component/dataZoom/DataZoomModel",
        "node_modules/echarts/lib/component/dataZoom/DataZoomView",
        "node_modules/echarts/lib/component/dataZoom/InsideZoomModel",
        "node_modules/echarts/lib/component/dataZoom/InsideZoomView",
        "node_modules/echarts/lib/component/dataZoom/dataZoomProcessor",
        "node_modules/echarts/lib/component/dataZoom/dataZoomAction"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/dataZoom": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/component/dataZoomSlider",
        "node_modules/echarts/lib/component/dataZoomInside"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/visualMap/preprocessor": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/visualMap/typeDefaulter": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/model/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/visualMap/visualEncoding": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/visual/visualSolution",
        "node_modules/echarts/lib/visual/VisualMapping",
        "node_modules/echarts/lib/visual/helper"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/visual/visualDefault": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/visualMap/VisualMapModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/core/env",
        "node_modules/echarts/lib/visual/visualDefault",
        "node_modules/echarts/lib/visual/VisualMapping",
        "node_modules/echarts/lib/visual/visualSolution",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/model/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/visualMap/ContinuousModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/component/visualMap/VisualMapModel",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/model/Component",
        "node_modules/echarts/lib/util/component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/visualMap/VisualMapView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/format",
        "node_modules/echarts/lib/util/layout",
        "node_modules/echarts/lib/visual/VisualMapping",
        "node_modules/echarts/lib/view/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/visualMap/helper": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/util/layout"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/visualMap/ContinuousView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/graphic/LinearGradient",
        "node_modules/zrender/lib/core/event",
        "node_modules/echarts/lib/component/visualMap/VisualMapView",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/component/helper/sliderMove",
        "node_modules/echarts/lib/component/visualMap/helper",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/view/Component",
        "node_modules/zrender/lib/contain/text",
        "node_modules/echarts/lib/util/states",
        "node_modules/echarts/lib/util/symbol",
        "node_modules/zrender/lib/graphic/Image",
        "node_modules/echarts/lib/util/innerStore"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/visualMap/visualMapAction": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/visualMapContinuous": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/component/visualMap/preprocessor",
        "node_modules/echarts/lib/component/visualMap/typeDefaulter",
        "node_modules/echarts/lib/component/visualMap/visualEncoding",
        "node_modules/echarts/lib/component/visualMap/ContinuousModel",
        "node_modules/echarts/lib/component/visualMap/ContinuousView",
        "node_modules/echarts/lib/component/visualMap/visualMapAction"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/visualMap/PiecewiseModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/component/visualMap/VisualMapModel",
        "node_modules/echarts/lib/visual/VisualMapping",
        "node_modules/echarts/lib/visual/visualDefault",
        "node_modules/echarts/lib/util/number",
        "node_modules/echarts/lib/model/Component",
        "node_modules/echarts/lib/util/component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/visualMap/PiecewiseView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/component/visualMap/VisualMapView",
        "node_modules/echarts/lib/util/graphic",
        "node_modules/echarts/lib/util/symbol",
        "node_modules/echarts/lib/util/layout",
        "node_modules/echarts/lib/component/visualMap/helper",
        "node_modules/echarts/lib/view/Component"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/visualMapPiecewise": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/component/visualMap/preprocessor",
        "node_modules/echarts/lib/component/visualMap/typeDefaulter",
        "node_modules/echarts/lib/component/visualMap/visualEncoding",
        "node_modules/echarts/lib/component/visualMap/PiecewiseModel",
        "node_modules/echarts/lib/component/visualMap/PiecewiseView",
        "node_modules/echarts/lib/component/visualMap/visualMapAction"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/visualMap": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/component/visualMapContinuous",
        "node_modules/echarts/lib/component/visualMapPiecewise"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/visual/aria": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/echarts/lib/data/helper/dataProvider",
        "node_modules/echarts/lib/util/model",
        "node_modules/echarts/lib/model/mixin/palette"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/aria/preprocessor": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/lib/component/aria": {
      "type": "js",
      "deps": [
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/visual/aria",
        "node_modules/echarts/lib/component/aria/preprocessor"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/svg/core": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/lib/svg/graphic": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/svg/core",
        "node_modules/zrender/lib/contain/text",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/graphic/helper/dashStyle"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/core/arrayDiff": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/zrender/lib/svg/helper/Definable": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/svg/core",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/graphic/Path",
        "node_modules/zrender/lib/graphic/Image",
        "node_modules/zrender/lib/graphic/TSpan",
        "node_modules/zrender/lib/svg/graphic"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/svg/helper/GradientManager": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/svg/helper/Definable",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/tool/color"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/svg/helper/PatternManager": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/svg/helper/Definable",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/core/LRU",
        "node_modules/zrender/lib/graphic/helper/image",
        "node_modules/zrender/lib/core/WeakMap"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/svg/helper/ClippathManager": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/svg/helper/Definable",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/canvas/helper"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/svg/helper/ShadowManager": {
      "type": "js",
      "deps": [
        "node_modules/zrender/node_modules/tslib/tslib",
        "node_modules/zrender/lib/svg/helper/Definable"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/svg/Painter": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/svg/core",
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/graphic/Path",
        "node_modules/zrender/lib/graphic/Image",
        "node_modules/zrender/lib/graphic/TSpan",
        "node_modules/zrender/lib/core/arrayDiff",
        "node_modules/zrender/lib/svg/helper/GradientManager",
        "node_modules/zrender/lib/svg/helper/PatternManager",
        "node_modules/zrender/lib/svg/helper/ClippathManager",
        "node_modules/zrender/lib/svg/helper/ShadowManager",
        "node_modules/zrender/lib/svg/graphic"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/svg/svg": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/svg/graphic",
        "node_modules/zrender/lib/zrender",
        "node_modules/zrender/lib/svg/Painter"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/index": {
      "type": "js",
      "deps": [
        "node_modules/echarts/node_modules/tslib/tslib",
        "node_modules/echarts/lib/echarts",
        "node_modules/echarts/lib/export",
        "node_modules/echarts/lib/component/dataset",
        "node_modules/echarts/lib/component/transform",
        "node_modules/echarts/lib/chart/line",
        "node_modules/echarts/lib/chart/bar",
        "node_modules/echarts/lib/chart/pie",
        "node_modules/echarts/lib/chart/scatter",
        "node_modules/echarts/lib/chart/radar",
        "node_modules/echarts/lib/chart/map",
        "node_modules/echarts/lib/chart/tree",
        "node_modules/echarts/lib/chart/treemap",
        "node_modules/echarts/lib/chart/graph",
        "node_modules/echarts/lib/chart/gauge",
        "node_modules/echarts/lib/chart/funnel",
        "node_modules/echarts/lib/chart/parallel",
        "node_modules/echarts/lib/chart/sankey",
        "node_modules/echarts/lib/chart/boxplot",
        "node_modules/echarts/lib/chart/candlestick",
        "node_modules/echarts/lib/chart/effectScatter",
        "node_modules/echarts/lib/chart/lines",
        "node_modules/echarts/lib/chart/heatmap",
        "node_modules/echarts/lib/chart/pictorialBar",
        "node_modules/echarts/lib/chart/themeRiver",
        "node_modules/echarts/lib/chart/sunburst",
        "node_modules/echarts/lib/chart/custom",
        "node_modules/echarts/lib/component/grid",
        "node_modules/echarts/lib/component/polar",
        "node_modules/echarts/lib/component/geo",
        "node_modules/echarts/lib/component/singleAxis",
        "node_modules/echarts/lib/component/parallel",
        "node_modules/echarts/lib/component/calendar",
        "node_modules/echarts/lib/component/graphic",
        "node_modules/echarts/lib/component/toolbox",
        "node_modules/echarts/lib/component/tooltip",
        "node_modules/echarts/lib/component/axisPointer",
        "node_modules/echarts/lib/component/brush",
        "node_modules/echarts/lib/component/title",
        "node_modules/echarts/lib/component/timeline",
        "node_modules/echarts/lib/component/markPoint",
        "node_modules/echarts/lib/component/markLine",
        "node_modules/echarts/lib/component/markArea",
        "node_modules/echarts/lib/component/legendScroll",
        "node_modules/echarts/lib/component/legend",
        "node_modules/echarts/lib/component/dataZoom",
        "node_modules/echarts/lib/component/dataZoomInside",
        "node_modules/echarts/lib/component/dataZoomSlider",
        "node_modules/echarts/lib/component/visualMap",
        "node_modules/echarts/lib/component/visualMapContinuous",
        "node_modules/echarts/lib/component/visualMapPiecewise",
        "node_modules/echarts/lib/component/aria",
        "node_modules/zrender/lib/svg/svg"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/vml/core": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/env"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/vml/graphic": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/env",
        "node_modules/zrender/lib/core/vector",
        "node_modules/zrender/lib/core/BoundingRect",
        "node_modules/zrender/lib/tool/color",
        "node_modules/zrender/lib/graphic/Displayable",
        "node_modules/zrender/lib/graphic/Image",
        "node_modules/zrender/lib/graphic/TSpan",
        "node_modules/zrender/lib/graphic/Path",
        "node_modules/zrender/lib/core/PathProxy",
        "node_modules/zrender/lib/graphic/Gradient",
        "node_modules/zrender/lib/vml/core"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/vml/Painter": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util",
        "node_modules/zrender/lib/vml/core"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/lib/vml/vml": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/vml/graphic",
        "node_modules/zrender/lib/zrender",
        "node_modules/zrender/lib/vml/Painter"
      ],
      "pkg": "p0"
    },
    "node_modules/zrender/index": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/zrender",
        "node_modules/zrender/lib/export",
        "node_modules/zrender/lib/svg/svg",
        "node_modules/zrender/lib/vml/vml"
      ],
      "pkg": "p0"
    },
    "node_modules/sortablejs/Sortable": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/noop": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/async/internal/once": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_freeGlobal": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_root": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_freeGlobal"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_Symbol": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_root"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_getRawTag": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_Symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_objectToString": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_baseGetTag": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_Symbol",
        "node_modules/lodash/_getRawTag",
        "node_modules/lodash/_objectToString"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/isObject": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/isFunction": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseGetTag",
        "node_modules/lodash/isObject"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/isLength": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/isArrayLike": {
      "type": "js",
      "deps": [
        "node_modules/lodash/isFunction",
        "node_modules/lodash/isLength"
      ],
      "pkg": "p0"
    },
    "node_modules/async/internal/getIterator": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_baseTimes": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/isObjectLike": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_baseIsArguments": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseGetTag",
        "node_modules/lodash/isObjectLike"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/isArguments": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseIsArguments",
        "node_modules/lodash/isObjectLike"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/isArray": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/stubFalse": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/isBuffer": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_root",
        "node_modules/lodash/stubFalse"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_isIndex": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_baseIsTypedArray": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseGetTag",
        "node_modules/lodash/isLength",
        "node_modules/lodash/isObjectLike"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseUnary": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_apply": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/identity": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_overRest": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_apply"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/constant": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_coreJsData": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_root"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_isMasked": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_coreJsData"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_toSource": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_baseIsNative": {
      "type": "js",
      "deps": [
        "node_modules/lodash/isFunction",
        "node_modules/lodash/_isMasked",
        "node_modules/lodash/isObject",
        "node_modules/lodash/_toSource"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_getValue": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_getNative": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseIsNative",
        "node_modules/lodash/_getValue"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_defineProperty": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_getNative"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseSetToString": {
      "type": "js",
      "deps": [
        "node_modules/lodash/constant",
        "node_modules/lodash/_defineProperty",
        "node_modules/lodash/identity"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_shortOut": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_setToString": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseSetToString",
        "node_modules/lodash/_shortOut"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseRest": {
      "type": "js",
      "deps": [
        "node_modules/lodash/identity",
        "node_modules/lodash/_overRest",
        "node_modules/lodash/_setToString"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_overArg": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_getPrototype": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_overArg"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/isPlainObject": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseGetTag",
        "node_modules/lodash/_getPrototype",
        "node_modules/lodash/isObjectLike"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/isError": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseGetTag",
        "node_modules/lodash/isObjectLike",
        "node_modules/lodash/isPlainObject"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/attempt": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_apply",
        "node_modules/lodash/_baseRest",
        "node_modules/lodash/isError"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_arrayEach": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_baseAssignValue": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_defineProperty"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_WeakMap": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_getNative",
        "node_modules/lodash/_root"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_metaMap": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_WeakMap"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseSetData": {
      "type": "js",
      "deps": [
        "node_modules/lodash/identity",
        "node_modules/lodash/_metaMap"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseCreate": {
      "type": "js",
      "deps": [
        "node_modules/lodash/isObject"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_createCtor": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseCreate",
        "node_modules/lodash/isObject"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_createBind": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_createCtor",
        "node_modules/lodash/_root"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_composeArgs": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_composeArgsRight": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_countHolders": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_baseLodash": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_LazyWrapper": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseCreate",
        "node_modules/lodash/_baseLodash"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_getData": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_metaMap",
        "node_modules/lodash/noop"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_realNames": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_getFuncName": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_realNames"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_LodashWrapper": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseCreate",
        "node_modules/lodash/_baseLodash"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_copyArray": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_wrapperClone": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_LazyWrapper",
        "node_modules/lodash/_LodashWrapper",
        "node_modules/lodash/_copyArray"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/wrapperLodash": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_LazyWrapper",
        "node_modules/lodash/_LodashWrapper",
        "node_modules/lodash/_baseLodash",
        "node_modules/lodash/isArray",
        "node_modules/lodash/isObjectLike",
        "node_modules/lodash/_wrapperClone"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_isLaziable": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_LazyWrapper",
        "node_modules/lodash/_getData",
        "node_modules/lodash/_getFuncName",
        "node_modules/lodash/wrapperLodash"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_setData": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseSetData",
        "node_modules/lodash/_shortOut"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_getWrapDetails": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_insertWrapDetails": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_baseFindIndex": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_baseIsNaN": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_strictIndexOf": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_baseIndexOf": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseFindIndex",
        "node_modules/lodash/_baseIsNaN",
        "node_modules/lodash/_strictIndexOf"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_arrayIncludes": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseIndexOf"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_updateWrapDetails": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_arrayEach",
        "node_modules/lodash/_arrayIncludes"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_setWrapToString": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_getWrapDetails",
        "node_modules/lodash/_insertWrapDetails",
        "node_modules/lodash/_setToString",
        "node_modules/lodash/_updateWrapDetails"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_createRecurry": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_isLaziable",
        "node_modules/lodash/_setData",
        "node_modules/lodash/_setWrapToString"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_getHolder": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_reorder": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_copyArray",
        "node_modules/lodash/_isIndex"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_replaceHolders": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_createHybrid": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_composeArgs",
        "node_modules/lodash/_composeArgsRight",
        "node_modules/lodash/_countHolders",
        "node_modules/lodash/_createCtor",
        "node_modules/lodash/_createRecurry",
        "node_modules/lodash/_getHolder",
        "node_modules/lodash/_reorder",
        "node_modules/lodash/_replaceHolders",
        "node_modules/lodash/_root"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_createCurry": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_apply",
        "node_modules/lodash/_createCtor",
        "node_modules/lodash/_createHybrid",
        "node_modules/lodash/_createRecurry",
        "node_modules/lodash/_getHolder",
        "node_modules/lodash/_replaceHolders",
        "node_modules/lodash/_root"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_createPartial": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_apply",
        "node_modules/lodash/_createCtor",
        "node_modules/lodash/_root"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_mergeData": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_composeArgs",
        "node_modules/lodash/_composeArgsRight",
        "node_modules/lodash/_replaceHolders"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_trimmedEndIndex": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_baseTrim": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_trimmedEndIndex"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/isSymbol": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseGetTag",
        "node_modules/lodash/isObjectLike"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/toNumber": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseTrim",
        "node_modules/lodash/isObject",
        "node_modules/lodash/isSymbol"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/toFinite": {
      "type": "js",
      "deps": [
        "node_modules/lodash/toNumber"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/toInteger": {
      "type": "js",
      "deps": [
        "node_modules/lodash/toFinite"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_createWrap": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseSetData",
        "node_modules/lodash/_createBind",
        "node_modules/lodash/_createCurry",
        "node_modules/lodash/_createHybrid",
        "node_modules/lodash/_createPartial",
        "node_modules/lodash/_getData",
        "node_modules/lodash/_mergeData",
        "node_modules/lodash/_setData",
        "node_modules/lodash/_setWrapToString",
        "node_modules/lodash/toInteger"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/bind": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseRest",
        "node_modules/lodash/_createWrap",
        "node_modules/lodash/_getHolder",
        "node_modules/lodash/_replaceHolders"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_arrayPush": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_isFlattenable": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_Symbol",
        "node_modules/lodash/isArguments",
        "node_modules/lodash/isArray"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseFlatten": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_arrayPush",
        "node_modules/lodash/_isFlattenable"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/flatten": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseFlatten"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_flatRest": {
      "type": "js",
      "deps": [
        "node_modules/lodash/flatten",
        "node_modules/lodash/_overRest",
        "node_modules/lodash/_setToString"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_toKey": {
      "type": "js",
      "deps": [
        "node_modules/lodash/isSymbol"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/bindAll": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_arrayEach",
        "node_modules/lodash/_baseAssignValue",
        "node_modules/lodash/bind",
        "node_modules/lodash/_flatRest",
        "node_modules/lodash/_toKey"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_arrayMap": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_listCacheClear": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/eq": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_assocIndexOf": {
      "type": "js",
      "deps": [
        "node_modules/lodash/eq"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_listCacheDelete": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_assocIndexOf"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_listCacheGet": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_assocIndexOf"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_listCacheHas": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_assocIndexOf"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_listCacheSet": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_assocIndexOf"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_ListCache": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_listCacheClear",
        "node_modules/lodash/_listCacheDelete",
        "node_modules/lodash/_listCacheGet",
        "node_modules/lodash/_listCacheHas",
        "node_modules/lodash/_listCacheSet"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_stackClear": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_ListCache"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_stackDelete": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_stackGet": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_stackHas": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_Map": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_getNative",
        "node_modules/lodash/_root"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_nativeCreate": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_getNative"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_hashClear": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_nativeCreate"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_hashDelete": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_hashGet": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_nativeCreate"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_hashHas": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_nativeCreate"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_hashSet": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_nativeCreate"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_Hash": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_hashClear",
        "node_modules/lodash/_hashDelete",
        "node_modules/lodash/_hashGet",
        "node_modules/lodash/_hashHas",
        "node_modules/lodash/_hashSet"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_mapCacheClear": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_Hash",
        "node_modules/lodash/_ListCache",
        "node_modules/lodash/_Map"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_isKeyable": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_getMapData": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_isKeyable"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_mapCacheDelete": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_getMapData"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_mapCacheGet": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_getMapData"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_mapCacheHas": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_getMapData"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_mapCacheSet": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_getMapData"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_MapCache": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_mapCacheClear",
        "node_modules/lodash/_mapCacheDelete",
        "node_modules/lodash/_mapCacheGet",
        "node_modules/lodash/_mapCacheHas",
        "node_modules/lodash/_mapCacheSet"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_stackSet": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_ListCache",
        "node_modules/lodash/_Map",
        "node_modules/lodash/_MapCache"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_Stack": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_ListCache",
        "node_modules/lodash/_stackClear",
        "node_modules/lodash/_stackDelete",
        "node_modules/lodash/_stackGet",
        "node_modules/lodash/_stackHas",
        "node_modules/lodash/_stackSet"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_setCacheAdd": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_setCacheHas": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_SetCache": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_MapCache",
        "node_modules/lodash/_setCacheAdd",
        "node_modules/lodash/_setCacheHas"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_arraySome": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_cacheHas": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_equalArrays": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_SetCache",
        "node_modules/lodash/_arraySome",
        "node_modules/lodash/_cacheHas"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_Uint8Array": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_root"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_mapToArray": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_setToArray": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_equalByTag": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_Symbol",
        "node_modules/lodash/_Uint8Array",
        "node_modules/lodash/eq",
        "node_modules/lodash/_equalArrays",
        "node_modules/lodash/_mapToArray",
        "node_modules/lodash/_setToArray"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseGetAllKeys": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_arrayPush",
        "node_modules/lodash/isArray"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_arrayFilter": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/stubArray": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_getSymbols": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_arrayFilter",
        "node_modules/lodash/stubArray"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_getAllKeys": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseGetAllKeys",
        "node_modules/lodash/_getSymbols",
        "node_modules/lodash/keys"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_equalObjects": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_getAllKeys"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_DataView": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_getNative",
        "node_modules/lodash/_root"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_Promise": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_getNative",
        "node_modules/lodash/_root"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_Set": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_getNative",
        "node_modules/lodash/_root"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_getTag": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_DataView",
        "node_modules/lodash/_Map",
        "node_modules/lodash/_Promise",
        "node_modules/lodash/_Set",
        "node_modules/lodash/_WeakMap",
        "node_modules/lodash/_baseGetTag",
        "node_modules/lodash/_toSource"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseIsEqualDeep": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_Stack",
        "node_modules/lodash/_equalArrays",
        "node_modules/lodash/_equalByTag",
        "node_modules/lodash/_equalObjects",
        "node_modules/lodash/_getTag",
        "node_modules/lodash/isArray",
        "node_modules/lodash/isBuffer",
        "node_modules/lodash/isTypedArray"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseIsEqual": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseIsEqualDeep",
        "node_modules/lodash/isObjectLike"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseIsMatch": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_Stack",
        "node_modules/lodash/_baseIsEqual"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_isStrictComparable": {
      "type": "js",
      "deps": [
        "node_modules/lodash/isObject"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_getMatchData": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_isStrictComparable",
        "node_modules/lodash/keys"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_matchesStrictComparable": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_baseMatches": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseIsMatch",
        "node_modules/lodash/_getMatchData",
        "node_modules/lodash/_matchesStrictComparable"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_isKey": {
      "type": "js",
      "deps": [
        "node_modules/lodash/isArray",
        "node_modules/lodash/isSymbol"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/memoize": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_MapCache"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_memoizeCapped": {
      "type": "js",
      "deps": [
        "node_modules/lodash/memoize"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_stringToPath": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_memoizeCapped"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseToString": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_Symbol",
        "node_modules/lodash/_arrayMap",
        "node_modules/lodash/isArray",
        "node_modules/lodash/isSymbol"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/toString": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseToString"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_castPath": {
      "type": "js",
      "deps": [
        "node_modules/lodash/isArray",
        "node_modules/lodash/_isKey",
        "node_modules/lodash/_stringToPath",
        "node_modules/lodash/toString"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseGet": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_castPath",
        "node_modules/lodash/_toKey"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/get": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseGet"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseHasIn": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_hasPath": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_castPath",
        "node_modules/lodash/isArguments",
        "node_modules/lodash/isArray",
        "node_modules/lodash/_isIndex",
        "node_modules/lodash/isLength",
        "node_modules/lodash/_toKey"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/hasIn": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseHasIn",
        "node_modules/lodash/_hasPath"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseMatchesProperty": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseIsEqual",
        "node_modules/lodash/get",
        "node_modules/lodash/hasIn",
        "node_modules/lodash/_isKey",
        "node_modules/lodash/_isStrictComparable",
        "node_modules/lodash/_matchesStrictComparable",
        "node_modules/lodash/_toKey"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseProperty": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_basePropertyDeep": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseGet"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/property": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseProperty",
        "node_modules/lodash/_basePropertyDeep",
        "node_modules/lodash/_isKey",
        "node_modules/lodash/_toKey"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseIteratee": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseMatches",
        "node_modules/lodash/_baseMatchesProperty",
        "node_modules/lodash/identity",
        "node_modules/lodash/isArray",
        "node_modules/lodash/property"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/cond": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_apply",
        "node_modules/lodash/_arrayMap",
        "node_modules/lodash/_baseIteratee",
        "node_modules/lodash/_baseRest"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_assignValue": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseAssignValue",
        "node_modules/lodash/eq"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_copyObject": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_assignValue",
        "node_modules/lodash/_baseAssignValue"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseAssign": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_copyObject",
        "node_modules/lodash/keys"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_isPrototype": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_nativeKeysIn": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_baseKeysIn": {
      "type": "js",
      "deps": [
        "node_modules/lodash/isObject",
        "node_modules/lodash/_isPrototype",
        "node_modules/lodash/_nativeKeysIn"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/keysIn": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_arrayLikeKeys",
        "node_modules/lodash/_baseKeysIn",
        "node_modules/lodash/isArrayLike"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseAssignIn": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_copyObject",
        "node_modules/lodash/keysIn"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_cloneBuffer": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_root"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_copySymbols": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_copyObject",
        "node_modules/lodash/_getSymbols"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_getSymbolsIn": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_arrayPush",
        "node_modules/lodash/_getPrototype",
        "node_modules/lodash/_getSymbols",
        "node_modules/lodash/stubArray"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_copySymbolsIn": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_copyObject",
        "node_modules/lodash/_getSymbolsIn"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_getAllKeysIn": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseGetAllKeys",
        "node_modules/lodash/_getSymbolsIn",
        "node_modules/lodash/keysIn"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_initCloneArray": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_cloneArrayBuffer": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_Uint8Array"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_cloneDataView": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_cloneArrayBuffer"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_cloneRegExp": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_cloneSymbol": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_Symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_cloneTypedArray": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_cloneArrayBuffer"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_initCloneByTag": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_cloneArrayBuffer",
        "node_modules/lodash/_cloneDataView",
        "node_modules/lodash/_cloneRegExp",
        "node_modules/lodash/_cloneSymbol",
        "node_modules/lodash/_cloneTypedArray"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_initCloneObject": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseCreate",
        "node_modules/lodash/_getPrototype",
        "node_modules/lodash/_isPrototype"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseIsMap": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_getTag",
        "node_modules/lodash/isObjectLike"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/isMap": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseIsMap",
        "node_modules/lodash/_baseUnary",
        "node_modules/lodash/_nodeUtil"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseIsSet": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_getTag",
        "node_modules/lodash/isObjectLike"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/isSet": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseIsSet",
        "node_modules/lodash/_baseUnary",
        "node_modules/lodash/_nodeUtil"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseClone": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_Stack",
        "node_modules/lodash/_arrayEach",
        "node_modules/lodash/_assignValue",
        "node_modules/lodash/_baseAssign",
        "node_modules/lodash/_baseAssignIn",
        "node_modules/lodash/_cloneBuffer",
        "node_modules/lodash/_copyArray",
        "node_modules/lodash/_copySymbols",
        "node_modules/lodash/_copySymbolsIn",
        "node_modules/lodash/_getAllKeys",
        "node_modules/lodash/_getAllKeysIn",
        "node_modules/lodash/_getTag",
        "node_modules/lodash/_initCloneArray",
        "node_modules/lodash/_initCloneByTag",
        "node_modules/lodash/_initCloneObject",
        "node_modules/lodash/isArray",
        "node_modules/lodash/isBuffer",
        "node_modules/lodash/isMap",
        "node_modules/lodash/isObject",
        "node_modules/lodash/isSet",
        "node_modules/lodash/keys",
        "node_modules/lodash/keysIn"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseConformsTo": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_baseConforms": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseConformsTo",
        "node_modules/lodash/keys"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/conforms": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseClone",
        "node_modules/lodash/_baseConforms"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/defaultTo": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_createFlow": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_LodashWrapper",
        "node_modules/lodash/_flatRest",
        "node_modules/lodash/_getData",
        "node_modules/lodash/_getFuncName",
        "node_modules/lodash/isArray",
        "node_modules/lodash/_isLaziable"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/flow": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_createFlow"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/flowRight": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_createFlow"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/iteratee": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseClone",
        "node_modules/lodash/_baseIteratee"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/matches": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseClone",
        "node_modules/lodash/_baseMatches"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/matchesProperty": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseClone",
        "node_modules/lodash/_baseMatchesProperty"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/last": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_baseSlice": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_parent": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseGet",
        "node_modules/lodash/_baseSlice"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseInvoke": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_apply",
        "node_modules/lodash/_castPath",
        "node_modules/lodash/last",
        "node_modules/lodash/_parent",
        "node_modules/lodash/_toKey"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/method": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseInvoke",
        "node_modules/lodash/_baseRest"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/methodOf": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseInvoke",
        "node_modules/lodash/_baseRest"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseFunctions": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_arrayFilter",
        "node_modules/lodash/isFunction"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/mixin": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_arrayEach",
        "node_modules/lodash/_arrayPush",
        "node_modules/lodash/_baseFunctions",
        "node_modules/lodash/_copyArray",
        "node_modules/lodash/isFunction",
        "node_modules/lodash/isObject",
        "node_modules/lodash/keys"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseNth": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_isIndex"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/nthArg": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseNth",
        "node_modules/lodash/_baseRest",
        "node_modules/lodash/toInteger"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_createOver": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_apply",
        "node_modules/lodash/_arrayMap",
        "node_modules/lodash/_baseIteratee",
        "node_modules/lodash/_baseRest",
        "node_modules/lodash/_baseUnary",
        "node_modules/lodash/_flatRest"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/over": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_arrayMap",
        "node_modules/lodash/_createOver"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_arrayEvery": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/overEvery": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_arrayEvery",
        "node_modules/lodash/_createOver"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/overSome": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_arraySome",
        "node_modules/lodash/_createOver"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/propertyOf": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseGet"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseRange": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_isIterateeCall": {
      "type": "js",
      "deps": [
        "node_modules/lodash/eq",
        "node_modules/lodash/isArrayLike",
        "node_modules/lodash/_isIndex",
        "node_modules/lodash/isObject"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_createRange": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseRange",
        "node_modules/lodash/_isIterateeCall",
        "node_modules/lodash/toFinite"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/range": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_createRange"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/rangeRight": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_createRange"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/stubObject": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/stubString": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/stubTrue": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_castFunction": {
      "type": "js",
      "deps": [
        "node_modules/lodash/identity"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/times": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseTimes",
        "node_modules/lodash/_castFunction",
        "node_modules/lodash/toInteger"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/toPath": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_arrayMap",
        "node_modules/lodash/_copyArray",
        "node_modules/lodash/isArray",
        "node_modules/lodash/isSymbol",
        "node_modules/lodash/_stringToPath",
        "node_modules/lodash/_toKey",
        "node_modules/lodash/toString"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/uniqueId": {
      "type": "js",
      "deps": [
        "node_modules/lodash/toString"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/util": {
      "type": "js",
      "deps": [
        "node_modules/lodash/attempt",
        "node_modules/lodash/bindAll",
        "node_modules/lodash/cond",
        "node_modules/lodash/conforms",
        "node_modules/lodash/constant",
        "node_modules/lodash/defaultTo",
        "node_modules/lodash/flow",
        "node_modules/lodash/flowRight",
        "node_modules/lodash/identity",
        "node_modules/lodash/iteratee",
        "node_modules/lodash/matches",
        "node_modules/lodash/matchesProperty",
        "node_modules/lodash/method",
        "node_modules/lodash/methodOf",
        "node_modules/lodash/mixin",
        "node_modules/lodash/noop",
        "node_modules/lodash/nthArg",
        "node_modules/lodash/over",
        "node_modules/lodash/overEvery",
        "node_modules/lodash/overSome",
        "node_modules/lodash/property",
        "node_modules/lodash/propertyOf",
        "node_modules/lodash/range",
        "node_modules/lodash/rangeRight",
        "node_modules/lodash/stubArray",
        "node_modules/lodash/stubFalse",
        "node_modules/lodash/stubObject",
        "node_modules/lodash/stubString",
        "node_modules/lodash/stubTrue",
        "node_modules/lodash/times",
        "node_modules/lodash/toPath",
        "node_modules/lodash/uniqueId"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_nodeUtil": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_freeGlobal",
        "node_modules/lodash/util"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/isTypedArray": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseIsTypedArray",
        "node_modules/lodash/_baseUnary",
        "node_modules/lodash/_nodeUtil"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_arrayLikeKeys": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseTimes",
        "node_modules/lodash/isArguments",
        "node_modules/lodash/isArray",
        "node_modules/lodash/isBuffer",
        "node_modules/lodash/_isIndex",
        "node_modules/lodash/isTypedArray"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_nativeKeys": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_overArg"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseKeys": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_isPrototype",
        "node_modules/lodash/_nativeKeys"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/keys": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_arrayLikeKeys",
        "node_modules/lodash/_baseKeys",
        "node_modules/lodash/isArrayLike"
      ],
      "pkg": "p0"
    },
    "node_modules/async/internal/iterator": {
      "type": "js",
      "deps": [
        "node_modules/lodash/isArrayLike",
        "node_modules/async/internal/getIterator",
        "node_modules/lodash/keys"
      ],
      "pkg": "p0"
    },
    "node_modules/async/internal/onlyOnce": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/async/internal/breakLoop": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/async/internal/eachOfLimit": {
      "type": "js",
      "deps": [
        "node_modules/lodash/noop",
        "node_modules/async/internal/once",
        "node_modules/async/internal/iterator",
        "node_modules/async/internal/onlyOnce",
        "node_modules/async/internal/breakLoop"
      ],
      "pkg": "p0"
    },
    "node_modules/async/internal/slice": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/async/internal/initialParams": {
      "type": "js",
      "deps": [
        "node_modules/async/internal/slice"
      ],
      "pkg": "p0"
    },
    "node_modules/async/internal/setImmediate": {
      "type": "js",
      "deps": [
        "node_modules/async/internal/slice"
      ],
      "pkg": "p0"
    },
    "node_modules/async/asyncify": {
      "type": "js",
      "deps": [
        "node_modules/lodash/isObject",
        "node_modules/async/internal/initialParams",
        "node_modules/async/internal/setImmediate"
      ],
      "pkg": "p0"
    },
    "node_modules/async/internal/wrapAsync": {
      "type": "js",
      "deps": [
        "node_modules/async/asyncify"
      ],
      "pkg": "p0"
    },
    "node_modules/async/internal/doParallelLimit": {
      "type": "js",
      "deps": [
        "node_modules/async/internal/eachOfLimit",
        "node_modules/async/internal/wrapAsync"
      ],
      "pkg": "p0"
    },
    "node_modules/async/internal/map": {
      "type": "js",
      "deps": [
        "node_modules/lodash/noop",
        "node_modules/async/internal/wrapAsync"
      ],
      "pkg": "p0"
    },
    "node_modules/async/mapLimit": {
      "type": "js",
      "deps": [
        "node_modules/async/internal/doParallelLimit",
        "node_modules/async/internal/map"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/global": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/core-js/internals/fails": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/core-js/internals/descriptors": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/fails"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/object-property-is-enumerable": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/core-js/internals/create-property-descriptor": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/core-js/internals/classof-raw": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/core-js/internals/indexed-object": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/fails",
        "node_modules/core-js/internals/classof-raw"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/require-object-coercible": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/core-js/internals/to-indexed-object": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/indexed-object",
        "node_modules/core-js/internals/require-object-coercible"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/is-object": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/core-js/internals/to-primitive": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/is-object"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/has": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/core-js/internals/document-create-element": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/global",
        "node_modules/core-js/internals/is-object"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/ie8-dom-define": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/descriptors",
        "node_modules/core-js/internals/fails",
        "node_modules/core-js/internals/document-create-element"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/object-get-own-property-descriptor": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/descriptors",
        "node_modules/core-js/internals/object-property-is-enumerable",
        "node_modules/core-js/internals/create-property-descriptor",
        "node_modules/core-js/internals/to-indexed-object",
        "node_modules/core-js/internals/to-primitive",
        "node_modules/core-js/internals/has",
        "node_modules/core-js/internals/ie8-dom-define"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/an-object": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/is-object"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/object-define-property": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/descriptors",
        "node_modules/core-js/internals/ie8-dom-define",
        "node_modules/core-js/internals/an-object",
        "node_modules/core-js/internals/to-primitive"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/create-non-enumerable-property": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/descriptors",
        "node_modules/core-js/internals/object-define-property",
        "node_modules/core-js/internals/create-property-descriptor"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/set-global": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/global",
        "node_modules/core-js/internals/create-non-enumerable-property"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/shared-store": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/global",
        "node_modules/core-js/internals/set-global"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/inspect-source": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/shared-store"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/native-weak-map": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/global",
        "node_modules/core-js/internals/inspect-source"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/is-pure": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/core-js/internals/shared": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/is-pure",
        "node_modules/core-js/internals/shared-store"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/uid": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/core-js/internals/shared-key": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/shared",
        "node_modules/core-js/internals/uid"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/hidden-keys": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/core-js/internals/internal-state": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/native-weak-map",
        "node_modules/core-js/internals/global",
        "node_modules/core-js/internals/is-object",
        "node_modules/core-js/internals/create-non-enumerable-property",
        "node_modules/core-js/internals/has",
        "node_modules/core-js/internals/shared-store",
        "node_modules/core-js/internals/shared-key",
        "node_modules/core-js/internals/hidden-keys"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/redefine": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/global",
        "node_modules/core-js/internals/create-non-enumerable-property",
        "node_modules/core-js/internals/has",
        "node_modules/core-js/internals/set-global",
        "node_modules/core-js/internals/inspect-source",
        "node_modules/core-js/internals/internal-state"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/path": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/global"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/get-built-in": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/path",
        "node_modules/core-js/internals/global"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/to-integer": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/core-js/internals/to-length": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/to-integer"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/to-absolute-index": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/to-integer"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/array-includes": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/to-indexed-object",
        "node_modules/core-js/internals/to-length",
        "node_modules/core-js/internals/to-absolute-index"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/object-keys-internal": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/has",
        "node_modules/core-js/internals/to-indexed-object",
        "node_modules/core-js/internals/array-includes",
        "node_modules/core-js/internals/hidden-keys"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/enum-bug-keys": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/core-js/internals/object-get-own-property-names": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/object-keys-internal",
        "node_modules/core-js/internals/enum-bug-keys"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/object-get-own-property-symbols": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/core-js/internals/own-keys": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/get-built-in",
        "node_modules/core-js/internals/object-get-own-property-names",
        "node_modules/core-js/internals/object-get-own-property-symbols",
        "node_modules/core-js/internals/an-object"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/copy-constructor-properties": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/has",
        "node_modules/core-js/internals/own-keys",
        "node_modules/core-js/internals/object-get-own-property-descriptor",
        "node_modules/core-js/internals/object-define-property"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/is-forced": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/fails"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/export": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/global",
        "node_modules/core-js/internals/object-get-own-property-descriptor",
        "node_modules/core-js/internals/create-non-enumerable-property",
        "node_modules/core-js/internals/redefine",
        "node_modules/core-js/internals/set-global",
        "node_modules/core-js/internals/copy-constructor-properties",
        "node_modules/core-js/internals/is-forced"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/a-function": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/core-js/internals/function-bind-context": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/a-function"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/to-object": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/require-object-coercible"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/is-array": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/classof-raw"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/engine-is-node": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/classof-raw",
        "node_modules/core-js/internals/global"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/engine-user-agent": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/get-built-in"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/engine-v8-version": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/global",
        "node_modules/core-js/internals/engine-user-agent"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/native-symbol": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/engine-is-node",
        "node_modules/core-js/internals/engine-v8-version",
        "node_modules/core-js/internals/fails"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/use-symbol-as-uid": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/native-symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/well-known-symbol": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/global",
        "node_modules/core-js/internals/shared",
        "node_modules/core-js/internals/has",
        "node_modules/core-js/internals/uid",
        "node_modules/core-js/internals/native-symbol",
        "node_modules/core-js/internals/use-symbol-as-uid"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/array-species-create": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/is-object",
        "node_modules/core-js/internals/is-array",
        "node_modules/core-js/internals/well-known-symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/array-iteration": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/function-bind-context",
        "node_modules/core-js/internals/indexed-object",
        "node_modules/core-js/internals/to-object",
        "node_modules/core-js/internals/to-length",
        "node_modules/core-js/internals/array-species-create"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/object-keys": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/object-keys-internal",
        "node_modules/core-js/internals/enum-bug-keys"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/object-define-properties": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/descriptors",
        "node_modules/core-js/internals/object-define-property",
        "node_modules/core-js/internals/an-object",
        "node_modules/core-js/internals/object-keys"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/html": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/get-built-in"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/object-create": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/an-object",
        "node_modules/core-js/internals/object-define-properties",
        "node_modules/core-js/internals/enum-bug-keys",
        "node_modules/core-js/internals/hidden-keys",
        "node_modules/core-js/internals/html",
        "node_modules/core-js/internals/document-create-element",
        "node_modules/core-js/internals/shared-key"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/add-to-unscopables": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/well-known-symbol",
        "node_modules/core-js/internals/object-create",
        "node_modules/core-js/internals/object-define-property"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.array.find": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/export",
        "node_modules/core-js/internals/array-iteration",
        "node_modules/core-js/internals/add-to-unscopables"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/entry-unbind": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/global",
        "node_modules/core-js/internals/function-bind-context"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/es/array/find": {
      "type": "js",
      "deps": [
        "node_modules/core-js/modules/es.array.find",
        "node_modules/core-js/internals/entry-unbind"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/string-multibyte": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/to-integer",
        "node_modules/core-js/internals/require-object-coercible"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/correct-prototype-getter": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/fails"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/object-get-prototype-of": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/has",
        "node_modules/core-js/internals/to-object",
        "node_modules/core-js/internals/shared-key",
        "node_modules/core-js/internals/correct-prototype-getter"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/iterators-core": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/fails",
        "node_modules/core-js/internals/object-get-prototype-of",
        "node_modules/core-js/internals/create-non-enumerable-property",
        "node_modules/core-js/internals/has",
        "node_modules/core-js/internals/well-known-symbol",
        "node_modules/core-js/internals/is-pure"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/set-to-string-tag": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/object-define-property",
        "node_modules/core-js/internals/has",
        "node_modules/core-js/internals/well-known-symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/iterators": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/core-js/internals/create-iterator-constructor": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/iterators-core",
        "node_modules/core-js/internals/object-create",
        "node_modules/core-js/internals/create-property-descriptor",
        "node_modules/core-js/internals/set-to-string-tag",
        "node_modules/core-js/internals/iterators"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/a-possible-prototype": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/is-object"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/object-set-prototype-of": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/an-object",
        "node_modules/core-js/internals/a-possible-prototype"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/define-iterator": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/export",
        "node_modules/core-js/internals/create-iterator-constructor",
        "node_modules/core-js/internals/object-get-prototype-of",
        "node_modules/core-js/internals/object-set-prototype-of",
        "node_modules/core-js/internals/set-to-string-tag",
        "node_modules/core-js/internals/create-non-enumerable-property",
        "node_modules/core-js/internals/redefine",
        "node_modules/core-js/internals/well-known-symbol",
        "node_modules/core-js/internals/is-pure",
        "node_modules/core-js/internals/iterators",
        "node_modules/core-js/internals/iterators-core"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.string.iterator": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/string-multibyte",
        "node_modules/core-js/internals/internal-state",
        "node_modules/core-js/internals/define-iterator"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/iterator-close": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/an-object"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/call-with-safe-iteration-closing": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/an-object",
        "node_modules/core-js/internals/iterator-close"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/is-array-iterator-method": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/well-known-symbol",
        "node_modules/core-js/internals/iterators"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/create-property": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/to-primitive",
        "node_modules/core-js/internals/object-define-property",
        "node_modules/core-js/internals/create-property-descriptor"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/to-string-tag-support": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/well-known-symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/classof": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/to-string-tag-support",
        "node_modules/core-js/internals/classof-raw",
        "node_modules/core-js/internals/well-known-symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/get-iterator-method": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/classof",
        "node_modules/core-js/internals/iterators",
        "node_modules/core-js/internals/well-known-symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/array-from": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/function-bind-context",
        "node_modules/core-js/internals/to-object",
        "node_modules/core-js/internals/call-with-safe-iteration-closing",
        "node_modules/core-js/internals/is-array-iterator-method",
        "node_modules/core-js/internals/to-length",
        "node_modules/core-js/internals/create-property",
        "node_modules/core-js/internals/get-iterator-method"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/check-correctness-of-iteration": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/well-known-symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.array.from": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/export",
        "node_modules/core-js/internals/array-from",
        "node_modules/core-js/internals/check-correctness-of-iteration"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/es/array/from": {
      "type": "js",
      "deps": [
        "node_modules/core-js/modules/es.string.iterator",
        "node_modules/core-js/modules/es.array.from",
        "node_modules/core-js/internals/path"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.array.includes": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/export",
        "node_modules/core-js/internals/array-includes",
        "node_modules/core-js/internals/add-to-unscopables"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/es/array/includes": {
      "type": "js",
      "deps": [
        "node_modules/core-js/modules/es.array.includes",
        "node_modules/core-js/internals/entry-unbind"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.array.find-index": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/export",
        "node_modules/core-js/internals/array-iteration",
        "node_modules/core-js/internals/add-to-unscopables"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/es/array/find-index": {
      "type": "js",
      "deps": [
        "node_modules/core-js/modules/es.array.find-index",
        "node_modules/core-js/internals/entry-unbind"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/is-regexp": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/is-object",
        "node_modules/core-js/internals/classof-raw",
        "node_modules/core-js/internals/well-known-symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/not-a-regexp": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/is-regexp"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/correct-is-regexp-logic": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/well-known-symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.string.starts-with": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/export",
        "node_modules/core-js/internals/object-get-own-property-descriptor",
        "node_modules/core-js/internals/to-length",
        "node_modules/core-js/internals/not-a-regexp",
        "node_modules/core-js/internals/require-object-coercible",
        "node_modules/core-js/internals/correct-is-regexp-logic",
        "node_modules/core-js/internals/is-pure"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/es/string/starts-with": {
      "type": "js",
      "deps": [
        "node_modules/core-js/modules/es.string.starts-with",
        "node_modules/core-js/internals/entry-unbind"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.string.includes": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/export",
        "node_modules/core-js/internals/not-a-regexp",
        "node_modules/core-js/internals/require-object-coercible",
        "node_modules/core-js/internals/correct-is-regexp-logic"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/es/string/includes": {
      "type": "js",
      "deps": [
        "node_modules/core-js/modules/es.string.includes",
        "node_modules/core-js/internals/entry-unbind"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/iterate": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/an-object",
        "node_modules/core-js/internals/is-array-iterator-method",
        "node_modules/core-js/internals/to-length",
        "node_modules/core-js/internals/function-bind-context",
        "node_modules/core-js/internals/get-iterator-method",
        "node_modules/core-js/internals/iterator-close"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.aggregate-error": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/export",
        "node_modules/core-js/internals/object-get-prototype-of",
        "node_modules/core-js/internals/object-set-prototype-of",
        "node_modules/core-js/internals/object-create",
        "node_modules/core-js/internals/create-non-enumerable-property",
        "node_modules/core-js/internals/create-property-descriptor",
        "node_modules/core-js/internals/iterate"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/object-to-string": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/to-string-tag-support",
        "node_modules/core-js/internals/classof"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.object.to-string": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/to-string-tag-support",
        "node_modules/core-js/internals/redefine",
        "node_modules/core-js/internals/object-to-string"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/native-promise-constructor": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/global"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/redefine-all": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/redefine"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/set-species": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/get-built-in",
        "node_modules/core-js/internals/object-define-property",
        "node_modules/core-js/internals/well-known-symbol",
        "node_modules/core-js/internals/descriptors"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/an-instance": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/core-js/internals/species-constructor": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/an-object",
        "node_modules/core-js/internals/a-function",
        "node_modules/core-js/internals/well-known-symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/engine-is-ios": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/engine-user-agent"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/task": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/global",
        "node_modules/core-js/internals/fails",
        "node_modules/core-js/internals/function-bind-context",
        "node_modules/core-js/internals/html",
        "node_modules/core-js/internals/document-create-element",
        "node_modules/core-js/internals/engine-is-ios",
        "node_modules/core-js/internals/engine-is-node"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/engine-is-webos-webkit": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/engine-user-agent"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/microtask": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/global",
        "node_modules/core-js/internals/object-get-own-property-descriptor",
        "node_modules/core-js/internals/task",
        "node_modules/core-js/internals/engine-is-ios",
        "node_modules/core-js/internals/engine-is-webos-webkit",
        "node_modules/core-js/internals/engine-is-node"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/new-promise-capability": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/a-function"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/promise-resolve": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/an-object",
        "node_modules/core-js/internals/is-object",
        "node_modules/core-js/internals/new-promise-capability"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/host-report-errors": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/global"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/perform": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.promise": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/export",
        "node_modules/core-js/internals/is-pure",
        "node_modules/core-js/internals/global",
        "node_modules/core-js/internals/get-built-in",
        "node_modules/core-js/internals/native-promise-constructor",
        "node_modules/core-js/internals/redefine",
        "node_modules/core-js/internals/redefine-all",
        "node_modules/core-js/internals/set-to-string-tag",
        "node_modules/core-js/internals/set-species",
        "node_modules/core-js/internals/is-object",
        "node_modules/core-js/internals/a-function",
        "node_modules/core-js/internals/an-instance",
        "node_modules/core-js/internals/inspect-source",
        "node_modules/core-js/internals/iterate",
        "node_modules/core-js/internals/check-correctness-of-iteration",
        "node_modules/core-js/internals/species-constructor",
        "node_modules/core-js/internals/task",
        "node_modules/core-js/internals/microtask",
        "node_modules/core-js/internals/promise-resolve",
        "node_modules/core-js/internals/host-report-errors",
        "node_modules/core-js/internals/new-promise-capability",
        "node_modules/core-js/internals/perform",
        "node_modules/core-js/internals/internal-state",
        "node_modules/core-js/internals/is-forced",
        "node_modules/core-js/internals/well-known-symbol",
        "node_modules/core-js/internals/engine-is-node",
        "node_modules/core-js/internals/engine-v8-version"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.promise.all-settled": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/export",
        "node_modules/core-js/internals/a-function",
        "node_modules/core-js/internals/new-promise-capability",
        "node_modules/core-js/internals/perform",
        "node_modules/core-js/internals/iterate"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.promise.any": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/export",
        "node_modules/core-js/internals/a-function",
        "node_modules/core-js/internals/get-built-in",
        "node_modules/core-js/internals/new-promise-capability",
        "node_modules/core-js/internals/perform",
        "node_modules/core-js/internals/iterate"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.promise.finally": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/export",
        "node_modules/core-js/internals/is-pure",
        "node_modules/core-js/internals/native-promise-constructor",
        "node_modules/core-js/internals/fails",
        "node_modules/core-js/internals/get-built-in",
        "node_modules/core-js/internals/species-constructor",
        "node_modules/core-js/internals/promise-resolve",
        "node_modules/core-js/internals/redefine"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/dom-iterables": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.array.iterator": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/to-indexed-object",
        "node_modules/core-js/internals/add-to-unscopables",
        "node_modules/core-js/internals/iterators",
        "node_modules/core-js/internals/internal-state",
        "node_modules/core-js/internals/define-iterator"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/web.dom-collections.iterator": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/global",
        "node_modules/core-js/internals/dom-iterables",
        "node_modules/core-js/modules/es.array.iterator",
        "node_modules/core-js/internals/create-non-enumerable-property",
        "node_modules/core-js/internals/well-known-symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/es/promise/index": {
      "type": "js",
      "deps": [
        "node_modules/core-js/modules/es.aggregate-error",
        "node_modules/core-js/modules/es.object.to-string",
        "node_modules/core-js/modules/es.promise",
        "node_modules/core-js/modules/es.promise.all-settled",
        "node_modules/core-js/modules/es.promise.any",
        "node_modules/core-js/modules/es.promise.finally",
        "node_modules/core-js/modules/es.string.iterator",
        "node_modules/core-js/modules/web.dom-collections.iterator",
        "node_modules/core-js/internals/path"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/object-assign": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/descriptors",
        "node_modules/core-js/internals/fails",
        "node_modules/core-js/internals/object-keys",
        "node_modules/core-js/internals/object-get-own-property-symbols",
        "node_modules/core-js/internals/object-property-is-enumerable",
        "node_modules/core-js/internals/to-object",
        "node_modules/core-js/internals/indexed-object"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.object.assign": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/export",
        "node_modules/core-js/internals/object-assign"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/es/object/assign": {
      "type": "js",
      "deps": [
        "node_modules/core-js/modules/es.object.assign",
        "node_modules/core-js/internals/path"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.object.keys": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/export",
        "node_modules/core-js/internals/to-object",
        "node_modules/core-js/internals/object-keys",
        "node_modules/core-js/internals/fails"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/es/object/keys": {
      "type": "js",
      "deps": [
        "node_modules/core-js/modules/es.object.keys",
        "node_modules/core-js/internals/path"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/freezing": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/fails"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/internal-metadata": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/hidden-keys",
        "node_modules/core-js/internals/is-object",
        "node_modules/core-js/internals/has",
        "node_modules/core-js/internals/object-define-property",
        "node_modules/core-js/internals/uid",
        "node_modules/core-js/internals/freezing"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/inherit-if-required": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/is-object",
        "node_modules/core-js/internals/object-set-prototype-of"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/collection": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/export",
        "node_modules/core-js/internals/global",
        "node_modules/core-js/internals/is-forced",
        "node_modules/core-js/internals/redefine",
        "node_modules/core-js/internals/internal-metadata",
        "node_modules/core-js/internals/iterate",
        "node_modules/core-js/internals/an-instance",
        "node_modules/core-js/internals/is-object",
        "node_modules/core-js/internals/fails",
        "node_modules/core-js/internals/check-correctness-of-iteration",
        "node_modules/core-js/internals/set-to-string-tag",
        "node_modules/core-js/internals/inherit-if-required"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/collection-strong": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/object-define-property",
        "node_modules/core-js/internals/object-create",
        "node_modules/core-js/internals/redefine-all",
        "node_modules/core-js/internals/function-bind-context",
        "node_modules/core-js/internals/an-instance",
        "node_modules/core-js/internals/iterate",
        "node_modules/core-js/internals/define-iterator",
        "node_modules/core-js/internals/set-species",
        "node_modules/core-js/internals/descriptors",
        "node_modules/core-js/internals/internal-metadata",
        "node_modules/core-js/internals/internal-state"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.map": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/collection",
        "node_modules/core-js/internals/collection-strong"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/es/map/index": {
      "type": "js",
      "deps": [
        "node_modules/core-js/modules/es.map",
        "node_modules/core-js/modules/es.object.to-string",
        "node_modules/core-js/modules/es.string.iterator",
        "node_modules/core-js/modules/web.dom-collections.iterator",
        "node_modules/core-js/internals/path"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.set": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/collection",
        "node_modules/core-js/internals/collection-strong"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/es/set/index": {
      "type": "js",
      "deps": [
        "node_modules/core-js/modules/es.set",
        "node_modules/core-js/modules/es.object.to-string",
        "node_modules/core-js/modules/es.string.iterator",
        "node_modules/core-js/modules/web.dom-collections.iterator",
        "node_modules/core-js/internals/path"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/array-method-has-species-support": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/fails",
        "node_modules/core-js/internals/well-known-symbol",
        "node_modules/core-js/internals/engine-v8-version"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.array.concat": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/export",
        "node_modules/core-js/internals/fails",
        "node_modules/core-js/internals/is-array",
        "node_modules/core-js/internals/is-object",
        "node_modules/core-js/internals/to-object",
        "node_modules/core-js/internals/to-length",
        "node_modules/core-js/internals/create-property",
        "node_modules/core-js/internals/array-species-create",
        "node_modules/core-js/internals/array-method-has-species-support",
        "node_modules/core-js/internals/well-known-symbol",
        "node_modules/core-js/internals/engine-v8-version"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/object-get-own-property-names-external": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/to-indexed-object",
        "node_modules/core-js/internals/object-get-own-property-names"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/well-known-symbol-wrapped": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/well-known-symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/internals/define-well-known-symbol": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/path",
        "node_modules/core-js/internals/has",
        "node_modules/core-js/internals/well-known-symbol-wrapped",
        "node_modules/core-js/internals/object-define-property"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.symbol": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/export",
        "node_modules/core-js/internals/global",
        "node_modules/core-js/internals/get-built-in",
        "node_modules/core-js/internals/is-pure",
        "node_modules/core-js/internals/descriptors",
        "node_modules/core-js/internals/native-symbol",
        "node_modules/core-js/internals/use-symbol-as-uid",
        "node_modules/core-js/internals/fails",
        "node_modules/core-js/internals/has",
        "node_modules/core-js/internals/is-array",
        "node_modules/core-js/internals/is-object",
        "node_modules/core-js/internals/an-object",
        "node_modules/core-js/internals/to-object",
        "node_modules/core-js/internals/to-indexed-object",
        "node_modules/core-js/internals/to-primitive",
        "node_modules/core-js/internals/create-property-descriptor",
        "node_modules/core-js/internals/object-create",
        "node_modules/core-js/internals/object-keys",
        "node_modules/core-js/internals/object-get-own-property-names",
        "node_modules/core-js/internals/object-get-own-property-names-external",
        "node_modules/core-js/internals/object-get-own-property-symbols",
        "node_modules/core-js/internals/object-get-own-property-descriptor",
        "node_modules/core-js/internals/object-define-property",
        "node_modules/core-js/internals/object-property-is-enumerable",
        "node_modules/core-js/internals/create-non-enumerable-property",
        "node_modules/core-js/internals/redefine",
        "node_modules/core-js/internals/shared",
        "node_modules/core-js/internals/shared-key",
        "node_modules/core-js/internals/hidden-keys",
        "node_modules/core-js/internals/uid",
        "node_modules/core-js/internals/well-known-symbol",
        "node_modules/core-js/internals/well-known-symbol-wrapped",
        "node_modules/core-js/internals/define-well-known-symbol",
        "node_modules/core-js/internals/set-to-string-tag",
        "node_modules/core-js/internals/internal-state",
        "node_modules/core-js/internals/array-iteration"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.symbol.async-iterator": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/define-well-known-symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.symbol.description": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/export",
        "node_modules/core-js/internals/descriptors",
        "node_modules/core-js/internals/global",
        "node_modules/core-js/internals/has",
        "node_modules/core-js/internals/is-object",
        "node_modules/core-js/internals/object-define-property",
        "node_modules/core-js/internals/copy-constructor-properties"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.symbol.has-instance": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/define-well-known-symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.symbol.is-concat-spreadable": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/define-well-known-symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.symbol.iterator": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/define-well-known-symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.symbol.match": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/define-well-known-symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.symbol.match-all": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/define-well-known-symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.symbol.replace": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/define-well-known-symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.symbol.search": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/define-well-known-symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.symbol.species": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/define-well-known-symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.symbol.split": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/define-well-known-symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.symbol.to-primitive": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/define-well-known-symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.symbol.to-string-tag": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/define-well-known-symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.symbol.unscopables": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/define-well-known-symbol"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.json.to-string-tag": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/global",
        "node_modules/core-js/internals/set-to-string-tag"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.math.to-string-tag": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/set-to-string-tag"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/modules/es.reflect.to-string-tag": {
      "type": "js",
      "deps": [
        "node_modules/core-js/internals/export",
        "node_modules/core-js/internals/global",
        "node_modules/core-js/internals/set-to-string-tag"
      ],
      "pkg": "p0"
    },
    "node_modules/core-js/es/symbol/index": {
      "type": "js",
      "deps": [
        "node_modules/core-js/modules/es.array.concat",
        "node_modules/core-js/modules/es.object.to-string",
        "node_modules/core-js/modules/es.symbol",
        "node_modules/core-js/modules/es.symbol.async-iterator",
        "node_modules/core-js/modules/es.symbol.description",
        "node_modules/core-js/modules/es.symbol.has-instance",
        "node_modules/core-js/modules/es.symbol.is-concat-spreadable",
        "node_modules/core-js/modules/es.symbol.iterator",
        "node_modules/core-js/modules/es.symbol.match",
        "node_modules/core-js/modules/es.symbol.match-all",
        "node_modules/core-js/modules/es.symbol.replace",
        "node_modules/core-js/modules/es.symbol.search",
        "node_modules/core-js/modules/es.symbol.species",
        "node_modules/core-js/modules/es.symbol.split",
        "node_modules/core-js/modules/es.symbol.to-primitive",
        "node_modules/core-js/modules/es.symbol.to-string-tag",
        "node_modules/core-js/modules/es.symbol.unscopables",
        "node_modules/core-js/modules/es.json.to-string-tag",
        "node_modules/core-js/modules/es.math.to-string-tag",
        "node_modules/core-js/modules/es.reflect.to-string-tag",
        "node_modules/core-js/internals/path"
      ],
      "pkg": "p0"
    },
    "node_modules/mobx-react-lite/lib/assertEnvironment": {
      "type": "js",
      "deps": [
        "node_modules/mobx/lib/index",
        "node_modules/react/index"
      ],
      "pkg": "p0"
    },
    "node_modules/mobx-react-lite/lib/utils/reactBatchedUpdates": {
      "type": "js",
      "deps": [
        "node_modules/react-dom/index"
      ],
      "pkg": "p0"
    },
    "node_modules/mobx-react-lite/lib/utils": {
      "type": "js",
      "deps": [
        "node_modules/react/index"
      ],
      "pkg": "p0"
    },
    "node_modules/mobx-react-lite/lib/observerBatching": {
      "type": "js",
      "deps": [
        "node_modules/mobx/lib/index",
        "node_modules/mobx-react-lite/lib/utils"
      ],
      "pkg": "p0"
    },
    "node_modules/mobx-react-lite/lib/staticRendering": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/mobx-react-lite/lib/printDebugValue": {
      "type": "js",
      "deps": [
        "node_modules/mobx/lib/index"
      ],
      "pkg": "p0"
    },
    "node_modules/mobx-react-lite/lib/reactionCleanupTracking": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/mobx-react-lite/lib/useQueuedForceUpdate": {
      "type": "js",
      "deps": [
        "node_modules/react/index"
      ],
      "pkg": "p0"
    },
    "node_modules/mobx-react-lite/lib/useObserver": {
      "type": "js",
      "deps": [
        "node_modules/mobx/lib/index",
        "node_modules/react/index",
        "node_modules/mobx-react-lite/lib/printDebugValue",
        "node_modules/mobx-react-lite/lib/reactionCleanupTracking",
        "node_modules/mobx-react-lite/lib/staticRendering",
        "node_modules/mobx-react-lite/lib/utils",
        "node_modules/mobx-react-lite/lib/useQueuedForceUpdate"
      ],
      "pkg": "p0"
    },
    "node_modules/mobx-react-lite/lib/observer": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/mobx-react-lite/lib/staticRendering",
        "node_modules/mobx-react-lite/lib/useObserver"
      ],
      "pkg": "p0"
    },
    "node_modules/mobx-react-lite/lib/ObserverComponent": {
      "type": "js",
      "deps": [
        "node_modules/mobx-react-lite/lib/useObserver"
      ],
      "pkg": "p0"
    },
    "node_modules/mobx-react-lite/lib/useAsObservableSource": {
      "type": "js",
      "deps": [
        "node_modules/mobx/lib/index",
        "node_modules/react/index",
        "node_modules/mobx-react-lite/lib/utils"
      ],
      "pkg": "p0"
    },
    "node_modules/mobx-react-lite/lib/useLocalStore": {
      "type": "js",
      "deps": [
        "node_modules/mobx/lib/index",
        "node_modules/react/index",
        "node_modules/mobx-react-lite/lib/useAsObservableSource",
        "node_modules/mobx-react-lite/lib/utils"
      ],
      "pkg": "p0"
    },
    "node_modules/mobx-react-lite/lib/index": {
      "type": "js",
      "deps": [
        "node_modules/mobx-react-lite/lib/assertEnvironment",
        "node_modules/mobx-react-lite/lib/utils/reactBatchedUpdates",
        "node_modules/mobx-react-lite/lib/observerBatching",
        "node_modules/mobx-react-lite/lib/staticRendering",
        "node_modules/mobx-react-lite/lib/observer",
        "node_modules/mobx-react-lite/lib/useObserver",
        "node_modules/mobx-react-lite/lib/ObserverComponent",
        "node_modules/mobx-react-lite/lib/utils",
        "node_modules/mobx-react-lite/lib/useAsObservableSource",
        "node_modules/mobx-react-lite/lib/useLocalStore",
        "node_modules/mobx-react-lite/lib/useQueuedForceUpdate"
      ],
      "pkg": "p0"
    },
    "node_modules/mobx-react/dist/mobxreact.cjs.production.min": {
      "type": "js",
      "deps": [
        "node_modules/mobx/lib/index",
        "node_modules/react/index",
        "node_modules/mobx-react-lite/lib/index"
      ],
      "pkg": "p0"
    },
    "node_modules/mobx-react/dist/mobxreact.cjs.development": {
      "type": "js",
      "deps": [
        "node_modules/mobx/lib/index",
        "node_modules/react/index",
        "node_modules/mobx-react-lite/lib/index"
      ],
      "pkg": "p0"
    },
    "node_modules/mobx-react/dist/index": {
      "type": "js",
      "deps": [
        "node_modules/mobx-react/dist/mobxreact.cjs.production.min",
        "node_modules/mobx-react/dist/mobxreact.cjs.development"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_createFind": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseIteratee",
        "node_modules/lodash/isArrayLike",
        "node_modules/lodash/keys"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/findIndex": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseFindIndex",
        "node_modules/lodash/_baseIteratee",
        "node_modules/lodash/toInteger"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/find": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_createFind",
        "node_modules/lodash/findIndex"
      ],
      "pkg": "p0"
    },
    "node_modules/setimmediate/setImmediate": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/isEqual": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseIsEqual"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_arrayIncludesWith": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_createSet": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_Set",
        "node_modules/lodash/noop",
        "node_modules/lodash/_setToArray"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseUniq": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_SetCache",
        "node_modules/lodash/_arrayIncludes",
        "node_modules/lodash/_arrayIncludesWith",
        "node_modules/lodash/_cacheHas",
        "node_modules/lodash/_createSet",
        "node_modules/lodash/_setToArray"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/uniq": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseUniq"
      ],
      "pkg": "p0"
    },
    "node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs": {
      "type": "js",
      "deps": [
        "node_modules/react-is/index"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseSet": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_assignValue",
        "node_modules/lodash/_castPath",
        "node_modules/lodash/_isIndex",
        "node_modules/lodash/isObject",
        "node_modules/lodash/_toKey"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_basePickBy": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseGet",
        "node_modules/lodash/_baseSet",
        "node_modules/lodash/_castPath"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_basePick": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_basePickBy",
        "node_modules/lodash/hasIn"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/pick": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_basePick",
        "node_modules/lodash/_flatRest"
      ],
      "pkg": "p0"
    },
    "node_modules/dom-helpers/util/inDOM": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/dom-helpers/query/contains": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/dom-helpers/util/inDOM"
      ],
      "pkg": "p0"
    },
    "node_modules/dom-helpers/query/isWindow": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/dom-helpers/ownerDocument": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/dom-helpers/query/offset": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/dom-helpers/query/contains",
        "node_modules/dom-helpers/query/isWindow",
        "node_modules/dom-helpers/ownerDocument"
      ],
      "pkg": "p0"
    },
    "node_modules/dom-helpers/query/height": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/dom-helpers/query/offset",
        "node_modules/dom-helpers/query/isWindow"
      ],
      "pkg": "p0"
    },
    "node_modules/dom-helpers/util/camelize": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/dom-helpers/util/camelizeStyle": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/dom-helpers/util/camelize"
      ],
      "pkg": "p0"
    },
    "node_modules/dom-helpers/util/hyphenate": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/dom-helpers/util/hyphenateStyle": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/dom-helpers/util/hyphenate"
      ],
      "pkg": "p0"
    },
    "node_modules/dom-helpers/style/getComputedStyle": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/dom-helpers/util/camelizeStyle"
      ],
      "pkg": "p0"
    },
    "node_modules/dom-helpers/style/removeStyle": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/dom-helpers/transition/properties": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/dom-helpers/util/inDOM"
      ],
      "pkg": "p0"
    },
    "node_modules/dom-helpers/transition/isTransform": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/dom-helpers/style/index": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/dom-helpers/util/camelizeStyle",
        "node_modules/dom-helpers/util/hyphenateStyle",
        "node_modules/dom-helpers/style/getComputedStyle",
        "node_modules/dom-helpers/style/removeStyle",
        "node_modules/dom-helpers/transition/properties",
        "node_modules/dom-helpers/transition/isTransform"
      ],
      "pkg": "p0"
    },
    "node_modules/dom-helpers/query/offsetParent": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/dom-helpers/ownerDocument",
        "node_modules/dom-helpers/style/index"
      ],
      "pkg": "p0"
    },
    "node_modules/dom-helpers/query/scrollTop": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/dom-helpers/query/isWindow"
      ],
      "pkg": "p0"
    },
    "node_modules/dom-helpers/util/requestAnimationFrame": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/dom-helpers/util/inDOM"
      ],
      "pkg": "p0"
    },
    "node_modules/dom-helpers/events/on": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/dom-helpers/util/inDOM"
      ],
      "pkg": "p0"
    },
    "node_modules/dom-helpers/events/off": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/dom-helpers/util/inDOM"
      ],
      "pkg": "p0"
    },
    "node_modules/react-overlays/lib/utils/addEventListener": {
      "type": "js",
      "deps": [
        "node_modules/dom-helpers/events/on",
        "node_modules/dom-helpers/events/off"
      ],
      "pkg": "p0"
    },
    "node_modules/react-overlays/lib/utils/getDocumentHeight": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-overlays/lib/utils/ownerDocument": {
      "type": "js",
      "deps": [
        "node_modules/react-dom/index",
        "node_modules/dom-helpers/ownerDocument"
      ],
      "pkg": "p0"
    },
    "node_modules/dom-helpers/ownerWindow": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/dom-helpers/ownerDocument"
      ],
      "pkg": "p0"
    },
    "node_modules/react-overlays/lib/utils/ownerWindow": {
      "type": "js",
      "deps": [
        "node_modules/react-dom/index",
        "node_modules/dom-helpers/ownerWindow"
      ],
      "pkg": "p0"
    },
    "node_modules/react-overlays/lib/Affix": {
      "type": "js",
      "deps": [
        "node_modules/classnames/index",
        "node_modules/dom-helpers/query/height",
        "node_modules/dom-helpers/query/offset",
        "node_modules/dom-helpers/query/offsetParent",
        "node_modules/dom-helpers/query/scrollTop",
        "node_modules/dom-helpers/util/requestAnimationFrame",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/react-dom/index",
        "node_modules/react-overlays/lib/utils/addEventListener",
        "node_modules/react-overlays/lib/utils/getDocumentHeight",
        "node_modules/react-overlays/lib/utils/ownerDocument",
        "node_modules/react-overlays/lib/utils/ownerWindow"
      ],
      "pkg": "p0"
    },
    "node_modules/prop-types-extra/lib/utils/createChainableTypeChecker": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/prop-types-extra/lib/componentOrElement": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types-extra/lib/utils/createChainableTypeChecker"
      ],
      "pkg": "p0"
    },
    "node_modules/react-overlays/lib/utils/getContainer": {
      "type": "js",
      "deps": [
        "node_modules/react-dom/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-overlays/lib/AutoAffix": {
      "type": "js",
      "deps": [
        "node_modules/dom-helpers/query/offset",
        "node_modules/dom-helpers/util/requestAnimationFrame",
        "node_modules/prop-types/index",
        "node_modules/prop-types-extra/lib/componentOrElement",
        "node_modules/react/index",
        "node_modules/react-overlays/lib/Affix",
        "node_modules/react-overlays/lib/utils/addEventListener",
        "node_modules/react-overlays/lib/utils/getContainer",
        "node_modules/react-overlays/lib/utils/getDocumentHeight",
        "node_modules/react-overlays/lib/utils/ownerDocument",
        "node_modules/react-overlays/lib/utils/ownerWindow"
      ],
      "pkg": "p0"
    },
    "node_modules/dom-helpers/activeElement": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/dom-helpers/ownerDocument"
      ],
      "pkg": "p0"
    },
    "node_modules/prop-types-extra/node_modules/warning/warning": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/prop-types-extra/lib/deprecated": {
      "type": "js",
      "deps": [
        "node_modules/prop-types-extra/node_modules/warning/warning"
      ],
      "pkg": "p0"
    },
    "node_modules/prop-types-extra/lib/elementType": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/react-is/index",
        "node_modules/prop-types-extra/lib/utils/createChainableTypeChecker"
      ],
      "pkg": "p0"
    },
    "node_modules/warning/browser": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/dom-helpers/class/index": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/dom-helpers/class/addClass",
        "node_modules/dom-helpers/class/removeClass",
        "node_modules/dom-helpers/class/hasClass"
      ],
      "pkg": "p0"
    },
    "node_modules/dom-helpers/util/scrollbarSize": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/dom-helpers/util/inDOM"
      ],
      "pkg": "p0"
    },
    "node_modules/react-overlays/lib/utils/isOverflowing": {
      "type": "js",
      "deps": [
        "node_modules/dom-helpers/query/isWindow",
        "node_modules/dom-helpers/ownerDocument"
      ],
      "pkg": "p0"
    },
    "node_modules/react-overlays/lib/utils/manageAriaHidden": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-overlays/lib/ModalManager": {
      "type": "js",
      "deps": [
        "node_modules/dom-helpers/class/index",
        "node_modules/dom-helpers/style/index",
        "node_modules/dom-helpers/util/scrollbarSize",
        "node_modules/react-overlays/lib/utils/isOverflowing",
        "node_modules/react-overlays/lib/utils/manageAriaHidden"
      ],
      "pkg": "p0"
    },
    "node_modules/react-overlays/lib/LegacyPortal": {
      "type": "js",
      "deps": [
        "node_modules/prop-types/index",
        "node_modules/prop-types-extra/lib/componentOrElement",
        "node_modules/react/index",
        "node_modules/react-dom/index",
        "node_modules/react-overlays/lib/utils/getContainer",
        "node_modules/react-overlays/lib/utils/ownerDocument"
      ],
      "pkg": "p0"
    },
    "node_modules/react-overlays/lib/Portal": {
      "type": "js",
      "deps": [
        "node_modules/prop-types/index",
        "node_modules/prop-types-extra/lib/componentOrElement",
        "node_modules/react/index",
        "node_modules/react-dom/index",
        "node_modules/react-overlays/lib/utils/getContainer",
        "node_modules/react-overlays/lib/utils/ownerDocument",
        "node_modules/react-overlays/lib/LegacyPortal"
      ],
      "pkg": "p0"
    },
    "node_modules/react-overlays/lib/RefHolder": {
      "type": "js",
      "deps": [
        "node_modules/prop-types/index",
        "node_modules/react/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-overlays/lib/utils/addFocusListener": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-overlays/lib/Modal": {
      "type": "js",
      "deps": [
        "node_modules/dom-helpers/activeElement",
        "node_modules/dom-helpers/query/contains",
        "node_modules/dom-helpers/util/inDOM",
        "node_modules/prop-types/index",
        "node_modules/prop-types-extra/lib/componentOrElement",
        "node_modules/prop-types-extra/lib/deprecated",
        "node_modules/prop-types-extra/lib/elementType",
        "node_modules/react/index",
        "node_modules/react-dom/index",
        "node_modules/warning/browser",
        "node_modules/react-overlays/lib/ModalManager",
        "node_modules/react-overlays/lib/Portal",
        "node_modules/react-overlays/lib/RefHolder",
        "node_modules/react-overlays/lib/utils/addEventListener",
        "node_modules/react-overlays/lib/utils/addFocusListener",
        "node_modules/react-overlays/lib/utils/getContainer",
        "node_modules/react-overlays/lib/utils/ownerDocument"
      ],
      "pkg": "p0"
    },
    "node_modules/@babel/runtime/helpers/extends": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/dom-helpers/query/scrollLeft": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/dom-helpers/query/isWindow"
      ],
      "pkg": "p0"
    },
    "node_modules/dom-helpers/query/position": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/extends",
        "node_modules/dom-helpers/query/offset",
        "node_modules/dom-helpers/query/offsetParent",
        "node_modules/dom-helpers/query/scrollTop",
        "node_modules/dom-helpers/query/scrollLeft",
        "node_modules/dom-helpers/style/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-overlays/lib/utils/calculatePosition": {
      "type": "js",
      "deps": [
        "node_modules/dom-helpers/query/offset",
        "node_modules/dom-helpers/query/position",
        "node_modules/dom-helpers/query/scrollTop",
        "node_modules/react-overlays/lib/utils/ownerDocument"
      ],
      "pkg": "p0"
    },
    "node_modules/react-overlays/lib/Position": {
      "type": "js",
      "deps": [
        "node_modules/classnames/index",
        "node_modules/prop-types/index",
        "node_modules/prop-types-extra/lib/componentOrElement",
        "node_modules/react/index",
        "node_modules/react-dom/index",
        "node_modules/react-overlays/lib/utils/calculatePosition",
        "node_modules/react-overlays/lib/utils/getContainer",
        "node_modules/react-overlays/lib/utils/ownerDocument"
      ],
      "pkg": "p0"
    },
    "node_modules/react-overlays/lib/RootCloseWrapper": {
      "type": "js",
      "deps": [
        "node_modules/dom-helpers/query/contains",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/react-dom/index",
        "node_modules/react-overlays/lib/utils/addEventListener",
        "node_modules/react-overlays/lib/utils/ownerDocument"
      ],
      "pkg": "p0"
    },
    "node_modules/react-overlays/lib/Overlay": {
      "type": "js",
      "deps": [
        "node_modules/prop-types/index",
        "node_modules/prop-types-extra/lib/elementType",
        "node_modules/react/index",
        "node_modules/react-overlays/lib/Portal",
        "node_modules/react-overlays/lib/Position",
        "node_modules/react-overlays/lib/RootCloseWrapper"
      ],
      "pkg": "p0"
    },
    "node_modules/react-overlays/lib/index": {
      "type": "js",
      "deps": [
        "node_modules/react-overlays/lib/Affix",
        "node_modules/react-overlays/lib/AutoAffix",
        "node_modules/react-overlays/lib/Modal",
        "node_modules/react-overlays/lib/Overlay",
        "node_modules/react-overlays/lib/Portal",
        "node_modules/react-overlays/lib/Position",
        "node_modules/react-overlays/lib/RootCloseWrapper"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseUnset": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_castPath",
        "node_modules/lodash/last",
        "node_modules/lodash/_parent",
        "node_modules/lodash/_toKey"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_customOmitClone": {
      "type": "js",
      "deps": [
        "node_modules/lodash/isPlainObject"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/omit": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_arrayMap",
        "node_modules/lodash/_baseClone",
        "node_modules/lodash/_baseUnset",
        "node_modules/lodash/_castPath",
        "node_modules/lodash/_copyObject",
        "node_modules/lodash/_customOmitClone",
        "node_modules/lodash/_flatRest",
        "node_modules/lodash/_getAllKeysIn"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/findLastIndex": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseFindIndex",
        "node_modules/lodash/_baseIteratee",
        "node_modules/lodash/toInteger"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/findLast": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_createFind",
        "node_modules/lodash/findLastIndex"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/now": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_root"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/debounce": {
      "type": "js",
      "deps": [
        "node_modules/lodash/isObject",
        "node_modules/lodash/now",
        "node_modules/lodash/toNumber"
      ],
      "pkg": "p0"
    },
    "node_modules/compute-scroll-into-view/dist/index": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/@babel/runtime/helpers/setPrototypeOf": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/@babel/runtime/helpers/inheritsLoose": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/setPrototypeOf"
      ],
      "pkg": "p0"
    },
    "node_modules/@babel/runtime/helpers/assertThisInitialized": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/downshift/dist/downshift.cjs": {
      "type": "js",
      "deps": [
        "node_modules/compute-scroll-into-view/dist/index",
        "node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose",
        "node_modules/@babel/runtime/helpers/extends",
        "node_modules/@babel/runtime/helpers/inheritsLoose",
        "node_modules/@babel/runtime/helpers/assertThisInitialized",
        "node_modules/react/index",
        "node_modules/prop-types/index",
        "node_modules/react-is/index"
      ],
      "pkg": "p0"
    },
    "node_modules/match-sorter/dist/match-sorter.cjs": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/chunk": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseSlice",
        "node_modules/lodash/_isIterateeCall",
        "node_modules/lodash/toInteger"
      ],
      "pkg": "p0"
    },
    "node_modules/moment/locale/zh-cn": {
      "type": "js",
      "deps": [
        "node_modules/moment/moment"
      ],
      "pkg": "p0"
    },
    "node_modules/blueimp-canvastoblob/js/canvas-to-blob": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/attr-accept/dist/index": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/isNumber": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseGetTag",
        "node_modules/lodash/isObjectLike"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseDifference": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_SetCache",
        "node_modules/lodash/_arrayIncludes",
        "node_modules/lodash/_arrayIncludesWith",
        "node_modules/lodash/_arrayMap",
        "node_modules/lodash/_baseUnary",
        "node_modules/lodash/_cacheHas"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseXor": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseDifference",
        "node_modules/lodash/_baseFlatten",
        "node_modules/lodash/_baseUniq"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/isArrayLikeObject": {
      "type": "js",
      "deps": [
        "node_modules/lodash/isArrayLike",
        "node_modules/lodash/isObjectLike"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/xor": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_arrayFilter",
        "node_modules/lodash/_baseRest",
        "node_modules/lodash/_baseXor",
        "node_modules/lodash/isArrayLikeObject"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/union": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseFlatten",
        "node_modules/lodash/_baseRest",
        "node_modules/lodash/_baseUniq",
        "node_modules/lodash/isArrayLikeObject"
      ],
      "pkg": "p0"
    },
    "node_modules/keycode/index": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/anser/lib/index": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/escape-carriage/index": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/ansi-to-react/lib/index": {
      "type": "js",
      "deps": [
        "node_modules/anser/lib/index",
        "node_modules/escape-carriage/index",
        "node_modules/react/index"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_createBaseFor": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_baseFor": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_createBaseFor"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseForOwn": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseFor",
        "node_modules/lodash/keys"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_createBaseEach": {
      "type": "js",
      "deps": [
        "node_modules/lodash/isArrayLike"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseEach": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseForOwn",
        "node_modules/lodash/_createBaseEach"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/forEach": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_arrayEach",
        "node_modules/lodash/_baseEach",
        "node_modules/lodash/_castFunction",
        "node_modules/lodash/isArray"
      ],
      "pkg": "p0"
    },
    "node_modules/react-json-tree/lib/objType": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-json-tree/lib/JSONArrow": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-json-tree/lib/getCollectionEntries": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-json-tree/lib/ItemRange": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index",
        "node_modules/react-json-tree/lib/JSONArrow"
      ],
      "pkg": "p0"
    },
    "node_modules/react-json-tree/lib/JSONNestedNode": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index",
        "node_modules/react-json-tree/lib/JSONArrow",
        "node_modules/react-json-tree/lib/getCollectionEntries",
        "node_modules/react-json-tree/lib/JSONNode",
        "node_modules/react-json-tree/lib/ItemRange"
      ],
      "pkg": "p0"
    },
    "node_modules/react-json-tree/lib/JSONObjectNode": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index",
        "node_modules/react-json-tree/lib/JSONNestedNode"
      ],
      "pkg": "p0"
    },
    "node_modules/react-json-tree/lib/JSONArrayNode": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index",
        "node_modules/react-json-tree/lib/JSONNestedNode"
      ],
      "pkg": "p0"
    },
    "node_modules/react-json-tree/lib/JSONIterableNode": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/react-json-tree/lib/JSONNestedNode"
      ],
      "pkg": "p0"
    },
    "node_modules/react-json-tree/lib/JSONValueNode": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-json-tree/lib/JSONNode": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index",
        "node_modules/react-json-tree/lib/objType",
        "node_modules/react-json-tree/lib/JSONObjectNode",
        "node_modules/react-json-tree/lib/JSONArrayNode",
        "node_modules/react-json-tree/lib/JSONIterableNode",
        "node_modules/react-json-tree/lib/JSONValueNode"
      ],
      "pkg": "p0"
    },
    "node_modules/base16/lib/threezerotwofour": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/apathy": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/ashes": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/atelier-dune": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/atelier-forest": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/atelier-heath": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/atelier-lakeside": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/atelier-seaside": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/bespin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/brewer": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/bright": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/chalk": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/codeschool": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/colors": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/default": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/eighties": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/embers": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/flat": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/google": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/grayscale": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/greenscreen": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/harmonic": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/hopscotch": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/isotope": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/marrakesh": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/mocha": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/monokai": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/ocean": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/paraiso": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/pop": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/railscasts": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/shapeshifter": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/solarized": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/summerfruit": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/tomorrow": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/tube": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/twilight": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/base16/lib/index": {
      "type": "js",
      "deps": [
        "node_modules/base16/lib/threezerotwofour",
        "node_modules/base16/lib/apathy",
        "node_modules/base16/lib/ashes",
        "node_modules/base16/lib/atelier-dune",
        "node_modules/base16/lib/atelier-forest",
        "node_modules/base16/lib/atelier-heath",
        "node_modules/base16/lib/atelier-lakeside",
        "node_modules/base16/lib/atelier-seaside",
        "node_modules/base16/lib/bespin",
        "node_modules/base16/lib/brewer",
        "node_modules/base16/lib/bright",
        "node_modules/base16/lib/chalk",
        "node_modules/base16/lib/codeschool",
        "node_modules/base16/lib/colors",
        "node_modules/base16/lib/default",
        "node_modules/base16/lib/eighties",
        "node_modules/base16/lib/embers",
        "node_modules/base16/lib/flat",
        "node_modules/base16/lib/google",
        "node_modules/base16/lib/grayscale",
        "node_modules/base16/lib/greenscreen",
        "node_modules/base16/lib/harmonic",
        "node_modules/base16/lib/hopscotch",
        "node_modules/base16/lib/isotope",
        "node_modules/base16/lib/marrakesh",
        "node_modules/base16/lib/mocha",
        "node_modules/base16/lib/monokai",
        "node_modules/base16/lib/ocean",
        "node_modules/base16/lib/paraiso",
        "node_modules/base16/lib/pop",
        "node_modules/base16/lib/railscasts",
        "node_modules/base16/lib/shapeshifter",
        "node_modules/base16/lib/solarized",
        "node_modules/base16/lib/summerfruit",
        "node_modules/base16/lib/tomorrow",
        "node_modules/base16/lib/tube",
        "node_modules/base16/lib/twilight"
      ],
      "pkg": "p0"
    },
    "node_modules/color-name/index": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/simple-swizzle/node_modules/is-arrayish/index": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/simple-swizzle/index": {
      "type": "js",
      "deps": [
        "node_modules/simple-swizzle/node_modules/is-arrayish/index"
      ],
      "pkg": "p0"
    },
    "node_modules/color-string/index": {
      "type": "js",
      "deps": [
        "node_modules/color-name/index",
        "node_modules/simple-swizzle/index"
      ],
      "pkg": "p0"
    },
    "node_modules/color-convert/node_modules/color-name/index": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/color-convert/conversions": {
      "type": "js",
      "deps": [
        "node_modules/color-convert/node_modules/color-name/index"
      ],
      "pkg": "p0"
    },
    "node_modules/color-convert/route": {
      "type": "js",
      "deps": [
        "node_modules/color-convert/conversions"
      ],
      "pkg": "p0"
    },
    "node_modules/color-convert/index": {
      "type": "js",
      "deps": [
        "node_modules/color-convert/conversions",
        "node_modules/color-convert/route"
      ],
      "pkg": "p0"
    },
    "node_modules/color/index": {
      "type": "js",
      "deps": [
        "node_modules/color-string/index",
        "node_modules/color-convert/index"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash.curry/index": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-base16-styling/lib/colorConverters": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-base16-styling/lib/types": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-base16-styling/lib/index": {
      "type": "js",
      "deps": [
        "node_modules/base16/lib/index",
        "node_modules/color/index",
        "node_modules/lodash.curry/index",
        "node_modules/react-base16-styling/lib/colorConverters",
        "node_modules/react-base16-styling/lib/types"
      ],
      "pkg": "p0"
    },
    "node_modules/react-json-tree/lib/themes/solarized": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-json-tree/lib/createStylingFromTheme": {
      "type": "js",
      "deps": [
        "node_modules/react-base16-styling/lib/index",
        "node_modules/react-json-tree/lib/themes/solarized"
      ],
      "pkg": "p0"
    },
    "node_modules/react-json-tree/lib/index": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index",
        "node_modules/react-json-tree/lib/JSONNode",
        "node_modules/react-json-tree/lib/createStylingFromTheme",
        "node_modules/react-base16-styling/lib/index"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts-stat/dist/ecStat": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts-stat/index": {
      "type": "js",
      "deps": [
        "node_modules/echarts-stat/dist/ecStat"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/extension/dataTool/gexf": {
      "type": "js",
      "deps": [
        "node_modules/zrender/lib/core/util"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/extension/dataTool/prepareBoxplotData": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/echarts/extension/dataTool/index": {
      "type": "js",
      "deps": [
        "node_modules/echarts/index",
        "node_modules/echarts/extension/dataTool/gexf",
        "node_modules/echarts/extension/dataTool/prepareBoxplotData"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/extension/bmap/BMapCoordSys": {
      "type": "js",
      "deps": [
        "node_modules/echarts/index"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/extension/bmap/BMapModel": {
      "type": "js",
      "deps": [
        "node_modules/echarts/index"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/extension/bmap/BMapView": {
      "type": "js",
      "deps": [
        "node_modules/echarts/index"
      ],
      "pkg": "p0"
    },
    "node_modules/echarts/extension/bmap/bmap": {
      "type": "js",
      "deps": [
        "node_modules/echarts/index",
        "node_modules/echarts/extension/bmap/BMapCoordSys",
        "node_modules/echarts/extension/bmap/BMapModel",
        "node_modules/echarts/extension/bmap/BMapView"
      ],
      "pkg": "p0"
    },
    "node_modules/@babel/runtime/helpers/typeof": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/@babel/runtime/helpers/interopRequireWildcard": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/typeof"
      ],
      "pkg": "p0"
    },
    "node_modules/@babel/runtime/helpers/defineProperty": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/@babel/runtime/helpers/objectSpread": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/defineProperty"
      ],
      "pkg": "p0"
    },
    "node_modules/@babel/runtime/helpers/objectWithoutProperties": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose"
      ],
      "pkg": "p0"
    },
    "node_modules/@babel/runtime/helpers/classCallCheck": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/@babel/runtime/helpers/createClass": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/@babel/runtime/helpers/possibleConstructorReturn": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/typeof",
        "node_modules/@babel/runtime/helpers/assertThisInitialized"
      ],
      "pkg": "p0"
    },
    "node_modules/@babel/runtime/helpers/getPrototypeOf": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/@babel/runtime/helpers/inherits": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/setPrototypeOf"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/node_modules/classnames/index": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/symbol-observable/lib/ponyfill": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/symbol-observable/lib/index": {
      "type": "js",
      "deps": [
        "node_modules/symbol-observable/lib/ponyfill"
      ],
      "pkg": "p0"
    },
    "node_modules/redux/lib/redux": {
      "type": "js",
      "deps": [
        "node_modules/symbol-observable/lib/index"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/actions/video": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/video-react/lib/utils/fullscreen": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/classCallCheck",
        "node_modules/@babel/runtime/helpers/createClass"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/actions/player": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/video-react/lib/utils/fullscreen"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/reducers/player": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/objectSpread",
        "node_modules/video-react/lib/actions/video",
        "node_modules/video-react/lib/actions/player"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/reducers/operation": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/objectSpread",
        "node_modules/video-react/lib/actions/player"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/reducers/index": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/video-react/lib/reducers/player",
        "node_modules/video-react/lib/reducers/operation"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/Manager": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireWildcard",
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/objectSpread",
        "node_modules/@babel/runtime/helpers/classCallCheck",
        "node_modules/@babel/runtime/helpers/createClass",
        "node_modules/redux/lib/redux",
        "node_modules/video-react/lib/reducers/index",
        "node_modules/video-react/lib/actions/player",
        "node_modules/video-react/lib/actions/video"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/BigPlayButton": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireWildcard",
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/classCallCheck",
        "node_modules/@babel/runtime/helpers/createClass",
        "node_modules/@babel/runtime/helpers/possibleConstructorReturn",
        "node_modules/@babel/runtime/helpers/getPrototypeOf",
        "node_modules/@babel/runtime/helpers/assertThisInitialized",
        "node_modules/@babel/runtime/helpers/inherits",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/LoadingSpinner": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/PosterImage": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index"
      ],
      "pkg": "p0"
    },
    "node_modules/@babel/runtime/helpers/arrayLikeToArray": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/@babel/runtime/helpers/arrayWithoutHoles": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/arrayLikeToArray"
      ],
      "pkg": "p0"
    },
    "node_modules/@babel/runtime/helpers/iterableToArray": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/@babel/runtime/helpers/unsupportedIterableToArray": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/arrayLikeToArray"
      ],
      "pkg": "p0"
    },
    "node_modules/@babel/runtime/helpers/nonIterableSpread": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/@babel/runtime/helpers/toConsumableArray": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/arrayWithoutHoles",
        "node_modules/@babel/runtime/helpers/iterableToArray",
        "node_modules/@babel/runtime/helpers/unsupportedIterableToArray",
        "node_modules/@babel/runtime/helpers/nonIterableSpread"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/utils/index": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/toConsumableArray",
        "node_modules/@babel/runtime/helpers/objectSpread",
        "node_modules/@babel/runtime/helpers/objectWithoutProperties",
        "node_modules/react/index"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/Video": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireWildcard",
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/objectSpread",
        "node_modules/@babel/runtime/helpers/classCallCheck",
        "node_modules/@babel/runtime/helpers/createClass",
        "node_modules/@babel/runtime/helpers/possibleConstructorReturn",
        "node_modules/@babel/runtime/helpers/getPrototypeOf",
        "node_modules/@babel/runtime/helpers/assertThisInitialized",
        "node_modules/@babel/runtime/helpers/inherits",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index",
        "node_modules/video-react/lib/utils/index"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/Bezel": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireWildcard",
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/classCallCheck",
        "node_modules/@babel/runtime/helpers/createClass",
        "node_modules/@babel/runtime/helpers/possibleConstructorReturn",
        "node_modules/@babel/runtime/helpers/getPrototypeOf",
        "node_modules/@babel/runtime/helpers/assertThisInitialized",
        "node_modules/@babel/runtime/helpers/inherits",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/utils/dom": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/Shortcut": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/defineProperty",
        "node_modules/@babel/runtime/helpers/toConsumableArray",
        "node_modules/@babel/runtime/helpers/classCallCheck",
        "node_modules/@babel/runtime/helpers/createClass",
        "node_modules/@babel/runtime/helpers/possibleConstructorReturn",
        "node_modules/@babel/runtime/helpers/getPrototypeOf",
        "node_modules/@babel/runtime/helpers/assertThisInitialized",
        "node_modules/@babel/runtime/helpers/inherits",
        "node_modules/react/index",
        "node_modules/prop-types/index",
        "node_modules/video-react/lib/utils/dom"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/Slider": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireWildcard",
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/classCallCheck",
        "node_modules/@babel/runtime/helpers/createClass",
        "node_modules/@babel/runtime/helpers/possibleConstructorReturn",
        "node_modules/@babel/runtime/helpers/getPrototypeOf",
        "node_modules/@babel/runtime/helpers/assertThisInitialized",
        "node_modules/@babel/runtime/helpers/inherits",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index",
        "node_modules/video-react/lib/utils/dom"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/control-bar/PlayProgressBar": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index",
        "node_modules/video-react/lib/utils/index"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/control-bar/LoadProgressBar": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/control-bar/MouseTimeDisplay": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index",
        "node_modules/video-react/lib/utils/index"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/control-bar/SeekBar": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireWildcard",
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/classCallCheck",
        "node_modules/@babel/runtime/helpers/createClass",
        "node_modules/@babel/runtime/helpers/possibleConstructorReturn",
        "node_modules/@babel/runtime/helpers/getPrototypeOf",
        "node_modules/@babel/runtime/helpers/assertThisInitialized",
        "node_modules/@babel/runtime/helpers/inherits",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index",
        "node_modules/video-react/lib/components/Slider",
        "node_modules/video-react/lib/components/control-bar/PlayProgressBar",
        "node_modules/video-react/lib/components/control-bar/LoadProgressBar",
        "node_modules/video-react/lib/components/control-bar/MouseTimeDisplay",
        "node_modules/video-react/lib/utils/index"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/control-bar/ProgressControl": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireWildcard",
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/extends",
        "node_modules/@babel/runtime/helpers/classCallCheck",
        "node_modules/@babel/runtime/helpers/createClass",
        "node_modules/@babel/runtime/helpers/possibleConstructorReturn",
        "node_modules/@babel/runtime/helpers/getPrototypeOf",
        "node_modules/@babel/runtime/helpers/assertThisInitialized",
        "node_modules/@babel/runtime/helpers/inherits",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index",
        "node_modules/video-react/lib/utils/dom",
        "node_modules/video-react/lib/components/control-bar/SeekBar"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/control-bar/PlayToggle": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireWildcard",
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/classCallCheck",
        "node_modules/@babel/runtime/helpers/createClass",
        "node_modules/@babel/runtime/helpers/possibleConstructorReturn",
        "node_modules/@babel/runtime/helpers/getPrototypeOf",
        "node_modules/@babel/runtime/helpers/assertThisInitialized",
        "node_modules/@babel/runtime/helpers/inherits",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/control-bar/ForwardReplayControl": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireWildcard",
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/classCallCheck",
        "node_modules/@babel/runtime/helpers/createClass",
        "node_modules/@babel/runtime/helpers/possibleConstructorReturn",
        "node_modules/@babel/runtime/helpers/getPrototypeOf",
        "node_modules/@babel/runtime/helpers/assertThisInitialized",
        "node_modules/@babel/runtime/helpers/inherits",
        "node_modules/prop-types/index",
        "node_modules/react/index"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/control-bar/ForwardControl": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/video-react/lib/components/control-bar/ForwardReplayControl"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/control-bar/ReplayControl": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/video-react/lib/components/control-bar/ForwardReplayControl"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/control-bar/FullscreenToggle": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireWildcard",
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/classCallCheck",
        "node_modules/@babel/runtime/helpers/createClass",
        "node_modules/@babel/runtime/helpers/possibleConstructorReturn",
        "node_modules/@babel/runtime/helpers/getPrototypeOf",
        "node_modules/@babel/runtime/helpers/assertThisInitialized",
        "node_modules/@babel/runtime/helpers/inherits",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/time-controls/RemainingTimeDisplay": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index",
        "node_modules/video-react/lib/utils/index"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/time-controls/CurrentTimeDisplay": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index",
        "node_modules/video-react/lib/utils/index"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/time-controls/DurationDisplay": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index",
        "node_modules/video-react/lib/utils/index"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/time-controls/TimeDivider": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/ClickableComponent": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireWildcard",
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/extends",
        "node_modules/@babel/runtime/helpers/objectSpread",
        "node_modules/@babel/runtime/helpers/classCallCheck",
        "node_modules/@babel/runtime/helpers/createClass",
        "node_modules/@babel/runtime/helpers/possibleConstructorReturn",
        "node_modules/@babel/runtime/helpers/getPrototypeOf",
        "node_modules/@babel/runtime/helpers/assertThisInitialized",
        "node_modules/@babel/runtime/helpers/inherits",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/popup/Popup": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireWildcard",
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/classCallCheck",
        "node_modules/@babel/runtime/helpers/createClass",
        "node_modules/@babel/runtime/helpers/possibleConstructorReturn",
        "node_modules/@babel/runtime/helpers/getPrototypeOf",
        "node_modules/@babel/runtime/helpers/assertThisInitialized",
        "node_modules/@babel/runtime/helpers/inherits",
        "node_modules/prop-types/index",
        "node_modules/react/index"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/popup/PopupButton": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/extends",
        "node_modules/@babel/runtime/helpers/objectSpread",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index",
        "node_modules/video-react/lib/components/ClickableComponent",
        "node_modules/video-react/lib/components/popup/Popup"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/volume-control/VolumeLevel": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/volume-control/VolumeBar": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireWildcard",
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/extends",
        "node_modules/@babel/runtime/helpers/classCallCheck",
        "node_modules/@babel/runtime/helpers/createClass",
        "node_modules/@babel/runtime/helpers/possibleConstructorReturn",
        "node_modules/@babel/runtime/helpers/getPrototypeOf",
        "node_modules/@babel/runtime/helpers/assertThisInitialized",
        "node_modules/@babel/runtime/helpers/inherits",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index",
        "node_modules/video-react/lib/components/Slider",
        "node_modules/video-react/lib/components/volume-control/VolumeLevel"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/control-bar/VolumeMenuButton": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireWildcard",
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/extends",
        "node_modules/@babel/runtime/helpers/classCallCheck",
        "node_modules/@babel/runtime/helpers/createClass",
        "node_modules/@babel/runtime/helpers/possibleConstructorReturn",
        "node_modules/@babel/runtime/helpers/getPrototypeOf",
        "node_modules/@babel/runtime/helpers/assertThisInitialized",
        "node_modules/@babel/runtime/helpers/inherits",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index",
        "node_modules/video-react/lib/components/popup/PopupButton",
        "node_modules/video-react/lib/components/volume-control/VolumeBar"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/menu/Menu": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireWildcard",
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/classCallCheck",
        "node_modules/@babel/runtime/helpers/createClass",
        "node_modules/@babel/runtime/helpers/possibleConstructorReturn",
        "node_modules/@babel/runtime/helpers/getPrototypeOf",
        "node_modules/@babel/runtime/helpers/assertThisInitialized",
        "node_modules/@babel/runtime/helpers/inherits",
        "node_modules/prop-types/index",
        "node_modules/react/index"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/menu/MenuItem": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireWildcard",
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/classCallCheck",
        "node_modules/@babel/runtime/helpers/createClass",
        "node_modules/@babel/runtime/helpers/possibleConstructorReturn",
        "node_modules/@babel/runtime/helpers/getPrototypeOf",
        "node_modules/@babel/runtime/helpers/assertThisInitialized",
        "node_modules/@babel/runtime/helpers/inherits",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/menu/MenuButton": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireWildcard",
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/classCallCheck",
        "node_modules/@babel/runtime/helpers/createClass",
        "node_modules/@babel/runtime/helpers/possibleConstructorReturn",
        "node_modules/@babel/runtime/helpers/getPrototypeOf",
        "node_modules/@babel/runtime/helpers/assertThisInitialized",
        "node_modules/@babel/runtime/helpers/inherits",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index",
        "node_modules/video-react/lib/components/menu/Menu",
        "node_modules/video-react/lib/components/menu/MenuItem",
        "node_modules/video-react/lib/components/ClickableComponent"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/control-bar/PlaybackRateMenuButton": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireWildcard",
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/classCallCheck",
        "node_modules/@babel/runtime/helpers/createClass",
        "node_modules/@babel/runtime/helpers/possibleConstructorReturn",
        "node_modules/@babel/runtime/helpers/getPrototypeOf",
        "node_modules/@babel/runtime/helpers/assertThisInitialized",
        "node_modules/@babel/runtime/helpers/inherits",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index",
        "node_modules/video-react/lib/components/menu/MenuButton"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/control-bar/ControlBar": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireWildcard",
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/objectWithoutProperties",
        "node_modules/@babel/runtime/helpers/classCallCheck",
        "node_modules/@babel/runtime/helpers/createClass",
        "node_modules/@babel/runtime/helpers/possibleConstructorReturn",
        "node_modules/@babel/runtime/helpers/getPrototypeOf",
        "node_modules/@babel/runtime/helpers/assertThisInitialized",
        "node_modules/@babel/runtime/helpers/inherits",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index",
        "node_modules/video-react/lib/components/control-bar/ProgressControl",
        "node_modules/video-react/lib/components/control-bar/PlayToggle",
        "node_modules/video-react/lib/components/control-bar/ForwardControl",
        "node_modules/video-react/lib/components/control-bar/ReplayControl",
        "node_modules/video-react/lib/components/control-bar/FullscreenToggle",
        "node_modules/video-react/lib/components/time-controls/RemainingTimeDisplay",
        "node_modules/video-react/lib/components/time-controls/CurrentTimeDisplay",
        "node_modules/video-react/lib/components/time-controls/DurationDisplay",
        "node_modules/video-react/lib/components/time-controls/TimeDivider",
        "node_modules/video-react/lib/components/control-bar/VolumeMenuButton",
        "node_modules/video-react/lib/components/control-bar/PlaybackRateMenuButton",
        "node_modules/video-react/lib/utils/index"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/utils/browser": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/Player": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireWildcard",
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/objectSpread",
        "node_modules/@babel/runtime/helpers/defineProperty",
        "node_modules/@babel/runtime/helpers/objectWithoutProperties",
        "node_modules/@babel/runtime/helpers/classCallCheck",
        "node_modules/@babel/runtime/helpers/createClass",
        "node_modules/@babel/runtime/helpers/possibleConstructorReturn",
        "node_modules/@babel/runtime/helpers/getPrototypeOf",
        "node_modules/@babel/runtime/helpers/assertThisInitialized",
        "node_modules/@babel/runtime/helpers/inherits",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index",
        "node_modules/video-react/lib/Manager",
        "node_modules/video-react/lib/components/BigPlayButton",
        "node_modules/video-react/lib/components/LoadingSpinner",
        "node_modules/video-react/lib/components/PosterImage",
        "node_modules/video-react/lib/components/Video",
        "node_modules/video-react/lib/components/Bezel",
        "node_modules/video-react/lib/components/Shortcut",
        "node_modules/video-react/lib/components/control-bar/ControlBar",
        "node_modules/video-react/lib/utils/browser",
        "node_modules/video-react/lib/utils/dom",
        "node_modules/video-react/lib/utils/index",
        "node_modules/video-react/lib/utils/fullscreen"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/control-bar/PlaybackRate": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireWildcard",
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/classCallCheck",
        "node_modules/@babel/runtime/helpers/createClass",
        "node_modules/@babel/runtime/helpers/possibleConstructorReturn",
        "node_modules/@babel/runtime/helpers/getPrototypeOf",
        "node_modules/@babel/runtime/helpers/inherits",
        "node_modules/react/index",
        "node_modules/video-react/lib/components/control-bar/PlaybackRateMenuButton",
        "node_modules/video-react/lib/utils/index"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/components/control-bar/ClosedCaptionButton": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireWildcard",
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/classCallCheck",
        "node_modules/@babel/runtime/helpers/createClass",
        "node_modules/@babel/runtime/helpers/possibleConstructorReturn",
        "node_modules/@babel/runtime/helpers/getPrototypeOf",
        "node_modules/@babel/runtime/helpers/assertThisInitialized",
        "node_modules/@babel/runtime/helpers/inherits",
        "node_modules/prop-types/index",
        "node_modules/react/index",
        "node_modules/video-react/node_modules/classnames/index",
        "node_modules/video-react/lib/components/menu/MenuButton"
      ],
      "pkg": "p0"
    },
    "node_modules/video-react/lib/index": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireWildcard",
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/video-react/lib/components/Player",
        "node_modules/video-react/lib/components/Video",
        "node_modules/video-react/lib/components/BigPlayButton",
        "node_modules/video-react/lib/components/LoadingSpinner",
        "node_modules/video-react/lib/components/PosterImage",
        "node_modules/video-react/lib/components/Slider",
        "node_modules/video-react/lib/components/Bezel",
        "node_modules/video-react/lib/components/Shortcut",
        "node_modules/video-react/lib/components/control-bar/ControlBar",
        "node_modules/video-react/lib/components/control-bar/PlayToggle",
        "node_modules/video-react/lib/components/control-bar/ForwardControl",
        "node_modules/video-react/lib/components/control-bar/ReplayControl",
        "node_modules/video-react/lib/components/control-bar/FullscreenToggle",
        "node_modules/video-react/lib/components/control-bar/ProgressControl",
        "node_modules/video-react/lib/components/control-bar/SeekBar",
        "node_modules/video-react/lib/components/control-bar/PlayProgressBar",
        "node_modules/video-react/lib/components/control-bar/LoadProgressBar",
        "node_modules/video-react/lib/components/control-bar/MouseTimeDisplay",
        "node_modules/video-react/lib/components/control-bar/VolumeMenuButton",
        "node_modules/video-react/lib/components/control-bar/PlaybackRateMenuButton",
        "node_modules/video-react/lib/components/control-bar/PlaybackRate",
        "node_modules/video-react/lib/components/control-bar/ClosedCaptionButton",
        "node_modules/video-react/lib/components/time-controls/RemainingTimeDisplay",
        "node_modules/video-react/lib/components/time-controls/CurrentTimeDisplay",
        "node_modules/video-react/lib/components/time-controls/DurationDisplay",
        "node_modules/video-react/lib/components/time-controls/TimeDivider",
        "node_modules/video-react/lib/components/menu/MenuButton",
        "node_modules/video-react/lib/actions/player",
        "node_modules/video-react/lib/actions/video",
        "node_modules/video-react/lib/reducers/index"
      ],
      "pkg": "p0"
    },
    "node_modules/flv.js/dist/flv": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/hls.js/dist/hls": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_castSlice": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseSlice"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_hasUnicode": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_asciiToArray": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_unicodeToArray": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_stringToArray": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_asciiToArray",
        "node_modules/lodash/_hasUnicode",
        "node_modules/lodash/_unicodeToArray"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_createCaseFirst": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_castSlice",
        "node_modules/lodash/_hasUnicode",
        "node_modules/lodash/_stringToArray",
        "node_modules/lodash/toString"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/upperFirst": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_createCaseFirst"
      ],
      "pkg": "p0"
    },
    "node_modules/qr.js/lib/mode": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/qr.js/lib/8BitByte": {
      "type": "js",
      "deps": [
        "node_modules/qr.js/lib/mode"
      ],
      "pkg": "p0"
    },
    "node_modules/qr.js/lib/ErrorCorrectLevel": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/qr.js/lib/RSBlock": {
      "type": "js",
      "deps": [
        "node_modules/qr.js/lib/ErrorCorrectLevel"
      ],
      "pkg": "p0"
    },
    "node_modules/qr.js/lib/BitBuffer": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/qr.js/lib/math": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/qr.js/lib/Polynomial": {
      "type": "js",
      "deps": [
        "node_modules/qr.js/lib/math"
      ],
      "pkg": "p0"
    },
    "node_modules/qr.js/lib/util": {
      "type": "js",
      "deps": [
        "node_modules/qr.js/lib/mode",
        "node_modules/qr.js/lib/Polynomial",
        "node_modules/qr.js/lib/math"
      ],
      "pkg": "p0"
    },
    "node_modules/qr.js/lib/QRCode": {
      "type": "js",
      "deps": [
        "node_modules/qr.js/lib/8BitByte",
        "node_modules/qr.js/lib/RSBlock",
        "node_modules/qr.js/lib/BitBuffer",
        "node_modules/qr.js/lib/util",
        "node_modules/qr.js/lib/Polynomial"
      ],
      "pkg": "p0"
    },
    "node_modules/qrcode.react/lib/index": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index",
        "node_modules/qr.js/lib/QRCode",
        "node_modules/qr.js/lib/ErrorCorrectLevel"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/lodash": {
      "type": "js",
      "deps": [
        "node_modules/lodash/util"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_arrayAggregator": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_baseAggregator": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseEach"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_createAggregator": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_arrayAggregator",
        "node_modules/lodash/_baseAggregator",
        "node_modules/lodash/_baseIteratee",
        "node_modules/lodash/isArray"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/groupBy": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseAssignValue",
        "node_modules/lodash/_createAggregator"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/uniqBy": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseIteratee",
        "node_modules/lodash/_baseUniq"
      ],
      "pkg": "p0"
    },
    "node_modules/invariant/browser": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/uncontrollable/cjs/utils": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/invariant/browser"
      ],
      "pkg": "p0"
    },
    "node_modules/uncontrollable/cjs/hook": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireWildcard",
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/extends",
        "node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose",
        "node_modules/react/index",
        "node_modules/uncontrollable/cjs/utils"
      ],
      "pkg": "p0"
    },
    "node_modules/uncontrollable/cjs/uncontrollable": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireWildcard",
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose",
        "node_modules/@babel/runtime/helpers/extends",
        "node_modules/@babel/runtime/helpers/inheritsLoose",
        "node_modules/react/index",
        "node_modules/react-lifecycles-compat/react-lifecycles-compat.cjs",
        "node_modules/invariant/browser",
        "node_modules/uncontrollable/cjs/utils"
      ],
      "pkg": "p0"
    },
    "node_modules/uncontrollable/cjs/index": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/uncontrollable/cjs/hook",
        "node_modules/uncontrollable/cjs/uncontrollable"
      ],
      "pkg": "p0"
    },
    "node_modules/file-saver/dist/FileSaver.min": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/difference": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseDifference",
        "node_modules/lodash/_baseFlatten",
        "node_modules/lodash/_baseRest",
        "node_modules/lodash/isArrayLikeObject"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_createAssigner": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseRest",
        "node_modules/lodash/_isIterateeCall"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/assignInWith": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_copyObject",
        "node_modules/lodash/_createAssigner",
        "node_modules/lodash/keysIn"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseValues": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_arrayMap"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_customDefaultsAssignIn": {
      "type": "js",
      "deps": [
        "node_modules/lodash/eq"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_escapeStringChar": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_reInterpolate": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_basePropertyOf": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_escapeHtmlChar": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_basePropertyOf"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/escape": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_escapeHtmlChar",
        "node_modules/lodash/toString"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_reEscape": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/_reEvaluate": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/lodash/templateSettings": {
      "type": "js",
      "deps": [
        "node_modules/lodash/escape",
        "node_modules/lodash/_reEscape",
        "node_modules/lodash/_reEvaluate",
        "node_modules/lodash/_reInterpolate"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/template": {
      "type": "js",
      "deps": [
        "node_modules/lodash/assignInWith",
        "node_modules/lodash/attempt",
        "node_modules/lodash/_baseValues",
        "node_modules/lodash/_customDefaultsAssignIn",
        "node_modules/lodash/_escapeStringChar",
        "node_modules/lodash/isError",
        "node_modules/lodash/_isIterateeCall",
        "node_modules/lodash/keys",
        "node_modules/lodash/_reInterpolate",
        "node_modules/lodash/templateSettings",
        "node_modules/lodash/toString"
      ],
      "pkg": "p0"
    },
    "node_modules/dom-helpers/query/querySelectorAll": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/dom-helpers/query/matches": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/dom-helpers/util/inDOM",
        "node_modules/dom-helpers/query/querySelectorAll"
      ],
      "pkg": "p0"
    },
    "node_modules/@babel/runtime/helpers/objectSpread2": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/defineProperty"
      ],
      "pkg": "p0"
    },
    "node_modules/@babel/runtime/helpers/isNativeReflectConstruct": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/@babel/runtime/helpers/createSuper": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/getPrototypeOf",
        "node_modules/@babel/runtime/helpers/isNativeReflectConstruct",
        "node_modules/@babel/runtime/helpers/possibleConstructorReturn"
      ],
      "pkg": "p0"
    },
    "node_modules/rc-util/lib/KeyCode": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/rc-input-number/lib/InputNumber": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/@babel/runtime/helpers/defineProperty",
        "node_modules/@babel/runtime/helpers/objectWithoutProperties",
        "node_modules/@babel/runtime/helpers/objectSpread2",
        "node_modules/@babel/runtime/helpers/classCallCheck",
        "node_modules/@babel/runtime/helpers/createClass",
        "node_modules/@babel/runtime/helpers/inherits",
        "node_modules/@babel/runtime/helpers/createSuper",
        "node_modules/react/index",
        "node_modules/classnames/index",
        "node_modules/rc-util/lib/KeyCode"
      ],
      "pkg": "p0"
    },
    "node_modules/rc-input-number/lib/index": {
      "type": "js",
      "deps": [
        "node_modules/@babel/runtime/helpers/interopRequireDefault",
        "node_modules/rc-input-number/lib/InputNumber"
      ],
      "pkg": "p0"
    },
    "node_modules/react-textarea-autosize/lib/index": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index"
      ],
      "pkg": "p0"
    },
    "node_modules/autobind-decorator/lib/index": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-input-range/lib/js/utils/captialize": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-input-range/lib/js/utils/clamp": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-input-range/lib/js/utils/distance-to": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-input-range/lib/js/utils/is-defined": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-input-range/lib/js/utils/is-number": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-input-range/lib/js/utils/is-object": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-input-range/lib/js/utils/length": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-input-range/lib/js/utils/index": {
      "type": "js",
      "deps": [
        "node_modules/react-input-range/lib/js/utils/captialize",
        "node_modules/react-input-range/lib/js/utils/clamp",
        "node_modules/react-input-range/lib/js/utils/distance-to",
        "node_modules/react-input-range/lib/js/utils/is-defined",
        "node_modules/react-input-range/lib/js/utils/is-number",
        "node_modules/react-input-range/lib/js/utils/is-object",
        "node_modules/react-input-range/lib/js/utils/length"
      ],
      "pkg": "p0"
    },
    "node_modules/react-input-range/lib/js/input-range/value-transformer": {
      "type": "js",
      "deps": [
        "node_modules/react-input-range/lib/js/utils/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-input-range/lib/js/input-range/default-class-names": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-input-range/lib/js/input-range/label": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-input-range/lib/js/input-range/range-prop-type": {
      "type": "js",
      "deps": [
        "node_modules/react-input-range/lib/js/utils/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-input-range/lib/js/input-range/value-prop-type": {
      "type": "js",
      "deps": [
        "node_modules/react-input-range/lib/js/utils/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-input-range/lib/js/input-range/slider": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index",
        "node_modules/autobind-decorator/lib/index",
        "node_modules/react-input-range/lib/js/input-range/label"
      ],
      "pkg": "p0"
    },
    "node_modules/react-input-range/lib/js/input-range/track": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index",
        "node_modules/autobind-decorator/lib/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-input-range/lib/js/input-range/key-codes": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-input-range/lib/js/input-range/input-range": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index",
        "node_modules/autobind-decorator/lib/index",
        "node_modules/react-input-range/lib/js/input-range/value-transformer",
        "node_modules/react-input-range/lib/js/input-range/default-class-names",
        "node_modules/react-input-range/lib/js/input-range/label",
        "node_modules/react-input-range/lib/js/input-range/range-prop-type",
        "node_modules/react-input-range/lib/js/input-range/value-prop-type",
        "node_modules/react-input-range/lib/js/input-range/slider",
        "node_modules/react-input-range/lib/js/input-range/track",
        "node_modules/react-input-range/lib/js/utils/index",
        "node_modules/react-input-range/lib/js/input-range/key-codes"
      ],
      "pkg": "p0"
    },
    "node_modules/react-input-range/lib/js/index": {
      "type": "js",
      "deps": [
        "node_modules/react-input-range/lib/js/input-range/input-range"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/capitalize": {
      "type": "js",
      "deps": [
        "node_modules/lodash/toString",
        "node_modules/lodash/upperFirst"
      ],
      "pkg": "p0"
    },
    "node_modules/create-react-class/factory": {
      "type": "js",
      "deps": [
        "node_modules/object-assign/index"
      ],
      "pkg": "p0"
    },
    "node_modules/create-react-class/index": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/create-react-class/factory"
      ],
      "pkg": "p0"
    },
    "node_modules/react-visibility-sensor/lib/is-visible-with-offset": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-visibility-sensor/visibility-sensor": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/react-dom/index",
        "node_modules/prop-types/index",
        "node_modules/create-react-class/index",
        "node_modules/react-visibility-sensor/lib/is-visible-with-offset"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/tinymce": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/icons/default/icons": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/icons/default/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/icons/default/icons"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/themes/silver/theme": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/themes/silver/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/themes/silver/theme"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/advlist/plugin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/advlist/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/plugins/advlist/plugin"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/autolink/plugin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/autolink/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/plugins/autolink/plugin"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/lists/plugin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/lists/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/plugins/lists/plugin"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/link/plugin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/link/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/plugins/link/plugin"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/image/plugin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/image/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/plugins/image/plugin"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/charmap/plugin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/charmap/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/plugins/charmap/plugin"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/print/plugin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/print/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/plugins/print/plugin"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/preview/plugin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/preview/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/plugins/preview/plugin"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/anchor/plugin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/anchor/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/plugins/anchor/plugin"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/searchreplace/plugin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/searchreplace/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/plugins/searchreplace/plugin"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/visualblocks/plugin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/visualblocks/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/plugins/visualblocks/plugin"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/code/plugin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/code/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/plugins/code/plugin"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/fullscreen/plugin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/fullscreen/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/plugins/fullscreen/plugin"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/insertdatetime/plugin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/insertdatetime/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/plugins/insertdatetime/plugin"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/media/plugin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/media/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/plugins/media/plugin"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/table/plugin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/table/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/plugins/table/plugin"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/paste/plugin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/paste/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/plugins/paste/plugin"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/help/plugin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/help/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/plugins/help/plugin"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/wordcount/plugin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/wordcount/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/plugins/wordcount/plugin"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/hr/plugin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/hr/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/plugins/hr/plugin"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/pagebreak/plugin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/pagebreak/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/plugins/pagebreak/plugin"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/spellchecker/plugin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/spellchecker/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/plugins/spellchecker/plugin"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/visualchars/plugin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/visualchars/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/plugins/visualchars/plugin"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/template/plugin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/template/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/plugins/template/plugin"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/nonbreaking/plugin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/nonbreaking/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/plugins/nonbreaking/plugin"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/emoticons/plugin": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/emoticons/index": {
      "type": "js",
      "deps": [
        "node_modules/tinymce/plugins/emoticons/plugin"
      ],
      "pkg": "p0"
    },
    "node_modules/tinymce/plugins/emoticons/js/emojis": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/froala_editor.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/align.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/char_counter.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/code_beautifier.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/code_view.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/colors.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/draggable.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/emoticons.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/entities.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/font_family.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/font_size.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/forms.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/fullscreen.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/help.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/image.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/image_manager.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/inline_class.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/inline_style.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/line_breaker.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/line_height.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/link.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/lists.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/paragraph_format.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/paragraph_style.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/print.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/quick_insert.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/quote.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/save.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/special_characters.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/table.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/url.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/video.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/froala-editor/js/plugins/word_paste.min": {
      "type": "js",
      "deps": [
        "node_modules/jquery/dist/jquery"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/isString": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseGetTag",
        "node_modules/lodash/isArray",
        "node_modules/lodash/isObjectLike"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/forOwn": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseForOwn",
        "node_modules/lodash/_castFunction"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/_baseMap": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseEach",
        "node_modules/lodash/isArrayLike"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/map": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_arrayMap",
        "node_modules/lodash/_baseIteratee",
        "node_modules/lodash/_baseMap",
        "node_modules/lodash/isArray"
      ],
      "pkg": "p0"
    },
    "node_modules/reactcss/lib/flattenNames": {
      "type": "js",
      "deps": [
        "node_modules/lodash/isString",
        "node_modules/lodash/forOwn",
        "node_modules/lodash/isPlainObject",
        "node_modules/lodash/map"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/cloneDeep": {
      "type": "js",
      "deps": [
        "node_modules/lodash/_baseClone"
      ],
      "pkg": "p0"
    },
    "node_modules/reactcss/lib/mergeClasses": {
      "type": "js",
      "deps": [
        "node_modules/lodash/forOwn",
        "node_modules/lodash/cloneDeep"
      ],
      "pkg": "p0"
    },
    "node_modules/reactcss/lib/autoprefix": {
      "type": "js",
      "deps": [
        "node_modules/lodash/forOwn"
      ],
      "pkg": "p0"
    },
    "node_modules/reactcss/lib/components/hover": {
      "type": "js",
      "deps": [
        "node_modules/react/index"
      ],
      "pkg": "p0"
    },
    "node_modules/reactcss/lib/components/active": {
      "type": "js",
      "deps": [
        "node_modules/react/index"
      ],
      "pkg": "p0"
    },
    "node_modules/reactcss/lib/loop": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/reactcss/lib/index": {
      "type": "js",
      "deps": [
        "node_modules/reactcss/lib/flattenNames",
        "node_modules/reactcss/lib/mergeClasses",
        "node_modules/reactcss/lib/autoprefix",
        "node_modules/reactcss/lib/components/hover",
        "node_modules/reactcss/lib/components/active",
        "node_modules/reactcss/lib/loop"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/helpers/alpha": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-color/lib/helpers/checkboard": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/common/Checkboard": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index",
        "node_modules/react-color/lib/helpers/checkboard"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/common/Alpha": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index",
        "node_modules/react-color/lib/helpers/alpha",
        "node_modules/react-color/lib/components/common/Checkboard"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/common/EditableInput": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/helpers/hue": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/common/Hue": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index",
        "node_modules/react-color/lib/helpers/hue"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/common/Raised": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index",
        "node_modules/reactcss/lib/index"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/throttle": {
      "type": "js",
      "deps": [
        "node_modules/lodash/debounce",
        "node_modules/lodash/isObject"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/helpers/saturation": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/common/Saturation": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index",
        "node_modules/lodash/throttle",
        "node_modules/react-color/lib/helpers/saturation"
      ],
      "pkg": "p0"
    },
    "node_modules/lodash/each": {
      "type": "js",
      "deps": [
        "node_modules/lodash/forEach"
      ],
      "pkg": "p0"
    },
    "node_modules/tinycolor2/tinycolor": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-color/lib/helpers/color": {
      "type": "js",
      "deps": [
        "node_modules/lodash/each",
        "node_modules/tinycolor2/tinycolor"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/common/ColorWrap": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/lodash/debounce",
        "node_modules/react-color/lib/helpers/color"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/helpers/interaction": {
      "type": "js",
      "deps": [
        "node_modules/react/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/common/Swatch": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index",
        "node_modules/react-color/lib/helpers/interaction",
        "node_modules/react-color/lib/components/common/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/common/index": {
      "type": "js",
      "deps": [
        "node_modules/react-color/lib/components/common/Alpha",
        "node_modules/react-color/lib/components/common/Checkboard",
        "node_modules/react-color/lib/components/common/EditableInput",
        "node_modules/react-color/lib/components/common/Hue",
        "node_modules/react-color/lib/components/common/Raised",
        "node_modules/react-color/lib/components/common/Saturation",
        "node_modules/react-color/lib/components/common/ColorWrap",
        "node_modules/react-color/lib/components/common/Swatch"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/alpha/AlphaPointer": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/alpha/Alpha": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index",
        "node_modules/react-color/lib/components/common/index",
        "node_modules/react-color/lib/components/alpha/AlphaPointer"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/block/BlockSwatches": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index",
        "node_modules/lodash/map",
        "node_modules/react-color/lib/components/common/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/block/Block": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index",
        "node_modules/reactcss/lib/index",
        "node_modules/react-color/lib/helpers/color",
        "node_modules/react-color/lib/components/common/index",
        "node_modules/react-color/lib/components/block/BlockSwatches"
      ],
      "pkg": "p0"
    },
    "node_modules/material-colors/dist/colors": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/circle/CircleSwatch": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index",
        "node_modules/react-color/lib/components/common/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/circle/Circle": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index",
        "node_modules/reactcss/lib/index",
        "node_modules/lodash/map",
        "node_modules/material-colors/dist/colors",
        "node_modules/react-color/lib/components/common/index",
        "node_modules/react-color/lib/components/circle/CircleSwatch"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/chrome/ChromeFields": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index",
        "node_modules/react-color/lib/helpers/color",
        "node_modules/react-color/lib/components/common/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/chrome/ChromePointer": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/chrome/ChromePointerCircle": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/chrome/Chrome": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index",
        "node_modules/reactcss/lib/index",
        "node_modules/react-color/lib/components/common/index",
        "node_modules/react-color/lib/components/chrome/ChromeFields",
        "node_modules/react-color/lib/components/chrome/ChromePointer",
        "node_modules/react-color/lib/components/chrome/ChromePointerCircle"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/compact/CompactColor": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index",
        "node_modules/react-color/lib/components/common/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/compact/CompactFields": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index",
        "node_modules/react-color/lib/components/common/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/compact/Compact": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index",
        "node_modules/reactcss/lib/index",
        "node_modules/lodash/map",
        "node_modules/react-color/lib/helpers/color",
        "node_modules/react-color/lib/components/common/index",
        "node_modules/react-color/lib/components/compact/CompactColor",
        "node_modules/react-color/lib/components/compact/CompactFields"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/github/GithubSwatch": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index",
        "node_modules/react-color/lib/components/common/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/github/Github": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index",
        "node_modules/reactcss/lib/index",
        "node_modules/lodash/map",
        "node_modules/react-color/lib/components/common/index",
        "node_modules/react-color/lib/components/github/GithubSwatch"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/hue/HuePointer": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/hue/Hue": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index",
        "node_modules/react-color/lib/components/common/index",
        "node_modules/react-color/lib/components/hue/HuePointer"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/material/Material": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index",
        "node_modules/react-color/lib/helpers/color",
        "node_modules/react-color/lib/components/common/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/photoshop/PhotoshopFields": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index",
        "node_modules/react-color/lib/helpers/color",
        "node_modules/react-color/lib/components/common/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/photoshop/PhotoshopPointerCircle": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/photoshop/PhotoshopPointer": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/photoshop/PhotoshopButton": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/photoshop/PhotoshopPreviews": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/photoshop/Photoshop": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index",
        "node_modules/reactcss/lib/index",
        "node_modules/react-color/lib/components/common/index",
        "node_modules/react-color/lib/components/photoshop/PhotoshopFields",
        "node_modules/react-color/lib/components/photoshop/PhotoshopPointerCircle",
        "node_modules/react-color/lib/components/photoshop/PhotoshopPointer",
        "node_modules/react-color/lib/components/photoshop/PhotoshopButton",
        "node_modules/react-color/lib/components/photoshop/PhotoshopPreviews"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/sketch/SketchFields": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index",
        "node_modules/react-color/lib/helpers/color",
        "node_modules/react-color/lib/components/common/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/sketch/SketchPresetColors": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index",
        "node_modules/reactcss/lib/index",
        "node_modules/react-color/lib/components/common/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/sketch/Sketch": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index",
        "node_modules/reactcss/lib/index",
        "node_modules/react-color/lib/components/common/index",
        "node_modules/react-color/lib/components/sketch/SketchFields",
        "node_modules/react-color/lib/components/sketch/SketchPresetColors"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/slider/SliderSwatch": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/slider/SliderSwatches": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index",
        "node_modules/react-color/lib/components/slider/SliderSwatch"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/slider/SliderPointer": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/slider/Slider": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index",
        "node_modules/react-color/lib/components/common/index",
        "node_modules/react-color/lib/components/slider/SliderSwatches",
        "node_modules/react-color/lib/components/slider/SliderPointer"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/swatches/SwatchesColor": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index",
        "node_modules/react-color/lib/components/common/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/swatches/SwatchesGroup": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/reactcss/lib/index",
        "node_modules/lodash/map",
        "node_modules/react-color/lib/components/swatches/SwatchesColor"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/swatches/Swatches": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index",
        "node_modules/reactcss/lib/index",
        "node_modules/lodash/map",
        "node_modules/react-color/lib/helpers/color",
        "node_modules/material-colors/dist/colors",
        "node_modules/react-color/lib/components/common/index",
        "node_modules/react-color/lib/components/swatches/SwatchesGroup"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/components/twitter/Twitter": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/prop-types/index",
        "node_modules/reactcss/lib/index",
        "node_modules/lodash/map",
        "node_modules/react-color/lib/helpers/color",
        "node_modules/react-color/lib/components/common/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-color/lib/index": {
      "type": "js",
      "deps": [
        "node_modules/react-color/lib/components/alpha/Alpha",
        "node_modules/react-color/lib/components/block/Block",
        "node_modules/react-color/lib/components/circle/Circle",
        "node_modules/react-color/lib/components/chrome/Chrome",
        "node_modules/react-color/lib/components/compact/Compact",
        "node_modules/react-color/lib/components/github/Github",
        "node_modules/react-color/lib/components/hue/Hue",
        "node_modules/react-color/lib/components/material/Material",
        "node_modules/react-color/lib/components/photoshop/Photoshop",
        "node_modules/react-color/lib/components/sketch/Sketch",
        "node_modules/react-color/lib/components/slider/Slider",
        "node_modules/react-color/lib/components/swatches/Swatches",
        "node_modules/react-color/lib/components/twitter/Twitter",
        "node_modules/react-color/lib/components/common/ColorWrap"
      ],
      "pkg": "p0"
    },
    "node_modules/react-datetime/node_modules/object-assign/index": {
      "type": "js",
      "pkg": "p0"
    },
    "node_modules/react-datetime/src/DaysView": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/create-react-class/index",
        "node_modules/moment/moment"
      ],
      "pkg": "p0"
    },
    "node_modules/react-datetime/src/MonthsView": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/create-react-class/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-datetime/src/YearsView": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/create-react-class/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-datetime/src/TimeView": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/create-react-class/index",
        "node_modules/react-datetime/node_modules/object-assign/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-datetime/src/CalendarContainer": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/create-react-class/index",
        "node_modules/react-datetime/src/DaysView",
        "node_modules/react-datetime/src/MonthsView",
        "node_modules/react-datetime/src/YearsView",
        "node_modules/react-datetime/src/TimeView"
      ],
      "pkg": "p0"
    },
    "node_modules/react-onclickoutside/dist/react-onclickoutside.cjs": {
      "type": "js",
      "deps": [
        "node_modules/react/index",
        "node_modules/react-dom/index"
      ],
      "pkg": "p0"
    },
    "node_modules/react-datetime/DateTime": {
      "type": "js",
      "deps": [
        "node_modules/react-datetime/node_modules/object-assign/index",
        "node_modules/prop-types/index",
        "node_modules/create-react-class/index",
        "node_modules/moment/moment",
        "node_modules/react/index",
        "node_modules/react-datetime/src/CalendarContainer",
        "node_modules/react-onclickoutside/dist/react-onclickoutside.cjs"
      ],
      "pkg": "p0"
    },
    "examples/polyfills/cloest.ts": {
      "url": "/examples/polyfills/cloest.js",
      "type": "js"
    },
    "examples/polyfills/index.ts": {
      "url": "/examples/polyfills/index.js",
      "type": "js",
      "deps": [
        "node_modules/core-js/es/array/find",
        "node_modules/core-js/es/array/from",
        "node_modules/core-js/es/array/includes",
        "node_modules/core-js/es/array/find-index",
        "node_modules/core-js/es/string/starts-with",
        "node_modules/core-js/es/string/includes",
        "node_modules/core-js/es/promise/index",
        "node_modules/core-js/es/object/assign",
        "node_modules/core-js/es/object/keys",
        "node_modules/core-js/es/map/index",
        "node_modules/core-js/es/set/index",
        "node_modules/core-js/es/symbol/index",
        "examples/polyfills/cloest.ts"
      ]
    },
    "src/theme.tsx": {
      "url": "/src/theme.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/classnames/index",
        "node_modules/react/index",
        "node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs"
      ]
    },
    "src/components/Html.tsx": {
      "url": "/src/components/Html.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/theme.tsx"
      ]
    },
    "src/utils/tpl-builtin.ts": {
      "url": "/src/utils/tpl-builtin.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/moment/moment",
        "node_modules/lodash/isPlainObject",
        "node_modules/lodash/groupBy",
        "src/utils/helper.ts",
        "node_modules/lodash/uniqBy",
        "node_modules/lodash/uniq"
      ]
    },
    "src/utils/helper.ts": {
      "url": "/src/utils/helper.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/lodash/isPlainObject",
        "node_modules/lodash/isEqual",
        "node_modules/lodash/uniq",
        "src/utils/tpl.ts",
        "node_modules/qs/lib/index",
        "src/utils/autobind.ts"
      ]
    },
    "src/utils/tpl.ts": {
      "url": "/src/utils/tpl.js",
      "type": "js",
      "deps": [
        "src/utils/tpl-builtin.ts",
        "src/utils/tpl-lodash.ts"
      ]
    },
    "src/utils/tpl-lodash.ts": {
      "url": "/src/utils/tpl-lodash.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/lodash/template",
        "src/utils/tpl-builtin.ts",
        "node_modules/moment/moment"
      ]
    },
    "src/utils/autobind.ts": {
      "url": "/src/utils/autobind.js",
      "type": "js"
    },
    "src/icons/close.svg": {
      "url": "/src/icons/close.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/undo.svg": {
      "url": "/src/icons/undo.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/redo.svg": {
      "url": "/src/icons/redo.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/enter.svg": {
      "url": "/src/icons/enter.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/volume.svg": {
      "url": "/src/icons/volume.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/mute.svg": {
      "url": "/src/icons/mute.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/play.svg": {
      "url": "/src/icons/play.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/pause.svg": {
      "url": "/src/icons/pause.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/left-arrow.svg": {
      "url": "/src/icons/left-arrow.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/right-arrow.svg": {
      "url": "/src/icons/right-arrow.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/check.svg": {
      "url": "/src/icons/check.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/plus.svg": {
      "url": "/src/icons/plus.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/minus.svg": {
      "url": "/src/icons/minus.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/pencil.svg": {
      "url": "/src/icons/pencil.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/view.svg": {
      "url": "/src/icons/view.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/remove.svg": {
      "url": "/src/icons/remove.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/retry.svg": {
      "url": "/src/icons/retry.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/upload.svg": {
      "url": "/src/icons/upload.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/file.svg": {
      "url": "/src/icons/file.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/success.svg": {
      "url": "/src/icons/success.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/fail.svg": {
      "url": "/src/icons/fail.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/search.svg": {
      "url": "/src/icons/search.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/back.svg": {
      "url": "/src/icons/back.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/move.svg": {
      "url": "/src/icons/move.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/info.svg": {
      "url": "/src/icons/info.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/location.svg": {
      "url": "/src/icons/location.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/drag-bar.svg": {
      "url": "/src/icons/drag-bar.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/reload.svg": {
      "url": "/src/icons/reload.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/exchange.svg": {
      "url": "/src/icons/exchange.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/columns.svg": {
      "url": "/src/icons/columns.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/calendar.svg": {
      "url": "/src/icons/calendar.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/copy.svg": {
      "url": "/src/icons/copy.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/filter.svg": {
      "url": "/src/icons/filter.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/caret.svg": {
      "url": "/src/icons/caret.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/right-arrow-bold.svg": {
      "url": "/src/icons/right-arrow-bold.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/column-filter.svg": {
      "url": "/src/icons/column-filter.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/zoom-in.svg": {
      "url": "/src/icons/zoom-in.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/zoom-out.svg": {
      "url": "/src/icons/zoom-out.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/question.svg": {
      "url": "/src/icons/question.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/question-mark.svg": {
      "url": "/src/icons/question-mark.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/window-restore.svg": {
      "url": "/src/icons/window-restore.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/info-circle.svg": {
      "url": "/src/icons/info-circle.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/warning.svg": {
      "url": "/src/icons/warning.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/warning-mark.svg": {
      "url": "/src/icons/warning-mark.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/schedule.svg": {
      "url": "/src/icons/schedule.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/home.svg": {
      "url": "/src/icons/home.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/folder.svg": {
      "url": "/src/icons/folder.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/sort-default.svg": {
      "url": "/src/icons/sort-default.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/sort-asc.svg": {
      "url": "/src/icons/sort-asc.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/sort-desc.svg": {
      "url": "/src/icons/sort-desc.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/setting.svg": {
      "url": "/src/icons/setting.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/plus-cicle.svg": {
      "url": "/src/icons/plus-cicle.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/icons/ellipsis-v.svg": {
      "url": "/src/icons/ellipsis-v.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/components/icons.tsx": {
      "url": "/src/components/icons.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/icons/close.svg",
        "src/icons/undo.svg",
        "src/icons/redo.svg",
        "src/icons/enter.svg",
        "src/icons/volume.svg",
        "src/icons/mute.svg",
        "src/icons/play.svg",
        "src/icons/pause.svg",
        "src/icons/left-arrow.svg",
        "src/icons/right-arrow.svg",
        "src/icons/check.svg",
        "src/icons/plus.svg",
        "src/icons/minus.svg",
        "src/icons/pencil.svg",
        "src/icons/view.svg",
        "src/icons/remove.svg",
        "src/icons/retry.svg",
        "src/icons/upload.svg",
        "src/icons/file.svg",
        "src/icons/success.svg",
        "src/icons/fail.svg",
        "src/icons/search.svg",
        "src/icons/back.svg",
        "src/icons/move.svg",
        "src/icons/info.svg",
        "src/icons/location.svg",
        "src/icons/drag-bar.svg",
        "src/icons/reload.svg",
        "src/icons/exchange.svg",
        "src/icons/columns.svg",
        "src/icons/calendar.svg",
        "src/icons/copy.svg",
        "src/icons/filter.svg",
        "src/icons/caret.svg",
        "src/icons/right-arrow-bold.svg",
        "src/icons/column-filter.svg",
        "src/icons/zoom-in.svg",
        "src/icons/zoom-out.svg",
        "src/icons/question.svg",
        "src/icons/question-mark.svg",
        "src/icons/window-restore.svg",
        "src/icons/info-circle.svg",
        "src/icons/warning.svg",
        "src/icons/warning-mark.svg",
        "src/icons/schedule.svg",
        "src/icons/home.svg",
        "src/icons/folder.svg",
        "src/icons/sort-default.svg",
        "src/icons/sort-asc.svg",
        "src/icons/sort-desc.svg",
        "src/icons/setting.svg",
        "src/icons/plus-cicle.svg",
        "src/icons/ellipsis-v.svg"
      ]
    },
    "src/locale.tsx": {
      "url": "/src/locale.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs",
        "src/utils/tpl-builtin.ts"
      ]
    },
    "src/components/Toast.tsx": {
      "url": "/src/components/Toast.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react-transition-group/Transition",
        "node_modules/react/index",
        "src/components/Html.tsx",
        "src/utils/helper.ts",
        "src/theme.tsx",
        "src/components/icons.tsx",
        "src/locale.tsx"
      ]
    },
    "src/locale/en-US.ts": {
      "url": "/src/locale/en-US.js",
      "type": "js",
      "deps": [
        "src/locale.tsx"
      ]
    },
    "src/utils/SimpleMap.ts": {
      "url": "/src/utils/SimpleMap.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/lodash/find",
        "node_modules/lodash/findIndex"
      ]
    },
    "src/store/manager.ts": {
      "url": "/src/store/manager.js",
      "type": "js",
      "deps": [
        "node_modules/mobx-state-tree/dist/mobx-state-tree"
      ]
    },
    "src/store/node.ts": {
      "url": "/src/store/node.js",
      "type": "js",
      "deps": [
        "node_modules/mobx-state-tree/dist/mobx-state-tree",
        "src/store/manager.ts"
      ]
    },
    "src/store/iRenderer.ts": {
      "url": "/src/store/iRenderer.js",
      "type": "js",
      "deps": [
        "node_modules/mobx-state-tree/dist/mobx-state-tree",
        "src/utils/helper.ts",
        "src/utils/tpl-builtin.ts",
        "src/utils/SimpleMap.ts",
        "src/store/node.ts"
      ]
    },
    "src/utils/errors.ts": {
      "url": "/src/utils/errors.js",
      "type": "js"
    },
    "src/store/service.ts": {
      "url": "/src/store/service.js",
      "type": "js",
      "deps": [
        "node_modules/mobx-state-tree/dist/mobx-state-tree",
        "src/store/iRenderer.ts",
        "src/utils/helper.ts",
        "src/utils/errors.ts"
      ]
    },
    "src/utils/validations.ts": {
      "url": "/src/utils/validations.js",
      "type": "js",
      "deps": [
        "src/utils/tpl.ts",
        "src/utils/tpl-builtin.ts"
      ]
    },
    "src/components/virtual-list/constants.ts": {
      "url": "/src/components/virtual-list/constants.js",
      "type": "js"
    },
    "src/components/virtual-list/SizeAndPositionManager.ts": {
      "url": "/src/components/virtual-list/SizeAndPositionManager.js",
      "type": "js",
      "deps": [
        "src/components/virtual-list/constants.ts"
      ]
    },
    "src/components/virtual-list/index.tsx": {
      "url": "/src/components/virtual-list/index.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/prop-types/index",
        "src/components/virtual-list/SizeAndPositionManager.ts",
        "src/components/virtual-list/constants.ts"
      ]
    },
    "src/utils/dom.tsx": {
      "url": "/src/utils/dom.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/react-dom/index",
        "node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs",
        "node_modules/dom-helpers/ownerDocument",
        "node_modules/dom-helpers/query/offset",
        "node_modules/dom-helpers/query/position",
        "node_modules/dom-helpers/query/scrollTop"
      ]
    },
    "src/utils/resize-sensor.ts": {
      "url": "/src/utils/resize-sensor.js",
      "type": "js"
    },
    "src/components/Overlay.tsx": {
      "url": "/src/components/Overlay.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react-overlays/lib/index",
        "node_modules/react-dom/index",
        "node_modules/react/index",
        "src/utils/dom.tsx",
        "src/utils/helper.ts",
        "src/utils/resize-sensor.ts"
      ]
    },
    "src/components/PopOver.tsx": {
      "url": "/src/components/PopOver.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/react-dom/index",
        "src/theme.tsx",
        "src/utils/helper.ts"
      ]
    },
    "src/utils/api.ts": {
      "url": "/src/utils/api.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "src/utils/tpl-builtin.ts",
        "node_modules/qs/lib/index",
        "src/utils/tpl.ts",
        "src/utils/helper.ts"
      ]
    },
    "src/types.ts": {
      "url": "/src/types.js",
      "type": "js"
    },
    "src/utils/filter-schema.ts": {
      "url": "/src/utils/filter-schema.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "src/utils/tpl.ts",
        "src/utils/helper.ts",
        "node_modules/lodash/isPlainObject",
        "node_modules/classnames/index"
      ]
    },
    "src/WithRootStore.tsx": {
      "url": "/src/WithRootStore.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs"
      ]
    },
    "src/WithStore.tsx": {
      "url": "/src/WithStore.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs",
        "node_modules/mobx-react/dist/index",
        "node_modules/react/index",
        "src/utils/filter-schema.ts",
        "src/utils/helper.ts",
        "src/WithRootStore.tsx"
      ]
    },
    "src/renderers/Form/Item.tsx": {
      "url": "/src/renderers/Form/Item.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs",
        "node_modules/mobx/lib/index",
        "src/factory.tsx",
        "src/utils/helper.ts",
        "node_modules/mobx-react/dist/index",
        "src/types.ts",
        "src/utils/tpl.ts",
        "src/WithStore.tsx"
      ]
    },
    "src/factory.tsx": {
      "url": "/src/factory.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/qs/lib/index",
        "src/store/index.ts",
        "node_modules/mobx-state-tree/dist/mobx-state-tree",
        "src/utils/api.ts",
        "src/utils/normalizeLink.ts",
        "src/utils/helper.ts",
        "node_modules/mobx-react/dist/index",
        "src/Scoped.tsx",
        "src/theme.tsx",
        "node_modules/lodash/find",
        "src/components/Alert2.tsx",
        "src/components/Toast.tsx",
        "src/components/Alert.tsx",
        "src/locale.tsx",
        "src/Root.tsx",
        "src/WithStore.tsx",
        "src/env.tsx"
      ]
    },
    "src/store/index.ts": {
      "url": "/src/store/index.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/mobx-state-tree/dist/mobx-state-tree",
        "node_modules/setimmediate/setImmediate",
        "src/store/iRenderer.ts",
        "src/store/service.ts",
        "src/store/combo.ts",
        "src/store/form.ts",
        "src/store/crud.ts",
        "src/store/table.ts",
        "src/store/list.ts",
        "src/store/modal.ts",
        "node_modules/lodash/find",
        "src/store/formItem.ts",
        "src/store/manager.ts",
        "src/store/pagination.ts",
        "src/store/app.ts",
        "src/store/root.ts"
      ]
    },
    "src/store/combo.ts": {
      "url": "/src/store/combo.js",
      "type": "js",
      "deps": [
        "node_modules/mobx-state-tree/dist/mobx-state-tree",
        "src/store/iRenderer.ts",
        "src/store/form.ts",
        "src/store/manager.ts"
      ]
    },
    "src/store/form.ts": {
      "url": "/src/store/form.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/mobx-state-tree/dist/mobx-state-tree",
        "node_modules/lodash/debounce",
        "src/store/service.ts",
        "src/store/formItem.ts",
        "src/utils/errors.ts",
        "src/utils/helper.ts",
        "node_modules/lodash/isEqual",
        "node_modules/lodash/flatten",
        "src/store/manager.ts"
      ]
    },
    "src/store/formItem.ts": {
      "url": "/src/store/formItem.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/mobx-state-tree/dist/mobx-state-tree",
        "src/utils/validations.ts",
        "src/store/combo.ts",
        "src/utils/tpl.ts",
        "node_modules/lodash/findIndex",
        "src/utils/helper.ts",
        "src/components/Select.tsx",
        "node_modules/lodash/find",
        "src/utils/SimpleMap.ts",
        "src/store/node.ts",
        "src/utils/tpl-builtin.ts",
        "src/store/manager.ts"
      ]
    },
    "src/components/Select.tsx": {
      "url": "/src/components/Select.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/uncontrollable/cjs/index",
        "node_modules/react/index",
        "src/components/virtual-list/index.tsx",
        "src/components/Overlay.tsx",
        "src/components/PopOver.tsx",
        "node_modules/downshift/dist/downshift.cjs",
        "src/components/icons.tsx",
        "node_modules/match-sorter/dist/match-sorter.cjs",
        "src/utils/helper.ts",
        "node_modules/lodash/isPlainObject",
        "node_modules/lodash/union",
        "src/renderers/Form/Options.tsx",
        "node_modules/react-dom/index",
        "src/theme.tsx",
        "src/components/Checkbox.tsx",
        "src/components/Input.tsx",
        "src/locale.tsx",
        "src/components/Spinner.tsx",
        "src/Schema.ts",
        "src/components/WithRemoteOptions.tsx"
      ]
    },
    "src/renderers/Form/Options.tsx": {
      "url": "/src/renderers/Form/Options.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "src/utils/api.ts",
        "node_modules/mobx-state-tree/dist/mobx-state-tree",
        "src/utils/helper.ts",
        "node_modules/mobx/lib/index",
        "src/renderers/Form/Item.tsx",
        "node_modules/react/index",
        "src/utils/tpl-builtin.ts",
        "src/components/Select.tsx",
        "src/utils/tpl.ts",
        "node_modules/lodash/findIndex"
      ]
    },
    "src/components/Checkbox.tsx": {
      "url": "/src/components/Checkbox.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/theme.tsx",
        "src/utils/helper.ts"
      ]
    },
    "src/components/Input.tsx": {
      "url": "/src/components/Input.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/utils/helper.ts"
      ]
    },
    "src/components/Spinner.tsx": {
      "url": "/src/components/Spinner.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/theme.tsx",
        "node_modules/react-transition-group/Transition",
        "src/components/icons.tsx"
      ]
    },
    "src/Schema.ts": {
      "url": "/src/Schema.js",
      "type": "js"
    },
    "src/components/WithRemoteOptions.tsx": {
      "url": "/src/components/WithRemoteOptions.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs",
        "src/components/WithStore.tsx",
        "src/env.tsx",
        "node_modules/mobx-state-tree/dist/mobx-state-tree",
        "src/utils/api.ts",
        "src/utils/tpl-builtin.ts",
        "src/components/Select.tsx",
        "node_modules/mobx/lib/index"
      ]
    },
    "src/components/WithStore.tsx": {
      "url": "/src/components/WithStore.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs",
        "node_modules/mobx-state-tree/dist/mobx-state-tree",
        "node_modules/mobx-react/dist/index"
      ]
    },
    "src/env.tsx": {
      "url": "/src/env.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs"
      ]
    },
    "src/store/crud.ts": {
      "url": "/src/store/crud.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/file-saver/dist/FileSaver.min",
        "node_modules/mobx-state-tree/dist/mobx-state-tree",
        "src/store/service.ts",
        "src/utils/helper.ts",
        "node_modules/lodash/pick",
        "src/utils/tpl-builtin.ts"
      ]
    },
    "src/store/table.ts": {
      "url": "/src/store/table.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/mobx-state-tree/dist/mobx-state-tree",
        "src/store/iRenderer.ts",
        "src/utils/tpl-builtin.ts",
        "node_modules/lodash/isEqual",
        "node_modules/lodash/find",
        "src/utils/helper.ts",
        "src/utils/tpl.ts",
        "src/store/manager.ts"
      ]
    },
    "src/store/list.ts": {
      "url": "/src/store/list.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/mobx-state-tree/dist/mobx-state-tree",
        "src/store/iRenderer.ts",
        "node_modules/lodash/isEqual",
        "node_modules/lodash/find",
        "src/utils/helper.ts",
        "src/utils/tpl.ts"
      ]
    },
    "src/store/modal.ts": {
      "url": "/src/store/modal.js",
      "type": "js",
      "deps": [
        "src/store/service.ts",
        "node_modules/mobx-state-tree/dist/mobx-state-tree",
        "src/utils/helper.ts"
      ]
    },
    "src/store/pagination.ts": {
      "url": "/src/store/pagination.js",
      "type": "js",
      "deps": [
        "src/utils/helper.ts",
        "src/utils/tpl-builtin.ts",
        "src/store/iRenderer.ts"
      ]
    },
    "src/store/app.ts": {
      "url": "/src/store/app.js",
      "type": "js",
      "deps": [
        "node_modules/mobx-state-tree/dist/mobx-state-tree",
        "src/utils/helper.ts",
        "src/store/service.ts"
      ]
    },
    "src/store/root.ts": {
      "url": "/src/store/root.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/mobx-state-tree/dist/mobx-state-tree",
        "node_modules/qs/lib/index",
        "src/utils/helper.ts",
        "src/store/service.ts"
      ]
    },
    "src/utils/normalizeLink.ts": {
      "url": "/src/utils/normalizeLink.js",
      "type": "js"
    },
    "src/Scoped.tsx": {
      "url": "/src/Scoped.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/lodash/find",
        "node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs",
        "node_modules/qs/lib/index",
        "src/utils/tpl-builtin.ts",
        "src/utils/helper.ts"
      ]
    },
    "src/components/Alert2.tsx": {
      "url": "/src/components/Alert2.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/theme.tsx",
        "src/components/icons.tsx"
      ]
    },
    "src/components/Alert.tsx": {
      "url": "/src/components/Alert.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/react-dom/index",
        "src/components/Modal.tsx",
        "src/components/Button.tsx",
        "src/theme.tsx",
        "src/locale.tsx",
        "src/components/Html.tsx"
      ]
    },
    "src/components/Modal.tsx": {
      "url": "/src/components/Modal.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/react-transition-group/Transition",
        "node_modules/react-overlays/lib/index",
        "src/components/ModalManager.ts",
        "src/theme.tsx",
        "src/components/icons.tsx",
        "src/locale.tsx"
      ]
    },
    "src/components/ModalManager.ts": {
      "url": "/src/components/ModalManager.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/keycode/index"
      ]
    },
    "src/components/Button.tsx": {
      "url": "/src/components/Button.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/components/TooltipWrapper.tsx",
        "src/utils/helper.ts",
        "src/theme.tsx"
      ]
    },
    "src/components/TooltipWrapper.tsx": {
      "url": "/src/components/TooltipWrapper.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/components/Html.tsx",
        "node_modules/uncontrollable/cjs/index",
        "node_modules/react-dom/index",
        "src/components/Tooltip.tsx",
        "src/theme.tsx",
        "src/components/Overlay.tsx"
      ]
    },
    "src/components/Tooltip.tsx": {
      "url": "/src/components/Tooltip.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/theme.tsx"
      ]
    },
    "src/Root.tsx": {
      "url": "/src/Root.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/lodash/isPlainObject",
        "node_modules/react/index",
        "src/components/ImageGallery.tsx",
        "src/locale.tsx",
        "src/RootRenderer.tsx",
        "src/SchemaRenderer.tsx",
        "src/Scoped.tsx",
        "src/theme.tsx",
        "src/utils/filter-schema.ts",
        "src/utils/helper.ts",
        "src/WithRootStore.tsx"
      ]
    },
    "src/components/ImageGallery.tsx": {
      "url": "/src/components/ImageGallery.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/theme.tsx",
        "src/utils/helper.ts",
        "src/components/Modal.tsx",
        "src/components/icons.tsx",
        "src/locale.tsx"
      ]
    },
    "src/RootRenderer.tsx": {
      "url": "/src/RootRenderer.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/mobx-react/dist/index",
        "node_modules/react/index",
        "src/components/Alert2.tsx",
        "src/components/Spinner.tsx",
        "src/Root.tsx",
        "src/Scoped.tsx",
        "src/store/root.ts",
        "src/utils/helper.ts",
        "src/utils/tpl.ts"
      ]
    },
    "src/SchemaRenderer.tsx": {
      "url": "/src/SchemaRenderer.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/lodash/difference",
        "node_modules/lodash/omit",
        "node_modules/react/index",
        "src/components/LazyComponent.tsx",
        "src/factory.tsx",
        "src/Root.tsx",
        "src/utils/helper.ts"
      ]
    },
    "src/components/LazyComponent.tsx": {
      "url": "/src/components/LazyComponent.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/react-visibility-sensor/visibility-sensor",
        "src/components/Spinner.tsx"
      ]
    },
    "src/renderers/Form/IconPickerIcons.tsx": {
      "url": "/src/renderers/Form/IconPickerIcons.js",
      "type": "js"
    },
    "src/locale/zh-CN.ts": {
      "url": "/src/locale/zh-CN.js",
      "type": "js",
      "deps": [
        "src/locale.tsx"
      ]
    },
    "src/utils/Animation.ts": {
      "url": "/src/utils/Animation.js",
      "type": "js"
    },
    "src/renderers/Remark.tsx": {
      "url": "/src/renderers/Remark.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/components/TooltipWrapper.tsx",
        "src/utils/tpl.ts",
        "src/theme.tsx",
        "src/components/icons.tsx"
      ]
    },
    "src/utils/icon.tsx": {
      "url": "/src/utils/icon.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index"
      ]
    },
    "src/renderers/Action.tsx": {
      "url": "/src/renderers/Action.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/utils/tpl.ts",
        "src/components/Button.tsx",
        "node_modules/lodash/pick",
        "src/renderers/Remark.tsx",
        "src/theme.tsx",
        "src/utils/helper.ts",
        "src/utils/icon.tsx"
      ]
    },
    "src/renderers/Alert.tsx": {
      "url": "/src/renderers/Alert.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "src/factory.tsx",
        "node_modules/react/index",
        "src/components/Alert2.tsx"
      ]
    },
    "src/components/404.tsx": {
      "url": "/src/components/404.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/theme.tsx"
      ]
    },
    "src/components/ContextMenu.tsx": {
      "url": "/src/components/ContextMenu.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "src/theme.tsx",
        "node_modules/react/index",
        "node_modules/react-dom/index",
        "src/utils/helper.ts",
        "node_modules/react-transition-group/Transition",
        "src/utils/dom.tsx"
      ]
    },
    "src/components/AsideNav.tsx": {
      "url": "/src/components/AsideNav.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/utils/helper.ts",
        "src/theme.tsx"
      ]
    },
    "src/components/Checkboxes.tsx": {
      "url": "/src/components/Checkboxes.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/uncontrollable/cjs/index",
        "src/components/Checkbox.tsx",
        "src/theme.tsx",
        "src/utils/helper.ts",
        "node_modules/lodash/isEqual",
        "src/locale.tsx"
      ]
    },
    "src/components/Collapse.tsx": {
      "url": "/src/components/Collapse.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/dom-helpers/style/index",
        "src/theme.tsx",
        "node_modules/react-transition-group/Transition",
        "src/utils/helper.ts"
      ]
    },
    "src/components/ColorPicker.tsx": {
      "url": "/src/components/ColorPicker.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/react-dom/index",
        "node_modules/react-color/lib/index",
        "src/components/icons.tsx",
        "src/components/Overlay.tsx",
        "node_modules/uncontrollable/cjs/index",
        "src/components/PopOver.tsx",
        "src/theme.tsx",
        "src/utils/helper.ts",
        "src/locale.tsx"
      ]
    },
    "src/components/calendar/DaysView.tsx": {
      "url": "/src/components/calendar/DaysView.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react-datetime/src/DaysView",
        "node_modules/react/index",
        "src/locale.tsx"
      ]
    },
    "src/components/calendar/YearsView.tsx": {
      "url": "/src/components/calendar/YearsView.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react-datetime/src/YearsView",
        "node_modules/react/index",
        "src/locale.tsx"
      ]
    },
    "src/components/calendar/MonthsView.tsx": {
      "url": "/src/components/calendar/MonthsView.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react-datetime/src/MonthsView",
        "node_modules/react/index",
        "src/locale.tsx"
      ]
    },
    "src/components/calendar/TimeView.tsx": {
      "url": "/src/components/calendar/TimeView.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react-datetime/src/TimeView",
        "node_modules/react/index",
        "src/locale.tsx",
        "src/components/icons.tsx"
      ]
    },
    "src/components/calendar/QuartersView.tsx": {
      "url": "/src/components/calendar/QuartersView.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/locale.tsx"
      ]
    },
    "src/components/calendar/CalendarContainer.tsx": {
      "url": "/src/components/calendar/CalendarContainer.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react-datetime/src/CalendarContainer",
        "src/components/calendar/DaysView.tsx",
        "src/components/calendar/YearsView.tsx",
        "src/components/calendar/MonthsView.tsx",
        "src/components/calendar/TimeView.tsx",
        "src/components/calendar/QuartersView.tsx"
      ]
    },
    "src/components/calendar/Calendar.tsx": {
      "url": "/src/components/calendar/Calendar.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react-datetime/DateTime",
        "node_modules/react/index",
        "src/components/calendar/CalendarContainer.tsx",
        "node_modules/classnames/index",
        "src/theme.tsx"
      ]
    },
    "src/components/DatePicker.tsx": {
      "url": "/src/components/DatePicker.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/classnames/index",
        "node_modules/moment/moment",
        "node_modules/moment/locale/zh-cn",
        "src/components/icons.tsx",
        "src/components/PopOver.tsx",
        "src/components/Overlay.tsx",
        "src/theme.tsx",
        "src/components/calendar/Calendar.tsx",
        "src/locale.tsx"
      ]
    },
    "src/components/DateRangePicker.tsx": {
      "url": "/src/components/DateRangePicker.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/moment/moment",
        "node_modules/react-dom/index",
        "node_modules/classnames/index",
        "src/components/icons.tsx",
        "src/components/Overlay.tsx",
        "src/components/calendar/Calendar.tsx",
        "src/components/PopOver.tsx",
        "src/theme.tsx",
        "src/utils/helper.ts",
        "src/locale.tsx"
      ]
    },
    "src/components/Drawer.tsx": {
      "url": "/src/components/Drawer.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/react-transition-group/Transition",
        "node_modules/react-overlays/lib/index",
        "src/components/icons.tsx",
        "node_modules/classnames/index",
        "src/components/ModalManager.ts",
        "src/theme.tsx",
        "src/utils/helper.ts"
      ]
    },
    "src/components/Tabs.tsx": {
      "url": "/src/components/Tabs.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/react-transition-group/Transition",
        "src/theme.tsx",
        "node_modules/uncontrollable/cjs/index",
        "src/utils/icon.tsx"
      ]
    },
    "examples/loadMonacoEditor.ts": {
      "url": "/examples/loadMonacoEditor.js",
      "type": "js"
    },
    "src/components/Editor.tsx": {
      "url": "/src/components/Editor.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/classnames/index",
        "src/theme.tsx"
      ]
    },
    "src/components/Layout.tsx": {
      "url": "/src/components/Layout.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/theme.tsx"
      ]
    },
    "src/components/Radios.tsx": {
      "url": "/src/components/Radios.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/uncontrollable/cjs/index",
        "src/components/Checkbox.tsx",
        "src/components/Select.tsx",
        "node_modules/lodash/chunk",
        "src/theme.tsx"
      ]
    },
    "src/components/Range.tsx": {
      "url": "/src/components/Range.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/react-input-range/lib/js/index",
        "node_modules/uncontrollable/cjs/index",
        "src/theme.tsx"
      ]
    },
    "src/components/Rating.tsx": {
      "url": "/src/components/Rating.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/classnames/index",
        "src/theme.tsx"
      ]
    },
    "src/components/SparkLine.tsx": {
      "url": "/src/components/SparkLine.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/locale.tsx",
        "src/theme.tsx"
      ]
    },
    "src/components/Switch.tsx": {
      "url": "/src/components/Switch.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/theme.tsx"
      ]
    },
    "src/components/Textarea.tsx": {
      "url": "/src/components/Textarea.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react-textarea-autosize/lib/index"
      ]
    },
    "src/components/TitleBar.tsx": {
      "url": "/src/components/TitleBar.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/theme.tsx"
      ]
    },
    "src/components/Tree.tsx": {
      "url": "/src/components/Tree.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/utils/helper.ts",
        "src/components/Select.tsx",
        "src/theme.tsx",
        "src/renderers/Form/Options.tsx",
        "src/components/icons.tsx",
        "src/components/Checkbox.tsx",
        "src/locale.tsx"
      ]
    },
    "src/components/ResultList.tsx": {
      "url": "/src/components/ResultList.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/theme.tsx",
        "src/components/icons.tsx",
        "src/utils/helper.ts",
        "node_modules/sortablejs/Sortable",
        "node_modules/react-dom/index",
        "src/locale.tsx"
      ]
    },
    "src/components/TableCheckboxes.tsx": {
      "url": "/src/components/TableCheckboxes.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "src/components/Checkboxes.tsx",
        "src/theme.tsx",
        "node_modules/react/index",
        "node_modules/uncontrollable/cjs/index",
        "src/components/Checkbox.tsx",
        "src/utils/tpl-builtin.ts",
        "src/locale.tsx"
      ]
    },
    "src/components/ListCheckboxes.tsx": {
      "url": "/src/components/ListCheckboxes.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "src/components/Checkboxes.tsx",
        "src/theme.tsx",
        "node_modules/react/index",
        "node_modules/uncontrollable/cjs/index",
        "src/components/Checkbox.tsx",
        "src/locale.tsx"
      ]
    },
    "src/components/TreeCheckboxes.tsx": {
      "url": "/src/components/TreeCheckboxes.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "src/components/Checkboxes.tsx",
        "src/theme.tsx",
        "node_modules/react/index",
        "node_modules/uncontrollable/cjs/index",
        "src/components/Checkbox.tsx",
        "src/utils/helper.ts",
        "src/components/Spinner.tsx",
        "src/locale.tsx",
        "src/components/icons.tsx"
      ]
    },
    "src/components/InputBox.tsx": {
      "url": "/src/components/InputBox.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/theme.tsx",
        "src/components/Input.tsx",
        "src/utils/helper.ts",
        "src/components/icons.tsx"
      ]
    },
    "src/components/ChainedCheckboxes.tsx": {
      "url": "/src/components/ChainedCheckboxes.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "src/components/Checkboxes.tsx",
        "src/theme.tsx",
        "node_modules/react/index",
        "node_modules/uncontrollable/cjs/index",
        "src/components/Checkbox.tsx",
        "src/utils/helper.ts",
        "node_modules/lodash/times",
        "src/components/Spinner.tsx",
        "src/locale.tsx"
      ]
    },
    "src/components/ListRadios.tsx": {
      "url": "/src/components/ListRadios.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "src/theme.tsx",
        "node_modules/react/index",
        "node_modules/uncontrollable/cjs/index",
        "src/components/Checkbox.tsx",
        "src/components/Select.tsx",
        "src/utils/helper.ts",
        "node_modules/lodash/isEqual",
        "src/locale.tsx"
      ]
    },
    "src/components/TreeRadios.tsx": {
      "url": "/src/components/TreeRadios.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "src/theme.tsx",
        "node_modules/react/index",
        "node_modules/uncontrollable/cjs/index",
        "src/components/Checkbox.tsx",
        "src/utils/helper.ts",
        "src/components/Spinner.tsx",
        "src/components/ListRadios.tsx",
        "src/locale.tsx",
        "src/components/icons.tsx"
      ]
    },
    "src/components/AssociatedCheckboxes.tsx": {
      "url": "/src/components/AssociatedCheckboxes.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/components/Checkboxes.tsx",
        "src/components/Select.tsx",
        "src/utils/helper.ts",
        "src/components/ListRadios.tsx",
        "src/theme.tsx",
        "node_modules/uncontrollable/cjs/index",
        "src/components/ListCheckboxes.tsx",
        "src/components/TableCheckboxes.tsx",
        "src/components/TreeCheckboxes.tsx",
        "src/components/ChainedCheckboxes.tsx",
        "src/components/TreeRadios.tsx",
        "src/components/icons.tsx",
        "src/locale.tsx"
      ]
    },
    "src/components/Transfer.tsx": {
      "url": "/src/components/Transfer.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/theme.tsx",
        "src/components/Checkboxes.tsx",
        "node_modules/uncontrollable/cjs/index",
        "src/components/ResultList.tsx",
        "src/components/TableCheckboxes.tsx",
        "src/components/ListCheckboxes.tsx",
        "src/components/TreeCheckboxes.tsx",
        "src/utils/helper.ts",
        "src/components/InputBox.tsx",
        "src/components/icons.tsx",
        "node_modules/lodash/debounce",
        "src/components/ChainedCheckboxes.tsx",
        "src/components/AssociatedCheckboxes.tsx",
        "src/locale.tsx"
      ]
    },
    "src/components/SearchBox.tsx": {
      "url": "/src/components/SearchBox.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/theme.tsx",
        "src/components/icons.tsx",
        "node_modules/uncontrollable/cjs/index",
        "src/utils/helper.ts",
        "src/locale.tsx",
        "node_modules/lodash/debounce"
      ]
    },
    "src/components/TabsTransfer.tsx": {
      "url": "/src/components/TabsTransfer.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/utils/helper.ts",
        "src/components/Tabs.tsx",
        "src/components/SearchBox.tsx",
        "src/components/TableCheckboxes.tsx",
        "src/components/TreeCheckboxes.tsx",
        "src/components/ChainedCheckboxes.tsx",
        "src/components/ListCheckboxes.tsx",
        "src/components/Transfer.tsx",
        "src/theme.tsx",
        "src/components/AssociatedCheckboxes.tsx",
        "src/locale.tsx"
      ]
    },
    "src/components/ResultBox.tsx": {
      "url": "/src/components/ResultBox.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "src/theme.tsx",
        "node_modules/react/index",
        "node_modules/uncontrollable/cjs/index",
        "src/components/icons.tsx",
        "src/components/Input.tsx",
        "src/utils/helper.ts",
        "src/locale.tsx"
      ]
    },
    "src/components/ListGroup.tsx": {
      "url": "/src/components/ListGroup.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "src/theme.tsx",
        "node_modules/react/index"
      ]
    },
    "src/components/NumberInput.tsx": {
      "url": "/src/components/NumberInput.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/rc-input-number/lib/index",
        "src/theme.tsx"
      ]
    },
    "src/components/ArrayInput.tsx": {
      "url": "/src/components/ArrayInput.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/theme.tsx",
        "src/locale.tsx",
        "src/components/InputBox.tsx",
        "src/components/icons.tsx",
        "src/components/Button.tsx",
        "src/utils/helper.ts",
        "node_modules/uncontrollable/cjs/index",
        "node_modules/sortablejs/Sortable",
        "node_modules/react-dom/index"
      ]
    },
    "src/components/AnchorNav.tsx": {
      "url": "/src/components/AnchorNav.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/theme.tsx",
        "src/utils/helper.ts",
        "node_modules/uncontrollable/cjs/index",
        "node_modules/lodash/lodash"
      ]
    },
    "src/components/index.tsx": {
      "url": "/src/components/index.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "src/components/404.tsx",
        "src/components/Alert.tsx",
        "src/components/ContextMenu.tsx",
        "src/components/AsideNav.tsx",
        "src/components/Button.tsx",
        "src/components/Checkbox.tsx",
        "src/components/Checkboxes.tsx",
        "src/components/Collapse.tsx",
        "src/components/ColorPicker.tsx",
        "src/components/DatePicker.tsx",
        "src/components/DateRangePicker.tsx",
        "src/components/Drawer.tsx",
        "src/components/Tabs.tsx",
        "src/components/Editor.tsx",
        "src/components/Html.tsx",
        "src/components/icons.tsx",
        "src/components/Layout.tsx",
        "src/components/LazyComponent.tsx",
        "src/components/Modal.tsx",
        "src/components/Overlay.tsx",
        "src/components/PopOver.tsx",
        "src/components/Radios.tsx",
        "src/components/Range.tsx",
        "src/components/Rating.tsx",
        "src/components/Select.tsx",
        "src/components/SparkLine.tsx",
        "src/components/Spinner.tsx",
        "src/components/Switch.tsx",
        "src/components/Textarea.tsx",
        "src/components/TitleBar.tsx",
        "src/components/Toast.tsx",
        "src/components/Tooltip.tsx",
        "src/components/TooltipWrapper.tsx",
        "src/components/Tree.tsx",
        "src/components/Alert2.tsx",
        "src/components/Transfer.tsx",
        "src/components/TabsTransfer.tsx",
        "src/components/ListCheckboxes.tsx",
        "src/components/TableCheckboxes.tsx",
        "src/components/TreeCheckboxes.tsx",
        "src/components/ChainedCheckboxes.tsx",
        "src/components/ResultBox.tsx",
        "src/components/InputBox.tsx",
        "src/components/ListRadios.tsx",
        "src/components/TreeRadios.tsx",
        "src/components/ListGroup.tsx",
        "src/components/NumberInput.tsx",
        "src/components/ArrayInput.tsx",
        "src/components/SearchBox.tsx",
        "src/components/AnchorNav.tsx"
      ]
    },
    "src/renderers/App.tsx": {
      "url": "/src/renderers/App.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/components/index.tsx",
        "src/components/Layout.tsx",
        "src/factory.tsx",
        "src/Scoped.tsx",
        "src/store/app.ts",
        "src/utils/api.ts",
        "src/utils/helper.ts",
        "src/utils/icon.tsx"
      ]
    },
    "src/components/Badge.tsx": {
      "url": "/src/components/Badge.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs",
        "src/utils/tpl.ts",
        "src/utils/tpl-builtin.ts"
      ]
    },
    "src/renderers/Avatar.tsx": {
      "url": "/src/renderers/Avatar.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/components/Badge.tsx",
        "src/utils/tpl-builtin.ts"
      ]
    },
    "src/renderers/Form/ButtonGroup.tsx": {
      "url": "/src/renderers/Form/ButtonGroup.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Options.tsx",
        "src/utils/helper.ts"
      ]
    },
    "src/renderers/ButtonGroup.tsx": {
      "url": "/src/renderers/ButtonGroup.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "src/renderers/Form/ButtonGroup.tsx",
        "src/factory.tsx"
      ]
    },
    "src/renderers/ButtonToolbar.tsx": {
      "url": "/src/renderers/ButtonToolbar.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx"
      ]
    },
    "src/renderers/Breadcrumb.tsx": {
      "url": "/src/renderers/Breadcrumb.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/utils/icon.tsx",
        "src/utils/tpl.ts",
        "src/utils/tpl-builtin.ts"
      ]
    },
    "src/renderers/DropDownButton.tsx": {
      "url": "/src/renderers/DropDownButton.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "node_modules/react-overlays/lib/index",
        "src/components/Overlay.tsx",
        "src/components/PopOver.tsx",
        "src/components/TooltipWrapper.tsx",
        "src/utils/helper.ts",
        "src/utils/tpl.ts",
        "src/components/icons.tsx"
      ]
    },
    "src/renderers/Collapse.tsx": {
      "url": "/src/renderers/Collapse.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/components/Collapse.tsx"
      ]
    },
    "src/renderers/Color.tsx": {
      "url": "/src/renderers/Color.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/utils/tpl-builtin.ts"
      ]
    },
    "src/renderers/CRUD.tsx": {
      "url": "/src/renderers/CRUD.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/store/crud.ts",
        "src/utils/helper.ts",
        "src/Scoped.tsx",
        "src/components/Button.tsx",
        "src/components/Select.tsx",
        "src/utils/filter-schema.ts",
        "node_modules/lodash/pick",
        "node_modules/qs/lib/index",
        "node_modules/react-dom/index",
        "src/utils/tpl.ts",
        "src/utils/api.ts",
        "node_modules/lodash/omit",
        "node_modules/lodash/find",
        "node_modules/lodash/findIndex",
        "src/components/Html.tsx",
        "src/components/index.tsx",
        "src/components/icons.tsx"
      ]
    },
    "src/renderers/Pagination.tsx": {
      "url": "/src/renderers/Pagination.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/utils/helper.ts",
        "src/components/icons.tsx"
      ]
    },
    "src/renderers/Cards.tsx": {
      "url": "/src/renderers/Cards.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/react-dom/index",
        "src/factory.tsx",
        "src/components/Button.tsx",
        "src/store/list.ts",
        "src/utils/helper.ts",
        "src/utils/tpl-builtin.ts",
        "node_modules/sortablejs/Sortable",
        "src/utils/tpl.ts",
        "src/components/icons.tsx"
      ]
    },
    "src/renderers/QuickEdit.tsx": {
      "url": "/src/renderers/QuickEdit.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/react-dom/index",
        "node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs",
        "node_modules/keycode/index",
        "node_modules/dom-helpers/query/matches",
        "src/components/Overlay.tsx",
        "src/components/PopOver.tsx",
        "src/components/icons.tsx"
      ]
    },
    "src/renderers/PopOver.tsx": {
      "url": "/src/renderers/PopOver.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/react-dom/index",
        "node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs",
        "node_modules/react-overlays/lib/index",
        "src/components/PopOver.tsx",
        "src/components/Overlay.tsx",
        "src/components/icons.tsx"
      ]
    },
    "src/renderers/Copyable.tsx": {
      "url": "/src/renderers/Copyable.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs",
        "src/utils/tpl.ts",
        "src/components/icons.tsx"
      ]
    },
    "src/renderers/Table/TableCell.tsx": {
      "url": "/src/renderers/Table/TableCell.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/renderers/QuickEdit.tsx",
        "src/renderers/Copyable.tsx",
        "src/renderers/PopOver.tsx",
        "node_modules/mobx-react/dist/index"
      ]
    },
    "src/renderers/Table/HeadCellFilterDropdown.tsx": {
      "url": "/src/renderers/Table/HeadCellFilterDropdown.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/utils/api.ts",
        "src/components/icons.tsx",
        "src/components/Overlay.tsx",
        "src/components/PopOver.tsx",
        "node_modules/react-dom/index",
        "src/components/Checkbox.tsx",
        "node_modules/lodash/xor",
        "src/components/Select.tsx",
        "src/utils/helper.ts"
      ]
    },
    "src/renderers/Table/HeadCellSearchDropdown.tsx": {
      "url": "/src/renderers/Table/HeadCellSearchDropdown.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/components/icons.tsx",
        "src/components/Overlay.tsx",
        "node_modules/react-dom/index",
        "src/components/PopOver.tsx",
        "src/utils/helper.ts"
      ]
    },
    "src/renderers/Table/TableRow.tsx": {
      "url": "/src/renderers/Table/TableRow.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/mobx/lib/index"
      ]
    },
    "src/renderers/Table/TableBody.tsx": {
      "url": "/src/renderers/Table/TableBody.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Table/TableRow.tsx",
        "src/utils/tpl.ts",
        "node_modules/mobx/lib/index",
        "src/utils/helper.ts"
      ]
    },
    "src/renderers/Table/TableContent.tsx": {
      "url": "/src/renderers/Table/TableContent.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Table/TableBody.tsx"
      ]
    },
    "src/utils/image.ts": {
      "url": "/src/utils/image.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/lodash/memoize"
      ]
    },
    "src/renderers/Table/index.tsx": {
      "url": "/src/renderers/Table/index.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/react-dom/index",
        "src/factory.tsx",
        "node_modules/lodash/forEach",
        "src/utils/tpl.ts",
        "src/renderers/DropDownButton.tsx",
        "src/components/Checkbox.tsx",
        "src/components/Button.tsx",
        "src/store/table.ts",
        "src/utils/helper.ts",
        "src/utils/tpl-builtin.ts",
        "node_modules/lodash/debounce",
        "node_modules/sortablejs/Sortable",
        "src/utils/resize-sensor.ts",
        "node_modules/lodash/find",
        "src/components/icons.tsx",
        "src/renderers/Table/TableCell.tsx",
        "src/renderers/Table/HeadCellFilterDropdown.tsx",
        "src/renderers/Table/HeadCellSearchDropdown.tsx",
        "src/renderers/Table/TableContent.tsx",
        "src/utils/image.ts",
        "src/renderers/Table/TableBody.tsx",
        "node_modules/mobx-state-tree/dist/mobx-state-tree"
      ]
    },
    "src/renderers/Card.tsx": {
      "url": "/src/renderers/Card.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/react-dom/index",
        "src/factory.tsx",
        "src/utils/tpl.ts",
        "src/components/Checkbox.tsx",
        "src/utils/helper.ts",
        "src/utils/tpl-builtin.ts",
        "src/renderers/QuickEdit.tsx",
        "src/renderers/PopOver.tsx",
        "src/renderers/Table/index.tsx",
        "src/renderers/Copyable.tsx",
        "src/components/icons.tsx"
      ]
    },
    "src/renderers/Custom.tsx": {
      "url": "/src/renderers/Custom.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/lodash/memoize",
        "src/factory.tsx",
        "src/utils/helper.ts"
      ]
    },
    "src/renderers/Date.tsx": {
      "url": "/src/renderers/Date.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "node_modules/moment/moment"
      ]
    },
    "src/renderers/Dialog.tsx": {
      "url": "/src/renderers/Dialog.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/Scoped.tsx",
        "src/factory.tsx",
        "src/utils/tpl.ts",
        "src/components/Modal.tsx",
        "node_modules/lodash/findLast",
        "src/utils/helper.ts",
        "node_modules/mobx/lib/index",
        "src/components/icons.tsx",
        "src/store/modal.ts",
        "node_modules/react-dom/index",
        "src/components/index.tsx",
        "node_modules/mobx-state-tree/dist/mobx-state-tree"
      ]
    },
    "src/renderers/Divider.tsx": {
      "url": "/src/renderers/Divider.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx"
      ]
    },
    "src/renderers/Each.tsx": {
      "url": "/src/renderers/Each.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/utils/tpl-builtin.ts",
        "src/utils/helper.ts"
      ]
    },
    "src/renderers/Flex.tsx": {
      "url": "/src/renderers/Flex.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx"
      ]
    },
    "src/renderers/Form/index.tsx": {
      "url": "/src/renderers/Form/index.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/store/form.ts",
        "src/utils/tpl.ts",
        "node_modules/classnames/index",
        "src/utils/filter-schema.ts",
        "src/utils/helper.ts",
        "node_modules/lodash/debounce",
        "node_modules/lodash/flatten",
        "node_modules/lodash/find",
        "src/Scoped.tsx",
        "node_modules/qs/lib/index",
        "src/utils/tpl-builtin.ts",
        "src/utils/api.ts",
        "src/components/Spinner.tsx",
        "src/components/index.tsx",
        "node_modules/mobx-state-tree/dist/mobx-state-tree",
        "src/renderers/Form/Item.tsx",
        "src/utils/SimpleMap.ts"
      ]
    },
    "src/renderers/Form/Control.tsx": {
      "url": "/src/renderers/Form/Control.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/lodash/debounce",
        "src/factory.tsx",
        "src/store/combo.ts",
        "src/utils/helper.ts",
        "src/Scoped.tsx",
        "node_modules/mobx/lib/index",
        "src/store/formItem.ts",
        "node_modules/mobx-state-tree/dist/mobx-state-tree",
        "node_modules/mobx-react/dist/index",
        "src/WithRootStore.tsx"
      ]
    },
    "src/renderers/Form/Hidden.tsx": {
      "url": "/src/renderers/Form/Hidden.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Item.tsx"
      ]
    },
    "src/renderers/Form/Text.tsx": {
      "url": "/src/renderers/Form/Text.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Options.tsx",
        "node_modules/downshift/dist/downshift.cjs",
        "node_modules/match-sorter/dist/match-sorter.cjs",
        "node_modules/lodash/debounce",
        "src/utils/tpl.ts",
        "node_modules/lodash/find",
        "src/components/icons.tsx",
        "src/components/Input.tsx",
        "src/utils/helper.ts",
        "src/utils/api.ts",
        "src/components/Spinner.tsx",
        "src/utils/icon.tsx"
      ]
    },
    "src/components/ListMenu.tsx": {
      "url": "/src/components/ListMenu.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "src/theme.tsx",
        "node_modules/react/index",
        "src/locale.tsx"
      ]
    },
    "src/renderers/Form/Tag.tsx": {
      "url": "/src/renderers/Form/Tag.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Options.tsx",
        "node_modules/downshift/dist/downshift.cjs",
        "node_modules/lodash/find",
        "node_modules/react-dom/index",
        "src/components/ResultBox.tsx",
        "src/utils/helper.ts",
        "src/components/Spinner.tsx",
        "src/components/Overlay.tsx",
        "src/components/PopOver.tsx",
        "src/components/ListMenu.tsx"
      ]
    },
    "src/renderers/Form/Number.tsx": {
      "url": "/src/renderers/Form/Number.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Item.tsx",
        "node_modules/classnames/index",
        "src/utils/tpl.ts",
        "src/components/NumberInput.tsx"
      ]
    },
    "src/renderers/Form/Textarea.tsx": {
      "url": "/src/renderers/Form/Textarea.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Item.tsx",
        "node_modules/classnames/index",
        "src/components/Textarea.tsx",
        "node_modules/react-dom/index",
        "src/utils/helper.ts"
      ]
    },
    "src/renderers/Form/Checkboxes.tsx": {
      "url": "/src/renderers/Form/Checkboxes.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Options.tsx",
        "src/components/Checkbox.tsx",
        "node_modules/lodash/chunk",
        "src/components/icons.tsx",
        "src/utils/helper.ts"
      ]
    },
    "src/renderers/Form/Checkbox.tsx": {
      "url": "/src/renderers/Form/Checkbox.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Item.tsx",
        "node_modules/classnames/index",
        "src/components/Checkbox.tsx"
      ]
    },
    "src/renderers/Form/CityDB.ts": {
      "url": "/src/renderers/Form/CityDB.js",
      "type": "js"
    },
    "src/renderers/Form/City.tsx": {
      "url": "/src/renderers/Form/City.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Item.tsx",
        "src/theme.tsx",
        "src/components/index.tsx",
        "src/utils/helper.ts",
        "src/renderers/Form/Options.tsx",
        "src/locale.tsx"
      ]
    },
    "src/renderers/Form/ChartRadios.tsx": {
      "url": "/src/renderers/Form/ChartRadios.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Options.tsx",
        "src/utils/helper.ts"
      ]
    },
    "src/renderers/Form/Rating.tsx": {
      "url": "/src/renderers/Form/Rating.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Item.tsx",
        "src/components/Rating.tsx"
      ]
    },
    "src/renderers/Form/Switch.tsx": {
      "url": "/src/renderers/Form/Switch.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Item.tsx",
        "src/components/Switch.tsx"
      ]
    },
    "src/renderers/Form/Button.tsx": {
      "url": "/src/renderers/Form/Button.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Item.tsx"
      ]
    },
    "src/renderers/Form/ButtonToolbar.tsx": {
      "url": "/src/renderers/Form/ButtonToolbar.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Item.tsx",
        "node_modules/classnames/index"
      ]
    },
    "src/renderers/Form/Radios.tsx": {
      "url": "/src/renderers/Form/Radios.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/classnames/index",
        "src/components/Radios.tsx",
        "src/renderers/Form/Options.tsx",
        "src/utils/helper.ts"
      ]
    },
    "src/renderers/Form/List.tsx": {
      "url": "/src/renderers/Form/List.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Options.tsx",
        "src/utils/helper.ts"
      ]
    },
    "src/components/BaiduMapPicker.tsx": {
      "url": "/src/components/BaiduMapPicker.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/theme.tsx",
        "src/utils/helper.ts",
        "node_modules/lodash/debounce",
        "src/components/icons.tsx"
      ]
    },
    "src/components/LocationPicker.tsx": {
      "url": "/src/components/LocationPicker.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/theme.tsx",
        "src/components/Overlay.tsx",
        "src/components/PopOver.tsx",
        "src/components/icons.tsx",
        "src/utils/helper.ts",
        "src/components/Alert2.tsx",
        "src/components/BaiduMapPicker.tsx",
        "src/locale.tsx"
      ]
    },
    "src/renderers/Form/Location.tsx": {
      "url": "/src/renderers/Form/Location.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Item.tsx",
        "src/components/LocationPicker.tsx"
      ]
    },
    "src/renderers/Form/Select.tsx": {
      "url": "/src/renderers/Form/Select.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/classnames/index",
        "src/renderers/Form/Options.tsx",
        "src/components/Select.tsx",
        "node_modules/lodash/find",
        "node_modules/lodash/debounce",
        "src/utils/api.ts",
        "src/utils/helper.ts"
      ]
    },
    "src/renderers/Form/Static.tsx": {
      "url": "/src/renderers/Form/Static.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Item.tsx",
        "src/renderers/Table/index.tsx",
        "src/renderers/PopOver.tsx",
        "src/renderers/QuickEdit.tsx",
        "src/factory.tsx",
        "src/renderers/Copyable.tsx",
        "src/utils/helper.ts"
      ]
    },
    "src/renderers/Form/Date.tsx": {
      "url": "/src/renderers/Form/Date.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Item.tsx",
        "src/utils/tpl-builtin.ts",
        "node_modules/moment/moment",
        "node_modules/moment/locale/zh-cn",
        "src/components/DatePicker.tsx"
      ]
    },
    "src/renderers/Form/DateRange.tsx": {
      "url": "/src/renderers/Form/DateRange.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Item.tsx",
        "node_modules/classnames/index",
        "src/utils/tpl-builtin.ts",
        "node_modules/moment/locale/zh-cn",
        "src/components/DateRangePicker.tsx"
      ]
    },
    "src/renderers/Form/Repeat.tsx": {
      "url": "/src/renderers/Form/Repeat.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/classnames/index",
        "src/renderers/Form/Item.tsx",
        "src/components/Select.tsx",
        "src/components/Range.tsx"
      ]
    },
    "src/renderers/Form/Tree.tsx": {
      "url": "/src/renderers/Form/Tree.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/classnames/index",
        "src/components/Tree.tsx",
        "src/renderers/Form/Options.tsx",
        "src/components/index.tsx"
      ]
    },
    "src/renderers/Form/TreeSelect.tsx": {
      "url": "/src/renderers/Form/TreeSelect.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/components/Overlay.tsx",
        "src/components/PopOver.tsx",
        "src/renderers/Form/Options.tsx",
        "src/components/Tree.tsx",
        "node_modules/match-sorter/dist/match-sorter.cjs",
        "node_modules/lodash/debounce",
        "node_modules/lodash/find",
        "src/utils/api.ts",
        "src/components/Spinner.tsx",
        "src/components/ResultBox.tsx",
        "src/utils/helper.ts",
        "node_modules/react-dom/index"
      ]
    },
    "src/renderers/Form/File.tsx": {
      "url": "/src/renderers/Form/File.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Item.tsx",
        "node_modules/lodash/find",
        "node_modules/lodash/isPlainObject",
        "node_modules/async/mapLimit",
        "src/renderers/Form/Image.tsx",
        "src/utils/helper.ts",
        "src/utils/api.ts",
        "src/components/Button.tsx",
        "src/components/icons.tsx",
        "node_modules/react-dropzone/dist/index",
        "src/utils/tpl-builtin.ts"
      ]
    },
    "src/renderers/Form/Image.tsx": {
      "url": "/src/renderers/Form/Image.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Item.tsx",
        "node_modules/react-cropper/dist/react-cropper",
        "node_modules/react-dropzone/dist/index",
        "node_modules/blueimp-canvastoblob/js/canvas-to-blob",
        "node_modules/lodash/find",
        "node_modules/qs/lib/index",
        "src/utils/api.ts",
        "src/utils/helper.ts",
        "src/components/icons.tsx",
        "src/components/Button.tsx",
        "node_modules/attr-accept/dist/index",
        "src/renderers/Form/File.tsx",
        "src/renderers/Image.tsx",
        "src/utils/tpl-builtin.ts",
        "src/utils/tpl.ts"
      ]
    },
    "src/renderers/Image.tsx": {
      "url": "/src/renderers/Image.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/utils/tpl.ts",
        "src/theme.tsx",
        "src/utils/helper.ts",
        "src/components/icons.tsx",
        "src/locale.tsx"
      ]
    },
    "src/renderers/Form/UUID.tsx": {
      "url": "/src/renderers/Form/UUID.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/utils/helper.ts",
        "src/renderers/Form/Item.tsx"
      ]
    },
    "src/renderers/Form/Matrix.tsx": {
      "url": "/src/renderers/Form/Matrix.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Item.tsx",
        "src/utils/api.ts",
        "src/components/index.tsx",
        "src/utils/helper.ts"
      ]
    },
    "src/components/MonthRangePicker.tsx": {
      "url": "/src/components/MonthRangePicker.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/moment/moment",
        "node_modules/react-dom/index",
        "node_modules/classnames/index",
        "src/components/icons.tsx",
        "src/components/Overlay.tsx",
        "src/components/calendar/Calendar.tsx",
        "src/components/PopOver.tsx",
        "src/theme.tsx",
        "src/locale.tsx",
        "src/components/DateRangePicker.tsx",
        "node_modules/lodash/capitalize"
      ]
    },
    "src/renderers/Form/MonthRange.tsx": {
      "url": "/src/renderers/Form/MonthRange.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Item.tsx",
        "node_modules/classnames/index",
        "src/utils/tpl-builtin.ts",
        "node_modules/moment/locale/zh-cn",
        "src/components/DateRangePicker.tsx",
        "src/components/MonthRangePicker.tsx"
      ]
    },
    "src/renderers/Form/Range.tsx": {
      "url": "/src/renderers/Form/Range.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/lodash/isNumber",
        "node_modules/lodash/isObject",
        "node_modules/lodash/isEqual",
        "src/renderers/Form/Item.tsx",
        "src/components/Range.tsx",
        "src/components/icons.tsx"
      ]
    },
    "src/renderers/Form/Combo.tsx": {
      "url": "/src/renderers/Form/Combo.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/react-dom/index",
        "src/renderers/Form/Item.tsx",
        "src/store/combo.ts",
        "src/components/Tabs.tsx",
        "src/utils/helper.ts",
        "node_modules/sortablejs/Sortable",
        "src/utils/tpl.ts",
        "node_modules/lodash/find",
        "src/components/Select.tsx",
        "src/utils/tpl-builtin.ts",
        "src/utils/api.ts",
        "src/components/index.tsx",
        "node_modules/lodash/memoize",
        "src/components/icons.tsx",
        "node_modules/mobx-state-tree/dist/mobx-state-tree"
      ]
    },
    "src/renderers/Form/Array.tsx": {
      "url": "/src/renderers/Form/Array.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Item.tsx",
        "src/store/combo.ts",
        "src/renderers/Form/Combo.tsx"
      ]
    },
    "src/components/condition-builder/types.ts": {
      "url": "/src/components/condition-builder/types.js",
      "type": "js"
    },
    "src/components/PopOverContainer.tsx": {
      "url": "/src/components/PopOverContainer.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/utils/helper.ts",
        "src/components/Overlay.tsx",
        "src/components/PopOver.tsx",
        "node_modules/react-dom/index"
      ]
    },
    "src/components/condition-builder/Field.tsx": {
      "url": "/src/components/condition-builder/Field.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/components/PopOverContainer.tsx",
        "src/components/ListRadios.tsx",
        "src/components/ResultBox.tsx",
        "src/theme.tsx",
        "src/components/icons.tsx",
        "src/utils/helper.ts"
      ]
    },
    "src/components/condition-builder/Value.tsx": {
      "url": "/src/components/condition-builder/Value.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/theme.tsx",
        "src/components/InputBox.tsx",
        "src/components/NumberInput.tsx",
        "src/components/DatePicker.tsx",
        "src/components/Select.tsx",
        "src/components/Switch.tsx",
        "src/locale.tsx"
      ]
    },
    "src/components/condition-builder/InputSwitch.tsx": {
      "url": "/src/components/condition-builder/InputSwitch.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/components/PopOverContainer.tsx",
        "src/components/icons.tsx",
        "src/components/ListRadios.tsx",
        "src/theme.tsx"
      ]
    },
    "src/components/condition-builder/Func.tsx": {
      "url": "/src/components/condition-builder/Func.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/theme.tsx",
        "src/components/PopOverContainer.tsx",
        "src/components/ListRadios.tsx",
        "src/utils/helper.ts",
        "src/components/ResultBox.tsx",
        "src/components/icons.tsx",
        "src/components/condition-builder/Expression.tsx"
      ]
    },
    "src/components/condition-builder/Expression.tsx": {
      "url": "/src/components/condition-builder/Expression.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/components/condition-builder/Field.tsx",
        "src/utils/helper.ts",
        "src/components/condition-builder/Value.tsx",
        "src/components/condition-builder/InputSwitch.tsx",
        "src/components/condition-builder/Func.tsx",
        "src/theme.tsx",
        "src/components/condition-builder/Formula.tsx"
      ]
    },
    "src/components/condition-builder/Formula.tsx": {
      "url": "/src/components/condition-builder/Formula.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/theme.tsx",
        "src/components/InputBox.tsx"
      ]
    },
    "src/components/condition-builder/config.ts": {
      "url": "/src/components/condition-builder/config.js",
      "type": "js"
    },
    "src/components/condition-builder/Item.tsx": {
      "url": "/src/components/condition-builder/Item.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/components/condition-builder/types.ts",
        "src/theme.tsx",
        "src/components/icons.tsx",
        "src/utils/helper.ts",
        "src/components/condition-builder/Expression.tsx",
        "src/components/condition-builder/config.ts",
        "src/components/PopOverContainer.tsx",
        "src/components/ListRadios.tsx",
        "src/components/ResultBox.tsx"
      ]
    },
    "src/components/condition-builder/GroupOrItem.tsx": {
      "url": "/src/components/condition-builder/GroupOrItem.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "src/theme.tsx",
        "node_modules/react/index",
        "src/components/icons.tsx",
        "src/utils/helper.ts",
        "src/components/condition-builder/Group.tsx",
        "src/components/condition-builder/Item.tsx"
      ]
    },
    "src/components/condition-builder/Group.tsx": {
      "url": "/src/components/condition-builder/Group.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/theme.tsx",
        "src/components/Button.tsx",
        "src/components/condition-builder/GroupOrItem.tsx",
        "src/utils/helper.ts",
        "src/components/icons.tsx"
      ]
    },
    "src/components/condition-builder/index.tsx": {
      "url": "/src/components/condition-builder/index.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/theme.tsx",
        "src/locale.tsx",
        "node_modules/uncontrollable/cjs/index",
        "src/components/condition-builder/Group.tsx",
        "src/components/condition-builder/config.ts",
        "src/utils/helper.ts",
        "src/utils/Animation.ts"
      ]
    },
    "src/renderers/Form/ConditionBuilder.tsx": {
      "url": "/src/renderers/Form/ConditionBuilder.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Item.tsx",
        "src/components/condition-builder/index.tsx"
      ]
    },
    "src/renderers/Container.tsx": {
      "url": "/src/renderers/Container.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx"
      ]
    },
    "src/renderers/Form/Container.tsx": {
      "url": "/src/renderers/Form/Container.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/classnames/index",
        "src/renderers/Container.tsx",
        "src/renderers/Form/Item.tsx"
      ]
    },
    "src/renderers/Form/SubForm.tsx": {
      "url": "/src/renderers/Form/SubForm.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Item.tsx",
        "node_modules/classnames/index",
        "node_modules/lodash/omit",
        "node_modules/lodash/pick",
        "src/utils/helper.ts",
        "src/components/icons.tsx"
      ]
    },
    "src/components/Tinymce.tsx": {
      "url": "/src/components/Tinymce.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/tinymce/tinymce",
        "node_modules/tinymce/icons/default/index",
        "node_modules/tinymce/themes/silver/index",
        "node_modules/tinymce/plugins/advlist/index",
        "node_modules/tinymce/plugins/autolink/index",
        "node_modules/tinymce/plugins/lists/index",
        "node_modules/tinymce/plugins/link/index",
        "node_modules/tinymce/plugins/image/index",
        "node_modules/tinymce/plugins/charmap/index",
        "node_modules/tinymce/plugins/print/index",
        "node_modules/tinymce/plugins/preview/index",
        "node_modules/tinymce/plugins/anchor/index",
        "node_modules/tinymce/plugins/searchreplace/index",
        "node_modules/tinymce/plugins/visualblocks/index",
        "node_modules/tinymce/plugins/code/index",
        "node_modules/tinymce/plugins/fullscreen/index",
        "node_modules/tinymce/plugins/insertdatetime/index",
        "node_modules/tinymce/plugins/media/index",
        "node_modules/tinymce/plugins/table/index",
        "node_modules/tinymce/plugins/paste/index",
        "node_modules/tinymce/plugins/help/index",
        "node_modules/tinymce/plugins/wordcount/index",
        "node_modules/tinymce/plugins/hr/index",
        "node_modules/tinymce/plugins/pagebreak/index",
        "node_modules/tinymce/plugins/spellchecker/index",
        "node_modules/tinymce/plugins/visualchars/index",
        "node_modules/tinymce/plugins/template/index",
        "node_modules/tinymce/plugins/nonbreaking/index",
        "node_modules/tinymce/plugins/emoticons/index",
        "node_modules/tinymce/plugins/emoticons/js/emojis"
      ]
    },
    "src/components/RichText.tsx": {
      "url": "/src/components/RichText.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/jquery/dist/jquery",
        "node_modules/froala-editor/js/froala_editor.min",
        "node_modules/froala-editor/js/plugins/align.min",
        "node_modules/froala-editor/js/plugins/char_counter.min",
        "node_modules/froala-editor/js/plugins/code_beautifier.min",
        "node_modules/froala-editor/js/plugins/code_view.min",
        "node_modules/froala-editor/js/plugins/colors.min",
        "node_modules/froala-editor/js/plugins/draggable.min",
        "node_modules/froala-editor/js/plugins/emoticons.min",
        "node_modules/froala-editor/js/plugins/entities.min",
        "node_modules/froala-editor/js/plugins/font_family.min",
        "node_modules/froala-editor/js/plugins/font_size.min",
        "node_modules/froala-editor/js/plugins/forms.min",
        "node_modules/froala-editor/js/plugins/fullscreen.min",
        "node_modules/froala-editor/js/plugins/help.min",
        "node_modules/froala-editor/js/plugins/image.min",
        "node_modules/froala-editor/js/plugins/image_manager.min",
        "node_modules/froala-editor/js/plugins/inline_class.min",
        "node_modules/froala-editor/js/plugins/inline_style.min",
        "node_modules/froala-editor/js/plugins/line_breaker.min",
        "node_modules/froala-editor/js/plugins/line_height.min",
        "node_modules/froala-editor/js/plugins/link.min",
        "node_modules/froala-editor/js/plugins/lists.min",
        "node_modules/froala-editor/js/plugins/paragraph_format.min",
        "node_modules/froala-editor/js/plugins/paragraph_style.min",
        "node_modules/froala-editor/js/plugins/print.min",
        "node_modules/froala-editor/js/plugins/quick_insert.min",
        "node_modules/froala-editor/js/plugins/quote.min",
        "node_modules/froala-editor/js/plugins/save.min",
        "node_modules/froala-editor/js/plugins/special_characters.min",
        "node_modules/froala-editor/js/plugins/table.min",
        "node_modules/froala-editor/js/plugins/url.min",
        "node_modules/froala-editor/js/plugins/video.min",
        "node_modules/froala-editor/js/plugins/word_paste.min",
        "src/utils/resize-sensor.ts"
      ]
    },
    "src/renderers/Form/RichText.tsx": {
      "url": "/src/renderers/Form/RichText.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Item.tsx",
        "node_modules/classnames/index",
        "src/components/LazyComponent.tsx"
      ]
    },
    "src/renderers/Form/Editor.tsx": {
      "url": "/src/renderers/Form/Editor.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Item.tsx",
        "src/components/LazyComponent.tsx",
        "src/components/Editor.tsx",
        "src/utils/helper.ts"
      ]
    },
    "src/renderers/Form/DiffEditor.tsx": {
      "url": "/src/renderers/Form/DiffEditor.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/renderers/Form/Item.tsx",
        "src/components/LazyComponent.tsx",
        "src/utils/tpl-builtin.ts",
        "src/utils/helper.ts"
      ]
    },
    "src/renderers/Grid.tsx": {
      "url": "/src/renderers/Grid.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "node_modules/lodash/pick"
      ]
    },
    "src/renderers/Form/Grid.tsx": {
      "url": "/src/renderers/Form/Grid.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "src/renderers/Grid.tsx",
        "src/renderers/Form/Item.tsx",
        "node_modules/react/index"
      ]
    },
    "src/renderers/Form/HBox.tsx": {
      "url": "/src/renderers/Form/HBox.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Item.tsx",
        "node_modules/classnames/index",
        "src/utils/helper.ts"
      ]
    },
    "src/renderers/Panel.tsx": {
      "url": "/src/renderers/Panel.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/utils/helper.ts",
        "node_modules/react-dom/index",
        "src/utils/resize-sensor.ts"
      ]
    },
    "src/renderers/Form/Panel.tsx": {
      "url": "/src/renderers/Form/Panel.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/renderers/Panel.tsx",
        "node_modules/classnames/index"
      ]
    },
    "src/renderers/Form/Color.tsx": {
      "url": "/src/renderers/Form/Color.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Item.tsx",
        "node_modules/classnames/index",
        "src/components/ColorPicker.tsx"
      ]
    },
    "src/renderers/Form/ChainedSelect.tsx": {
      "url": "/src/renderers/Form/ChainedSelect.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/classnames/index",
        "src/renderers/Form/Options.tsx",
        "src/components/Select.tsx",
        "src/utils/api.ts"
      ]
    },
    "src/renderers/Form/NestedSelect.tsx": {
      "url": "/src/renderers/Form/NestedSelect.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/components/Overlay.tsx",
        "src/components/Checkbox.tsx",
        "src/components/PopOver.tsx",
        "node_modules/react-overlays/lib/index",
        "src/components/icons.tsx",
        "src/utils/helper.ts",
        "src/renderers/Form/Options.tsx",
        "src/components/Select.tsx",
        "node_modules/react-dom/index",
        "src/components/index.tsx",
        "node_modules/lodash/xor",
        "node_modules/lodash/union"
      ]
    },
    "src/renderers/Form/Transfer.tsx": {
      "url": "/src/renderers/Form/Transfer.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "src/renderers/Form/Options.tsx",
        "node_modules/react/index",
        "src/components/Transfer.tsx",
        "src/utils/helper.ts",
        "src/components/Spinner.tsx",
        "node_modules/lodash/find",
        "src/components/Select.tsx",
        "src/utils/tpl-builtin.ts"
      ]
    },
    "src/renderers/Service.tsx": {
      "url": "/src/renderers/Service.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/store/service.ts",
        "src/utils/tpl.ts",
        "src/Scoped.tsx",
        "src/utils/api.ts",
        "src/components/index.tsx",
        "src/utils/helper.ts"
      ]
    },
    "src/renderers/Form/Service.tsx": {
      "url": "/src/renderers/Form/Service.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/renderers/Service.tsx",
        "src/Scoped.tsx",
        "src/store/service.ts",
        "src/utils/helper.ts"
      ]
    },
    "src/renderers/Form/Table.tsx": {
      "url": "/src/renderers/Form/Table.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Item.tsx",
        "node_modules/classnames/index",
        "src/components/Button.tsx",
        "src/utils/helper.ts",
        "src/utils/api.ts",
        "src/utils/tpl.ts",
        "node_modules/lodash/omit",
        "src/utils/tpl-builtin.ts",
        "node_modules/lodash/findIndex",
        "node_modules/lodash/memoize",
        "src/utils/SimpleMap.ts",
        "src/components/icons.tsx"
      ]
    },
    "src/renderers/Form/Picker.tsx": {
      "url": "/src/renderers/Form/Picker.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Options.tsx",
        "node_modules/classnames/index",
        "src/types.ts",
        "node_modules/lodash/find",
        "src/utils/helper.ts",
        "node_modules/lodash/findIndex",
        "src/components/Html.tsx",
        "src/utils/tpl.ts",
        "src/components/icons.tsx",
        "src/utils/api.ts"
      ]
    },
    "src/renderers/Form/IconPicker.tsx": {
      "url": "/src/renderers/Form/IconPicker.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/classnames/index",
        "node_modules/match-sorter/dist/match-sorter.cjs",
        "node_modules/keycode/index",
        "node_modules/downshift/dist/downshift.cjs",
        "src/utils/helper.ts",
        "src/renderers/Form/IconPickerIcons.tsx",
        "src/renderers/Form/Item.tsx"
      ]
    },
    "src/renderers/Form/Formula.tsx": {
      "url": "/src/renderers/Form/Formula.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/renderers/Form/Item.tsx",
        "src/utils/tpl.ts",
        "src/utils/helper.ts"
      ]
    },
    "src/renderers/Form/FieldSet.tsx": {
      "url": "/src/renderers/Form/FieldSet.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/renderers/Collapse.tsx"
      ]
    },
    "src/renderers/Tabs.tsx": {
      "url": "/src/renderers/Tabs.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "node_modules/lodash/find",
        "src/utils/helper.ts",
        "node_modules/lodash/findIndex",
        "src/components/Tabs.tsx",
        "src/utils/tpl.ts",
        "src/utils/tpl-builtin.ts"
      ]
    },
    "src/renderers/Form/Tabs.tsx": {
      "url": "/src/renderers/Form/Tabs.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/lodash/find",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/renderers/Tabs.tsx"
      ]
    },
    "src/renderers/Form/TabsTransfer.tsx": {
      "url": "/src/renderers/Form/TabsTransfer.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "src/renderers/Form/Options.tsx",
        "node_modules/react/index",
        "src/components/Spinner.tsx",
        "src/renderers/Form/Transfer.tsx",
        "src/components/TabsTransfer.tsx"
      ]
    },
    "src/renderers/Form/Group.tsx": {
      "url": "/src/renderers/Form/Group.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/utils/helper.ts",
        "src/renderers/Form/Item.tsx",
        "src/utils/filter-schema.ts"
      ]
    },
    "src/renderers/Form/InputGroup.tsx": {
      "url": "/src/renderers/Form/InputGroup.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/utils/helper.ts",
        "src/utils/filter-schema.ts",
        "src/renderers/Form/Item.tsx"
      ]
    },
    "src/renderers/Grid2D.tsx": {
      "url": "/src/renderers/Grid2D.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/utils/helper.ts"
      ]
    },
    "src/renderers/HBox.tsx": {
      "url": "/src/renderers/HBox.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "node_modules/classnames/index",
        "src/utils/helper.ts"
      ]
    },
    "src/renderers/VBox.tsx": {
      "url": "/src/renderers/VBox.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "node_modules/classnames/index"
      ]
    },
    "src/renderers/Images.tsx": {
      "url": "/src/renderers/Images.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/utils/tpl.ts",
        "src/utils/tpl-builtin.ts",
        "src/renderers/Image.tsx",
        "src/utils/helper.ts"
      ]
    },
    "src/renderers/List.tsx": {
      "url": "/src/renderers/List.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/react-dom/index",
        "src/factory.tsx",
        "src/utils/tpl.ts",
        "src/components/Button.tsx",
        "src/components/Checkbox.tsx",
        "src/store/list.ts",
        "src/utils/helper.ts",
        "src/utils/tpl-builtin.ts",
        "src/renderers/QuickEdit.tsx",
        "src/renderers/PopOver.tsx",
        "node_modules/sortablejs/Sortable",
        "src/renderers/Table/index.tsx",
        "src/renderers/Copyable.tsx",
        "src/components/icons.tsx"
      ]
    },
    "src/renderers/Log.tsx": {
      "url": "/src/renderers/Log.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "node_modules/ansi-to-react/lib/index",
        "src/utils/api.ts"
      ]
    },
    "src/renderers/Operation.tsx": {
      "url": "/src/renderers/Operation.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx"
      ]
    },
    "src/renderers/Page.tsx": {
      "url": "/src/renderers/Page.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/store/service.ts",
        "src/utils/tpl.ts",
        "src/utils/helper.ts",
        "src/Scoped.tsx",
        "src/components/Alert2.tsx",
        "src/utils/api.ts",
        "src/components/index.tsx"
      ]
    },
    "src/renderers/PaginationWrapper.tsx": {
      "url": "/src/renderers/PaginationWrapper.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/store/pagination.ts"
      ]
    },
    "src/renderers/Plain.tsx": {
      "url": "/src/renderers/Plain.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/utils/tpl.ts"
      ]
    },
    "src/renderers/Property.tsx": {
      "url": "/src/renderers/Property.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/utils/tpl-builtin.ts",
        "src/utils/helper.ts"
      ]
    },
    "src/renderers/Spinner.tsx": {
      "url": "/src/renderers/Spinner.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "src/components/Spinner.tsx",
        "src/factory.tsx",
        "node_modules/react/index"
      ]
    },
    "src/renderers/Tpl.tsx": {
      "url": "/src/renderers/Tpl.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/utils/tpl.ts",
        "src/utils/helper.ts",
        "src/utils/tpl-builtin.ts"
      ]
    },
    "src/renderers/Mapping.tsx": {
      "url": "/src/renderers/Mapping.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx"
      ]
    },
    "src/renderers/Progress.tsx": {
      "url": "/src/renderers/Progress.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx"
      ]
    },
    "src/renderers/Status.tsx": {
      "url": "/src/renderers/Status.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/utils/tpl.ts",
        "src/components/icons.tsx"
      ]
    },
    "src/renderers/Json.tsx": {
      "url": "/src/renderers/Json.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "node_modules/react-json-tree/lib/index",
        "src/utils/helper.ts",
        "src/utils/tpl-builtin.ts"
      ]
    },
    "src/renderers/Link.tsx": {
      "url": "/src/renderers/Link.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/utils/tpl.ts"
      ]
    },
    "src/renderers/Switch.tsx": {
      "url": "/src/renderers/Switch.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "node_modules/classnames/index",
        "src/components/Switch.tsx",
        "src/utils/tpl-builtin.ts"
      ]
    },
    "src/renderers/Wizard.tsx": {
      "url": "/src/renderers/Wizard.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/Scoped.tsx",
        "src/factory.tsx",
        "src/store/service.ts",
        "src/types.ts",
        "src/utils/tpl.ts",
        "src/utils/helper.ts",
        "src/utils/api.ts",
        "src/components/index.tsx",
        "node_modules/react-dom/index",
        "src/utils/resize-sensor.ts"
      ]
    },
    "src/renderers/Chart.tsx": {
      "url": "/src/renderers/Chart.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/store/service.ts",
        "src/utils/tpl.ts",
        "node_modules/classnames/index",
        "src/components/LazyComponent.tsx",
        "src/utils/resize-sensor.ts",
        "src/utils/tpl-builtin.ts",
        "src/utils/api.ts",
        "src/Scoped.tsx",
        "src/utils/helper.ts",
        "src/components/Spinner.tsx",
        "node_modules/mobx-state-tree/dist/mobx-state-tree"
      ]
    },
    "src/renderers/SearchBox.tsx": {
      "url": "/src/renderers/SearchBox.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "src/factory.tsx",
        "node_modules/react/index",
        "src/components/SearchBox.tsx",
        "src/utils/helper.ts"
      ]
    },
    "src/renderers/SparkLine.tsx": {
      "url": "/src/renderers/SparkLine.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "src/components/SparkLine.tsx",
        "src/factory.tsx",
        "node_modules/react/index",
        "src/utils/tpl-builtin.ts",
        "src/utils/helper.ts"
      ]
    },
    "src/renderers/Video.tsx": {
      "url": "/src/renderers/Video.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/video-react/lib/index",
        "src/utils/helper.ts",
        "node_modules/classnames/index",
        "src/factory.tsx",
        "src/utils/tpl-builtin.ts",
        "src/utils/tpl.ts"
      ]
    },
    "src/renderers/Audio.tsx": {
      "url": "/src/renderers/Audio.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/lodash/upperFirst",
        "src/factory.tsx",
        "src/utils/helper.ts",
        "src/components/icons.tsx",
        "src/utils/tpl-builtin.ts",
        "src/utils/tpl.ts"
      ]
    },
    "src/renderers/Nav.tsx": {
      "url": "/src/renderers/Nav.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/utils/filter-schema.ts",
        "src/utils/tpl.ts",
        "src/utils/helper.ts",
        "src/utils/tpl-builtin.ts",
        "src/utils/api.ts",
        "src/Scoped.tsx",
        "src/theme.tsx",
        "src/components/icons.tsx",
        "src/utils/icon.tsx"
      ]
    },
    "src/renderers/Tasks.tsx": {
      "url": "/src/renderers/Tasks.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "node_modules/immutability-helper/index",
        "src/utils/api.ts",
        "src/Scoped.tsx",
        "src/components/Spinner.tsx",
        "src/utils/helper.ts"
      ]
    },
    "src/renderers/Drawer.tsx": {
      "url": "/src/renderers/Drawer.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/Scoped.tsx",
        "src/factory.tsx",
        "src/components/Drawer.tsx",
        "node_modules/lodash/findLast",
        "src/utils/helper.ts",
        "node_modules/mobx/lib/index",
        "node_modules/react-dom/index",
        "src/store/modal.ts",
        "src/utils/tpl.ts",
        "src/components/index.tsx"
      ]
    },
    "src/renderers/Wrapper.tsx": {
      "url": "/src/renderers/Wrapper.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx"
      ]
    },
    "src/renderers/IFrame.tsx": {
      "url": "/src/renderers/IFrame.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/utils/helper.ts",
        "src/Scoped.tsx",
        "src/utils/api.ts"
      ]
    },
    "src/renderers/QRCode.tsx": {
      "url": "/src/renderers/QRCode.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/classnames/index",
        "src/factory.tsx",
        "src/renderers/Form/Item.tsx",
        "src/utils/tpl.ts",
        "node_modules/qrcode.react/lib/index"
      ]
    },
    "src/renderers/Icon.tsx": {
      "url": "/src/renderers/Icon.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx"
      ]
    },
    "src/renderers/Carousel.tsx": {
      "url": "/src/renderers/Carousel.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "node_modules/react-transition-group/Transition",
        "src/factory.tsx",
        "src/utils/tpl-builtin.ts",
        "src/utils/helper.ts",
        "src/components/icons.tsx"
      ]
    },
    "src/renderers/AnchorNav.tsx": {
      "url": "/src/renderers/AnchorNav.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/components/AnchorNav.tsx",
        "src/utils/helper.ts",
        "src/utils/tpl.ts",
        "node_modules/lodash/lodash"
      ]
    },
    "src/renderers/Form/AnchorNav.tsx": {
      "url": "/src/renderers/Form/AnchorNav.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "node_modules/react/index",
        "src/factory.tsx",
        "src/renderers/AnchorNav.tsx"
      ]
    },
    "src/compat.ts": {
      "url": "/src/compat.js",
      "type": "js",
      "deps": [
        "src/factory.tsx",
        "src/renderers/Form/Checkbox.tsx",
        "src/renderers/Form/index.tsx",
        "src/renderers/Form/FieldSet.tsx",
        "src/renderers/Form/Tabs.tsx",
        "src/renderers/Card.tsx",
        "src/renderers/List.tsx",
        "src/renderers/Form/ButtonGroup.tsx",
        "src/utils/helper.ts",
        "src/renderers/Form/Service.tsx",
        "src/renderers/Form/File.tsx",
        "src/renderers/Form/Image.tsx",
        "src/renderers/Form/RichText.tsx"
      ]
    },
    "src/envOverwrite.ts": {
      "url": "/src/envOverwrite.js",
      "type": "js",
      "deps": [
        "src/factory.tsx"
      ]
    },
    "src/themes/default.ts": {
      "url": "/src/themes/default.js",
      "type": "js",
      "deps": [
        "src/theme.tsx"
      ]
    },
    "src/themes/cxd.ts": {
      "url": "/src/themes/cxd.js",
      "type": "js",
      "deps": [
        "src/theme.tsx"
      ]
    },
    "src/themes/dark.ts": {
      "url": "/src/themes/dark.js",
      "type": "js",
      "deps": [
        "src/theme.tsx"
      ]
    },
    "src/themes/antd.ts": {
      "url": "/src/themes/antd.js",
      "type": "js",
      "deps": [
        "src/theme.tsx"
      ]
    },
    "src/index.tsx": {
      "url": "/src/index.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "src/factory.tsx",
        "src/utils/api.ts",
        "src/utils/tpl.ts",
        "src/utils/helper.ts",
        "src/utils/resize-sensor.ts",
        "src/renderers/Form/IconPickerIcons.tsx",
        "src/components/icons.tsx",
        "src/store/index.ts",
        "src/locale.tsx",
        "src/locale/zh-CN.ts",
        "src/utils/Animation.ts",
        "src/Schema.ts",
        "src/renderers/Action.tsx",
        "src/renderers/Alert.tsx",
        "src/renderers/App.tsx",
        "src/renderers/Avatar.tsx",
        "src/renderers/Remark.tsx",
        "src/renderers/ButtonGroup.tsx",
        "src/renderers/ButtonToolbar.tsx",
        "src/renderers/Breadcrumb.tsx",
        "src/renderers/DropDownButton.tsx",
        "src/renderers/Collapse.tsx",
        "src/renderers/Color.tsx",
        "src/renderers/CRUD.tsx",
        "src/renderers/Pagination.tsx",
        "src/renderers/Cards.tsx",
        "src/renderers/Card.tsx",
        "src/renderers/Custom.tsx",
        "src/renderers/Date.tsx",
        "src/renderers/Dialog.tsx",
        "src/renderers/Divider.tsx",
        "src/renderers/Each.tsx",
        "src/renderers/Flex.tsx",
        "src/renderers/Form/index.tsx",
        "src/renderers/Form/Control.tsx",
        "src/renderers/Form/Hidden.tsx",
        "src/renderers/Form/Text.tsx",
        "src/renderers/Form/Tag.tsx",
        "src/renderers/Form/Number.tsx",
        "src/renderers/Form/Textarea.tsx",
        "src/renderers/Form/Checkboxes.tsx",
        "src/renderers/Form/Checkbox.tsx",
        "src/renderers/Form/City.tsx",
        "src/renderers/Form/ChartRadios.tsx",
        "src/renderers/Form/Rating.tsx",
        "src/renderers/Form/Switch.tsx",
        "src/renderers/Form/Button.tsx",
        "src/renderers/Form/ButtonGroup.tsx",
        "src/renderers/Form/ButtonToolbar.tsx",
        "src/renderers/Form/Radios.tsx",
        "src/renderers/Form/List.tsx",
        "src/renderers/Form/Location.tsx",
        "src/renderers/Form/Select.tsx",
        "src/renderers/Form/Static.tsx",
        "src/renderers/Form/Date.tsx",
        "src/renderers/Form/DateRange.tsx",
        "src/renderers/Form/Repeat.tsx",
        "src/renderers/Form/Tree.tsx",
        "src/renderers/Form/TreeSelect.tsx",
        "src/renderers/Form/Image.tsx",
        "src/renderers/Form/File.tsx",
        "src/renderers/Form/UUID.tsx",
        "src/renderers/Form/Matrix.tsx",
        "src/renderers/Form/MonthRange.tsx",
        "src/renderers/Form/Range.tsx",
        "src/renderers/Form/Array.tsx",
        "src/renderers/Form/Combo.tsx",
        "src/renderers/Form/ConditionBuilder.tsx",
        "src/renderers/Form/Container.tsx",
        "src/renderers/Form/SubForm.tsx",
        "src/renderers/Form/RichText.tsx",
        "src/renderers/Form/Editor.tsx",
        "src/renderers/Form/DiffEditor.tsx",
        "src/renderers/Form/Grid.tsx",
        "src/renderers/Form/HBox.tsx",
        "src/renderers/Form/Panel.tsx",
        "src/renderers/Form/Color.tsx",
        "src/renderers/Form/ChainedSelect.tsx",
        "src/renderers/Form/NestedSelect.tsx",
        "src/renderers/Form/Transfer.tsx",
        "src/renderers/Form/Service.tsx",
        "src/renderers/Form/Table.tsx",
        "src/renderers/Form/Picker.tsx",
        "src/renderers/Form/IconPicker.tsx",
        "src/renderers/Form/Formula.tsx",
        "src/renderers/Form/FieldSet.tsx",
        "src/renderers/Form/Tabs.tsx",
        "src/renderers/Form/TabsTransfer.tsx",
        "src/renderers/Form/Group.tsx",
        "src/renderers/Form/InputGroup.tsx",
        "src/renderers/Grid.tsx",
        "src/renderers/Grid2D.tsx",
        "src/renderers/HBox.tsx",
        "src/renderers/VBox.tsx",
        "src/renderers/Image.tsx",
        "src/renderers/Images.tsx",
        "src/renderers/List.tsx",
        "src/renderers/Log.tsx",
        "src/renderers/Operation.tsx",
        "src/renderers/Page.tsx",
        "src/renderers/PaginationWrapper.tsx",
        "src/renderers/Panel.tsx",
        "src/renderers/Plain.tsx",
        "src/renderers/Property.tsx",
        "src/renderers/Spinner.tsx",
        "src/renderers/Table/index.tsx",
        "src/renderers/Tabs.tsx",
        "src/renderers/Tpl.tsx",
        "src/renderers/Mapping.tsx",
        "src/renderers/Progress.tsx",
        "src/renderers/Status.tsx",
        "src/renderers/Json.tsx",
        "src/renderers/Link.tsx",
        "src/renderers/Switch.tsx",
        "src/renderers/Wizard.tsx",
        "src/renderers/Chart.tsx",
        "src/renderers/Container.tsx",
        "src/renderers/SearchBox.tsx",
        "src/renderers/Service.tsx",
        "src/renderers/SparkLine.tsx",
        "src/renderers/Video.tsx",
        "src/renderers/Audio.tsx",
        "src/renderers/Nav.tsx",
        "src/renderers/Tasks.tsx",
        "src/renderers/Drawer.tsx",
        "src/renderers/Wrapper.tsx",
        "src/renderers/IFrame.tsx",
        "src/renderers/QRCode.tsx",
        "src/renderers/Icon.tsx",
        "src/renderers/Carousel.tsx",
        "src/renderers/AnchorNav.tsx",
        "src/renderers/Form/AnchorNav.tsx",
        "src/Scoped.tsx",
        "src/renderers/Form/Item.tsx",
        "src/compat.ts",
        "src/envOverwrite.ts",
        "src/themes/default.ts",
        "src/themes/cxd.ts",
        "src/themes/dark.ts",
        "src/themes/antd.ts",
        "src/utils/tpl-builtin.ts",
        "src/utils/validations.ts",
        "src/components/Select.tsx",
        "src/renderers/Form/Options.tsx",
        "src/theme.tsx",
        "src/components/index.tsx"
      ]
    },
    "examples/mobile.tsx": {
      "url": "/examples/mobile.js",
      "type": "js",
      "deps": [
        "node_modules/tslib/tslib",
        "examples/polyfills/index.ts",
        "node_modules/react/index",
        "node_modules/react-dom/index",
        "node_modules/axios/index",
        "node_modules/copy-to-clipboard/index",
        "src/components/Toast.tsx",
        "src/locale/en-US.ts",
        "src/index.tsx"
      ]
    }
  },
  "pkg": {
    "p0": {
      "url": "/pkg/npm.js",
      "type": "js"
    }
  }
});