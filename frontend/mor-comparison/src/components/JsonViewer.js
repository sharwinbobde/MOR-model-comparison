import React, { useState } from 'react';
import ReactJson from 'react-json-view'
import CardComponent from './CardComponent';



class JsonViewer extends React.Component {

    constructor(props){ 
        super(props)
        // this.state = {
        //     pdf: this.props.pdf
        // }
        // console.log(props)
    }

    render(){
        return(
            <CardComponent>
                <h3>{this.props.title}</h3>

                <ReactJson src={this.props.json} />
            </CardComponent>
        )
    }
}

export default JsonViewer