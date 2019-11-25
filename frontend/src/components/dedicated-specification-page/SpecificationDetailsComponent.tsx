import React, { useState, useEffect } from 'react'
import { Box, Paper, Grid, Typography, Divider, Container } from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { fetchSpecData } from '../../services/BackendAPI';
import { useParams, useHistory } from 'react-router';
import SpecificationModel, { DetailedSpecification } from '../../models/Specification';
import AuthorComponent from './AuthorComponent';
import RequirementPanel from './RequirementPanel';
import Skeleton from '@material-ui/lab/Skeleton';
import { classes } from 'istanbul-lib-coverage';
import { width } from '@material-ui/system';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(1, 1),
            display: 'flex',
            justifyContent: 'center'
        },
        paper: {
            padding: theme.spacing(3, 2),
            maxWidth: '90%',
            width: '100%'
        },
        centerText: {
            display: 'flex',
            justifyContent: 'center'
        },
        displayImage: {
            width: "100%"
        },
        divider: {
            margin: theme.spacing(3, 6)
        },
        fullWidth: {
            width: "100%"
        },
        imageGridItemPadding: {
            padding: theme.spacing(0, 2)
        }
    })
)

const SpecificationDetailsComponent = () => {
    const styles = useStyles();
    const { slug } = useParams();
    const [specDetails, setSpecDetails] = useState<DetailedSpecification>()

    useEffect(() => {
        if (slug === undefined)
            return;

        const fetchData = async () => {
            try {
                const specData = await fetchSpecData(slug);
                setSpecDetails(specData);
            } catch (error) {
                console.log(error);
            }
        }

        setTimeout(fetchData, 1000);
    }, [])

    if (slug === undefined) {
        return <div>Not found</div>
    }

    const isLoading = specDetails === undefined;

    return (
        <Box className={styles.root}>
            <Box className={styles.paper}>
                <Grid container>
                    <Grid item className={styles.centerText} xs={12}>
                        {isLoading ? (
                            <Skeleton height={24} width="40%" />
                        ) : (
                                <Typography variant="h4" component="h1" gutterBottom>
                                    {specDetails!.title}
                            </Typography>
                            )}
                    </Grid>
                    <Grid item className={styles.centerText} xs={12}>
                        {isLoading ? (
                            <Skeleton height={12} width="20%" />
                        ) : (
                                <AuthorComponent username={specDetails!.userDetails.username} imageLink={specDetails!.userDetails.pictureUrl} />
                            )}
                    </Grid>
                    <Grid item xs={12} className={styles.divider}>
                        <Divider />
                    </Grid>
                    <Grid item className={styles.imageGridItemPadding} xs={12} sm={12} md={6}>
                        {isLoading ? (
                            <Skeleton className={styles.displayImage} height={500} />
                        ) : (
                                <img className={styles.displayImage} src="/React-icon.svg" />
                            )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        {isLoading ? (
                            <Skeleton width="100%" height={120} />
                        ) : (
                            <Typography className={styles.fullWidth} component="p" gutterBottom>
                                Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </Typography>
                            )}
                        {isLoading ? (
                            <Skeleton width="80%" height={20} />
                        ) : (
                                <Typography component="p" gutterBottom>
                                    Intended use: {specDetails!.intendedUse}
                                </Typography>
                            )}
                        {isLoading ? (
                            <Skeleton width="50%" height={20} />
                        ) : (
                                < Typography component="p">
                                    Audience: {specDetails!.audience}
                                </Typography>
                            )}
                        {isLoading ? (
                            <Skeleton width="100%" height={100} />
                        ) : (
                                <RequirementPanel heading="Functional Requirements" requirements={specDetails!.functionalRequirements} />
                            )}
                        {isLoading ? (
                            <Skeleton width="100%" height={100} />
                        ) : (
                                <RequirementPanel heading="Non-Functional Requirements" requirements={specDetails!.nonFunctionalRequirements} />
                            )}
                    </Grid>
                </Grid>
            </Box>
        </Box >
    )
}

export default SpecificationDetailsComponent
