"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import css from "../../../sidebarNotes.module.css";
import { fetchNotes } from "@/lib/api";

interface SidebarNotesProps {
  currentTag?: string;
}

export default function SidebarNotes({ currentTag = "all" }: SidebarNotesProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const normalizedTag = currentTag?.toLowerCase?.() || "all";

  useEffect(() => {
    async function loadTags() {
      try {
        const { notes } = await fetchNotes({}); // Загружаем все заметки
        // Извлекаем уникальные теги из заметок
        const uniqueTags = Array.from(
          new Set(notes.map(note => note.tag).filter(Boolean))
        ) as string[];

        setTags(uniqueTags);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTags();
  }, []);

  if (loading) return <p>Loading tags...</p>;

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link
          href={`/notes/filter/all`}
          className={`${css.menuLink} ${normalizedTag === "all" ? css.active : ""}`}
        >
          All notes
        </Link>
      </li>

      {tags.length > 0 ? (
        tags.map(tag => (
          <li
            key={tag}
            className={`${css.menuItem} ${
              normalizedTag === tag.toLowerCase() ? css.active : ""
            }`}
          >
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))
      ) : (
        <li className={css.menuItem}>
          <span className={css.menuLink}>No tags found</span>
        </li>
      )}
    </ul>
  );
}
