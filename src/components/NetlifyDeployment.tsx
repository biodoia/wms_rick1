import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { InfoIcon } from "lucide-react";

const NetlifyDeployment: React.FC = () => {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Netlify Deployment Guide</CardTitle>
          <CardDescription>
            Steps to deploy your WMS Map Viewer to Netlify
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Environment Variables Required</AlertTitle>
            <AlertDescription>
              Make sure to set these environment variables in Netlify:
              <ul className="list-disc pl-5 mt-2">
                <li>
                  <code>VITE_GEOSERVER_URL</code> - URL to your GeoServer WMS
                  (e.g., https://your-geoserver.com/geoserver/wms)
                </li>
                <li>
                  <code>VITE_LAYER_NAME</code> - Name of your WMS layer (e.g.,
                  cite:example)
                </li>
              </ul>
            </AlertDescription>
          </Alert>

          <h3 className="text-lg font-medium">Deployment Steps:</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
            </li>
            <li>
              Sign up or log in to{" "}
              <a
                href="https://app.netlify.com"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Netlify
              </a>
            </li>
            <li>Click "Add new site" → "Import an existing project"</li>
            <li>Connect to your Git provider and select your repository</li>
            <li>
              Configure build settings:
              <ul className="list-disc pl-5 mt-1">
                <li>
                  Build command: <code>npm run build</code>
                </li>
                <li>
                  Publish directory: <code>dist</code>
                </li>
              </ul>
            </li>
            <li>Add the environment variables in the "Environment" section</li>
            <li>Click "Deploy site"</li>
          </ol>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            Note: If your GeoServer is running locally, you'll need to deploy it
            to a publicly accessible server for your Netlify site to connect to
            it.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NetlifyDeployment;
