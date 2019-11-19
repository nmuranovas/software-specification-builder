import React, { useState, useEffect } from 'react'
import { Box, Paper, Grid, Typography, Divider, Container } from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { fetchSpecData } from '../../services/BackendAPI';
import { useParams } from 'react-router';
import SpecificationModel from '../../models/Specification';
import AuthorComponent from './AuthorComponent';
import RequirementPanel from './RequirementPanel';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(1, 1),
            display: 'flex',
            justifyContent: 'center'
        },
        paper: {
            padding: theme.spacing(3, 2),
            maxWidth: '90%'
        },
        displayImage: {
            width: "100%"
        },
        divider: {
            margin: theme.spacing(3, 6)
        }
    })
)

const SpecificationDetailsComponent = () => {
    const styles = useStyles();
    const { id } = useParams();
    const [, setIsLoading] = useState(true);
    const [specDetails, setSpecDetails] = useState<SpecificationModel>()

    const parsedId = parseInt(id !== undefined ? id : '0');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const specData = await fetchSpecData(parsedId);
                setSpecDetails(specData);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [])

    if (specDetails === undefined) {
        return <div>Loading...</div>
    }

    return (
        <Box className={styles.root}>
            <Box className={styles.paper}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            {specDetails.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <AuthorComponent name="John Doe" imageLink="/john-doe.jpg" />
                    </Grid>
                    <Grid item xs={12} className={styles.divider}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <img className={styles.displayImage} src="/React-icon.svg" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Typography component="p" gutterBottom>
                            Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Typography>
                        <Typography component="p" gutterBottom>
                            Intended use: {specDetails.intendedUse}
                        </Typography>
                        <Typography component="p">
                            Audience: {specDetails.audience}
                        </Typography>
                        <RequirementPanel heading="Functional Requirements" requirements={specDetails.functionalRequirements} />
                        <RequirementPanel heading="Non-Functional Requirements" requirements={specDetails.nonFunctionalRequirements} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default SpecificationDetailsComponent
