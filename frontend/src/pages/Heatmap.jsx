import { useEffect, useState } from "react";

import { api } from "../lib/api";
import PageSelector from "../components/heatmap/PageSelector";
import ClickMap from "../components/heatmap/ClickMap";

export default function Heatmap() {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");
  const [clicks, setClicks] = useState([]);

  const [loadingPages, setLoadingPages] = useState(true);
  const [loadingClicks, setLoadingClicks] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPages() {
      try {
        setLoadingPages(true);
        setError("");

        const res = await api.get("/heatmap/pages");
        setPages(res.data);
      } catch {
        setError("Unable to load page URLs.");
      } finally {
        setLoadingPages(false);
      }
    }

    loadPages();
  }, []);

  async function handlePageChange(page) {
    setSelectedPage(page);
    setClicks([]);

    if (!page) {
      return;
    }

    try {
      setLoadingClicks(true);
      setError("");

      const res = await api.get("/heatmap", {
        params: { page },
      });

      setClicks(res.data);
    } catch {
      setError("Unable to load heatmap data.");
    } finally {
      setLoadingClicks(false);
    }
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <span className="mb-4 inline-flex rounded-full bg-[#eef6ff] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Click Map
          </span>

          <h1 className="text-4xl font-bold tracking-[-0.04em] text-text md:text-5xl lg:text-[54px] lg:leading-[1.15]">
            Heatmap View
          </h1>

          <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-text-secondary md:text-lg">
            Select a tracked page and view click positions as simple blue dots.
          </p>
        </div>

        <div className="w-full rounded-[28px] border border-[#fcfcfc] bg-[#f8fbff] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:w-55 md:rounded-[36px]">
          <p className="text-sm font-bold text-text-secondary">
            Recorded Clicks
          </p>
          <p className="mt-2 text-4xl font-black tracking-[-0.04em] text-primary">
            {clicks.length}
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-3xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}

      <PageSelector
        pages={pages}
        selectedPage={selectedPage}
        loading={loadingPages}
        onPageChange={handlePageChange}
      />

      <ClickMap
        selectedPage={selectedPage}
        clicks={clicks}
        loading={loadingClicks}
      />
    </section>
  );
}
