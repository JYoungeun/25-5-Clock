import { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isBreak, setIsBreak] = useState(false);

  const handleStartStop = () => {
    setIsPlaying(!isPlaying);
    const beep = document.getElementById('beep');
    beep.load();
  };

  useEffect(() => {
    let timer;
    const beep = document.getElementById('beep');

    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      beep.play();
      
      setTimeout(() => {
        setIsBreak(prev => !prev);
        setTimeLeft(isBreak ? sessionLength * 60 : breakLength * 60);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, isBreak, sessionLength, breakLength]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const incrementSession = () => {
    setSessionLength(prevLength => {
      const newLength = Math.min(prevLength + 1, 60);
      if (!isPlaying) {
        setTimeLeft(newLength * 60);
      }
      return newLength;
    });
  };

  const decrementSession = () => {
    setSessionLength(prevLength => {
      const newLength = Math.max(prevLength - 1, 1);
      if (!isPlaying) {
        setTimeLeft(newLength * 60);
      }
      return newLength;
    });
  };

  const incrementBreak = () => {
    setBreakLength(prevLength => {
      const newLength = Math.min(prevLength + 1, 60);
      if (!isPlaying && isBreak) {
        setTimeLeft(newLength * 60);
      }
      return newLength;
    });
  };

  const decrementBreak = () => {
    setBreakLength(prevLength => {
      const newLength = Math.max(prevLength - 1, 1);
      if (!isPlaying && isBreak) {
        setTimeLeft(newLength * 60);
      }
      return newLength;
    });
  };

  const handleReset = () => {
    const beep = document.getElementById('beep');
    beep.pause();
    beep.currentTime = 0;
    setSessionLength(25);
    setBreakLength(5);
    setTimeLeft(25 * 60);
    setIsPlaying(false);
    setIsBreak(false);
  };

  return (
    <div id="clock">
      <audio id="beep" src="/beep.wav" />
      <h1>25 + 5 Clock</h1>
      <p><i>Pomodoro</i></p>
      <div id="break-session">
        <div id="break-label">Break Length</div>
        <div id="session-label">Session Length</div>
      </div>
      <div id="timer-controls">
        <button className="arrow-button down" id="break-decrement" onClick={decrementBreak}></button>
        <div id="break-length">{breakLength}</div>
        <button className="arrow-button up" id="break-increment" onClick={incrementBreak}></button>
        <button className="arrow-button down" id="session-decrement" onClick={decrementSession}></button>
        <div id="session-length">{sessionLength}</div>
        <button className="arrow-button up" id="session-increment" onClick={incrementSession}></button>
      </div>
      <div id="timer">
        <div id="timer-label">{isBreak ? 'Break' : 'Session'}</div>
        <div id="time-left">{formatTime(timeLeft)}</div>
      </div>
      <div id="start-stop-reset">
        <button
          id="start_stop"
          className={`play-button ${isPlaying ? 'playing' : ''}`}
          onClick={handleStartStop}
        ></button>
        <button 
          id="reset" 
          className="reset-button" 
          onClick={handleReset}
        >
          <FontAwesomeIcon icon={faSync} />
        </button>
      </div>
    </div>
  );
}

export default App;
