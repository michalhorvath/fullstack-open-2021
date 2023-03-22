import React from 'react';

const courseName = "Half Stack application development";

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  }
];

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackround extends CoursePartBaseDescription {
  backroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartBaseDescription{
  requirements: string[],
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackround | CoursePartSpecial;


interface HeaderProps {
    courseName: string
}

const Header = (props: HeaderProps) => (
    <h1>
        {props.courseName}
    </h1>
)

interface CoursePartProps {
    coursePart: CoursePart
}

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = (props: CoursePartProps) => {
    switch (props.coursePart.kind) {
        case "basic":
            return (
                <p>
                    <div><b>
                        {props.coursePart.name} {props.coursePart.exerciseCount}
                    </b></div>
                    <div><i>{props.coursePart.description}</i></div>
                </p>
            );
        case "group":
            return (
                <p>
                    <div><b>
                        {props.coursePart.name} {props.coursePart.exerciseCount}
                    </b></div>
                    <div>project exercises: {props.coursePart.groupProjectCount}</div>
                </p>
            );
        case "background":
            return (
                <p>
                    <div><b>
                        {props.coursePart.name} {props.coursePart.exerciseCount}
                    </b></div>
                    <div><i>{props.coursePart.description}</i></div>
                    <div>{props.coursePart.backroundMaterial}</div>
                </p>
            );
        case "special":
            return (
                <p>
                    <div><b>
                        {props.coursePart.name} {props.coursePart.exerciseCount}
                    </b></div>
                    <div><i>{props.coursePart.description}</i></div>
                    <div>
                        required skills: 
                        {' '}
                        {props.coursePart.requirements.join(', ')}
                    </div>
                </p>
            );
        default:
            return assertNever(props.coursePart);
    }
}

interface ContentProps {
    courseParts: CoursePart[]
}

const Content = (props: ContentProps) => (
    <div>
        {props.courseParts.map((coursePart, i) => 
            (<Part key={i} coursePart={coursePart}  />))}
    </div>
)

interface TotalProps {
    courseParts: CoursePart[],
}

const Total = (props: TotalProps) => (
    <p>
        Number of exercises{" "}
        {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
)

const App = () => {
    return (
    <div>
        <Header courseName={courseName} />
        <Content courseParts={courseParts} />
        <Total courseParts={courseParts} />
    </div>
    );
};

export default App;
