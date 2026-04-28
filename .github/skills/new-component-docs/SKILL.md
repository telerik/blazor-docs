---
name: new-component-docs
description: Write and update markdown documentation for Telerik UI for Blazor components.
---
# Documentation Skill
This skill generates or updates Markdown documentation for **Telerik UI for Blazor** components in the `blazor-docs` repository.
The output should match the structure, tone, and formatting used across the Telerik UI for Blazor documentation.
Official documentation reference:
https://www.telerik.com/blazor-ui/documentation/introduction
---
# Mandatory Style Guide
Before generating documentation, always consult the repository documentation guidelines located at:
.github/copilot-instructions.md
This file defines the **official documentation Style Guide** for the repository.
All generated documentation MUST follow the rules defined in that file, including:
- Writing style
- Terminology
- Markdown formatting
- Heading hierarchy
- Code snippet formatting
- Documentation conventions
If any instructions in this skill conflict with the Style Guide, **the Style Guide takes precedence**.
---
# Use Existing Documentation as Reference
When generating documentation:
- Follow patterns used in existing documentation articles in the repository.
- Maintain consistent section naming and ordering.
- Reuse terminology already used in Telerik UI for Blazor documentation.
- Prefer consistency with existing documentation instead of inventing new structures.
---
# Component Documentation Rules
When documenting a new component:
1. Start with a short and clear overview.
2. Include minimal working code examples.
3. Prefer short explanations followed by examples rather than long paragraphs.
4. Use **Blazor Razor syntax** for all component examples.
5. Ensure examples are realistic and consistent with Telerik component APIs.
6. Use Markdown tables for parameters and configuration options.
7. Use clear section headings to improve readability.
---
# Markdown and Code Formatting
- All documentation must be written in **Markdown (.md)**.
- Razor examples must use fenced code blocks:
````Razor
<TelerikComponent></TelerikComponent>
````
- Use tables when documenting parameters, events, or configuration options.
- Maintain consistent heading hierarchy.
---
# Telerik UI for Blazor Conventions
Documentation examples must follow Telerik UI for Blazor conventions:
- Use Telerik component tags such as:
````RAZOR
<TelerikGrid>
</TelerikGrid>
<TelerikDropDownList>
</TelerikDropDownList>
````
- Do not use standard HTML controls if a Telerik component exists.
- Ensure parameters and APIs match Telerik component patterns.
- Examples should demonstrate realistic Telerik UI usage scenarios.
---
# When This Skill Should Be Used
Use this skill when:
- Creating documentation for **new Telerik UI for Blazor components**
- Updating existing component documentation
- Adding usage examples
- Improving documentation structure or clarity
- Generating initial drafts of documentation articles
---
# Expected Output
The generated output should:
- Be a **well-structured Markdown document**
- Follow the **repository style guide**
- Include clear headings
- Include Razor code examples where appropriate
- Be easy for developers to read and follow