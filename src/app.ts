//import { multiplication } from "./app.logic";
import { yarg } from "./config/plugins/args.plugin";
import { ServerApp } from "./presentation/server-app";

(async() => {
  await main()
})(); // Esta sería como la función main de Java
// Dentro de ella podemos poner más funciones y 
// realizar el programa que queremos.

async function main() {
  /* Mi sulución
  const base: number = yarg.b
  const show: boolean = yarg.s
  const limit: number = yarg.l

  multiplication(base, show, limit)
  */

  // Se envian los valores correspondientes
  const {
    b:base, 
    l:limit, 
    s:showTable,
    n:name,
    d:destination} = yarg
  ServerApp.run({base, limit, showTable, name, destination})
}