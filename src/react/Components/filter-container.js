import React from 'react';
import DropDownFilter from './drop-down-filter.js';
import SearchBox from './search-box.js';

module.exports = class FilterContainer extends React.Component {
    constructor(props) {
        super(props);
        this._searchBoxConfig = this.props.searchBoxConfig;
        this._dropDownFiltersConfig = this.props.dropDownFiltersConfig;
        this._dropDownFilters = {};
    }

    reset() {
        this._searchBox.reset();
        for(let filter in this._dropDownFilters) {
            this._dropDownFilters[filter].reset();
        }
    }

    render() {
        let searchBox,
            filterList = [];

        searchBox =
            <SearchBox
                label = {this._searchBoxConfig.label}
                placeholder = {this._searchBoxConfig.placeholder}
                className = {this._searchBoxConfig.className}
                onSearch = {this.props.onSearch}
                ref = {(searchBox) => {this._searchBox = searchBox;}}
            />;

        for(let key in this._dropDownFiltersConfig) {
            let filter =
                <DropDownFilter
                    key={'filter-' + key}
                    filterName = {key}
                    filterLabel = {this._dropDownFiltersConfig[key]['label']}
                    optionsList = {this._dropDownFiltersConfig[key]['options']}
                    onChange = {this.props.onFilter}
                    ref = {(dropDownFilter) => {this._dropDownFilters[key] = dropDownFilter; }}
                />;

            filterList.push(filter);
        }

        return(
            <div className="flex-list__filter-list">
            <div className="flex-list__filter-container container">
                <div className="flex-list__filter-row row">
                    {searchBox}
                    {filterList}
                    {this.props.resultInformation}
                </div>
            </div>
            </div>
        );
    }
};
