# Better React Wrapper for Mapbox GL

This is a React wrapper for Mapbox GL JS. I created this wrapper for 2 reasons:

1. Existing wrappers are not well maintained and are not up to date with the latest Mapbox GL JS API.
2. I wanted to support `mapbox-gl@v2` while still supporting `mapbox-gl@v1` because it's free.

![video](https://user-images.githubusercontent.com/27153515/197651279-6230ee88-4cbf-490c-97e7-529eb603f362.gif)

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

## Roadmap till v0.1.0

- [x] globe projection with `mapbox-gl@v2`
- [x] free usage with `mapbox-gl@v1`
- [x] custom map styles
- [x] default markers
- [x] partial support for raster layers
- [x] fly to options
- [x] idle spin
- [x] fog support with `mapbox-gl@v2`
- [ ] custom markers and popups
- [ ] geojson layers
- [ ] raster layers
- [ ] vector layers
- [ ] events
- [ ] clustering

## Contributing

Contributions are welcome! Please open an issue or a PR.

## License

[MIT](https://github.com/sarveshpro/mapbox-react-wrapper/blob/main/LICENSE)

## :heart: of Open Source

This project is part of the [Open Source Initiative](https://opensource.org/).

[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

## Disclaimer

This project is not affiliated with Mapbox in any way. Mapbox is a registered trademark of [Mapbox, Inc.](https://www.mapbox.com/). I am using Mapbox's APIs and services in the spirit of Open Source. Any issues with the usage of Mapbox's APIs and services should be directed to [Mapbox, Inc.](https://www.mapbox.com/).
