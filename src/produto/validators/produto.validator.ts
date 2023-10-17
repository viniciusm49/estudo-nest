import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/user/user.repository";


@Injectable()
@ValidatorConstraint({async:true})
export class UserExistsValidator implements ValidatorConstraintInterface {
    constructor(private userRepository: UserRepository){}

    async validate(value: any, validationArguments?: ValidationArguments): | Promise<boolean> { 
       const resposta = await this.userRepository.verificarSeExisteId(value);
       return resposta;
    }
}
export const UserExists = (opcoes: ValidationOptions) => {
    return (object: Object, propiedade: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propiedade,
            options: opcoes,
            constraints:[],
            validator: UserExistsValidator
        });
    }
}