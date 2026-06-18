import { HiOutlineCursorClick } from "react-icons/hi";
function getPageDimensions(clicks) {
  const maxX = Math.max(...clicks.map((click) => Number(click.x) || 0), 1000);

  const maxY = Math.max(...clicks.map((click) => Number(click.y) || 0), 600);

  const pageWidth = Math.max(
    ...clicks.map((click) => Number(click.page_width) || 0),
    maxX + 80,
    1000,
  );

  const pageHeight = Math.max(
    ...clicks.map((click) => Number(click.page_height) || 0),
    maxY + 80,
    600,
  );

  return {
    pageWidth,
    pageHeight,
  };
}

function getPositionPercent(value, total) {
  const safeValue = Math.max(0, Math.min(Number(value) || 0, total));
  return `${(safeValue / total) * 100}%`;
}

function getVisualHeight(pageWidth, pageHeight) {
  const ratioHeight = (pageHeight / pageWidth) * 1000;

  return Math.min(Math.max(ratioHeight, 520), 1800);
}

export default function ClickMap({ selectedPage, clicks, loading }) {
  if (!selectedPage) {
    return null;
  }

  const { pageWidth, pageHeight } = getPageDimensions(clicks);
  const visualHeight = getVisualHeight(pageWidth, pageHeight);

  return (
    <div className="mt-5 rounded-xl  border border-[#ebe8e8] bg-[#f8fbff]  p-5 shadow-[0_10px_40px_rgba(0,0,0,0.08)]  md:p-7">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3 min-w-0">
          <div className="rounded-full bg-[#eef6ff] p-2">
            <HiOutlineCursorClick className="text-xl text-primary" />
          </div>

          <div className="min-w-0">
            <h2 className="text-2xl font-bold tracking-[-0.03em] text-text md:text-3xl">
              Full Page Click Positions
            </h2>

            <p className="mt-2 break-all text-sm font-medium leading-6 text-text-secondary">
              {selectedPage}
            </p>
          </div>
        </div>

        <span className="w-fit shrink-0 rounded-full bg-[#eef6ff] px-4 py-2 text-xs font-bold text-primary">
          {clicks.length} clicks
        </span>
      </div>

      {loading ? (
        <div className="flex min-h-65 items-center justify-center rounded-[28px] border border-dashed border-[#dbeafe] bg-[#f8fbff] px-6 text-center text-sm font-medium text-text-secondary">
          Loading click data...
        </div>
      ) : (
        <div className="overflow-hidden rounded-[28px] border border-[#eef6ff] bg-[#f8fbff] shadow-[0_8px_24px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col gap-2 border-b border-[#eef6ff] bg-white px-5 py-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-bold text-text">
              Full page visualization
            </p>

            <p className="text-xs font-semibold text-text-secondary">
              {pageWidth}px × {pageHeight}px
            </p>
          </div>

          <div
            className="relative overflow-hidden bg-white"
            style={{
              height: `${visualHeight}px`,
            }}
          >
            <div
              className="absolute inset-0 opacity-80"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0, 137, 247, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 137, 247, 0.08) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5" />

            {clicks.map((click, index) => (
              <span
                key={`${click.x}-${click.y}-${index}`}
                className="absolute z-10 h-4 w-4 rounded-full bg-primary shadow-[0_0_0_8px_rgba(0,137,247,0.16),0_10px_24px_rgba(0,137,247,0.35)] ring-2 ring-white transition duration-200 hover:scale-125"
                style={{
                  left: getPositionPercent(click.x, pageWidth),
                  top: getPositionPercent(click.y, pageHeight),
                  transform: "translate(-50%, -50%)",
                }}
                title={`x: ${click.x}, y: ${click.y}`}
              />
            ))}

            {clicks.length === 0 && (
              <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
                <div className="rounded-[28px] border border-dashed border-[#dbeafe] bg-white/90 px-6 py-5 text-center shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur">
                  <p className="text-sm font-semibold text-text-secondary">
                    No clicks recorded for this page.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
