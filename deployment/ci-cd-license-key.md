---
title: License Key
page_title: Telerik License Key in CI/CD
description: Learn how to create and install a Telerik license key file in continuous integration and continuous delivery (CI/CD) workflows and environments.
slug: deployment-license-key
tags: installation, license, deployment
published: True
position: 7
---

# Telerik License Key in CI/CD Environment

This article describes how to set up and activate your [Telerik UI for Blazor license key](slug:installation-license-key) across a few popular CI/CD services by using environment variables.

@[template](/_contentTemplates/common/get-started.md#license-key-version)

## Basics

When working with CI/CD platforms, always add the [`Telerik.Licensing` NuGet package](slug:getting-started/what-you-need#nuget-packages) as a project dependency. This package activates the Telerik Blazor components at build time by using the provided license key.

The license activation process in a CI/CD environment involves the following steps:

1. Add the `Telerik.Licensing` NuGet package as a dependency to all projects that reference Telerik UI for Blazor or Telerik Document Processing:
    ````XML.skip-repl
    <PackageReference Include="Telerik.Licensing" Version="1.*" />
    ````
1. Go to the <a href="https://www.telerik.com/account/your-licenses/license-keys" target="_blank">License Keys page</a> in your Telerik account and get your license key.
1. Set your license key value as an environment variable with a name `TELERIK_LICENSE`.

## Creating Environment Variables

The recommended way to provide your license key to the `Telerik.Licensing` NuGet package in CI/CD environment is to use environment variables. Each CI/CD platform has a different process for setting environment variables. This article lists only some of the most popular examples.

### Azure Pipelines

1. Create a new [user-defined variable](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/variables) named `TELERIK_LICENSE`.
1. Paste the contents of the license key file as a value of the variable.

### GitHub Actions

1. Create a new [Repository Secret](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository) or an [Organization Secret](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-an-organization).
1. Set the name of the secret to `TELERIK_LICENSE` and paste the contents of the license file as a value.
1. Add a `TELERIK_LICENSE` environment variable to the steps, which build and publish the Blazor app:
    ````YAML.skip-repl
    env:
      TELERIK_LICENSE: ${{ "{{ secrets.TELERIK_LICENSE }}" }}
    ````
    The resulting workflow steps may look similar to:
    ````YAML.skip-repl
    - name: Build Step
      run: dotnet build -c Release
      env:
        TELERIK_NUGET_KEY: ${{ "{{ secrets.TELERIK_NUGET_KEY }}" }}
        TELERIK_LICENSE: ${{ "{{ secrets.TELERIK_LICENSE }}" }}

    - name: Publish Step
      run: dotnet publish -c Release
      env:
        TELERIK_LICENSE: ${{ "{{ secrets.TELERIK_LICENSE }}" }}
    ````
    Also see [Using NuGet Keys](slug:deployment-nuget#using-nuget-keys) in the article [Restoring NuGet Packages in Your CI Workflow](slug:deployment-nuget). It shows how to use the `TELERIK_NUGET_KEY` environment variable in your CI build environment.

### Docker

1. [Create a Docker build secret](https://docs.docker.com/build/building/secrets/#using-build-secrets) that holds the Telerik license key file.
1. [Mount the secret](https://docs.docker.com/build/building/secrets/#secret-mounts) and set a `TELERIK_LICENSE` [environment variable in the container](https://docs.docker.com/build/building/secrets/#target).

## Next Steps

* [Restore Telerik NuGet Packages in CI/CD Workflows](slug:deployment-nuget)

## See Also

* [CI, CD, Build Server](slug:deployment-ci-cd-build-pc)
* [Workflow Details for Telerik UI for Blazor](slug:getting-started/what-you-need)
