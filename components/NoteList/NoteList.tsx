
import css from "../NoteList/NoteList.module.css";
import type { Note } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../lib/api";
import Link from "next/link";

interface NoteListProps{
  notes: Note[];
}

export default function NoteList({ notes}: NoteListProps) {

  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
    onError: (error) => {
      console.error("Error deleting note:", error);
    },
  });

 
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem} >
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            {note.id && (
            <Link href={`/notes/${note.id}`} className={css.link}>
              View details
           </Link>
             )}
            <button
              type="button"
              onClick={() => deleteNoteMutation.mutate(note.id)}
              className={css.button}
              disabled={deleteNoteMutation.isPending}
            >
              {deleteNoteMutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

