---
title: In-Place Editor Component
description: Learn how to create a custom inplace editor component, which blends seamlessly in other web page text content.
type: how-to
page_title: How to Implement In-Place Editor
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

* `TelerikInPlaceEditor` is a generic component. It supports strings and most value types, including nullable types.
* Initially, the component renders a clickable [Button]({%slug components/button/overview%}}) with [`Clear` `FillMode`]({%slug button-appearance%}) that shows the current `Value`.
* The component detects the type of its `Value` and renders the appropriate Telerik editor:
    * [CheckBox]({%slug checkbox-overview%}}) for `bool`
    * [DatePicker]({%slug components/datepicker/overview%}}) for `DateTime` and `DateOnly`
    * [NumericTextBox]({%slug components/numerictextbox/overview%}}) for `int`, `double`, `decimal`, and the other numeric types
    * [TextBox]({%slug components/textbox/overview%}}) for `string`
    * [TimePicker]({%slug components/timepicker/overview%}}) for `TimeOnly`
* If the `Width` parameter is not set, the In-Place Editor approximately matches the width of its editor components to the current `Value` length. The component uses a `monospace` `font-family` to make this easier.
* The component features a `ReadOnly` mode that controls the editability, for example, depending on user permissions.
* The `DisplayFormat` parameter affects the `Value` consistently in both read mode and edit mode.
* The `Placeholder` parameter provides a helper label that will show when the `Value` is `null` or empty.
* The `ShowIcon` parameter controls the visibility of an optional [SVG Icon]({%slug common-features-icons%}}#svgicon-component) that hints users about the ability to edit the component `Value`. The parameter is of type `InPlaceEditorShowIcon`, which is a custom enum and must be imported in both `TelerikInPlaceEditor.razor` and all `.razor` files that use `TelerikInPlaceEditor`.
* To [see invalid state styling and validation messages in Forms]({%slug inputs-kb-validate-child-component%}), pass the respective `ValueExpression` values to the `InPlaceEditor` component.

### Example

The features and business logic below can be subject to additional customizations and enhancements.

<div class="skip-repl"></div>

````Home.razor
@* import InPlaceEditorType enum *@
@using YourAppName.Models

@using System.ComponentModel.DataAnnotations

<h1>InPlaceEditor Component</h1>

<p>
    This in-place editor component works with multiple value types

    <TelerikInPlaceEditor @bind-Value="@NumericValue" DisplayFormat="C2" />

    The edit icon shows by default, but it can be visible only on hover

    <TelerikInPlaceEditor @bind-Value="@StringValue" ShowIcon="@InPlaceEditorShowIcon.Hover" />

    (unless the value is empty) or hidden at all times

    <TelerikInPlaceEditor @bind-Value="@DateValue" DisplayFormat="d" ShowIcon="@InPlaceEditorShowIcon.Never" />

    The editor width is calculated automatically if not set

    <TelerikInPlaceEditor @bind-Value="@TimeValue" DisplayFormat="HH:mm" />.

    You can even edit booleans inline

    <TelerikInPlaceEditor @bind-Value="@BoolValue" />
</p>

<h2>Configuration</h2>

<ul>
    <li><label><TelerikCheckBox @bind-Value="@InPlaceEditorReadOnly" />  Read Only</label></li>
    <li>
        <span>Show Edit Icon: </span>
        <TelerikButtonGroup SelectionMode="@ButtonGroupSelectionMode.Single">
            <ButtonGroupToggleButton Selected="@( InPlaceEditorShowIcon == InPlaceEditorShowIcon.Always )"
                                     OnClick="@( () => InPlaceEditorShowIcon = InPlaceEditorShowIcon.Always )">
                Always
            </ButtonGroupToggleButton>
            <ButtonGroupToggleButton Selected="@( InPlaceEditorShowIcon == InPlaceEditorShowIcon.Hover )"
                                     OnClick="@( () => InPlaceEditorShowIcon = InPlaceEditorShowIcon.Hover )">
                Hover
            </ButtonGroupToggleButton>
            <ButtonGroupToggleButton Selected="@( InPlaceEditorShowIcon == InPlaceEditorShowIcon.Never )"
                                     OnClick="@( () => InPlaceEditorShowIcon = InPlaceEditorShowIcon.Never )">
                Never
            </ButtonGroupToggleButton>
        </TelerikButtonGroup>
    </li>
    <li>
        <label for="editor-width">Editor Width: </label>
        <TelerikNumericTextBox @bind-Value="@InPlaceEditorWidth"
                               Format="# px"
                               Id="editor-width"
                               Width="120px" />
    </li>
    <li>
        <label for="editor-placeholder">Placeholder: </label>
        <TelerikTextBox @bind-Value="@InPlaceEditorPlaceholder"
                        Id="placeholder"
                        Width="180px" />
    </li>
</ul>

<p>
    In-Place Editor:
    <TelerikInPlaceEditor @bind-Value="@InPlaceEditorValue"
             Placeholder="@InPlaceEditorPlaceholder"
             ReadOnly="@InPlaceEditorReadOnly"
             ShowIcon="@InPlaceEditorShowIcon"
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
                <TelerikInPlaceEditor Value="@Employee.Name"
                         ValueChanged="@( (string newValue) => Employee.Name = newValue )"
                         ValueExpression="@( () => Employee.Name )"
                         Placeholder="Enter Name..." />
                <TelerikValidationMessage For="@( () => Employee.Name )" />
            </Template>
        </FormItem>
        <FormItem Field="@nameof(Person.BirthDate)">
            <Template>
                Hire Date:
                <TelerikInPlaceEditor Value="@Employee.BirthDate"
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

@code {
    private bool BoolValue { get; set; }
    private DateTime DateValue { get; set; } = DateTime.Now;
    private decimal NumericValue { get; set; } = 1.23m;
    private string StringValue { get; set; } = "foo bar";
    private TimeOnly TimeValue { get; set; } = TimeOnly.FromDateTime(DateTime.Now);

    private string InPlaceEditorPlaceholder { get; set; } = "Enter value";
    private bool InPlaceEditorReadOnly { get; set; }
    private InPlaceEditorShowIcon InPlaceEditorShowIcon { get; set; } = InPlaceEditorShowIcon.Always;
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

<style>
    h1 {
        font-size: 1.5rem;
    }

    h2 {
        font-size: 1.2rem;
    }
</style>
````
````TelerikInPlaceEditor.razor
@* import InPlaceEditorType enum *@
@using YourAppName.Models

@using System.Globalization
@using System.Linq.Expressions

@typeparam T

<span class="in-place-editor">
    @if (IsInEditMode)
    {
        switch (ValueEditorType)
        {
            case InPlaceEditorType.CheckBox:
                <TelerikCheckBox @ref="@CheckBoxRef"
                                 Value="@Convert.ToBoolean(Value)"
                                 ValueChanged="@( (bool newValue) => OnTextBoxValueChanged(newValue) )"
                                 ValueExpression="@( ValueExpression as Expression<Func<bool>> )"
                                 OnBlur="@( () => IsInEditMode = false )"
                                 Class="in-place-checkbox" />
                break;
            case InPlaceEditorType.DatePicker:
                <TelerikDatePicker @ref="@DatePickerRef"
                                   Value="@Value"
                                   ValueChanged="@( (T newValue) => OnTextBoxValueChanged(newValue!) )"
                                   ValueExpression="@( ValueExpression as Expression<Func<T>> )"
                                   Format="@DisplayFormat"
                                   T="@T"
                                   OnChange="@( () => IsInEditMode = false )"
                                   Class="in-place-input"
                                   Width="@GetEditorWidth(InPlaceEditorType.DatePicker)" />
                break;
            case InPlaceEditorType.NumericTextBox:
                <TelerikNumericTextBox @ref="@NumericTextBoxRef"
                                       Value="@Value"
                                       ValueChanged="@( (T newValue) => OnTextBoxValueChanged(newValue!) )"
                                       ValueExpression="@( ValueExpression as Expression<Func<T>> )"
                                       OnChange="@( () => IsInEditMode = false )"
                                       Format="@DisplayFormat"
                                       T="@T"
                                       Class="in-place-input"
                                       Width="@GetEditorWidth(InPlaceEditorType.NumericTextBox)" />
                break;
            case InPlaceEditorType.TimePicker:
                <TelerikTimePicker @ref="@TimePickerRef"
                                   Value="@Value"
                                   ValueChanged="@( (T newValue) => OnTextBoxValueChanged(newValue!) )"
                                   ValueExpression="@( ValueExpression as Expression<Func<T>> )"
                                   Format="@DisplayFormat"
                                   T="@T"
                                   OnChange="@( () => IsInEditMode = false )"
                                   Class="in-place-input"
                                   Width="@GetEditorWidth(InPlaceEditorType.TimePicker)" />
                break;
            default:
                <TelerikTextBox @ref="@TextBoxRef"
                                Value="@Value?.ToString()"
                                ValueChanged="@( (string newValue) => OnTextBoxValueChanged(newValue) )"
                                ValueExpression="@( ValueExpression as Expression<Func<string>> )"
                                OnChange="@( () => IsInEditMode = false )"
                                Class="in-place-input"
                                Width="@GetEditorWidth(InPlaceEditorType.TextBox)" />
                break;
        }
    }
    else if (!ReadOnly)
    {
        <TelerikButton Class="in-place-button"
                       FillMode="@ThemeConstants.Button.FillMode.Clear"
                       OnClick="@ToggleEditMode"
                       Title="@( $"Edit Value {GetFormattedValue()}" )">
            @if (Value != null && (ValueType == typeof(bool) || !Value.Equals(default(T))) && !string.IsNullOrEmpty(Value.ToString()))
            {
                @GetFormattedValue()
            }
            else
            {
                <span class="in-place-placeholder">@Placeholder</span>
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
    /// Defines when the edit icon shows - always, on hover or never. The default value is <see cref="InPlaceEditorShowIcon.Always" />.
    /// </summary>
    [Parameter]
    public InPlaceEditorShowIcon ShowIcon { get; set; } = InPlaceEditorShowIcon.Always;

    /// <summary>
    /// The editable component value. The supported types include <see cref="string" />, signed numeric types, <see cref="DateTime" />, <see cref="TimeOnly" />, and <see cref="bool" />
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

    #region Properties

    private readonly string DataId = Guid.NewGuid().ToString();

    private Type ValueType { get; set; } = typeof(string);

    private InPlaceEditorType ValueEditorType { get; set; } = InPlaceEditorType.TextBox;

    private bool IsInEditMode { get; set; }

    private bool ShouldFocusEditor { get; set; }

    private bool ShouldRenderEditIcon => ShowIcon != InPlaceEditorShowIcon.Never || GetFormattedValue().Length == 0;

    private string EditIconClass => ShowIcon == InPlaceEditorShowIcon.Hover && GetFormattedValue().Length > 0 ? "hoverable-icon" : string.Empty;

    #endregion Properties

    #region Telerik Components

    private TelerikTextBox? TextBoxRef { get; set; }
    private TelerikNumericTextBox<T>? NumericTextBoxRef { get; set; }
    private TelerikDatePicker<T>? DatePickerRef { get; set; }
    private TelerikTimePicker<T>? TimePickerRef { get; set; }
    private TelerikCheckBox<bool>? CheckBoxRef { get; set; }

    private async Task OnTextBoxValueChanged(object newValue)
    {
        Value = (T)newValue;

        if (ValueChanged.HasDelegate)
        {
            await ValueChanged.InvokeAsync((T)newValue);
        }
    }

    #endregion Telerik Components

    #region Methods

    private string GetEditorWidth(InPlaceEditorType editorType)
    {
        if (!string.IsNullOrEmpty(Width))
        {
            return Width;
        }

        switch (editorType)
        {
            case InPlaceEditorType.DatePicker:
                return $"{Math.Max(GetFormattedValue().Length, 9)}em";
            case InPlaceEditorType.NumericTextBox:
                return $"{Math.Max(GetFormattedValue().Length * .6 + 3, 7)}em";
            case InPlaceEditorType.TextBox:
                return $"{Math.Max(GetFormattedValue().Length * .75, 7)}em";
            case InPlaceEditorType.TimePicker:
                return $"{GetFormattedValue().Length + 2}em";
            default:
                throw new ArgumentOutOfRangeException(nameof(InPlaceEditorType));
        }
    }

    private void ToggleEditMode()
    {
        IsInEditMode = !IsInEditMode;

        if (IsInEditMode)
        {
            ShouldFocusEditor = true;
        }
    }

    private string GetFormattedValue()
    {
        if (IsNumericValueType())
        {
            return Convert.ToDouble(Value).ToString(DisplayFormat);
        }
        else if (ValueType == typeof(DateTime) || ValueType == typeof(DateOnly))
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
            await Task.Delay(1);

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
````InPlaceEditor.razor.css
.in-place-editor {
    font-family: monospace;
}

::deep .in-place-checkbox {
    margin-inline: 1em;
}

::deep .in-place-button .k-button-text {
    color: var(--kendo-color-primary);
}

::deep .in-place-button .k-icon {
    margin-inline-start: .4em;
}

::deep .in-place-button .hoverable-icon {
    display: none;
}

::deep .in-place-button:hover {
    background-color: var(--kendo-color-base) !important;
}

    ::deep .in-place-button:hover .hoverable-icon {
        display: inline-flex;
    }

::deep .in-place-placeholder {
    color: var(--kendo-color-secondary);
}
````
````InPlaceEditorShowIcon.cs
namespace YourAppName.Models
{
    public enum InPlaceEditorShowIcon
    {
        Always,
        Hover,
        Never
    }
}
````

## See Also

* [Button Overview]({%slug components/button/overview%}})
* [CheckBox Overview]({%slug checkbox-overview%}})
* [DatePicker Overview]({%slug components/datepicker/overview%}})
* [NumericTextBox Overview]({%slug components/numerictextbox/overview%}})
* [TextBox Overview]({%slug components/textbox/overview%}})
* [TimePicker Overview]({%slug components/timepicker/overview%}})
