/// <reference types="vite/client" />
declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: defineComponent
  export default component
}
declare module '*.mjs'
