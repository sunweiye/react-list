import React from 'react';
import ReactDOM from 'react-dom';
import FlexList from './flex-list.js';
import $ from 'jquery';

const renderReactList = () => {
    let filtersList = [1,2,3],
        dataList = [{
            "name": "item 1",
            "description": "desc 1"
        },{
            "name": "item 2",
            "description": "desc 2"
        }],
        searchBox = {
            "label": "search",
            "placeholder": "search the list",
            "className": "test"
        };

    ReactDOM.render(
        <FlexList
        filters = {filtersList}
        dataList = {dataList}
        searchBox = {searchBox}
        />,
        $('#list').get(0)
    );
};

renderReactList();
