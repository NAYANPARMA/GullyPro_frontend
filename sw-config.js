module.exports = {
    	 runtimeCaching: [
            {
                urlPattern: /images/,
                handler: 'cacheFirst'
            },
            {
                urlPattern: '/static/',
                handler: 'cacheFirst'
            },
            {
                urlPattern: /.*/,
                handler: 'networkFirst'
            }
        ]
};
