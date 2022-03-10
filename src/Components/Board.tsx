import React, { useRef } from "react";
import {Droppable} from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoState } from "../atoms";
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
    toDos:ITodo[];
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

const Form = styled.form`
    width: 100%;
    input {
        width: 100%;
        
    }
    
`

interface IForm {
    toDo:string;
}


function Board({toDos,boardId}:IBoardProps){
   const setToDos = useSetRecoilState(toDoState);
   const {register,handleSubmit,setValue} = useForm<IForm>()
   const onValid = ({toDo}:IForm) => {
    const newToDo = {
        id:Date.now(),
        text:toDo,
    };
    setToDos(allBoards => {
       return{
           ...allBoards,
           [boardId]: [newToDo,...allBoards[boardId]]
       }

    })
    setValue("toDo","");
   }
    return(
        <Wrapper>
        <Title>{boardId}</Title>
       <Form onSubmit={handleSubmit(onValid)}>
           <input {...register("toDo",{required:true})} type="text" placeholder= "Add todo" />
       </Form>
        <Droppable droppableId={boardId}>
        {(provided,info) =>
      <Area isDraggingOver={info.isDraggingOver} isDraggingFromThis={Boolean(info.draggingFromThisWith)} ref={provided.innerRef} {...provided.droppableProps}>
          
       {toDos.map((toDo:any,index:any) => 
      <DraggableCard key={toDo.id} toDoId={toDo.id} toDoText={toDo.text} index={index}/>
       )}
       {provided.placeholder}
      </Area>
      }</Droppable>
      </Wrapper>
    )
}

export default Board;