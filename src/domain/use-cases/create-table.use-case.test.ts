import { CreateTable } from './create-table.use-case'

describe('CreateTableUseCase', () => {
  test('should create table with default values', () => {
    const createTable = new CreateTable()
    const table = createTable.execute({base:2})
    const rows = table.split('\n').length

    expect(createTable).toBeInstanceOf(CreateTable)
    expect(table).toContain('2 x 1 = 2')
    expect(table).toContain('2 x 10 = 20')
    expect(rows).toBe(14)
  })
  test('should create table with custom values', () => {
    const options = {
      base:3,
      limit: 20
    }
    const createTable = new CreateTable()
    const table = createTable.execute(options)
    const dinamicNum: () => number = () => {
      let num = Math.random() * 10
      num = parseInt(`${num}`)
      if ( num <= 20 && num !== 0){
        return num
      }
      return num + 1
    }
    
    expect(table).toContain(`${options.limit}`)
    expect(table).toContain(`${options.base * dinamicNum()}`)
    expect(table).toContain(`15`)

  })
})