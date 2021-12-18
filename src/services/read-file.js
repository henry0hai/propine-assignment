import dotenv from 'dotenv';
import es from 'event-stream';
import fs from 'fs';
import path from 'path';

dotenv.config();

const fileDir = process.env.FILE_DIR;
const fileName = process.env.FILE_NAME;

const filePath = path.join(fileDir, fileName);

export const getLines = () => {
  return fs.createReadStream(filePath).pipe(es.split());
};
