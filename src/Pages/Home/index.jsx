import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Tool from '../../components/Tool';
import AddNewTool from '../../components/AddNewTool';
import Input from '../../components/Input';
import Button from '../../components/Button';

import './Home.css';

const Home = () => {
  const allToolsMock = [
    {
      id: 1,
      title: 'Notion',
      link: 'https://notion.so',
      description:
        'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
      tags: ['organization', 'planning', 'collaboration', 'writing', 'calendar'],
    },
    {
      id: 2,
      title: 'json-server',
      link: 'https://github.com/typicode/json-server',
      description:
        'Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.',
      tags: ['api', 'json', 'schema', 'node', 'github', 'rest'],
    },
    {
      id: 3,
      title: 'fastify',
      link: 'https://www.fastify.io/',
      description:
        'Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.',
      tags: ['web', 'framework', 'node', 'http2', 'https', 'localhost'],
    },
  ];
  const [allTools, setAllTools] = useState();
  const [listedTools, setListedTools] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleAddNewTool() {
    setModalIsOpen(true);
  }

  useEffect(() => {
    async function fetchAllTolls() {
      const response = await axios.get('http://localhost:8080/tools');
      const data = await response.data;

      setAllTools(data);
      setListedTools(data);
    }

    fetchAllTolls();
  }, [setAllTools, setListedTools]);

  return (
    <section className="container">
      <header className="header">
        <h1>VUTTR</h1>
        <h3>Very Useful Tools To Remember</h3>
      </header>

      <div className="actions">
        <div className="actions__search">
          <Input
            id="actions__search"
            placeholder="search by title or tag"
            value=""
            onChange={() => { }}
          />
          <Input
            id="tags-only"
            className="actions__search__checkbox"
            type="checkbox"
            label="search in tags only"
            value=""
            onChange={() => { }}
          />
        </div>

        <Button
          className="button button--add"
          type="add"
          onClick={handleAddNewTool}
        >
          + Add
        </Button>
      </div>

      {listedTools && (
        <section className="tools-list" data-testid="tools-list">
          {listedTools.map((tool) => <Tool key={tool.id} tool={tool} />)}
        </section>
      )}

      {
        modalIsOpen
        && (
          <AddNewTool
            isOpen={modalIsOpen}
            onClose={setModalIsOpen}
          />
        )
      }

    </section>
  );
};

export default Home;
