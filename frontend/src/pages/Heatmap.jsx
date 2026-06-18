import { useEffect, useState } from "react";
import { api } from "../lib/api";
import PageSelector from "../components/heatmap/PageSelector";
import ClickMap from "../components/heatmap/ClickMap";
import { FiMousePointer } from "react-icons/fi";

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
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-blue-50 p-2">
          <FiMousePointer className="text-xl text-primary" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">Heatmap View</h1>

          <p className="mt-1 text-gray-600">
            Select a page URL and view click positions.
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        {/* Left */}
        <div className="flex-1">
          <PageSelector
            pages={pages}
            selectedPage={selectedPage}
            loading={loadingPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <ClickMap
        selectedPage={selectedPage}
        clicks={clicks}
        loading={loadingClicks}
      />
    </section>
  );
}
