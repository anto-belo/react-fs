import React, {useContext} from 'react';
import './storage.css';
import {StorageContext} from "./StorageContext";

const ICON_FOLDER = "fa fa-folder fs-4 text-info";
const ICON_FILE = "fa fa-file fs-4 text-warning";

const FolderItem = ({type, title}) => {
    const storageContext = useContext(StorageContext);

    let iconClassName = type === "folder" ? ICON_FOLDER : ICON_FILE;
    let deleteTitle = `Delete ${title}`;

    function onClickHandler() {
        if (type === 'folder') {
            storageContext.resolveRoot(title)
        } else {
            //todo open file in another tab
            let query = `http://localhost:8080/img${getPath()}`;
            console.log(`HTTP GET on ${query}`)
        }
    }

    function getPath() {
        let rootPath = storageContext.root;
        if (rootPath === '/') {
            rootPath = '';
        }
        return `${rootPath}/${title}`;
    }

    return (
        <div className="d-flex align-items-center px-3 py-2 storage-item"
             onClick={onClickHandler}>
            <i className={iconClassName}/>
            <p className="d-table-cell px-2 m-0">{title}</p>
            <i className="fa fa-trash fs-5 text-danger delete-button" title={deleteTitle}
               data-bs-toggle="modal" data-bs-target="#delete-modal"
               onClick={() => {
                   console.log(getPath())
                   storageContext.setDeletePath(getPath());
                   //todo delete file/folder
               }}/>
        </div>
    );
};

export default FolderItem;