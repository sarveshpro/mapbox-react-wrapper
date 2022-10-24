import React, { CSSProperties } from 'react'
import mapboxgl from 'mapbox-gl'

// TODO: move types to separate file

// make container optional in mapbox options
type CustomMapboxOptions = Omit<mapboxgl.MapboxOptions, 'container'>

type CustomMarkerProps = {
    coordinates: mapboxgl.LngLatLike,
    options?: mapboxgl.MarkerOptions,
    children?: React.ReactNode
}

type CustomFlyToOptions = {
    coordinates: mapboxgl.LngLatLike,
    options: mapboxgl.FlyToOptions,
}

type Props = {
    accessToken?: string | undefined
    height?: CSSProperties['height'] | undefined
    width?: CSSProperties['width'] | undefined
    mapStyle?: string | mapboxgl.Style | undefined
    idleSpin?: boolean | undefined
    showMapControls?: boolean | undefined
    markers?: Array<CustomMarkerProps> | undefined
    flyTo?: CustomFlyToOptions | undefined
    rasterSourceLayers?: Array<{
        source: mapboxgl.RasterSource
        layers: Array<mapboxgl.RasterLayer>
    }> | undefined
    mapboxOptions?: CustomMapboxOptions | undefined
    onMapLoad?: (map: mapboxgl.Map) => void | undefined
    fog?: mapboxgl.Fog | undefined
}


const emptyMapStyle: mapboxgl.Style = {
    version: 8,
    sources: {},
    layers: []
}

export function MapboxReact(
    { accessToken = '',
        height = '100%',
        width = '100%',
        mapStyle = undefined,
        idleSpin = false,
        showMapControls = false,
        markers = [],
        flyTo = undefined,
        rasterSourceLayers = [],
        mapboxOptions = undefined,
        onMapLoad = () => { },
        fog = undefined
    }: Props
) {
    const [map, setMap] = React.useState<mapboxgl.Map | null>(null)
    const mapContainerRef = React.useRef(null)

    mapboxgl.accessToken = accessToken;

    const finalMapStyle = mapStyle ? mapStyle : emptyMapStyle

    // Initialize map when component mounts
    React.useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current || '',
            style: finalMapStyle,
            ...mapboxOptions
        })

        // Add map to state
        setMap(map)

        if (rasterSourceLayers.length > 0) {
            map.on('load', () => {
                onMapLoad(map)
                addRasterSourceLayers(map, rasterSourceLayers)
            })
        }

        // Clean up on unmount
        return () => map.remove()
    }, [])

    // Update map when props change
    React.useEffect(() => {
        if (!map) return // wait for map to initialize

        if (fog) {
            map.setFog(fog)
        }

        if (showMapControls) {
            // Add navigation control (the +/- zoom buttons)
            map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')
        }

        if (idleSpin) {
            enableIdleSpin(map)
        }

        if (flyTo) {
            flyMapTo(map, flyTo)
        }

        if (markers.length > 0) {
            plotMarkers(map, markers)
        }

    }, [markers, flyTo, idleSpin, showMapControls, map])

    return (
        <div ref={mapContainerRef}
            style={{ height, width }} />
    )
}

// function to enable idle spin
function enableIdleSpin(map: mapboxgl.Map) {
    let userInteracting = false;
    let spinEnabled = true;

    // At low zooms, complete a revolution every two minutes.
    const secondsPerRevolution = 120;
    // Above zoom level 5, do not rotate.
    const maxSpinZoom = 5;
    // Rotate at intermediate speeds between zoom levels 3 and 5.
    const slowSpinZoom = 3;


    function spinGlobe() {
        const zoom = map.getZoom();
        if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
            let distancePerSecond = 360 / secondsPerRevolution;
            if (zoom > slowSpinZoom) {
                // Slow spinning at higher zooms
                const zoomDif =
                    (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
                distancePerSecond *= zoomDif;
            }
            const center = map.getCenter();
            center.lng -= distancePerSecond;
            // Smoothly animate the map over one second.
            // When this animation is complete, it calls a 'moveend' event.
            map.easeTo({ center, duration: 1000, easing: (n) => n });
        }
    }

    // Pause spinning on interaction
    map.on('mousedown', () => {
        userInteracting = true;
    });

    // Restart spinning the globe when interaction is complete
    map.on('mouseup', () => {
        userInteracting = false;
        spinGlobe();
    });

    // These events account for cases where the mouse has moved
    // off the map, so 'mouseup' will not be fired.
    map.on('dragend', () => {
        userInteracting = false;
        spinGlobe();
    });
    map.on('pitchend', () => {
        userInteracting = false;
        spinGlobe();
    });
    map.on('rotateend', () => {
        userInteracting = false;
        spinGlobe();
    });

    // When animation is complete, start spinning if there is no ongoing interaction
    map.on('moveend', () => {
        spinGlobe();
    });

    // Start spinning if not already spinning
    if (!map.isMoving()) {
        spinGlobe();
    }
}

// function to plot markers
function plotMarkers(map: mapboxgl.Map, markers: Array<CustomMarkerProps>) {
    markers.forEach(marker => {
        const { coordinates, options } = marker
        const marker1 = new mapboxgl.Marker()
            .setLngLat(coordinates)
            .addTo(map)
    })
}

// function to fly to a location
function flyMapTo(map: mapboxgl.Map, flyTo: CustomFlyToOptions) {
    const { coordinates, options } = flyTo
    map.flyTo({
        center: coordinates,
        ...options
    })
}

// function to add source layers
function addRasterSourceLayers(map: mapboxgl.Map, rasterSourceLayers: Array<{ source: mapboxgl.RasterSource, layers: Array<mapboxgl.RasterLayer> }>) {
    rasterSourceLayers.forEach(sourceLayer => {
        map.addSource(sourceLayer.source.id || '', {
            type: 'raster',
            tiles: sourceLayer.source.tiles,
            tileSize: sourceLayer.source.tileSize
        })
        sourceLayer.layers.forEach(layer => {
            map.addLayer(layer)
        })
    })
}
