import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Specification from './Specification';
import SpecificationModal from './SpecificationModal';
import Axios, { AxiosResponse } from 'axios';
import { ShortenedSpecificationModel } from '../../models/Specification';
import DottedSpinner from '../spinners/DottedSpinner';
import SlickPagination from '../pagination/SlickPagination';
import SearchBar from './SearchBar';

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
    },

}));


const Specifications = () => {
    const [specs, setSpecs] = useState<ShortenedSpecificationModel[]>();

    const [totalPageCount, setTotalPageCount] = useState(0)
    const [itemsPerPage] = useState(2)
    const [currentPage, setCurrentPage] = useState(0);
    const [searchString, setSearchString] = useState<string>()

    const [isLoading, setIsLoading] = useState(true);
    const classes = useStyles();
    const [showSpecModal, setShowSpecModal] = useState(false);
    const [selectedSpec, setSelectedSpec] = useState<ShortenedSpecificationModel>();

    const [orderBy, setOrderBy] = useState<string>("createdAtDesc")

    useEffect(() => {
        let promise: Promise<AxiosResponse<any>>;
        if (searchString === undefined) {
            promise = Axios.get('/api/specification', {
                params: {
                    pageNumber: currentPage,
                    itemCount: itemsPerPage,
                    sortByTerm: orderBy
                }
            })
        } else {
            promise = Axios.get(`/api/specification/search`, {
                params: {
                    searchText: searchString,
                    pageNumber: currentPage,
                    itemCount: itemsPerPage,
                    sortByTerm: orderBy
                }
            })
        }
        console.log(promise)

        promise.then(res => {
            console.log(res)
            setSpecs(res.data.shortenedSpecifications)
            setTotalPageCount(res.data.totalPageCount)
        })
            .catch(err => {
                console.log(err)
            }).finally(() => {
                setIsLoading(false);
            });
    }, [currentPage, orderBy, searchString]);

    // useEffect(() => {
    //     if (specs != null) {
    //         setSelectedSpec(specs[specs.length - 1])
    //         setShowSpecModal(true);
    //     }
    // }, [specs])

    const handleSearchSubmit = (searchString: string) => {
        setSearchString(searchString)
    }

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
            <SearchBar onSubmit={handleSearchSubmit} />
            <Grid className={classes.grid} container justify="center" spacing={4}>
                {specComponents}
            </Grid>
            <SlickPagination pageCount={totalPageCount}
                currentPage={currentPage}
                onPageChanged={handlePageChange}
                orderChanged={handleOrderChange}
                currentOrderTerm={orderBy}
            />
            {specModal}
        </div >
    )
}

export default Specifications
