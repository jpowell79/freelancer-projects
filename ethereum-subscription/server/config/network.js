const os = require("os");

module.exports.getProxy = () => {
    const ethernet = os.networkInterfaces().Ethernet;

    if(!ethernet) return null;

    const proxy = ethernet
        .filter(ip => ip.family === "IPv4")
        .map(ip => ip.address)[0];

    return (proxy) ? proxy : null;
};