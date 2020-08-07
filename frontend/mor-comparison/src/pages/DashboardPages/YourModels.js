import React from "react";
import { FirebaseContext } from "../../components/Firebase";
import { FormControl, Select, MenuList, InputLabel, MenuItem } from "@material-ui/core";
import PdfViewer from "../../components/PdfViewer";


class YourModels extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            userName:"",
            selectedSheetMusic: null,
            sheetMusic: [
                {
                    name: "Sample 1",
                    url: "bullshit url 1"
                },
                {
                    name: "Sample 2",
                    url: "bullshit url 2"
                }
            ]
        }
    }


    render(){
        return(
            <FirebaseContext.Consumer>
                {context=>{


                    return(
                        <div>
                            <h2>This is your sheet music, you can upload more.</h2>
                            <FormControl
                            variant="standard">
                                <InputLabel>Select sheet music</InputLabel>
                                <Select
                                style={{width:"500px"}}>
                                    {this.state.sheetMusic.map(doc => {
                                        return(
                                        <MenuItem style={{padding:"10px"}} value={doc.url}>{doc.name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>

                            {(this.state.selectedSheetMusic)?
                                <PdfViewer pdf={this.state.selectedSheetMusic}/>
                            :{}}

                            <h2>Select files to upload to your profile</h2>
                        </div>
                    )
                }}
            </FirebaseContext.Consumer>
        )
    }
}


export default YourModels