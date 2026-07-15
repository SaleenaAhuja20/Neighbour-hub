import { IsDateString, IsOptional, IsString } from "class-validator";

export class CreateBookingDto {
  @IsDateString()
  bookingDate!: string;

  @IsString()
  bookingTime!: string;

  @IsString()
  address!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}