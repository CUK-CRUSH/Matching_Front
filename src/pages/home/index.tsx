import ProfileCard from '@/components/profileCard/profileCard';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import Layout from '@/components/layout/layout';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface ToDosDTO {
  id: number;
  priority: number;
  content: string;
  // user_id: string;
  created_at: string;
}

export default function Home() {
  const [todos, setTodos] = useState<ToDosDTO[]>([]);
  const [newTodoContent, setNewTodoContent] = useState<string>('');
  const [newTodoPriority, setNewTodoPriority] = useState<number>(1);

  const addNewTodo = async () => {
    const { data, error } = await supabase
      .from('todos')
      .insert([{ content: newTodoContent, priority: newTodoPriority }]);
    if (error) {
      console.error('Error adding new todo:', error);
    } else {
      // 상태를 업데이트하여 새로운 할 일을 목록에 추가합니다.
      setTodos([...todos, ...(data ?? [])]);
      setNewTodoContent(''); // 입력 필드를 초기화합니다.
      setNewTodoPriority(1); // 우선순위를 초기화합니다.
    }
  };
  useEffect(() => {
    async function getTodos() {
      const { data, error } = await supabase.from('todos').select('*');

      if (error) {
        console.error('Error fetching todos:', error);
      } else {
        setTodos(data || []);
      }
    }

    getTodos();
  }, []);

  return (
    <Layout display="both">
      <Header />
      <ProfileCard />
      <div>
        <h1>To-Do List</h1>
        <input
          type="text"
          value={newTodoContent}
          onChange={(e) => setNewTodoContent(e.target.value)}
          placeholder="Add new todo content"
        />
        <input
          type="number"
          value={newTodoPriority}
          onChange={(e) => setNewTodoPriority(Number(e.target.value))}
          min="1"
          placeholder="Priority"
        />
        <button onClick={addNewTodo}>Add Todo</button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.content} - Priority: {todo.priority}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </Layout>
  );
}
