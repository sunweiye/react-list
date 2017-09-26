import React from 'react';
import FilterContainer from './Components/filter-container.js';
import ListContainer from './Components/list-container.js';
import ResultInformation from './Components/result-information.js';

module.exports = class FlexList extends React.Component {
    constructor(props) {
        super(props);
        this._itemsPerPage = this.props.itemsPerPage > 0 ? this.props.itemsPerPage : 10;
        this._searchBoxConfig = this.props.searchConfig;
        this._dropDownFiltersConfig = this.props.filtersList;
        this._dataList = this.props.dataList;
        this._itemLinkText = this.props.texts.itemLinkText;
        this._resultsText = this.props.texts.resultsText;
        this._resetText = this.props.texts.resetText;
        this._resultNotFoundText = this.props.texts.resultNotFoundText;
        this._paginationConfig = Object.assign(
            {
                "viewablePages": 5,
                "pagesMargin": 2
            },
            this.props.paginationConfig
        );
    }

    _getSubListByFilters() {
        return this._dataList;
    }

    _getSubListByText(searchText) {
        let subList = [],
            filteredList = this._getSubListByFilters();

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
            renderedDataList: subList
        });
    }

    _handlerFilterInput(selectedValue, filter) {
        this._listContainer.filter(selectedValue, filter);
    }

    _handlerSearchInput(keyword) {
        this._listContainer.search(keyword);
    }

    _handlerListInformationUpdate(listSize) {
        this._resultInformation.updateResultCount(listSize);
    }

    _handlerResetFilters() {
        this._listContainer.reset();
        this._filterContainer.reset();
    }

    render() {
        let filterContainer,
            resultInformation,
            listContainer;

        resultInformation =
            <ResultInformation
                resultsText = {this._resultsText}
                resetText = {this._resetText}
                listSize = {this._dataList.length}
                resetFilters = {this._handlerResetFilters.bind(this)}
                ref = {(resultInformation) => {this._resultInformation = resultInformation;}}
            />;

        listContainer =
            <ListContainer
                itemsPerPage = {this._itemsPerPage}
                dataList = {this._dataList}
                paginationConfig = {this._paginationConfig}
                itemLinkText = {this._itemLinkText}
                resultNotFoundText = {this._resultNotFoundText}
                onUpdate = {this._handlerListInformationUpdate.bind(this)}
                ref = {(listContainer) => {this._listContainer = listContainer;}}
            />;

        filterContainer =
            <FilterContainer
                searchBoxConfig = {this._searchBoxConfig}
                dropDownFiltersConfig = {this._dropDownFiltersConfig}
                onSearch = {this._handlerSearchInput.bind(this)}
                onFilter = {this._handlerFilterInput.bind(this)}
                resultInformation = {resultInformation}
                ref = {(filterContainer) => {this._filterContainer = filterContainer;}}
            />;

        return(
            <div className="filter-list">
                {filterContainer}
                {listContainer}
            </div>
        );
    }
};
