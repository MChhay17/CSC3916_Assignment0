const axios = require('axios');

module.exports = async (phrase) => {
    try {
        let apiUrl;
        let params = { format: 'json' };

        // Check if the phrase is an ID (assuming IDs don't contain spaces)
        if (!phrase.includes(" ")) {
            apiUrl = `https://www.googleapis.com/books/v1/volumes/${phrase}`;
        } else {
            apiUrl = 'https://www.googleapis.com/books/v1/volumes';
            params.q = phrase;
        }

        const results = await axios.get(apiUrl, { params });

        // If fetching a single book by ID, return its details directly
        if (apiUrl.includes("/volumes/")) {
            return {
                id: results.data.id,
                title: results.data.volumeInfo.title || "Unknown Title",
                authors: results.data.volumeInfo.authors || ["Unknown Author"],
                publishedDate: results.data.volumeInfo.publishedDate || "Unknown Date",
                description: results.data.volumeInfo.description || "No description available",
                pageCount: results.data.volumeInfo.pageCount || 0,
                language: results.data.volumeInfo.language || "Unknown",
                thumbnail: results.data.volumeInfo.imageLinks?.thumbnail || "No Image"
            };
        }

        // Otherwise, format search results into an array
        const books = results.data.items.map(item => ({
            id: item.id,
            title: item.volumeInfo.title || "Unknown Title",
            authors: item.volumeInfo.authors || ["Unknown Author"],
            publishedDate: item.volumeInfo.publishedDate || "Unknown Date",
            description: item.volumeInfo.description || "No description available",
            pageCount: item.volumeInfo.pageCount || 0,
            language: item.volumeInfo.language || "Unknown",
            thumbnail: item.volumeInfo.imageLinks?.thumbnail || "No Image"
        }));

        return {
            books,
            totalItems: results.data.totalItems,
            status: results.status,
            statusText: results.statusText
        };

    } catch (error) {
        console.error('Error fetching data:', error);
        return { error: error.message };
    }
};


