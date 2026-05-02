// ─── Shared chess types ───────────────────────────────────────────────────────

export interface MoveNode {
  id: string;
  fen: string;
  san: string;
  parentId: string | null;
  children: string[];
  moveNumber: number;
  turn: 'w' | 'b';
  // Optional move info for reference
  from?: string;
  to?: string;
}

export interface Participant {
  id: string;
  name: string;
}

export interface ChessRoomState {
  nodes: Record<string, MoveNode>;
  currentNodeId: string;
  participants: Participant[];
}

export interface ServerToClientEvents {
  // Live-class room events
  "user-joined": (data: { userId: string }) => void;
  "user-left":   (data: { userId: string }) => void;
  "room-message": (data: { userId: string; message: string }) => void;
  "error": (message: string) => void;

  // ─── Chess events ──────────────────────────────────────────────────────────
  "chess:state": (data: ChessRoomState) => void;
  "chess:move_made": (data: { node: MoveNode; currentNodeId: string }) => void;
  "chess:navigated": (data: { currentNodeId: string }) => void;
  "chess:move_rejected": (data: { reason: string }) => void;
  "chess:participants_update": (participants: Participant[]) => void;
}

export interface ClientToServerEvents {
  // Live-class room events
  "join-room":   (liveClassId: string) => void;
  "leave-room":  (liveClassId: string) => void;
  "send-message": (data: { liveClassId: string; message: string }) => void;

  // ─── Chess events ──────────────────────────────────────────────────────────
  "chess:join_room": (roomId: string) => void;
  "chess:make_move": (data: { roomId: string; from: string; to: string; promotion?: string; parentId: string }) => void;
  "chess:navigate": (data: { roomId: string; nodeId: string }) => void;
  "chess:reset": (roomId: string) => void;
}

export interface InterServerEvents {}

export interface SocketData {
  userId: string;
  role: string;
}
