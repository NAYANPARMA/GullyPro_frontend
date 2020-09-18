import React, { useEffect, useState } from "react";
import { dateAdd } from "./istFunction";
import { history } from "./history";
import { environment } from "../environment";

function CountdownTimer(props) {
  let difference;
  const calculateTimeLeft = () => {
    const matchdate=props.matchdate
    difference = +dateAdd(new Date(matchdate), 'minute', environment.IST_OFFSET) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60)
      };
    } else {
      if((window.location.pathname.includes('dashboard') || window.location.pathname =='/')){
        // console.log('refers', timeLeft, props, props.matchdate);
        window.location.reload();
      }
      
      if(window.location.pathname.includes('/contests/list')){
        let url = window.location.pathname;
        url = url.split('/');
        let matchId = url[3];
        history.replace('/contests/user-joined-contest/'+matchId);
      }
    }
    // console.log(timeLeft);
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer =setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return ()=>clearTimeout(timer);
  },);

  const timerComponents = [];
  Object.keys(timeLeft).map(interval => {
    // console.log(interval);

    
    if (!timeLeft[interval]) {
      // console.log(interval, timeLeft[interval]);
      return;
    }
    if (interval == "d")
    {
    timerComponents.push(
     <span key={interval}>
         {timeLeft[interval]} {interval}{" "}
     </span>
   );
  }
  else if(interval == "h"){
    timerComponents.push(
      <span key={interval}>
           {timeLeft[interval]} {interval}
      </span>
    );
  }
  else{
    timerComponents.push(
      <span key={interval}>
        {" "}{timeLeft[interval]} {interval}
      </span>
    );
    
  }   
  });
  if(timerComponents.length > 0){
    // console.log(1, timerComponents[0].key);
    if(timerComponents[0].key == 'd'){
      timerComponents.pop();
      timerComponents.pop();
    } 
    
    // if(timerComponents[0].key == 'h'){
    //   timerComponents.pop();
    // }

    // console.log(2, timerComponents[0].key);
  }
  return (
    <div>
       {timerComponents.length ? timerComponents : (difference < 0) ? <span> Match Live </span> : null}
    </div>
  );
}
export default CountdownTimer;
