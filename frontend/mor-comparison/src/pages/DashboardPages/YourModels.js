import React from "react";
import { FirebaseContext } from "../../components/Firebase";
import { FormControl, Select, MenuList, InputLabel, MenuItem, Button } from "@material-ui/core";
import PdfViewer from "../../components/PdfViewer";
import ModelOverview from "../../components/Dashboard/ModelOverview";
import { toast } from 'react-toastify';

class YourModels extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedSheetMusicDoc: null,
            sheetMusic: [],
            models: [],
            fetchedModels: false,
            fetchedSheetMusic: false
        }
    }

    pickSheetMusic(event, context) {
        var doc = event.target.value
        if (doc) { // non-null
            var sheet = doc.data()
            this.setState({ selectedSheetMusicDoc: doc })
        }
        else {
            this.setState({ selectedSheetMusicDoc: null })
        }
    }

    createNewModel(context) {
        const empty_model = {
            owner: context.auth.currentUser.uid,
            modelName: "Blank model",
            modelDescription: "<Description>",
            authorNotes: "<The author should edit this>",
            hyperparameters: { purpose: 'Your model\'s hyperparameters' }
        }

        context.db.collection('models').add(empty_model)
            .then(ref => {
                toast.success("Created, Refresh might be required.")
                console.log(ref.id)
                this.setState({})
            })
            .catch(error => toast.error("Something went wrong."))
    }


    render() {
        return (
            <FirebaseContext.Consumer>
                {context => {
                    if (!this.state.fetchedModels) {
                        context.db.collection('models').where("owner", '==', context.auth.currentUser.uid).get()
                            .then(snapshot => {
                                console.log(snapshot)
                                snapshot.forEach(doc => {
                                    this.setState({
                                        models: this.state.models.concat(doc)
                                    })
                                });
                            })
                        this.setState({ fetchedModels: true })
                    }

                    if (!this.state.fetchedSheetMusic) {
                        context.db.collection('sheet-music').where("users", 'array-contains', context.auth.currentUser.uid).get()
                            .then(snapshot => {
                                console.log(snapshot)
                                snapshot.forEach(doc => {
                                    this.setState({
                                        sheetMusic: this.state.sheetMusic.concat(doc)
                                    })
                                });
                            })

                        this.setState({ fetchedSheetMusic: true })
                    }

                    return (
                        <div className="ModelComparasonContainer">
                            <h1>Your Models</h1>
                            <h2>Step 1. Select your sheet music.</h2>
                            <FormControl
                                variant="standard">
                                <InputLabel>Select sheet music</InputLabel>
                                <Select
                                    style={{ width: "500px" }}
                                    value={this.state.selectedSheetMusicDoc}
                                    onChange={event => this.pickSheetMusic(event, context)}>

                                    <MenuItem style={{ padding: "10px" }} value={null}>--</MenuItem>

                                    {this.state.sheetMusic.map(doc => {
                                        var sheet = doc.data()
                                        return (
                                            <MenuItem style={{ padding: "10px" }} value={doc}>{sheet.name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            <br />

                            <h2>Step 2. Edit your models.</h2>

                            <Button style={{ margin: "1%" }} onClick={() => this.createNewModel(context)}>Create New Model</Button>

                            {this.state.models.map(doc => {
                                var model = doc.data()
                                return (
                                    <ModelOverview
                                        id={doc.id}
                                        model={model}
                                        sheetMusicDoc={this.state.selectedSheetMusicDoc}
                                        deletable={true}
                                        editable={true}
                                    />);
                            })}

                        </div>
                    );
                }}
            </FirebaseContext.Consumer>
        )
    }
}


export default YourModels