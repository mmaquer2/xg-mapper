'use client'
import { useState, useEffect } from 'react';
import styles from './page.module.css'

export default function Home() {

  const [state,setState] = useState({
    home_score:0,
    away_score:0,
    shots:[],
    goals:[]

  });

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startClock = () => setIsRunning(true);
  const stopClock = () => setIsRunning(false);

  // Format time as MM:SS
  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  
  const handleFieldClick = (event:any) => {
    const bounds = event.target.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top; 
    
    console.log("Click Coordinates:", x, y);
    
    const shot = {
      x: x,
      y: y,
      time: time
    }

    console.log(shot);
    setState(prevState => ({
      ...prevState,
      shots: [...prevState.shots, shot]
    }));

    console.log("shots:", state.shots);
    submitShot(shot);
  
  };

  const submitShot = () => {
      // todo: submit shot to the database...
  }

  const exportShotReportToCsv = () => {
    // export shot report to csv
    console.log("exporting shots...")
    state.shots.forEach(shot => {
      console.log(shot);
    });

    downloadJson(state.shots, "shots.json");

  }

  function downloadJson(jsonObj:any, fileName:string) {
    const jsonStr = JSON.stringify(jsonObj);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  
  function recordHomeShot(){
    // record last x,y selected on the field

  }

  function recordAwayShot(){
    // record last x,y selected on the field


  }
  
  
  return (
    <main className={styles.main}>
    <p>
      Welcome to xG Mapper app
    </p>
    <p>Game Time: {formatTime()}</p>
      <button onClick={startClock}>Start</button>
      <button onClick={stopClock}>Stop</button>

      <button>Record Home Shot</button>
      <button>Record Away Shot</button>

      <button onClick={() => setTime(0)}>Reset</button>
    
      <button onClick = {exportShotReportToCsv}>Generated Shot Report</button>

      <div className={styles.scoreboard}>
      <p>Home Score</p>
      <p>away Score</p>
      <p>shots</p>
      <p>shots</p>

      </div>



    <div className={styles.soccerField} onClick={handleFieldClick}>
      <img src="/field.svg" alt="Soccer Field" />
    </div>
  </main>
  )
}
