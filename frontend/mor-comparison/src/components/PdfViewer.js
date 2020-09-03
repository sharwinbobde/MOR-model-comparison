import React, { useState } from 'react';




class PdfViewer extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={{
                width: "100%",
                // maxHeight: "500px",
                // paddingTop: "75%",
                // border: "5px solid red"
            }}>
                <embed src={this.props.pdf}
                
                    style={{
                        position:"flex",
                        width: "400px",
                        // paddingTop: "75%",
                        height: "500px"
                    }} />
            </div>
        )
    }
}

export default PdfViewer