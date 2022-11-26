import { Injectable } from '@nestjs/common';
import { path as rootPath } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra'
import { IMediaResponse } from './media.interface';
import { Express } from 'express'
import * as sharp from 'sharp';
import * as path from "path";

@Injectable()
export class MediaService {

    // async saveMedia(
    //     mediaFile: Express.Multer.File, 
    //     folder = 'default'
    // ): Promise<IMediaResponse> 
    // {
    //     const uploadFolder = `${path}/uploads/${folder}`
    //     await ensureDir(uploadFolder)

    //     await writeFile(
    //         `${uploadFolder}/${mediaFile.originalname}`,
    //         mediaFile.buffer
    //     )

    //     return {
    //         url: `/uploads/${folder}/${mediaFile.originalname}`,
    //         name: mediaFile.originalname
    //     }
    // }

    async saveMedia(
        mediaFile: Express.Multer.File, 
        folder = 'default'
    ): Promise<IMediaResponse> 
    {
        const uploadFolder = `${rootPath}/uploads/${folder}`
        await ensureDir(uploadFolder)

        const originalName = Date.now() + '-' + path.parse(mediaFile.originalname).name + '.webp'

        await sharp(mediaFile.buffer)
          .resize(800)
          .webp({ effort: 3 })
          .toFile(path.join(`uploads/${folder}`, originalName ));

        return {
            url: `/uploads/${folder}/${originalName}`,
            name: originalName
        }
    }
}
