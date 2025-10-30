"use client"

import css from "../../NotesPage.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDebounce } from "use-debounce";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import NoteModal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

import { fetchNotes } from "@/lib/api";

const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
};

export default function NotesClient() {
  const { isOpen, open, close } = useToggle();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 600);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    setCurrentPage(1);
  };

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["notes", debouncedSearch, currentPage],
    queryFn: () => fetchNotes({ query: debouncedSearch, currentPage }),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleCreateNote = () => close();

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} searchQuery={searchTerm} />

        {totalPages > 1 && notes.length > 0 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <button className={css.button} onClick={open}>
          + Create Note
        </button>
      </header>

      <main className={css.main}>
        {(isLoading || isFetching) && <Loader />}
        {error && <ErrorMessage />}

        {!isLoading && notes.length > 0 ? (
          <NoteList notes={notes} />
        ) : (
          !isLoading && <p className={css.empty}>No notes found.</p>
        )}
      </main>

      {isOpen && (
        <NoteModal open={isOpen} onClose={close}>
          <NoteForm onClose={close} onSuccess={handleCreateNote} />
        </NoteModal>
      )}

      <Toaster position="top-right" />
    </div>
  );
}