import React from "react";
import { FirebaseContext } from "../../components/Firebase";
import { FormControl, Select, MenuList, InputLabel, MenuItem, Button, TextField } from "@material-ui/core";
import PdfViewer from "../../components/PdfViewer";
import ModelOverview from "../../components/Dashboard/ModelOverview";
import { toast } from 'react-toastify';
import File_uploader from "../../components/File_uploader";

class YourSheetMusic extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        selectedSheetMusicDoc: null,
        sheetMusic: [],
        fetchedSheetMusic: false,
        SheetMusicLink: "",

        changedPieceName: "",

        upload_SheetMusicName: ""
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

    createSheetMusicEntry(context) {
        if (this.state.upload_SheetMusicName == "")
            return
        var doc = {
            users: [context.auth.currentUser.uid],
            owner: context.auth.currentUser.uid,
            name: this.state.upload_SheetMusicName,
            link: ""
        }
        context.db.collection('sheet-music').add(doc)
            .then(docRef => {
                toast.success("Entry created")
            })
            .catch(error => {
                console.log(error)
                toast.error("Something went wrong.")
            })
    }

    render() {
        console.log('rerendering');
        return (
            <FirebaseContext.Consumer>
                {context => {
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
                            <h1>This is your sheet music</h1>
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
                            {(this.state.selectedSheetMusicDoc) ?
                                <div>
                                    <PdfViewer pdf={this.state.SheetMusicLink} />
                                    <h3> Change piece name </h3>
                                    <TextField
                                        label="Piece Name"
                                        value={this.state.changedPieceName}
                                        onChange={event => this.setState({ changedPieceName: event.target.value })}
                                    />
                                    <Button color="primary" onClick={() => {
                                        context.db.collection("sheet-music").doc(this.state.selectedSheetMusicDoc.id).update({ name: this.state.changedPieceName })
                                            .then(ref => toast.success("Name changed"))

                                    }}>Change</Button>



                                    <h3> Change the associated file</h3>
                                    <File_uploader
                                        accept=".pdf"
                                        storageTarget={"sheet-music/" + this.state.selectedSheetMusicDoc.id} />


                                    <h3> You can also delete this piece</h3>
                                    <Button color="primary" onClick={() => {
                                        context.db.collection("sheet-music").doc(this.state.selectedSheetMusicDoc.id).delete()
                                            .then(ref => toast.success("Deleted!"))
                                    }}>Delete</Button>
                                    <br/>
                                </div> : <div />}




                            <br />





                            <h1>You can create more entries</h1>

                            <FormControl>
                                <TextField
                                    label="Piece Name"
                                    value={this.state.upload_SheetMusicName}
                                    onChange={event => { this.setState({ upload_SheetMusicName: event.target.value }) }} />
                                <br />
                                <Button color="primary" onClick={(event) => this.createSheetMusicEntry(context)}>Submit</Button>
                            </FormControl>



                            {/* <Button style={{margin: "1%"}} onClick={() => this.createNewModel(context)}>Create New Model</Button>

                            <h2>Your Models</h2>

                            {this.state.models.map(doc =>{
                                var model = doc.data()
                                return(
                                <ModelOverview
                                id={doc.id}
                                model={model}
                                deletable={true}
                                editable={true}
                                />);
                            })} */}

                        </div >
                    );
                }
                }
            </FirebaseContext.Consumer >
        )
    }
}


export default YourSheetMusic