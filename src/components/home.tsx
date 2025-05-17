import React, { useState } from "react";
import { default as Map } from "./Map";
import LayerControl from "./LayerControl";
import FeatureInfoPanel from "./FeatureInfoPanel";

interface FeatureInfo {
  id: string;
  properties: Record<string, any>;
  geometry?: any;
}

const Home = () => {
  const [layerVisible, setLayerVisible] = useState<boolean>(true);
  const [selectedFeature, setSelectedFeature] = useState<FeatureInfo | null>(
    null,
  );
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

  const handleLayerToggle = (visible: boolean) => {
    setLayerVisible(visible);
  };

  const handleFeatureClick = (feature: FeatureInfo | null) => {
    setSelectedFeature(feature);
    setIsPanelOpen(!!feature);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedFeature(null);
  };

  // Default WMS layer configuration
  const wmsLayer = {
    name: "Shapefile Layer",
    url: "http://localhost:8080/geoserver/wms",
    layers: "workspace:layer_name", // Replace with your actual workspace:layer_name
    description: "Published shapefile from GeoServer",
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 shadow-md">
        <h1 className="text-xl font-bold">WMS Map Viewer</h1>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-card p-4 border-r border-border">
          <h2 className="text-lg font-semibold mb-4">Layers</h2>
          <LayerControl
            layer={wmsLayer}
            visible={layerVisible}
            onToggle={handleLayerToggle}
          />
        </aside>

        {/* Map container */}
        <div className="flex-1 relative">
          <Map
            geoserverUrl={wmsLayer.url}
            layerName={wmsLayer.layers}
            visible={layerVisible}
            onFeatureClick={handleFeatureClick}
          />

          {/* Feature info panel - conditionally rendered */}
          <FeatureInfoPanel
            feature={selectedFeature}
            onClose={handleClosePanel}
            isOpen={isPanelOpen}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted p-2 text-center text-sm text-muted-foreground">
        <p>WMS Rapid Deployment with GeoServer</p>
      </footer>
    </div>
  );
};

export default Home;
