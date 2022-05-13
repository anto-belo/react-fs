import React, {useContext, useRef} from 'react';
import './storage.css';
import {StorageContext} from "./StorageContext";
import {API_URL} from "../../api/config";
import FileService from "../../api/FileService";

const ICON_FOLDER_CLASSES = "fa fa-folder fs-4 text-info";
const ICON_FILE_CLASSES = "fa fa-file fs-4 text-warning";

const FolderItem = ({type, title}) => {
    const storageContext = useContext(StorageContext);

    const deleteAcceptRef = useRef();

    const thisPath = () => {
        return storageContext.root === ''
            ? title
            : `${storageContext.root}/${title}`;
    };

    function onClickHandler() {
        if (type === 'folder') {
            let root = storageContext.root === ''
                ? ''
                : storageContext.root + '/';
            storageContext.setRoot(`${root}${title}`);
        } else {
            //todo open file in another tab
            let query = `http://localhost:8080/img/${thisPath()}`;
            console.log(`HTTP GET on ${query}`)
        }
    }

    function onAttemptDelete(e) {
        e.stopPropagation();
        let deleteAccept: HTMLDivElement = deleteAcceptRef.current;
        deleteAccept.classList.toggle("invisible", false);
    }

    function onAcceptDelete(e) {
        e.stopPropagation();
        FileService.deleteFile(thisPath())
            .then(() => storageContext.deletePath(thisPath()))
            .catch(e => alert(e.message));
    }

    function onMouseLeaveHandler() {
        let deleteAccept: HTMLDivElement = deleteAcceptRef.current;
        deleteAccept.classList.toggle("invisible", true)
    }

    let downloadUrl = `${API_URL}/fs/file?path=${encodeURIComponent(storageContext.root + '/' + title)}`;

    return (
        <div className="d-flex align-items-center px-3 py-2 storage-item" onClick={onClickHandler}
             onMouseLeave={onMouseLeaveHandler}>
            <i className={type === "folder" ? ICON_FOLDER_CLASSES : ICON_FILE_CLASSES}/>
            <p className="px-2 m-0" title={"Open " + title}>{title}</p>
            {type === 'file' && <>
                <a href={downloadUrl} title={"Download " + title}>
                    <i className="fa fa-download fs-5 me-2 text-success option-button"/>
                </a>
            </>}
            <i className="fa fa-trash fs-5 text-danger option-button" title={"Delete " + title}
               onClick={onAttemptDelete}/>
            <div ref={deleteAcceptRef} className="d-flex flex-row delete-accept invisible">
                <p className=" ms-2 my-0 me-0 text-danger fst-italic">Are you sure?</p>
                <button type="button" onClick={onAcceptDelete} className="ms-2 my-0 me-0 text-danger as-link">
                    Yes, delete
                </button>
            </div>
        </div>
    );
};

export default FolderItem;