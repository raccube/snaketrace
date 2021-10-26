import Frame from "./frame";

export default interface StackTrace {
  traceback: Frame[]
  type: string
  message: string | null
  startLineIndex: number
  endLineIndex: number
}