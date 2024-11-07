import busboy from 'busboy';
import { LambdaFunctionURLEvent, Callback, Context } from 'aws-lambda'
export async function handler(event: LambdaFunctionURLEvent, _context: Context, callback: Callback) {
    // check if its a post request
    if(event.requestContext.http.method !== 'POST'){
        callback(Error('Not a POST request'), {
            statusCode: 400,
            body: 'Not a POST request'

        })
    }
    const bus = busboy({ headers: event.headers }); 
    //bus.on('file', (fieldname, file, filename, encoding, mimetype) => { });

    callback(null, {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    });
}
