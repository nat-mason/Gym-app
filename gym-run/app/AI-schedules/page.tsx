"use client";

import { useState, FormEvent } from "react";

export default function AiSchedulesPage() {
  const [userMessage, setUserMessage] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userMessage }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data.response);
      } else {
        setResponse(data.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setResponse("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>AI Schedules</h1>
      <form onSubmit={sendMessage}>
        <textarea
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          rows={4}
          cols={50}
          placeholder="Type your message here..."
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
      {response && (
        <div style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
