---
name: component-overview-page
description: This skill describes the structure and language of the component Overview pages in the Telerik UI for Blazor documentation. Use this skill when generating or updating the main overview.md file for a Telerik Blazor component.
---

# Component Overview Page

## When to use this skill

Use this skill to create or modify the `overview.md` file of a Telerik Blazor component documentation.

## CRITICAL RESTRICTIONS

**NEVER include the following in an overview.md file:**

1. **NO Parameters table or section** - Do not create a section titled "Component Name Parameters", "Breadcrumb Parameters", or similar. Do not list or describe individual API members or component parameters in a table format. Such parameter sections and tables exist in other component Overview pages, but this is a legacy approach that is no longer used.
2. **NO detailed parameter documentation** - Parameter details belong in the API reference only, not in the overview page.

The overview page should focus on features and concepts, not on listing parameters.

## Component Overview Page Structure

The Component Overview article consists of the following content sections. Use the notes about each section as guidance on the expected content.

1. Introduction. This is the text that follows the main page title. Describe what the component is and what purpose it serves. Mention one or two fundamental features that bring the most value to develpers or users. The introduction section contains a link to the component marketing page on telerik.com, which has an URL in the following format: https://www.telerik.com/blazor-ui/component-name
1. Comparison with another similar component. This is an optional section for basic information about the component use cases and benefits in the context of another similar component. Outline the major differences between the similar components, so that the reader immediately knows which component to pick.
1. Basic component configuration. List the minimum required steps to configure and display the component in a somewhat real-world scenario. See [basic-configuration.md](references/basic-configuration.md) for more instructions.
1. Major Features. List up to 7 major component features, including the ones that have their own documentation pages. Each feature should be represented by an H2 heading (`## Feature Name Heading`), a paragraph of max 3 sentences, and a link to the dedicated feature article. Use relevant keywords in the link to improve SEO. Order the feature sections by descending importance and ascending usual implementation order.
1. More Features. If the number of features exceeds 7, list between 3 and 8 less important features as an unordered list and link each to its dedicated documentation page. Use a heading like `## More Component Name Features`.
1. API Reference. Add a section with a heading like `## Component Name API` and link to the component API reference. This section should ONLY contain a brief sentence and a link to the API reference - NO tables, NO parameter lists, NO detailed parameter descriptions. If the component is generic, the API reference link must end with `-1` or `-2` depending on the number of generic parameters.
1. Component Reference. Add a section that explains how to set the `@ref` attribute to the component in order to use component methods. Include a small code snippet.
1. Next Steps. Add a list of the next documentation pages that make the most sense to read. For example, these can be the most commonly used feature pages. Use a `## Next Steps` heading.
1. See Also. Add a list of related resources like online demos on demos.telerik.com, the API reference, or important KB articles. Use a `## See Also` heading.

The overall `overview.md` file structure should follow the [Overview Page Template](assets/overview-template.md). In that template file, replace all occurrences of "Component Name", "component-name", and "componentname" with the actual component name in the corresponding letter casing and format.

## Linking to Other Documentation Articles

Every link to another page in the same documentation site should point to the `slug` value from the meta data at the top of the other page's `.md` file. For example, if article `A` links to article `B` that has a `slug` of `article-b-slug`, the link should be [link to Article B](slug:article-b-slug).

Link to other documentation articles whenever you mention a component or a feature that has its own documentation page.

## Final Reminder

When generating an overview.md file:

* Focus on features and usage concepts
* Link to dedicated feature pages for details
* Do NOT create a parameters table or section
* Do NOT list individual parameters with descriptions
* The API reference link provides all parameter documentation
