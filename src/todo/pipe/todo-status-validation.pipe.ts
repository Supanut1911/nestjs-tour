import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TodoStatus } from '../todo.enum'

export class TodoStatusValidationPipe implements PipeTransform {
    readonly allowStatus = [
        TodoStatus.INIT,
        TodoStatus.IN_PROGRESS,
        TodoStatus.DONE
    ]
    
    transform(value: any) {
        // throw new Error("Method not implemented.");
        console.log('value', value);

        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is and invalid status`)
        }

        return value
    }

    private isStatusValid(status: any) {
        const idx = this.allowStatus.indexOf(status)
        return idx !== -1
    }
}