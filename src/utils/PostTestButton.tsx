import { useState } from 'react';
import axios from 'axios';

type ResponseType = {
  message?: string;
  data?: any;
  error?: string;
};

const PostButton = () => {
  const [response, setResponse] = useState<ResponseType | null>(null);

  const handlePostRequest = async () => {
    const data = {
      question: 'What is your favorite color?',
      answer: 'Blue',
    };

    try {
      const res = await axios.post('/v1/user', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setResponse({ message: res.data.message, data: res.data.data });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setResponse({ error: error.message });
      } else {
        setResponse({ error: 'An unexpected error occurred' });
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button onClick={handlePostRequest} className="bg-blue-500 text-white px-4 py-2 rounded">
        Send Question and Answer
      </button>
      {response && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PostButton;
