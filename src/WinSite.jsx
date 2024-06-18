import Confetti from "react-confetti";
import trophyImage from "./assets/trophy.jpg";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
function WinSite() {
    let {player} = useParams();
    useEffect(() => {
        typeWritter("winText", "Gratuliere Spieler " + player, 60)
    }, []);
    async function typeWritter(htmlID, text, delayBetween){
        let array = Array.from(text);
        let i = 0;
        let wholeText = "";
        function type(){
            if (i < array.length) {
                wholeText += array[i];
                document.getElementById(htmlID).innerHTML = wholeText;
                ++i;
                window.setTimeout(type, delayBetween)
            }
        }
        type();
    }
    return(
        <div className="mainContainer">
            <Confetti></Confetti>
            <div className="columnContainer">
                <h1 id="winText"></h1>
                <img width={"700px"} src={trophyImage}/>
                <button onClick={(event) => {event.preventDefault(); window.location.href="/"}}>
                    Nochmals Spielen
                </button>
            </div>
        </div>
    )
}

export default WinSite;