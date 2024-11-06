#note-validation
The Telerik Blazor validation tools provide a way to display different types of validation messages. The main benefit is consistent styling with all other Telerik Blazor components. The validation tools do not expose API or settings for specific validation logic. You should configure the desired standard or custom validation separately, and then use our UI components to display messages to the user.
#end

#note-telerik-role-in-validation
> The Telerik components for Blazor do not perform the actual validation of the model. Validation is managed by the [`EditContext`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.editcontext). The role of the Telerik components is to call `EditContext` methods, subscribe to `EditContext` events, retrieve validation messages, and display them. If a validation scenario does not work as expected, check the behavior in a standard Blazor `<EditForm>` to verify if the issue is related to the Telerik components.
#end

#note-editcontext-formitem-template
> When using the [Form `EditContext` parameter]({%slug form-overview%}#creating-blazor-form) together with [validation components]({%slug validation-tools-overview%}) or [Form item `<Template>`s]({%slug form-formitems-template%}), make sure to create the `EditContext` from the model instance, which is used by the validation components and inside the Form item templates. Otherwise, the Form will not update the correct object instance and validation will not work as expected.
#end
