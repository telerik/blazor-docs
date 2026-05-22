---
name: component-events-page
description: This skill describes the structure and language of the component Events pages in the Telerik UI for Blazor documentation. Use this skill when generating or updating the main events.md file for a Telerik Blazor component.
---

# Component Events Page

## When to use this skill

Use this skill to create or modify the `events.md` file of a Telerik Blazor component documentation.

## Component Events Page Structure

The Component Events article consists of the following content sections. Use the notes about each section as guidance on the expected content.

1. Introduction. This is the text that follows the main page title and explains the article purpose. The Events page introduction also lists all the available component events as a bullet list with links to the corresponding sections in the article. The events in the bullet list must be sorted alphabetically.
1. Event Sections. Each event has its own section with a heading that is the event name. The section describes when the event fires and what is the type of the event handler argument. It also includes a simple non-runnable code snippet showing how to handle the event in a Blazor application. Non-runnable code snippets should have the `skip-repl` directive in the opening code fence, like this: ````RAZOR.skip-repl. The event handler implementation in the code snippet can be empty, or show how to use properties of the event handler argument.
1. Example. This section includes a complete runnable code snippet that demonstrates the usage of all component events in a Blazor application. The code snippet should have the `RAZOR` language specified in the opening code fence, like this: ````RAZOR.
1. See Also. Add a list of related resources like online demos on demos.telerik.com, the API reference, or important KB articles. Use a `## See Also` heading.

### Event Handler Execution Order

If a user action causes multiple events to fire, mention the execution order of the events in the corresponding event sections. For example, if a user action causes both `OnEvent1` and `OnEvent2` to fire, and `OnEvent1` always fires before `OnEvent2`, mention this in the sections of both events.

### Component Events Page Template

The overall `events.md` file structure should follow the [Events Page Template](assets/events-template.md). In that template file:

* Replace all occurrences of "Component Name", "component-name", and "componentname" with the actual component name in the corresponding letter casing and format.
* Replace all occurrences of "Event 1", "Event 2", and "Event 3" with the actual event names of the component. If there are more than 3 events, add more sections for the additional events. If there are less than 3 events, remove the extra sections.
* Replace all occurrences of `OnComponentEvent` with the actual event name.
* Replace all occurrences of `TelerikComponent` with the actual component name in the code snippets.
* Replace all occurrences of `OnComponentEventHandler` with the actual event handler method name. Use a consistent naming convention for all event handler method names. For example, if the component is `TelerikGrid` and the event is `OnCreate`, the event handler method name should be `OnGridCreate`.
* Replace all occurrences of `ComponentEventNameArgs` with the actual event argument class name.

## Linking to Other Documentation Articles

Every link to another page in the same documentation site should point to the `slug` value from the meta data at the top of the other page's `.md` file. For example, if article `A` links to article `B` that has a `slug` of `article-b-slug`, the link should be [link to Article B](slug:article-b-slug).

Link to other documentation articles whenever you mention a component or a feature that has its own documentation page.
