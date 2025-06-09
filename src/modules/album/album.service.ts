import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { isUUID } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAlbumDto: CreateAlbumDto) {
    const album = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    const newAlbum = await this.prisma.album.create({ data: album });
    return newAlbum;
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(
        'Bad request. albumId is invalid (not uuid)',
      );
    }
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException('album not found');
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    await this.findOne(id);

    const updatedAlbum = await this.prisma.album.update({
      where: { id },
      data: { ...updateAlbumDto },
    });

    return { id, ...updatedAlbum };
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.album.delete({ where: { id } });
  }
}
