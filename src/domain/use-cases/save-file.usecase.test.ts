import {SaveFile} from './save-file.usecase'
import fs from 'fs'

describe('SaveFileUseCase', () => {
  afterEach(() => {
    // Limpieza después de cada test
    const filePath1 = 'outputs'
    const filePath2 = 'custom-outputs'
    if(fs.existsSync(filePath2)) fs.rmSync(filePath2, {recursive: true})
    if(fs.existsSync(filePath1)) fs.rmSync(filePath1, {recursive: true})
  })
  test('should save file with default values', () => {
    const saveFile = new SaveFile()
    const filePath = 'outputs/tabla-table.txt'
    const options = {
      fileContent: 'test content',
    }

    const result = saveFile.execute(options)
    const fileExists = fs.existsSync(filePath)
    const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'})

    expect(result).toBeTruthy()
    expect(fileExists).toBe(true)
    expect(fileContent).toBe(options.fileContent)
    
  })
  
  test('should save file with custom values', () => {
    const options = {
      fileContent: 'custom content',
      fileDestination: 'custom-outputs/file-destination',
      fileName: 'custom-table-name'
    }
    const saveFile = new SaveFile()
    const result = saveFile.execute(options)
    const filePath = options.fileDestination + '/tabla-' + options.fileName + '.txt'
    const fileExists = fs.existsSync(filePath)
    const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'})

    expect(result).toBeTruthy()
    expect(fileExists).toBe(true)
    expect(fileContent).toBe(options.fileContent)
  })

  test('should return false if directory could not be created', () => {
    const saveFile = new SaveFile()
    // Si solo se deja el jest.spyOn(fs, 'mkdirSync'),
    // estará viendo si se llama la función 'mkdirSync' y con qué argumentos
    // El mockImplementation reemplaza la funcionalidad de la función con lo
    // que le pongamos.
    const mkdirMock = jest.spyOn(fs, 'mkdirSync').mockImplementation(
      () => {throw new Error('This is a custom error message from testing.')}
    )
    const result = saveFile.execute({fileContent: 'Error testing'})

    expect(result).toBe(false)

    mkdirMock.mockRestore()
  })

  test('should return false if file could not be created', () => {
    const saveFile = new SaveFile()
    const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
      () => {throw new Error('This is a custom error message from testing.')}
    )
    const result = saveFile.execute({fileContent: 'Error testing'})

    expect(result).toBe(false)

    writeFileSpy.mockRestore()
  })

})