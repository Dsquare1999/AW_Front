'use client'
import React, { useState } from 'react';
import { motion, Reorder, PanInfo } from 'framer-motion';

interface Task {
  id: string;
  title: string;
}

interface Board {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
}

interface Boards {
  board1: Board;
  board2: Board;
}

const initialBoards: Boards = {
  board1: {
    todo: [
      { id: '1', title: 'Task 1' },
      { id: '2', title: 'Task 2' },
    ],
    inProgress: [
      { id: '3', title: 'Task 3' },
    ],
    done: [
      { id: '4', title: 'Task 4' },
    ],
  },
  board2: {
    todo: [
      { id: '5', title: 'Task 5' },
      { id: '6', title: 'Task 6' },
    ],
    inProgress: [
      { id: '7', title: 'Task 7' },
    ],
    done: [
      { id: '8', title: 'Task 8' },
    ],
  },
};

const DualKanbanBoard: React.FC = () => {
  const [boards, setBoards] = useState<Boards>(initialBoards);

  const onDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    task: Task,
    fromBoard: keyof Boards,
    fromColumn: keyof Board
  ) => {
    const columns: (keyof Board)[] = ['todo', 'inProgress', 'done'];
    const column = columns[Math.round(info.point.x / (window.innerWidth / 6)) % 3];
    const board: keyof Boards = Math.round(info.point.x / (window.innerWidth / 2)) < 1 ? 'board1' : 'board2';

    if (column !== fromColumn || board !== fromBoard) {
      setBoards((prevBoards) => {
        const newBoards = { ...prevBoards };
        newBoards[fromBoard][fromColumn] = newBoards[fromBoard][fromColumn].filter((t) => t.id !== task.id);
        newBoards[board][column] = [...newBoards[board][column], task];
        return newBoards;
      });
    }
  };

  const handleReorder = (
    board: keyof Boards,
    column: keyof Board,
    newOrder: Task[]
  ) => {
    setBoards((prevBoards) => ({
      ...prevBoards,
      [board]: {
        ...prevBoards[board],
        [column]: newOrder,
      },
    }));
  };

  return (
    <div className="dual-kanban-board">
      {Object.keys(boards).map((boardKey) => {
        const board = boardKey as keyof Boards;
        return (
          <div key={board} className="kanban-board">
            {Object.keys(boards[board]).map((columnKey) => {
              const column = columnKey as keyof Board;
              return (
                <div key={column} className="kanban-column">
                  <h3>{column.replace(/([A-Z])/g, ' $1')}</h3>
                  <Reorder.Group
                    axis="y"
                    values={boards[board][column]}
                    onReorder={(newOrder) => handleReorder(board, column, newOrder)}
                  >
                    {boards[board][column].map((task) => (
                      <Reorder.Item
                        key={task.id}
                        value={task}
                        drag
                        onDragEnd={(event, info) => onDragEnd(event, info, task, board, column)}
                        layout
                        className="kanban-task"
                      >
                        {task.title}
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default DualKanbanBoard;
