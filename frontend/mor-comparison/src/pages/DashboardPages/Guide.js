import React from "react";
import { FirebaseContext } from "../../components/Firebase";

class Guide extends React.Component{

    render(){
        return(
            <FirebaseContext.Consumer>
                {context=>{
                    return(
                        <h1>This is the Guide</h1>
                    )
                }}
            </FirebaseContext.Consumer>
        )
    }
}

export default Guide