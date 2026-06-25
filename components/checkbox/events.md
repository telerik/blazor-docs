---
title: Events
page_title: CheckBox - Events
description: Events in the CheckBox for Blazor.
slug: checkbox-events
tags: telerik,blazor,checkbox,events
published: true
position: 20
components: ["checkbox"]
---

# Events

This article describes the available events in the Telerik CheckBox component for Blazor.

* [IndeterminateChanged](#indeterminatechanged)
* [OnBlur](#onblur)
* [OnChange](#onchange)
* [ValueChanged](#valuechanged)

## IndeterminateChanged

The CheckBox fires its `IndeterminateChanged` event when the user clicks an [indeterminate CheckBox](slug:checkbox-indeterminate-state) and the `Indeterminate` parameter changes to `false`. From this point, only the app can restore the `Indeterminate` parameter value to `true`, which does not fire the `IndeterminateChanged` event.

>caption Using the CheckBox IndeterminateChanged event

````RAZOR
<p>
    <label class="k-checkbox-label">
        <TelerikCheckBox @bind-Value="@CheckBoxValue"
                        Indeterminate="@CheckBoxIndeterminate"
                        IndeterminateChanged="@CheckBoxIndeterminateChanged" />
        <span>Toggle CheckBox Value</span>
    </label>
</p>

<p>Last <code>IndeterminateChanged</code> event at: @IndeterminateChangedEventLog</p>

<p><TelerikButton OnClick="@(() => CheckBoxIndeterminate = true)">Set Indeterminate</TelerikButton></p>

@code {
    private bool? CheckBoxValue { get; set; }
    private bool CheckBoxIndeterminate { get; set; } = true;

    private string IndeterminateChangedEventLog { get; set; } = string.Empty;

    private void CheckBoxIndeterminateChanged(bool newIndeterminate) {
        IndeterminateChangedEventLog = DateTime.Now.ToString("HH:mm:ss");
        CheckBoxIndeterminate = newIndeterminate;
    }
}
````

## OnBlur

The `OnBlur` event fires when the CheckBox loses focus.

>caption Using the CheckBox OnBlur event

````RAZOR
<p><label class="k-checkbox-label">
    <TelerikCheckBox @bind-Value="@CheckBoxValue"
                        OnBlur="@OnCheckBoxBlur" />
    <span>Toggle CheckBox Value</span>
</label></p>

<p>Last <code>OnBlur</code> event at: @OnBlurEventLog</p>

@code {
    private bool CheckBoxValue { get; set; } = true;

    private string OnBlurEventLog { get; set; } = string.Empty;

    private void OnCheckBoxBlur() {
        OnBlurEventLog = DateTime.Now.ToString("HH:mm:ss");
    }
}
````

## OnChange

The `OnChange` event fires every time the `Value` parameter changes. The key differences with [`ValueChanged`](#valuechanged) are:

* `OnChange` does not prevent two-way data binding for the `Value` parameter (`@bind-Value` syntax).
* `ValueChanged` always fires before `OnChange`.
* The `OnChange` event argument is an `object` that you need to cast. The `ValueChanged` event argument has the same type as `Value`.
* The `OnChange` event argument holds the current `Value`, while `ValueChanged` holds the new value that you must apply manually.

>caption Using the CheckBox OnChange event

````RAZOR
<p><label class="k-checkbox-label">
    <TelerikCheckBox @bind-Value="@CheckBoxValue"
                     OnChange="@OnCheckBoxChange" />
    <span>Toggle CheckBox Value</span>
</label></p>

<p>Last <code>OnChange</code> event at: @OnChangeEventLog</p>

@code {
    private bool CheckBoxValue { get; set; } = true;

    private string OnChangeEventLog { get; set; } = string.Empty;

    private void OnCheckBoxChange(object currentValue) {
        OnChangeEventLog = DateTime.Now.ToString("HH:mm:ss.fff");
    }
}
````

## ValueChanged

The `ValueChanged` event fires every time the `Value` parameter changes. The event handler argument has the same type as the `Value` parameter. However, the handler always receives a `true` or `false` argument, even if the component is bound to a nullable boolean property. The new value depends on the old one as follows:

| Old Value | New Value |
| --- | --- |
| `true` | `false` |
| `false` | `true` |
| `null` | `true` |

Using the `ValueChanged` event requires one-way binding for the `Value` parameter and manual updating of the parameter in the handler. Compare with the [`OnChange` event](#onchange).

You can use the `ValueChanged` handler to set a `null` `Value` programmatically and toggle between three possible values instead of two.

>caption Using the CheckBox ValueChanged event

````RAZOR
<label class="k-checkbox-label">
    <TelerikCheckBox Value="@CheckBoxValue1"
                     ValueChanged="@((bool newVal) => CheckBoxValueChanged1(newVal))" />
    <span>Toggle between <code>true</code> and <code>false</code> (now <strong>@ToLower(CheckBoxValue1)</strong>)</span>
</label>

<br /><br />

<label class="k-checkbox-label">
    <TelerikCheckBox Value="@CheckBoxValue2"
                     ValueChanged="@((bool? newVal) => CheckBoxValueChanged2(newVal))"
                     Indeterminate="@(CheckBoxValue2 == null)" />
    <span>Toggle between <code>null</code>, <code>true</code>, and <code>false</code> (now <strong>@ToLower(CheckBoxValue2)</strong>)</span>
</label>

<br /><br />

Last <code>ValueChanged</code> event: @((MarkupString)ValueChangedEventLog)

@code {
    private bool CheckBoxValue1 { get; set; } = true;
    private bool? CheckBoxValue2 { get; set; }

    private string ValueChangedEventLog { get; set; } = string.Empty;

    private void CheckBoxValueChanged1(bool newValue) {
        LogValueChanged(CheckBoxValue1, newValue);
        CheckBoxValue1 = newValue;
    }

    private void CheckBoxValueChanged2(bool? newValue) {
        bool? finalValue = CheckBoxValue2 == true ? false : (CheckBoxValue2 == false ? null : true);
        LogValueChanged(CheckBoxValue2, newValue, $", final <code>{ToLower(finalValue)}</code>");
        CheckBoxValue2 = finalValue;
    }

    private void LogValueChanged(bool? oldValue, bool? newValue, string? appendix = "")
    {
        ValueChangedEventLog = $"at {DateTime.Now:HH:mm:ss}, from <code>{ToLower(oldValue)}</code> to <code>{ToLower(newValue)}</code>{appendix}";
    }

    private string ToLower(bool? value) => value?.ToString().ToLower() ?? "null";
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

## See Also

* [ValueChanged and Validation](slug:value-changed-validation-model)

