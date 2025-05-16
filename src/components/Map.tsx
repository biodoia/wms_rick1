import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import ImageLayer from "ol/layer/Image";
import OSM from "ol/source/OSM";
import ImageWMS from "ol/source/ImageWMS";
import { defaults as defaultControls } from "ol/control";
import { fromLonLat } from "ol/proj";
import { click } from "ol/events/condition";
import Select from "ol/interaction/Select";

interface MapComponentProps {
  geoserverUrl?: string;
  layerName?: string;
  onFeatureClick?: (feature: any) => void;
  visible?: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({
  geoserverUrl = "http://localhost:8080/geoserver/wms",
  layerName = "cite:example",
  onFeatureClick = () => {},
  visible = true,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const wmsLayerRef = useRef<ImageLayer<ImageWMS> | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize map on component mount
  useEffect(() => {
    if (!mapRef.current) return;

    try {
      // Create WMS layer
      const wmsSource = new ImageWMS({
        url: geoserverUrl,
        params: {
          LAYERS: layerName,
          FORMAT: "image/png",
          TRANSPARENT: true,
        },
        ratio: 1,
        serverType: "geoserver",
      });

      const wmsLayer = new ImageLayer({
        source: wmsSource,
        visible: visible,
      });

      wmsLayerRef.current = wmsLayer;

      // Create map instance
      const mapInstance = new Map({
        target: mapRef.current,
        layers: [
          // Base OSM layer
          new TileLayer({
            source: new OSM(),
          }),
          // WMS layer
          wmsLayer,
        ],
        view: new View({
          center: fromLonLat([12.5, 41.9]), // Default center on Italy
          zoom: 6,
        }),
        controls: defaultControls({
          zoom: true,
          rotate: false,
          attribution: true,
        }),
      });

      // Add select interaction for feature clicking
      const selectInteraction = new Select({
        condition: click,
        layers: [wmsLayer],
      });

      mapInstance.addInteraction(selectInteraction);

      // Handle feature click
      mapInstance.on("singleclick", (evt) => {
        const viewResolution = mapInstance.getView().getResolution();
        if (!viewResolution) return;

        const source = wmsSource;
        const url = source.getFeatureInfoUrl(
          evt.coordinate,
          viewResolution,
          "EPSG:3857",
          { INFO_FORMAT: "application/json" },
        );

        if (url) {
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              if (data.features && data.features.length > 0) {
                onFeatureClick(data.features[0]);
              }
            })
            .catch((error) => {
              console.error("Error fetching feature info:", error);
              setError("Failed to fetch feature information");
            });
        }
      });

      mapInstanceRef.current = mapInstance;
      setMapLoaded(true);
      setError(null);

      return () => {
        mapInstance.setTarget(undefined);
        mapInstanceRef.current = null;
      };
    } catch (err) {
      console.error("Error initializing map:", err);
      setError("Failed to initialize map");
    }
  }, [geoserverUrl, layerName, onFeatureClick]);

  // Update layer visibility when prop changes
  useEffect(() => {
    if (wmsLayerRef.current) {
      wmsLayerRef.current.setVisible(visible);
    }
  }, [visible]);

  return (
    <div className="relative w-full h-full bg-white">
      <div
        ref={mapRef}
        className="w-full h-full"
        style={{ minHeight: "400px" }}
      />
      {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg">
          {error}
          <button className="ml-2 font-bold" onClick={() => setError(null)}>
            ×
          </button>
        </div>
      )}
      {!mapLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
          <div className="text-lg font-medium">Loading map...</div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
