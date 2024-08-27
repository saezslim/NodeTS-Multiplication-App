import { CreateTable } from '../domain/use-cases/create-table.use-case'
import {ServerApp} from './server-app'
import { SaveFile } from '../domain/use-cases/save-file.usecase'
import fs from 'fs'

describe('Server App', () => {

  const options = {
    base: 2,
    limit: 10,
    showTable: false,
    destination: 'test-destination',
    name: 'test-filename'
  }

  beforeAll(() => {
    jest.clearAllMocks()
  })

  test('should create ServerApp instance', () => {
    const serverApp = new ServerApp()
    expect(serverApp).toBeInstanceOf(ServerApp)
    expect(typeof ServerApp.run).toBe('function')
  })
  
  test('should run ServerApp with options', () => {
    // Aquí le echaremos el ojo a la respuesta del sv
    // por ende, la función espiada será console en su
    // método log
    const logSpy = jest.spyOn(console, 'log')
    // Aquí espiamos si se manda a llamar el execute
    const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute')
    const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute')

    ServerApp.run(options)

    // Cuántas veces esperamos que se llame a console
    expect(logSpy).toHaveBeenCalledTimes(2)
    // Se llamó con este contenido?
    expect(logSpy).toHaveBeenCalledWith('Server running...')
    // Este contenido fue el último ?
    expect(logSpy).toHaveBeenLastCalledWith('File created!')

    expect(createTableSpy).toHaveBeenCalledTimes(1)
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base, limit: options.limit
    })

    expect(saveFileSpy).toHaveBeenCalledTimes(1)
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileDestination: options.destination,
      fileName: options.name
    })

    
  })
  
 test('should run with custom values mocked', () => {
  const createMock = jest.fn().mockReturnValue('1 x 1 = 1')
  // Como estamos simulando la función, su retorno es undefined
  // para evitar este comportamiento, podemos crear
  // su valor de retorno.
  const saveFileMock = jest.fn().mockReturnValue(true)
  const logMock = jest.fn()
  const logErrorMock = jest.fn()

  console.log = logMock
  console.error = logErrorMock
  CreateTable.prototype.execute = createMock
  SaveFile.prototype.execute = saveFileMock
  
  ServerApp.run(options)

  expect(logMock).toHaveBeenCalledWith('Server running...')
  expect(createMock).toHaveBeenCalledWith({ base: options.base, limit: options.limit})
  expect(saveFileMock).toHaveBeenCalledWith({
    fileContent: '1 x 1 = 1',
    fileDestination: options.destination,
    fileName: options.name
  })
  expect(logMock).toHaveBeenCalledWith('File created!')
  expect(logErrorMock).not.toHaveBeenCalled()
  })
  if(fs.mkdirSync(`${options.destination}`, {recursive: true})) fs.rmSync(options.destination,{recursive: true})
})