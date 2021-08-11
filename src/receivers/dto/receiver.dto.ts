import { IsNotEmpty, IsString } from 'class-validator';

export class ReceiverDTO {

    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;
}