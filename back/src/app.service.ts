import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {message:"CONEXION EXITOSA AL BACK"};
  }
}
