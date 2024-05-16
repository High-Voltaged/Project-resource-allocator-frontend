import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";

interface PaginationProps {
  page: number;
  count: number;
  onChange: (val: number) => void;
}

const MAX_GROUP_COUNT = 3;
const HALF_PAGES_COUNT = Math.ceil(MAX_GROUP_COUNT / 2);

const Pagination: React.FC<PaginationProps> = ({ page, count, onChange }) => {
  const getButton = (current: number) => (
    <IconButton
      className="py-1 px-3 cursor-pointer"
      key={current}
      variant={`${page === current - 1 ? "solid" : "ghost"}`}
      onClick={() => onChange(current - 1)}
    >
      {current}
    </IconButton>
  );

  return (
    <div className="mx-auto w-96 flex flex-row items-center justify-center space-x-4">
      {count > 0 && (
        <IconButton
          className="cursor-pointer"
          variant="ghost"
          disabled={page === 0}
          onClick={() => page > 0 && onChange(page - 1)}
        >
          <ChevronLeftIcon />
        </IconButton>
      )}

      {count <= MAX_GROUP_COUNT + 2 ? (
        Array(count)
          .fill(0)
          .map((_, index) => getButton(index + 1))
      ) : (
        <>
          {getButton(1)}
          {page > HALF_PAGES_COUNT - 1 && <span className="leading-10">...</span>}
          {Array(MAX_GROUP_COUNT)
            .fill(0)
            .map((_, index) => {
              const p = page - HALF_PAGES_COUNT + index + 1;
              console.log({ p });
              return p > 0 && p < count ? getButton(p) : "";
            })}
          {page < count - HALF_PAGES_COUNT - 1 && <span className="leading-10">...</span>}
          {getButton(count)}
        </>
      )}

      {count > 0 && (
        <IconButton
          className="cursor-pointer"
          variant="ghost"
          disabled={page === count - 1}
          onClick={() => page < count - 1 && onChange(page + 1)}
        >
          <ChevronRightIcon />
        </IconButton>
      )}
    </div>
  );
};

export default Pagination;
