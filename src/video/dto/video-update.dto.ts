import { IsEmail, IsString, MinLength } from "class-validator";

export class VideoUpdateDto {
    @IsEmail()
    email: string

    isPublic?: boolean

    @IsString()
    description: string

    @IsString()
    videoPath: string

    @IsString()
    thumbnailPath: string

}