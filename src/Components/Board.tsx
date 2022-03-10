import {Droppable} from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  padding-top: 30px;
  padding: 20px 10px;
  border-radius: 5px;
  min-height: 200px;
  background-color: ${(props) => props.theme.boardColor};
`
interface IBoardProps{
    toDos:string[];
    boardId:string;
}

const Title = styled.h1`
    text-align: center;
`



function Board({toDos,boardId}:IBoardProps){
    return(
        <Wrapper>
        <Title>{boardId}</Title>
        <Droppable droppableId={boardId}>
        {(provided) =>
      <div style={{background:"red"}} ref={provided.innerRef} {...provided.droppableProps}>
          
       {toDos.map((toDo:any,index:any) => 
      <DraggableCard key={toDo} toDo={toDo} index={index}/>
       )}
       {provided.placeholder}
      </div>
      }</Droppable>
      </Wrapper>
    )
}

export default Board;