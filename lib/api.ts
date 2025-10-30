import axios from "axios";
import type { Note, NewNoteData } from "../types/note";

export interface ApiNoteResponse {
  notes: Note[];
  totalPages: number;
  totalResults: number;
}

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const BASE_URL = "https://notehub-public.goit.study/api/notes";


export async function fetchNotes({
  query = "",
  currentPage = 1,
  perPage = 12,
}: {
  query?: string;
  currentPage?: number;
  perPage?: number;
}): Promise<ApiNoteResponse> {
  const response = await axios.get(BASE_URL, {
    params: {
      search: query || undefined,
      page: currentPage,
      perPage,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Cache-Control": "no-cache",
    },
  });

  const data = response.data;

  return {
    notes: data.results || data.notes || [],
    totalPages: data.totalPages || 1,
    totalResults: data.totalResults || 0,
  };
}


export async function fetchNotesByTag(
  tag?: string,
  currentPage = 1,
  perPage = 12
): Promise<ApiNoteResponse> {
  const response = await axios.get(BASE_URL, {
    params: {
      tag: tag || undefined,
      page: currentPage,
      perPage,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const data = response.data;

  return {
    notes: data.results || data.notes || [],
    totalPages: data.totalPages || 1,
    totalResults: data.totalResults || 0,
  };
}


export async function createNote(newNoteData: NewNoteData): Promise<Note> {
  const response = await axios.post(BASE_URL, newNoteData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete(`${BASE_URL}/${id}`, {
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
