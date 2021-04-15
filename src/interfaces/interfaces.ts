export interface Result {
    from: string,
    to: string,
    intensity: {
        forecast: number,
        actual: number,
        index: string
    }
}
export interface States<Result> {
    startDate: string,
    endDate: string,
    result: Result[],
    loading: boolean,
}