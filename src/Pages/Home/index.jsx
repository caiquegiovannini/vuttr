import React, { useEffect, useState } from 'react';

import { getTools } from '../../services/api';

import Loading from '../../components/Loading';
import Tool from '../../components/Tool';
import AddNewTool from '../../components/AddNewTool';
import Input from '../../components/Input';
import Button from '../../components/Button';

import './styles.css';

const Home = () => {
  const [allTools, setAllTools] = useState();
  const [listedTools, setListedTools] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [tagsOnly, setTagsOnly] = useState(false);

  function handleAddNewTool() {
    setModalIsOpen(true);
  }

  function searchByTagsOnly(inputText) {
    if (inputText === '') {
      return allTools;
    }

    const searchedTools = allTools.filter((tool) => (
      tool.tags.includes(inputText.toLowerCase())
    ));

    return searchedTools;
  }

  function searchByTitleAndTag(inputText) {
    const resultsByTitle = allTools.filter((tool) => (
      tool.title.toLowerCase().includes(inputText.toLowerCase())
    ));
    const resultsByTags = searchByTagsOnly(inputText);
    const allResults = [...resultsByTitle, ...resultsByTags];
    const allUniqueResults = [...new Set(allResults)];

    return allUniqueResults;
  }

  function handleSearch(event) {
    const inputText = event.target.value;
    setSearchInput(inputText);

    if (tagsOnly) {
      const resultByTags = searchByTagsOnly(inputText);

      setListedTools(resultByTags);
    } else {
      const allResults = searchByTitleAndTag(inputText);

      setListedTools(allResults);
    }
  }

  useEffect(() => {
    async function fetchAllTolls() {
      const data = await getTools();

      setAllTools(data);
      setListedTools(data);
    }

    fetchAllTolls();
  }, [setAllTools, setListedTools, modalIsOpen]);

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
            value={searchInput}
            onChange={(event) => handleSearch(event)}
          />
          <Input
            id="tags-only"
            className="actions__search__checkbox"
            type="checkbox"
            label="search in tags only"
            value={tagsOnly}
            onChange={() => setTagsOnly(!tagsOnly)}
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

      {listedTools ? (
        <section className="tools-list" data-testid="tools-list">
          {listedTools.map((tool) => <Tool key={tool.id} tool={tool} />)}
        </section>
      )
        : <Loading />}

      {
        modalIsOpen
        && (
          <AddNewTool
            isOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
          />
        )
      }

    </section>
  );
};

export default Home;
