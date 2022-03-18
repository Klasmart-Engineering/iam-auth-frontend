import placeholder from "@/../assets/img/ecco_spinner_placeholder.png";
import mp4Spinner from "@/../assets/video/ecco_spinner.mp4";
import webmSpinner from "@/../assets/video/ecco_spinner.webm";
import React from 'react';

const Spinner = () => {
    return (
        <video
            autoPlay
            loop
            muted
            // Required for iOS
            playsInline
            width="100px"
            height="100px"
            // Show first frame of animation during loading
            poster={placeholder}
            role="progressbar"
        >
            <source
                src={webmSpinner}
                type="video/webm"
            />
            <source
                src={mp4Spinner}
                type="video/mp4"
            />
        </video>
    );
};

export default Spinner;
