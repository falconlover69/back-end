import { Controller, HttpCode, Post, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { MediaService } from './media.service';
import { Express } from 'express'
import { SharpPipe } from './sharp.pipe';


@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  // @HttpCode(200)
  // @Post()
  // @Auth()
  // @UseInterceptors(FileInterceptor('media'))
  // async uploadFile(
  //   @UploadedFile(SharpPipe) mediaFile: Express.Multer.File,
  //   @Query('folder') folder?: string
  // ) {
  //   return this.mediaService.saveMedia(mediaFile, folder)
  // }

  @HttpCode(200)
  @Post()
  @Auth()
  @UseInterceptors(FileInterceptor('media'))
  async uploadFile(
    @UploadedFile() mediaFile: Express.Multer.File,
    @Query('folder') folder?: string
  ) {
    return this.mediaService.saveMedia(mediaFile, folder)
  }
}
