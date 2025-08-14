import React from "react";
import { render } from "@testing-library/react";
import JobCard from "../components/JobCard";

jest.mock("../src/components/BookmarkButton", () => ({
  BookmarkButton: () => <div data-testid="bookmark-button" />
}));

describe("JobCard", () => {
  it("displays job details", () => {
    const job = {
      id: "1",
      title: "Software Engineer",
      orgName: "Tech Corp",
      location: "Remote",
      description: "Build amazing stuff",
      postedDate: "2025-08-01",
      image: "logo.png"
    };

    const { getByText, getByTestId } = render(<JobCard job={job} />);
    expect(getByText(/Software Engineer/)).toBeInTheDocument();
    expect(getByText(/Tech Corp/)).toBeInTheDocument();
    expect(getByText(/Remote/)).toBeInTheDocument();
    expect(getByTestId("bookmark-button")).toBeInTheDocument();
  });
});
