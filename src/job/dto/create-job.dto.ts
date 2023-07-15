import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { RecruitingState } from "../utils/job-recruiting-state.enum";

export class CreateJobDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    candidateProfile: string;

    @IsNotEmpty()
    requiredSkills: string;

    @IsOptional()
    additionalSkills: string;

    @IsOptional()
    published: boolean;

    @IsOptional()
    @IsBoolean()
    isRecruiting: RecruitingState;

    @IsOptional()
    curriculumVitae: string;

    @IsOptional()
    onemCard: string;

    @IsOptional()
    indentityCard: string;
}
