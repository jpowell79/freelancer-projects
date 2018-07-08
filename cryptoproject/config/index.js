import config from 'react-reveal/globals';
import routerEvents from "next-router-events";
import PageLoader from "../services/PageLoader";
import {isClient} from "../services/utils";
import Settings from '../site-settings';

config({ ssrFadeout: true });

(function(){
    if(isClient()){
        if(window.__ROUTER_EVENTS__ === undefined){
            window.__ROUTER_EVENTS__ = "__ROUTER_EVENTS__";

            routerEvents.on('routeChangeStart', (url) => {
                if(Settings.SLOW_PAGES.includes(url)){
                    PageLoader.show();
                }
            });

            routerEvents.on('routeChangeComplete', (url) => {
                if(Settings.SLOW_PAGES.includes(url)){
                    PageLoader.remove();
                }
            });
        }
    }
}());
