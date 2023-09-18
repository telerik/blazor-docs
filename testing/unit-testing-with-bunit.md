---
title: Unit Testing With bUnit
page_title: Unit Testing With bUnit
description: Unit Test your Blazor apps by isolating the tested code from its dependencies with a mocking tool like JustMock. 
tags: unit test, bUnit, mock, mocking, mocking tool, mocking solution, mocking software, mocking framework, Blazor
slug: unit-test-with-bunit
position: 5
---

## What is bUnit

...


## e2e Vs Unit

The scenario you would like to test is more suitable for end-to-end tests (e2e). The main difference between e2e tests and unit tests is that end-to-end testing focuses on the application's behavioral flow (clicking a button that populates a message). In other words, e2e tests, allow you to test the application from the user's point of view. One tool you can use for end-to-end testing in Blazor is the Selenium framework (API for .NET). Unit testing generally focuses on functional verification. You can use unit tests to ensure that the functions or calculations that generate data, a numerical value, or a text string, are working as required.

A case that requires an interaction with the component is typically a task for e2e tests. 

## Testing the Telerik UI for Blazor components

Our components rely on JSInterop to support their rich UX features. This can make testing with bUnit difficult or sometimes impossible. For example, the Scheduler must render in the browser and then measure and adjust its layout with JavaScript. Then this information is sent to the .NET runtime to be used there.

Generally, you don't have to test our components, as we do that ourselves. But if this will make you more confident, then consider e2e tests too.

Any unit tests for custom markup/logic should test just that - the custom logic in an isolated scenario. 

bUnit renders with C# and does not apply changes to the HTML (DOM) that come from JS Interop
in fact, the JS interop we mock is just so that you don't get null reference exceptions from code that uses it
Some Telerik components need to use JS for various modifications. In this case, the textbox sets its value with JS and so it is not part of  the "server" rendering that you can get in the C# code, and so it is not part of the data you can get for its DOM element, because it is not a DOM element like in the browser, but parsed data from the server rendering.

## Common issues

### Scheduler - measure and adjust its layout with JavaScript

### Dialog/Window/Anything with popup - 

<details>
<summary>Dialog/Window/Anything with popup</summary>

rendered on root level and cannot be found in the component. If you are trying to detect the popup content you should target the RootComponent and search inside it. Also, [Create an interface to easily mock the DialogFactory](https://feedback.telerik.com/blazor/1533040-create-an-interface-to-easily-mock-the-dialogfactory?_gl=1*11c7efe*_ga*MTU4MzUzNjcxLjE2OTA0Njc5NjA.*_ga_9JSNBCSF54*MTY5NDc5MjcyNS45My4xLjE2OTQ3OTYzOTcuNDguMC4w). Ticket 1567591

https://supportheroes.telerik.com/ticket/1532906

</details>


### Events that are attached with js - ticket 1609623

### TextBox/TextArea

* input does not have value due to the debounce delay. The issue stems from the input event updating the value with a delay. 

* Currently, the only alternative is to update the DebounceDelay parameter of the textboxes as suggested in [the bunit thread](https://github.com/bUnit-dev/bUnit/discussions/651#discussioncomment-2499736):  - **ticket 1602503**
[Binding TelerikTextBox value in bUnit test](https://github.com/bUnit-dev/bUnit/discussions/651)

To handle this scenario, the solution can be updating the DebounceDelay property during test. However, this should be done when you are initializing/rendering the component.
[Passing parameters to components - DebounceDelay](https://bunit.dev/docs/providing-input/passing-parameters-to-components.html?tabs=csharp)

## Grid.Rebind() does not work - ticket 1569276 - disable the built-in loader

## Fire change event - ticket 1567237

## data-id is different in the markup https://supportheroes.telerik.com/ticket/1550893

## MultiSelect OnRead https://supportheroes.telerik.com/ticket/1538788

## TelerikRootComponent missing https://supportheroes.telerik.com/ticket/1533148
 A Telerik component on the requested view requires a TelerikRootComponent to be added to the root of the MainLayout component of the app. Read more at: https://docs.telerik.c


## Limitations

A known limitation of bUnit is that it does not run JavaScript. So, if the components use some JSInterop, one should emulate IJSRuntime. You may find some more details here: https://bunit.dev/docs/test-doubles/emulating-ijsruntime.html.

## Troubleshooting

=== JS

Overall, there is one more major limitation of bUnit that is important and it is that any operation that uses javascript is not supported. However, we tend to add programatic api methods wherever possible to make it possible to test our components. In addition, we use javascript only for cases when the Blazor framework cannot handle (ex: conditional prevent of keydown event based on the target). On a side note, for those scenarios it might be more appropriate to use e2e testing framework rather than bUnit. 

https://bunit.dev/docs/test-doubles/emulating-ijsruntime.html 

## Solutions

* Mock the component
https://bunit.dev/docs/providing-input/substituting-components.html?tabs=moq
https://supportheroes.telerik.com/ticket/1623679

* Refactor the component structure of your app, so that you can test a component that doesn't contain our Scheduler.

