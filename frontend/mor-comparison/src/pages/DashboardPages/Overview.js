import React from "react";
import { FirebaseContext } from "../../components/Firebase";
import '../../styles/GlobalStylesheet.css'
import CardComponent from "../../components/CardComponent";

class Overview extends React.Component {

    state = {
        fetchedModels: false,
        fetchedSheetMusic: false,
        fetchedComments: false,

        numModels: 0,
        numSheets: 0,
        numNotes: 0,

    }


    render() {
        return (
            <FirebaseContext.Consumer>
                {context => {


                    // Fetch Your models
                    if (!this.state.fetchedModels) {
                        context.db.collection('models').where("owner", '==', context.auth.currentUser.uid).get()
                            .then(snapshot => {
                                // console.log(snapshot)
                                this.setState({ numModels: snapshot.size })
                            })
                        this.setState({ fetchedModels: true })
                    }

                    if (!this.state.fetchedSheetMusic) {
                        context.db.collection('sheet-music').where("users", 'array-contains', context.auth.currentUser.uid).get()
                            .then(snapshot => {
                                // console.log(snapshot)
                                this.setState({ numSheets: snapshot.size })
                            })

                        this.setState({ fetchedSheetMusic: true })
                    }
                    if (!this.state.fetchedComments) {
                        context.db.collection('model-comments').where("user", '==', context.auth.currentUser.uid).get()
                            .then(snapshot => {
                                // console.log(snapshot)
                                this.setState({ numNotes: snapshot.size })
                            })
                        this.setState({ fetchedComments: true })
                    }

                    return (
                        <div className="GenericContainer">
                            <h1>Overview</h1>

                            <CardComponent>

                                <p>You have <b>{this.state.numModels}</b> models.</p>
                                <p>You have <b>{this.state.numSheets}</b> pieces of sheet music.</p>
                                <p>You have <b>{this.state.numNotes}</b> notes on models.</p>
                            </CardComponent>
                        </div>

                    )
                }}
            </FirebaseContext.Consumer>
        )
    }
}

export default Overview