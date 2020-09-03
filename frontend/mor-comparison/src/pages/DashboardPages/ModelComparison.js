import React from "react";
import { FirebaseContext } from "../../components/Firebase";
import { FormControl, Select, MenuList, InputLabel, MenuItem, FormLabel, FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import '../../styles/GlobalStylesheet.css'
import ModelOverview from "../../components/Dashboard/ModelOverview";
import CardComponent from "../../components/CardComponent";
import PdfViewer from "../../components/PdfViewer";

import { toast } from 'react-toastify';

class ModelComparason extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        // userName: "",
        selectedSheetMusicDoc: null,
        sheetMusic: [],
        models: [],
        SheetMusicLink: '',

        fetchedModels: false,
        fetchedSheetMusic: false,
    }

    changeModelVisibility(doc) {
        if (doc.visible) {
            if (doc.visible == true) { // True
                doc.visible = false
            } else if (doc.visible == false) {
                doc.visible = true
            }
        }
        else {
            doc.visible = true
        }
        console.log(doc)
        this.setState({})
    }

    pickSheetMusic(event, context) {
        var doc = event.target.value
        if (doc) { // non-null
            var sheet = doc.data()
            this.setState({ selectedSheetMusicDoc: doc })

            var storageRef = context.storage.ref().child("sheet-music/" + doc.id)
            storageRef.getDownloadURL()
                .then(url => {
                    this.setState({ SheetMusicLink: url })
                    console.log(url)
                })
                .catch(error => {
                    toast.error("Couldnt fetch a file!!")
                    this.setState({ SheetMusicLink: "" })
                })
        }
        else {
            this.setState({ selectedSheetMusicDoc: null })
        }
    }

    render() {
        return (
            <FirebaseContext.Consumer>
                {context => {

                    // Fetch Your models
                    if (!this.state.fetchedModels) {
                        context.db.collection('models').where("owner", '==', context.auth.currentUser.uid).get()
                            .then(snapshot => {
                                console.log(snapshot)
                                snapshot.forEach(doc => {
                                    doc.visible = false// hidden at first until clicked the checkbox
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
                        <div class="ModelComparasonContainer">
                            <h1>Hello{this.state.userName}, happy comparing!</h1>

                            <FormControl
                                variant="standard">



                                <h2>Step 1. Pick Models</h2>
                                <FormGroup>
                                    {this.state.models.map(doc => {
                                        var model = doc.data()
                                        return (
                                            <FormControlLabel
                                                label={model.modelName}
                                                control={<Checkbox checked={model.visible} onChange={() => this.changeModelVisibility(doc)} name={"hmmmm"} />}
                                            />
                                        )
                                    })
                                    }
                                </FormGroup>
                            </FormControl><br />

                            <h2>Step 2. Select Sheet Music</h2>
                            <FormControl>
                                <FormGroup>

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
                                </FormGroup>
                            </FormControl>

                            {(this.state.selectedSheetMusicDoc) ?
                                <PdfViewer pdf={this.state.SheetMusicLink} />
                                : <div />}

                            <div className="horizontalComparison">

                                {this.state.models.map(doc => {
                                    var model = doc.data()
                                    if (doc.visible)
                                        return (
                                            <ModelOverview
                                                id={doc.id}
                                                model={model}
                                                sheetMusicDoc={this.state.selectedSheetMusicDoc}
                                            />);
                                })}

                            </div>
                        </div>
                    )
                }}
            </FirebaseContext.Consumer>
        )
    }
}

export default ModelComparason