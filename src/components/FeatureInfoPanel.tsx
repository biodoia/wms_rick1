import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface FeatureProperty {
  name: string;
  value: string | number;
}

interface FeatureInfoPanelProps {
  feature?: {
    id: string;
    type: string;
    properties: FeatureProperty[];
  } | null;
  onClose?: () => void;
  isOpen?: boolean;
}

const FeatureInfoPanel: React.FC<FeatureInfoPanelProps> = ({
  feature = {
    id: "feature-123",
    type: "Polygon",
    properties: [
      { name: "name", value: "Sample Feature" },
      { name: "area", value: 1250.75 },
      { name: "category", value: "Residential" },
      { name: "status", value: "Active" },
      { name: "created", value: "2023-05-15" },
      { name: "owner", value: "Municipality" },
      { name: "address", value: "123 Main St" },
      {
        name: "notes",
        value:
          "This is a sample feature with multiple properties to demonstrate scrolling in the feature info panel.",
      },
    ],
  },
  onClose = () => {},
  isOpen = true,
}) => {
  if (!isOpen) return null;

  return (
    <Card className="fixed right-4 top-20 w-80 md:w-96 shadow-lg bg-background border-border">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">{feature.type} Feature</CardTitle>
            <CardDescription>ID: {feature.id}</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {feature.properties.map((prop, index) => (
              <div key={index} className="space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground">
                  {prop.name}
                </h4>
                <p className="text-sm break-words">{prop.value.toString()}</p>
                {index < feature.properties.length - 1 && (
                  <Separator className="mt-2" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-0 justify-end">
        <Button variant="outline" size="sm" onClick={onClose}>
          Close
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeatureInfoPanel;
