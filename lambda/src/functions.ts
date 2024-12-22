import { APIGatewayProxyEvent } from "aws-lambda";
import busboy, { Busboy } from "busboy";
export async function parseMultipartForm(
    event: APIGatewayProxyEvent
): Promise<any> {
    return new Promise((resolve, reject) => {
        const bb: Busboy = busboy({ headers: event.headers });
        const result: { file?: Buffer; filename?: string; contentType?: string, fieldname?: string } = {};

        bb.on('file', (_fieldname: string, file: NodeJS.ReadableStream, filename: string, _encoding: string, mimetype: string) => {
            file.on('data', data => {
                result.file = data;
            });

            file.on('end', () => {
                result.filename = filename;
                result.contentType = mimetype;
            });
        });
        bb.on('field', (fieldname: string, _val: string) => {
            result.fieldname = fieldname;
        });
        bb.on('finish', () => {
            event.body = JSON.stringify(result);
            resolve(event);
        })
        bb.on('error', err => reject(err));
        bb.write(event.body, event.isBase64Encoded ? 'base64' : 'binary');
        bb.end();
    });
}
