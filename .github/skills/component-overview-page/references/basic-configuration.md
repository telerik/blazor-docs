# Basic Component Configuration

This guide explains how to create and maintain the basic section in the Overview article of a Telerik Blazor component documentation.

The section starts with a heading `# Creating Blazor Component Name` followed by step-by-step instructions on how to set up the Telerik Blazor component in a `.razor` file in the Blazor app. Use the following tips when wording the steps:

* Use an ordered list with simple instructions.
* Use action verbs and complete short sentences.
* Use imperative mood: what to do, how, where. Avoid "you can" and similar ambiguous phrases.
* Use the smallest possible number of configuration settings that makes sense in a real-world scenario. Avoid too simple and minimalistic "hello world" examples.
* Use two-way `@bind-Value` binding for value components.
* Generate dummy data with a loop for components that have a `Data` parameter.
* For big and complex components such as the Grid, enable a few most common features like Paging and Sorting.
* Use brief explanations only if they are important at this early stage. Do not try to elaborate on all possibilities, as we are focusing on straight-forward and simple scenarios.
* Whenever possible, make the steps actionable without the need to read another article. Link to other articles only if necessary, but extract the most important information briefly.
* Match the instructions to the code snippet. If the code snippet includes a configuration setting, mention it in the steps.
* (optional) List max two optional steps last and signify the steps with "(optional)" in the beginning.

Finish the section with a runnable code example.
