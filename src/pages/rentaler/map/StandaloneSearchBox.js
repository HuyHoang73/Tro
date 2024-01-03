import { useState } from "react";
import { Input, List } from "antd";

import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";

const PlacesWithStandaloneSearchBox = ({ latLong }) => {
  const {
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = useGoogle({
    apiKey: 'AIzaSyAN1pWJ_95T0iwENSESQWZ5G_l9-LiGFzU',
  });
  const [value, setValue] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);


  const handlePlaceSelect = (place) => {
    setValue(place.description);
    setSelectedPlace(place);

    // Retrieve latitude and longitude for the selected place
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ placeId: place.place_id }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const { lat, lng } = results[0].geometry.location;
        setLatitude(lat());
        setLongitude(lng());
        latLong(lat(),lng(), place.description)
      }
    });

    // Clear the place predictions
    getPlacePredictions({ input: "" });
  };

  return (
    <div style={{ width: "100%" }}>
      <Input.Search
        style={{ color: "black" }}
        value={value}
        placeholder="Äá»‹a chá»‰"
        onChange={(evt) => {
          getPlacePredictions({ input: evt.target.value });
          setValue(evt.target.value);
        }}
        loading={isPlacePredictionsLoading}
      />
      <div
        style={{
          marginTop: "20px",
          width: "100%",
          height: "200px",
          display: "flex",
          flex: "1",
          flexDirection: "column",
          marginBottom: "100px",
        }}
      >
        {!isPlacePredictionsLoading && (
          <List
            dataSource={placePredictions}
            renderItem={(item) => (
              <List.Item onClick={() => handlePlaceSelect(item)}>
                <List.Item.Meta title={item.description} />
              </List.Item>
            )}
          />
        )}
      </div>
      <div>
        Selected Place: {selectedPlace ? selectedPlace.description : ""}
      </div>
      <div>Latitude: {latitude}</div>
      <div>Longitude: {longitude}</div>
    </div>
  );
};

export default PlacesWithStandaloneSearchBox;