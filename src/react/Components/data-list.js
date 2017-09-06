import React from 'react';
import DataRow from './data-row.js';

module.exports = class DataList extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {dataList, itemLinkText, resultNotFoundText, additionalParameters, ...pros} = this.props;

        let rows = [];
        dataList.forEach(function (element) {
            let rowIdentify = 'row-' + element.identifier;
            rows.push(
                <DataRow
                    key={rowIdentify}
                    identifier = {rowIdentify}
                    name = {element.name}
                    description = {element.description}
                    image = {element.image}
                    url = {element.url}
                    options = {element.options}
                    linkText = {itemLinkText}
                />
            );
        });

        return rows.length ? (
            <div className="flex-list__data-list">
                <ul className="flex-list__data-container container">
                    {rows}
                </ul>
            </div>
        ) : (
            <div className="flex-list__data-list no-result">
                <div>{resultNotFoundText}</div>
            </div>
        );
    }
};
