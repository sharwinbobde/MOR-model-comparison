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
                    imageSrc={this.props.imageUrl}
                    imageAlt="Example"
                    // largeImageSrc={this.props.imageUrl} // Optional
                    alwaysInPlace={true}
                />
            </div>
        )
    }
}

export default SegmentationViewer