import React from 'react';

module.exports = class DataRow extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {identifier, name, description, image, url, options, linkText, additionalParameters, ...pros} = this.props;

        let itemLink =
            <a className="flex-list-item__more-info" title={name} href={url}>
            {linkText}
            </a>,
            imageLink =
                <a className="flex-list-item__image-link" title={name} href={url}>
                    <img className="img-fluid" src={image} sizes="(min-width: 230px) 230px, 100vw" width="230" height="148" alt=""/>
                </a>;

        let optionsContent = [];
        for(let optionName in options) {
            let option = options[optionName];
            for(let key in option) {
                optionsContent.push(
                    <span key={identifier + '-' + optionName + '-' + key} className={"flex-list-item__option " + optionName}>{option[key]}</span>
                )
            }
        }

        return (
            <li className="flex-list__data-row row flex-list-item">
                <div className="col-12 col-md-9 flex-list-item__text" >
                    <div className="flex-list-item__options-list">
                        {optionsContent}
                    </div>
                    <h3 className="flex-list-item__title">
                        <a title={name} href={url}>{name}</a>
                    </h3>
                    <div className="flex-list-item__teaser">
                        <p>{description}</p>
                    </div>
                    {itemLink}
                </div>
                <div className="col-12 col-md-3 filter-list-item__image">
                    {imageLink}
                </div>
            </li>
        );
    }
};
