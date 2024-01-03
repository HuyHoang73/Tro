import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { FlagTwoTone } from "@ant-design/icons";
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { getHostel } from "../../../services/hostelServices";

const SimpleMap = (props) => {
  const [rooms, setRooms] = useState({});
  const { coords } = props;
  const key = "AIzaSyBaW622QrFfhTJQNlOB1oq-AIFOowJIvwg";

  const RoomMarker = ({ text }) => (
    <div style={{ width: "20px", height: "20px"}}>
      {text}
    </div>
  );

  return (
    <div style={{ height: "73vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: key }}
        center={coords}
        defaultZoom={11}
      >
          <RoomMarker center={coords} text={<FlagTwoTone />}/>
      </GoogleMapReact>
    </div>
  );
};

export default SimpleMap;
