import React from 'react';
import '../styles/GlobalStylesheet.css'
import CardComponent from './CardComponent';



class InformationCard extends React.Component {

    render(){
        return(
            <CardComponent>
                <div>
                <h3>{this.props.title}</h3>
                </div>

                {this.props.desc}
            </CardComponent>
        )
    }
}

export default InformationCard