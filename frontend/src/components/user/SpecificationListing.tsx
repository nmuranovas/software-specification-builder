import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ShortenedSpecificationModel } from '../../models/Specification';
import { Typography, IconButton, TablePagination, Box, Grid, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory, Link } from 'react-router-dom';
import AlertDialog from './AlertDialog';
import { useAuth0 } from '../../services/react-auth0-spa';
import { deleteSpecification, fetchMySpecifications } from '../../services/BackendAPI';
import { OrderingOptions } from '../../models/OrderingOptions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            overflowX: 'auto',
        },
        table: {
            minWidth: 650,
        },
        title: {
            padding: theme.spacing(2, 3)
        },
        noSpecTitle: {

        },
        noSpecGrid: {
            textAlign: "center",
            padding: theme.spacing(3, 3)
        },
        marginRight: {
            marginRight: theme.spacing(1)
        },
        unstyledLink: {
            color: theme.palette.text.primary,
            textDecoration: 'none'
        }
    }));

const SpecificationListing = () => {
    const classes = useStyles();
    const history = useHistory();
    const { getTokenSilently } = useAuth0();

    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
    const [selectedSpecTitle, setSelectedSpecTitle] = useState("")
    const [selectedSpecId, setSelectedSpecId] = useState(0)

    const [page, setPage] = useState(0)
    const [itemCount, setItemCount] = useState(5)
    const [totalItemCount, setTotalItemCount] = useState(0)
    const [ordering, setOrdering] = useState(OrderingOptions.CreatedAtDesc)

    const [specifications, setSpecifications] = useState<ShortenedSpecificationModel[]>()

    useEffect(() => {
        const fetchSpecifications = async () => {
            try {
                const token = await getTokenSilently();
                const response = await fetchMySpecifications(token, page, itemCount, ordering);
                console.log(response)
                setSpecifications(response.data)
                setTotalItemCount(response.totalItemCount)
            } catch (error) {
                console.log(error)
            }
        }

        fetchSpecifications();
    }, [page, itemCount, ordering])

    const showDialog = (id: number, specTitle: string) => {
        setSelectedSpecTitle(specTitle)
        setSelectedSpecId(id)
        setRemoveDialogOpen(true);
    }

    const handleDialogClose = () => {
        setRemoveDialogOpen(false);
    }

    const handleDeleteConfirm = async () => {
        try {
            const token = await getTokenSilently();
            await deleteSpecification(token, selectedSpecId);
        } catch (error) {
            console.log(error)
        } finally {
            handleDialogClose();
        }
    }

    const handleEditClick = (slug: string) => {
        history.push(`/edit/${slug}`);
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setItemCount(parseInt(event.target.value, 10));
        setPage(0);
    };

    const specificationTable = !specifications ? (
        <Grid className={classes.noSpecGrid}>
            <Grid item>
                <Typography component="h1" variant="h4" className={classes.noSpecTitle} gutterBottom>Currently you have not created any specifications</Typography>
            </Grid>
            <Grid item>
                <Typography component="p" gutterBottom>Try creating a new specification with the</Typography>
                <Link to="/specification-builder" className={classes.unstyledLink}><Button color="primary" variant="contained">builder</Button></Link>
            </Grid>
        </Grid>
    ) : (
            <React.Fragment>
                <Typography className={classes.title} component="h2" variant="h6" color="textPrimary">
                    My specifications
                </Typography>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Actions</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Creation date</TableCell>
                            <TableCell align="right">Last modified</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {specifications.map(spec => (
                            <TableRow key={spec.id}>
                                <TableCell>
                                    <IconButton onClick={() => handleEditClick(spec.slug)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => showDialog(spec.id, spec.title)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell component="th" scope="row">{spec.title}</TableCell>
                                <TableCell align="right">{spec.createdAt}</TableCell>
                                <TableCell align="right">{spec.lastModified}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination

                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={totalItemCount}
                    rowsPerPage={itemCount}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                <AlertDialog
                    title={`Remove specification \"${selectedSpecTitle}\"`}
                    open={removeDialogOpen}
                    onClose={handleDialogClose}
                    danger
                    onConfirm={handleDeleteConfirm}
                    description="Are you sure you want to delete this specification?" />
            </React.Fragment>

        )

    return (
        <Paper className={classes.root}>
            {specificationTable}
        </Paper>
    )
}

export default SpecificationListing
