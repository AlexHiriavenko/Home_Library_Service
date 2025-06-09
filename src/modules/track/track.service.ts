import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { isUUID } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTrackDto: CreateTrackDto) {
    const track = {
      id: uuidv4(),
      ...createTrackDto,
    };
    const newTrack = await this.prisma.track.create({ data: track });
    return newTrack;
  }

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(
        'Bad request. trackId is invalid (not uuid)',
      );
    }
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException('track not found');
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    await this.findOne(id);

    const updatedTrack = await this.prisma.track.update({
      where: { id },
      data: { ...updateTrackDto },
    });
    return { id, ...updatedTrack };
  }

  async remove(id: string) {
    const track = await this.findOne(id);
    if (!track) {
      return null;
    }

    return await this.prisma.track.delete({ where: { id } });
  }
}
