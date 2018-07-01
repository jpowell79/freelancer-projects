import React, {Component} from 'react';
import {Accordion} from 'semantic-ui-react';
import {Dropdown} from "../../../modules/icons/index";
import {FAQ} from "../../../content-settings";

class Faq extends Component {
    constructor(props){
        super(props);

        this.state = {
            activeIndex: -1
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e, titleProps){
        const { index } = titleProps;
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({ activeIndex: newIndex })
    }

    render(){
        const { activeIndex } = this.state;

        return (
            <Accordion styled>
                {FAQ.map((faq, i) => {
                    return (
                        <div key={i}>
                            <Accordion.Title
                                active={activeIndex === i}
                                index={i}
                                onClick={this.handleClick}>
                                <Dropdown/>
                                <div className="content">
                                    {faq.question}
                                </div>
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === i}>
                                {faq.answer}
                            </Accordion.Content>
                        </div>
                    );
                })}
            </Accordion>
        );
    }
}

export default Faq;