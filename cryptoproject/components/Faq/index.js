import React, {Component} from 'react';
import {Accordion, Icon} from 'semantic-ui-react';

const FAQ = [
    {
        question: 'Delectus modi ratione omnis odit harum et sit?',
        answer: (
            <p>Commodi quibusdam voluptas quidem aut corrupti aspernatur debitis ut ratione.</p>
        )
    },
    {
        question: 'Quae eius voluptatibus repellendus totam?',
        answer: (
            'Vero minima quis itaque praesentium sed assumenda. Voluptatem sed enim. ' +
            'Eos et omnis quaerat aliquid eum commodi dicta ipsum quam. Reprehenderit ' +
            'esse enim ea et quia quidem est autem. Vero dignissimos quo nostrum qui ' +
            'laboriosam quisquam dolores sit.'
        )
    },
    {
        question: 'Repellat a dolores unde repudiandae odio vel autem qui laboriosam?',
        answer: (
            <div>
                <span>Optio aspernatur velit consectetur commodi aut et et.</span>
                <ul>
                    <li>1. Aspernatur</li>
                    <li>2. Dignissimos</li>
                    <li>3. Optio</li>
                </ul>
            </div>
        )
    },
    {
        question: 'Sunt laborum quasi esse corporis est?',
        answer: (
            'Eveniet mollitia omnis sapiente minima. Corrupti dignissimos provident ' +
            'molestiae accusantium ut expedita quod cupiditate maxime.'
        )
    },
];

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