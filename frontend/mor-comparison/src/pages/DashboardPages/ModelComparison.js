import React from "react";
import { FirebaseContext } from "../../components/Firebase";

class ModelComparason extends React.Component{
    render(){
        return(
            <FirebaseContext.Consumer>
                {context=>{
                    return(
                        <h1>This is the Model Comparison</h1>
                    )
                }}
            </FirebaseContext.Consumer>
        )
    }
}

export default ModelComparason