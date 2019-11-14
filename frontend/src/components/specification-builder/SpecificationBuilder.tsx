import React, { useState } from 'react'
import { Container, Paper, Theme, Stepper, Step, StepLabel, Typography, Button } from '@material-ui/core'
import SpecificationInfoForm from './SpecificationInfoForm'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import FunctionalRequirementsForm from './FunctionalRequirementsForm';
import NonFunctionalRequirementsForm from './NonFunctionalRequirementsForm';

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

function getStepContent(stepIndex: number) {
    switch (stepIndex) {
        case 0:
            return <SpecificationInfoForm/>;
        case 1:
            return <FunctionalRequirementsForm/>;
        case 2:
            return <NonFunctionalRequirementsForm/>
        default:
            throw new Error("Step number out of range error");
    }
}

const SpecificationBuilder = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(2);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    }

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    const handleReset = () => {
        setActiveStep(0);
    }

    const stepLabels = steps.map(label => (
        <Step key={label}>
            <StepLabel>{label}</StepLabel>
        </Step>
    ))

    let stepContent = null;
    if (activeStep === steps.length) {
        stepContent = (
            <div>
                <Typography className={classes.instructions}>All steps completed</Typography>
                <Button onClick={handleReset}>Reset</Button>
            </div>
        )
    } else {
        stepContent = (
            <div>
                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                <div className={classes.buttons}>
                    <Button disabled={activeStep === 0}
                        onClick={handleBack}>
                        Back
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleNext}>
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
