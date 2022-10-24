# Better React Wrapper for Mapbox GL

This is a React wrapper for Mapbox GL JS. I created this wrapper for 2 reasons:

1. Existing wrappers are not well maintained and are not up to date with the latest Mapbox GL JS API.
2. I wanted to support `mapbox-gl@v2` while still supporting `mapbox-gl@v1` because it's free.

## Installation

```bash
npm install mapbox-react-wrapper
```

By default, this package will install `mapbox-gl@v1`. If you want to use `mapbox-gl@v2`, you can install it like this:

```bash
npm install mapbox-react-wrapper mapbox-gl@2.10.0
```

## Usage

```jsx
import React from "react";
import { MapboxReact } from "mapbox-react-wrapper";

const App = () => {
  return (
    <MapboxReact
      accessToken={"YOUR_ACCESS_TOKEN"} // not required if you are on mapbox-gl@v1 and aren't using mapbox's map styles
      mapStyle="mapbox://styles/mapbox/streets-v11" // url or mapbox style object
      mapboxOptions={{
        center: [0, 0],
        zoom: 1.5,
      }}
    />
  );
};

export default App;
```

## Props

| Prop            | Type                    | Description                                                         |
| --------------- | ----------------------- | ------------------------------------------------------------------- |
| accessToken     | string                  | Mapbox access token. Required if you are using mapbox's map styles. |
| mapStyle        | string or object        | Mapbox style object or url.                                         |
| interactive     | boolean                 | Whether the map is interactive.                                     |
| height          | CSSProperties['height'] | Height of the map.                                                  |
| width           | CSSProperties['height'] | Width of the map.                                                   |
| mapboxOptions   | MapboxOptions           | Mapbox options.                                                     |
| idleSpin        | boolean                 | Whether the map should spin when idle.                              |
| showMapControls | boolean                 | Whether to show map controls.                                       |
| markers         | CustomMarkerProps[]     | Array of markers.                                                   |
| flyTo           | CustomFlyToOptions      | Fly to options.                                                     |
