import React from 'react';
import '../../styles/GlobalStylesheet.css'
import CardComponent from '../CardComponent';
import SegmentationViewer from '../SegmentationViewer';
import InformationCard from '../InformationCard';
import JsonViewer from '../JsonViewer';



class ModelOverview extends React.Component {

    render(){
        return(
            <div className="ModelOverview">

            <CardComponent>
                <h2>{this.props.modelName}</h2><br/>
                <SegmentationViewer
                imageUrl={this.props.imageUrl}
                /><br/>

                {this.props.modelDescription}<br/>

                <JsonViewer
                title="Hyperparameters"
                json={this.props.hyperparameters}/>
                
                <InformationCard
                title="Author's Notes"
                desc={this.props.authorNotes}/>
                
                <InformationCard
                editable={true}
                title="My Notes"
                desc={this.props.userNotes}/>

            </CardComponent>
            </div>
        )
    }
}

export default ModelOverview