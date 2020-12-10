import React from "react";
import { FirebaseContext } from "../../components/Firebase";
import '../../styles/GlobalStylesheet.css'
import SearchBar from "material-ui-search-bar";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Link, ListItemText } from "@material-ui/core";
import CardComponent from "../../components/CardComponent";
// import { FieldValue } from "@google-cloud/firestore";
import { toast } from "react-toastify";
import { firestore } from "firebase";

class Explore extends React.Component {

    state = {
        options: ["hell"],
        loading: false,
        query: "",
        user: null,
        models: [],
        sheets: [],
    }

    changeModelLinking(doc, context) {
        context.db.collection('cross-user-model-links').where("uid", '==', context.auth.currentUser.uid)
            .limit(1)
            .get()
            .then(snapshot => {
                snapshot.forEach(snap => {
                    var models = snap.data().models
                    console.log(models);
                    if (!models.includes(doc.id)) {
                        context.db.collection('cross-user-model-links')
                            .doc(snap.id)
                            .update({
                                models: firestore.FieldValue.arrayUnion(doc.id)
                            })
                        toast.success("Linked to you")
                    }
                    else {
                        context.db.collection('cross-user-model-links')
                            .doc(snap.id)
                            .update({
                                models: firestore.FieldValue.arrayRemove(doc.id)
                            })
                        toast.info("Unlinked from you")

                    }
                })
            })
    }

    changeSheetMusicLinking(doc, context) {
        context.db.collection('cross-user-sheetMusic-links').where("uid", '==', context.auth.currentUser.uid)
            .limit(1)
            .get()
            .then(snapshot => {
                snapshot.forEach(snap => {
                    var sheets = snap.data().sheets
                    console.log(sheets);
                    if (!sheets.includes(doc.id)) {
                        context.db.collection('cross-user-sheetMusic-links')
                            .doc(snap.id)
                            .update({
                                sheets: firestore.FieldValue.arrayUnion(doc.id)
                            })
                        toast.success("Linked to you")
                    }
                    else {
                        context.db.collection('cross-user-sheetMusic-links')
                            .doc(snap.id)
                            .update({
                                sheets: firestore.FieldValue.arrayRemove(doc.id)
                            })
                        toast.info("Unlinked from you")

                    }
                })
            })
    }

    render() {
        return (
            <FirebaseContext.Consumer>
                {context => {
                    return (
                        <div className="GenericContainer">
                            <h1>Explore others' work and link to yourself.</h1>
                            <h4>Explore others' work and link to yourself.</h4>
                            <p> Enter the exact registered email address of the user you are trying to search. Yes you need to know the user exists beforehand ;)</p>

                            <SearchBar
                                onChange={(value) => {
                                    this.setState({ query: value })
                                }}
                                onRequestSearch={() => {
                                    context.db.collection('users').where("email", "==", this.state.query.toLowerCase().replace('/\s/g', ''))
                                        .limit(1)
                                        .get()
                                        .then(snapshot => {
                                            snapshot.forEach(doc => {
                                            this.setState({ user: doc.data() })

                                            context.db.collection('models').where("owner", '==', this.state.user.uid).get()
                                                .then(snapshot => {
                                                    console.log(snapshot)
                                                    this.setState({
                                                        models: []
                                                    })
                                                    snapshot.forEach(doc => {
                                                        this.setState({
                                                            models: this.state.models.concat(doc)
                                                        })
                                                    });
                                                })

                                            context.db.collection('sheet-music').where("owner", '==', this.state.user.uid).get()
                                                .then(snapshot => {
                                                    console.log(snapshot)
                                                    this.setState({
                                                        sheets: []
                                                    })
                                                    snapshot.forEach(doc => {
                                                        this.setState({
                                                            sheets: this.state.sheets.concat(doc)
                                                        })
                                                    });
                                                })
                                        })
                                })

                                }
                                }
                                style={{
                                    maxWidth: "80%",
                                    margin: 'auto'
                                }}
                            />



                            {(this.state.user) ?
                                <CardComponent
                                    style={{ marginTop: "10px" }}>
                                    <h2>{this.state.user.email}</h2>

                                    <h3>Models</h3>
                                    <FormControl
                                        variant="standard">
                                        <FormGroup>
                                            {this.state.models.map((doc) => {
                                                var model = doc.data()
                                                return (
                                                    <Link
                                                        onClick={() => this.changeModelLinking(doc, context)}
                                                    >
                                                        <b>{model.modelName}</b><br />
                                                        <p>{model.modelDescription}</p>
                                                    </Link>
                                                )
                                            })
                                            }
                                        </FormGroup>
                                    </FormControl>


                                    <h3>Sheet Music</h3>
                                    <FormControl
                                        variant="standard">
                                        <FormGroup>
                                            {this.state.sheets.map((doc) => {
                                                var sheet = doc.data()
                                                return (
                                                    <Link
                                                        onClick={() => this.changeSheetMusicLinking(doc, context)}
                                                    >
                                                        <b>{sheet.name}</b><br />
                                                    </Link>
                                                )
                                            })
                                            }
                                        </FormGroup>
                                    </FormControl>

                                </CardComponent>
                                : <div />}
                        </div>
                    )
                }}
            </FirebaseContext.Consumer>
        )
    }
}

export default Explore