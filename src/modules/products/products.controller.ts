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
import { Public } from 'src/decorators/public.decorator';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { IRes } from '../auth/users.interface';
import {
  ProductCountDto,
  ProductCreateDto,
  ProductQueryDto,
  ProductUpdateDto,
} from './products.dto';
import { ICountRes, IProductRes } from './products.interface';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Get()
  async getProducts(@Query() query: ProductQueryDto): Promise<IProductRes[]> {
    try {
      const rs = await this.productsService.getProducts(query);
      if (rs.length === 0)
        throw new HttpException('Cannot find any products', 400);
      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Roles(Role.Admin, Role.Root)
  @Get('get-count')
  @ApiBearerAuth()
  async getCountDoc(@Query() query: ProductCountDto): Promise<ICountRes> {
    try {
      const rs = await this.productsService.getCount(query);

      if (!rs) throw new HttpException('Cannot find any products', 400);
      return {
        count: rs,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Public()
  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<IProductRes> {
    try {
      const rs = await this.productsService.getProductById(id);
      if (!rs) throw new HttpException('Cannot find employee', 400);
      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Post()
  @Roles(Role.Admin, Role.Root)
  @ApiBearerAuth()
  async creatProduct(@Body() data: ProductCreateDto): Promise<IProductRes> {
    try {
      const rs = await this.productsService.creatProduct(data);
      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Put(':id')
  @Roles(Role.Admin, Role.Root)
  @ApiBearerAuth()
  async updateProduct(
    @Param('id') id: string,
    @Body() data: ProductUpdateDto,
  ): Promise<IProductRes> {
    try {
      const rs = await this.productsService.updateProduct(id, data);
      if (!rs) throw new HttpException('Cannot find product', 400);
      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Delete('/hard-delete/:id')
  @Roles(Role.Admin, Role.Root)
  @ApiBearerAuth()
  async hardDeleteProduct(@Param('id') id: string): Promise<IRes> {
    try {
      const rs = await this.productsService.hardDeleteProduct(id);
      if (!rs) throw new HttpException('Cannot find product', 400);
      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Delete('/:id')
  @Roles(Role.Admin, Role.Root)
  @ApiBearerAuth()
  async deleteProduct(@Param('id') id: string): Promise<IRes> {
    try {
      const rs = await this.productsService.deleteProduct(id);
      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
