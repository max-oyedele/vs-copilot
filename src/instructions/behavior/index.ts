// import { codebase } from "./codebase";
// import { system } from "./system";

// export const behavior = `
// ${system} \n
// ${codebase} \n
// `;

// important for dynamic bahavior update
export const onlyBehaviorQuestions = (behavior: string) =>
  behavior
    .split("\n? ")
    .filter((e) => e)
    .map((q) => q.split("\n! ")[0])
    .join("\n");
