import React, { useState } from 'react'
import { Dialog, Slide, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Zoom } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions'

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />
})

type SpecificationModalProps = {
    open: boolean,
    onClose: () => void,
    title: string,
    audience: string,
    intendedUse: string
}

const SpecificationModal = (props: SpecificationModalProps) => {
    return (
        <Dialog open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.onClose}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Intended use: {props.intendedUse}
                    Target audience: {props.audience}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">Button 1</Button>
            </DialogActions>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">Button 2</Button>
            </DialogActions>
        </Dialog>
    )
}

export default SpecificationModal
