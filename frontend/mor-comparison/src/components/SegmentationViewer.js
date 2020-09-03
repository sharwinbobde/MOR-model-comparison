import React, { useState } from 'react';
import Slider from "react-slick";
import {
    SideBySideMagnifier,
} from "react-image-magnifiers";


class SegmentationViewer extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {
            rimProps,
            rsProps
        } = this.props;

        return (
            <div className="SegmentationViewer">
                <SideBySideMagnifier
                    // imageSrc={this.props.imageUrl}
                    imageSrc={"https://firebasestorage.googleapis.com/v0/b/mor-model-compar…est.png?alt=media&token=d43d24bf-9cf6-4617-8b9c-d51fd2b71223"}

                    
                    // imageAlt={this.props.imageUrl.String}
                    // largeImageSrc={this.props.imageUrl} // Optional
                    alwaysInPlace={true}
                />
            </div>
        )
    }
}

export default SegmentationViewer