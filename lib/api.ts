import axios from "axios";
import type { Note, NewNoteData } from "../types/note";

export interface ApiNoteResponse {
  results: Note[] | PromiseLike<Note[]>;
  notes: Note[];
  totalPages: number;
  totalResults?: number; 
}

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const BASE_URL = "https://notehub-public.goit.study/api/notes";

export async function fetchNotes({
  query = "",
  currentPage = 1,
}: {
  query?: string;
  currentPage?: number;
}): Promise<ApiNoteResponse> {
  const response = await axios.get<ApiNoteResponse>(BASE_URL, {
    params: {
      search: query || undefined,
      page: currentPage,
      perPage: 12,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Cache-Control": "no-cache", 
    },
  });
  return response.data;
}

export async function createNote(newNoteData: NewNoteData): Promise<Note> {
  const response = await axios.post<Note>(BASE_URL, newNoteData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return response.data;
}

export const fetchNotesByTag = async (
  tag?: string,
  currentPage: number = 1
): Promise<ApiNoteResponse> => {
  const response = await axios.get<ApiNoteResponse>(BASE_URL, {
    params: {
      perPage: 12,
      page: currentPage,
      tag: tag || undefined,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return response.data;
};