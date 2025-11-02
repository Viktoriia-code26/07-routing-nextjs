import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/getQueryClient";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";


interface FilteredNotesPageProps {
  params: { slug?: string[] };
}
export default async function FilteredNotesPage({params}: FilteredNotesPageProps) {
  
  const resolvedParams = await params;
  const tag = resolvedParams?.slug?.[0] ?? "all";

  const queryClient = getQueryClient();

  console.log("Current tag:", tag);

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag, 1],
    queryFn: () => fetchNotes({ tag: tag === "all" ? undefined : tag, currentPage: 1 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={tag} />
    </HydrationBoundary>
  );
}
