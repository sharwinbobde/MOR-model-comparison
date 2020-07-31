import React from "react";
import { FirebaseContext } from "../../components/Firebase";

class Overview extends React.Component{
    render(){
        return(
            <FirebaseContext.Consumer>
                {context=>{
                    return(
                        <h1>This is the Overview</h1>
                    )
                }}
            </FirebaseContext.Consumer>
        )
    }
}

export default Overview