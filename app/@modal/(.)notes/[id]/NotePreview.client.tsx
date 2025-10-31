"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import css from "../../../notePreview.module.css";
import { Note } from "@/types/note";

type Props = {
  note: Note;
};

export default function NotePreview({}: Props) {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: noteData, isLoading, error } = useQuery({
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

  if (error || !noteData)
    return (
      <Modal open={true} onClose={handleClose}>
        Error loading note.
      </Modal>
    );

  return (
    <Modal open={true} onClose={handleClose}>
      <div className={css.container}>
        <h2 className={css.header}>{noteData.title}</h2>
        <p className={css.content}>{noteData.content}</p>
           <p className={css.tag}><b>Tag:</b> {noteData.tag}</p>
      <small className={css.date}>
        {noteData.updatedAt ? `Updated at: ${noteData.updatedAt}` : `Created at: ${noteData.createdAt}`}
      </small>
      </div>
    </Modal>
  );
}
