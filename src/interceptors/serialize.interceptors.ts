import { UseInterceptors , NestInterceptor , CallHandler , ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface classConstructor
{
    new(...args : any[]) : {};
};

export function Serialize(dto : classConstructor) 
{
    return UseInterceptors(new SerializeInterceptor(dto));
};

export class SerializeInterceptor implements NestInterceptor
{
    constructor(private dto : any) {};

    intercept(context : ExecutionContext , next : CallHandler) : Observable<any>
    {
        return next.handle().pipe(
          map((data : any) =>
          {
              return plainToClass(this.dto , data , {
                excludeExtraneousValues : true,
              })
          })
        )
    }
};

