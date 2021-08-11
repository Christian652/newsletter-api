import { IsNotEmpty, IsString } from 'class-validator';

export class NewDTO {

    id: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    body: string;
}