import { SpatialNavigator } from "./spatial_navigator";
import { KeyNavigationAdapter } from "./key_navigation_adapter";

let spatialNavigator = null;

export const trackFocusables = (className) => {
  if (!spatialNavigator) {
    return console.warn("spatialNavigator is not initialized yet");
  }
  setTimeout(() => {
    let f = false;
    document.querySelectorAll(`.${className}`).forEach((e, i) => {
      spatialNavigator.add(e);
      if (!f) {
        spatialNavigator.focus(e);
        f = true;
      }
    });
  }, 500);
};

export const clearFocusables = () => {
  if (!spatialNavigator) {
    return console.warn("spatialNavigator is not initialized yet");
  }
  spatialNavigator.clear();
};

export function initSpatialNavigation({
  onFocusElement,
  onUnfocusElement,
  straightOnly
}) {
  let _focusedElem, _spatialNavigator, _keyNavigatorAdapter;
  const collection = [];
  _spatialNavigator = new SpatialNavigator(collection);
  spatialNavigator = _spatialNavigator;
  _spatialNavigator.straightOnly = straightOnly;
  _keyNavigatorAdapter = new KeyNavigationAdapter();
  _keyNavigatorAdapter.init();
  _keyNavigatorAdapter.on("move", onMove);
  // All behaviors which no need to have multple events while holding the
  // key should use keyup.
  _spatialNavigator.on("focus", handleFocus);
  _spatialNavigator.on("unfocus", handleUnfocus);

  function handleFocus(elem) {
    elem.focus();
    _focusedElem = elem;
    onFocusElement(elem);
  }

  function handleUnfocus(elem) {
    elem.blur();
    onUnfocusElement(elem);
  }

  function onMove(key) {
    if (!_focusedElem) {
      _focusedElem = _spatialNavigator.getFocusedElement();
    }
    if (
      !(_focusedElem.CLASS_NAME === "XScrollable" && _focusedElem.move(key))
    ) {
      _spatialNavigator.move(key);
    }
  }

  function destory() {
    clearFocusables();
    _keyNavigatorAdapter.off("move", onMove);
    _keyNavigatorAdapter.off("enter-keyup", onEnterElement);
    _spatialNavigator.off("focus", handleFocus);
    _spatialNavigator.off("unfocus", handleUnfocus);
    spatialNavigator = null;
  }

  return { instance: _spatialNavigator, destory };
}
