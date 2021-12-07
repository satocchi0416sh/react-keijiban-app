import React from 'react'
import Image1 from "../../images/115946.jpg"
import Image2 from "../../images/147190.jpg"
import "./Talk.css"
function Talk(props) {
    const { pos, message, name, date, time, category } = props;
    let newTime;
    console.log(time.charAt(0) === "0")
    if( time.charAt(0) === "0" ){
        newTime = time.charAt(1) + ":" + time.charAt(3) + time.charAt(4)
    }else{
        newTime = time
    }

    if (pos === "left") {
        if( category === "純男"){
            return (
                <div className="talk-left">
                    <img className={"talk-left-img"} src={Image1} alt="" />
                    <p>{message}</p>
                    <h5>{date}  {newTime}</h5>
                </div>
            )
        }else{
            return (
                <div className="talk-left">
                    <img className={"talk-left-img"} src={Image2} alt="" />
                    <p>{message}</p>
                    <h5>{date}  {newTime}</h5>
                </div>
            )
        }
        
    }
    else {
        return (
            <div className="talk-right">
                <p>{message}</p>
                <h5 className="right-time">{date}  {newTime}</h5>
            </div>
        )
    }


}

export default Talk
