import React, {useEffect, useRef, useState} from 'react';
import {StorageContext} from "./StorageContext";
import Folder from "./Folder";
import AddFolderModal from "./modals/AddFolderModal";
import FileUploader from "./FileUploader";
import FileService from "../../api/FileService";

const StorageManager = ({structure, setStructure, initRoot}) => {
    const [root, setRoot] = useState(initRoot ? initRoot : '');
    const [folder, setFolder] = useState();

    const pathInputRef = useRef();

    useEffect(() => {
        if (!root || root === '') {
            pathInputRef.current.value = '';
            setFolder(structure);
            return;
        }

        const folders = root.split('/');
        let curFolder = structure;

        folders.forEach(folder => {
            curFolder = curFolder?.folders?.filter(f => f.name === folder)[0];
        });
        if (curFolder !== undefined) {
            pathInputRef.current.value = root;
            setFolder(curFolder);
        } else {
            setRoot('');
        }
    }, [root, structure]);

    function createFolderOnRoot(folderName) {
        const folders = root.split('/');
        let curFolder = structure;

        folders.filter(f => f !== '').forEach(folder => {
            curFolder = curFolder?.folders?.filter(f => f.name === folder)[0];
        });

        if (curFolder !== undefined) {
            let newFolder = {name: folderName, folders: [], files: []};
            if (curFolder.folders) {
                curFolder.folders = [...curFolder.folders, newFolder];
            } else {
                curFolder.folders = [newFolder];
            }
            setStructure({...structure});
        }
    }

    function addFilesOnRoot(fileNames) {
        const folders = root.split('/');
        let curFolder = structure;

        folders.filter(f => f !== '').forEach(folder => {
            curFolder = curFolder?.folders?.filter(f => f.name === folder)[0];
        });

        if (curFolder !== undefined) {
            if (curFolder.files) {
                curFolder.files = [...curFolder.files, ...fileNames];
            } else {
                curFolder.files = fileNames;
            }
            setStructure({...structure});
        }
    }

    function deletePath(path) {
        const folders = path.split('/');
        const toDelete = folders.pop();
        let curFolder = structure;

        folders.forEach(folder => {
            curFolder = curFolder?.folders?.filter(f => f.name === folder)[0];
        });

        if (curFolder !== undefined) {
            curFolder.files = curFolder.files ? curFolder.files?.filter(f => f !== toDelete) : [];
            curFolder.folders = curFolder.folders ? curFolder.folders.filter(f => f.name !== toDelete) : [];
            setStructure({...structure});
        }
    }

    function onFilesUpload(files) {
        FileService.uploadFiles(files, root)
            .then(() => {
                addFilesOnRoot(files.map(f => f.name))
            })
            .catch(e => alert(e.message));
    }

    function toParentFolder() {
        if (root === '') return;

        const lastSlash = root.lastIndexOf('/');

        if (lastSlash === -1) {
            setRoot('');
        } else {
            setRoot(root.substring(0, lastSlash));
        }
    }

    return (
        <div className="container">
            <StorageContext.Provider
                value={{root: root, setRoot: setRoot, createFolderOnRoot: createFolderOnRoot, deletePath: deletePath}}>
                <AddFolderModal folder={folder}/>
                <div className="row mb-3">
                    <div className="col px-0">
                        <div className="input-group">
                            <button className="btn btn-info" type="button" onClick={toParentFolder}>
                                <i className="fa fa-arrow-left"/>
                            </button>
                            <button className="btn btn-primary" type="button" data-bs-toggle="modal"
                                    data-bs-target="#create-folder-modal"><i className="fa fa-folder-o"/>
                                &nbsp;Create folder
                            </button>
                            <FileUploader onUpload={onFilesUpload}/>
                            <input ref={pathInputRef} className="form-control" type="text" defaultValue={root}
                                   onBlur={e => setRoot(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <Folder structure={folder}/>
            </StorageContext.Provider>
        </div>
    );
};

export default StorageManager;