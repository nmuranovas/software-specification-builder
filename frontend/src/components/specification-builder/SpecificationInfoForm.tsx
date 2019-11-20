import React from 'react'
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
    slug: string
    titleChanged: ((title: string) => void),
    audienceChanged: ((audience: string) => void),
    intendedUseChanged: ((purpose: string) => void)
}

const SpecificationInfoForm = (props: SpecificationInfoFormProps) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography variant="h5" component="h3" gutterBottom>
                Specification information
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField className={classes.textField}
                        onChange={event => props.titleChanged(event.target.value)}
                        value={props.title}
                        required
                        fullWidth
                        label="Title" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField className={classes.textField}
                        disabled
                        onChange={event => props.titleChanged(event.target.value)}
                        value={props.slug}
                        required
                        fullWidth
                        label="Generated Slug" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField className={classes.textField}
                        onChange={event => props.audienceChanged(event.target.value)}
                        value={props.audience}
                        required
                        fullWidth
                        label="Audience" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField className={classes.textField}
                        onChange={event => props.intendedUseChanged(event.target.value)}
                        value={props.intendedUse}
                        required
                        multiline
                        fullWidth
                        label="Purpose" />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default SpecificationInfoForm
