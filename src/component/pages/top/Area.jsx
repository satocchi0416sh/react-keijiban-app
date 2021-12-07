import { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import Axios from "axios"
import Thread from "../../ui/Thread"
import { Pagination } from "@mui/material"
import { Box } from "@mui/system"

function Area(props) {
    const { id, username, category } = props
    const [threList, setThreList] = useState([])
    const { area } = useParams()
    const history = useHistory()

    const ITEMS_IN_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [itemCount, setItemCount] = useState(1);

    useEffect(() => {
        Axios.post("https://dark-tanushimaru-0706.lolipop.io/getThreads", {
            area: area
        })
            .then((response) => {
                setThreList(response.data)
                setItemCount((response.data).length)
                setMaxPage(Math.floor((response.data).length / ITEMS_IN_PAGE) + 1)
            })
    }, [])

    useEffect(() => {
        console.log(itemCount);
        console.log(maxPage)
        console.log(currentPage)
    }, [itemCount, maxPage, currentPage])

    const pageDidUpdate = () => {
        window.scroll({ top: 0 });
    }

    return (
        <div className="top-page top-container" id={"scroll-area"}>
            <main className="main">
                {id === undefined || id === null ?
                    <button className="app-btn" onClick={() => { history.push("/login") }}>ログインして投稿する</button>
                    :
                    <button className="app-btn" onClick={() => { history.push(`/appload/${id}`) }}>投稿する</button>
                }
                {threList.map((data, index) => {
                    if (index >= (currentPage - 1) * ITEMS_IN_PAGE
                        && index < currentPage * ITEMS_IN_PAGE)
                        return (
                            <Thread key={index} threId={data.threId} userId={data.userId}
                                title={data.title} text={data.text} date={data.date}
                                time={data.time} id={id} username={username} userCategory={category} />
                        )
                    return null
                })}
                <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
                    <Pagination count={maxPage} size="large" onChange={(e, value) => { setCurrentPage(value); pageDidUpdate() }} />
                </Box>
            </main>
            <div class="sidebar">
                <div class="sidebar__item sidebar__item--fixed">
                    <a href="#"><img className="img" src="https://picsum.photos/200" alt="" /></a>
                </div>
            </div>

        </div>
    )
}
export default Area