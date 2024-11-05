const commentCode = `
? Comment this code
! Only add function level comments. Do not write comment in between the code
* Be concise and easy to understand
`;

const explainCode = `
? Explain a concept of this code
! 1. Briefly introduce the concept and provide any necessary background information.
  2. Break down the concept into its key components or steps, and explain each one in detail.
  3. If applicable, describe how the components interact with each other or how the steps are connected.
  4. Provide examples or use cases to illustrate the concept and make it more relatable to the reader.
  5. Highlight any benefits, advantages, or practical applications of the concept.
  6. Address any common questions or misconceptions related to the concept.
  7. Summarize the key points and provide any additional resources or references for further learning. 
* 1. Easy to understand, Well-structured
  2. Use numbered points, steps, or subheadings where appropriate to organize the information.
`;

const optimizeCode = `
? Improve the performance and efficiency of this code
! 1. Analyze the code and suggest optimizations by applying efficient algorithms, data structures, and performance best practices.
    - Time Complexity: Identify inefficient algorithms or code patterns that can be optimized.
      Suggest alternative approaches or algorithms that can reduce the time complexity and improve execution speed.
    - Space Complexity: Analyze the code's memory usage and identify opportunities to optimize memory consumption.
      Suggest techniques to minimize unnecessary memory allocations and reduce the space complexity.
    - Resource Utilization: Examine how the code utilizes system resources such as CPU, I/O operations, or network calls.
      Propose optimizations to minimize resource overhead and improve overall efficiency.
    - Caching and Memoization: Identify computations or function calls that can benefit from caching or memoization.
      Suggest ways to store and reuse previously computed results to avoid redundant calculations.
    - Parallelization and Concurrency: Identify portions of the code that can be parallelized or executed concurrently to leverage multi-core processors or distributed systems.
      Propose appropriate parallelization techniques or libraries to improve performance.
    - Error Handling: Check if the code is handling potential errors.
      Suggest the right approach.
  2. Justify how the optimizations improve the code's performance and efficiency.
  3. If trade-offs are involved, discuss the benefits and drawbacks of each optimization approach.
* Be detailed
`;

const refactorCode = `
? Enhance the quality and maintainability of this code
! 1. Analyze the code and suggest improvements by applying best practices, design patterns, and principles of clean code.
    - Readability: Improve code readability by using meaningful names, consistent formatting, and clear code structure.
      Suggest changes to make the code easier to understand and follow.
    - Modularity: Identify opportunities to break down the code into smaller, reusable functions or components.
      Aim to reduce code duplication and improve code organization.
    - Simplicity: Simplify complex logic, remove unnecessary complexity, and streamline the code.
      Suggest ways to make the code more concise and easier to maintain.
    - Maintainability: Enhance the overall maintainability of the code by improving code documentation, error handling, and adherence to coding standards and best practices.
  2. Justify how the refactoring improves the code's quality and maintainability.
* Be detailed
`;

const reviewCode = `
? Review code and provide constructive feedback, suggestions for improvements of the code
! 1. Analyze the code for potential bugs, errors, or vulnerabilities and provide explanations on how to fix them.
  2. Review the code for readability, maintainability, and adherence to coding standards and conventions. Suggest improvements where necessary.
  3. Provide feedback on the code structure, organization, and modularity. 
  4. Recommend ways to optimize the code for better performance and efficiency.
  5. Offer insights on how to make the code more reusable, scalable, and extensible.
  6. Identify any potential edge cases or scenarios that the code may not handle properly and provide recommendations on how to address them.
  7. Suggest appropriate design patterns, algorithms, or libraries that could be used to improve the code's functionality or performance.
  8. Provide examples or code snippets to illustrate your suggestions and recommendations.
  9. Ask questions if need more context or clarification about the code's purpose or intended functionality.
* Be concise, constructive and respectful
`;

const fixError = `
? Fix error within the code
! 1. Analyze the code, detect any issues, and provide corrected code along with explanations for the fixes.
    - Identify syntax errors, logical errors, or potential runtime errors in the code.
      Provide a corrected version of the code that resolves the identified issues.
  2. Offer alternative solutions or best practices, if applicable, to improve the code's efficiency, readability, or maintainability.
* Be detailed

? What is this error message
! Identify and analyze the error and provide where the error comes from and how to fix it.
* Be detailed
`;

export const codebase = `
${commentCode} \n
${explainCode} \n
${optimizeCode} \n
${refactorCode} \n
${reviewCode} \n
${fixError} \n
`;
