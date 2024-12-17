import { describe, expect, test } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {LandingA, LandingB} from './Landing';
import { useState } from "react";

describe("Page renders", () => {
    test("should render LandingA", () => {
        render(<LandingA />);
        expect(screen.getByText("Are you a physician? Partner with us to provide flexible telehealth care.")).toBeInTheDocument();
    });
    
    test("should render LandingB", () => {
        render(<LandingB />);
        expect(screen.getByText("Are you a physician? Partner with us to provide flexible telehealth care.")).toBeInTheDocument();
    });
});

// describe("Buttons work", () => {
    
// });

