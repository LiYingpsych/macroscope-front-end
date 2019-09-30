import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { NumericLiteral } from "@babel/types";

// TODO: finish this file - or remove it?

// export type NumberInputError = 'none' | 'invalidSymbol' | 'incompleteNumber' | 'singleMinus'
//     | 'singleFloatingPoint' | 'singleZero'| 'min' | 'max' | 'required' | 'clean';

// namespace errorNames {
//     export const none: 'none' = 'none';
//     export const invalidSymbol: 'invalidSymbol' = 'invalidSymbol';
//     export const incompleteNumber: 'incompleteNumber' = 'incompleteNumber';
//     export const singleMinus: 'singleMinus' = 'singleMinus';
//     export const singleFloatingPoint: 'singleFloatingPoint' = 'singleFloatingPoint';
//     export const singleZero: 'singleZero' = 'singleZero';
//     export const min: 'min' = 'min';
//     export const max: 'max' = 'max';
//     export const required: 'required' = 'required';
//     export const clean: 'clean' = 'clean';
//     export const allow: 'allow' = 'allow';
//     export const limit: 'limit' = 'limit';
// }

// namespace strategies {
//     export const ignore: 'ignore' = 'ignore';
//     export const warn: 'warn' = 'warn';
//     export const allow: 'allow' = 'allow';
// }

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            margin: theme.spacing(1)
        }
    })
);

interface IProps {
    label: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    onChange: (selectedNumber: number) => void;
}

export default function NumberInput(props: IProps) {
    const classes = useStyles();

    const { label, defaultValue } = props;

    const [value, setValue] = React.useState(defaultValue);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = +event.target.value;
        setValue(newValue);
    };

    return (
        <TextField
            label={label}
            value={value}
            onChange={handleChange}
            type="number"
            className={classes.textField}
            InputLabelProps={{
                shrink: true
            }}
            margin="normal"
            variant="outlined"
        />
    );
}

// private static getValidValue(value: string): string {
//     const match: RegExpMatchArray | null = value.match(NumberInput.allowed);
//     return match !== null ? (match.index === constants.zero ? match[constants.zero] : match.join(constants.emptyString)) : constants.emptyString;
// }

// private static validateNumberValue(value: number, props: NumberInputProps): number {
//     const { max, min } = props;
//     if((typeof max === typeofs.numberType) && (value > max!)) {
//         return constants.one;
//     }
//     if((typeof min === typeofs.numberType) && (value < min!)) {
//         return constants.minusOne;
//     }
//     return constants.zero;
// }

// private static validateValue(value: string, props: NumberInputProps): NumberInputErrorExtended {
//     const { required, strategy, min } = props;
//     if(value === constants.emptyString) {
//         return required ? errorNames.required : errorNames.clean;
//     } else {
//         if(value.match(NumberInput.validSymbols)) {
//             if(value.match(NumberInput.stricAllowed)) {
//                 if(value.match(NumberInput.validNumber)) {
//                     const numberValue: number = Number(value);
//                     const floatingPoint: number = value.indexOf(constants.dot);
//                     const decimal: boolean = floatingPoint > constants.minusOne;
//                     const whole: number = decimal ? Number(value.substring(constants.zero, floatingPoint)) : min!;
//                     switch(NumberInput.validateNumberValue(numberValue, props)) {
//                         case constants.one: return errorNames.max;
//                         case constants.minusOne: return ((strategy !== strategies.allow) && (min! > constants.zero) && (numberValue > constants.zero) && (!decimal || (decimal && (whole > min!)))) ? errorNames.allow : errorNames.min;
//                         default: return errorNames.none;
//                     }
//                 } else {
//                     return (strategy !== strategies.allow) && (value === constants.dash) && (min! >= constants.zero)
//                         ? errorNames.limit : (min! < 0 ? errorNames.allow : errorNames.incompleteNumber);
//                 }
//             } else {
//                 switch(value[value.length - constants.one]) {
//                     case constants.dash: return errorNames.singleMinus;
//                     case constants.dot: return errorNames.singleFloatingPoint;
//                     case constants.zeroString: return errorNames.singleZero;
//                     default : return errorNames.invalidSymbol;
//                 }
//             }
//         } else {
//             return errorNames.invalidSymbol;
//         }
//     }
// }

// private static validSymbols: RegExp = /(\-|\.|\d)+/;
// private static stricAllowed: RegExp = /^-?((0|([1-9]\d{0,}))(\.\d{0,})?)?$/;
// private static validNumber: RegExp = /^-?((0(\.\d+)?)|([1-9]\d{0,}(\.\d+)?))$/;
// private static allowed: RegExp = /-?((0|([1-9]\d{0,}))(\.\d{0,})?)?/;

// private emitEvents(nextError: NumberInputErrorExtended, value: string, valid: boolean, props: NumberInputProps): void {
//     const { onError, onValid } = props;
//     if((this.error !== nextError) && (props.strategy !== strategies.ignore)) {
//         if(onError) {
//             onError(nextError as NumberInputError);
//         }
//         this.error = nextError;
//     }
//     if(onValid && valid && (this.lastValid !== value)) {
//         onValid(Number(value));
//         this.lastValid = value;
//     }
// }

// private takeActionForValue(value: string, props: NumberInputProps): void {
//     const { strategy, onRequestValue, value: propsValue } = props;
//     const error: NumberInputErrorExtended = NumberInput.validateValue(value, props);
//     const valid: string = NumberInput.overrideRequestedValue(error, NumberInput.getValidValue(value), props);
//     const overridenError: NumberInputError = NumberInput.overrideError(error, props);
//     const emitValid: boolean = NumberInput.emitValid(error, overridenError);
//     this.emitEvents(overridenError, valid, emitValid, props);
//     if((strategy !== strategies.allow) && (valid !== value)) {
//         if(typeof propsValue !== typeofs.stringType) {
//             this.getInputNode().value = valid;
//         } else if(onRequestValue) {
//             onRequestValue(valid);
//         }
//     }
// }

// private shouldTakeActionForValue(props: NumberInputProps): boolean {
//     const { min, max, required, strategy } = this.props;
//     return (min !== props.min) || (max !== props.max) || (required !== props.required) || (strategy !== props.strategy);
// }

// @bind
// private onChange(event: React.FormEvent<HTMLInputElement>): void {
//     const { value } = event.currentTarget;
//     const { onChange } = this.props;
//     if(onChange) {
//         onChange(event, value!);
//     }
//     if(typeof this.props.value !== typeofs.stringType) {
//         this.takeActionForValue(value!, this.props);
//     }
// }

// @bind
// private onBlur(event: React.FocusEvent<HTMLInputElement>): void {
//     const { value } = event.currentTarget;
//     const { props } = this;
//     const { onBlur } = props;
//     const error: NumberInputError = NumberInput.overrideError(NumberInput.revertAllowToMin(NumberInput.validateValue(value!, props)), props);
//     this.emitEvents(error, value!, constants.boolFalse, props);
//     if(onBlur) {
//         onBlur(event);
//     }
// }

// public componentDidMount(): void {
//     const { props } = this;
//     const { value } = props;
//     this.takeActionForValue(typeof value === typeofs.stringType ? value! : this.getInputNode().value, props);
// }

// public componentWillReceiveProps(props: NumberInputProps): void {
//     const { value } = props;
//     if((value !== this.props.value) || this.shouldTakeActionForValue(props)) {
//         this.takeActionForValue(value!, props);
//     }
// }

// public render(): JSX.Element {
//     const { props, constProps } = this;
//     const { value, defaultValue } = props;
//     let inputProps: any = ObjectAssign({}, props, constProps, {
//         defaultValue: typeof defaultValue === typeofs.numberType ? String(defaultValue) : undefined,
//         value: value,
//     });
//     if(typeof inputProps.value !== typeofs.stringType) {
//         delete inputProps.value;
//     }
//     if(inputProps.defaultValue === undefined) {
//         delete inputProps.defaultValue;
//     }
//     NumberInput.deleteOwnProps(inputProps);
//     return React.createElement(TextField, inputProps);
// }
