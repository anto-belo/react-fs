import React from 'react';
import FolderItem from "./FolderItem";

const Folder = ({structure}) => {
    return (
        <div className="row d-flex flex-row"
             style={{border: '2px solid rgb(200,200,200)', borderRadius: '5px', overflowY: 'auto'}}>
            <div className="col px-0 py-2">
                {structure?.folders?.map((f) =>
                    <FolderItem key={f.name} type="folder" title={f.name}/>
                )}
                {structure?.files?.map((f) =>
                    <FolderItem key={f} type="file" title={f}/>
                )}
            </div>
        </div>
    );
};

export default Folder;