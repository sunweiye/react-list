import React from 'react';

module.exports = class SearchBox extends React.PureComponent {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        const {label, placeholder, className, additionalParameters, ...pros} = this.props;
        let searchClassName = "react-list__search " + (className ? "" : className) ;
        return (
            <div className = {searchClassName}>
                <label>{label}</label>
                <input type="text" placeholder={placeholder}/>
            </div>
        );
    }
};
