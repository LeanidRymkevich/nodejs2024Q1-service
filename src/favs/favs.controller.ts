import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FavoritesService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavoritesService) {}
}
