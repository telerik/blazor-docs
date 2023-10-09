---
title: Unit Testing With bUnit
page_title: Unit Testing With bUnit
description: Unit Test your Blazor apps by isolating the tested code from its dependencies with a mocking tool like JustMock. 
tags: unit test, bUnit, mock, mocking, mocking tool, mocking solution, mocking software, mocking framework, Blazor
slug: unit-test-with-bunit
position: 5
---

# Unit Testing With bUnit

This article provides information for bUnit and how it can be used with the Telerik UI for Balzor components.

* What is bUnit
* e2e Vs Unit
* bUnit Limitations
* Testing the Telerik UI for Blazor components
* Common issues
* Solutions/Workarounds
* Example


## What is bUnit

[bUnit](https://bunit.dev/) is a popular unit testing framework for Blazor. 

bUnit is and will not be designed for E2E testing, e.g. it will continue to only run your C# and Razor code, and not JavaScript. https://bunit.dev/docs/getting-started and https://youtu.be/Co7QetPYiO4 are good starting points if you want a general introduction to bUnit

## e2e Vs Unit

The main difference between e2e tests and unit tests is that end-to-end testing focuses on the application's behavioral flow (clicking a button that populates a message). 

End-to-end tests, allow you to test the application from the user's point of view. One tool you can use for end-to-end testing in Blazor is the Selenium framework (API for .NET). 

Unit testing focuses on functional verification. You can use unit tests to ensure that the functions or calculations that generate data, a numerical value, or a text string, are working as required.

A case that requires an interaction with the component is a task for e2e tests.

## bUnit Limitations

A known limitation of bUnit is that it does not run JavaScript. So, if the components use some JSInterop, one should emulate IJSRuntime. You may find some more details here: https://bunit.dev/docs/test-doubles/emulating-ijsruntime.html.

https://bunit.dev/docs/test-doubles/emulating-ijsruntime.html 

## Testing the Telerik UI for Blazor components with bUnit

The Telerik UI for Blazor components rely on JSInterop to support their rich UX features. This can make testing with bUnit difficult or sometimes impossible.

You don't have to test our components, as we do that ourselves. But if this will make you more confident, then consider e2e tests too.

Any unit tests for custom markup/logic should test just that - the custom logic in an isolated scenario.

bUnit renders with C# and does not apply changes to the HTML (DOM) that come from JS Interop
in fact, the JS interop we mock is just so that you don't get null reference exceptions from code that uses it

Some Telerik components need to use JS for various modifications. In this case, the textbox sets its value with JS and so it is not part of  the "server" rendering that you can get in the C# code, and so it is not part of the data you can get for its DOM element, because it is not a DOM element like in the browser, but parsed data from the server rendering.

Overall, there is one more major limitation of bUnit that is important and it is that any operation that uses javascript is not supported. However, we tend to add programatic api methods wherever possible to make it possible to test our components. In addition, we use javascript only for cases when the Blazor framework cannot handle (ex: conditional prevent of keydown event based on the target). On a side note, for those scenarios it might be more appropriate to use e2e testing framework rather than bUnit. 

## Common issues

Considering the above-listed JS limitation, you may experience some issues when testing the components. Here is a list of several common problems:

## TelerikRootComponent missing

* Issue:

    I am testing a DatePicker but the test fails with:

    ````
    System.Exception : A Telerik component on the requested view requires a TelerikRootComponent to be added to the root of the MainLayout component of the app.
    ````

* Cause:

    A possible cause for this error is that in the test the component is rendered in isolation, without a layout, so the `TelerikRootComponent` is missing.

* Workaround:

    Ether [mock the `TelerikRootComponent`](https://github.com/telerik/blazor-ui/blob/master/testing/bUnit-justmock/Telerik.Blazor.BUnit.JustMock/Common/TelerikTestContext.cs) or use an [actual `TelerikRootComponent`](https://github.com/telerik/blazor-ui/blob/master/testing/bUnit-justmock/Telerik.Blazor.BUnit.JustMock/Common/TelerikTestContextWithActualRoot.cs).

### Scheduler

* Issue: 

    I am testing a component that contains a Scheduler, I get the following error:

    ````
    System.NullReferenceException : Object reference not set to an instance of an object.
   at Telerik.Blazor.Components.Scheduler.Rendering.ContentTableBase`1.SetSlotMetrics(Dictionary`2 metrics)
   at Telerik.Blazor.Components.Scheduler.Rendering.ContentTableBase`1.GetSlotMetrics()
    ````

* Cause: 

    The root cause is that the Scheduler must render in the browser and then measure and adjust its layout with JavaScript. Then this information is sent to the .NET runtime to be used there.

* Workaround: 

    [Mock the component](https://bunit.dev/docs/providing-input/substituting-components.html?tabs=moq
) or refactor the component structure of your app, so that you can test a component that doesn't contain our Scheduler.


### Dialog / Window / Any component that includes popup

* Issue:

    I am trying to detect the content of a Dialog but the test fails in finding it.

* Cause:

    The Dialog, Window and popup elements are rendered on root level and not in their place of declaration.

* Workaround:

    To detect the popup content, target the `RootComponent` and search inside it. 
    
    See: [Dialog example](https://github.com/telerik/blazor-ui/blob/master/testing/bUnit-justmock/Telerik.Blazor.BUnit.JustMock/DemoSample/DialogPage.cs) [Window example](https://github.com/telerik/blazor-ui/blob/master/testing/bUnit-justmock/Telerik.Blazor.BUnit.JustMock/DemoSample/WindowButtonPage.cs).


    Also, [Create an interface to easily mock the DialogFactory](https://feedback.telerik.com/blazor/1533040-create-an-interface-to-easily-mock-the-dialogfactory?_gl=1*11c7efe*_ga*MTU4MzUzNjcxLjE2OTA0Njc5NjA.*_ga_9JSNBCSF54*MTY5NDc5MjcyNS45My4xLjE2OTQ3OTYzOTcuNDguMC4w). Ticket 1567591

https://supportheroes.telerik.com/ticket/1532906


### TextBox / TextArea and other inputs


* input does not have value due to the debounce delay. The issue stems from the input event updating the value with a delay. 

* Currently, the only alternative is to update the DebounceDelay parameter of the textboxes as suggested in [the bunit thread](https://github.com/bUnit-dev/bUnit/discussions/651#discussioncomment-2499736):  - **ticket 1602503**
[Binding TelerikTextBox value in bUnit test](https://github.com/bUnit-dev/bUnit/discussions/651)

To handle this scenario, the solution can be updating the DebounceDelay property during test. However, this should be done when you are initializing/rendering the component.
[Passing parameters to components - DebounceDelay](https://bunit.dev/docs/providing-input/passing-parameters-to-components.html?tabs=csharp)

## Grid - ticket 1569276

* Issue:

    In test environment, `OnRead` is not raised after invoking `Rebind`.

* Cause: 

    When `Rebind` is called, we are showing a loader with JS Interop, so the test fails silently.

* Workaround:

    Disable the [built-in loader]({%slug grid-loading%}).


## data-id is different in the markup

* Issue:

    I am getting the expected markup but the markups are generated with the `data-id` which is different to one another hence failing to pass the test.

* Cause:

    The `data-id` of the components is automatically generated in our components and it is unique for each instance. Thus, this is an expected difference in the output if you call `RenderComponent` twice.    

* Workaround:

    This attribute is used for internal purposes only and should not be included in the check.You may implement a method that can strip the unique attributes from the component, or verify particular elements using their CSS selectors (for instance `div.k-grid`). 




### Events that are attached with js - ticket 1609623

...

## MultiSelect OnRead https://supportheroes.telerik.com/ticket/1538788

...

## Fire change event - ticket 1567237

...

## Solutions and Workarounds

* Mock the component
https://bunit.dev/docs/providing-input/substituting-components.html?tabs=moq
https://supportheroes.telerik.com/ticket/1623679

* Refactor the component structure of your app, so that you can test a component that doesn't contain our Scheduler.

## Example

You can find a sample project about unit testing the UI of a Blazor app that contains Telerik UI for Blazor components in the following sample projects that also utilize bUnit:

* <a href="https://github.com/telerik/blazor-ui/tree/master/testing" target="_blank">https://github.com/telerik/blazor-ui/tree/master/testing</a>.

You can also visit the <a href="https://www.telerik.com/blogs/unit-testing-blazor-components-bunit-justmock" target="_blank">Unit Testing Blazor Components with bUnit and JustMock</a> blog post.
