import React from 'react';
import '../styles/GlobalStylesheet.css'

import { Button, IconButton, TextField, Card } from '@material-ui/core';
import {FirebaseContext} from '../components/Firebase';
import PdfViewer from '../components/PdfViewer'
import JsonViewer from '../components/JsonViewer';
import SegmentationViewer from '../components/SegmentationViewer';
import CardComponent from '../components/CardComponent';
import InformationCard from '../components/InformationCard';
import ModelOverview from '../components/Dashboard/ModelOverview';
import File_uploader from '../components/File_uploader';




const sample_img_1 = 'https://images.typeform.com/images/uQHgGu5ZDSVJ/image/default'
const sample_img_2 = 'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg'


class TestComponents extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            workspace: "/",
            text: "not fetched yet",
            sheetMusic: null
        }

        // console.log(this.props)

        // props.db.collection('users').where('username', "==", "sharwinbobde").get()
        // .then( snapshot=>{
        //     console.log(snapshot)
        // }).catch(error=>{
        //     console.log(error)
        // })

    }

    getAvailableSheetMusic(){

    }

    getAvailableModels(){

    }

    render() {
        return(
            <FirebaseContext.Consumer>
                {(context)=>{
                    context.db.collection('users').where("username", '==', 'sharwinbobde').limit(1).get()
                    .then( snapshot=>{
                        snapshot.forEach(doc => {
                            var text = doc.data().username
                            if(this.state.text != text){
                                this.setState({text: text})
                                // console.log(this.state.text)
                            }
                            
                        });
                    }).catch(error=>{
                        console.log(error)
                    })

                    context.db.collection('sheet-music').limit(1).get()
                    .then( snapshot=>{
                        snapshot.forEach(doc => {
                            var link = doc.data().link
                            if(this.state.sheetMusic == null){
                                // this.setState({sheetMusic: link})
                                const temp_link = 'http://africau.edu/images/default/sample.pdf'
                                
                                this.setState({sheetMusic: temp_link})
                                // console.log(this.state.sheetMusic)
                            }
                            
                        });
                    }).catch(error=>{
                        console.log(error)
                    })

                    return(
                            <div className='GenericContainer'>

                                <File_uploader
                                storageTarget='test/images/test.png'
                                accept='.png'/>
                                <Button
                                className="Button"
                                variant="contained"
                                component="label"
                                >
                                Select Workspace
                                <input
                                    type="openDirectory"
                                    style={{ display: "none" }}
                                />
                                </Button> <br/>
                
                                <Button
                                className="Button"
                                variant="contained"
                                component="label"
                                >
                                Select Sheet music
                                <input
                                    type="file"
                                    style={{ display: "none" }}
                                />
                                </Button> <br/>
                                
                
                                <IconButton color="primary">Add a method</IconButton>
                

                                <InformationCard 
                                title="This is a title"
                                desc={"Oh this is so long..............".repeat(10)}
                                />

                                <h1>{this.state.text}</h1>

                                <JsonViewer 
                                title="This is a sample json"
                                json={{hmm: {this:"seems ok"}}}/>

                                <ModelOverview
                                model={{}}
                                modelName="Model 1"
                                modelDescription={"This is to describe the model. ".repeat(3)}
                                imageUrl={sample_img_2}
                                imageStorageLocation='test/images/test.png'
                                authorNotes={"Authors have written this. ".repeat(10)}
                                userNotes={"You wrote this, don't you remember !!! ".repeat(10)}
                                hyperparameters={{
                                    "glossary": {
                                        "title": "example glossary",
                                        "GlossDiv": {
                                            "title": "S",
                                            "GlossList": {
                                                "GlossEntry": {
                                                    "ID": "SGML",
                                                    "SortAs": "SGML",
                                                    "GlossTerm": "Standard Generalized Markup Language",
                                                    "Acronym": "SGML",
                                                    "Abbrev": "ISO 8879:1986",
                                                    "GlossDef": {
                                                        "para": "A meta-markup language, used to create markup languages such as DocBook.",
                                                        "GlossSeeAlso": ["GML", "XML"]
                                                    },
                                                    "GlossSee": "markup"
                                                }
                                            }
                                        }
                                    }
                                }}
                                />

                                <SegmentationViewer
                                imageUrl={sample_img_1}/>
                                
                                <PdfViewer pdf={this.state.sheetMusic}/>
                            </div>
                    )
                }}
            </FirebaseContext.Consumer>
        );
    }

}

export default TestComponents