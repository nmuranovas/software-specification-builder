import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Specification from './Specification';
import SpecificationModal from './SpecificationModal';
import { useParams, RouteComponentProps } from 'react-router-dom'
import Axios from 'axios';
import SpecificationModel from '../../models/Specification';
import DottedSpinner from '../spinners/DottedSpinner';
import SlickPagination from '../pagination/SlickPagination';

const useStyles = makeStyles(theme => ({
    grid: {
        margin: theme.spacing(1, 1)
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    paper: {
        height: 140,
        width: 100
    },
    card: {
        maxWidth: 345
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    }
}));


const Specifications = (props: RouteComponentProps) => {
    const { page, count } = useParams();
    const [specs, setSpecs] = useState<SpecificationModel[]>();

    const [totalPageCount, setTotalPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState();

    const [isLoading, setIsLoading] = useState(true);
    const classes = useStyles();
    const [showSpecModal, setShowSpecModal] = useState(false);
    const [selectedSpec, setSelectedSpec] = useState<SpecificationModel>();

    useEffect(() => {
        Axios.get(`/api/specification/${page}/${count}`)
            .then(res => {
                setSpecs(res.data.specifications)
                setTotalPageCount(res.data.totalPageCount)
                if (page !== undefined)
                    setCurrentPage(parseInt(page));
            })
            .catch(err => {
                console.log(err)
            }).finally(() => {
                setIsLoading(false);
            });
    }, [page]);

    useEffect(() => {
        if (specs != null) {
            setSelectedSpec(specs[specs.length - 1])
            setShowSpecModal(true);
        }
    }, [specs])

    if (isLoading) {
        return <DottedSpinner color="black" />
    } else if (specs === undefined) {
        return <div>No specs found</div>
    }

    const openSpecModal = (index: number) => {
        setSelectedSpec(specs[index]);
        setShowSpecModal(true);
    }

    const closeSpecModal = () => { setShowSpecModal(false); }

    const handlePageChange = (pageNumber: number) => {
        props.history.push(`/specifications/${pageNumber}/${count}`)
    }

    const specComponents = specs.map((spec, index) => (
        <div onClick={() => openSpecModal(index)}>
            <Grid item>
                <Specification title={spec.title} creationDate={spec.createdAt} />
            </Grid>
        </div>
    ));

    const specModal = selectedSpec !== undefined ? (
        <SpecificationModal
            specification={selectedSpec}
            open={showSpecModal}
            onClose={closeSpecModal} />
        // <SpecificationModal title={selectedSpec.title}
        //     audience={selectedSpec.audience}
        //     intendedUse={selectedSpec.intendedUse}
        //     open={showSpecModal}
        //     onClose={closeSpecModal} />
    ) : null;

    return (
        <div>
            <SlickPagination pageCount={totalPageCount}
                currentPage={currentPage}
                onPageChanged={handlePageChange} />
            <Grid className={classes.grid} container justify="center" spacing={4}>
                {specComponents}
            </Grid>
            {specModal}
        </div>
    )
}

export default Specifications
