import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { getAllDiaries, createDiary } from './diaryService';
import { Diary } from './types';

const DiaryEntry = (props: {diary: Diary}) => (
    <div>
        <h3>{props.diary.date}</h3>
        <div>visibility: {props.diary.visibility}</div>
        <div>weather: {props.diary.weather}</div>
    </div>
)

const DiaryEntries = (props: {diaries: Diary[]}) => (
    <div>
        <h1>Diary entries:</h1>
        {props.diaries.map(diary => <DiaryEntry key={diary.id} diary={diary} />)}
    </div>
)

interface AddDiaryEntryProps {
    addDiary: (diary: Diary) => unknown;
}

const AddDiaryEntry = (props: AddDiaryEntryProps) => {
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState('');
    const [weather, setWeather] = useState('');
    const [comment, setComment] = useState('');

    const [error, setError] =useState('')
    
    const showError = (error: string) => {
        setError(error)
        setTimeout(() => {setError('')}, 3000)
    }

    const diaryCreation = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        try {
            const newDiary = await createDiary({date, visibility,  weather, comment});
            props.addDiary(newDiary);
            setDate('');
            setVisibility('');
            setWeather('');
            setComment('');
        } catch (error){
            if (axios.isAxiosError(error)){
                console.log(error.response);
                if (error.response && error.response.data) {
                    showError(error.response.data);
                }
            } else {
                console.log(error);
            }
        }
    }

    return (
        <div>
            <h1>Add new entry:</h1>
            <div style={{color:'red'}}>{error}</div>
            <form onSubmit={diaryCreation}>
                <div>
                    date: <input type="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)} 
                    />
                </div>
                <div>
                    visibility: 
                        <input type="radio" name="visibility"
                            checked={visibility === 'great'}
                            onChange={() => setVisibility('great')} /> great
                        <input type="radio" name="visibility"
                            checked={visibility === 'good'}
                            onChange={() => setVisibility('good')} /> good
                        <input type="radio" name="visibility"
                            checked={visibility === 'ok'}
                            onChange={() => setVisibility('ok')} /> ok
                        <input type="radio" name="visibility"
                            checked={visibility === 'poor'}
                            onChange={() => setVisibility('poor')} /> poor
                </div>
                <div>
                    weather: 
                        <input type="radio" name="weather"
                            checked={weather === 'sunny'}
                            onChange={() => setWeather('sunny')} /> sunny
                        <input type="radio" name="weather"
                            checked={weather === 'rainy'}
                            onChange={() => setWeather('rainy')} /> rainy
                        <input type="radio" name="weather"
                            checked={weather === 'cloudy'}
                            onChange={() => setWeather('cloudy')} /> cloudy
                        <input type="radio" name="weather"
                            checked={weather === 'stormy'}
                            onChange={() => setWeather('stormy')} /> stormy
                        <input type="radio" name="weather"
                            checked={weather === 'windy'}
                            onChange={() => setWeather('windy')} /> windy
                </div>
                <div>
                    comment: <input
                        value={comment}
                        onChange={(event) => setComment(event.target.value)} 
                    />
                </div>
                <div><button type='submit'>add</button></div>
            </form>
        </div>
    );
}

const App = () => {

    const [diaries, setDiaries] = useState<Diary[]>([]);

    useEffect(() => {
        getAllDiaries().then(data => setDiaries(data));
    }, []);


    return (
        <div>
            <AddDiaryEntry addDiary={(diary: Diary) => setDiaries(diaries.concat(diary))} />
            <DiaryEntries diaries={diaries} />
        </div>
    );
};

export default App;
