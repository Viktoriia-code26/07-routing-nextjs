// app/notes/layout.tsx
import { ReactNode } from "react";
import SidebarNotes from "./filter/@sidebar/default"; 
import css from "./layoutNotes.module.css"; 

interface Props {
  children: ReactNode;
  params: { tag?: string | string[] }; 
}

export default function FilterLayout({ children, params }: Props) {
  
  const currentTag = Array.isArray(params?.tag) ? params.tag[0] : params?.tag ?? "";

  return (
    <div className={css.container}>
      <aside className={css.sidebar}>
        <SidebarNotes currentTag={currentTag} />
      </aside>
      <main className={css.notesWrapper}>
        {children}
      </main>
    </div>
  )
};