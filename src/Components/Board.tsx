import { useRef } from "react";
import {Droppable} from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  padding-top: 30px;
  padding: 10px 0px;
  border-radius: 5px;
  min-height: 200px;
  background-color: ${(props) => props.theme.boardColor};
  display: flex;
  flex-direction: column;
`
interface IBoardProps{
    toDos:string[];
    boardId:string;
}

interface IAreaProps{
    isDraggingOver:boolean;
    isDraggingFromThis:boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`

const Title = styled.h1`
    text-align: center;
`



function Board({toDos,boardId}:IBoardProps){
    const inputRef = useRef<HTMLInputElement>(null)
    const onClick=() =>{
        inputRef.current?.focus();
        setTimeout(() => {
            inputRef.current?.blur();
        },3000)
    }
    return(
        <Wrapper>
        <Title>{boardId}</Title>
        <input ref={inputRef} placeholder="Write your todo"></input>
        <button onClick={onClick}>Add</button>
        <Droppable droppableId={boardId}>
        {(provided,info) =>
      <Area isDraggingOver={info.isDraggingOver} isDraggingFromThis={Boolean(info.draggingFromThisWith)} ref={provided.innerRef} {...provided.droppableProps}>
          
       {toDos.map((toDo:any,index:any) => 
      <DraggableCard key={toDo} toDo={toDo} index={index}/>
       )}
       {provided.placeholder}
      </Area>
      }</Droppable>
      </Wrapper>
    )
}

export default Board;