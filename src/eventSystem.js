class EventSystem {
  constructor() {
    this.eventLog = document.getElementById("eventLog");
  }

  log(message) {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement("div");
    logEntry.textContent = `[${timestamp}] ${message}`;
    this.eventLog.appendChild(logEntry);

    // 스크롤을 맨 아래로 유지
    this.eventLog.scrollTop = this.eventLog.scrollHeight;
  }
}

export default EventSystem;
