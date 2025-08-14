import React from "react";
import { renderHook, act } from "@testing-library/react";
import { BookmarkProvider, useBookmarks } from "../context/BookmarkContext";

jest.mock("../lib/api/bookmarks", () => ({
    getBookmarks: jest.fn().mockResolvedValue([{ eventId: "123" }]),
    addBookmark: jest.fn().mockResolvedValue({}),
    removeBookmark: jest.fn().mockResolvedValue({})
  }));

  describe("BookmarkContext", () => {
    it("loads bookmarks on mount", async () => {
      const { result } = renderHook(() => useBookmarks(), {
        wrapper: BookmarkProvider
      });
  
      // Wait for initial load
      await act(async () => {});
  
      expect(result.current.isBookmarked("123")).toBe(true);
    });
  
    it("adds a bookmark", async () => {
      const { result } = renderHook(() => useBookmarks(), {
        wrapper: BookmarkProvider
      });
  
      await act(async () => {
        result.current.toggleBookmark("456");
      });
  
      expect(result.current.isBookmarked("456")).toBe(true);
    });
  
    it("removes a bookmark", async () => {
      const { result } = renderHook(() => useBookmarks(), {
        wrapper: BookmarkProvider
      });
  
      await act(async () => {
        result.current.toggleBookmark("123"); // removes because already bookmarked
      });
  
      expect(result.current.isBookmarked("123")).toBe(false);
    });
  });