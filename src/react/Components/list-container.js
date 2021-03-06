import React from 'react';
import DataList from './data-list.js';
import Pagination from './pagination.js';

module.exports = class ListContainer extends React.Component {
    constructor(props) {
        super(props);

        this._dataList = this.props.dataList;
        this._itemsPerPage = this.props.itemsPerPage;
        this._itemLinkText = this.props.itemLinkText;
        this._resultNotFoundText = this.props.resultNotFoundText;
        this._paginationConfig = this.props.paginationConfig;

        this._initialState = {
            currentPage: 0,
            renderedDataList: this._dataList,
            searchText: "",
            filters: {}
        };

        this.state = this._initialState;
    }

    _getFilteredSubList(filters = null) {
        if(filters === null) {
            filters = this.state.filters;
        }

        if(Object.keys(filters).length === 0 && filters.constructor === Object) {
            return this._dataList;
        }

        let filteredList = [];
        this._dataList.forEach(function (item) {
            for(let key in filters) {
                if(item.options[key][filters[key]] === undefined) {
                    return;
                }
            }

            filteredList.push(item);
        });

        return filteredList;
    }

    filter(selectedValue, filter) {
        let subList,
            filters = this.state.filters;

        if(selectedValue !== null) {
            filters[filter] = selectedValue;
        } else {
            delete filters[filter];
        }

        this.search(this.state.searchText, filters);
    }

    search(searchText, filters = null) {
        let subList = [],
            filteredList = this._getFilteredSubList(filters);

        if(searchText = searchText.trim().toLowerCase()) {
            filteredList.forEach(function (item) {
                if(
                    (item.name !== undefined && item.name.toLowerCase().indexOf(searchText) !== -1) ||
                    (item.description !== undefined && item.description.toLowerCase().indexOf(searchText) !== -1)
                ) {
                    subList.push(item);
                }
            });
        } else {
            subList = filteredList;
        }

        this.setState({
            currentPage: 0,
            renderedDataList: subList,
            searchText: searchText,
            filters: filters === null ? this.state.filters : filters
        });

        this.props.onUpdate(subList.length);
    }

    reset() {
        this._initialState.filters = {};
        this.setState(this._initialState);
        this.props.onUpdate(this._dataList.length);
    }

    _handlePageClick(e) {
        this.setState({
            currentPage: e.selected
        });
    }

    render() {
        const {currentPage, renderedDataList} = this.state;

        let listContent,
            pagination;

        listContent =
            <DataList
                dataList = {renderedDataList.slice(currentPage * this._itemsPerPage, (currentPage + 1) * this._itemsPerPage)}
                itemLinkText = {this._itemLinkText}
                resultNotFoundText = {this._resultNotFoundText}
            />;

        pagination =
            <Pagination
                totalPage = {Math.ceil(renderedDataList.length / this._itemsPerPage)}
                currentPage = {currentPage}
                viewablePages = {this._paginationConfig.viewablePages}
                pagesMargin = {this._paginationConfig.pagesMargin}
                handlePageClick = {this._handlePageClick.bind(this)}
            />;

        return(
            <div>
                {listContent}
                {pagination}
            </div>
        );
    }
}
