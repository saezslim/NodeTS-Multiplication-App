import fs from 'fs/promises'

let message: string = ``
const separator: string = '===================='

const createTable: (a: number, b: string, c:number) => string = (base, phrase, limit) => {
  for(let i: number = 1; i < limit - 1; i++){
    phrase = phrase + `${base} x ${i} = ${base * i}` + '\n'
  }
  return phrase
}

const saveTable: (a: string, b: number) => void = async (msg, num) => {
  await fs.mkdir('./outputs', { recursive: true }) // Permite generar dentro de más carpetas
  await fs.writeFile(`./outputs/tabla-${num}.txt`, msg)
}

const isShowed: (a: boolean, b: string) => void = (show, msg) => {
  if(show) console.log(msg)
  console.log('Table saved!')
}

export const multiplication: (a: number, b: boolean, c: number) => void = async (base, show, limit) => {
  message = message + separator + '\n' + `Tabla del ${base}` + '\n' + separator
  message = message + '\n'
  message = createTable(base, message, limit)
  saveTable(message, base)
  isShowed(show, message)
}
