import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BookmarkButton  from "../components/BookmarkButton";
import { useBookmarks } from "../context/BookmarkContext";

// Mock context hook
jest.mock("../src/app/context/BookmarkContext");

describe("BookmarkButton", () => {
  it("renders filled icon when bookmarked", () => {
    (useBookmarks as jest.Mock).mockReturnValue({
      isBookmarked: () => true,
      toggleBookmark: jest.fn()
    });

    const { getByTestId } = render(<BookmarkButton jobId="123" />);
    expect(getByTestId("bookmark-filled")).toBeInTheDocument();
  });

  it("renders empty icon when not bookmarked", () => {
    (useBookmarks as jest.Mock).mockReturnValue({
      isBookmarked: () => false,
      toggleBookmark: jest.fn()
    });

    const { getByTestId } = render(<BookmarkButton jobId="123" />);
    expect(getByTestId("bookmark-empty")).toBeInTheDocument();
  });

  it("calls toggleBookmark on click", () => {
    const toggleMock = jest.fn();
    (useBookmarks as jest.Mock).mockReturnValue({
      isBookmarked: () => false,
      toggleBookmark: toggleMock
    });

    const { getByRole } = render(<BookmarkButton jobId="123" />);
    fireEvent.click(getByRole("button"));

    expect(toggleMock).toHaveBeenCalledWith("123");
  });
});
