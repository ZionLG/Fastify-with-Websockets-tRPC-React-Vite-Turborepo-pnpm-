import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { trpc } from "@/utils/trpc";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { data } = trpc.test.greeting.useQuery({ name: "Test" });

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      {data && <p>{data.text}</p>}
    </div>
  );
}
