import { useEffect } from "react";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { User } from "../types";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  isLastPage: boolean;
  setIsLastPage: React.Dispatch<React.SetStateAction<boolean>>;
  usersForDisplaying: User[];
}

export const Pagination = ({
  currentPage,
  isLastPage,
  setCurrentPage,
  setIsLastPage,
  usersForDisplaying,
}: PaginationProps) => {
  const generatePageNums = () => {
    const pagesCount =
      usersForDisplaying.length % 10 === 0
        ? usersForDisplaying.length / 10
        : Math.floor(usersForDisplaying.length / 10) + 1;

    const prevPages =
      currentPage > 3
        ? [currentPage - 3, currentPage - 2, currentPage - 1, currentPage]
        : currentPage === 3
        ? [1, 2, 3]
        : currentPage === 2
        ? [1, 2]
        : [1];

    const nextPages =
      pagesCount - currentPage >= 3
        ? [currentPage + 1, currentPage + 2, currentPage + 3]
        : pagesCount - currentPage === 2
        ? [currentPage + 1, currentPage + 2]
        : pagesCount - currentPage === 1
        ? [currentPage + 1]
        : [];

    return prevPages.concat(nextPages);
  };

  const handleChoosePage = (num: number) => {
    setCurrentPage(num);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  useEffect(() => {
    setIsLastPage(
      (usersForDisplaying.length % 10 === 0 &&
        usersForDisplaying.length / 10 === currentPage) ||
        (usersForDisplaying.length % 10 !== 0 &&
          Math.floor(usersForDisplaying.length / 10) + 1 === currentPage) ||
        usersForDisplaying.length <= 10
    );
  }, [currentPage, usersForDisplaying]);

  return (
    <Box p="10px 0" borderTop="1px solid black" borderBottom="2px solid black">
      <ButtonGroup>
        <Button isDisabled={currentPage === 1} onClick={handlePrevPage}>
          {"<"}
        </Button>
        {generatePageNums().map((page) => (
          <Button
            key={page}
            colorScheme={currentPage === page ? "green" : "cyan"}
            onClick={() => handleChoosePage(page)}
          >
            {page}
          </Button>
        ))}
        <Button isDisabled={isLastPage} onClick={handleNextPage}>
          {">"}
        </Button>
      </ButtonGroup>
    </Box>
  );
};
