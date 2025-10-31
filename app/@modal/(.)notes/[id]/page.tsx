import NotePreviewClient from './NotePreview.client';
import { fetchNoteById } from '@/lib/api';
import { Note } from '@/types/note';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreview({ params }: Props) {
  
  const { id } = await params;

  const note: Note | null = await fetchNoteById(id);

  if (!note) return <p>Note not found</p>;

  return <NotePreviewClient note={note} />;
}
