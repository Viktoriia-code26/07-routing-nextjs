"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchNotesByTag } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Pagination from "@/components/Pagination/Pagination";
import type { ApiNoteResponse } from "@/lib/api";

export default function FilteredNotesPage() {
  const params = useParams<{ slug?: string[] }>();
  const tag = Array.isArray(params?.slug) && params.slug.length > 0 ? params.slug[0] : "all";

  console.log("✅ Current tag:", tag);

  const [notesData, setNotesData] = useState<ApiNoteResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    fetchNotesByTag(tag === "all" ? undefined : tag, currentPage)
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
  }, [tag, currentPage]);

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage />;
  if (!notesData?.notes?.length) return <p>No notes found for {tag}.</p>;

  return (
    <div key={tag}>
      <Pagination
        currentPage={currentPage}
        totalPages={notesData.totalPages}
        onPageChange={setCurrentPage}
      />
      <NoteList notes={notesData.notes} />
    </div>
  );
}
