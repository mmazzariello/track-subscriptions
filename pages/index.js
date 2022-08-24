import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.push("/home");
      } else {
        router.push("/login");
      }
    }

    getInitialSession();
  }, []);

  return null;
  // <div className="container" style={{ padding: "50px 0 100px 0" }}>
  //   {!session ? (
  //     <Auth />
  //   ) : (
  //     <Account session={session} />
  //   )}
  // </div>
}
