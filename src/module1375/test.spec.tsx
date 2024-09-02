
import { test, expect } from "@playwright/experimental-ct-react";
import App from "./App.tsx";

test("should work", async ({ mount }) => {
  const component = await mount(<App />);
  await expect(component).toContainText("Hello World");
});
