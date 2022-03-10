/**
 * @file displayAPI.ts
 * @description Handlse when a user visits a crepe content link
 */
import { Request, Response } from 'express';
import fs from 'fs';
import Logger from './Logger';
import { getUploadByUID } from './util';
const c = new Logger("API");

export default async function displayAPI(req: Request, res: Response) {
    const content = req.params.content.split('.')[0];
    if (!content) {
        res.status(400).send('No content specified');
        return;
    }
    const upload = await getUploadByUID(content);
    if (!upload) {
        res.status(404).send('Content not found');
        return;
    }
    const filePath = `/var/www/crepemoe/src/uploads/${upload.uid}.${upload.ext}`;
    if (!fs.existsSync(filePath)) {
        res.status(404).send('Content not found');
        return;
    }
    // c.log(`${upload.uid} requested by ${req.ip.split(':')[3]}`);
    res.sendFile(filePath);
}