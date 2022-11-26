import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, genSalt, hash } from 'bcryptjs'
import { Repository } from 'typeorm';
import { UserUpdateDto } from './dto/user-update.dto';
import { SubscriptionEntity } from './schema/subscription.entity';
import { UserEntity } from './schema/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(SubscriptionEntity) 
        private readonly subscriptionRepository: Repository<SubscriptionEntity>
    ) {}



    // by-id
    async byId(id: number) {
        const user = await this.userRepository.findOne({
            where: {
                id
            },
            relations: {
                videos: true,
                subscriptions: {
                    toChannel: true
                }
            },
            order: {
                createdAt: 'DESC'
            }
        })


        if (!user) throw new NotFoundException('Пользователь не найден!')
       
        return user
    }

    //update

    async updateProfile(id: number, dto: UserUpdateDto) {
        const user = await this.byId(id)

        const isSameUser = await this.userRepository.findOneBy({email: dto.email})
        if (isSameUser && id !== isSameUser.id) throw new BadRequestException('Такой пользователь уже существует!')

        if (dto.password) {
            const salt = await genSalt(10)
            user.password = await hash(dto.password, salt)
        }

        user.email = dto.email
        user.name = dto.name
        user.description = dto.description
        user.avatarPath = dto.avatarPath

        return await this.userRepository.save(user)
    }

    //subscribe
    async subscribe(id: number, channelId: number) {


        if (id == channelId) {
            throw new BadRequestException('Нельзя подписться на себя!')
        }

        const data = {
            toChannel: {id: channelId},
            fromUser: {id: id}
        }

        const isSubscribed = await this.subscriptionRepository.findOneBy(data)



        if (!isSubscribed) {
            const newSubscription = await this.subscriptionRepository.create(data)
            await this.subscriptionRepository.save(newSubscription)
            return true
        }

        await this.subscriptionRepository.delete(data)
        return false
    }

    //getAll
    async getAll() {
        return this.userRepository.find()
    }
}
