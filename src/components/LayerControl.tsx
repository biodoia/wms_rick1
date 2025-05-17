import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface LayerControlProps {
  layer?: {
    name: string;
    description: string;
    url?: string;
    layers?: string;
  };
  visible?: boolean;
  onToggle?: (visible: boolean) => void;
}

const LayerControl = ({
  layerName = "WMS Layer",
  layerDescription = "GeoServer WMS layer",
  isVisible = true,
  onToggleVisibility = () => {},
}: LayerControlProps) => {
  const [visible, setVisible] = useState(isVisible);

  const handleToggle = (checked: boolean) => {
    setVisible(checked);
    onToggleVisibility(checked);
  };

  return (
    <Card className="w-full max-w-[250px] bg-white shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{layerName}</CardTitle>
        <CardDescription className="text-xs">
          {layerDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="layer-visibility" className="cursor-pointer">
            {isVisible ? "Visible" : "Hidden"}
          </Label>
          <Switch
            id="layer-visibility"
            checked={isVisible}
            onCheckedChange={handleToggle}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LayerControl;
