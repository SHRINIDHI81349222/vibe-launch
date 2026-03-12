"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminDashboard() {
  const [signups, setSignups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This function fetches all rows from the 'waitlist' table
    const fetchSignups = async () => {
      const { data, error } = await supabase
        .from("waitlist")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setSignups(data);
      }
      setLoading(false);
    };

    fetchSignups();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 border-b border-gray-800 pb-4">
          Admin Dashboard <span className="text-blue-500 text-sm">({signups.length} users)</span>
        </h1>

        {loading ? (
          <p>Loading the vibe...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 border-b border-gray-800">
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Joined At</th>
                </tr>
              </thead>
              <tbody>
                {signups.map((user) => (
                  <tr key={user.id} className="border-b border-gray-900 hover:bg-gray-900/50 transition">
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4 text-gray-400">{user.name || "N/A"}</td>
                    <td className="py-3 px-4 text-xs text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}