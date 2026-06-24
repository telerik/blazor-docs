---
name: component-templates-page
description: This skill describes the structure and language of the component Events pages in the Telerik UI for Blazor documentation. Use this skill when generating or updating the main templates.md file for a Telerik Blazor component.
---

# Component Events Page

## When to use this skill

Use this skill to create or modify the `templates.md` file of a Telerik Blazor component documentation.

## Component Events Page Structure

The Component Events article consists of the following content sections. Use the notes about each section as guidance on the expected content.

1. Introduction. This is the text that follows the main page title and explains the article purpose. The Events page introduction also lists all the available component templates as a bullet list with links to the corresponding sections in the article. The templates in the bullet list must be sorted alphabetically.
1. Event Sections. Each template has its own section with a heading that is the template name. The section describes which part of the component is affected by the template and what is the type of the template `context`, if a `context` exists. It also includes a simple non-runnable code snippet showing how to handle define the template with a child tag in the component declaration. Non-runnable code snippets should have the `skip-repl` directive in the opening code fence, like this: ````RAZOR.skip-repl. The template content in the code snippet can be empty, or show how to use properties of the template `context`.
1. Example. This section includes a complete runnable code snippet that demonstrates the usage of all component templates in a Blazor application. The code snippet should have the `RAZOR` language specified in the opening code fence, like this: ````RAZOR.
1. See Also. Add a list of related resources like online demos on demos.telerik.com, the API reference, or important KB articles. Use a `## See Also` heading.

### Template Precedence

If a template overrides the effect of a component parameter, mention this in the corresponding template section.

If two templates cannot be used together, mention this in the corresponding template sections.

### Component Templates Page Template

The overall `templates.md` file structure should follow the [Templates Page Template](assets/templates-template.md). In that template file:

* Replace all occurrences of "Component Name", "component-name", and "componentname" with the actual component name in the corresponding letter casing and format.
* Replace all occurrences of "Template 1", "Template 2", and "Template 3" with the actual template names of the component. If there are more than 3 templates, add more sections for the additional templates. If there are less than 3 templates, remove the extra sections.
* Replace all occurrences of `ComponentTemplate` with the actual template name.

## Linking to Other Documentation Articles

Every link to another page in the same documentation site should point to the `slug` value from the meta data at the top of the other page's `.md` file. For example, if article `A` links to article `B` that has a `slug` of `article-b-slug`, the link should be [link to Article B](slug:article-b-slug).

Link to other documentation articles whenever you mention a component or a feature that has its own documentation page.
