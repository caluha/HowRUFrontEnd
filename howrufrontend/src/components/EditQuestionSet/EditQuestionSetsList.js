import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink, withRouter } from "react-router-dom";

import coffee2 from '../../images/coffee2.jpg';
import EditQuestionSetButton from './EditQuestionSetButton'; 
import EditQuestionSet from './EditQuestionSet';
import DeleteModal from './DeleteModal';


class EditQuestionSetsList extends React.Component {


    constructor(props){
        super(props);
        this.showDeleteModal=this.showDeleteModal.bind(this);
        this.hideDeleteModal=this.hideDeleteModal.bind(this); 
        this.state={
            
            
            showDeleteModal:false,
            deleteModal:null,
            
        }
    }

    deleteOnBackend(questionSetId){
        console.log("HERE, we should send a delete request to the backend.")
    }

    deleteQuestionSet(questionSet){
        
        return () => {
            
            this.deleteOnBackend(questionSet.id);
            this.setState({showDeleteModal:false, deleteModal:null}); 
        }
    }

    showDeleteModal(questionSet){

        return() => {
            
            let deleteModal = <DeleteModal 
                                    message={"the tracker "+ questionSet.name} 
                                    delete={this.deleteQuestionSet(questionSet)}
                                    hideModal={this.hideDeleteModal} />
            this.setState({
                deleteModal:deleteModal,
                showDeleteModal:true,

            });
        }

    }
    hideDeleteModal(){
            this.setState({
                deleteModal:null,
                showDeleteModal:false,

            });
    }

    questionSetFactory(questionSets) {
        if (questionSets.length > 0) {
            return questionSets.map((e) => <EditQuestionSetButton key={e.id} 
            id={e.id} 
            name={e.name} 
            showDelete={this.showDeleteModal(e)} />);
        } else {
            return <p>Create some question sets?</p>
        }
    }

    componentDidMount(){
        
    }

    render(){

        

        return (
        
            <div>
                 {this.state.showDeleteModal}
                <img alt="Cup of coffee" src={coffee2} style={{ width: "360px" }} />
                <div>
                    {this.questionSetFactory(this.props.questionSets)}
                    <div>
                        <NavLink to="/create"><button className="floating-menu-icon">New Tracker +</button></NavLink>
                    </div>
                </div>
                { this.state.deleteModal }
                    {/* {this.state.showDeleteModal ? this.state.deleteModal : ""} */}
            </div>
           );


    }

}






export default withRouter(EditQuestionSetsList);