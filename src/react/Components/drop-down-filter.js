import React from 'react';

module.exports = class DropDownFilter extends React.PureComponent {
    constructor(props) {
        super(props);

        this._initialState = {
            currentOptionText: this.props.filterLabel,
            currentOptionValue: null,
            isSelected: false
        };

        this.state = this._initialState;
    }

    _handlerClick(option) {
        let element = option.target,
            isOption = element.hasAttribute('data-value'),
            selectedValue = element.getAttribute('data-value');

        this.setState({
            currentOptionText: element.textContent,
            currentOptionValue: isOption ? selectedValue : null,
            isSelected: isOption
        });

        this.props.onChange(isOption ? selectedValue : null, this.props.filterName);
    }

    reset() {
        this.setState(this._initialState);
    }

    render() {
        const {filterName, filterLabel, optionsList, additionalParameters, ...pros} = this.props;
        const {currentOptionText, currentOptionValue, isSelected} = this.state;


        let options = [<li key={filterName + '-'} className="dropdown-item placeholder" onClick={this._handlerClick.bind(this)}>{filterLabel}</li>];

        for (let key in optionsList) {
            options.push(
                <li key={filterName + '-' + key} data-value={key} className="dropdown-item" onClick={this._handlerClick.bind(this)}>{optionsList[key]}</li>
            );
        }

        return (
            <div className="filter-list__filter col-12 col-md-6 col-lg-3">
                <div className="dropdown col-12">
                    <button className="col-12 filter-list__filter-button btn dropdown-toggle"
                            type="button" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false"><span>{currentOptionText}</span></button>
                    <ul className={"dropdown-menu" + (isSelected ? " selected" : "")} aria-labelledby="filter-list__filter-button">
                        {options}
                    </ul>
                </div>
            </div>
        );
    }
};
