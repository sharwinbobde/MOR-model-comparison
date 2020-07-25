import React from 'react';
import '../styles/GlobalStylesheet.css'

import '../styles/Dashboard.css'
import { Button, IconButton, TextField, Card } from '@material-ui/core';
import {FirebaseContext} from '../components/Firebase';
import PdfViewer from '../components/PdfViewer'

class Dashboard extends React.Component {

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

    handleWorkspaceChange(e) {
        console.log(e)
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
                            <div className='Main'>
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
                
                                <Card>
                                    this might go bad
                                </Card>
                                <h1>{this.state.text}</h1>
                                <PdfViewer pdf={this.state.sheetMusic}/>
                            </div>
                    )
                }}
            </FirebaseContext.Consumer>
        );
        // return (
        //     <div className='Main'>
        //         <Button
        //         className="Button"
        //         variant="contained"
        //         component="label"
        //         >
        //         Select Workspace
        //         <input
        //             type="openDirectory"
        //             style={{ display: "none" }}
        //         />
        //         </Button> <br/>

        //         <Button
        //         className="Button"
        //         variant="contained"
        //         component="label"
        //         >
        //         Select Sheet music
        //         <input
        //             type="file"
        //             style={{ display: "none" }}
        //         />
        //         </Button> <br/>
                

        //         <IconButton color="primary">Add a method</IconButton>

        //         <Card>
        //             this might go bad
        //         </Card>
        //     </div>
        // );
    }

}

export default Dashboard