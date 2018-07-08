import React from 'react';
import Paths from "../../../../services/Paths";
import {doublingFourColumnGrid} from "../../../../services/cssUtils";
import {SocialMenu} from "../../../modules/navigation/SocialMenu";
import {
    Github,
    Twitter
} from "../../../modules/icons";

export const Team = () => {
    return (
        <div className={doublingFourColumnGrid('center aligned') + " team"}>
            <div className="column">
                <img src={Paths.getTeamImage({name: 'team_placeholder'})}/>
                <h2 className="name">Viktor Jurasek</h2>
                <h5 className="role">Creative Director</h5>
                <p className="description">{
                    'After working at several major Slovak design studios ' +
                    '(Platform and HEADS), Viktor was offered to become the ' +
                    'creative director at Powerful Digital. Viktor gained...'
                }</p>
                <a className="read-more" href="http://google.com">read more</a>
                <SocialMenu className="justify-content-center" links={[
                    {
                        icon: <Github/>,
                        href: 'https://github.com'
                    },
                    {
                        icon: <Twitter/>,
                        href: 'https://twitter.com'
                    }
                ]}/>
            </div>
            <div className="column">
                <img src={Paths.getTeamImage({name: 'team_placeholder'})}/>
                <h2 className="name">Juraj Karovic</h2>
                <h5 className="role">UI & UX Designer</h5>
                <p className="description">{
                    'After working at several major Slovak design studios ' +
                    '(Platform and HEADS), Viktor was offered to become the ' +
                    'creative director at Powerful Digital. Viktor gained...'
                }</p>
                <a className="read-more" href="http://google.com">read more</a>
                <SocialMenu className="justify-content-center" links={[
                    {
                        icon: <Github/>,
                        href: 'https://github.com'
                    },
                    {
                        icon: <Twitter/>,
                        href: 'https://twitter.com'
                    }
                ]}/>
            </div>
            <div className="column">
                <img src={Paths.getTeamImage({name: 'team_placeholder'})}/>
                <h2 className="name">Jan Slobodnik</h2>
                <h5 className="role">Content Writer</h5>
                <p className="description">{
                    'After working at several major Slovak design studios ' +
                    '(Platform and HEADS), Viktor was offered to become the ' +
                    'creative director at Powerful Digital. Viktor gained...'
                }</p>
                <a className="read-more" href="http://google.com">read more</a>
                <SocialMenu className="justify-content-center" links={[
                    {
                        icon: <Github/>,
                        href: 'https://github.com'
                    },
                    {
                        icon: <Twitter/>,
                        href: 'https://twitter.com'
                    }
                ]}/>
            </div>
            <div className="column">
                <img src={Paths.getTeamImage({name: 'team_placeholder'})}/>
                <h2 className="name">Roy Nir Lieberman</h2>
                <h5 className="role">Community Manager</h5>
                <p className="description">{
                    'After working at several major Slovak design studios ' +
                    '(Platform and HEADS), Viktor was offered to become the ' +
                    'creative director at Powerful Digital. Viktor gained...'
                }</p>
                <a className="read-more" href="http://google.com">read more</a>
                <SocialMenu className="justify-content-center" links={[
                    {
                        icon: <Github/>,
                        href: 'https://github.com'
                    },
                    {
                        icon: <Twitter/>,
                        href: 'https://twitter.com'
                    }
                ]}/>
            </div>
        </div>
    );
};