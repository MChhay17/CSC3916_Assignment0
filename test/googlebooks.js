const axios = require('axios');

module.exports = async (phrase) => {
    try {
        const results = await axios.get('https://www.googleapis.com/books/v1/volumes', {
            params: {
                format: 'json',
                q: phrase
            }
        });

        // Returning an object with the important data from the response
        return {
            data: results.data,
            status: results.status,
            statusText: results.statusText,
            headers: results.headers,
            requestHeader: results.config.headers
        };

    } catch (error) {
        // If there was an error (like no internet or bad request), we catch it here
        console.error('Error fetching data:', error);
        return {
            error: error.message
        };
    }
};
