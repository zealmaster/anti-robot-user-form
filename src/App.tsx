import React, { useState } from 'react';
import './App.css';

interface Form {
  name: string;
  email: string;
  password: string;
}

function App() {
  const [formInputs, setFormInputs] = useState<Form>({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({
      ...prev,
      [name]: value, 
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formInputs);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>Anti Robot User Form</h1>
        <label htmlFor='name'>Name
          <input 
            name='name'
            id='name'
            type='text'
            value={formInputs.name}
            onChange={handleInputChange}
            />
          </label>

        <label htmlFor='email'>Email
          <input 
            name='email'
            id='email'
            type='email'
            value={formInputs.email}
            onChange={handleInputChange}
          />
        </label>

        <label htmlFor='password'>Password
          <input 
            name='password'
            id='password'
            type='password'
            value={formInputs.password}
            onChange={handleInputChange}
          />
        </label>

        <div className='button'>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </main>
  );
}

export default App;
