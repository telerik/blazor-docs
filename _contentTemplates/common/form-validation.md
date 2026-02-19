#note-validation
The Telerik Blazor validation tools let you match the style of your validation messages to all other Telerik Blazor components in your app. The validation tools do not expose API or settings for specific validation logic. You need to handle the validation logic separately and then use the [Telerik Blazor UI](https://www.telerik.com/blazor-ui) components to display messages to the end user.
#end

#note-telerik-role-in-validation
> The Telerik components for Blazor do not perform the actual validation of the model. Validation is managed by the [`EditContext`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.editcontext). The role of the Telerik components is to call `EditContext` methods, subscribe to `EditContext` events, retrieve validation messages, and display them. If a validation scenario does not work as expected, check the behavior in a standard Blazor `<EditForm>` to verify if the issue is related to the Telerik components.
#end

#note-editcontext-formitem-template
> When using the [Form `EditContext` parameter](slug:form-overview#creating-blazor-form) together with [validation components](slug:validation-tools-overview) or [Form item `<Template>`s](slug:form-formitems-template), make sure to create the `EditContext` from the model instance, which is used by the validation components and inside the Form item templates. Otherwise, the Form will not update the correct object instance and validation will not work as expected.
#end
