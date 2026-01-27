---
title: Time duration input for more than 24 hours
description: How to create a time duration input component that accepts more than 24 hours?
type: how-to
page_title: Time duration input for more than 24 hours
slug: common-kb-time-duration-input
position: 
tags: date, time, input, more than 24
ticketid: 1540856
res_type: kb
components: ["general"]
---
## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>DateTimePicker for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

I want to have an input which I can use to set a time duration of more than 24 hours. I tried DateTimePicker but could not exceed 24 hours.

The use case would be to choose a start datetime and then the user inputs a time duration based on which the end datetime will be calculated. How can I achieve this?

## Solution

You can create a custom input for time duration using a [MaskedTextBox](slug:maskedtextbox-overview). The used mask could be `00:00:00` and you can [include the literals in the value](slug:maskedtextbox-mask-prompt#include-literals-in-the-value), so you can then split the MaskedTextBox value string by them and assign the separate hours, minutes, seconds values to corresponding variables.

Then, use the `AddHours`, `AddMinutes`, `AddSeconds` methods of `DateTime` objects to add the hours, minutes, seconds values to the start datetime and thus calculate the end datetime.

For a better UX, you can also add some custom validation to check whether the minutes and seconds value exceed 60.

The sample below demonstrates the described approach.

````RAZOR
<style>
	.k-state-invalid .k-textbox {
		border-color: rgba(213,25,35,.5);
	}
</style>

@if (Invalid)
{
	<div class="k-validation-summary k-messagebox k-messagebox-error" role="alert">
		<ul>
			<li>
				<a style="text-decoration: none">@ErrorMessage</a>
			</li>
		</ul>
	</div>
}

<div class="k-form">
	<div class="k-form-field">
		<label class="k-label k-form-label">Start Time:</label>
		<TelerikDateTimePicker @bind-Value="@StartTime"
							   Format="dd MMM yyyy HH:mm:ss"
							   Width="250px">
		</TelerikDateTimePicker>
	</div>
	<div class="k-form-field">
		<TelerikMaskedTextBox Mask="00:00:00"
							  Value="@DurationValue"
							  ValueChanged="@ValueChangedHandler"
							  IncludeLiterals="true"
							  Class="@(Invalid? "k-state-invalid" : "")"
							  Width="250px">
		</TelerikMaskedTextBox>
	</div>

	<div class="k-form-field">
		<TelerikButton OnClick="CalculateEnd" Enabled="@(!Invalid)">Calculate End</TelerikButton>
	</div>

	<div class="k-form-field">
		<label class="k-label k-form-label">End Time:</label>
		<TelerikDateTimePicker @bind-Value="@EndTime"
							   Format="dd MMM yyyy HH:mm:ss"
							   Width="250px">
		</TelerikDateTimePicker>
	</div>
</div>

@code {
	string DurationValue { get; set; }

	public DateTime StartTime { get; set; } = DateTime.Now;
	public DateTime? EndTime { get; set; }

	public double Hours { get; set; }
	public double Minutes { get; set; }
	public double Seconds { get; set; }

	string ErrorMessage;
	bool Invalid;

	void ValueChangedHandler(string newVal)
	{
		DurationValue = newVal;

		if (DurationValue != null)
		{
			string[] duration = DurationValue.Split(":");

			Hours = string.IsNullOrWhiteSpace(duration.ElementAtOrDefault(0)) ? 0 : double.Parse(duration[0]);
			Minutes = string.IsNullOrWhiteSpace(duration.ElementAtOrDefault(1)) ? 0 : double.Parse(duration[1]);
			Seconds = string.IsNullOrWhiteSpace(duration.ElementAtOrDefault(2)) ? 0 : double.Parse(duration[2]);

			Validate();
		}
	}

	void Validate()
	{
		if (Minutes > 60)
		{
			Invalid = true;
			ErrorMessage = "Minutes cannot be more than 60";
		}
		else if (Seconds > 60)
		{
			Invalid = true;
			ErrorMessage = "Seconds cannot be more than 60";
		}
		else
		{
			Invalid = false;
		}
	}

	void CalculateEnd()
	{
		if (!Invalid)
		{
			EndTime = StartTime.AddHours(Hours).AddMinutes(Minutes).AddSeconds(Seconds);
		}
	}
}
````