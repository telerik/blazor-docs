# Blazor Code Style Guide

This guide outlines best practices for Razor component development and documentation in Blazor.

## Razor File Structure

Use the following top-down order in `.razor` files:

1. `@page`
2. `@using`
3. `@namespace`
4. `@inherits`
5. `@implements`
6. `@inject`

Insert `<style>` or `<script>` between the component markup and `@code` block, unless the example revolves around them.

## `@code` Section Order

1. Component references
2. Component parameters
3. Methods/event handlers (logical order; lifecycle methods last)
4. Data generation
5. Class declarations

Use `#region` for longer sections if needed.

## Access Modifiers

- Razor properties & handlers: `private`
- Lifecycle handlers: `protected`
- Other classes & members: `public`

## Naming Conventions

- **PascalCase** for members (`Id`, `FirstName`)
- **camelCase** for local variables and lambdas
- Avoid repeating class names in properties (`Product.Name`, not `Product.ProductName`)
- Use specific and meaningful model names (`GridModel`, `Product`)
- For `Data`: prefer `[Component]Data` or meaningful plural (`GridData`, `Products`)
- For `@ref`: use `[Component]Ref` (`GridRef`)

## Components

- Minimal configuration for clarity
- Use self-closing tags if simple and one-lined
- Prefix parameter values with `@` unless literals
- Use `nameof()` for member names

**Parameter order:**

1. `@ref`
2. `Data` / `OnRead`
3. `TItem`, `TValue`
4. `TextField`, `ValueField`
5. `Value`, `ValueExpression`
6. Other parameters
7. Event handlers

Pair one-way bound params with `Changed` handlers. Break to new lines after ~80 characters.

## Event Handlers

- Use `On[Component][Event]` or meaningful verbs (`OnButtonClick`, `RebindGrid`)
- Use `new[Noun]` in simple lambdas (`newValue`)
- Use `args` for complex types or `*Args` types

Example:

```razor
<TelerikNumericTextBox OnValueChanged="@( (int newValue) => OnValueChanged(newValue) )" />
```

```cs
async Task OnValueChanged(int newValue) { }
```

## Data Generation

- Use `OnInitialized` or static data
- Use `List<T>`
- Avoid ID = 0
- Use `Random` for real-world-like values
- Prefer loops for brevity

## Cross-Platform Syntax

- Use `Path.DirectorySeparatorChar`, not `"/"` or `"\"`
- Match exact casing for files and folders

## Comments

- Place conceptual comments **outside** snippets
- Use short inline comments **inside** snippets only when needed

# Copilot Instructions for Documentation Style

This guide is adapted from the full Progress documentation style guide for use with GitHub Copilot or similar tools. It focuses on actionable, concise rules to help write clear, consistent, and accessible product documentation.

## Dcouemnting New Component Structure and Specifics

Every component documentation is placed in a separate file, which is located in the `docs/components` folder. 
This folder contains folders for each component, and each folder contains the documentation files for the component. Most common files are:

- `overview.md`: A high-level overview of the component, its purpose, and usage.
- `events.md`: A detailed description of the events that the component emits, including their parameters and usage.
- `templates.md`: If the component has templates, this file provides information about the templates that can be used with the component, including examples and usage guidelines.
- `appearance.md`: A file that describes the appearance of the component, including its styles, themes, and customization options.

!!!IMPORTANT !!! Each component folder has an accessibility folder which contains the accessibility documentation for the component. This folder is automatically generated. With that in mind, do not create such folder when creating a new component documentation.

## Tone and Voice

### Basic Things to Avoid

* Do not denigrate or insult any group of people.
* Do not use jokes at the expense of the users.
* Do not use "simply", "It's that simple", or "It's easy".
* Do not use "let's do something".
* Do not use "please note" and "at this time".
* Do not use third-person singular pronouns ("he" or "she"). Use "they" instead to avoid gender issues.
* Do not write in first-person plural ("we", "our").
* Do not use metaphors or abbreviations.

### Writing for Global Audiences

Many users are non-native English speakers and come from various cultures. The content we write and the language we use has to translate well and to provide no room for interpretation.

* Use simple, objective, and non-ambiguous language.
* Do not use culture-specific language or pop-culture references.
* Do not be too cutesy.  
* Keep sentences and paragraphs short and concise. If a sentence or a paragraph is becoming too long, split it.

## General Guidelines for Writing

### Write in American English

|American   |British   |
|:--        |:---      |
|behavior   |behaviour |
|color      |colour    |
|organize   |organise  |
|license    |licence   |

### Use the Active Voice

* Avoid using the Passive Voice whenever possible.
* Yet, if you opt for the Passive Voice, use it consistently within a sentence.

|Not that good                 |Much better
|:---                          |:---                                        
|To access the results that are returned by the query, use standard JDBC syntax. |To access the results that the query returns, use standard JDBC syntax.

### Directly Address the User

* Use the Imperative Mood.
* Use the second-person pronoun "you" to directly address the user.
* Avoid using the first-person plural pronouns "we", "our", and "us".
* Avoid using the first-person singular pronouns "I", "my", and "me".
* Avoid using the third-person pronouns "he", "she", "his", "her", and "hers".
* Avoid using the third-person plural pronouns "they", "their", and "theirs" unless you are delivering

|Not that good                                                        |Much better
|:---                                                                 |:---
|After reading this tutorial, the roadmap should be created.        |After reading this tutorial, create the roadmap.
|If you want to enable the filtering functionality of the Grid, you can set the `filterable` option to `true`. |To enable the filtering functionality of the Grid, set the `filterable` option to `true`.

### Deliver Gender Neutrality

* Use "they"/"their"/"theirs" instead of "he"/"him"/"his" or "she"/"her"/"hers", or "he or she"/"him or her"/"his or hers".
* If impossible to use "their", rephrase the sentence and eliminate the use of the pronoun.
* Avoid the unnecessary gendering of the language.

|Not that good                                                        |Much better
|:---                                                                 |:---
|Provide the email of the person that you want to invite and select his IdP.   |Provide the email of the person that you want to invite and select their IdP.
|Equipment installation and setup takes around 16 man-hours to complete.     |Equipment installation takes around 16 person-hours to complete.

### Avoid Gerunds and -ing Forms in Text

* Minimize the use of gerunds and "-ing" forms in text.
* Revise "–ing" adjectives which follow and modify nouns.
* Eliminate or rewrite dangling and unnecessary "-ing" phrases.

|Not that good                                                        |Much better
|:---                                                                 |:---
|Advocate requesting assistance.                                    |Request assistance.
|Indicates the field of the data item that is used when searching for suggestions. |Indicates the field of the data item that is used when the user searches for suggestions.
|Move the certificate authority to a new server running on a domain controller. |Move the certificate authority to a new server that is running on a domain controller.
|When using a Wi-Fi hot spot, your laptop's file sharing does not need to be enabled. |When you use a Wi-Fi hot spot, your laptop's file sharing does not need to be enabled.

### Use Simple Tenses

* Try to use the Present Simple as much as possible.
* Prefer the Present Simple to the future tenses.
* Use future, past, and perfect tenses only when it is confusing to use the present tenses.
* If you need to talk about past events, use the Past Simple instead of perfect tenses.

|Not that good                                                        |Much better
|:---                                                                 |:---
|The `headerTemplate` option specifies the static HTML content, which would be rendered as the `popup` element header. |The `headerTemplate` option specifies the static HTML content which is rendered as the `popup` element header.

### Use Simple Language

* Use common en-US vocabulary.
* Use very specific words and phrases.
* Avoid using words of foreign origin including Latin abbreviations such as "e.g.," and "i.e.,".
* Avoid creating new terms.
* Avoid generalization.
* Do not use qualifications such as "good", "best", "worst", and so on.
* Do not use slang, jargon, humor, sarcasm, colloquialisms, idioms, emoticons, and metaphors.
* Avoid culture-specific references that might not be widely understood, such as holidays and celebrations, monetary units, and phone number and address formats.
* Avoid using symbols instead of words in running text even if you are space-constrained.
* Use simpler and shorter words and phrases.
* Avoid using generic phrases like "there is" and "there are". Such phrases serve a grammatical function but have no real meaning.

### Use Short Sentences and Paragraphs

* Split complex sentences in two or more shorter sentences.
* As a rule of thumb:
  * Keep the length of a sentence up to 25 characters.
  * Use between two and four sentences in a single paragraph.
  * Keep the length of a paragraph up to six lines.

|Not that good                                                        |Much better
|:---                                                                 |:---                                       
|The PanelBar displays hierarchical data as a multi-level, expandable component and is stateless, which means that to store its state and configuration options, you must use a high-order component. |The PanelBar displays hierarchical data as a multi-level, expandable component. To store its state and configuration options, use a high-order component.

### Use Properly Should, Could, Must, Have to, Need to

* Use "have/has to", "need to" or "must" to express obligation.
* Avoid using "should". Instead of using "could" and "would", use "can" and "will".

|Not that good                                                        |Much better
|:---                                                                 |:---
|The `+` in the second definition indicates that you should add one or more arguments. |The `+` in the second definition indicates that you have to add one or more arguments.

## General Guidelines for Formatting

* Specific types of elements, such as user interface elements, programming code, and new terms, have to be formatted in a specific way.

|Elements    |Formatting          |Example
|:---        |:---                |:---
|UI elements such as buttons or dialog boxes                         |**Bold** font     |To submit the form, click **Save**.
|Code such as HTML tags, methods, events, variables, or class names. |`Code` formatting |To trigger the `save` event, click **Save**.
|Keyboard keys                                                       |`Code` formatting |To save the form, press `Ctrl+S`.

## Company and Product Brand Names

* Use the established all-company marketing requirements.
* Follow the trademark guidelines of third parties when you refer to third-party trademarked items.
* [Full list of Progress brand names and trademark markings](https://www.progress.com/legal/trademarks)
* [Details on the latest rebranding strategy at Progress](http://brand.progress.com/)

## Titles and Headings\

### Consistency

* The rendered title of the article corresponds to the level-one heading (`h1` in HTML or `#`in Markdown).
* Keep the `title` meta element identical to the level-one heading.
* (Exceptions) For SEO purposes, you can have the `meta_title` (`page_title` in earlier versions) (without the product name) differ from the heading (`h1` or `#`)  and `title`.

### Levels

* The title of the article corresponds to heading level one (`<h1>` in HTML, `#` in Markdown). You need to have a single instance of `<h1>` (`#`) within the same article.
* Depending on the product documentation, some Progress sites render headings up to level three (`h3` or `###`).
* (Exceptions) The documentation supports all heading levels, so you can still use all through `h6` or `######`.

### Capitalization

* Always capitalize:
  * The first and last words within a heading
  * Nouns ("Widget")
  * Verbs ("Render", "Is")
  * Adjectives ("Interactive", "Comprehensive")
  * Adverbs ("Quickly", "Possibly")
  * Pronouns ("It", "Its")
  * Subordinating conjunctions ("If", "Because", "That")                                
  * All words in phrasal verbs ("Take Off", "Look After", "Turn Up")                    
  * Prepositions used as element names in the user interface ("The On Button")          
  * The first and last word in a hyphenated expression ("How-To Guide", "Out-of-the-Box")
* Never capitalize:
  * Coordinating conjunctions ("and", "but", "or")
  * Articles ("a", "an", "the")
  * Prepositions unless used as element names in the user interface ("at", "on", "between")
  * "To" when it is part of an infinitive ("Widgets to Beautify Your Mobile Applications")

|Not that good  |Much better  |
|:---           |:---         |
|Adding the about Pull-Down Menu  |Adding the About Pull-Down Menu |
|Running the In-browser Client    |Running the In-Browser Client  |
|Setting up Clicks and Routing    |Setting Up Clicks and Routing  |
|during Initialization            |During Initialization      |
|the Template Delegate            |The Template Delegate      |
|Possible To Port                 |Possible to Port           |

### -ing Forms in Titles and Headings

While to avoid ambiguity it is not advisable to use -ing forms (and Gerunds) in text, -ing forms are usual and helpful in titles and headings especially when the article describes a process or explains how to do something. For example, "Getting Started", "Installing the Plugin", "Managing the Process", "Handing Off Projects to Developers", and so on.   

### Style

* Make all same-level headings grammatically parallel.

    |Not that good  |Much better  |
    |:---           |:---         |
    |<h2>Getting Started</h2> <p>Some text.</p> <h3>Initialization of the Grid</h3> <p>Some text.</p> <h3>Bind the Grid to Local Arrays</h3> <p>Some text.</p> <h3>Binding the Grid to Remote Data</h3> <p>Some text.</p> |<h2>Getting Started</h2> <p>Some text.</p> <h3>Initializing the Grid</h3> <p>Some text.</p> <h3>Binding the Grid to Local Arrays</h3> <p>Some text.</p> <h3>Binding the Grid to Remote Data</h3> <p>Some text.</p> |

* Have at least two subheadings in a single heading section.

    |Not that good  |Much better  |
    |:---           |:---         |
    |<h2>Reference</h2> <h3>Existing Instances</h3> <p>Refer to an existing Grid instance by using the [jQuery.data()](http://api.jquery.com/jQuery.data/) method.</p> |<h2>Telerik Platform Services</h2> <h3>Views</h3> <p>Views (also Screen Builder) is a service for visual code-less development.</p> <h3>Data, Users, Notifications, Business Logic</h3> <p>The four basic backend services of the Telerik Platform let you focus on developing the frontend of your app in AppBuilder by providing you with cloud services.</p>|

* Use text between a heading and its subheading.

    |Not that good  |Much better  |
    |:---           |:---         |
    |<h2>Getting Started</h2> <h3>Read in Advance</h3> <p>Because of the numerous functionalities it supports, the Grid is the most complex of the Kendo UI widgets so far.</p> |<h2>System Requirements for the Package for Sublime Text</h2> <p>Before installing and running the package for Sublime Text, verify that your system meets the following requirements.</p> <h3>Software Requirements</h3> <li>Windows, OS X Mavericks or Ubuntu 14.04 LTS</li> <li>Sublime Text 2 or Sublime Text 3</li>|

* If the TOC renders subheadings, try not to repeat parts of the heading in the subheadings that follow it.

    |Not that good  |Much better  |
    |:---           |:---         |
    |<h2>Data Binding</h2> <p>Some text.</p> <h3>Local Data Binding</h3> <p>Some text.</p> <h3>Remote Data Binding</h3> <p>Some text.</p> |<h2>Data Binding</h2> <p>Some text.</p> <h3>Binding to Local Arrays</h3> <p>Some text.</p> <h3>Binding to Remote Data</h3> <p>Some text.</p>|

* Drop articles in titles, headings, and subheadings as long as the meaning is unambiguous.

    |Not that good  |Much better  |
    |:---           |:---         |
    |Preserving the State in the Cookies |Preserving the State in Cookies |

* Follow the original capitalization of a quote if you include it in a title.

    |Not that good  |Much better  |
    |:---           |:---         |
    |Extending in "Pretty and Straightforward" Ways | Extending in "pretty and straightforward" Ways |

* Do not use metaphors in titles, headings, and subheadings.

    |Not that good  |Much better  |
    |:---           |:---         |
    |The "Right Way" to Add DataSource Instances |Proper Approaches to Add DataSource Instances |

* Apart from API articles, do not cite object types, methods, events, and the like in titles, headings, and subheadings. Instead, describe the user's goal or action.

    |Not that good  |Much better  |
    |:---           |:---         |
    |animation Object Configuration |Configuring the Opening of Animations |

* Do not use ending punctuation.

    |Not that good  |Much better  |
    |:---           |:---         |
    |Get the Beta Now<b>!</b> |Get the Beta Now<br /> or<br /> Immediate Beta Version Download |

## Lists

* For steps in procedures, use numbered lists.
* For same-priority items, use bulleted lists.
* Introduce lists with a starting sentence that ends in a colon (`:`).
* Move as much of the repeating bullet content as possible to the introductory sentence.

    |Not that good |Much better |
    |:---          |:---        |
    |In this version:<ul><li>You can debug on iOS devices.</li><li>You can develop with Apache Cordova 4.0.0.</li><li>You can distribute minor app updates over the air.</li></ul>  |In this version, you can perform the following tasks:<ul><li>Debug on iOS devices.</li><li>Develop with Apache Cordova 4.0.0.</li><li>Distribute minor app updates over the air.</li></ul>

* Start each list item with a capital letter.
* End each list item with a period if it is a complete sentence. If any list item requires a period, add periods to all list items.
* Avoid using articles ("a", "an", or "the") in the beginning.
* Do not create one-item lists.
* Introduce parallel structures for the list items.

    |Not that good |Much better |
    |:---          |:---        |
    |Apply any of the following approaches:<ul><li>App update.</li><li>Reinstalling the app.</li><li>Remove the app completely, clear the cache, and install it again.</li></ul>  |Apply any of the following approaches:<ul><li>Update the app.</li><li>Reinstall the app.</li><li>Remove the app completely, clear the cache, and install it again.</li></ul>

* If the list is more than three levels deep, consider restructuring.
* If you need to include an explanation, place it in a separate paragraph aligned with the text in the list element.
## Metadata

* Implement a meta block in the `<head>` section of each article.
* Always include the `title`, `meta_title` or `page_title`, and `description` meta elements for SEO purposes and content indexing.
* The `slug` is also mandatory. It prevents 404 errors when the item relocates within the documentation site.  
* Use the following syntax rules when you implement the meta elements:

    ```
      ---
      title: Data Binding
      position: 1
      meta_title: Data Binding | [Name of Component, Suite, or Else as Agreed with SEO]
      description: "Bind the Kendo UI Grid to a local array or a remote data source."
      tags: Grid, data binding, Kendo UI
      slug: data-binding-autocomplete
      previous_url: /data-management/grid/introduction
      ---
    ```

## Prefixes

* Examples of prefixes:
  * Anti-
  * Counter-  
  * De-
  * Non-
  * Pre-
  * Re-
  * Semi-
  * Ultra-
  * Un-
* Always check if the prefixed word exists in a hyphenated or non-hyphenated form on [Merriam-Webster](http://www.merriam-webster.com/).
* Do not hyphenate the prefixed word if it does not have an established spelling.
* If the prefixed word has an established non-hyphenated spelling, make sure that the form you want to use conveys the meaning you desire to express. If the non-hyphenated usage creates an ambiguous statement, hyphenate it.

	|Not that good |Much better |
	|:---          |:---        |
	|Recreate the environment.<br>*(Typically, "to recreate" means "to amuse, to entertain".)*  |Re-create the environment.<br>*(Typically, "to re-create" means "to create again from the ground up".)*
	| If a non-critical issue occurs, ignore it and continue your work. | When a noncritical issue occurs, ignore it and continue your work. |

## Words for User Interaction

* For desktop devices&mdash;"click" ("double-click", "right-click"), "press", "select", and "deselect".
* For mobile devices&mdash;"tap", "double-tap", "swipe", "tap and hold", "spread", "pinch", and "drag". For Apple iOS 3D Touch&mdash;use "touch".
* For mixed-device purposes&mdash;"select", "double-tap", or "double-click".

## Comments in Code Snippets

* Write comments in English.
* Keep a comment line up to 80 symbols long. Otherwise, the user needs to scroll outside the viewport.

## Contractions

* In writing, some contracted forms are acceptable, but may be ambiguous for non-native speakers. Therefore, avoid contracting words.
* When you want to create emphasis, use the uncontracted phrase.

    Use  |  Do not use
    ----|----
    aren't<br />can't, cannot<br />didn't<br />don't, doesn't<br />haven’t, hasn’t<br />hadn't<br />I'm<br /> | you’ll (I’ll, he’ll, she’ll, it’ll, we’ll, they’ll)<br />you’re (he’s, she’s, it’s, we’re, they’re)<br />you'd (I’d, she’d, it’d, we’d, they’d)<br />you’ve (I’ve, he’s, she’s, we’ve, they’ve)<br />what's, what'll, what'd, what're<br />where's, where'll, where'd<br />when's, when'd, when'll<br />how's, how's, how'll<br />won't<br />wouldn't<br />I’ll, I’ve, I’d<br />it’s (it has, it was)<br />isn't, aren't, wasn't, weren't<br />

## Cross-References

* Cross-link articles.
* Use descriptive keywords in the anchor text and not "go here", "click this link", and so on.
* When you create the link text, clearly identify the purpose of the linked content. For example, "...refer to the article on [binding the Scheduler to data](link)".
* When you quote external resources (for example, blog posts), cite the exact name of the resource and its author.

## Notes

>A **Note** block indicates neutral or positive information that emphasizes or supplements important points of the main text. A note supplies information that may apply only in special cases. Examples are memory limitations, equipment configurations, or details that apply to specific versions of a program.

To create a note, use the `note` prefix.

![Adding a note](/images/note-in-markdown.png)

<br />

>tip A **Tip** is a type of note that helps users apply the techniques and procedures described in the text to their specific needs. A tip suggests alternative methods that may not be obvious and helps users understand the benefits and capabilities of the product. A tip is not essential to the basic understanding of the text.

To create a tip, use the `tip` prefix.

![Adding a tip](/images/tip-in-markdown.png)

<br />

>caution An **Important** block provides information that is essential to the completion of a task. Users can disregard information in a note and still complete a task, but they are not advised to disregard an important block.

To create an important note, use the `caution` prefix.

![Adding an important note](/images/important-in-markdown.png)

## Prepositions
### IN

* (Do something) In a command mode
* In a dialog box
* In a pane
* (Enter something) In a window
* (Find something) In a class
* In a code snippet
* In a container
* In a file
* In a filename
* In a property
* In a method
* In an object
* (View something) In the example

### ON

* (Do something) On a page
* On the desktop
* (Enter something) On a worksheet
* (Find something) On a control
* (View something) On the screen

### AT

* (Do something) At a command line
* At a prompt

## Screenshots

* Use the default appearance of the product when you take the screenshot. Avoid using 3D effects.
* Use arrows for pointing to an element in the screenshot.
* Minimize empty space in the screenshot.
* Do not use screenshots wider than 1000 px.
* For labels, use Arial, 16 pt.

## Captions for Figures, Tables, and Code Snippets

* Introduce each table, figure, screenshot, code snippet, or demo example with a descriptive sentence or with a caption. For example, "The following table lists the configuration options of the TreeList." (descriptive sentence) or "**Available Configuration Options of the TreeList**" (caption).
* Place the caption before the element it introduces.
* Do not use punctuation in captions unless they are full sentences. If a caption is a full sentence, end it with a period.
* Render a caption in bold.
* Because of current technical limitations, an automatic generation of numbers for the captions is not supported. Therefore, for easier maintenance, skip that numbering.

|Descriptive Sentence |Caption
|:---                 |:---
|The following example demonstrates the full implementation of the suggested approach.| **Example with the Full Implementation of the Suggested Approach**
|The following figure displays the end result from running the code. |**Screenshot of the End Result from Running the Code**

## Tables

### Table Headers

* Use sentence case for the table title and column headings.
* Do not use ending punctuation.
* Use unformatted text&mdash;do not apply bold, italic, or code formatting.

### Table Content

* For the body text, follow the current general guidelines for capitalization, semantic marking, and so on.
* All column entries have to contain content. If the information does not apply, do not use dashes. Instead, use "N/A", "Not applicable", or "None".

The following table demonstrates how to apply the guidelines for presenting the content within a table.

| Property name | Value type | Description |
|----|----|----|
| `Message`           | string  | A default message that is sent to each platform for which a vendor-specific payload is not provided. Treated differently on every platform (for example, it appears as an alert on iOS). Note that different platforms have different limits on message length. |
| `Filter`            | string  | A filter expression specifying which devices must receive the push notification. It represents a stringified JSON object. |
| `NotificationDate`  | date    | The date and time when you want the push notification to be sent. |

## Knowledge Base Articles

The Knowledge Base articles include how-to and troubleshooting scenarios. Depending on the type, the KB article has to follow a specific structure, include specific content, and follow rules for creating their titles as well as using proper punctuation.

## FAQ Articles

* Treat the heading that states the question as a sentence.
* Use the appropriate punctuation as the heading is a sentence.
* Try to stick to the established template.
---
