import { NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
interface classConstructor {
    new (...args: any[]): {};
}
export declare function Serialize(dto: classConstructor): MethodDecorator & ClassDecorator;
export declare class SerializeInterceptor implements NestInterceptor {
    private dto;
    constructor(dto: any);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
export {};
