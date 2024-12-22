import { APIGatewayProxyEvent } from 'aws-lambda';
import { parseMultipartForm } from './functions';

export async function handler(event: APIGatewayProxyEvent) {
    const fileData = await parseMultipartForm(event);
    console.log(fileData);
    
}
