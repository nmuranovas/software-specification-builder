import React, { useState, useEffect } from 'react'
import { Typography, TextField, makeStyles, Theme, createStyles, Grid } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        }
    }))

type SpecificationInfoFormProps = {
    title: string,
    audience: string,
    intendedUse: string,
    
    onFieldsValid: () => void
    onValuesChanged: (name: string, value: string) => void
    onFieldsNotValid: () => void
}

const SpecificationInfoForm = (props: SpecificationInfoFormProps) => {
    const classes = useStyles();

    const {title, audience, intendedUse} = props;

    const [titleError, setTitleError] = useState()
    const [audienceError, setAudienceError] = useState()
    const [intendedUseError, setIntendedUseError] = useState()

    useEffect(() => {
        if (titleError === undefined && audienceError === undefined && intendedUseError === undefined &&
            (title !== "" && audience !== "" && intendedUse !== "")) {
            props.onFieldsValid();
        } else {
            props.onFieldsNotValid();
        }
    }, [title, audience, intendedUse])

    const handleTitleChange = ({target}: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.onValuesChanged(target.name, target.value);
        if (target.value === undefined || target.value === "") {
            setTitleError("Required")
        } else if (target.value.length > 100) {
            setTitleError("Cannot be longer than 100 symbols")
        } else {
            setTitleError(undefined);
        }
    }

    const handleAudienceChange = ({target}: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.onValuesChanged(target.name, target.value);
        if (target.value === undefined || target.value === "") {
            setAudienceError("Required")
        } else if (target.value.length > 100) {
            setAudienceError("Cannot be longer than 100 symbols")
        } else {
            setAudienceError(undefined);
        }
    }

    const handleIntendedUseChange = ({target}: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.onValuesChanged(target.name, target.value);
        if (target.value === undefined || target.value === "") {
            setIntendedUseError("Required")
        } else if (target.value.length > 360) {
            setIntendedUseError("Cannot be longer than 360 symbols")
        } else {
            setIntendedUseError(undefined);
        }
    }

    return (
        <React.Fragment>
            <Typography variant="h5" component="h3" gutterBottom>
                Specification information
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField className={classes.textField}
                        name="title"
                        onChange={handleTitleChange}
                        value={title}
                        required
                        fullWidth
                        label="Title"
                        error={titleError !== undefined}
                        helperText={titleError}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField className={classes.textField}
                        name="audience"
                        onChange={handleAudienceChange}
                        value={audience}
                        required
                        fullWidth
                        label="Audience"
                        error={audienceError !== undefined}
                        helperText={audienceError}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField className={classes.textField}
                        name="intendedUse"
                        onChange={handleIntendedUseChange}
                        value={intendedUse}
                        required
                        multiline
                        fullWidth
                        label="Intended use"
                        error={intendedUseError !== undefined}
                        helperText={intendedUseError}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default SpecificationInfoForm
