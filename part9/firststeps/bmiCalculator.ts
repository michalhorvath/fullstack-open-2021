import { isNumber } from "./utils";

interface BodyStats {
    height: number,
    weight: number
}

const parseArguments = (args: string[],): BodyStats => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (isNumber(args[2]) && isNumber(args[3])){
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

const calculateBmi = (height: number, weight: number): string =>{
    if (height === 0) {
        throw new Error('Height can\'t be zero value!');
    }
    const bmi = weight / ((height / 100) * (height / 100));
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi < 25) {
        return 'Normal (healthy weight)';
    } else if (bmi < 30) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
};

try {
    const {height, weight} = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch(error: unknown){
    let errorMessage = 'Something happened';
    if (error instanceof Error){
        errorMessage += `Error: ${error.message}`;
    }
    console.log(errorMessage);
}

export { calculateBmi};
