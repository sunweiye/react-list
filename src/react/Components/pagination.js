import React from 'react';
import ReactPaginate from 'react-paginate';

module.exports = class Pagination extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {totalPage, currentPage, viewablePages, pagesMargin, handlePageClick, additionalParameters, ...pros} = this.props;

        return (
            <div className="filter-list__pagination">
                <nav aria-label="Page navigation" className="bt-pagination-nav">

                    <ReactPaginate  pageCount={totalPage}
                                    pageRangeDisplayed={viewablePages}
                                    marginPagesDisplayed={pagesMargin}
                                    onPageChange={handlePageClick}
                                    forcePage={currentPage}
                                    previousLabel={<span aria-hidden="true">&laquo;</span>}
                                    nextLabel={<span aria-hidden="true">&raquo;</span>}
                                    breakLabel={<span className="fill">...</span>}
                                    breakClassName={"break-me"}
                                    containerClassName = {"pagination pagination-sm"}
                                    pageLinkClassName = {"page-link"}
                                    activeClassName = {"active"}
                                    previousLinkClassName = {"arrow page-link"}
                                    nextLinkClassName = {"arrow page-link"}
                                    disabledClassName = {"disabled-arrow"}
                    />
                </nav>
            </div>
    );
    }
};



