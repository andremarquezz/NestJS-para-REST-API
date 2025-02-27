import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  readonly content: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  readonly recipient: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  readonly sender: string;

  readonly read: boolean;
}
