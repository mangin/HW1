/*jslint node: true, vars: true, white: true, nomen: true*/
exports.values = {
    host : (process.env.VCAP_APP_HOST || 'localhost'),
    port: Number(process.env.VCAP_APP_PORT || 3000)
};
