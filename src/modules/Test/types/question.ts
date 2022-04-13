export interface AnswerPair {
    id: string,
    answer: string,
    correct?: boolean,
}
export interface Question {
    id: string,
    title: string,
    answers: Array<Array<AnswerPair>>,
}