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

  const tsconfigTemplate = (references) =>
    JSON.stringify(
      {
        extends: "../../tsconfig.base.json",
        include: ["./**/*.ts", "./**/*.tsx"],
        compilerOptions: {
          types: ["webpack-env"],
          composite: true,
        },
        references,
      },
      null,
      2
    );

  for (let i = 1; i <= totalModules; i++) {
    const moduleDir = path.join(srcDir, `module${i}`);

    // Create module directory
    if (!fs.existsSync(moduleDir)) {
      fs.mkdirSync(moduleDir);
    }

    const appFilePath = path.join(moduleDir, `App.tsx`);
    const testSpecFilePath = path.join(moduleDir, `test.spec.tsx`);
    const tsconfigFilePath = path.join(moduleDir, `tsconfig.app.json`);

    // Determine references for the current module
    const references = [];
    for (let j = i + 1; j <= i + 10 && j <= totalModules; j++) {
      references.push({ path: `../module${j}/tsconfig.app.json` });
    }

    // Write the App, test spec, and tsconfig files
    fs.writeFileSync(appFilePath, appTemplate(), "utf8");
    fs.writeFileSync(testSpecFilePath, testSpecTemplate(), "utf8");
    fs.writeFileSync(tsconfigFilePath, tsconfigTemplate(references), "utf8");
  }

  console.log(
    `${totalModules} module directories created in 'src/', each with App.tsx, test.spec.tsx, and tsconfig.app.json files.`
  );
};

generateModuleFiles(2000);
