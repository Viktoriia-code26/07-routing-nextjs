import { ReactNode } from "react";
import SidebarNotes from "./@sidebar/default";
import css from "../layoutNotes.module.css"

export default async function FilterLayout({
  children,
  modal,
  params,
}: {
  children: ReactNode;
  modal?: ReactNode;
  params: Promise<{ tag?: string | string[] }>;
}) {
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
      {modal && modal}
    </div>
  );
}
