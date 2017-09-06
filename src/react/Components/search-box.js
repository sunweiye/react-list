import React from 'react';

module.exports = class SearchBox extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
           keyword: ""
        };
    }

    _handlerSearchInput(searchElement) {
        let searchWord = searchElement.target.value;
        this.setState({
            keyword: searchWord
        });
        this.props.onSearch(searchWord);
    }

    reset() {
        this.setState({
            keyword: ""
        });
    }

    render() {
        const {label, placeholder, className, additionalParameters, ...pros} = this.props;
        let searchClassName = "react-list__search " + (className ? className : ""),
            labelElement;

        if (label) {
            labelElement = <label className="col-3 col-sm-2 col-md-3">{label}</label>;
        }

        return (
            <div className="filter-list__search-container col-12 col-md-6 col-lg-3">
                <div className={searchClassName}>
                    {labelElement}
                    <input type="text"
                           className = "search-field"
                           placeholder = {placeholder}
                           value = {this.state.keyword}
                           onChange = {this._handlerSearchInput.bind(this)}
                    />
                </div>
            </div>
        );
    }
};
