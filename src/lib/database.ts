import mongoose from "mongoose"


export const connect=async ()=>{
  try {
    console.log(process.env.connectionString)
    await mongoose.connect(process.env.connectionString!);
    console.log("connected")
  } catch (error) {
    console.log("error")
  }
    
}






// Path to your PDF file
//const pdfFilePath = 'path/to/your/pdf/file.pdf';

// Read the PDF file
//const pdfData = fs.readFileSync(pdfFilePath);
