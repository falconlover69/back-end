import { UserEntity } from "src/user/schema/user.entity";
import { BaseEntity } from "src/utils/base";
import { VideoEntity } from "src/video/schema/video.entity";
import {  Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Comment')
export class CommentEntity extends BaseEntity {

    // @PrimaryGeneratedColumn()
    // id: number

    @Column({default: '', type: 'text'})
    message: string

    @ManyToOne(() => UserEntity, user => user.videos)
    @JoinColumn({name: 'user_id'})
    user: UserEntity

    @ManyToOne(() => VideoEntity, video => video.comments)
    @JoinColumn({name: 'video_id'})
    video: VideoEntity

}
