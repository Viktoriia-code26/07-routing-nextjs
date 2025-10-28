// app/notes/layout.tsx
import { ReactNode } from "react";
import SidebarNotes from "./filter/@sidebar/default";
import css from "./layoutNotes.module.css";

interface Props {
  children: ReactNode;
  params: Promise<{ tag?: string | string[] }>;
}

export default async function FilterLayout({ children, params }: Props) {
  const resolvedParams = await params;
  const currentTag = Array.isArray(resolvedParams?.tag)
    ? resolvedParams.tag[0]
    : resolvedParams?.tag ?? "";

  return (
    <div className={css.container}>
      <aside className={css.sidebar}>
        <SidebarNotes currentTag={currentTag} />
      </aside>
      <main className={css.notesWrapper}>{children}</main>
    </div>
  );
}
