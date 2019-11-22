import React from 'react';
import { makeStyles, ThemeProvider, createStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ShortenedSpecificationModel } from '../../models/Specification';
import { Typography } from '@material-ui/core';

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
        }
    }));

type SpecificationListingProps = {
    specifications: ShortenedSpecificationModel[]
}

const SpecificationListing = (props: SpecificationListingProps) => {
    const classes = useStyles();

    const specificationRows = props.specifications.map(spec => (
        <TableRow key={spec.id}>
            <TableCell component="th" scope="row">{spec.title}</TableCell>
            <TableCell>{spec.title}</TableCell>
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
        </Paper>
    )
}

export default SpecificationListing
