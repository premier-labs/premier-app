import { CONFIG } from "@app/_common/config";
import { io } from "socket.io-client";

export const socket = io(CONFIG.network.websocket_server_url);

export default function useSocketIo() {
  return { socket };
}
