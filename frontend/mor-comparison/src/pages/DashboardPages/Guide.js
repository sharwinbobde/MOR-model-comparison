import React from "react";
import { FirebaseContext } from "../../components/Firebase";
import '../../styles/GlobalStylesheet.css'

class Guide extends React.Component {

    render() {
        return (
            <FirebaseContext.Consumer>
                {context => {
                    return (
                        <div className="GenericContainer">
                            <h1>This is the Guide</h1>
                        </div>
                    )
                }}
            </FirebaseContext.Consumer>
        )
    }
}

export default Guide