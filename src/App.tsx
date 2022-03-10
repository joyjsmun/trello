import React from 'react';
import {DragDropContext,DropResult} from "react-beautiful-dnd";
import { useRecoilState} from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';
import Board from './Components/Board';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const Boards = styled.div`
  display: grid;
  padding:20px 10px;
  gap:15px;
  width: 100%;
  grid-template-columns: repeat(3,1fr);
`




function App() {
  const [toDos,setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info:DropResult) =>{
      console.log(info);
      const {destination,source,draggableId} = info;
      if(!destination) return;
      if(destination?.droppableId === source.droppableId){
        //same board movement
         setToDos((allBoards:any) => {
        const boardCopy = [...allBoards[source.droppableId]]
        //1)delete item
        boardCopy.splice(source.index,1);
        //2)put back to the item on destination index
        boardCopy.splice(destination?.index,0,draggableId);
        //...allBoards => other two boards - #6.9
        return {
          ...allBoards,
          [source.droppableId]:boardCopy
        };
      })
    }
      if(destination.droppableId !== source.droppableId){
        //cross board movement => two copy need
        setToDos((allBoard) => {
          //1) copy two boards
          const sourceBoardCopy = [...allBoard[source.droppableId]];
          const destinationBoardCopy = [...allBoard[destination.droppableId]];
          //2) remove item from source board
          sourceBoardCopy.splice(source.index,1);
          //3) add source bord removed item to the destination board
          destinationBoardCopy.splice(destination?.index,0,draggableId);
          //4) return previous board + new dest board + other boards(=allBoards)
          return {
            ...allBoard,
            [source.droppableId]:sourceBoardCopy,
            [destination.droppableId]:destinationBoardCopy,
          }
        })
      }
    };
     

  return <DragDropContext onDragEnd={onDragEnd}>
    <Wrapper>
      <Boards>
      {Object.keys(toDos).map(boardId => <Board boardId={boardId} key={boardId} toDos={toDos[boardId]}/>)}
      </Boards>
    </Wrapper>
  </DragDropContext>
  
}

export default App;
