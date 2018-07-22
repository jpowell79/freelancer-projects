import React, {Component} from 'react';
import {Accordion} from 'semantic-ui-react';
import {Dropdown} from "../../../modules/icons";
import PropTypes from 'prop-types';
import Strings from "../../../../services/Strings";

class ContractItem extends Component {
    state = {active: false};

    static defaultProps = {
        accordionTitle: "Smart Contract Links",
        accordionLinks: [],
        accordionHtml: null,
        title: '',
        titleLink: '',
        subtitleLink: '',
        subtitle: '',
        titleHtml: null,
        showAccordion: true
    };

    static propTypes = {
        title: PropTypes.string,
        titleLink: PropTypes.string,
        subtitleLink: PropTypes.string,
        subtitle: PropTypes.string,
        accordionTitle: PropTypes.string,
        accordionLinks: PropTypes.array,
        accordionHtml: PropTypes.element,
        titleHtml: PropTypes.element,
        showAccordion: PropTypes.bool
    };

    render(){
        const {
            title,
            titleLink,
            subtitle,
            subtitleLink,
            accordionTitle,
            accordionLinks,
            accordionHtml,
            titleHtml,
            showAccordion,
            ...props
        } = this.props;

        return (
            <div className="item">
                <div {...props} className="ui padded segment">
                    {(Strings.isDefined(title) && Strings.isDefined(titleLink) &&
                        Strings.isDefined(subtitle) && Strings.isDefined(subtitleLink)) && (
                        <h2 className="ui header display-5">
                            <a href={titleLink}>{title}</a>
                            <div className="sub header h3 lighter">
                                <a href={subtitleLink} target="_blank">{subtitle}</a>
                            </div>
                        </h2>
                    )}
                    {titleHtml}
                    {(showAccordion) && (
                        <Accordion styled>
                            <Accordion.Title
                                active={this.state.active}
                                onClick={() => {
                                    this.setState((prevState) => ({active: !prevState.active}));
                                }}>
                                <Dropdown/>
                                <div className="content">
                                    {accordionTitle}
                                </div>
                            </Accordion.Title>
                            <Accordion.Content active={this.state.active}>
                                {accordionLinks.map((content, i) => {
                                    return (
                                        <h3 key={i}
                                            style={{marginTop: (i > 0) ? ".75em" : 0}}
                                            className="no-margin-bottom">{content.description} <a
                                            className="lighter" href={content.link} target="_blank">
                                            {content.linkText}
                                        </a></h3>
                                    );
                                })}
                                {accordionHtml}
                            </Accordion.Content>
                        </Accordion>
                    )}
                </div>
            </div>
        );
    }
}

export default ContractItem;