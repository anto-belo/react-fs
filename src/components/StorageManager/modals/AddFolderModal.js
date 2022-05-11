import React, {useState} from 'react';

const AddFolderModal = ({folder}) => {
    const [message, setMessage] = useState();

    function onFolderModalInputChange(e) {
        const input = e.target;
        if (input.value === '') {
            setValid(input, "Please enter folder name", false);
            return;
        }
        if (folder.folders?.filter(f => f.name === input.value).length !== 0) {
            setValid(input, "Folder with this title exists on this path", false);
            return;
        }

        setValid(input, null, true);
    }

    function setValid(input: HTMLInputElement, message: string, valid: boolean) {
        setMessage(message);
        if (valid) {
            input.classList.toggle("is-valid", true);
            input.classList.toggle("is-invalid", false);
        } else {
            input.classList.toggle("is-valid", false);
            input.classList.toggle("is-invalid", true);
        }
    }

    return (
        <div id="create-folder-modal" className="modal fade" role="dialog" tabIndex="-1">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">
                            <i className="fa fa-folder" style={{color: 'var(--bs-blue)'}}/>
                            &nbsp;Enter folder title
                        </h4>
                        <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div className="modal-body">
                        <input className="form-control" type="text" placeholder="Type name here..."
                               required onChange={onFolderModalInputChange}/>
                        <div className="invalid-feedback">{message}</div>
                        {/*<div className="valid-feedback">{messageRef.current}</div>*/}
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-light" type="button" data-bs-dismiss="modal">Cancel</button>
                        <button className="btn btn-success" type="submit">Create</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddFolderModal;