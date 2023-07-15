import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';

@Controller('')
export class SiteController {

    // render all jobs
    @Get()
    homepage() {

    }

    @Get('about')
    about() {

    }

    @Get('support')
    support() {

    }

    @Get('companies')
    listCompanies() {

    }

}
