import { HttpStatus, HttpException } from '@nestjs/common';

// classe de excessao. pode ser usada nas chamadas
export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}