import React from 'react';
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const Boards = styled.div`
  display: grid;
  padding:20px 10px;
  width: 100%;
  grid-template-columns: repeat(1,1fr);
`

const Board = styled.div`
  padding-top: 30px;
  padding: 20px 10px;
  border-radius: 5px;
  min-height: 200px;
  background-color: ${(props) => props.theme.boardColor};
`
const Card = styled.div`
border-radius: 5px;
padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 10px;
`


function App() {
  const [toDos,setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({draggableId,destination,source}:DropResult) =>{
      if(!destination) return;
      setToDos((oldToDos:any) => {
        const copyToDos = [...oldToDos];
        //1)delete item
        copyToDos.splice(source.index,1);
        //2)put back to the item on destination index
        copyToDos.splice(destination?.index,0,draggableId);
        return copyToDos;
      })
  }

  return <DragDropContext onDragEnd={onDragEnd}>
    <Wrapper>
      <Boards>
      <Droppable droppableId='one'>
        {(provided) =>
      <Board ref={provided.innerRef} {...provided.droppableProps}>
       {toDos.map((toDo:any,index:any) => <Draggable key={toDo} draggableId={toDo} index={index}>
          {(provided) => 
        <Card 
          ref={provided.innerRef} 
          {...provided.draggableProps} 
          {...provided.dragHandleProps}
          >
            <span></span>
            {toDo}</Card>
        }</Draggable>
       )}
       {provided.placeholder}
      </Board>
      }</Droppable>
      </Boards>
    </Wrapper>
  </DragDropContext>
  
}

export default App;
