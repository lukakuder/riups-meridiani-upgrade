import { useState, type SubmitEvent, type ReactNode } from 'react';
import GameButton from './GameButton';
import questionStyles from './QuestionPanel.module.css';
import styles from './TextAnswerPanel.module.css';

export type TextAnswerPanelProps = {
  prompt: ReactNode;
  isCorrect?: boolean;
  correctAnswer?: string;
  placeholder?: string;
  onSubmit?: (answer: string) => void;
  onNext?: () => void;
};

const TextAnswerPanel = ({ prompt, isCorrect, correctAnswer, placeholder, onSubmit, onNext }: TextAnswerPanelProps) => {
  const [answer, setAnswer] = useState('');
  const submitted = isCorrect !== undefined;
  const trimmedAnswer = answer.trim();

  const submit = (event?: SubmitEvent) => {
    event?.preventDefault();
    if (!trimmedAnswer || submitted) return;
    onSubmit?.(trimmedAnswer);
  };

  return (
    <section
      className={`${questionStyles.panel} ${styles.panel} ${submitted ? (isCorrect ? questionStyles.correct : questionStyles.incorrect) : ''}`}
    >
      <div className={questionStyles.content}>
        <h2 className={`${questionStyles.question} ${styles.question}`}>{prompt}</h2>
        {submitted && !isCorrect && (
          <p className={styles.solution}>
            Pravilen odgovor: <strong>{correctAnswer}</strong>
          </p>
        )}
      </div>
      <form className={styles.form} onSubmit={submit}>
        <input
          className={`${styles.input} ${submitted ? (isCorrect ? styles.right : styles.wrong) : ''}`}
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder={placeholder}
          aria-label="Odgovor"
          disabled={submitted}
          autoComplete="off"
          spellCheck={false}
          autoFocus
        />
        {submitted ? (
          onNext && <GameButton type="next" onClick={onNext} />
        ) : (
          <GameButton type="submit" disabled={!trimmedAnswer} onClick={() => submit()} />
        )}
      </form>
    </section>
  );
};

export default TextAnswerPanel;