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
    enabled: !!id,
  });

  const handleClose = () => router.back();

  if (isLoading)
    return (
      <Modal open={true} onClose={handleClose}>
        Loading...
      </Modal>
    );

  if (error || !note)
    return (
      <Modal open={true} onClose={handleClose}>
        Error loading note.
      </Modal>
    );

  return (
    <Modal open={true} onClose={handleClose}>
      <div className={css.container}>
        <h2 className={css.header}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
           <p className={css.tag}><b>Tag:</b> {note.tag}</p>
      <small className={css.date}>
        {note.updatedAt ? `Updated at: ${note.updatedAt}` : `Created at: ${note.createdAt}`}
      </small>
      </div>
    </Modal>
  );
}
