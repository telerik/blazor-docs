---
title: License Key Errors
page_title: Telerik License Key Errors
description: Troubleshooting Telerik license key errors when using Telerik UI for Blazor.
slug: troubleshooting-license-key-errors
tags: blazor, license, troubleshooting
published: True
position: 3
---

# License Key Errors

This page provides solutions for license key errors that you may encounter while building Telerik Blazor apps.

@[template](/_contentTemplates/common/get-started.md#license-key-version)

## Basics

A Telerik license key error may occur in the following scenarios:

* Missing license key.
* Using an expired subscription license after the end of the subscription term.
* Using a perpetual license with a product version that was released outside the validity period of your license.
* Using an expired trial license.
* Using an outdated license key after making renewals or purchases.
* Using a license key that doesn't include Telerik UI for Blazor.
* Using conflicting license keys in the same environment. For example, using one global license key and one in the app. Or, using a license key file together with an environment variable in CI/CD environment.

Refer to the error messages below for specific tips.

## Error Messages

* [No license key is detected](#no-license-key-is-detected)
* [Invalid license key](#invalid-license-key)
* [Your subscription license has expired](#your-subscription-license-has-expired)
* [Your perpetual license is invalid](#your-perpetual-license-is-invalid)
* [Your trial license has expired](#your-trial-license-has-expired)
* [Your license is not valid for the detected product(s)](#your-license-is-not-valid-for-the-detected-products)

### No license key is detected

[Install a license key file](slug:installation-license-key). If you already downloaded it, make sure it's [saved at the right place](slug:installation-license-key#manual-installation).

### Invalid license key

Follow the [automatic](slug:installation-license-key#automatic-installation) or [manual](slug:installation-license-key#manual-installation) installation steps from scratch.

### Your subscription license has expired

<a href="https://www.telerik.com/account/your-licenses" target="_blank">Renew your subscribtion</a>. Then, [update your license key](slug:installation-license-key#license-key-updates).

### Your perpetual license is invalid

You are using a product version released outside the validity period of your perpetual license. To remove the error message, do either of the following:

* <a href="https://www.telerik.com/account/your-licenses" target="_blank">Renew your subscribtion</a>. Then, [update your license key](slug:installation-license-key#license-key-updates).
* Downgrade your app to a Telerik UI for Blazor version that was released within the subscription period of your perpetual license.

### Your trial license has expired

<a href="https://www.telerik.com/purchase/blazor-ui" target="_blank">Purchase a commercial license to continue using Telerik UI for Blazor</a>.

### Your license is not valid for the detected product(s)

<a href="https://www.telerik.com/purchase/blazor-ui" target="_blank">Review the purchase options for Telerik UI for Blazor</a>. Then, [update your license key](slug:installation-license-key#license-key-updates).

## See Also

* [Download and Install License Key](slug:installation-license-key)
* [Use License Keys in CI/CD](slug:deployment-license-key)
