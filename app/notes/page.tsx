import { fetchNotes } from "@/lib/api";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NotesClient from "../notes/filter/[...slug]/Notes.client";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1],
    queryFn: () => fetchNotes({ query: "", currentPage: 1 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}