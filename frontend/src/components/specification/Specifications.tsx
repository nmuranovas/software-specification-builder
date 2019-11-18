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
    const [specs, setSpecs] = useState<SpecificationModel[]>();

    const [totalPageCount, setTotalPageCount] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(2)
    const [currentPage, setCurrentPage] = useState(0);

    const [isLoading, setIsLoading] = useState(true);
    const classes = useStyles();
    const [showSpecModal, setShowSpecModal] = useState(false);
    const [selectedSpec, setSelectedSpec] = useState<SpecificationModel>();

    const [orderBy, setOrderBy] = useState<string>("createdAtDesc")

    useEffect(() => {
        Axios.get(`/api/specification/${currentPage}/${itemsPerPage}/${orderBy}`)
            .then(res => {
                setSpecs(res.data.specifications)
                setTotalPageCount(res.data.totalPageCount)
            })
            .catch(err => {
                console.log(err)
            }).finally(() => {
                setIsLoading(false);
            });
    }, [currentPage, orderBy]);

    // useEffect(() => {
    //     if (specs != null) {
    //         setSelectedSpec(specs[specs.length - 1])
    //         setShowSpecModal(true);
    //     }
    // }, [specs])

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
        setCurrentPage(pageNumber)
    }

    const specComponents = specs.map((spec, index) => (
        <div onClick={() => openSpecModal(index)}>
            <Grid item>
                <Specification title={spec.title} creationDate={spec.createdAt} />
            </Grid>
        </div>
    ));

    const handleOrderChange = (orderTerm: string) => {
        setOrderBy(orderTerm)
    }

    const specModal = selectedSpec !== undefined ? (
        <SpecificationModal
            specificationId={selectedSpec.id}
            open={showSpecModal}
            onClose={closeSpecModal}
        />
    ) : null;

    return (
        <div>
            <SlickPagination pageCount={totalPageCount}
                currentPage={currentPage}
                onPageChanged={handlePageChange}
                orderChanged={handleOrderChange}
                currentOrderTerm={orderBy}
            />
            <Grid className={classes.grid} container justify="center" spacing={4}>
                {specComponents}
            </Grid>
            {specModal}
        </div>
    )
}

export default Specifications
