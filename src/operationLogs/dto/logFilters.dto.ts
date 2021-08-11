import { IsString } from "class-validator";

export class LogFiltersDto {
  
  @IsString()
  search: string;  
}