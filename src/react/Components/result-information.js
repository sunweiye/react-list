import React from 'react';

module.exports = class ResultInformation extends React.PureComponent {
    constructor(props) {
        super(props);
        this._resultsText = this.props.resultsText;
        this._resetText = this.props.resetText;

        this.state = {
            listSize: this.props.listSize
        };
    }

    updateResultCount(listSize) {
        this.setState({
            listSize: listSize
        });
    }

    render() {
        return (
            <div className="filter-information">
                <span className="text">{this._resultsText + this.state.listSize}</span>
                <a className="reset" href="#" onClick={this.props.resetFilters}>{this._resetText}</a>
            </div>
        );
    }
};
