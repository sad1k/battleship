/* eslint-disable */
// @ts-nocheck
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

(function (window) {
  try {
    new MouseEvent("test");
    return false; // No need to polyfill
  } catch (e) {
    var MouseEvent = function (eventType, params) {
      params = params || { bubbles: false, cancelable: false };
      const mouseEvent = document.createEvent("MouseEvent");
      mouseEvent.initMouseEvent(
        eventType,
        params.bubbles,
        params.cancelable,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        params.metaKey,
        0,
        null
      );

      return mouseEvent;
    };

    MouseEvent.prototype = Event.prototype;

    window.MouseEvent = MouseEvent;
  }
})(window);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
