import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { Injectable } from "@nestjs/common";
import { UserService } from "../user.service";


@Injectable()
@ValidatorConstraint({async:true})
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {
    constructor(private userService: UserService){}

    async validate(value: any, validationArguments?: ValidationArguments): | Promise<boolean> { 
        let usuarioComEmailNaoExiste = await this.userService.verificarEmailUnico(value);
        return usuarioComEmailNaoExiste;
    }
}
export const EmailIsUnique = (opcoes: ValidationOptions) => {
    return (object: Object, propriedade: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propriedade,
            options: opcoes,
            constraints:[],
            validator: EmailEhUnicoValidator
        });
    }
}