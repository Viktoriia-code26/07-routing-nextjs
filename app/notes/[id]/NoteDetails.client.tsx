
"use client";

import css from "../NoteDetails.page.module.css"
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById } from "@/lib/api";



const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  
  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

 const handleGoBack = () => {
    const isSure = confirm('Are you sure?');
    if (isSure) router.back();
  };

  if (isLoading) return <p>Loading...</p>;

  if (error || !note) return <p>Some error..</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
  <div className={css.container}>
	<div className={css.item}>
        <div className={css.header}>
          <button onClick={handleGoBack}>Back</button>
          <h2>{ note.title}</h2>
	  </div>
        <p className={css.content}>{note.content }</p>
        <p className={css.date}>{formattedDate }</p>
	</div>
</div>
  );
};

export default NoteDetailsClient;
