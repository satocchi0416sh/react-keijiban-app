import { Close } from "@mui/icons-material"
import { Alert, AlertTitle, Collapse, IconButton, Typography } from "@mui/material"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import "./Top.css"

function Top(props) {
    const history = useHistory()
    const data = [
        { title: "北海道掲示板", link: "hokkaido" },
        { title: "東北掲示板", link: "tohoku" },
        { title: "関東掲示板", link: "kanto" },
        { title: "甲信越掲示板", link: "koshinetsu" },
        { title: "北陸掲示板", link: "hokuriku" },
        { title: "東海掲示板", link: "tokai" },
        { title: "近畿掲示板", link: "kinki" },
        { title: "中国掲示板", link: "tyugoku" },
        { title: "四国掲示板", link: "shikoku" },
        { title: "九州沖縄掲示板", link: "kyushu" }
    ]
    const goArea = (area) => {
        history.push(`/area/${area}`)
    }

    const [open, setOpen] = useState(true);
    return (
        <div className="top-page">
            <Collapse in={open}>
                <Alert
                    severity="warning"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <Close fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 5, maxWidth: "sm", mx: "auto" }}
                >
                    <AlertTitle>注意</AlertTitle>
                    ここに注意事項が入ります。 — <strong>強調することもできます。</strong>
                </Alert>
            </Collapse>
            <div className="container">
                <h1>地域別</h1>
                {data.map((data, index) => {
                    return (
                        <button key={index} onClick={() => { goArea(data.link) }}>{data.title}</button>
                    )
                })}
                <div className="clear-left"></div>
            </div>
        </div >
    )
}
export default Top