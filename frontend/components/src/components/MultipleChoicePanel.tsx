import { useState, type ReactNode } from 'react';
import GameButton from './GameButton';
import questionStyles from './QuestionPanel.module.css';
import styles from './MultipleChoicePanel.module.css';

export type MultipleChoicePanelProps = {
    prompt: ReactNode;
    options: string[];
    correctAnswer: string;
    onSubmit?: (answer: string) => void;
    onNext?: () => void;
}


const MultipleChoicePanel = ({ prompt, options, correctAnswer, onSubmit, onNext }: MultipleChoicePanelProps) => {
    const [selected, setSelected] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const isCorrect = submitted && selected === correctAnswer;

    const submit = () => {
        if (!selected) return;
        setSubmitted(true);
        onSubmit?.(selected);
    };

    const optionClass = (option: string) => {
        if (!submitted) return option === selected ? styles.selected : '';
        if (option === correctAnswer) return styles.right;
        if (option === selected) return styles.wrong;
        return '';
    }

    return (
        <section className={`${questionStyles.panel} ${styles.panel} ${submitted ? (isCorrect ? questionStyles.correct : questionStyles.incorrect) : ''}`}>
            <div className={questionStyles.content}>
                <h2 className={questionStyles.question}>{prompt}</h2>
            </div>
            <div className={styles.options} role="radiogroup">
                {options.map((option) => (
                    <button
                        key={option}
                        type="button"
                        role="radio"
                        aria-checked={option === selected}
                        disabled={submitted}
                        className={`${styles.option} ${optionClass(option)}`}
                        onClick={() => setSelected(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
            {submitted ? (
                onNext && <GameButton type="next" onClick={onNext} />
            ) : (
                <GameButton type="submit" disabled={!selected} onClick={submit} />
            )}
        </section>
    )
}

export default MultipleChoicePanel;

