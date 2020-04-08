import React from 'react';
import { NavLink, withRouter } from "react-router-dom";

import coffee2 from '../../images/coffeecup2.jpg';
import EditQuestionSetButton from './EditQuestionSetButton';
import DeleteModal from './DeleteModal';


class EditQuestionSetsList extends React.Component {
    borderColors=[
        "#F7767A",
        "#00963D",
        "#DD3146",
        "#76b9f7",
    ]


    constructor(props) {
        super(props);
        this.showDeleteModal = this.showDeleteModal.bind(this);
        this.hideDeleteModal = this.hideDeleteModal.bind(this);

        this.state = {

            questionSets: props.questionSets,

            showDeleteModal: false,
            deleteModal: null,

        }
    }

    deleteOnBackend(questionSetId) {

        let index = this.state.questionSets.findIndex(el => el.id == questionSetId);
        if (index !== -1) {
            let newQS = this.state.questionSets;
            newQS.splice(index, 1);
            this.setState({ questionSets: newQS });
        }

        // let url = "http://localhost:8080/questionset/"
        let url = "http://howru.live:8080/questionset/";

        fetch(url + questionSetId,
            { method: 'DELETE' })
            .then(result => result.json())
        // .then(res => console.log(res))
    }

    deleteQuestionSet(questionSet) {

        return () => {

            this.deleteOnBackend(questionSet.id);
            this.setState({ showDeleteModal: false, deleteModal: null });
        }
    }

    showDeleteModal(questionSet) {

        return () => {

            let deleteModal = <DeleteModal
                message={"the tracker " + questionSet.name}
                delete={this.deleteQuestionSet(questionSet)}
                hideModal={this.hideDeleteModal} />
            this.setState({
                deleteModal: deleteModal,
                showDeleteModal: true,

            });
        }

    }

    hideDeleteModal() {
        this.setState({
            deleteModal: null,
            showDeleteModal: false,

        });
    }

    questionSetFactory(questionSets) {
        if (questionSets.length > 0) {
            return questionSets.map((e, index) => <EditQuestionSetButton key={e.id}
                id={e.id}
                name={e.name}
                borderColor={this.borderColors[index%this.borderColors.length]}
                showDelete={this.showDeleteModal(e)} />);
        } else {
            return <p>Create some question sets?</p>
        }
    }

    componentDidMount() {

    }

    render() {



        return (

            <div>
                {this.state.showDeleteModal}
                <img alt="Cup of coffee" src={coffee2} style={{ width: "360px", height:"202px" }} />
                <div>
                    {this.questionSetFactory(this.state.questionSets)}
                    <div>
                        <NavLink to="/create"><button className="floating-menu-icon">New Tracker +</button></NavLink>
                    </div>
                </div>
                {this.state.deleteModal}
                {/* {this.state.showDeleteModal ? this.state.deleteModal : ""} */}
            </div>
        );


    }

}






export default withRouter(EditQuestionSetsList);