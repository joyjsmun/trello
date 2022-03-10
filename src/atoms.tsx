import { atom } from "recoil";

export const toDoState = atom<any>({
    key:"toDo",
    default:["a","b","c","d","e"],
});