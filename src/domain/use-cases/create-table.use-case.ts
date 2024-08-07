/**
 * El siguiente interface representará las reglas
 * de negocio que queremos forzar en la clase
 * CreateTable
 */
export interface CreateTableUseCase {
  execute: ( options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
  base: number;
  limit?: number;// Opcional
}

export class CreateTable implements CreateTableUseCase {
  constructor(
    /**
   * DI - Dependency Injection
   * Crear el constructor nos permitirá hacer el DI
   * Se realiza así por utilizar TS
   */
  ){}
  execute({ base, limit = 10 }: CreateTableOptions){ 
    let phrase: string = ``
    const separator: string = '===================='

    phrase = phrase + separator + '\n' + `Tabla del ${base}` + '\n' + separator
    phrase = phrase + '\n'

    for(let i: number = 1; i <= limit; i++){
      phrase = phrase + `${base} x ${i} = ${base * i}` + '\n'
    }
    return phrase
  }
}