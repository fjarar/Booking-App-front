import React from "react";

const RoomInfo = ({ room }) => {
  return (
    <div className="room-info">
      <h2>{room.roomName}</h2>
      <p>
        <strong>Type:</strong> {room.type}
      </p>
      <p>
        <strong>Price per Night:</strong> {room.currency} {room.pricePerNight}
      </p>
      <p>
        <strong>Max Occupancy:</strong> {room.maxOccupancy === 1 ? room.maxOccupancy + " guest" : room.maxOccupancy + " guests"}
      </p>
      <p className="description">{room.description}</p>
    </div>
  );
};

export default RoomInfo;