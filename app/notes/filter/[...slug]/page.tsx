"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchNotesByTag } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Pagination from "@/components/Pagination/Pagination";
import type { ApiNoteResponse } from "@/lib/api";

export default function FilteredNotesPage() {
  const params = useParams<{ tag?: string[] }>();
  const tagParam = Array.isArray(params?.tag)
    ? params.tag[0]
    : params?.tag || "all";

  const [notesData, setNotesData] = useState<ApiNoteResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return; 
    let isMounted = true;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    fetchNotesByTag(tagParam === "all" ? undefined : tagParam, currentPage)
      .then((data) => {
        if (isMounted) {
          setNotesData(data);
          setError(false);
        }
      })
      .catch(() => {
        if (isMounted) setError(true);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [tagParam, currentPage]);

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage />;
  if (!notesData?.notes?.length) return <p>No notes found.</p>;

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalPages={notesData.totalPages}
        onPageChange={setCurrentPage}
      />
      <NoteList notes={notesData.notes} />
    </div>
  );
}
