import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Zoom, ListItem, ListItemText, List, makeStyles } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions'
import SpecificationModel from '../../models/Specification';
import Axios from 'axios';
import DottedSpinner from '../spinners/DottedSpinner';

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />
})

const useStyles = makeStyles(() => ({
    dialogTitle: {
        textAlign: "center"
    }
}))

type SpecificationModalProps = {
    specificationId: number,
    open: boolean,
    onClose: () => void,
}

const SpecificationModal = (props: SpecificationModalProps) => {
    const [specification, setSpecification] = useState<SpecificationModel>()
    useEffect(() => {
        Axios.get(`/api/specification/${props.specificationId}`)
            .then(response => {
                setSpecification(response.data);
            }).catch(error => {
                console.log(error)
            })
        return () => {
        };
    }, [props.specificationId])

    const styles = useStyles();

    if (specification === undefined){
        return <DottedSpinner color="black"/>
    }

    const functionalRequirements = specification.functionalRequirements !== null ? (
        <List> {
            specification.functionalRequirements.map((fr, index) => (
                <ListItem alignItems="flex-start">
                    <ListItemText
                        primary={`Functional Requirement #${index + 1}`}
                        secondary={fr.description} />
                </ListItem>
            ))
        }
        </List>
    ) : null;

    const nonFunctionalRequirements = specification.nonFunctionalRequirements !== null ? (
        <List> {
            specification.nonFunctionalRequirements.map((nfr, index) => (
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
            <DialogTitle className={styles.dialogTitle}>{specification.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Intended use: {specification.intendedUse}
                </DialogContentText>
                <DialogContentText>
                    Target audience: {specification.audience}
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
