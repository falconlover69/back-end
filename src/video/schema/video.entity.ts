import { CommentEntity } from "src/comment/schema/comment.entity";
import { SubscriptionEntity } from "src/user/schema/subscription.entity";
import { UserEntity } from "src/user/schema/user.entity";
import { BaseEntity } from "src/utils/base";
import {  Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('Video')
export class VideoEntity extends BaseEntity {

    // @PrimaryGeneratedColumn()
    // id: number

    @Column({default: ''})
    name: string

    @Column({default: false, name: 'is_public'})
    isPublic: boolean

    @Column({default: 0})
    views: number

    @Column({default: 0})
    likes: number

    @Column({default: 0})
    duration: number

    @Column({default: '', type: 'text'})
    description: string

    @Column({default: '', name: 'video_path'})
    videoPath: string

    @Column({default: '', name: 'thumbnail_path'})
    thumbnailPath: string

    @ManyToOne(() => UserEntity, user => user.videos)
    @JoinColumn({name: 'user_id'})
    user: UserEntity

    @OneToMany(() => CommentEntity, comment => comment.video)
    comments: CommentEntity[]
}