import React from 'react';
import '../styles/GlobalStylesheet.css'
import CardComponent from './CardComponent';
import { IconButton } from '@material-ui/core';
import BorderColorTwoToneIcon from '@material-ui/icons/BorderColorTwoTone';


class InformationCard extends React.Component {

    state = {
        editing: false
    }

    render(){
        return(
            <CardComponent>
                <div>
                <h3>{this.props.title}</h3>
                {(this.props.editable)?<BorderColorTwoToneIcon/>:<div/>}
                </div>


                {(this.props.editable)?<BorderColorTwoToneIcon/>:<div/>}
                {this.props.desc}
            </CardComponent>
        )
    }
}

export default InformationCard