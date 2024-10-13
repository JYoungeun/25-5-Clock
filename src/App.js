import './App.css';

function App() {
  return (
    <div id="clock">
      <h1>25 + 5 Clock</h1>
      <div id="break-session">
        <div id="break-label">Break Length</div>
        <div id="session-label">Session Length</div>
      </div>
      <div id="time-controls">
        <button id="break-decrement"></button>
        <div id="break-length">5</div>
        <button id="break-increment"></button>
        <button id="session-decrement"></button>
        <div id="session-length">25</div>
        <button id="session-increment"></button>
      </div>
      <div id="timer-label">Session</div>
      <div id="time-left"></div>
      <div id="start-stop-reset">
        <button id="start_stop"></button>
        <button id="reset"></button>
      </div>
    </div>
  );
}

export default App;
