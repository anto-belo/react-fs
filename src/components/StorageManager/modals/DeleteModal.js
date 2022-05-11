import React from 'react';

const DeleteModal = ({deletePath}) => {
    return (
        <div id="delete-modal" className="modal fade" role="dialog" tabIndex="-1">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">
                            <i className="fa fa-warning" style={{color: 'red'}}/>
                            &nbsp;Are you sure?
                        </h4>
                        <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Do you want to delete {deletePath}?</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-light" type="button" data-bs-dismiss="modal">Cancel</button>
                        <button className="btn btn-danger" type="button">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;