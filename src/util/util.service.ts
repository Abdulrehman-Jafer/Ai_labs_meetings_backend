import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaTransaction } from 'src/types';
@Injectable()
export class UtilService {
  constructor(private prisma: PrismaService) {}

  tryCatchWrapper<T>(fn: (...args: any[]) => Promise<T | null> | T) {
    return async (...args: any[]): Promise<T> => {
      try {
        return await fn(...args);
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new BadRequestException({ ...error });
        }
        console.error('An error occurred:', error.message + '\n');
        console.error('raw error', error);
        throw error; // rethrowing error after logging, customize as needed.
      }
    };
  }

  async use_tranaction<T = unknown>(
    fn: (tx: PrismaTransaction) => Promise<T>,
    tx: PrismaTransaction = null,
  ) {
    return this.prisma.$transaction(async (new_tx) => {
      return await fn(tx ?? new_tx);
    });
  }
}
