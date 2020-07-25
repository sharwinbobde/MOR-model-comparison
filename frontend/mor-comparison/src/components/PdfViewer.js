import React, { useState } from 'react';
import PDFViewer from 'pdf-viewer-reactjs'




class PdfViewer extends React.Component {

    constructor(props){ 
        super(props)
        // this.state = {
        //     pdf: this.props.pdf
        // }
        // console.log(props)
    }

    render(){
        return(
            <div>
                <embed src={this.props.pdf} width="800px" height="900px" />
            </div>
        )
    }
}

export default PdfViewer