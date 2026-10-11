import asyncio
import json
import websockets

async def main():
    # connect websocket to the backend ws url
    uri = "ws://localhost:8000/message"

    async with websockets.connect(uri) as socket:
        print("connected! Enter input")

        async def receive_messages():
            async for message in socket:
                print(f"\nReceived: {message}")

        receiver = asyncio.create_task(receive_messages())

        try:
            while True:
                # get input in separate thread pool
                message = await asyncio.to_thread(input, "> ")

                payload = {
                    "username": "Yatharth",
                    "message": message,
                }

                await socket.send(json.dumps(payload))
        finally:
            receiver.cancel()



asyncio.run(main())