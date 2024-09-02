const fs = require("fs");
const path = require("path");

const generateModuleFiles = (totalModules) => {
  const srcDir = path.join(__dirname, "src");

  // Create the src directory if it doesn't exist
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir);
  }

  const appTemplate = () => `
import React from "react";

export default function App() {
  return <div>Hello World</div>;
}
`;

  const testSpecTemplate = () => `
import { test, expect } from "@playwright/experimental-ct-react";
import App from "./App.tsx";

test("should work", async ({ mount }) => {
  const component = await mount(<App />);
  await expect(component).toContainText("Hello World");
});
`;

  for (let i = 1; i <= totalModules; i++) {
    const moduleDir = path.join(srcDir, `module${i}`);

    // Create module directory
    if (!fs.existsSync(moduleDir)) {
      fs.mkdirSync(moduleDir);
    }

    const appFilePath = path.join(moduleDir, `App.tsx`);
    const testSpecFilePath = path.join(moduleDir, `test.spec.tsx`);

    // Write the App and test spec files
    fs.writeFileSync(appFilePath, appTemplate(), "utf8");
    fs.writeFileSync(testSpecFilePath, testSpecTemplate(), "utf8");
  }

  console.log(
    `${totalModules} module directories created in 'src/', each with App.tsx and test.spec.tsx files.`
  );
};

generateModuleFiles(3000);
