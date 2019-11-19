import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Zoom, makeStyles } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions'
import SpecificationModel from '../../models/Specification';
import DottedSpinner from '../spinners/DottedSpinner';
import { fetchSpecData } from '../../services/BackendAPI';
import RequirementList from './RequirementList';

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
    isOpen: boolean,
    onClose: () => void,
}

const SpecificationModal = (props: SpecificationModalProps) => {
    const styles = useStyles();
    const [specification, setSpecification] = useState<SpecificationModel>()
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const specData = await fetchSpecData(props.specificationId);
                setSpecification(specData);
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, [props.specificationId])

    let modalContent = null;
    if (specification === undefined || !props.specificationId) {
        modalContent = (
            <React.Fragment>
                <DialogTitle className={styles.dialogTitle}>Loading...</DialogTitle>
                <DialogContent>
                    <DottedSpinner color="black" />)
            </DialogContent>
            </React.Fragment>
        )
    } else {
        modalContent = (
            <React.Fragment>
                <DialogTitle className={styles.dialogTitle}>{specification.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Intended use: {specification.intendedUse}
                    </DialogContentText>
                    <DialogContentText>
                        Target audience: {specification.audience}
                    </DialogContentText>
                    <RequirementList requirements={specification.functionalRequirements} listItemNumberingText="Functional Requirement" />
                    <RequirementList requirements={specification.nonFunctionalRequirements} listItemNumberingText="Non-Functional Requirement" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} color="primary">Button 1</Button>
                    <Button onClick={props.onClose} color="primary">Button 2</Button>
                </DialogActions>
            </React.Fragment>
        )
    }

    return (
        <Dialog open={props.isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.onClose}
            fullWidth>
            {modalContent}
        </Dialog>
    )
}

export default SpecificationModal
