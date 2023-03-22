import { isNumber } from "./utils";

interface DailyExercise {
    dailyExerciseHours: number[],
    target: number
}

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const parseArguments = (args: string[],): DailyExercise => {
    if (args.length < 4) throw new Error('Not enough arguments');

    if (args.slice(2).every(x => isNumber(x))){
        return {
            dailyExerciseHours: args.slice(3).map(x => Number(x)),
            target: Number(args[2])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

const calculateExercises = (dailyExerciseHours: number[], target: number): Result => {
    const periodLength = dailyExerciseHours.length;
    const trainingDays = dailyExerciseHours.filter(val => val > 0).length;
    const average = dailyExerciseHours.reduce((a, b) => a + b,0) / periodLength;
    const success = average > target;

    const metric = average / target;

    let rating = 0;
    let ratingDescription = '';

    if (metric < 0.8) {
        rating = 1;
        ratingDescription = 'not enough';
    } else if (metric < 1.2) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else {
        rating = 3;
        ratingDescription = 'nice';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};


try {
    const {dailyExerciseHours, target} = parseArguments(process.argv);
    console.log(calculateExercises(dailyExerciseHours, target));
} catch(error: unknown){
    let errorMessage = 'Something happened';
    if (error instanceof Error){
        errorMessage += `Error: ${error.message}`;
    }
    console.log(errorMessage);
}

export {calculateExercises};
