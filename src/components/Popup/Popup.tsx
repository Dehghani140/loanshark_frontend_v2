import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
    Container,
    Grid,
    Card,
    CardHeader,
    CardContent,
    Divider
} from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import Footer from 'src/components/Footer';


interface PopupProps {
    // label: string;
    // onClick: any;
    onClose: any;
    selectedValue: any;
    open: any;
    title: any;
    children:React.ReactNode;
}

function Popup(props: PopupProps) {
    const { onClose, selectedValue, open,title, children } = props;
    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <>
            <Dialog onClose={handleClose} open={open} style={{border:"3px solid #fff",backgroundColor:"000"}}>
                <div style={{padding:"1rem", border:"3px solid #fff",backgroundColor:"000"}}>
                    <DialogTitle style={{fontWeight:"700",fontSize:"1.5rem"}}>{title}</DialogTitle>
                    {children}
                </div>
            </Dialog>
        </>
    )
}


export default Popup







// import PropTypes from "prop-types";
// import React from "react";
// import {
//     Input,
//     Button,
//     Modal,
//     ModalHeader,
//     ModalBody,
//     ModalFooter,
// } from 'reactstrap';

// class Popup extends React.Component {
//     static propTypes = {
//         modal: PropTypes.bool,
//         close: PropTypes.func,
//         modalTitle: PropTypes.string,
//         modalAction: PropTypes.string,
//         modalToken: PropTypes.string,
//         subHeading: PropTypes.string,
//         value: PropTypes.any,
//         onChange: PropTypes.func,
//         modalCall: PropTypes.func,
//     };

//     static defaultProps = {
//         modal: () => { },
//         close: () => { },
//         modalTitle: "",
//         modalAction: "",
//         modalToken: "",
//         subHeading: "",
//         value: "",
//         onChange: () => { },
//         modalCall: () => { },
//     };
//     constructor(props) {
//         super();
//     }

//     componentDidMount() {
//     }


//     render() {
//         return (
//             <div>
//                 <Modal isOpen={this.props.modal} toggle={this.props.close} style={{ color: '#000000' }}>
//                     <ModalHeader toggle={this.props.close}>{this.props.modalTitle}</ModalHeader>
//                     <ModalBody>
//                         {this.props.subHeading}
//                         {/* {this.props.modalAction} {this.props.modalToken} : */}
//                         <Input
//                             value={this.props.value}
//                             onChange={this.props.onChange}>
//                         </Input>
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button color="primary" onClick={this.props.modalCall}>Confirm</Button>{' '}
//                         <Button color="secondary" onClick={this.props.close}>Cancel</Button>
//                     </ModalFooter>
//                 </Modal>
//             </div>
//         );
//     }
// }


// export default Popup;