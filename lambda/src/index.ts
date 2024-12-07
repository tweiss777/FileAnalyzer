import busboy from 'busboy';
import { createReadStream } from 'fs';
import { LambdaFunctionURLEvent, Context } from 'aws-lambda';

export async function handler(event: LambdaFunctionURLEvent, _context: Context) {
    // Decode Base64 body if it's Base64-encoded
    const isBase64Encoded = event.isBase64Encoded;
    const body = isBase64Encoded ? Buffer.from(event.body || '', 'base64') : event.body;

    const contentType = event.headers["content-type"] || event.headers["Content-Type"];
    if (event.requestContext.http.method !== 'POST') {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Only POST requests are allowed' }),
        };
    }

    if (!contentType || !contentType.startsWith("multipart/form-data")) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid Content-Type. Must be multipart/form-data." }),
        };
    }

    const bus = busboy({ headers: event.headers });
    const fileData: any[] = []; // Store file data here for processing
    const fields: Record<string, string> = {};

    return new Promise((resolve, reject) => {
        // Handle file upload
        bus.on('file', (fieldname: string, file: any, filename: string, encoding:any, mimetype: any) => {
            console.log(`Uploading file: ${filename}`);
            console.log(`Fieldname: ${fieldname}`);
            console.log(`Encoding: ${encoding}`);
            console.log(`Mimetype: ${mimetype}`);

            const chunks: Buffer[] = [];
            file.on('data', (chunk: any) => {
                chunks.push(chunk);
            });

            file.on('end', () => {
                console.log(`Completed file upload for ${filename}`);
                fileData.push({
                    fieldname,
                    filename,
                    encoding,
                    mimetype,
                    content: Buffer.concat(chunks),
                });
            });
        });

        // Handle form fields
        bus.on('field', (fieldname, value) => {
            console.log(`Received field: ${fieldname} = ${value}`);
            fields[fieldname] = value;
        });

        // Handle parsing completion
        bus.on('close', () => {
            console.log('Parsing complete');
            resolve({
                statusCode: 200,
                body: JSON.stringify({
                    message: 'File upload successful',
                    files: fileData,
                    fields,
                }),
            });
        });

        // Handle errors during parsing
        bus.on('error', (err) => {
            console.error('Error during file upload parsing:', err);
            reject({
                statusCode: 500,
                body: JSON.stringify({ error: 'Error processing file upload' }),
            });
        });

        // Pass body to busboy for parsing
        if (body) {
            bus.end(body);
        } else {
            reject({
                statusCode: 400,
                body: JSON.stringify({ error: 'No body found in request' }),
            });
        }
    });
}
