import React from 'react';
import SearchBox from './Components/search-box.js';
import DropDownFilter from './Components/drop-down-filter.js';
import DataList from './Components/data-list.js';
import Pagination from './Components/pagination.js';

module.exports = class FlexList extends React.Component {
    constructor(props) {
        super(props);
        this._searchBoxConfig = this.props.searchBox;
    }

    render() {
        let searchBox,
            filterContainer,
            listContent,
            pagination;

        searchBox = <SearchBox
            label = {this._searchBoxConfig.label}
            placeholder = {this._searchBoxConfig.placeholder}
            className = {this._searchBoxConfig.className}
            additionalParameters = {this._searchBoxConfig.additionalParameters}
        />;

        filterContainer =
            <div className="filter-list__filter-container">
                {searchBox}
                <DropDownFilter/>
            </div>;

        listContent = <DataList />;

        pagination = <Pagination/>

        return(
            <div className="filter-list">
                {filterContainer}
                {listContent}
                {pagination}
            </div>
        );
    }
}
