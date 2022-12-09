import Head from 'next/head'
import Image from 'next/image'
import {useState} from 'react';
import {v4 as uuidv4} from 'uuid';

import {selectTodo, addTodoItem, updateTodoItemStatus, removeTodoItem} from '../redux/todoSlice';

import {useAppDispatch, useAppSelector} from '../hooks/reduxHook'

export default function Home () {
  const [input, setInput] = useState<string>('');

  const todoList = useAppSelector(selectTodo);

  const dispatch = useAppDispatch();

  /* react hook code version
  const [input, setInput] = useState<string>('');

  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  const todoItemHandler = function () {
    if (!input) {
      return alert('todo item cannot be empity!');
    }

    const todoItem: TodoItem = {
      id: uuidv4(),
      text: input,
      status: 'listed'
    };

    const updatedTodoList = [...todoList, todoItem];

    return setTodoList(updatedTodoList);
  };

  const todoItemStatusHandler = function (currentItem: TodoItem) {
    setTodoList(todoList.map(item => {
      if (item.id === currentItem.id) {
        return {id: item.id, text: item.text, status: item.status === 'listed' ? 'finished' : 'listed'};
      } else {
        return item;
      }
    }));
  };

  const removeTodoItemHandler = function (currentItem: TodoItem) {
    return setTodoList(todoList.filter((item) => {
      return item.id !== currentItem.id;
    }));
  };
  */

  return (
    <main>
      <div className='flex justify-center align-middle w-full h-screen items-center bg-gray-100 '>
        <div className='flex flex-col w-[390px] h-[800px] bg-white rounded-3xl justify-between items-center shadow-md shadow-slate-300'>
          <div className='flex flex-col w-11/12'>
            <div className='w-full mt-8 mb-8'>
              <h1 className='font-semibold text-4xl text-gray-600'>Todo list</h1>
            </div>
            <div className='w-full max-h-[620px] overflow-y-scroll scrollbar-hide'>
              <ul>
                {todoList.map(item => {
                  return (
                    <>
                      <li key={item.id} className='mb-4'>
                        <div className='flex justify-between'>
                          <div className='flex items-center'>
                            <div  onClick={() => dispatch(updateTodoItemStatus({id: item.id}))}>
                              {item.status === 'listed' ? (
                                <div className='border-solid border-2 border-slate-500 rounded-full cursor-pointer mr-3 h-[23px] w-[23px]'></div>
                              ) : (
                                <div className='border-solid border-2 border-slate-500 bg-green-400 rounded-full cursor-pointer mr-3 h-[23px] w-[23px]'></div>
                              )}
                            </div>
                            <div>
                              <span className='font-semibold text-gray-600'>{item.text}</span>
                            </div>
                          </div>
                          <div className='cursor-pointer' onClick={() => dispatch(removeTodoItem({id: item.id}))}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </div>
                        </div>
                      </li>
                    </>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className='flex justify-between w-11/12 mb-6'>
            <div className='w-full'>
              <input className='font-semibold outline-none w-full' type="text" name="todo-item" value={input} onChange={(event) => {setInput(event.target.value)}} placeholder='Add to do item...'/>
            </div>
            <div className='pl-4 cursor-pointer' onClick={() => dispatch(addTodoItem({text: input}))}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
