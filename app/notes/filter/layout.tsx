import { ReactNode } from "react";
import SidebarNotes from "./@sidebar/default";
import css from "../layoutNotes.module.css"

type Props = {
  children: ReactNode;
  modal?: ReactNode;
  params: { tag?: string | string[] };
};

export default async function FilterLayout({ children, modal, params }: Props) {
  const resolvedParams = await Promise.resolve(params); 
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
