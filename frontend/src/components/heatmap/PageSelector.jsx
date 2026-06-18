export default function PageSelector({
  pages,
  selectedPage,
  loading,
  onPageChange,
}) {
  return (
    <div className="rounded-xl border border-[#fcfcfc] bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.08)] md:rounded-card md:p-7">
      <div>
        <label className="mb-3 block text-sm font-bold text-text">
          Select Page URL
        </label>

        <div className="relative">
          <select
            value={selectedPage}
            onChange={(e) => onPageChange(e.target.value)}
            disabled={loading}
            className="min-h-13 w-full appearance-none rounded-[18px] border border-[#e5e7eb] bg-white px-4 pr-12 text-sm font-semibold text-text outline-none transition duration-200 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,137,247,0.12)] disabled:cursor-not-allowed disabled:bg-[#f8fbff] disabled:text-[#999999]"
          >
            <option value="">
              {loading ? "Loading page URLs..." : "Choose a page URL"}
            </option>

            {pages.map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>

          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-primary">
            ↓
          </span>
        </div>
      </div>

      {!loading && pages.length === 0 && (
        <div className="mt-6 flex min-h-40 items-center justify-center rounded-[28px] border border-dashed border-[#dbeafe] bg-[#f8fbff] px-6 text-center text-sm font-medium leading-6 text-text-secondary">
          No tracked page URLs found. Open the demo page and click around to
          generate heatmap data.
        </div>
      )}
    </div>
  );
}
