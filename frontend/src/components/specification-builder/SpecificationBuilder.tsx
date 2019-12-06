import React, { useState } from 'react'
import { Container, Paper, Theme, Stepper, Step, StepLabel, Typography, Button, Box } from '@material-ui/core'
import SpecificationInfoForm from './SpecificationInfoForm'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import ListEditingComponent from './ListEditingComponent';
import DottedSpinner from '../spinners/DottedSpinner';
import UploadSuccessComponent from './UploadSuccessComponent';
import { uploadSpecification } from '../../services/BackendAPI';
import { useAuth0 } from '../../services/react-auth0-spa';
import { SpecUploadRequestModel, DefaultSpecUploadRequestModel } from '../../services/request-models/SpecUploadRequestModel';

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
    const { getTokenSilently } = useAuth0();

    const [activeStep, setActiveStep] = useState(0);
    const [specUploadModel, setSpecUploadModel] = useState<SpecUploadRequestModel>(DefaultSpecUploadRequestModel);

    const [canContinue, setCanContinue] = useState(false);

    const [isLoading, setIsLoading] = useState(false)
    const [newSpecificationLink, setNewSpecificationLink] = useState("");

    const handleNext = () => { setActiveStep(prevActiveStep => prevActiveStep + 1); }
    const handleBack = () => { setActiveStep(prevActiveStep => prevActiveStep - 1); }
    const handleCanContinue = (value: boolean) => { setCanContinue(value); }

    const onValuesChange = (name: string, value: any) => { setSpecUploadModel({...specUploadModel, [name]:value}); }

    const postSpecification = () => {
        setIsLoading(true);
        handleNext();

        setTimeout(async () => {
            const token: string = await getTokenSilently();
            const jsonifiedObj = JSON.stringify(specUploadModel);

            uploadSpecification(jsonifiedObj, token).then(res => {
                console.log(res)
                setNewSpecificationLink(res.data.slug);
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
                    audience={specUploadModel.audience}
                    title={specUploadModel.title}
                    intendedUse={specUploadModel.intendedUse}
                    onValuesChanged={onValuesChange}
                    onFieldsValid={() => handleCanContinue(true)}
                    onFieldsNotValid={() => handleCanContinue(false)}
                />;
            case 1:
                return <ListEditingComponent 
                    title="Functional requirements"
                    inputName="functionalRequirements"
                    values={specUploadModel.functionalRequirements}
                    onValuesChange={onValuesChange}
                    onFieldsValid={() => handleCanContinue(true)}
                    onFieldsNotValid={() => handleCanContinue(false)}
                    />;
            case 2:
                return <ListEditingComponent 
                    title="Non-Functional requirement"
                    inputName="nonFunctionalRequirements"
                    values={specUploadModel.nonFunctionalRequirements}
                    onValuesChange={onValuesChange}
                    onFieldsValid={() => handleCanContinue(true)}
                    onFieldsNotValid={() => handleCanContinue(false)}
                    />
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
                    <Button variant="contained" disabled={!canContinue} color="primary" onClick={activeStep === steps.length - 1 ? postSpecification : handleNext}>
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
