import React from "react";
import { FirebaseContext } from "../../components/Firebase";
import { FormControl, Select, MenuList, InputLabel, MenuItem } from "@material-ui/core";
import '../../styles/GlobalStylesheet.css'
import ModelOverview from "../../components/Dashboard/ModelOverview";

const sample_img_1 = 'https://images.typeform.com/images/uQHgGu5ZDSVJ/image/default'
const sample_img_2 = 'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg'


class ModelComparason extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            userName:"",
            sheetMusic: [
                {
                    name: "Sample 1",
                    url: "bullshit url 1"
                },
                {
                    name: "Sample 2",
                    url: "bullshit url 2"
                }
            ],
            models: [{}, {}]
        }
    }


    render(){
        return(
            <FirebaseContext.Consumer>
                {context=>{
                    return(
                        <div class="ModelComparasonContainer">
                            <h2>Hello{this.state.userName}, happy comparing!</h2>
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
                            <div className="horizontalComparison">

                            {this.state.models.map(model => {
                                // send API call and let the server do the job

                                return(<ModelOverview
                                    modelName="Model 1"
                                    modelDescription={"This is to describe the model. ".repeat(3)}
                                    imageUrl={sample_img_2}
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
                                />)
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