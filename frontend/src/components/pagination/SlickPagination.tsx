import React from 'react'
import classes from './SlickPagination.module.css'

type SlickPaginationProps = {
    currentPage: number,
    pageCount: number,
    onPageChanged: ((pageNumber: number) => void)
}

const SlickPagination = (props: SlickPaginationProps) => {

    const pageNumbers = [];
    for (let i = 0; i < props.pageCount; i++) {
        pageNumbers.push(
            <a key={i} onClick={() => props.onPageChanged(i)}
                className={props.currentPage === i ? classes.paginationActive : undefined}>
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
        <a className={classes.paginationOlder} onClick={handlePreviousClick}>PREV</a>
    )

    const nextButton = (
        <a className={classes.paginationNewer} onClick={handleNextClick}>NEXT</a>
    )

    return (
        <nav className={classes.paginationContainer}>
            <div className={classes.pagination}>
                {prevButton}
                <span className={classes.paginationInner}>
                    {pageNumbers}
                </span>
                {nextButton}
            </div>
        </nav>
    )
}

export default SlickPagination
