import React, {useRef} from 'react';

const FileUploader = ({onUpload}) => {
    const inputFileRef = useRef();

    return (
        <>
            <button className="btn btn-success" type="button"
                    onClick={() => (inputFileRef.current: HTMLInputElement).click()}>
                <i className="fa fa-upload"/>
                &nbsp;Upload file here...
            </button>
            <input ref={inputFileRef} type="file" style={{display: 'none'}}
                   onChange={(e) => onUpload(e.target.files)}
                   multiple accept="image/*"/>
        </>
    );
};

export default FileUploader;