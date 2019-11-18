import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Zoom, ListItem, ListItemText, List, makeStyles } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions'
import SpecificationModel from '../../models/Specification';

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />
})

const useStyles = makeStyles(() => ({
    dialogTitle: {
        textAlign: "center"
    }
}))

type SpecificationModalProps = {
    open: boolean,
    onClose: () => void,
    specification: SpecificationModel,
}

const SpecificationModal = (props: SpecificationModalProps) => {
    const styles = useStyles();

    const functionalRequirements = props.specification.functionalRequirements !== null ? (
        <List> {
            props.specification.functionalRequirements.map((fr, index) => (
                <ListItem alignItems="flex-start">
                    <ListItemText
                        primary={`Functional Requirement #${index + 1}`}
                        secondary={fr.description} />
                </ListItem>
            ))
        }
        </List>
    ) : null;

    const nonFunctionalRequirements = props.specification.nonFunctionalRequirements !== null ? (
        <List> {
            props.specification.nonFunctionalRequirements.map((nfr, index) => (
                <ListItem alignItems="flex-start">
                    <ListItemText
                        primary={`Non-Functional Requirement #${index + 1}`}
                        secondary={nfr.description} />
                </ListItem>
            ))
        }
        </List>
    ) : null;

    return (
        <Dialog open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.onClose}
            fullWidth>
            <DialogTitle className={styles.dialogTitle}>{props.specification.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Intended use: {props.specification.intendedUse}
                </DialogContentText>
                <DialogContentText>
                    Target audience: {props.specification.audience}
                </DialogContentText>
                {functionalRequirements}
                {nonFunctionalRequirements}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">Button 1</Button>
                <Button onClick={props.onClose} color="primary">Button 2</Button>
            </DialogActions>
        </Dialog>
    )
}

export default SpecificationModal
