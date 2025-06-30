import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { generateIconCompName } from "../utils";
import { createDeveloperIcon } from "../createDeveloperIcon";
import { iconsData} from "../iconsData";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const svgDir = path.join(__dirname, "../../");

let exportStatement = "";

// function checkForDuplicateIds(icons: IconDataType[]) {
//   const ids = icons.map(icon => icon.id);
//   const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
//   if (duplicateIds.length > 0) {
//     throw new Error(`Duplicate IDs found: ${duplicateIds.join(', ')}`);
//   }
// }

iconsData.forEach((icon) => {
  //create exportable icon components
  const iconContent = fs.readFileSync(path.join(svgDir, icon.path), "utf-8");
  const iconName = generateIconCompName(icon.name);

  const component = createDeveloperIcon(
    iconName,
    iconContent,
    path.join(svgDir, icon.path)
  );
  fs.writeFileSync(
    path.join(__dirname, "../icons", `${iconName}.tsx`),
    component
  );

  exportStatement += `export * from './${iconName}.tsx';`;
});
fs.writeFileSync(path.join(__dirname, "../icons/index.ts"), exportStatement);
