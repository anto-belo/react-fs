import React from 'react';
import FolderItem from "./FolderItem";

const Folder = ({structure}) => {
    const isEmpty = !structure || (structure?.folders?.length === 0 && structure?.files?.length === 0);

    return (
        <div className="row d-flex flex-row"
             style={{border: '2px solid rgb(200,200,200)', borderRadius: '5px', overflowY: 'auto'}}>
            {!isEmpty ?
                <div className="col px-0 py-2">
                    {structure?.folders?.map((f) =>
                        <FolderItem key={f.name} type="folder" title={f.name}/>
                    )}
                    {structure?.files?.map((f) =>
                        <FolderItem key={f} type="file" title={f}/>
                    )}
                </div>
                : <p className="text-center fs-2 my-2 text-secondary">This folder is empty</p>}
        </div>
    );
};

export default Folder;