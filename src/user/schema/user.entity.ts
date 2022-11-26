import { BaseEntity } from "src/utils/base";
import { VideoEntity } from "src/video/schema/video.entity";
import {  Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubscriptionEntity } from "./subscription.entity";

@Entity('User')
export class UserEntity extends BaseEntity {

    // @PrimaryGeneratedColumn()
    // id: number

    @Column({unique: true})
    email: string

    @Column({select: false})
    password: string

    @Column({default: ''})
    name: string

    @Column({default: false, name: 'is_verified'})
    isVerified: boolean

    @Column({default: 0, name: 'subscribers_count'})
    subscribersCount?: number

    @Column({default: '', type: 'text'})
    description: string

    @Column({default: '', name: 'avatar_path'})
    avatarPath: string

    @OneToMany(() => VideoEntity, video => video.user)
    videos: VideoEntity[]

    @OneToMany(() => SubscriptionEntity, sub => sub.fromUser)
    subscriptions: SubscriptionEntity[]
    
    @OneToMany(() => SubscriptionEntity, sub => sub.toChannel)
    subscribers: SubscriptionEntity[]
}