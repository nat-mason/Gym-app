"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Page() {
  const [users, setUsers] = useState<any[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("users").select("*");
      console.log(data);
      setUsers(data);
    };
    getData();
  }, []);

  return <pre>{JSON.stringify(users, null, 2)}</pre>;
}
