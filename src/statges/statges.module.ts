import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statge } from './statge.entity';
import { StatgesController } from './statges.controller';
import { StatgesService } from './statges.service';

@Module({
  imports: [TypeOrmModule.forFeature([Statge])],
  controllers: [StatgesController],
  providers: [StatgesService]
})

export class StatgesModule {}
