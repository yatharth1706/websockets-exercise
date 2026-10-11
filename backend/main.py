import datetime
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import ValidationError

from connection_manager import ConnectionManager
from schema import SendMessageInput, SendMessageOutput

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"]
)

connection_manager = ConnectionManager()


@app.get("/health")
def get_health():
    return {
        "healthy": "OK"
    }

@app.post("/message", response_model=SendMessageOutput)
def send_message(message: SendMessageInput):
    return SendMessageOutput(
        username=message.username,
        message=message.message,
        timestamp=datetime.datetime.now(datetime.timezone.utc).isoformat()
    )

@app.websocket("/message")
async def send_message_via_websockets(websocket: WebSocket):
    try:
        # connect the socket
        await connection_manager.connect(websocket)

        # keep receiving the messages from that client and broadcast it to all
        while True:
            try:
                data = await websocket.receive_json()

                message = SendMessageInput.model_validate(data)

                outgoing = SendMessageOutput(
                    username=message.username,
                    message=message.message,
                    timestamp=datetime.datetime.now(datetime.timezone.utc).isoformat()
                )

            except (ValidationError, ValueError):
                await websocket.send_json({
                    "error": "Invalid message payload"
                })
                continue

            await connection_manager.broadcast(websocket, outgoing.model_dump_json())
    except WebSocketDisconnect:
        pass
    finally:
        connection_manager.disconnect(websocket)