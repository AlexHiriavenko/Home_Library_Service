import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { isUUID } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createArtistDto: CreateArtistDto) {
    const artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    const newArtist = await this.prisma.artist.create({ data: artist });
    return newArtist;
  }

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(
        'Bad request. userId is invalid (not uuid)',
      );
    }
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new NotFoundException('artist not found');
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    await this.findOne(id);
    const updateArtist = await this.prisma.artist.update({
      where: { id },
      data: { ...updateArtistDto },
    });
    return { id, ...updateArtist };
  }

  async remove(id: string) {
    const artist = await this.findOne(id);

    if (!artist) {
      return null;
    }

    return await this.prisma.artist.delete({ where: { id } });
  }
}
