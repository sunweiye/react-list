import React from 'react';

module.exports = class DataList extends React.PureComponent {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="filter-list__data-list">
                <ul>
                    Here are list.
                </ul>
            </div>
        );
    }
};
