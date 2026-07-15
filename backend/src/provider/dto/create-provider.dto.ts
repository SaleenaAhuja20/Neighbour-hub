import { Type } from "class-transformer";
import {
  IsNumber,
  IsString,
} from "class-validator";

export class CreateProviderDto {
  @IsString()
  serviceTitle!: string;

  @IsString()
  category!: string;

  @IsString()
  experience!: string;

  @IsString()
  phone!: string;

  @IsString()
  address!: string;

  @IsString()
  description!: string;

  @Type(() => Number)
  @IsNumber()
  serviceFee!: number;
}