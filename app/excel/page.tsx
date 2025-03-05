'use client';
import * as XLSX from 'xlsx';
import {useState} from 'react';
import { uploadLawyers } from '../lib/lawyerplaceholder';
export default function Page() {

    const [fileName, setFileName] = useState(null);
    const handleFile = async (e) => {

        const file = e.target.files[0];
        setFileName(file.name);
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        console.log(jsonData);
        const stringJSON = JSON.stringify(jsonData);
        await uploadLawyers(stringJSON);   
    }
    return (
        <div className="bg-zinc-200 h-screen pt-10 flex flex-col">
            <h1 className="text-3xl font-bold text-center pt-10 capitalize">
                Upload Excel File
            </h1>
            {fileName && (
                <p className="text-3xl font-bold text-center pt-10 capitalize">FileName: <span>{fileName}</span></p>
            )}

            <div className="flex justify-center">
                <input type="file" onChange={(e) => handleFile(e)} />
            </div>
        </div>
    );
}