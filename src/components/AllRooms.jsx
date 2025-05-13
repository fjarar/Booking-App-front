import React from "react";
import "./AllRooms.scss";
import RoomCard from "./RoomDetails/RoomCard";
import { useState, useEffect } from "react";
import api from "../services/api";
const AllRooms = () => {
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const response = await api.get("rooms/");
        setRoomData(response);
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    }
    
    loadRooms();
  }, []);
  return (
    <div className="all-rooms-container">
      <h2>All Rooms</h2>
      <div className="rooms-list">
        {roomData.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default AllRooms;