import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ShortenedSpecificationModel } from '../../models/Specification';
import { Typography, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
import AlertDialog from './AlertDialog';
import { useAuth0 } from '../../services/react-auth0-spa';
import { deleteSpecification } from '../../services/BackendAPI';

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
        marginRight: {
            marginRight: theme.spacing(1)
        }
    }));

type SpecificationListingProps = {
    specifications: ShortenedSpecificationModel[],
    onReloadSpecifications: () => void
}

const SpecificationListing = (props: SpecificationListingProps) => {
    const classes = useStyles();
    const history = useHistory();
    const {getTokenSilently} = useAuth0();

    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
    const [selectedSpecTitle, setSelectedSpecTitle] = useState("")
    const [selectedSpecId, setSelectedSpecId] = useState(0)

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
            await deleteSpecification(selectedSpecId, token);
            props.onReloadSpecifications();
        } catch (error) {
            console.log(error)
        }finally{
            handleDialogClose();
        }
    }

    const handleEditClick = (slug: string) => {
        history.push(`/edit/${slug}`);
    }
    
    const specificationRows = props.specifications.map(spec => (
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
    ));

    return (
        <Paper className={classes.root}>
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
                    {specificationRows}
                </TableBody>
            </Table>
            <AlertDialog title={`Remove specification \"${selectedSpecTitle}\"`} 
                open={removeDialogOpen} 
                onClose={handleDialogClose} 
                danger
                onConfirm={handleDeleteConfirm}
                description="Are you sure you want to delete this specification?"/>
        </Paper>
    )
}

export default SpecificationListing
