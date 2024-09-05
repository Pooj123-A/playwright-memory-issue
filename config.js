const fs = require("fs");
const path = require("path");

const updateRootTsConfigReferences = (totalModules) => {
  const rootTsConfigPath = path.join(__dirname, "tsconfig.app.json");
  const srcDir = path.join(__dirname, "src");

  // Read the existing root tsconfig.app.json file
  let rootTsConfig;
  try {
    rootTsConfig = JSON.parse(fs.readFileSync(rootTsConfigPath, "utf8"));
  } catch (error) {
    console.error("Error reading root tsconfig.app.json:", error);
    return;
  }

  // Generate the new references
  const newReferences = [];
  for (let i = 1; i <= totalModules; i++) {
    newReferences.push({ path: `./src/module${i}/tsconfig.app.json` });
  }

  // Update the references array
  rootTsConfig.references = newReferences;

  // Write the updated tsconfig.app.json back to the root directory
  try {
    fs.writeFileSync(
      rootTsConfigPath,
      JSON.stringify(rootTsConfig, null, 2),
      "utf8"
    );
    console.log("Updated root tsconfig.app.json with new references.");
  } catch (error) {
    console.error("Error writing updated root tsconfig.app.json:", error);
  }
};

updateRootTsConfigReferences(1000);
