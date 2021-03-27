# SpatialJS

Js spatial navigation system

## Usage 

```js
import {
  initSpatialNavigation,
  trackFocusables,
  clearFocusables
} from "./navigation/navigation.js";

initSpatialNavigation({
  onFocusElement: console.log,
  onUnfocusElement: console.log,
  straightOnly: true // straight line search only
});

// onLoad, Start tracking 
  trackFocusables("classname"); // class name of focusable elements

// onUnload, Stop tracking
clearFocusables();
```

## Example

Check this repo (src/index.js)

1. clone this repo
2. open index.html
3. click `init` button