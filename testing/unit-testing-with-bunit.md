---
title: Unit Testing With bUnit
page_title: Unit Testing With bUnit
description: Unit Test your Blazor apps by isolating the tested code from its dependencies with a mocking tool like JustMock. 
tags: unit test, bUnit, mock, mocking, mocking tool, mocking solution, mocking software, mocking framework, Blazor
slug: unit-test-with-bunit
position: 5
---

# Unit Testing With bUnit

This article provides information for bUnit and how it can be used with the Telerik UI for Blazor components.

* [What is bUnit](#what-is-bunit)
* [E2E vs. Unit Testing](#e2e-vs-unit-testing)
* [bUnit Limitations](#bunit-limitations)
* [Testing the Telerik UI for Blazor Components](#testing-the-telerik-ui-for-blazor-components-with-bunit)
* [Common Issues](#common-issues)
* [Resources](#resources)


## What is bUnit

[bUnit](https://bunit.dev/) is a popular unit testing framework for Blazor. 

bUnit covers explicitly unit testing and is not designed for e2e testing. It only runs your C# and Razor code, and not JavaScript.

Check the following resources for a general introduction to bUnit:
* https://bunit.dev/docs/getting-started
* https://youtu.be/Co7QetPYiO4

## E2E vs. Unit Testing

The main difference between e2e tests and unit tests is that end-to-end testing focuses on the application's behavioral flow (clicking a button that populates a message) while unit testing targets functional fragments. 

End-to-end tests allow you to test the application from the user's point of view. One tool you can use for end-to-end testing in Blazor is the Selenium framework.

Unit testing focuses on functional verification. You can use unit tests to ensure that the functions or calculations that generate data, a numerical value, or a text string, are working as expected.

A case that requires an interaction with the component is a task for e2e testing.

## bUnit Limitations

A known limitation of bUnit is that it does not run JavaScript. So, if the components use some JSInterop, one should emulate `IJSRuntime`. You can find some more details in the [bUnit documentation](https://bunit.dev/docs/test-doubles/emulating-ijsruntime.html).

## Testing the Telerik UI for Blazor Components with bUnit

The Telerik UI for Blazor components rely on JSInterop to support their rich UX features. This can make testing with bUnit difficult or even impossible in some scenarios due to the above-listed limitation.

You don't have to test our components, as we do that ourselves. Any unit tests for custom markup and logic have to test just that—the custom logic in an isolated scenario.

Consider e2e testing for any case that targets a complete workflow.

## Common Issues

Considering the above-listed JS limitation, you may experience some issues when testing the components. The following sections in this article list these issues.

### TelerikRootComponent is Missing

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Subject | Details |
| --- | --- |
| Issue | When testing a DatePicker the test fails with: <br/> ````System.Exception : A Telerik component on the requested view requires a TelerikRootComponent to be added to the root of the MainLayout component of the app.```` | 
| Cause |  A possible cause for this error is that in the test the component is rendered in isolation, without a layout, so the `TelerikRootComponent` is missing.|
| Workaround | Ether [mock the `TelerikRootComponent`](https://github.com/telerik/blazor-ui/blob/master/testing/bUnit-justmock/Telerik.Blazor.BUnit.JustMock/Common/TelerikTestContext.cs) or use an [actual `TelerikRootComponent`](https://github.com/telerik/blazor-ui/blob/master/testing/bUnit-justmock/Telerik.Blazor.BUnit.JustMock/Common/TelerikTestContextWithActualRoot.cs). |

### Attribute `data-id` is different in the markup

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Subject | Details |
| --- | --- |
| Issue | Trying to detect an element by `data-id` fails as every time the `data-id` value in the generated markup is different. |
| Cause | The `data-id` of the components is automatically generated in our components and it is unique for each instance. Thus, this is an expected difference in the output if you call `RenderComponent` twice. |
| Workaround | This attribute is used for internal purposes only and should not be included in the check. You may implement a method that can strip the unique attributes from the component, or verify particular elements using their CSS selectors (for instance `div.k-grid`). |

### Scheduler Throws an Error

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Subject | Details |
| --- | --- |
| Issue | Testing a component that contains a Scheduler fails with the following error: <br/> ````System.NullReferenceException : Object reference not set to an instance of an object.   at Telerik.Blazor.Components.Scheduler.Rendering.ContentTableBase`1.SetSlotMetrics(Dictionary`2metrics) at Telerik.Blazor.Components.Scheduler.Rendering.ContentTableBase`1.GetSlotMetrics()```` |
| Cause | The root cause is that the Scheduler must render in the browser and then measure and adjust its layout with JavaScript. Then this information is sent to the .NET runtime to be used there. |
| Workaround | [Mock the component](https://bunit.dev/docs/providing-input/substituting-components.html?tabs=moq) or refactor the component structure of your app, so that you can test a component that doesn't contain our Scheduler. |

### Cannot Find Dialog Content

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Subject | Details |
| --- | --- |
| Issue | Detecting the content of a Dialog fails. |
| Cause | The Dialog, Window and popup elements are rendered on root level and not in their place of declaration. |
| Workaround | To detect the popup content, target the `RootComponent` and search inside it. See: [Dialog example](https://github.com/telerik/blazor-ui/blob/master/testing/bUnit-justmock/Telerik.Blazor.BUnit.JustMock/DemoSample/DialogPage.cs) and [Window example](https://github.com/telerik/blazor-ui/blob/master/testing/bUnit-justmock/Telerik.Blazor.BUnit.JustMock/DemoSample/WindowButtonPage.cs). <br/> <br/> There is a feature request for UI for Blazor to support the [creation of an interface to easily mock the DialogFactory](https://feedback.telerik.com/blazor/1533040-create-an-interface-to-easily-mock-the-dialogfactory). Follow the request to get status updates. |

### Grid `OnRead` Not Fired

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Subject | Details |
| --- | --- |
| Issue | In test environment, `OnRead` is not raised after invoking `Rebind`. |
| Cause | When `Rebind` is called, the Grid shows a loader. This loader is invoked with JS Interop, so the test fails silently. |
| Workaround | Disable the [built-in loader](slug:grid-loading). |

## Resources

The following samples demonstrate unit testing a Blazor app with Telerik UI for Blazor components, including with bUnit:

* <a href="https://github.com/telerik/blazor-ui/tree/master/testing" target="_blank">https://github.com/telerik/blazor-ui/tree/master/testing</a>.

You can also visit the <a href="https://www.telerik.com/blogs/unit-testing-blazor-components-bunit-justmock" target="_blank">Unit Testing Blazor Components with bUnit and JustMock</a> blog post.
