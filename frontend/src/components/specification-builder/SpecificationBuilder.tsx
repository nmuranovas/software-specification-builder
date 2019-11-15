import React, { useState } from 'react'
import { Container, Paper, Theme, Stepper, Step, StepLabel, Typography, Button, Box } from '@material-ui/core'
import SpecificationInfoForm from './SpecificationInfoForm'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import ListEditingComponent from './ListEditingComponent';
import Axios from 'axios';
import { BackendUrl } from '../../configs/backend-config';
import DottedSpinner from '../spinners/DottedSpinner';
import UploadSuccessComponent from './UploadSuccessComponent';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(3, 2),
            [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
                width: 800,
                marginLeft: 'auto',
                marginRight: 'auto'
            }
        },
        paper: {
            padding: theme.spacing(2)
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(2)
        },
        buttons: {
            display: 'flex',
            justifyContent: 'flex-end',
        }
    })
);

function getSteps() {
    return ["Defining software general info", "Defining functional requirements", "Defining non-functional requirements"];
}

const SpecificationBuilder = () => {
    const classes = useStyles();
    const steps = getSteps();

    const [activeStep, setActiveStep] = useState(0);
    const [title, setTitle] = useState("")
    const [audience, setAudience] = useState("")
    const [intendedUse, setIntendedUse] = useState("")

    const [functionalRequirements, setFunctionalRequirements] = useState([""]);
    const [nonFunctionalRequirements, setNonFunctionalRequirements] = useState([""]);
    const [isLoading, setIsLoading] = useState(false)
    const [newSpecificationLink, setNewSpecificationLink] = useState("");

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    }

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    const postSpecification = () => {
        setIsLoading(true);
        handleNext();
        const jsonifiedObj = JSON.stringify({
            title,
            audience,
            intendedUse,
            functionalRequirements: functionalRequirements.map((fr, index) => { return { description: fr, orderNumber: index } }),
            nonFunctionalRequirements: nonFunctionalRequirements.map((fr, index) => { return { description: fr, orderNumber: index } }),
        });

        setTimeout(() => {
            Axios({
                method: 'post',
                url: '/api/specification',
                data: jsonifiedObj,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log(res)
                setNewSpecificationLink(res.data.title);
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                setIsLoading(false);
            })
        }, 1000)
    }


    const getStepContent = (stepIndex: number) => {
        switch (stepIndex) {
            case 0:
                return <SpecificationInfoForm
                    intendedUse={intendedUse} intendedUseChanged={setIntendedUse}
                    audience={audience} audienceChanged={setAudience}
                    title={title} titleChanged={setTitle} />;
            case 1:
                return <ListEditingComponent title="Functional requirements"
                    values={functionalRequirements} valuesChanged={newValues => setFunctionalRequirements(newValues)} />;
            case 2:
                return <ListEditingComponent title="Non-Functional requirement"
                    values={nonFunctionalRequirements} valuesChanged={newValues => setNonFunctionalRequirements(newValues)} />
            default:
                throw new Error("Step number out of range error");
        }
    }

    const stepLabels = steps.map(label => (
        <Step key={label}>
            <StepLabel>{label}</StepLabel>
        </Step>
    ))

    let stepContent = null;
    if (activeStep === steps.length) {
        if (isLoading) {
            stepContent = (
                <Box display="flex" justifyContent="center">
                    <DottedSpinner color="black" />
                </Box>
            )
        } else {
            stepContent = (
                <Box display="flex" justifyContent="center">
                    <UploadSuccessComponent specificationSlug={newSpecificationLink} />
                </Box>
            )
        }
    } else {
        stepContent = (
            <div>
                <div className={classes.instructions}>{getStepContent(activeStep)}</div>
                <div className={classes.buttons}>
                    <Button disabled={activeStep === 0}
                        onClick={handleBack}>
                        Back
                    </Button>
                    <Button variant="contained" color="primary" onClick={activeStep === steps.length - 1 ? postSpecification : handleNext}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <Container className={classes.root}>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center">
                    Build
                </Typography>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {stepLabels}
                </Stepper>
                {stepContent}
            </Paper>
        </Container>
    )
}

export default SpecificationBuilder
