import React, { useState } from 'react';
import ReactJson from 'react-json-view'
import CardComponent from './CardComponent';



class JsonViewer extends React.Component {

    constructor(props){ 
        super(props)
    }

    state = {

    }

    render(){

        try {
            var json = JSON.parse(this.props.jsonString)
        } catch (error) {
            var json = {Error: "Invalid JSON string provided"}
        }
        return(
            <CardComponent>
                <h3>{this.props.title}</h3>

                <ReactJson src={json} />
            </CardComponent>
        )
    }
}

export default JsonViewer