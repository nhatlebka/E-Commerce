import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CategoryService } from 'src/modules/category/category.service';

@ValidatorConstraint({ name: 'ValidateCategoryName', async: true })
@Injectable()
export class ValidateCategoryName implements ValidatorConstraintInterface {
  constructor(private readonly categoryService: CategoryService) {}

  async validate(name: string) {
    try {
      const category = await this.categoryService.findByName(name);
      if (!category) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `Category not exist`;
  }
}
