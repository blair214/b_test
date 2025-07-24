import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import "./lobby.css";

const Lobby = ({ playerName, setPlayerName }) => {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  const room = localStorage.getItem("roomCode") || "biblios";
  const [showBox, setShowBox] = useState(false);
  const [tempName, setTempName] = useState(playerName);

  useEffect(() => {
  socket.emit("join_game", { room, playerName });

  socket.on("player_list", (updatedPlayers) => {
    // console.log("📡 Received player list:", updatedPlayers);
    setPlayers(updatedPlayers);
  });

  socket.on("start_game", (data) => {
  console.log("📩 start_game received in lobby:", data);
  localStorage.setItem("start_game_payload", JSON.stringify(data));
  localStorage.setItem("playerName", playerName);
  setPlayerName(playerName);

  // ⏳ Give localStorage a moment to flush before navigating
  setTimeout(() => {
    console.log("🚪 Navigating to /game...");
    navigate(`/game/${room}`);
  }, 50);  // 50ms is usually enough
});


  // ✅ THIS is what you were missing
  socket.on("game_state", (data) => {
    console.log("✅ game_state received in lobby. Navigating to game...");
    localStorage.setItem("playerName", playerName);
    navigate("/game");
  });

  return () => {
    socket.off("player_list");
    socket.off("start_game");
    socket.off("game_state");
  };
}, [playerName]);

  const handleStartGame = () => {
    console.log("🚀 Start Game button clicked");
    socket.emit("start_game", { room: room });
  };

  const toggleDropDown = () => {
    setShowBox((prev) => !prev);
    console.log(showBox)
  }

  const updateName = () => {
  if (tempName.trim()) {
    setPlayerName(tempName.trim());
    localStorage.setItem("playerName", tempName.trim());

    // Optional: re-emit join_game with new name
    socket.emit("update_name", { room, newName: tempName.trim() });

    setShowBox(false); // Close dropdown after update
    } 
  };

  const isHost = players.length > 0 && players[0].name === playerName;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Waiting Room</h2>
      <p>Room: <strong>{room}</strong></p>
      <h3>Players Joined:</h3>
      <ul>
        {players.map((p, i) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
      {players.length < 2 ? (
        <p>Waiting for more players...</p>
      ) : isHost ? (
        <button onClick={handleStartGame}>Start Game</button>
      ) : (
        <p>Waiting for host to start the game...</p>
      )}

      <button className={'naming-button'} onClick={toggleDropDown}>
        {playerName}
      </button>

      {showBox && (
        <div className={'dropdown-box'}>
          <p className="nickname">Nickname</p>
          <input className="nickname-input"
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            placeholder="Enter your nickname"
          />
          <br></br>

          <button className={'normal-button'} onClick={updateName}>
            Update your nickname
          </button>
  
        </div>
        
      )}

      <br></br>

      
    </div>
  );
};

export default Lobby;
