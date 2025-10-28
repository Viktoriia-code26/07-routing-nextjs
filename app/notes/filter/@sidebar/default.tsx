import css from "../../../sidebarNotes.module.css";
import Link from "next/link";

const TAGS = ["Work", "Personal", "Meeting", "Shopping", "Todo"];

interface SidebarNotesProps {
  currentTag: string;
}

export default function SidebarNotes({ currentTag }: SidebarNotesProps) {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link
          href={`/notes/filter/all`}
          className={`${css.menuLink} ${currentTag === "all" ? css.active : ""}`}
        >
          All notes
        </Link>
      </li>

      {TAGS.map(tag => (
        <li
          key={tag}
          className={`${css.menuItem} ${
            currentTag.toLowerCase() === tag.toLowerCase() ? css.active : ""
          }`}
        >
          <Link
            href={`/notes/filter/${tag}`}
            className={css.menuLink}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
