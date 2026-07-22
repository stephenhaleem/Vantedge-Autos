import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
import { fetchCars, deleteCar, formatPrice } from "@/lib/cars";
import { supabase } from "@/lib/supabase";
import { Edit3, Trash2, Lock, LogOut, Mail } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin — Vantedge Automotive" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const queryClient = useQueryClient();
  useEffect(() => {
    const loadSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setAuthenticated(!!session);
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const { data: cars = [], isLoading } = useQuery({
    queryKey: ["cars"],
    queryFn: fetchCars,
    enabled: authenticated,
    staleTime: 10_000,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoggingIn(false);
    if (error) {
      setLoginError(error.message);
      return;
    }

    setPassword("");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete "${name}"? This action cannot be undone.`)) {
      deleteMutation.mutate(id);
    }
  };

  if (!authenticated) {
    return (
      <div className="bg-ghost">
        <section className="mx-auto flex min-h-[70vh] max-w-md items-center px-6 pb-32 pt-24">
          <div className="w-full animate-reveal">
            <div className="mb-8 flex items-center gap-3">
              <Lock className="h-5 w-5 text-silver" strokeWidth={1.5} />
              <p className="text-[10px] uppercase tracking-[0.35em] text-silver">Admin Access</p>
            </div>
            <h1 className="mb-8 font-heading text-4xl font-light tracking-tighter md:text-5xl">
              Authenticate.
            </h1>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="mb-3 block text-[10px] font-medium uppercase tracking-[0.3em] text-silver">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-silver"
                    strokeWidth={1.5}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    autoFocus
                    required
                    className="w-full border-b border-onyx/15 bg-transparent py-3 pl-7 text-sm outline-none transition-colors focus:border-onyx placeholder:text-silver"
                  />
                </div>
              </div>
              <div>
                <label className="mb-3 block text-[10px] font-medium uppercase tracking-[0.3em] text-silver">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full border-b border-onyx/15 bg-transparent py-3 text-sm outline-none transition-colors focus:border-onyx placeholder:text-silver"
                />
              </div>
              {loginError && (
                <p className="text-[11px] uppercase tracking-[0.2em] text-red-500">{loginError}</p>
              )}
              <button
                type="submit"
                disabled={loggingIn}
                className="group relative inline-flex h-14 w-full items-center justify-center overflow-hidden bg-onyx text-[11px] font-medium uppercase tracking-[0.25em] text-ghost disabled:opacity-50"
              >
                <span className="absolute inset-0 -translate-x-full bg-champagne transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative transition-colors duration-500 group-hover:text-onyx">
                  {loggingIn ? "Signing in..." : "Enter Dashboard"}
                </span>
              </button>
            </form>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-ghost">
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-24">
        <div className="flex items-start justify-between">
          <div className="animate-reveal">
            <p className="text-[10px] uppercase tracking-[0.35em] text-silver">Restricted</p>
            <h1 className="mt-4 font-heading text-5xl font-light leading-none tracking-tighter md:text-6xl">
              Admin <span className="italic">Dashboard.</span>
            </h1>
            <p className="mt-6 text-sm text-silver">
              {cars.length} {cars.length === 1 ? "vehicle" : "vehicles"} in the collection
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 border border-onyx/15 px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.25em] transition-colors hover:border-onyx"
          >
            <LogOut className="h-3.5 w-3.5" strokeWidth={1.5} />
            Logout
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-32">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex h-16 animate-pulse items-center border-b border-onyx/5 px-4"
              >
                <div className="h-4 w-full max-w-[200px] rounded bg-onyx/10" />
              </div>
            ))}
          </div>
        ) : cars.length === 0 ? (
          <div className="border border-dashed border-onyx/15 py-24 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-silver">No Vehicles</p>
            <p className="mt-4 font-heading text-2xl font-light">The collection is empty.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="border-b border-onyx/10 text-left">
                  <th className="py-4 pr-4 text-[10px] font-medium uppercase tracking-[0.25em] text-silver">
                    Vehicle
                  </th>
                  <th className="py-4 pr-4 text-[10px] font-medium uppercase tracking-[0.25em] text-silver">
                    Make
                  </th>
                  <th className="py-4 pr-4 text-[10px] font-medium uppercase tracking-[0.25em] text-silver">
                    Model
                  </th>
                  <th className="py-4 pr-4 text-[10px] font-medium uppercase tracking-[0.25em] text-silver">
                    Year
                  </th>
                  <th className="py-4 pr-4 text-[10px] font-medium uppercase tracking-[0.25em] text-silver">
                    Category
                  </th>
                  <th className="py-4 pr-4 text-[10px] font-medium uppercase tracking-[0.25em] text-silver">
                    Price
                  </th>
                  <th className="py-4 text-right text-[10px] font-medium uppercase tracking-[0.25em] text-silver">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-onyx/5">
                {cars.map((car) => (
                  <tr key={car.id} className="group transition-colors hover:bg-onyx/[0.02]">
                    <td className="py-5 pr-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-16 shrink-0 overflow-hidden">
                          <img
                            src={car.images[0]}
                            alt={car.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <span className="font-heading text-base font-medium tracking-tight">
                          {car.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 pr-4 text-sm text-silver">{car.make}</td>
                    <td className="py-5 pr-4 text-sm text-silver">{car.model}</td>
                    <td className="py-5 pr-4 text-sm">{car.year}</td>
                    <td className="py-5 pr-4">
                      <span className="rounded-full border border-onyx/10 px-3 py-1 text-[10px] uppercase tracking-[0.15em]">
                        {car.category}
                      </span>
                    </td>
                    <td className="py-5 pr-4 text-sm">{formatPrice(car.price)}</td>
                    <td className="py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to="/admin/edit/$carId"
                          params={{ carId: car.id }}
                          className="inline-flex h-8 w-8 items-center justify-center border border-onyx/15 text-onyx/60 transition-colors hover:border-onyx hover:text-onyx"
                          aria-label={`Edit ${car.name}`}
                        >
                          <Edit3 className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(car.id, car.name)}
                          disabled={deleteMutation.isPending}
                          className="inline-flex h-8 w-8 items-center justify-center border border-onyx/15 text-onyx/60 transition-colors hover:border-red-500 hover:text-red-500 disabled:opacity-40"
                          aria-label={`Delete ${car.name}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {deleteMutation.isPending && (
          <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-silver">
            Deleting vehicle\u2026
          </p>
        )}
        {deleteMutation.isError && (
          <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-red-500">
            Failed to delete. Check console for details.
          </p>
        )}
      </section>
    </div>
  );
}
