import React from "react";
import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{isDragging:boolean}>`
border-radius: 5px;
padding: 10px 10px;
  background-color: ${(props) => props.isDragging?  "tomato":props.theme.cardColor };
  margin-bottom: 10px;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`

interface IDraggableCardProps{
    toDoId:number;
    toDoText:string;
    index:number;
}

function DraggableCard({toDoId,toDoText,index}:IDraggableCardProps){
    // console.log(toDo,"rendered")
    return(
        <Draggable draggableId={toDoId+""} index={index}>
          {(provided,info) => 
        <Card 
            isDragging={info.isDragging}
          ref={provided.innerRef} 
          {...provided.draggableProps} 
          {...provided.dragHandleProps}
          >
            <span></span>
            {toDoText}</Card>
        }</Draggable>
    )
}


export default React.memo(DraggableCard);