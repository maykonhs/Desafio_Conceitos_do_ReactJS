import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repos, setRepos] = useState([]);
  
  useEffect(() => {
    api.get('/repositories')
    .then(response => {
      setRepos(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: 'newRepo',
      url: 'www.google.com.br',
      techs: [ 'React JS', 'Node Js' ]
    });
    const newRepo = response.data;
    setRepos([ ...repos, newRepo ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const response = await api.get('/repositories');
    const newRepo = response.data;
    setRepos([]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repos.length > 0 && repos.map(repo => (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
