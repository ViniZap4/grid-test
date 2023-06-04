import { Layout } from "react-grid-layout";

export const data = [
  { id: 1, position: "1-1", name: "first item" },
  { id: 2, position: "2-1", name: "name 2" },
  { id: 3, position: "1-3", name: "testing contents" },
  { id: 4, position: "3-2", name: "testing another one" },
  { id: 5, position: "0-2", name: "hello" },
  { id: 6, position: "0-0", name: "こんにちは" },
  { id: 7, position: "3-0", name: "Ola" },
  { id: 8, position: null, name: "Thiago" },
  { id: 9, position: null, name: "Vinicius" },

]



export const contentsLayout = data.filter(item => !!item.position)
export const nullpositionContents = data.filter(item=> !item.position)

console.log("only positionated", contentsLayout);

const size = 1
export const layout = contentsLayout.map((item): Layout => ({
  i: item.id.toString(),
  x: parseInt(item.position ? item.position.split("-")[0] : "0"),
  y: parseInt(item.position ? item.position.split("-")[1] : "0"),
  w: size,
  h: size,
}))