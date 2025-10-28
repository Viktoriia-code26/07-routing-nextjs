"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import css from "../../../notePreview.module.css";

export default function NotePreview() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  
  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
    enabled: !!id, 
  });

  if (!id) return null;
  
  const handleClose = () => {
    router.back();
  };

  if (isLoading) return <p>Loading...</p>;
  if (error || !note) return <p>Error loading note.</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <Modal open={true} onClose={handleClose} key={note.id}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{formattedDate}</p>
           {note.tag && <span className={css.tag}>Tag: {note.tag}</span>}
        </div>
      </div>
    </Modal>
  );
}
