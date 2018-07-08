import React from 'react';
import $ from "jquery";

class PageLoader {
    static isActive = false;

    static show(){
        if(PageLoader.isActive){
            throw Error("Trying to render multiple PageLoaders.");
        }

        PageLoader.isActive = true;

        let $body = $('body');
        $body.addClass("page-loader-active");
        $body.append(
            `<div id="page-loader">
                 <div>
                     <div class="loader" style="margin: 0 auto"></div>
                     <h2 class="h1">Please wait...</h2>
                 </div>
             </div>`
        );
    }

    static remove(){
        $("#page-loader").remove();
        $("body").removeClass("page-loader-active");

        PageLoader.isActive = false;
    }
}

export default PageLoader;