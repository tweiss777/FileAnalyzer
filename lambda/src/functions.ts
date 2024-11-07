import busboy from 'busboy';
export function busboyHandler(bb: busboy.Busboy) {
    try {
        bb.on('file', (name: string, file, info: busboy.FileInfo) => {
            // output for debgugging purposes
            console.log(`name is ${name}`);
            console.log(`file is ${file}`);
            const { encoding, filename, mimeType } = info;

            console.log(`encoding is ${encoding}`);
            console.log(`filename is ${filename}`);
            console.log(`mimeType is ${mimeType}`);

            // do something with the file
            file.on('data', () => { });
        });
        bb.on('close', () => {
            console.log('done parsing form data');
        });
    } catch (err) {
        throw err;
    }
}
