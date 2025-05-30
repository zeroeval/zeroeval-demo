import { Avatar } from "@/components/ui/avatar";

export function ChatHeader() {
  return (
    <div className="px-6 py-4 bg-white border-b">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border-2 border-primary/10">
          <div className="flex items-center justify-center h-full w-full bg-primary/5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
              style={{ shapeRendering: "crispEdges" }}
            >
              {Array.from({ length: 9 }).map((_, i) => {
                // Each cell is 8×8 in a 3×3 grid within a 24×24 viewBox.
                const row = Math.floor(i / 3);
                const col = i % 3;
                const x = col * 8;
                const y = row * 8;

                // Cells 1, 2, 4, 6, 8, 9 are black; the rest are white.
                const cellNumber = i + 1;
                const blackSquares = [1, 2, 4, 6, 8, 9];
                const fillColor = blackSquares.includes(cellNumber)
                  ? "currentColor"
                  : "transparent";

                return (
                  <rect
                    key={i}
                    x={x}
                    y={y}
                    width={8}
                    height={8}
                    fill={fillColor}
                  />
                );
              })}
            </svg>
          </div>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="font-semibold text-sm">Customer Support Agent</h3>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <p className="text-muted-foreground text-xs font-medium">Online</p>
          </div>
        </div>
      </div>
    </div>
  );
}
