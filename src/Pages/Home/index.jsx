import React, { useEffect, useState } from 'react';

import { getTools, removeTool } from '../../services/api';

import Loading from '../../components/Loading';
import ToolCard from '../../components/ToolCard';
import AddNewTool from '../../components/AddNewTool';
import Input from '../../components/Input';
import Button from '../../components/Button';
import RemoveConfirmation from '../../components/RemoveConfirmation';

import './styles.css';

const Home = () => {
  const [allTools, setAllTools] = useState();
  const [listedTools, setListedTools] = useState();
  const [addToolModalIsOpen, setAddToolModalIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [tagsOnly, setTagsOnly] = useState(false);

  const [isRemovalConfirmation, setIsRemovalConfirmation] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [toolToRemove, setToolToRemove] = useState();

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

  function openRemovalConfirmation(tool) {
    setIsRemovalConfirmation(true);
    setToolToRemove(tool);
  }

  async function handleRemove(id) {
    setIsRemoving(true);

    try {
      await removeTool(id);
    } catch (error) {
      console.error(error);
    }

    setIsRemovalConfirmation(false);
    setIsRemoving(false);
  }

  useEffect(() => {
    async function fetchAllTolls() {
      const data = await getTools();

      setAllTools(data);
      setListedTools(data);
    }

    fetchAllTolls();
  }, [setAllTools, setListedTools, addToolModalIsOpen, isRemovalConfirmation]);

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
          onClick={() => setAddToolModalIsOpen(true)}
        >
          + Add
        </Button>
      </div>

      {
        listedTools ? (
          <section className="tools-list" data-testid="tools-list">
            {
              listedTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  openRemovalConfirmation={openRemovalConfirmation}
                />
              ))
            }
          </section>
        )
          : <Loading />
      }

      {
        addToolModalIsOpen
        && (
          <AddNewTool
            isOpen={addToolModalIsOpen}
            setModalIsOpen={setAddToolModalIsOpen}
          />
        )
      }

      {
        isRemovalConfirmation
        && (
          <RemoveConfirmation
            cancel={() => setIsRemovalConfirmation(false)}
            title={toolToRemove.title}
            remove={() => handleRemove(toolToRemove.id)}
            isRemoving={isRemoving}
          />
        )
      }
    </section>
  );
};

export default Home;
