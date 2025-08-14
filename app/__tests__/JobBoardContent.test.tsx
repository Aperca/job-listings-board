import React from "react";
import { render } from "@testing-library/react";
import JobBoardContent from "../components/JobBoardContent";

jest.mock("../src/components/JobCard", () => ({
  JobCard: ({ job }: any) => <div data-testid="job-card">{job.title}</div>
}));

describe("JobBoardContent", () => {
  it("renders job cards when jobs exist", () => {
    const jobs = [
      { id: "1", title: "Dev", orgName: "", location: "", description: "", postedDate: "", image: "" }
    ];

    const { getByTestId } = render(<JobBoardContent jobs={jobs} />);
    expect(getByTestId("job-card")).toBeInTheDocument();
  });

  it("shows no jobs found message when empty", () => {
    const { getByText } = render(<JobBoardContent jobs={[]} />);
    expect(getByText(/No jobs found/i)).toBeInTheDocument();
  });
});
