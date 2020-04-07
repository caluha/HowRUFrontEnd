import React from 'react';
import '../CreateEdit/CreateEdit.css'; 

const DeleteModal = (props) => { 




    return(
        <div className="questionFormModalBackground">
            <div className="deleteModalContent">
                <p>Are you sure that you want to delete {props.message}?</p>
                <small>This action cannot be undone.</small>
                <div>
                <button className="btn btn-primary cancel-button m-3" onClick={props.hideModal}>Cancel</button>
                <button className="btn btn-danger m-3" onClick={props.delete}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal; 