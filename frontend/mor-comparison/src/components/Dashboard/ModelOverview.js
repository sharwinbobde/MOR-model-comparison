import React from 'react';
import '../../styles/GlobalStylesheet.css'
import CardComponent from '../CardComponent';
import SegmentationViewer from '../SegmentationViewer';
import InformationCard from '../InformationCard';
import JsonViewer from '../JsonViewer';

import { FirebaseContext } from "../Firebase";

import { toast } from 'react-toastify';
import { Button, FormControl, TextField, InputLabel } from '@material-ui/core';
import File_uploader from '../File_uploader';
import PdfViewer from '../PdfViewer';


class ModelOverview extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        storageImageURL: '',
        fetchedImage: false,
        fetchedUserComments: false,
        userNoteExists: false,

        fetchedModelOutputPDF: false,
        modelOutputPDF: '',


        fetchedMetricsJSON: false,
        metricsJSONDoc: null,
        metricsJSON: ''
    }

    deleteModel(context, id) {
        context.db.collection("models").doc(id).delete()
            .then(() => {
                toast.success("Deleted, Refresh might be required.")
            })
            .catch(error => {
                toast.error("Something went wrong.")
                console.log(error);
            })
    }

    editField(context, field, newData) {
        this.props.model[field] = newData
        this.setState({})
    }

    saveChanges(context) {
        console.log(this.props.model)
        context.db.collection("models").doc(this.props.id).set(this.props.model)
            .then(() => {
                toast.success("Modified, Refresh might be required.")
            })
            .catch(error => {
                toast.error("Something went wrong.")
                console.log(error);
            })
    }

    fetchMetricsJSON(context) {
        if (this.props.sheetMusicDoc) {
            var docid = "model-" + this.props.id + "-sheet-" + this.props.sheetMusicDoc.id
            console.log(docid);
            context.db.collection('model-metrics')
                .doc(docid)
                .get()
                .then(doc => {
                    // toast.success("fetched metrics")
                    this.setState({
                        metricsJSONDoc: doc,
                        metricsJSON: doc.data().metricsJSON
                    })
                })
                .catch(error => {
                    // console.log(error);
                    // toast.error("Couldnt fetch metrics")
                    this.setState({ metricsJSONDoc: null, metricsJSON: "" })
                })

            this.setState({ fetchedMetricsJSON: true })
        }
    }

    saveMetrics(context) {
        if (this.props.sheetMusicDoc) {
            context.db.collection('model-metrics').doc("model-" + this.props.id + "-sheet-" + this.props.sheetMusicDoc.id)
                .set({ metricsJSON: this.state.metricsJSON })
                .then(res => {
                    toast.success("Saved Metrics")
                })
                .catch(error => {
                    console.log(error);
                    toast.error("Something went wrong")
                })
        }
    }

    fetchOutputPdfURL(context) {
        if (this.props.sheetMusicDoc) {
            var storageRef = context.storage.ref().child("model-sheet-outputs/" + "model-" + this.props.id + "-sheet-" + this.props.sheetMusicDoc.id + ".pdf")
            storageRef.getDownloadURL()
                .then(url => {
                    this.setState({ modelOutputPDF: url })
                    console.log("url fetched")
                    console.log(url)
                })
                .catch(error => {
                    // console.log(error);
                    // toast.error("Couldnt fetch a file!!")
                    this.setState({ modelOutputPDF: "" })
                })

            this.setState({ fetchedModelOutputPDF: true })
        }
    }

    saveNote(context) {
        try {
            if (this.state.userNoteExists) {
                context.db.collection('model-comments').doc(this.state.userNoteDoc.id)
                    .set({ comment: this.state.userNotes })
            } else {
                var doc = {
                    user: context.auth.currentUser.uid,
                    model: this.props.id,
                    comment: this.state.userNotes
                }
                context.db.collection('model-comments').add(doc)
                    .then(ref => toast.success("Successfully added"))
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.")
        }
    }


    render() {
        return (

            <FirebaseContext.Consumer>
                {context => {

                    if (this.props.imageStorageLocation && this.state.fetchedImage == false) {
                        var storageRef = context.storage.ref().child(this.props.imageStorageLocation)
                        storageRef.getDownloadURL().then(url => {
                            console.log()
                            this.setState({ storageImageURL: url, fetchedImage: true })
                            console.log(this.state)
                        })
                            .catch(error => toast.error("Couldnt fetch a file!!"))
                    }

                    if (!this.state.fetchedUserComments) {
                        try {
                            context.db.collection('model-comments')
                                .where('user', '==', context.auth.currentUser.uid)
                                .where('model', '==', this.props.id)
                                .limit(1).get()
                                .then(snapshot => {
                                    snapshot.forEach(doc => {

                                        this.setState({ userNotes: doc.data().comment, userNoteExists: true, userNoteDoc: doc })
                                    })
                                })
                        } catch (error) {
                            console.log(error)
                            toast.error("Could not fetch your comments")
                        }
                        this.setState({ fetchedUserComments: true })
                    }

                    if (!this.state.fetchedModelOutputPDF) {
                        this.fetchOutputPdfURL(context)
                    }

                    if (!this.state.fetchedMetricsJSON) {
                        this.fetchMetricsJSON(context)
                    }

                    return (
                        <div className="ModelOverview">

                            <CardComponent>
                                {(this.props.editable) ?
                                    // Can edit
                                    <div>
                                        <FormControl
                                            variant="standard">

                                            {/* <InputLabel>Model Name</InputLabel> */}
                                            <TextField
                                                label="Model Name"
                                                value={this.props.model.modelName}
                                                onChange={event => this.editField(context, "modelName", event.target.value)}
                                            />

                                            <TextField
                                                label="Description"
                                                multiline
                                                rowsMax={4}
                                                value={this.props.model.modelDescription}
                                                onChange={event => this.editField(context, "modelDescription", event.target.value)}
                                            />

                                            {(this.props.sheetMusicDoc) ?
                                                <div>
                                                    <File_uploader
                                                        accept=".pdf"
                                                        storageTarget={"model-sheet-outputs/" + "model-" + this.props.id + "-sheet-" + this.props.sheetMusicDoc.id + ".pdf"}
                                                    />
                                                    <PdfViewer pdf={this.state.modelOutputPDF} /> <br />


                                                    <JsonViewer
                                                        title="Metrics"
                                                        jsonString={this.state.metricsJSON}
                                                    /><br />
                                                    <TextField
                                                        label="Metrics"
                                                        multiline
                                                        rowsMax={12}
                                                        value={this.state.metricsJSON}
                                                        onChange={event => { this.setState({ metricsJSON: event.target.value }) }}
                                                    />
                                                    <br />

                                                    <Button color="primary" onClick={() => this.saveMetrics(context)}>Save Metrics</Button>
                                                </div> : <div />
                                            }


                                            <JsonViewer
                                                title="Hyperparameters"
                                                jsonString={this.props.model.hyperparameters}
                                            />

                                            <TextField
                                                label="Hyperparameters"
                                                multiline
                                                rowsMax={12}
                                                value={this.props.model.hyperparameters}
                                                onChange={event => this.editField(context, "hyperparameters", event.target.value)}
                                            />



                                            <TextField
                                                label="Author's Notes"
                                                multiline
                                                rows={4}
                                                rowsMax={12}
                                                value={this.props.model.authorNotes}
                                                onChange={event => this.editField(context, "authorNotes", event.target.value)}
                                            />
                                        </FormControl><br />

                                        {(this.props.deletable) ? <Button color="primary" onClick={() => this.saveChanges(context)}>Save Changes</Button> : <div />}<br /><br />
                                        {(this.props.deletable) ? <Button onClick={() => this.deleteModel(context, this.props.id)}>Delete</Button> : <div />}

                                    </div> :



                                    // Cannot edit
                                    <div>
                                        <h2>{this.props.model.modelName}</h2><br />


                                        {this.props.model.modelDescription}<br />


                                        {(this.props.sheetMusicDoc) ?
                                            <div>
                                                <PdfViewer pdf={this.state.modelOutputPDF} /><br />


                                                <JsonViewer
                                                    title="Metrics"
                                                    jsonString={this.state.metricsJSON}
                                                />
                                            </div> : <div />
                                        }
                                        <JsonViewer
                                            title="Hyperparameters"
                                            jsonString={this.props.model.hyperparameters} />

                                        <InformationCard
                                            title="Author's Notes"
                                            desc={this.props.model.authorNotes}
                                        />

                                        {/* <InformationCard
                                            editable={true}
                                            title="My Notes"
                                            desc={this.state.userNotes}
                                        /> */}

                                        <TextField
                                            style={{ width: "95%" }}
                                            label="Your Notes"
                                            multiline
                                            rows={5}
                                            rowsMax={12}
                                            value={this.state.userNotes}
                                            onChange={event => {
                                                this.setState({ userNotes: event.target.value })
                                            }}
                                        />
                                        <Button color="primary" onClick={() => this.saveNote(context)}>Save Note</Button>

                                    </div>}
                                <SegmentationViewer
                                    imageUrl={this.state.storageImageURL}
                                /><br />


                            </CardComponent>
                        </div>
                    )
                }}
            </FirebaseContext.Consumer>
        )
    }
}

export default ModelOverview