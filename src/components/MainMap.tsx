import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

type MapProps = {
  containerSize: {
    width: string;
    height: string;
  };
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
};

const MainMap = (props: MapProps) => {
  const { containerSize, center, zoom } = props;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    //MOVE THIS KEY TO A .ENV FILE
    googleMapsApiKey: "AIzaSyCLEWBRlMFDFg_6r-RD-gRXvO-OkdFMMMc",
  });

  return isLoaded ? (
    <div style={containerSize}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={zoom}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default React.memo(MainMap);
