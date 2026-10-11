from pydantic import BaseModel, Field

class SendMessageInput(BaseModel):
    username: str = Field(min_length=1)
    message: str = Field(min_length=1)

class SendMessageOutput(BaseModel):
    username: str
    message: str
    timestamp: str