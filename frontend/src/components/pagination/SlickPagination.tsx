import React from 'react'
import makeStyles from '@material-ui/styles/makeStyles';
import { Theme, Container, Box, Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    box: {
    },
    paginationOlder: {
        marginRight: theme.spacing(2),
        fontSize: "24px"
    },
    paginationNewer: {
        marginLeft: theme.spacing(2),
        fontSize: "24px"
    },
    paginationButton: {
        margin: theme.spacing(0, 1),
        cursor: 'pointer'
    },
    paginationActive: {
        cursor: 'pointer',
        color: theme.palette.primary.main,
        margin: theme.spacing(0, 1)
    }
}));

type SlickPaginationProps = {
    currentPage: number,
    pageCount: number,
    onPageChanged: ((pageNumber: number) => void)
}

const SlickPagination = (props: SlickPaginationProps) => {
    const styles = useStyles();

    const pageNumbers = [];
    for (let i = 0; i < props.pageCount; i++) {
        pageNumbers.push(
            <a key={i} style={{}} onClick={() => props.onPageChanged(i)}
                className={props.currentPage === i ? styles.paginationActive : styles.paginationButton}>
                {i + 1}
            </a>
        );
    }

    const isLastPage = props.currentPage >= props.pageCount - 1;

    const handleNextClick = () => {
        if (isLastPage) {
            return;
        } else {
            props.onPageChanged(props.currentPage + 1);
        }
    }

    const handlePreviousClick = () => {
        if (props.currentPage === 0) {
            return;
        } else {
            props.onPageChanged(props.currentPage - 1);
        }
    }

    const prevButton = (
        <Button className={styles.paginationOlder} disabled={props.currentPage === 0} onClick={handlePreviousClick}>PREV</Button>
    )

    const nextButton = (
        <Button className={styles.paginationNewer} disabled={isLastPage} onClick={handleNextClick}>NEXT</Button>
    )

    return (
        <Box component='nav'
            display="flex"
            justifyContent="center"
            fontWeight="fontWeigthBold"
            fontSize="24px"
            m={1} p={1}>
            {prevButton}
            <Box display="flex" flexDirection="column" justifyContent="center">
                <div>
                    {pageNumbers}
                </div>
            </Box>
            {nextButton}
        </Box>
    )
}

export default SlickPagination
