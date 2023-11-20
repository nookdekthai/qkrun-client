import { styles } from '@/app/styles/style'
import React from 'react'

const QuizCourse = ({ setActive, active, quiz, setQuiz, handleSubmit }: any) => {
    const prevButton = () => {
        setActive(active - 1);
    }

    const handleOptions = () => {
        setActive(active + 1);
        handleSubmit()
    };

    return (
        <div className="w-[80%] m-auto mt-24 block">
            <div>
                <label className={`${styles.label} text-[20px]`} htmlFor="email">
                    Button Label
                </label>
                <br />
                <input
                    type="text"
                    name="Benefit"
                    placeholder="แบบทดสอบหลังเรียน"
                    required
                    className={`${styles.input} my-2`}
                    value={quiz.quizLabel}
                    onChange={(e) => setQuiz(prev => ({ ...prev, quizLabel: e.target.value }))}
                />
            </div>

            <div>
                <label className={`${styles.label} text-[20px]`} htmlFor="email">
                    Link Quiz
                </label>
                <br />
                <input
                    type="text"
                    name="Benefit"
                    placeholder="https://www....."
                    required
                    className={`${styles.input} my-2`}
                    value={quiz.quizLink}
                    onChange={(e) => setQuiz(prev => ({ ...prev, quizLink: e.target.value }))}
                />
            </div>
            <div className="w-full flex items-center justify-between">
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={prevButton}
                >
                    Prev
                </div>
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={handleOptions}
                >
                    Next
                </div>
            </div>
        </div>
    )
}

export default QuizCourse