---
title: Requires a value for ValueExpression
description: Requires a value for ValueExpression.
type: troubleshooting
page_title: Requires a value for ValueExpression
slug: common-kb-requires-valueexpression
position: 
tags: 
ticketid: 1451865
res_type: kb
---


## Description
I have a Telerik input component (such as a texbox, or an autocomplete, or a dropdown) working fine on a component in my app. When I use this component elsewhere (like in a modal in a form), it starts throwing errors.

## Error Message
>warning Error SystemInvalidOperationException: Telerik.Blazor.Components.SomeComponent requires a value for 'ValueExpression'. ValueExpression is provided automatically when using 'bind-Value'

## Cause\Possible Cause(s)
The most common reason for this error is a combination of the following:

* The component does not use `@bind-Value="@myModel.MyField"`, but simply `Value="@myModel.MyField"`, or its `Value` is not even specified
* The component is now in an `EditForm` but this may be coming from its parent component, but it is not prepared for that

This error comes from the framework and applies to generic inputs as well, not only the Telerik components. At the time of writing, I was not able to find an official resource for the `ValueExpression` feature. The closest is the example for a `ValidationMessage` at [https://docs.microsoft.com/en-us/aspnet/core/blazor/forms-validation?view=aspnetcore-3.1#validation-summary-and-validation-message-components](https://docs.microsoft.com/en-us/aspnet/core/blazor/forms-validation?view=aspnetcore-3.1#validation-summary-and-validation-message-components). Hopefully, the validation documentation in MSDN will be updated to include information about this parameter in the future.

## Solution
There are three common ways to resolve such an error:

* Use two-way binding - the `@bind-Value` syntax if you can. If you need to handle the `ValueChanged` even to implement logic, see this article: [How to handle the ValueChanged event and use forms and validation]({%slug value-changed-validation-model%}). It shows how to use the `ValueExpression` parameter and also hints at using the Telerik-specific `OnChange` event that does not prevent two-way binding.
* Provide a `ValueExpression` to the component. This is a lambda function that tells the framework what field in the model to update. It is required by the framework when you cannot use `@bind-Value`, but the component is inside a form. The article in the previous point shows an example.
    * You may want to always provide a `ValueExpression` when expecting to reuse input components inside wrapped in a component. This makes them more likely to work when placed inside an `EditForm` from a parent component.
    
    **Razor**
    
        <TelerikTextBox 
            Value="@myModel.MyField"
            ValueExpression="@( () => myModel.MyField )">
        </TelerikTextBox>
    
        @* Applies to the other input type components as well *@
    
* Move the `EditForm` inside the component that hosts all the input. This will make it throw the exception immediately, not only when used in a particular case. This will let you evaluate how to solve the situation according to the previous points, and can let you expose only relevant events/logic/parameters to its parents, instead of expecting them to provide a form and validator.
* If you do not define a `Value` at all, consider whether such an input needs to be in the form in the first place (for example, putting an `<InputText />` in an `EditForm` without defining the value and binding settings will throw the same error.

