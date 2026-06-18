import { FiGlobe } from "react-icons/fi";
export default function PageSelector({
  pages,
  selectedPage,
  loading,
  onPageChange,
}) {
  return (
    <div className="rounded-xl border border-[#ebe8e8] bg-[#f8fbff] p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-full bg-[#eef6ff] p-2">
          <FiGlobe className="text-primary" />
        </div>

        <label className="text-sm font-medium text-gray-700">
          Select Page URL
        </label>
      </div>

      <div className="relative">
        <select
          value={selectedPage}
          onChange={(e) => onPageChange(e.target.value)}
          disabled={loading}
          className="w-full pr-10 text-sm  gap-3 rounded-xl px-5 py-4  border border-[#fcfcfc] bg-[#f8fbff] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] "
        >
          <option value="">
            {loading ? "Loading pages..." : "Choose a page"}
          </option>

          {pages.map((page) => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </select>
      </div>

      {!loading && pages.length === 0 && (
        <div className="mt-4 rounded-lg border border-dashed p-4 text-center text-sm text-gray-500">
          No tracked pages found.
        </div>
      )}
    </div>
  );
}
