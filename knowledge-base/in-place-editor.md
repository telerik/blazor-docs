---
title: In-Place Editor Component
description: Learn how to create a custom inplace editor component, which blends seamlessly in other web page text content.
type: how-to
page_title: How to Implement In-Place Editor Component
slug: kb-in-place-editor
position:
tags: telerik, blazor, inplace, in place
ticketid:
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>UI for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB article demonstrates and describes how to create a custom `InPlaceEditor` component. The article also answers the following questions:

* How to create an in-place editor, which looks like text when in read mode and switches to an input component when editable?
* How to toggle between text content and an editor to allow users to edit something in place?

## Solution

The sample below uses an algorithm which toggles between read-only UI and an editable component on user click and blur.

### How It Works

* `InPlaceEditor` is a generic component. It supports strings and most value types, including nullable types.
* Initially, the component renders a clickable [Button](slug://components/button/overview) with [`Clear` `FillMode`](slug://button-appearance) that shows the current `Value`.
* The component detects the type of its `Value` and renders the appropriate Telerik editor:
    * [CheckBox](slug://checkbox-overview) for `bool`
    * [DatePicker](slug://components/datepicker/overview) for `DateTime` and `DateOnly`
    * [NumericTextBox](slug://components/numerictextbox/overview) for `int`, `double`, `decimal`, and the other numeric types
    * [TextBox](slug://components/textbox/overview) for `string`
    * [TimePicker](slug://components/timepicker/overview) for `TimeOnly`
* If the `Width` parameter is not set, the In-Place Editor approximately matches the width of its editor components to the current `Value` length. The component uses a `monospace` `font-family` to make this easier.
* The component features a `ReadOnly` mode that controls the editability, for example, depending on user permissions.
* The `DisplayFormat` parameter affects the `Value` consistently in both read mode and edit mode.
* The `Placeholder` parameter provides a helper label that will show when the `Value` is `null` or empty.
* The `ShowIcons` parameter controls the visibility of optional [SVG Icons](slug://common-features-icons#svgicon-component). The icons hint users about the ability to edit the component `Value` or provide clickable **Save** and **Cancel** commands in edit mode. The parameter is of type `InPlaceEditorShowIcons`, which is a custom enum and must be imported in both `InPlaceEditor.razor` and all `.razor` files that use `InPlaceEditor`.
* The `Class` parameter allows you to apply custom styles.
* The `Title` parameter allows you to show a tooltip hint on read mode.
* To [see invalid state styling and validation messages in Forms](slug://inputs-kb-validate-child-component), pass the respective `ValueExpression` values to the `InPlaceEditor` component.
* `InPlaceEditor.razor.css` is a <a href="https://learn.microsoft.com/en-us/aspnet/core/blazor/components/css-isolation" target="_blank">CSS isolation file</a>. It depends on a `YourAppName.styles.css` file in `App.razor` to load.

### Example

The features and business logic below can be subject to additional customizations and enhancements.

To run the code successfully:

* Replace `YourAppName` with the actual root namespace of your app.
* Make sure your app supports CSS isolation and loads a `YourAppName.styles.css` file. Browser caching of this file can prevent the InPlaceEditor styles from showing.

<div class="skip-repl"></div>

````RAZOR Home.razor
@* import InPlaceEditorType enum *@
@using YourAppName.Models

@using System.ComponentModel.DataAnnotations

<h1>InPlaceEditor Component</h1>

<p>
    This in-place editor component works with strings and value types, including nullables, for example:

    <InPlaceEditor @bind-Value="@NumericValue"
                   DisplayFormat="C2"
                   Placeholder="Enter Number..." />

    The component supports custom styles and responsive textbox width that depends on the value:

    <InPlaceEditor @bind-Value="@StringValue"
                   Class="primary-color"
                   ShowIcons="@InPlaceEditorShowIcons.Hover" />

    The icon can be visible only on hover:

    <InPlaceEditor @bind-Value="@DateValue"
                   Class="primary-color"
                   DisplayFormat="d"
                   ShowIcons="@InPlaceEditorShowIcons.Hover" />

    (unless the value is empty) or never:

    <InPlaceEditor @bind-Value="@TimeValue"
                   Class="primary-color"
                   DisplayFormat="HH:mm"
                   ShowIcons="@InPlaceEditorShowIcons.Never" />

    You can even edit booleans:

    <InPlaceEditor @bind-Value="@BoolValue"
                   Class="primary-color" />
</p>

<h2>Configuration</h2>

<ul>
    <li>
        <label for="editor-placeholder">Placeholder: </label>
        <TelerikTextBox @bind-Value="@InPlaceEditorPlaceholder"
                        Id="editor-placeholder"
                        ShowClearButton="true"
                        Width="180px" />
    </li>
    <li><label><TelerikCheckBox @bind-Value="@InPlaceEditorReadOnly" />  Read Only</label></li>
    <li>
        <span>Show Icon: </span>
        <TelerikButtonGroup SelectionMode="@ButtonGroupSelectionMode.Single">
            <ButtonGroupToggleButton Selected="@( InPlaceEditorShowIcons == InPlaceEditorShowIcons.Always )"
                                     OnClick="@( () => InPlaceEditorShowIcons = InPlaceEditorShowIcons.Always )">
                Always
            </ButtonGroupToggleButton>
            <ButtonGroupToggleButton Selected="@( InPlaceEditorShowIcons == InPlaceEditorShowIcons.Hover )"
                                     OnClick="@( () => InPlaceEditorShowIcons = InPlaceEditorShowIcons.Hover )">
                Hover
            </ButtonGroupToggleButton>
            <ButtonGroupToggleButton Selected="@( InPlaceEditorShowIcons == InPlaceEditorShowIcons.Never )"
                                     OnClick="@( () => InPlaceEditorShowIcons = InPlaceEditorShowIcons.Never )">
                Never
            </ButtonGroupToggleButton>
        </TelerikButtonGroup>
    </li>
    <li>
        <label for="editor-title">Title: </label>
        <TelerikTextBox @bind-Value="@InPlaceEditorTitle"
                        Id="editor-title"
                        ShowClearButton="true"
                        Width="180px" />
    </li>
    <li>
        <label for="editor-width">Editor Width: </label>
        <TelerikNumericTextBox @bind-Value="@InPlaceEditorWidth"
                               Format="# px"
                               Id="editor-width"
                               Width="120px" />
    </li>
</ul>

<p>
    In Place Editor:
    <InPlaceEditor @bind-Value="@InPlaceEditorValue"
                   Class="primary-color"
                   Placeholder="@InPlaceEditorPlaceholder"
                   ReadOnly="@InPlaceEditorReadOnly"
                   ShowIcons="@InPlaceEditorShowIcons"
                   Title="@InPlaceEditorTitle"
                   Width="@( InPlaceEditorWidth.HasValue ? $"{InPlaceEditorWidth}px" : null )" />
</p>

<h2>Form Validation</h2>

<TelerikForm Model="@Employee">
    <FormValidation>
        <DataAnnotationsValidator />
    </FormValidation>
    <FormItems>
        <FormItem Field="@nameof(Person.Name)">
            <Template>
                Name:
                <InPlaceEditor Value="@Employee.Name"
                               ValueChanged="@( (string newValue) => Employee.Name = newValue )"
                               ValueExpression="@( () => Employee.Name )"
                               Placeholder="Enter Name..." />
                <TelerikValidationMessage For="@( () => Employee.Name )" />
            </Template>
        </FormItem>
        <FormItem Field="@nameof(Person.BirthDate)">
            <Template>
                Hire Date:
                <InPlaceEditor Value="@Employee.BirthDate"
                               ValueChanged="@( (DateTime? newValue) => Employee.BirthDate = newValue )"
                               ValueExpression="@( () => Employee.BirthDate )"
                               DisplayFormat="d"
                               Placeholder="Enter Date..."
                               T="@(DateTime?)" />
                <TelerikValidationMessage For="@( () => Employee.BirthDate )" />
            </Template>
        </FormItem>
    </FormItems>
</TelerikForm>

<style>
    h1 {
        font-size: 1.5rem;
    }

    h2 {
        font-size: 1.2rem;
    }

    .primary-color {
        color: var(--kendo-color-primary);
    }
</style>

@code {
    private bool BoolValue { get; set; }
    private DateTime? DateValue { get; set; } = DateTime.Now;
    private decimal? NumericValue { get; set; } = 1.23m;
    private string StringValue { get; set; } = "foo bar";
    private TimeOnly TimeValue { get; set; } = TimeOnly.FromDateTime(DateTime.Now);

    private string InPlaceEditorPlaceholder { get; set; } = "Enter Value...";
    private bool InPlaceEditorReadOnly { get; set; }
    private InPlaceEditorShowIcons InPlaceEditorShowIcons { get; set; } = InPlaceEditorShowIcons.Always;
    private string InPlaceEditorTitle { get; set; } = "Edit Sample Value";
    private string InPlaceEditorValue { get; set; } = "foo bar";
    private int? InPlaceEditorWidth { get; set; } = 120;

    private Person Employee { get; set; } = new();

    public class Person
    {
        [Required]
        public string? Name { get; set; } = string.Empty;
        [Required]
        public DateTime? BirthDate { get; set; }
    }
}
````
````RAZOR InPlaceEditor.razor
@* import InPlaceEditorType enum *@
@using YourAppName.Models

@using System.Globalization
@using System.Linq.Expressions

@typeparam T

<span class="@ClassToRender"
      @onkeydown="@OnSpanKeyDown"
      @onfocusin="@OnSpanFocusIn">
    @if (IsInEditMode)
    {
        switch (ValueEditorType)
        {
            case InPlaceEditorType.CheckBox:
                <TelerikCheckBox @ref="@CheckBoxRef"
                                 Value="@Convert.ToBoolean(Value)"
                                 ValueChanged="@( (bool newValue) => OnEditorValueChanged(newValue) )"
                                 ValueExpression="@( ValueExpression as Expression<Func<bool>> )"
                                 OnBlur="@OnEditorChange"
                                 Class="@CheckBoxClass" />
                break;
            case InPlaceEditorType.DatePicker:
                <TelerikDatePicker @ref="@DatePickerRef"
                                   Value="@Value"
                                   ValueChanged="@( (T newValue) => OnEditorValueChanged(newValue!) )"
                                   ValueExpression="@( ValueExpression as Expression<Func<T>> )"
                                   Format="@DisplayFormat"
                                   T="@T"
                                   OnChange="@OnEditorChange"
                                   Class="@InputClass"
                                   Width="@GetEditorWidth(InPlaceEditorType.DatePicker)" />
                break;
            case InPlaceEditorType.NumericTextBox:
                <TelerikNumericTextBox @ref="@NumericTextBoxRef"
                                       Value="@Value"
                                       ValueChanged="@( (T newValue) => OnEditorValueChanged(newValue!) )"
                                       ValueExpression="@( ValueExpression as Expression<Func<T>> )"
                                       Format="@DisplayFormat"
                                       OnChange="@OnEditorChange"
                                       T="@T"
                                       Class="@InputClass"
                                       Width="@GetEditorWidth(InPlaceEditorType.NumericTextBox)" />
                break;
            case InPlaceEditorType.TimePicker:
                <TelerikTimePicker @ref="@TimePickerRef"
                                   Value="@Value"
                                   ValueChanged="@( (T newValue) => OnEditorValueChanged(newValue!) )"
                                   ValueExpression="@( ValueExpression as Expression<Func<T>> )"
                                   Class="@InputClass"
                                   Format="@DisplayFormat"
                                   OnChange="@OnEditorChange"
                                   T="@T"
                                   Width="@GetEditorWidth(InPlaceEditorType.TimePicker)" />
                break;
            default:
                <TelerikTextBox @ref="@TextBoxRef"
                                Value="@Value?.ToString()"
                                ValueChanged="@( (string newValue) => OnEditorValueChanged(newValue) )"
                                ValueExpression="@( ValueExpression as Expression<Func<string>> )"
                                Class="@InputClass"
                                OnChange="@OnEditorChange"
                                Width="@GetEditorWidth(InPlaceEditorType.TextBox)" />
                break;
        }
        if (ShouldRenderEditIcon)
        {
            <TelerikButton Class="@ButtonClass"
                           Icon="@SvgIcon.Save"
                           FillMode="@ThemeConstants.Button.FillMode.Clear"
                           OnClick="@OnSaveButtonClick" />
            <TelerikButton Class="@ButtonClass"
                           Icon="@SvgIcon.Cancel"
                           FillMode="@ThemeConstants.Button.FillMode.Clear"
                           OnClick="@OnCancelButtonClick" />
        }
    }
    else if (!ReadOnly)
    {
        <TelerikButton @ref="@EditButtonRef"
                       Class="@EditButtonClass"
                       FillMode="@ThemeConstants.Button.FillMode.Clear"
                       OnClick="@ToggleEditMode"
                       Title="@Title">
            @if (Value != null && (ValueType == typeof(bool) || !Value.Equals(default(T))) && !string.IsNullOrEmpty(Value.ToString()))
            {
                @GetFormattedValue()
            }
            else
            {
                <span class="@PlaceholderClass">@Placeholder</span>
            }
            @if (ShouldRenderEditIcon)
            {
                <TelerikSvgIcon Icon="@SvgIcon.Pencil" Class="@EditIconClass" />
            }
        </TelerikButton>
    }
    else
    {
        @GetFormattedValue()
    }
</span>
@code {
    #region Parameters

    /// <summary>
    /// A CSS class that can apply custom styles.
    /// </summary>
    [Parameter]
    public string? Class { get; set; }

    /// <summary>
    /// The format string that will be used to display the component <see cref="Value" /> in read and edit mode.
    /// </summary>
    [Parameter]
    public string? DisplayFormat { get; set; }

    /// <summary>
    /// The label that will show if the component <see cref="Value" /> matches the default one for the type.
    /// </summary>
    [Parameter]
    public string Placeholder { get; set; } = string.Empty;

    /// <summary>
    /// Sets if the user can edit the component <see cref="Value" />.
    /// </summary>
    [Parameter]
    public bool ReadOnly { get; set; }

    /// <summary>
    /// Defines when the edit icon shows - always, on hover or never. The default value is <see cref="InPlaceEditorShowIcons.Always" />.
    /// </summary>
    [Parameter]
    public InPlaceEditorShowIcons ShowIcons { get; set; } = InPlaceEditorShowIcons.Always;

    /// <summary>
    /// The tooltip content that shows in read mode.
    /// </summary>
    [Parameter]
    public string Title { get; set; } = "Edit Value";

    /// <summary>
    /// The editable component value. The supported types include <see cref="string" />, signed numeric types,
    /// <see cref="DateTime" />, <see cref="TimeOnly" />, and <see cref="bool" />
    /// </summary>
    [Parameter]
    public T? Value { get; set; }

    /// <summary>
    /// An event that fires when the user edits the component <see cref="Value" />.
    /// </summary>
    [Parameter]
    public EventCallback<T> ValueChanged { get; set; }

    /// <summary>
    /// The <see cref="Expression"/> used for Form validation.
    /// </summary>
    [Parameter]
    public Expression<Func<T>>? ValueExpression { get; set; }

    /// <summary>
    /// The width style of the edit component (DatePicker, NumericTextBox, TextBox, TimePicker). Not relevant to checkboxes.
    /// </summary>
    [Parameter]

    public string Width { get; set; } = string.Empty;

    #endregion Parameters

    #region Constants

    private const string InPlaceEditorClass = "in-place-editor";

    private const string CheckBoxClass = "in-place-checkbox";

    private const string ButtonClass = "in-place-button";

    private const string EditButtonClass = $"{ButtonClass} in-place-edit-button";

    private const string IconClass = "in-place-icon";

    private const string IconHoverableClass = $"{IconClass} in-place-hoverable-icon";

    private const string InputClass = "in-place-input";

    private const string PlaceholderClass = "in-place-placeholder";

    #endregion Constants

    #region Properties

    private readonly string DataId = Guid.NewGuid().ToString();

    private T? OriginalEditValue { get; set; }

    private Type ValueType { get; set; } = typeof(string);

    private InPlaceEditorType ValueEditorType { get; set; } = InPlaceEditorType.TextBox;

    private bool IsInEditMode { get; set; }

    private bool ShouldFocusEditor { get; set; }

    private bool ShouldRenderEditIcon => ShowIcons != InPlaceEditorShowIcons.Never || GetFormattedValue().Length == 0;

    private bool ShouldWaitForCancel { get; set; }

    private bool ShouldFocusEditButton { get; set; }

    private string ClassToRender => string.Format("{0} {1}", InPlaceEditorClass, Class);

    private string EditIconClass => ShowIcons == InPlaceEditorShowIcons.Hover && GetFormattedValue().Length > 0 ? IconHoverableClass : IconClass;

    #endregion Properties

    #region Telerik Components

    private TelerikButton? EditButtonRef { get; set; }
    private TelerikTextBox? TextBoxRef { get; set; }
    private TelerikNumericTextBox<T>? NumericTextBoxRef { get; set; }
    private TelerikDatePicker<T>? DatePickerRef { get; set; }
    private TelerikTimePicker<T>? TimePickerRef { get; set; }
    private TelerikCheckBox<bool>? CheckBoxRef { get; set; }

    private async Task OnEditorValueChanged(object newValue)
    {
        Value = (T)newValue;
        if (ValueChanged.HasDelegate)
        {
            await ValueChanged.InvokeAsync((T)newValue);
        }
    }

    #endregion Telerik Components

    #region Methods

    private void OnEditorChange(object newValue)
    {
        if (!ShouldRenderEditIcon)
        {
            IsInEditMode = false;
        }
        else
        {
            ShouldWaitForCancel = true;
        }
    }

    private void OnSaveButtonClick()
    {
        IsInEditMode = false;
        ShouldFocusEditButton = true;
    }

    private void OnCancelButtonClick()
    {
        Value = OriginalEditValue;
        ShouldFocusEditButton = true;
        IsInEditMode = false;
    }

    private async Task OnSpanKeyDown(KeyboardEventArgs args)
    {
        if (args.Key == "Escape")
        {
            Value = OriginalEditValue;
            IsInEditMode = false;
            if (ValueChanged.HasDelegate)
            {
                await ValueChanged.InvokeAsync(Value);
            }
        }

        if (args.Key == "Enter")
        {
            IsInEditMode = false;
        }
    }

    private void OnSpanFocusIn(FocusEventArgs args)
    {
        ShouldWaitForCancel = false;
    }

    private string GetEditorWidth(InPlaceEditorType editorType)
    {
        if (!string.IsNullOrEmpty(Width))
        {
            return Width;
        }
        switch (editorType)
        {
            case InPlaceEditorType.DatePicker:
                return $"{Math.Max(GetFormattedValue().Length, 9)}em".Replace(",", ".");
            case InPlaceEditorType.NumericTextBox:
                return $"{Math.Max(GetFormattedValue().Length * .6 + 3, 7)}em".Replace(",", ".");
            case InPlaceEditorType.TextBox:
                return $"{Math.Max(GetFormattedValue().Length * .75, 7)}em".Replace(",", ".");
            case InPlaceEditorType.TimePicker:
                return $"{GetFormattedValue().Length + 2}em".Replace(",", ".");
            default:
                throw new ArgumentOutOfRangeException(nameof(InPlaceEditorType));
        }
    }

    private void ToggleEditMode()
    {
        IsInEditMode = !IsInEditMode;
        if (IsInEditMode)
        {
            OriginalEditValue = Value;
            ShouldFocusEditor = true;
        }
    }
    private string GetFormattedValue()
    {
        if (IsNumericValueType())
        {
            return Convert.ToDouble(Value).ToString(DisplayFormat);
        }
        else if ((ValueType == typeof(DateTime) || ValueType == typeof(DateOnly)) && Value != null)
        {
            return Convert.ToDateTime(Value).ToString(DisplayFormat);
        }
        else if (ValueType == typeof(TimeOnly))
        {
            var success = TimeOnly.TryParse(Value?.ToString() ?? string.Empty, CultureInfo.InvariantCulture, out TimeOnly timeOnly);
            if (success)
            {
                return timeOnly.ToString(DisplayFormat);
            }
            else
            {
                return string.Empty;
            }
        }
        else if (ValueType == typeof(bool))
        {
            return Convert.ToBoolean(Value).ToString();
        }
        else
        {
            return Value?.ToString() ?? string.Empty;
        }
    }
    private void GetValueType()
    {
        if (Value == null)
        {
            Type? nullableType = Nullable.GetUnderlyingType(typeof(T));
            if (nullableType != null)
            {
                ValueType = nullableType;
            }
            else
            {
                throw new ArgumentNullException(nameof(Value));
            }
        }
        else
        {
            ValueType = Value.GetType();
        }
        if (IsNumericValueType())
        {
            ValueEditorType = InPlaceEditorType.NumericTextBox;
        }
        else if (ValueType == typeof(DateTime) || ValueType == typeof(DateOnly))
        {
            ValueEditorType = InPlaceEditorType.DatePicker;
        }
        else if (ValueType == typeof(TimeOnly))
        {
            ValueEditorType = InPlaceEditorType.TimePicker;
        }
        else if (ValueType == typeof(bool))
        {
            ValueEditorType = InPlaceEditorType.CheckBox;
        }
    }
    private bool IsNumericValueType()
    {
        return
            ValueType == typeof(int) ||
            ValueType == typeof(short) ||
            ValueType == typeof(byte) ||
            ValueType == typeof(long) ||
            ValueType == typeof(float) ||
            ValueType == typeof(double) ||
            ValueType == typeof(decimal);
    }

    #endregion Methods

    #region Life Cycle Events

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (ShouldFocusEditor)
        {
            ShouldFocusEditor = false;
            await Task.Delay(100);

            if (NumericTextBoxRef != null)
                await NumericTextBoxRef.FocusAsync();
            if (DatePickerRef != null)
                await DatePickerRef.FocusAsync();
            if (TimePickerRef != null)
                await TimePickerRef.FocusAsync();
            if (CheckBoxRef != null)
                await CheckBoxRef.FocusAsync();
            if (TextBoxRef != null)
                await TextBoxRef.FocusAsync();
        }

        if (ShouldFocusEditButton)
        {
            ShouldFocusEditButton = false;
            await Task.Delay(100);
            if (EditButtonRef != null)
            {
                await EditButtonRef.FocusAsync();
            }
        }

        if (ShouldWaitForCancel)
        {
            await Task.Delay(100);
            if (ShouldWaitForCancel)
            {
                ShouldWaitForCancel = false;
                IsInEditMode = false;
                StateHasChanged();
            }
        }
    }

    protected override void OnInitialized()
    {
        GetValueType();

        base.OnInitialized();
    }

    #endregion Life Cycle Events

    public enum InPlaceEditorType
    {
        CheckBox,
        DatePicker,
        TimePicker,
        NumericTextBox,
        TextBox
    }
}
````
````CSS InPlaceEditor.razor.css
/*
    This .razor.css file relies on Blazor CSS isolation, which in turn requires a YourAppName.styles.css file in App.razor.
    Make sure that the browser doesn't load an old cached version of this file, otherwise you may not see the InPlaceEditor styles.
    A symptom of this problem are persistent icons when ShowIcons="InPlaceEditorShowIcons.Hover".
*/

.in-place-editor {
    display: inline-flex;
    font-family: monospace;
}

::deep .in-place-checkbox {
    margin-inline: 1em;
}

::deep .in-place-button,
::deep .in-place-icon {
    color: inherit;
}

::deep .in-place-icon {
    margin-inline-start: .5em;
}

::deep .in-place-hoverable-icon {
    display: none;
}

::deep .in-place-edit-button:hover {
    background-color: var(--kendo-color-base) !important;
}

    ::deep .in-place-edit-button:hover .in-place-hoverable-icon {
        display: inline-flex;
    }

::deep .in-place-placeholder {
    color: var(--kendo-color-secondary);
}
````
````C# InPlaceEditorShowIcons.cs
namespace YourAppName.Models
{
    public enum InPlaceEditorShowIcons
    {
        Always,
        Hover,
        Never
    }
}
````

## See Also

* [Button Overview](slug://components/button/overview)
* [CheckBox Overview](slug://checkbox-overview)
* [DatePicker Overview](slug://components/datepicker/overview)
* [NumericTextBox Overview](slug://components/numerictextbox/overview)
* [TextBox Overview](slug://components/textbox/overview)
* [TimePicker Overview](slug://components/timepicker/overview)
