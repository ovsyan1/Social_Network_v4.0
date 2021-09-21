import React from 'react';
import {actions} from '../../redux/dialogs_reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         updateNewMessageChange: (text) => {
//             dispatch(actions.updateNewMessageTextActionCreator(text));
//         },
//         sendMessage: () => {
//             dispatch(actions.sendMessage());
//         }
//     }
// }

export default compose(
    connect(mapStateToProps, {
        sendMessage: actions.sendMessage
    }),
    withAuthRedirect
)(Dialogs);
