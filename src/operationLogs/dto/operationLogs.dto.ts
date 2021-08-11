import { IsInt, IsJSON, IsString } from 'class-validator';

export class OperationLogsDTO {
  @IsInt()
  id: number;

  @IsString()
  operation_type: string;
  
  @IsString()
  object_type: string;
  
  @IsJSON()
  data: any;
}