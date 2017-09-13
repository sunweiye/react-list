import React from 'react';
import ReactDOM from 'react-dom';
import FlexList from './flex-list.js';

const renderReactFlexList = () => {
    document.querySelectorAll('[role="react-list"]').forEach(function(element){
        let listContents = JSON.parse(element.querySelectorAll('[aria-label="react-list-data"]')[0].text),
            listParameters = JSON.parse(element.querySelectorAll('[aria-label="react-list-configs"]')[0].text),
            searchBoxConfig = listParameters.search,
            filtersList = listParameters.filters,
            itemsPerPage = parseInt(listParameters.itemsPerPage),
            listTexts = listParameters.texts,
            flexListContainer = element.getElementsByClassName("react-list-container")[0];

        ReactDOM.render(
            <FlexList
                dataList = {listContents}
                filtersList = {filtersList}
                searchConfig = {searchBoxConfig}
                itemsPerPage = {itemsPerPage}
                texts = {listTexts}
            />,
            flexListContainer
        );
    });
};

export {renderReactFlexList}
