## React Glideable

Glideable is a React component that adds enhanced draggable behavior to child elements. Elements that are dragged will continue moving after release in a coasting fashion until stopping. The pseudo-inertial effect is determined by the element's drag speed upon release and the motion profile while coasting is configurable with duration and easing. The Glideable area is determined by a configurable bounds element that determines the top, right, bottom, and left edges of the Glideable container. The Glideable component can be used to wrap and apply the Glideable effect to multiple Glideable children. The z-index stacking of the children is internally managed by the Glideable component. Moving children back to their original locations is accomplished by invoking either the resetGlideableElement(index) or resetGlideableElements() methods.

### Features
  * Callbacks for onStart, onReady, onChange, onComplete
  * Fully configurable glide behavior
  * Internally managed z-index stacking
  * Methods for reset-all and reset-individual

### Learn more
See the demo at [http://www.uismithing.com/main/glideable](http://www.uismithing.com/main/glideable).

### Repository
[https://github.com/uismithing/react-glideable](https://github.com/uismithing/react-glideable)

### Install
`npm install react-glideable -s`

### Deploy
`import Glideable from "react-glideable"`
```html
<Glideable id="glideable-surface-container" ref="glideablesurface" {...glideableProfile} className="glideable-surface">
	<div id="glideable-item_1-container" className="glideable-item_1"></div>
	<div id="glideable-item_2-container" className="glideable-item_2"></div>
	<div id="glideable-item_3-container" className="glideable-item_3"></div>
	...
	<div id="glideable-item_n-container" className="glideable-item_n"></div>
</Glideable>
```