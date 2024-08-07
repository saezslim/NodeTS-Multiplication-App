import fs from 'fs'
// Esta importación viola la Clean Architecture

export interface SaveFileUseCase {
  execute: (options: Options) => boolean;
}


export interface Options {
  fileContent: string;
  fileDestination?: string;
  fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
  constructor(
    /** repository: StorageRepository */
  ){}
  execute({
    fileContent,
    fileDestination = 'outputs',
    fileName = 'table'
  }: Options): boolean {
    try {
      fs.mkdirSync(fileDestination, { recursive: true })
      fs.writeFileSync(`${fileDestination}/tabla-${fileName}.txt`, fileContent)
      return true
    }
    catch (error){
      console.error(error)
      return false
    }
  }
}