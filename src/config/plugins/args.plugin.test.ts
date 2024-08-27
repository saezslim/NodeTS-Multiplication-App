const runCommand = async (args:string[]) => {
  process.argv = [...process.argv, ...args]
  const {yarg} = await import('./args.plugin')
  return yarg
}

describe('Test args.plugin.ts', () => {
  const originalArgv = process.argv
  beforeEach(() => {
    process.argv = originalArgv
    jest.resetModules()
  })
  test('should return default values', async () => {
    const argv = await runCommand(['-b', '5'])

    expect(argv).toEqual( expect.objectContaining({
      b: 5,
      l: 10,
      s: false,
      n: 'table',
      d: './outputs',
    }))
  })
  test('should return custom values', async () => {
    const customValues = [
      '-b', '2',
      '-l', '15',
      '-s', 'true',
      '-n', 'custom name',
      '-d', './customOutputs'
    ]
    const argv = await runCommand(customValues)

    expect(argv).toEqual(expect.objectContaining({
      base: 2,
      limit: 15,
      s: true,
      n: 'custom name',
      destination: './customOutputs'
    }))
  })
})