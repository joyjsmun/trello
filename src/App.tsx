import React from 'react';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import styled from 'styled-components';

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

const toDos = ["a","b","c","d","e"]


function App() {
  const onDragEnd = () =>{

  }

  return <DragDropContext onDragEnd={onDragEnd}>
    <Wrapper>
      <Boards>
      <Droppable droppableId='one'>
        {(provided) =>
      <Board ref={provided.innerRef} {...provided.droppableProps}>
       {toDos.map((toDo,index) => <Draggable draggableId={toDo} index={index}>
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
