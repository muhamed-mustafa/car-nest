import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
export declare class ReportsService {
    private repo;
    constructor(repo: Repository<Report>);
    createEstimate({ make, model, mileage, year, lat, lng }: GetEstimateDto): Promise<any>;
    create(reportDto: CreateReportDto, user: User): Promise<Report>;
    changeApproval(id: string, approved: boolean): Promise<Report>;
}
