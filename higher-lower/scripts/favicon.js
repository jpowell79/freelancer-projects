const fs = require("fs");
const path = require("path");

const getRel = (file) => {
    if(file.startsWith("apple-icon")){
        return `rel="apple-touch-icon" `;
    } else if(file.includes("icon")){
        return `rel="icon" `;
    } else if(file.startsWith("manifest")){
        return `rel="manifest" `;
    }

    return "";
};

const getSizes = (file) => {
    const sizeMatch = file.match(/\d+x\d+/);
    return (sizeMatch) ? `sizes="${sizeMatch[0]}" ` : "";
};

const getHref = (file) => {
    return `href="/static/images/favicon/${file}"`;
};

const excludeFiles = (file) => (
    !file.includes(".ico") && !file.includes(".xml") && !file.includes(".json")
    && file.match(/\d+x\d+/)
);

const generateContent = (faviconFiles) => {
    const filesToInclude = faviconFiles.filter(excludeFiles);

    return (
        `import React, {Fragment} from "react";

export const Favicon = () => (
    <Fragment>
        ${filesToInclude.map((file, i) => {
            const newLine = (i === filesToInclude.length - 1) ? "" :  "\n        ";
            getSizes(file);
            return `<link ${getRel(file)}${getSizes(file)}${getHref(file)}/>${newLine}`;
        }).toString().replace(/,/g, "")}
    </Fragment>
);`);
};

module.exports = async () => {
    const faviconFiles = fs.readdirSync(path.join(PROJECT_ROOT, `/static/images/favicon/`));
    const outputLocation = `${PROJECT_ROOT}/site-components/Favicon.js`;

    return new Promise(resolve => {
        fs.writeFile(outputLocation, generateContent(faviconFiles), (err) => {
            if(err) throw err;

            console.log("Favicon component was updated successfully!");
            resolve();
        });
    });
};