import _defineProperty from '@babel/runtime/helpers/defineProperty';
import React, { useRef, useEffect } from 'react';

var BASE_URL = "https://static.neshan.org";
var DEFAULT_URL = "".concat(BASE_URL, "/sdk/leaflet/1.4.0/leaflet.js");
var DEFAULT_URL_STYLE = "".concat(BASE_URL, "/sdk/leaflet/1.4.0/leaflet.css");
var neshan_map_loader = (function (props) {
  var createScript = function createScript() {
    var onError = props.onError,
        onLoad = props.onLoad;
    var style = document.createElement("link");
    style.href = DEFAULT_URL_STYLE;
    style.rel = "stylesheet";
    document.head.appendChild(style); // @ts-ignore

    if (window.L) {
      if (onLoad) onLoad();
      return;
    }

    var script = document.createElement("script");
    script.src = DEFAULT_URL;

    script.onload = function () {
      if (onLoad) onLoad();
      return;
    };

    script.onerror = function () {
      if (onError) onError();
      return;
    };

    document.body.appendChild(script);
  };

  return createScript();
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var NeshanMap = function NeshanMap(props) {
  var style = props.style,
      options = props.options,
      onInit = props.onInit;
  var mapEl = useRef(null);
  var defaultStyle = {
    width: "600px",
    height: "450px",
    margin: 0,
    padding: 0,
    background: "#eee"
  };
  var defaultOptions = {
    key: "YOUR_API_KEY",
    maptype: "dreamy",
    poi: true,
    traffic: false,
    center: [35.699739, 51.338097],
    zoom: 14
  };
  useEffect(function () {
    neshan_map_loader({
      onLoad: function onLoad() {
        // @ts-ignore
        var map = new window.L.Map(mapEl.current, _objectSpread(_objectSpread({}, defaultOptions), options)); // @ts-ignore

        if (onInit) onInit(window.L, map);
      },
      onError: function onError() {
        console.error("Neshan Maps Error: This page didn't load Neshan Maps correctly");
      }
    });
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: mapEl,
    style: _objectSpread(_objectSpread({}, defaultStyle), style)
  });
};

export { NeshanMap };
