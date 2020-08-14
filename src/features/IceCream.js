import React, { useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Slide } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import useSound from 'use-sound';
import sounds from '../sounds';
import iceCreamPics from '../images';

const Transition = React.forwardRef (
    ( props, ref ) => <Slide direction="up" ref={ref} {...props} /> 
);

export default ({ handleClose, iceCreamNumber, isDialogOpen, youtube }) => {

    const keypressFn = ({ key }) => {
        key === 'Enter' && handleClose();
    }

    const isLastIceCream = iceCreamNumber > 2;

    const [ playGift ] = useSound ( isLastIceCream ? sounds.success : sounds.gift );
    useEffect ( () => {
        if ( isDialogOpen ) {
            playGift();
            isLastIceCream && document.removeEventListener ( 'keypress', keypressFn );
        }
    }, [ isDialogOpen, playGift ]);

    useEffect ( () => {
        if ( isDialogOpen ) {
            document.addEventListener ( 'keypress', keypressFn );
        }
        return () => {
            document.removeEventListener ( 'keypress', keypressFn );
            const textbox = document.querySelector ('[class*=textbox]');
            textbox && textbox.focus();
        }
    }, [ isDialogOpen ]);

    return (
        <Dialog
            open={isDialogOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            className="iceCream-dialog"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    { isLastIceCream ? youtube : <img src={iceCreamPics[ iceCreamNumber+1 ]} style={{ maxHeight: '470px' }} alt='' /> }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    <ThumbUpIcon />
                </Button>
            </DialogActions>
        </Dialog>
    );
}