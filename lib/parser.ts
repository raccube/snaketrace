import StackTrace from "./stack-trace";
import Frame from "./frame";

const HEADER = "Traceback (most recent call last):"
const FRAME_PATTERN = /File "(.*)", line (\d+), in (.*)/

export default class Parser {
  parse(contents: string): StackTrace {
    const lines = contents.split('\n')
    const startLineIndex = lines.indexOf(HEADER)
    const traceback: Frame[] = []
    let type: string = 'Exception'
    let message: string | null = null
    let endLineIndex: number = lines.length - 1
    for (let i = startLineIndex + 1; i < lines.length; i++) {
      const currentLine = lines[i]
      const frameInfo = FRAME_PATTERN.exec(currentLine)
      if (frameInfo) {
        const [, file, lineNumber, method] = frameInfo
        const line = parseInt(lineNumber)
        const code = lines[++i]
        traceback.push({file, line, method, code})
      } else {
        [type, message] = currentLine.split(': ', 2)
        endLineIndex = i
        break
      }
    }

    return {
      traceback,
      type,
      message,
      startLineIndex,
      endLineIndex,
    }
  }
}