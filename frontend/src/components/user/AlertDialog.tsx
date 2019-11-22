import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'

type AlertDialogProps = {
    open: boolean,
    onClose: () => void,
    onConfirm: () => void,
    title: string,
    description: string,
    danger: boolean
}

const AlertDialog = (props: AlertDialogProps) => {
    const confirmButtonColor = props.danger ? "secondary" : "primary";

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.onConfirm} color={confirmButtonColor} autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDialog
