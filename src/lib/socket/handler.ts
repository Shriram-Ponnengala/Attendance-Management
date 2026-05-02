import { Server, Socket } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./types";
import {
  getRoomState,
  applyMove,
  navigateNode,
  resetRoom,
  addParticipant,
  removeParticipant,
} from "./chessRooms";

type IO = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
type Sock = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;

export function handleSocketConnection(io: IO) {
  io.on("connection", (socket: Sock) => {
    console.log(`[Socket] Client connected: ${socket.id}`);
    
    // Track which rooms this socket is in for cleanup
    const joinedRooms = new Set<string>();

    // ── Existing live-class room events ─────────────────────────────────────

    socket.on("join-room", (liveClassId: string) => {
      if (!liveClassId) {
        socket.emit("error", "Room ID is required");
        return;
      }
      socket.join(liveClassId);
      console.log(`[Socket] User ${socket.id} joined room: ${liveClassId}`);
      socket.to(liveClassId).emit("user-joined", { userId: socket.id });
    });

    socket.on("leave-room", (liveClassId: string) => {
      socket.leave(liveClassId);
      console.log(`[Socket] User ${socket.id} left room: ${liveClassId}`);
      socket.to(liveClassId).emit("user-left", { userId: socket.id });
    });

    socket.on("send-message", ({ liveClassId, message }) => {
      io.to(liveClassId).emit("room-message", { userId: socket.id, message });
    });

    // ── Chess events ─────────────────────────────────────────────────────────

    socket.on("chess:join_room", (roomId: string) => {
      socket.join(roomId);
      joinedRooms.add(roomId);
      
      // Use socket.id as a generic name for now, you can extend this to use real user info
      const participantName = `Admin (${socket.id.substring(0, 4)})`;
      addParticipant(roomId, socket.id, participantName);
      
      console.log(`[Chess] ${participantName} joined chess room: ${roomId}`);

      // Send full state to joining client
      socket.emit("chess:state", getRoomState(roomId));
      
      // Broadcast updated participants to everyone in the room
      io.to(roomId).emit("chess:participants_update", getRoomState(roomId).participants);
    });

    socket.on("chess:make_move", ({ roomId, from, to, promotion, parentId }) => {
      console.log(`[Chess] Move request: ${from}-${to} in room ${roomId} from ${socket.id}`);
      const result = applyMove(roomId, from, to, promotion ?? "q", parentId);

      if (result) {
        console.log(`[Chess] Move ${result.node.san} ACCEPTED in room ${roomId}`);
        io.to(roomId).emit("chess:move_made", result);
      } else {
        console.log(`[Chess] Move ${from}-${to} REJECTED in room ${roomId} (Illegal)`);
        socket.emit("chess:move_rejected", {
          reason: `Illegal move: ${from} → ${to}`,
        });
      }
    });

    socket.on("chess:navigate", ({ roomId, nodeId }) => {
      if (navigateNode(roomId, nodeId)) {
        io.to(roomId).emit("chess:navigated", { currentNodeId: nodeId });
      }
    });

    socket.on("chess:reset", (roomId: string) => {
      resetRoom(roomId);
      console.log(`[Chess] Room ${roomId} reset by ${socket.id}`);
      io.to(roomId).emit("chess:state", getRoomState(roomId));
    });

    // ── Disconnect ───────────────────────────────────────────────────────────

    socket.on("disconnect", (reason) => {
      console.log(`[Socket] Client disconnected: ${socket.id} (${reason})`);
      joinedRooms.forEach(roomId => {
        removeParticipant(roomId, socket.id);
        io.to(roomId).emit("chess:participants_update", getRoomState(roomId).participants);
      });
    });
  });
}
