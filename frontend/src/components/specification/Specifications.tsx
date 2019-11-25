import React, { useState, useEffect } from 'react'
import { Grid, Box, Zoom } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Specification from './Specification';
import { ShortenedSpecificationModel } from '../../models/Specification';
import DottedSpinner from '../spinners/DottedSpinner';
import SlickPagination from '../pagination/SlickPagination';
import SearchBar from './SearchBar';
import { fetchPaginatedSpecifications, fetchPaginatedSpecificationsWithSearch } from '../../services/BackendAPI';
import { PaginatedSpecificationResponse } from '../../services/response-models/PaginatedSpecificationResponse';
import { OrderingOptions } from '../../models/OrderingOptions';
import DateFilter from './DateFilter';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
    grid: {
        margin: theme.spacing(1, 1)
    },
    specificationCard: {
        margin: theme.spacing(1, 1)
    }
}));

const Specifications = () => {
    const classes = useStyles();

    const [totalPageCount, setTotalPageCount] = useState(0)
    const [itemsPerPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(0);
    const [searchString, setSearchString] = useState<string>()
    const [specs, setSpecs] = useState<ShortenedSpecificationModel[]>();

    const [isLoading, setIsLoading] = useState(true);
    const [showSpecModal, setShowSpecModal] = useState(false);
    const [selectedSpecSlug, setSelectedSpecSlug] = useState<string>();

    const [orderBy, setOrderBy] = useState<OrderingOptions>(OrderingOptions.CreatedAtDesc)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let promise: Promise<PaginatedSpecificationResponse>;
                if (searchString === undefined || searchString === "") {
                    promise = fetchPaginatedSpecifications(currentPage, itemsPerPage, orderBy);
                } else {
                    promise = fetchPaginatedSpecificationsWithSearch(searchString, currentPage, itemsPerPage, orderBy);
                }
                const response = await promise;
                setSpecs(response.data)
                setTotalPageCount(Math.floor((response.totalItemCount + response.pageSize - 1) / response.pageSize));
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [currentPage, orderBy, searchString]);

    // useEffect(() => {
    //     if (specs != null) {
    //         setSelectedSpec(specs[specs.length - 1])
    //         setShowSpecModal(true);
    //     }
    // }, [specs])

    const openSpecModal = (slug: string) => {
        setSelectedSpecSlug(slug);
        setShowSpecModal(true);
    }

    const closeSpecModal = () => { setShowSpecModal(false); }

    const handlePageChange = (pageNumber: number) => { setCurrentPage(pageNumber); setIsLoading(true); }
    const handleOrderChange = (orderTerm: OrderingOptions) => { setOrderBy(orderTerm); setIsLoading(true); }
    const handleSearchSubmit = (searchString: string) => { setCurrentPage(0); setSearchString(searchString); setIsLoading(true); }

    let mainContent = undefined;
    if (specs === undefined || specs.length === 0) {
        mainContent = <div>No specs found...</div>
    } else {
        mainContent = specs.map((spec, index) => (
            <Zoom in={!isLoading} style={{transitionDelay: `${index * 100}ms`}}>
                <div className={classes.specificationCard} key={spec.id} onClick={() => openSpecModal(spec.slug)}>
                    <Grid item>
                        <Specification slug={spec.slug} title={spec.title} creationDate={spec.createdAt} />
                    </Grid>
                </div>
            </Zoom>
        ))
    }

    return (
        <div>
            <Box display="flex" justifyContent="center">
                <SearchBar onSubmit={handleSearchSubmit} />
                <DateFilter
                    currentOrderTerm={orderBy}
                    orderChanged={handleOrderChange} />
            </Box>
            <Grid className={classes.grid} container justify="center" spacing={4}>
                {mainContent}
            </Grid>
            {specs && specs.length > 0 && <SlickPagination pageCount={totalPageCount}
                currentPage={currentPage}
                onPageChanged={handlePageChange}
            />}
            {/* {selectedSpecSlug && (
                <SpecificationModal
                    slug={selectedSpecSlug}
                    isOpen={showSpecModal}
                    onClose={closeSpecModal}
                />
            )} */}
            {/* <Skeleton variant="rect" width={210} height={118} />
            <React.Fragment>
                <Skeleton />
                <Skeleton width="60%" />
            </React.Fragment> */}
        </div >
    )
}

export default Specifications
