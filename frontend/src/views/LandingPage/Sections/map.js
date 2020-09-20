import React, {Fragment} from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  Circle
} from "react-google-maps";

const Map = props => {
    return (
      <GoogleMap
        defaultZoom={props.zoom}
        defaultCenter={props.center}
      >
        {props.places.map(place => {
          return (
            <Fragment key={place.id}>
              <Marker
                position={{
                  lat: parseFloat(props.latitude),
                  lng: parseFloat(props.longitude)
                }}
              />
              {place.circle && <Circle
                defaultCenter={{
                  lat: parseFloat(props.latitude),
                  lng: parseFloat(props.longitude)
                }}
                radius={props.radius}
                options={place.circle.options}
              />}
            </Fragment>
          );
        })}
      </GoogleMap>
    );
}

export default withScriptjs(withGoogleMap(Map));