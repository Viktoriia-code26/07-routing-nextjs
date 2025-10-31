import { ReactNode } from "react";
import SidebarNotes from "./@sidebar/default";
import css from "../layoutNotes.module.css";

export default function FilterLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal?: ReactNode;
}) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>
        <SidebarNotes />
      </aside>
      <main className={css.notesWrapper}>{children}</main>
      {modal}
    </div>
  );
}
