from fastapi import WebSocket


class ConnectionManager:
    def __init__(self):
        self.active_connections : list[WebSocket] = []

    async def connect(self, socket: WebSocket):
        await socket.accept()
        self.active_connections.append(socket)

    def disconnect(self, socket: WebSocket):
        if socket in self.active_connections:
            self.active_connections.remove(socket)

    async def broadcast(self, sender: WebSocket, message: str):
        for socket in self.active_connections:
            if socket is not sender:
                await socket.send_text(message)
