---
title: Indeterminate State
page_title: CheckBox - Indeterminate State
description: Indeterminate State in the CheckBox for Blazor.
slug: checkbox-indeterminate-state
tags: telerik,blazor,checkbox,state,indeterminate
published: true
position: 2
components: ["checkbox"]
---

# CheckBox Indeterminate State

In addition to the basic *checked* and *unchecked* states, the Telerik CheckBox has a third *indeterminate* state. From UX perspective, the indeterminate state means that the CheckBox is neither checked, nor unchecked.

## Basics

To put a CheckBox in the indeterminate state, set its `Indeterminate` parameter to `true`. You can use two-way binding for the parameter or the [`IndeterminateChanged` event](slug:checkbox-events#indeterminatechanged). A `Value` change by the user clears that state and the user cannot restore it on their own. A `true` indeterminate state is only set by the application logic.

The `Indeterminate` parameter controls the [`indeterminate` property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/indeterminate) of the standard HTML `<input type="checkbox" />`.

You can set the `Indeterminate` parameter to `true`, no matter if:

* The component `Value` type is `bool` or nullable `bool?`.
* The current component `Value` is `true`, `false,` or `null`. Depending on the [Telerik CSS theme](slug:themes-overview) and current `Value`, the CheckBox indeterminate state may look different.

>caption Using the CheckBox Indeterminate parameter

````RAZOR
<p>
    <label class="k-checkbox-label">
        <TelerikCheckBox @bind-Value="@CheckBoxValue1"
                         @bind-Indeterminate="@CheckBoxIndeterminate1" />
        <span>Toggle from @CheckBoxValue1 to @(!CheckBoxValue1)</span>
    </label>
</p>

<p>
    <label class="k-checkbox-label">
        <TelerikCheckBox @bind-Value="@CheckBoxValue2"
                         @bind-Indeterminate="@CheckBoxIndeterminate2" />
        <span>Toggle from @CheckBoxValue2 to @(!CheckBoxValue2)</span>
    </label>
</p>

<p>
    <TelerikButton Enabled="@(!CheckBoxIndeterminate1 || !CheckBoxIndeterminate2)"
                   OnClick="@OnButtonClick">Set Indeterminate</TelerikButton>
</p>


@code {
    private bool CheckBoxValue1 { get; set; } = true;
    private bool CheckBoxValue2 { get; set; } = false;
    private bool CheckBoxIndeterminate1 { get; set; } = true;
    private bool CheckBoxIndeterminate2 { get; set; } = true;

    private void OnButtonClick() {
        CheckBoxIndeterminate1 = true;
        CheckBoxIndeterminate2 = true;
    }
}
````

## Examples

Possible use cases for the indeterminate CheckBox state are:

* A CheckBox is [bound to a nullable boolean](#null-value) property and the current `Value` is `null`.
* [A "parent" CheckBox is related to multiple "child" CheckBoxes](#related-checkboxes) that have different values. Another example for such a x1built-in behavior is a [TreeView with CheckBoxes](https://demos.telerik.com/blazor-ui/treeview/checkboxes).

### Null Value

The following sample shows how to:

* Set the `Indeterminate` parameter to `true` automatically when the CheckBox `Value` is `null`.
* Use the [CheckBox `ValueChanged` event](slug:checkbox-events#valuechanged) Enable users to toggle between all three possible CheckBox values: `true`, `false`, and `null`.

>caption Using CheckBox Indeterminate when the Value is null

````RAZOR
<p><label class="k-checkbox-label">
    <TelerikCheckBox Value="@CheckBoxValue"
                     ValueChanged="@((bool? newVal) => CheckBoxValueChanged(newVal))"
                     Indeterminate="@(CheckBoxValue == null)" />
    <span>Toggle between <code>null</code>, <code>true</code>, and <code>false</code></span>
</label></p>

@code {
    private bool? CheckBoxValue { get; set; }

    private void CheckBoxValueChanged(bool? newValue) {
        CheckBoxValue = CheckBoxValue == true ? false : (CheckBoxValue == false ? null : true);
    }
}
````

### Related CheckBoxes

The following sample shows how to set the `Indeterminate` parameter of a "parent" CheckBox, depending on the `Value` of several "child" CheckBoxes.

>caption Using CheckBox Indeterminate with related CheckBoxes

````RAZOR
<ul>
    <li>
        <label class="k-checkbox-label">
            <TelerikCheckBox Value="@Devices"
                             ValueChanged="@((bool newVal) => ParentChanged(newVal))"
                             Indeterminate="@DevicesIndeterminate" />
            <span>Devices</span>
        </label>
        <ul>
            @foreach (KeyValuePair<string, bool> device in ChildDevices) {
                <li>
                    <label class="k-checkbox-label">
                        <TelerikCheckBox Value="@ChildDevices[device.Key]"
                                         ValueChanged="@((bool newVal) => ChildChanged(device.Key, newVal))" />
                        <span>@device.Key</span>
                    </label>
                </li>
            }
        </ul>
    </li>
</ul>

@code {
    private bool Devices { get; set; }

    private Dictionary<string, bool> ChildDevices { get; set; } = new Dictionary<string, bool>
    {
        { "Laptops", false },
        { "Tablets", false },
        { "Phones", false }
    };

    private bool DevicesIndeterminate => !ChildDevices.Values.All(v => v) && !ChildDevices.Values.All(v => !v);

    private void ParentChanged(bool newValue) {
        Devices = newValue;
    
        foreach (string key in ChildDevices.Keys.ToList()) {
            ChildDevices[key] = newValue;
        }
    }

    private void ChildChanged(string key, bool newValue) {
        ChildDevices[key] = newValue;
        Devices = ChildDevices.Values.All(v => v);
    }
}
````

## See Also

* [Checkbox Overview](slug:checkbox-overview)
* [Checkbox Events](slug:checkbox-events)
