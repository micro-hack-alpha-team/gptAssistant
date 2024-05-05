import { NextRequest, NextResponse } from 'next/server'; // To handle the request and response
import { promises as fs } from 'fs'; // To save the file temporarily
import { v4 as uuidv4 } from 'uuid'; // To generate a unique filename
import PDFParser from 'pdf2json'; // To parse the pdf
import { connect } from '@/lib/database';

export async function POST(req: NextRequest) {
  await connect()
  const formData: FormData = await req.formData();
  const uploadedFiles = formData.getAll('filepond');
  let fileName = '';
  let parsedText = '';

  if (uploadedFiles && uploadedFiles.length > 0) {
    const uploadedFile = uploadedFiles[1];
    console.log('Uploaded file:', uploadedFile);

    // Check if uploadedFile is of type File
    if (uploadedFile instanceof File) {
      // Generate a unique filename
      fileName = uuidv4();

      // Convert the uploaded file into a temporary file
      const tempFilePath = `${process.cwd()}/fichiersGED/${fileName}.pdf`;

      // Convert ArrayBuffer to Buffer
      const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());

      // Save the buffer as a file
      await fs.writeFile(tempFilePath, fileBuffer);

      // Parse the pdf using pdf2json. See pdf2json docs for more info.
      const pdfParser = new (PDFParser as any)(null, 1);

      // See pdf2json docs for more info on how the below works.
      pdfParser.on('pdfParser_dataError', (errData: any) =>
        console.log(errData.parserError),
      );
      pdfParser.on('pdfParser_dataReady', () => {
        console.log((pdfParser as any).getRawTextContent());
        parsedText = (pdfParser as any).getRawTextContent();
      });

      pdfParser.loadPDF(tempFilePath);
      fetch('http://localhost:3000/api/chatAPI', {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentation: parsedText,
        }),
      })
        .then((res) => res.status == 200).catch(err => console.log(err))

      return NextResponse.json({
        message : true
      })
    } else {
      console.log('Uploaded file is not in the expected format.');
    }
  } else {
    console.log('No files found.');
  }
}
