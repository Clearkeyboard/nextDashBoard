'use server';

import {Lawyer} from './definitions';
import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import { json } from 'stream/consumers';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const lawyers = [
    {
        name: 'Joe',
        bar_number: 'Bar #12345',
        personal_email: 'joe.scott@joescott.com'
    }
]

async function uploadLawyers(stringJSON:string) {
    const jsonLawyerData = JSON.parse(stringJSON);
    const insertedLawyers = await Promise.all(
            jsonLawyerData.map((lawyer: { FirstName: string | number | boolean | Date | Uint8Array<ArrayBufferLike> | postgres.Helper<any, any[]> | postgres.Parameter<any> | postgres.ArrayParameter<readonly any[]> | readonly postgres.SerializableParameter<never>[] | postgres.Fragment | postgres.Fragment[] | null; Email: string | number | boolean | Date | Uint8Array<ArrayBufferLike> | postgres.Helper<any, any[]> | postgres.Parameter<any> | postgres.ArrayParameter<readonly any[]> | readonly postgres.SerializableParameter<never>[] | postgres.Fragment | postgres.Fragment[] | null; Bar: string | number | boolean | Date | Uint8Array<ArrayBufferLike> | postgres.Helper<any, any[]> | postgres.Parameter<any> | postgres.ArrayParameter<readonly any[]> | readonly postgres.SerializableParameter<never>[] | postgres.Fragment | postgres.Fragment[] | null; }) => 
                sql`
                INSERT INTO lawyersBeta (name, personal_email, bar_number)
                VALUES (${lawyer.FirstName},${lawyer.Email},${lawyer.Bar}) 
                ON CONFLICT (bar_number) DO NOTHING;
                `
            ),      
    );
 
 return 'insertedLawyers complete';
}
export { uploadLawyers};