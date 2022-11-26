import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"


export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date
}