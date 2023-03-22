import express from 'express';
import { isNotNumber } from "./utils";
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());


app.get('/bmi', (req, res) => {
    if (isNotNumber(req.query.height) || isNotNumber(req.query.weight)){
        return res.status(400).json({
            error: 'malformatted parameters'
        });
    }
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    return res.status(200).json({
        height,
        weight,
        bmi: calculateBmi(height, weight)
    });
});

app.post('/exercises', (req, res) => {
    console.log(req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { dailyExercises, target } = req.body;

    if (!target || !dailyExercises){
        return res.status(400).json({
            error: 'parameters missing'
        });
    }

    if (isNotNumber(target) 
            || (dailyExercises instanceof Array 
                    && dailyExercises.some(x => isNotNumber(x)))){
        return res.status(400).json({
            error: 'malformatted parameters'
        });
    }
    return res.status(200).json(calculateExercises([1,2,3], 2));
});

app.get('/', (_req, res) => {
    res.send('Hello Full Stack!');
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
