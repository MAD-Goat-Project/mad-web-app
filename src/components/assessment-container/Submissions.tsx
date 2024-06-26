import {
  IAssessment,
  IAssessmentType,
} from '../../models/assessment.interface';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material';

export function Submissions({
  assessment,
  answer,
  setAnswer,
}: {
  assessment: IAssessment;
  answer: string[];
  setAnswer: (answer: string[]) => void;
}) {
  const handleCheckboxChange = (question: string) => {
    if (answer.includes(question)) {
      setAnswer(answer.filter((ans) => ans !== question));
    } else {
      setAnswer([...answer, question]);
    }
  };

  if (assessment.type === IAssessmentType.QUESTION_ANSWER)
    return (
      <TextField
        label="Submit your answer"
        sx={{ mb: 2, width: '300re' }}
        value={answer}
        onChange={(e) => {
          setAnswer([e.target.value]);
        }}
      />
    );

  if (assessment.type === IAssessmentType.QUIZ && assessment.quiz) {
    return (
      <FormGroup>
        {assessment.quiz.map((question, index) => {
          return (
            <FormControlLabel
              key={index}
              control={<Checkbox />}
              label={question}
              checked={answer.includes(question)}
              onChange={() => handleCheckboxChange(question)}
            />
          );
        })}
      </FormGroup>
    );
  }

  return null;
}
