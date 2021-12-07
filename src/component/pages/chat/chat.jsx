import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import Axios from "axios"
import Talk from "./Talk";

const Chat = (props) => {
    const { id, name, sendMessage, newMessage } = props
    const [messageList, setMessageList] = useState([])
    const [message, setMessage] = useState("")
    const messagesEndRef = useRef(null)
    const history = useHistory()
    const { state } = useLocation();
    const { rId } = useParams();
    useEffect(() => {
        Axios.get(`https://dark-tanushimaru-0706.lolipop.io/getMessages/${id}/${rId}`)
            .then((response) => {
                setMessageList(response.data);
                console.log(response.data)
            })
    }, [id, rId])

    useEffect(() => {
        Axios.post(`https://dark-tanushimaru-0706.lolipop.io/${id}/${rId}`)
    }, [])

    useEffect(() => {
        if (newMessage.sId === Number(rId)) {
            setMessageList(messageList => [...messageList, newMessage])
            scrollToBottom()
            Axios.post(`https://dark-tanushimaru-0706.lolipop.io/${id}/${rId}`)
        }
    }, [newMessage])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const onClickSend = (e) => {
        e.preventDefault()
        const today = new Date();
        const year = String(today.getFullYear())
        const month = String(Number(today.getMonth()) + Number(1))
        const date = String(today.getDate())
        const allDate = year + "/" + month + "/" + date;
        const hour = today.getHours()
        let minute = String(today.getMinutes())

        if (minute.length === 1) {
            minute = "0" + minute
        }
        console.log(minute)
        const allTime = hour + ":" + minute
        const realDate = month + "/" + date
        sendMessage(rId, message, allDate, allTime, realDate)

        setMessageList([...messageList, {
            sId: id,
            sName: name,
            rId: Number(rId),
            text: message,
            date: realDate,
            time: hour + ":" + minute
        }])
        setMessage("")
    }

    return (
        <div>
            <div className="chatTop">
                <h2><span><i onClick={() => { history.goBack() }} className="fas fa-chevron-left"></i></span><span> </span> {state.rName}</h2>
                <div className="clear"></div>
            </div>
            <div className="talk">
                {messageList.map((data, index) => {
                    if (data.sId === id) {
                        return (
                            <div key={index}>
                                <Talk pos="right" name={data.sName} message={data.text} date={data.date} time={data.time} category={state.category} />
                            </div>
                        )
                    } else {
                        return (
                            <div key={index}>
                                <Talk pos="left" name={data.sName} message={data.text} date={data.date} time={data.time} category={state.category} />
                            </div>
                        )
                    }

                })}
                <br /><br /><br /><br /><br />
                <div ref={messagesEndRef} />
            </div>
            <div className="chatBottom" >
                <form onSubmit={onClickSend}>
                    <input type="text" placeholder='メッセージを入力' value={message}
                        onChange={(e) => { setMessage(e.target.value) }} required />
                    <button type="submit">送信</button>
                </form>
            </div>



        </div>
    );
}

export default Chat