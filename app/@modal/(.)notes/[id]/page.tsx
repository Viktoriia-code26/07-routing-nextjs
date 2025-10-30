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
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <p>{note.updatedAt || note.createdAt}</p>
      </div>
    </Modal>
  );
}
