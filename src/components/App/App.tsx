import css from './App.module.css';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import { Toaster } from 'react-hot-toast';
import { useDebounce } from 'use-debounce';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import NoteModal from '../NoteModal/NoteModal';
import SearchBox from '../SearchBox/SearchBox';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 300);

  const { data } = useQuery({
    queryKey: ['notes', debouncedQuery, currentPage],
    queryFn: () => fetchNotes(debouncedQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  function handlePageChange(currentPage: number): void {
    setCurrentPage(currentPage);
  }

  function handleModalOpener(): void {
    setIsModalOpened(true);
  }

  function handleSearchChange(query: string): void {
    setSearchQuery(query);
    setCurrentPage(1);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearchChange={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
        <button className={css.button} onClick={handleModalOpener}>
          Create note +
        </button>
      </header>
      {isModalOpened && <NoteModal onClose={() => setIsModalOpened(false)} />}
      {data && data.notes.length !== 0 && <NoteList notes={data.notes} />}
      <Toaster />
    </div>
  );
}
