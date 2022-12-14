// import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { createParamDecorator } from '@nestjs/common/decorators/http/'
import { ExecutionContext } from '@nestjs/common/interfaces/'

import { UserEntity } from "../schema/user.entity";

export const CurrentUser = createParamDecorator(
    (data: keyof UserEntity, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        const user = request.user

        return data ? user[data] : user
    }
)