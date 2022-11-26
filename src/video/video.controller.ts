import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { VideoUpdateDto } from './dto/video-update.dto';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}
  
  @Get('get-private/:id')
  @Auth()
  async getVideoPrivate(@Param('id') id: string) {
    return this.videoService.byId(+id)
  }

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.videoService.getAll(searchTerm)
  }

  @Get('/most-popular')
  async getMostPopular() {
    return this.videoService.getMostPopularByViews()
  }

  @Get(':id')
  async getVideo(@Param('id') id: string) {
    return this.videoService.byId(+id)
  }

    
  @HttpCode(200)
  @Post()
  @Auth()
  createVideo(@CurrentUser('id') id: number) {
    return this.videoService.create(+id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('/:id')
  @Auth()
  updateVideo(@Param('id') id: string, @Body() dto: VideoUpdateDto) {
    return this.videoService.update(+id, dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete('/:id')
  @Auth()
  deleteVideo(@Param('id') id: string) {
    return this.videoService.delete(+id)
  }

  @HttpCode(200)
  @Put('update-views/:videoId')
  updateViews(@Param('videoId') videoId: string) {
    return this.videoService.updateCountViews(+videoId)
  }

  @HttpCode(200)
  @Put('update-reaction/:videoId')
  updateReaction(@Param('videoId') videoId: string) {
    return this.videoService.updateReaction(+videoId)
  }

}
