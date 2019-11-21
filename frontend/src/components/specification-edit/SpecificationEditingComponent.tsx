import React, { useState, useEffect } from 'react'
import { Typography, TextField, makeStyles, Theme, createStyles, Grid, Box, Divider, Button } from '@material-ui/core'
import SpecificationModel from '../../models/Specification'
import { fetchSpecData, putSpecification, SpecificationUpdateModel } from '../../services/BackendAPI'
import { useParams } from 'react-router'
import ListEditingComponent from '../specification-builder/ListEditingComponent'
import { useAuth0 } from '../../services/react-auth0-spa'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        },
        root: {
            padding: theme.spacing(3, 2),
            display: 'flex',
            justifyContent: 'center',
        },
        grid: {
            maxWidth: '90%'
        },
        divider: {
            margin: theme.spacing(3, 6)
        },
        buttons: {
            display: 'flex',
            justifyContent: 'flex-end',
        }
    })
)

const SpecificationEditingComponent = () => {
    const classes = useStyles();
    const { slug } = useParams();
    const [specDetails, setSpecDetails] = useState<SpecificationModel>()
    const {getTokenSilently} = useAuth0();

    const [isLoading, setIsLoading] = useState(true)

    const [audience, setAudience] = useState("")
    const handleAudienceChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setAudience(event.target.value); }
    const [intendedUse, setIntendedUse] = useState("")
    const handleIntendedUseChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setIntendedUse(event.target.value); }
    const [functionalRequirements, setFunctionalRequirements] = useState([""])
    const handleFunctionalRequirementChange = (values: string[]) => { setFunctionalRequirements(values) }
    const [nonFunctionalRequirements, setNonFunctionalRequirements] = useState([""])
    const handleNonFunctionalRequirementChange = (values: string[]) => { setNonFunctionalRequirements(values) }

    useEffect(() => {
        if (slug === undefined) {
            return;
        }

        const fetchSpec = async () => {
            try {
                const specData = await fetchSpecData(slug);
                setSpecDetails(specData);
                setAudience(specData.audience)
                setIntendedUse(specData.intendedUse)
                setFunctionalRequirements(specData.functionalRequirements.map(fr => fr.description))
                setNonFunctionalRequirements(specData.nonFunctionalRequirements.map(nfr => nfr.description))
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        }

        fetchSpec();
    }, [])

    if (specDetails === undefined) {
        return <div>error</div>
    }

    
    const handleSubmit = async () => {
        const token = await getTokenSilently();
        const newModel: SpecificationUpdateModel = {
            audience,
            intendedUse,
            functionalRequirements: functionalRequirements,
            nonFunctionalRequirements: nonFunctionalRequirements
        }
        await putSpecification(specDetails.id, newModel, token);
    }

    return (
        <Box className={classes.root}>
            <Grid className={classes.grid} container spacing={3}>
                <Grid item xs={12}>
                    <Typography align="center" variant="h5" component="h3" gutterBottom>
                        Specification information
                </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField className={classes.textField}
                        value={specDetails.title}
                        disabled
                        fullWidth
                        label="Title" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField className={classes.textField}
                        disabled
                        value={specDetails.slug}
                        required
                        fullWidth
                        label="Slug" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField className={classes.textField}
                        onChange={handleAudienceChange}
                        value={audience}
                        required
                        fullWidth
                        label="Audience" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField className={classes.textField}
                        onChange={handleIntendedUseChange}
                        value={intendedUse}
                        required
                        multiline
                        fullWidth
                        label="Purpose" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ListEditingComponent title="Functional requirements" values={functionalRequirements} valuesChanged={handleFunctionalRequirementChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ListEditingComponent title="Non-Functional requirements" values={nonFunctionalRequirements} valuesChanged={handleNonFunctionalRequirementChange} />
                </Grid>
                <Grid item xs={12}>
                    <Divider className={classes.divider} />
                </Grid>
                <Grid item className={classes.buttons}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Update
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default SpecificationEditingComponent
