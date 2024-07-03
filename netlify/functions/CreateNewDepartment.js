exports.handler = async function(event, context) {
    if (event.httpMethod === 'POST') {
        const data = JSON.parse(event.body);
        // Handle POST request
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'POST request handled', data }),
        };
    }

    return {
        statusCode: 405,
        body: 'Method Not Allowed',
    };
};