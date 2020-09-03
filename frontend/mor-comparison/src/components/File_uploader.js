import React from 'react';
import CardComponent from './CardComponent';

import { FirebaseContext } from "./Firebase";
import { Button } from '@material-ui/core';

import '../styles/GlobalStylesheet.css'
import { toast } from 'react-toastify';


export class File_uploader extends React.Component {

    constructor(props){
        super(props)

    }

    state = {
        file: ''
    };


    handleFile = e => {
        this.setState({
            file: e.target.files[0]
        });
    };



    render() {

        return (
            <FirebaseContext.Consumer>
                {context => {
                    
                    if (!this.props.storageTarget){
                        // toast.error("Error: Storage traget Unknown")
                        return(
                            <CardComponent>
                                <h3>Naturally, Sharwin did something stupid.</h3>
                                Error: Storage traget Unknown
                            </CardComponent>)
                    }
                    try {
                        var storageRef = context.storage.ref().child(this.props.storageTarget)
                        // storageRef.getDownloadURL().then( url => console.log(url)).catch(error => toast.error("Couldnt fetch a file!!"))

                        var upload = e => {
                            e.preventDefault()
                            storageRef.put(this.state.file).then(function(snapshot) {
                                toast.success("File uploaded")
                            });
                            
                        }
                    } catch (error) {
                        toast.error("The developer did something wrong")
                    }
                    
                    return (
                        <div>
                            <CardComponent>
                                <form onSubmit={upload}>
                                    <input type="file" accept={this.props.accept} onChange={this.handleFile} /><br />
                                    <Button
                                        className="Button"
                                        type="submit">
                                        Upload
                                </Button>
                                </form>
                            </CardComponent>


                        </div>

                    )
                }}
                
            </FirebaseContext.Consumer>
        );
    }
}

export default File_uploader