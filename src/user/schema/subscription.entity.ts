

import { BaseEntity } from "src/utils/base";
import { VideoEntity } from "src/video/schema/video.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('Subscription')
export class SubscriptionEntity extends BaseEntity {

    
    @ManyToOne(() => UserEntity, user => user.subscriptions)
    @JoinColumn({name: 'from_user_id'})
    fromUser: UserEntity

    @ManyToOne(() => UserEntity, user => user.subscribers)
    @JoinColumn({name: 'to_channel_id'})
    toChannel: UserEntity
}