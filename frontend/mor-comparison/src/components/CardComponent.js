import React from 'react';
import '../styles/GlobalStylesheet.css'



class CardComponent extends React.Component {


    render(){

        return(
            <div className="CardComponent">
                {this.props.children}
            </div>
        )
    }
}

export default CardComponent