exports.values = {
    host: (process.env.VCAP_APP_HOST || 'localhost'),
    port: Number(process.env.VCAP_APP_PORT || 3000),
    public: false
};
