import React , {useEffect} from 'react';
import { useHistory } from "react-router-dom";

export default function Logout() {
    let history = useHistory();
    function logout(){
        localStorage.clear();
        localStorage.setItem("id" , 1);
        history.push("/");
        window.location.reload(true);
    }
    const buttonStyle = {
        position: "absolute",
        right: "1%",
        border: "none",
        width: "90px",
        fonrSize: "10px",
        padding: "0"
    };

    useEffect(() => {
        if(localStorage.getItem("id") == 1){
            console.log("logout");
document.getElementById("logout").style.display="none";
        }
    }, [])
    return (
        <div>
            <button style={buttonStyle} class="btn btn-warning" id="logout" onClick={logout}>Log Out</button>
        </div>
    )
}
