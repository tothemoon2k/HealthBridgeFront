import { render, screen } from "@testing-library/react";
import App from "./App";

it("should render the landing page", () => {
    render(<App />);
    const h1 = screen.queryByText(/Get a Verifiable Doctors Note in Under 8 Mins/i);
    expect(h1).toBeVisible();
});