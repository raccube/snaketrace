import Parser from "../lib/parser";

test("parses a basic stack trace", () => {
  const stackTrace = "Traceback (most recent call last):\n" +
    "File \"/tmp/astprocd-q8fbi_x4/robot.py\", line 4, in <module>\n" +
    "R = Robot()\n" +
    "File \"/usr/lib/python3.9/site-packages/sr/robot3/robot.py\", line 77, in __init__\n" +
    "self._init_power_board()\n" +
    "File \"/usr/lib/python3.9/site-packages/sr/robot3/robot.py\", line 97, in _init_power_board\n" +
    "self._power_board: PowerBoard = self._power_boards.singular()\n" +
    "File \"/usr/lib/python3.9/site-packages/j5/boards/board_group.py\", line 65, in singular\n" +
    "raise CommunicationError(\n" +
    "j5.backends.backend.CommunicationError: expected exactly one PowerBoard to be connected, but found 0"

  const parser = new Parser()
  const result = parser.parse(stackTrace)

  expect(result.message).toBe("expected exactly one PowerBoard to be connected, but found 0")
  expect(result.type).toBe("j5.backends.backend.CommunicationError")
  expect(result.startLineIndex).toBe(0)
  expect(result.endLineIndex).toBe(9)
  expect(result.traceback).toHaveLength(4)
  expect(result.traceback[0].file).toBe('/tmp/astprocd-q8fbi_x4/robot.py')
  expect(result.traceback[0].line).toBe(4)
  expect(result.traceback[0].method).toBe('<module>')
  expect(result.traceback[0].code).toBe('R = Robot()')
})
