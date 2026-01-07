import os
import smtplib
from email.message import EmailMessage
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

TO_EMAIL = "ehiomhentreasureruth@gmail.com"
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASS = os.getenv("SMTP_PASS", "")

app = FastAPI(title="Clario Suggestions API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class Suggestion(BaseModel):
    category: str = Field(..., min_length=2, max_length=100)
    message: str = Field(..., min_length=10, max_length=5000)
    email: EmailStr | None = None


def send_email(suggestion: Suggestion):
    if not SMTP_USER or not SMTP_PASS:
        raise RuntimeError("SMTP credentials missing. Set SMTP_USER/SMTP_PASS.")

    msg = EmailMessage()
    msg["Subject"] = f"New Clario Suggestion: {suggestion.category}"
    msg["From"] = SMTP_USER
    msg["To"] = TO_EMAIL

    body = [
        f"Category: {suggestion.category}",
        f"Email: {suggestion.email or 'N/A'}",
        "",
        suggestion.message,
    ]
    msg.set_content("\n".join(body))

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        server.send_message(msg)


@app.post("/suggestions")
async def create_suggestion(suggestion: Suggestion):
    try:
        send_email(suggestion)
        return {"status": "ok"}
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:  # pragma: no cover
        raise HTTPException(status_code=500, detail="Failed to send email") from e


@app.get("/health")
async def health():
    return {"status": "ok"}
