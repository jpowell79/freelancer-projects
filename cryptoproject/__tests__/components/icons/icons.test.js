/*
 * Automagically pulls in all icons and makes sure they can both
 * render and handle props correctly.
 */

import React from 'react';
import {render} from 'enzyme';
import * as icons from '../../../components/icons';

function getIconsArray({id = "", className = ""}) {
    return Object.keys(icons).map((key, i) => {
        return <div key={i}>{icons[key]({id, className})}</div>;
    });
}

describe('Icons tests', () => {
    let wrapper;

    it('Should render all icons without throwing error', () => {
        wrapper = render(
            <div>
                {getIconsArray({})}
            </div>
        );
    });

    it('Should add classnames to each icon', () => {
        const iconsArray = getIconsArray({className: "foo-icons"});
        wrapper = render(
            <div>
                {iconsArray}
            </div>
        );

        expect(wrapper.find('.foo-icons').length).toBe(iconsArray.length);
    });

    it('Should add id to each icon', () => {
        const iconsArray = getIconsArray({id: "foo-icons"});
        wrapper = render(
            <div>
                {iconsArray}
            </div>
        );

        expect(wrapper.find('#foo-icons').length).toBe(iconsArray.length);
    });
});