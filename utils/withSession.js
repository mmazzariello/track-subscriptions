import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export const withSession = (WrappedComponent) => {
  return function WithSessionComponent() {
    const [session, setSession] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
      async function getInitialSession() {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          setSession(session);
        } else {
          router.push("/login");
        }
        setIsLoading(false);
      }

      getInitialSession();
    }, []);

    if (isLoading) return <div>Loading session...</div>;

    return <WrappedComponent session={session} />;
  };
};
