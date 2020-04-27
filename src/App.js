import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

const [repositories, setRepositories] = useState([]);

useEffect(() => {
  api.get('repositories').then(response => {
    setRepositories(response.data);
  });
}, []);

function App() {
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Jefferson',
      url: 'https://github.com/JeffersonBraga90',
      techs: ['ReactJS', 'Node.js', 'React-Native']
     });
    
     setRepositories([...repositories, response.data]); 
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newRepositories = repositories.filter(
      repository => repository.id !== id
    )

    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
            </button>
          </li>  
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
