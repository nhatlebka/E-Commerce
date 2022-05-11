import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { IRes } from '../auth/users.interface';
import { CategoryCreateUpdateDto, CategoryQueryDto } from './category.dto';
import { ICategoryRes } from './category.interface';
import { CategoryService } from './category.service';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @Roles(Role.Admin, Role.Root, Role.Staff)
  @ApiBearerAuth()
  async getCategory(@Query() query: CategoryQueryDto): Promise<ICategoryRes[]> {
    try {
      const rs = await this.categoryService.getCategory(query);
      if (rs.length === 0)
        throw new HttpException('Cannot find any category', 400);
      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Get('/:id')
  @Roles(Role.Admin, Role.Root, Role.Staff)
  @ApiBearerAuth()
  async getCategoryDetail(@Param('id') id: string): Promise<ICategoryRes> {
    try {
      const rs = await this.categoryService.getCategoryDetail(id);
      if (!rs) throw new HttpException('Cannot find category', 400);

      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Post()
  @Roles(Role.Admin, Role.Root)
  @ApiBearerAuth()
  async createCategory(
    @Body() data: CategoryCreateUpdateDto,
  ): Promise<ICategoryRes> {
    try {
      const rs = await this.categoryService.createCategory(data);
      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Put(':id')
  @Roles(Role.Admin, Role.Root)
  @ApiBearerAuth()
  async updateCategory(
    @Param('id') id: string,
    @Body() data: CategoryCreateUpdateDto,
  ): Promise<ICategoryRes> {
    try {
      const rs = await this.categoryService.updateCategory(id, data);
      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Root)
  @ApiBearerAuth()
  async deleteCategory(@Param('id') id: string): Promise<IRes> {
    try {
      const rs = await this.categoryService.deleteCategory(id);
      if (!rs) throw new HttpException('Cannot find category', 400);
      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
