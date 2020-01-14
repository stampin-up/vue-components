/*
** So ts compiler will be aware of vue components & json files
** Don't put anything here
*/

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '*.json' {
  const value: unknown
  export default value
}
