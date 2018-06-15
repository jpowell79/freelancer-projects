import React, {Component} from 'react';
import Alert from '../../../components/Alert/Alert';
import AlertContent from '../../../components/Alert/AlertContent';
import $ from 'jquery';

class MockComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            clicked: false
        }
    }

    render(){
        return (
            <button
                id="mock-component-button"
                onClick={() => {this.setState({clicked: true})}}>{
                    (this.state.clicked) ? "Clicked" : "Not clicked"
                }</button>
        );
    }
}

describe('Rendering tests', () => {
    let alert;
    let {TITLE, CONTENT_CONTAINER} = AlertContent.CLASS_NAMES;

    it('should render without throwing error', () => {
        alert = new Alert({});
        alert.show();
    });

    it('should render alert of given type', () => {
        alert = new Alert({type: 'foo'});
        alert.show();

        expect($(`.${alert.selectors.alertType}`).length).toBe(1);
    });

    it('should render multiple alerts at the same time', () => {
        alert = new Alert({type: 'foo'});
        let alert2 = new Alert({type: 'foo'});

        alert.show();
        alert2.show();

        expect($(`#${alert.selectors.id}`).length).toBe(1);
        expect($(`#${alert2.selectors.id}`).length).toBe(1);

        alert2.remove();
    });

    it('should render given title', () => {
        alert = new Alert({title: 'Foo'});
        alert.show();

        expect($(`.${TITLE}`).text()).toBe('Foo');
    });

    it('should render given message', () => {
        alert = new Alert({message: 'Foo'});
        alert.show();

        expect($(`.${CONTENT_CONTAINER} p`).text()).toBe('Foo');
    });

    it('should render given html', () => {
        alert = new Alert({htmlMessage: <p id="test-paragraph">Hello</p>});
        alert.show();

        expect($("#test-paragraph").length).toBe(1);
    });

    it('Should render stateful react component', () => {
        alert = new Alert({
            htmlMessage: (<MockComponent/>)
        });
        alert.show();

        expect($("#mock-component-button").length).toBe(1);
    });

    it('should prefer to render htmlMessage over message', () => {
        alert = new Alert({
            message: 'Should not render this message',
            htmlMessage: <p>Foo</p>
        });
        alert.show();

        expect($(`.${CONTENT_CONTAINER} p`).text()).toBe('Foo');
    });

    it('should render given title icon', () => {
        alert = new Alert({titleIcon: <i id="foo-icon"/>});
        alert.show();

        expect($("#foo-icon").length).toBe(1);
    });

    it('should render given close icon', () => {
        alert = new Alert({closeIcon: <i id="foo-icon"/>});
        alert.show();

        expect($("#foo-icon").length).toBe(1);
    });

    it('should render confirm button', () => {
        alert = new Alert({type: 'foo'});
        alert.show();

        expect($(`#${alert.selectors.confirmButton}`).length).toBe(1);
    });

    it('should render given confirm text', () => {
        alert = new Alert({
            type: 'foo',
            confirmText: 'bar'
        });
        alert.show();

        expect($(`#${alert.selectors.confirmButton}`).text()).toBe('bar');
    });

    it('should not render cancel button initially', () => {
        alert = new Alert({type: 'foo'});
        alert.show();

        let {cancelButton} = alert.selectors;

        expect($(`#${cancelButton}`).length).toBe(0);
    });

    it('should render cancel button with given onCancel callback', () => {
        alert = new Alert({
            type: 'foo',
            callbacks: {
                onCancel: () => {}
            }
        });
        alert.show();

        let {cancelButton} = alert.selectors;

        expect($(`#${cancelButton}`).length).toBe(1);
    });

    it('should render given cancel text', () => {
        alert = new Alert({
            type: 'foo',
            cancelText: 'cancel-test',
            callbacks: {
                onCancel: () => {}
            }
        });
        alert.show();

        let {cancelButton} = alert.selectors;

        expect($(`#${cancelButton}`).text()).toBe('cancel-test');
    });


    it('should render given className', () => {
        alert = new Alert({
            className: 'foobar'
        });
        alert.show();

        expect($(`.foobar`).length).toBe(1);
    });

    afterEach(() => {
        alert.remove();
    });
});

describe('Interaction tests', () => {
    it('Should call given confirm callback', () => {
        const mockCallback = jest.fn();
        let alert = new Alert({
            type: 'foo',
            callbacks: {
                onConfirm: mockCallback
            }
        });
        alert.show();

        let {confirmButton} = alert.selectors;

        $(`#${confirmButton}`).trigger('click');
        expect(mockCallback.mock.calls.length).toBe(1);
        alert.remove();
    });

    it('Should call given close callback', () => {
        const mockCallback = jest.fn();
        let alert = new Alert({
            type: 'foo',
            callbacks: {
                onClose: mockCallback
            }
        });
        alert.show();

        let {closeButton} = alert.selectors;

        $(`#${closeButton}`).trigger('click');
        expect(mockCallback.mock.calls.length).toBe(1);
        alert.remove();
    });

    it('Should call given cancel callback', () => {
        const mockCallback = jest.fn();
        let alert = new Alert({
            type: 'foo',
            callbacks: {
                onCancel: mockCallback
            }
        });
        alert.show();

        let {cancelButton} = alert.selectors;

        $(`#${cancelButton}`).trigger('click');
        expect(mockCallback.mock.calls.length).toBe(1);
        alert.remove();
    });

    it('Should be possible to remove and show same alert again', () => {
        let alert = new Alert({type: 'foo'});
        alert.show();
        alert.remove();
        alert.show();

        expect($(`#${alert.selectors.id}`).length).toBe(1);
        alert.remove();
    });

    it('Should allow manipulating state of nested react component', () => {
        let alert = new Alert({
            htmlMessage: (<MockComponent/>)
        });
        alert.show();

        let $mockButton = $("#mock-component-button");
        expect($mockButton.text()).toBe("Not clicked");
        $mockButton.trigger('click');
        expect($mockButton.text()).toBe("Clicked");
        alert.remove();
    });
});