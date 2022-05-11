import React, {useEffect, useRef, useState} from 'react';
import {StorageContext} from "./StorageContext";
import Folder from "./Folder";
import DeleteModal from "./modals/DeleteModal";
import AddFolderModal from "./modals/AddFolderModal";

const StorageManager = ({initStructure, initRoot}) => {
    const structure = useRef(initStructure);
    const pathInputRef = useRef();
    const [deletePath, setDeletePath] = useState('');

    const [root, setRoot] = useState(initRoot ? initRoot : '/');
    const [folder, setFolder] = useState();

    useEffect(() => {
        if (!root || root === '/') {
            pathInputRef.current.value = '/';
            setFolder(structure.current);
        }

        let folders = root.split('/');
        let curFolder = structure.current;
        folders.filter(f => f !== "").forEach(folder => {
            curFolder = curFolder?.folders?.filter(f => f.name === folder)[0];
        });
        if (curFolder !== undefined) {
            pathInputRef.current.value = root;
            setFolder(curFolder);
        } else {
            setRoot("/");
        }
    }, [root]);

    function resolveRoot(folderName) {
        if (root === '/') {
            setRoot(`/${folderName}`);
        } else {
            setRoot(`${root}/${folderName}`);
        }
    }

    function toParentFolder() {
        if (root === '/') return;

        let lastSlash = root.lastIndexOf('/');
        if (lastSlash === -1) {
            setRoot('/');
        } else {
            setRoot(root.substring(0, lastSlash));
        }
    }

    return (
        <div className="container">
            <DeleteModal deletePath={deletePath}/>
            <AddFolderModal folder={folder}/>
            <div className="row mb-3">
                <div className="col px-0">
                    <div className="input-group">
                        <button className="btn btn-info" type="button">
                            <i className="fa fa-arrow-left" onClick={toParentFolder}/>
                        </button>
                        <button className="btn btn-primary" type="button" data-bs-toggle="modal"
                                data-bs-target="#create-folder-modal"><i className="fa fa-folder-o"/>
                            &nbsp;Create folder
                        </button>
                        <button className="btn btn-success" type="button"><i className="fa fa-download"/>
                            &nbsp;Upload file here...
                        </button>
                        <input ref={pathInputRef} className="form-control" type="text" defaultValue={root}
                               onBlur={e => setRoot(e.target.value)}/>
                    </div>
                </div>
            </div>
            <StorageContext.Provider value={{root: root, resolveRoot: resolveRoot, setDeletePath: setDeletePath}}>
                <Folder structure={folder}/>
            </StorageContext.Provider>
        </div>
    );
};

export default StorageManager;