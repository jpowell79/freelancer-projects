import React, {Component} from 'react';
import {Accordion, Icon} from 'semantic-ui-react';
import {FAQ} from '../../../site-settings';

class Faq extends Component {
    constructor(props){
        super(props);

        this.state = {
            activeIndex: 0
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
                        <div>
                            <Accordion.Title
                                key={i}
                                active={activeIndex === i}
                                index={i}
                                onClick={this.handleClick}>
                                <Icon name='dropdown'/>
                                {faq.question}
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === i}>
                                <p>{faq.answer}</p>
                            </Accordion.Content>
                        </div>
                    );
                })}
            </Accordion>
        );
    }
}

export default Faq;