import React, {useContext, useEffect, useRef, useState} from 'react';
import {StorageContext} from "../StorageContext";
import FileService from "../../../api/FileService";

const AddFolderModal = ({folder}) => {
    const storageContext = useContext(StorageContext);

    const [message, setMessage] = useState();
    const [isValid, setIsValid] = useState();

    const thisModalRef = useRef();
    const nameInputRef = useRef();
    const createButtonRef = useRef();

    useEffect(() => {
        const thisModal = (thisModalRef.current: HTMLDivElement);

        thisModal.addEventListener('shown.bs.modal', () =>
            (nameInputRef.current: HTMLInputElement).focus());
        thisModal.addEventListener('hidden.bs.modal', () => reset());
    }, []);

    function validateFolderName(e) {
        const inputVal = e.target.value;

        if (inputVal === '') {
            setValid(false, "Please enter folder name");
        } else if (!inputVal.match("^[\\w ]{3,50}$")) {
            setValid(false, "Folder name must contain 3-50 symbols: A-Z, a-z, 0-9 or _ (underscore)");
        } else if (folder.folders && folder.folders.filter(f => f.name === inputVal).length !== 0) {
            setValid(false, "Folder with such title exists on this path");
        } else {
            setValid(true);
        }
    }

    function setValid(valid: boolean, message: string) {
        const input: HTMLInputElement = nameInputRef.current;
        const createButton: HTMLButtonElement = createButtonRef.current;

        setMessage(message);
        setIsValid(valid);
        input.classList.toggle("is-valid", valid);
        input.classList.toggle("is-invalid", !valid);
        createButton.classList.toggle("disabled", !valid);
    }

    function reset() {
        const input: HTMLInputElement = nameInputRef.current;
        const createButton: HTMLButtonElement = createButtonRef.current;

        if (input.classList.contains("show")) return;
        input.classList.toggle("is-valid", false);
        input.classList.toggle("is-invalid", false);
        input.value = '';
        createButton.classList.toggle("disabled", true);
    }

    function createFolder() {
        const input = (nameInputRef.current: HTMLInputElement).value;
        const path = storageContext.root === ''
            ? input
            : storageContext.root + '/' + input;

        FileService.createFolder(path)
            .then(() => storageContext.createFolderOnRoot(input))
            .catch(e => alert(e.message));
    }

    function onKeyDownHandler(e) {
        if (isValid && e.key === 'Enter') {
            e.preventDefault();
            (createButtonRef.current: HTMLButtonElement).click();
        }
    }

    return (
        <div ref={thisModalRef} id="create-folder-modal" className="modal fade" role="dialog" tabIndex="-1">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">
                            <i className="fa fa-folder" style={{color: 'var(--bs-blue)'}}/>
                            &nbsp;Enter folder name
                        </h4>
                        <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div className="modal-body">
                        <input ref={nameInputRef} className="form-control" type="text"
                               placeholder="Type name here..." onChange={validateFolderName}
                               onKeyDown={onKeyDownHandler}/>
                        <div className="invalid-feedback">{message}</div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-light" type="button" data-bs-dismiss="modal">
                            Cancel
                        </button>
                        <button ref={createButtonRef} className="btn btn-success disabled" type="button"
                                data-bs-dismiss="modal"
                                onClick={createFolder}>
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddFolderModal;