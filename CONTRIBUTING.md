# Contributing to Portfolio-Platform

Thank you for your interest in contributing to Portfolio-Platform.

Portfolio-Platform is a reusable full-stack portfolio platform and template designed to demonstrate modern software development practices while providing a foundation that can be adapted for other personal portfolio projects.

This document defines the development workflow, Git conventions, contribution standards, and security requirements that should be followed when working on the project.

## 1. Development Workflow

Portfolio-Platform follows a Git Flow-inspired workflow based on two permanent branches:

* `main` — stable and production-ready code.
* `develop` — active development and integration branch.

Feature and maintenance work is developed in temporary branches created from `develop`.

The general workflow is:

```text
develop
   │
   ├── feature/*
   ├── fix/*
   ├── refactor/*
   └── other temporary branches
          │
          ▼
       Pull Request
          │
          ▼
       develop
          │
          ▼
       Pull Request
          │
          ▼
         main
```

Changes should not be committed directly to `main` or `develop`.

## 2. Branches

### 2.1 Main Branch

`main` contains stable code that is considered suitable for release or public use.

Changes to `main` must be introduced through Pull Requests.

Direct pushes to `main` should not be used during normal development.

### 2.2 Develop Branch

`develop` is the primary integration branch for active development.

New work should normally start from the latest version of `develop`.

Changes should be merged into `develop` through Pull Requests.

### 2.3 Feature Branches

Feature branches are used for new functionality or significant additions.

Naming convention:

```text
feature/<short-description>
```

Examples:

```text
feature/admin-dashboard
feature/project-management
feature/contact-form
feature/firebase-authentication
```

Feature branches should be created from `develop`.

### 2.4 Fix Branches

Fix branches are used for non-critical corrections during development.

Naming convention:

```text
fix/<short-description>
```

Examples:

```text
fix/contact-form-validation
fix/project-card-layout
fix/auth-redirect
```

Fix branches should normally be created from `develop`.

### 2.5 Refactor Branches

Refactor branches are used when restructuring or improving existing code without changing its intended functionality.

Naming convention:

```text
refactor/<short-description>
```

Examples:

```text
refactor/auth-service
refactor/project-components
refactor/database-layer
```

### 2.6 Release Branches

Release branches may be used when preparing a specific version for release.

Naming convention:

```text
release/<version>
```

Example:

```text
release/1.0.0
```

Release branches are created from `develop` and are intended for final preparation, validation, and release-related adjustments.

### 2.7 Hotfix Branches

Hotfix branches are reserved for urgent corrections to the stable `main` branch.

Naming convention:

```text
hotfix/<short-description>
```

Examples:

```text
hotfix/security-vulnerability
hotfix/production-authentication
```

Hotfix branches should be created from `main`.

## 3. Branch Naming Rules

Branch names should:

* Use lowercase letters.
* Use hyphens to separate words.
* Clearly describe the purpose of the branch.
* Avoid unnecessary words.
* Avoid personal names or machine-specific information.
* Avoid spaces and special characters.

Preferred:

```text
feature/admin-dashboard
fix/firebase-authentication
refactor/project-service
```

Avoid:

```text
feature/AdminDashboard
feature/my-new-thing
Jason-testing
new-feature
test
```

Branches should represent a focused unit of work whenever practical.

## 4. Commit Convention

Portfolio-Platform uses Conventional Commits.

The general format is:

```text
<type>: <description>
```

The commit type should describe the purpose of the change.

### Supported Commit Types

| Type       | Purpose                                                                      |
| ---------- | ---------------------------------------------------------------------------- |
| `feat`     | Introduces a new feature or capability.                                      |
| `fix`      | Fixes a bug or incorrect behavior.                                           |
| `docs`     | Adds or changes documentation.                                               |
| `refactor` | Restructures code without changing its intended behavior.                    |
| `style`    | Changes formatting or styling without changing functionality.                |
| `test`     | Adds or modifies tests.                                                      |
| `chore`    | Maintenance or tooling changes that do not modify application functionality. |
| `build`    | Changes related to build systems or dependencies.                            |
| `ci`       | Changes related to continuous integration or delivery.                       |

Examples:

```text
feat: add project management module
fix: resolve authentication redirect
docs: update contribution guidelines
refactor: simplify portfolio service
test: add authentication service tests
chore: configure development tooling
build: update project dependencies
ci: add pull request workflow
```

Commit descriptions should:

* Be concise.
* Use the imperative style.
* Start with a lowercase letter.
* Clearly describe the change.
* Avoid unnecessary punctuation at the end.

Avoid commits such as:

```text
update
changes
fix stuff
working
final version
test
asdf
```

## 5. Pull Requests

Pull Requests are used to integrate changes between branches.

The standard development flow is:

```text
feature/* → develop
develop → main
```

Pull Requests should:

* Have a clear title.
* Explain what was changed.
* Explain why the change was needed when appropriate.
* Identify relevant documentation or implementation considerations.
* Be focused on a coherent set of changes.
* Be reviewed before merging when applicable.

A Pull Request should not contain unrelated changes.

### Pull Request Titles

Pull Request titles should follow the same Conventional Commit style used for commits when practical.

Examples:

```text
feat: add Firebase authentication
docs: update architecture documentation
fix: resolve contact form validation
chore: configure development standards
```

## 6. Working with `develop`

Before starting new work, update the local `develop` branch:

```bash
git switch develop
git pull origin develop
```

Create the working branch from the updated `develop`:

```bash
git switch -c feature/<short-description>
```

After completing the work:

```bash
git status
git add .
git commit -m "<type>: <description>"
```

The branch can then be pushed to GitHub and submitted as a Pull Request targeting `develop`.

## 7. Working with `main`

`main` represents the stable branch of the project.

Development work should not be performed directly on `main`.

Changes should normally reach `main` through:

```text
develop → Pull Request → main
```

Release-related changes should be reviewed before being merged into `main`.

## 8. Keeping Branches Updated

When working on a feature, keep the branch reasonably synchronized with `develop` when necessary.

Before updating a feature branch, make sure any local changes are committed or safely stored.

The preferred strategy should be agreed upon for the specific change when history manipulation is involved.

Avoid unnecessary history rewriting on branches that have already been shared with others.

## 9. Code and Project Standards

Contributions should prioritize:

* Readability.
* Maintainability.
* Clear separation of responsibilities.
* Reusable components and services.
* Consistent naming.
* Appropriate documentation.
* Minimal duplication.
* Secure handling of application configuration.
* Compatibility with the project's documented architecture.

Implementation-specific standards such as linting, formatting, testing, and framework conventions should follow the tooling configured for the project.

## 10. Security Requirements

Security is a fundamental requirement of Portfolio-Platform.

The repository is intended to become a public and reusable project. Sensitive information must therefore never be committed to Git or published through GitHub.

Never commit:

* API keys intended to remain private.
* Passwords.
* Authentication credentials.
* Private tokens.
* Service account credentials.
* Private certificates or keys.
* Database credentials.
* Production secrets.
* Personal access tokens.
* Private configuration files containing secrets.

Sensitive configuration must be provided through environment variables or another appropriate secret-management mechanism.

## 11. Environment Variables

Environment-specific configuration should be stored outside the repository.

Local environment files such as:

```text
.env
.env.local
.env.development
.env.production
```

must not be committed.

The repository may contain:

```text
.env.example
```

The example file must contain only variable names and safe placeholder values.

Example:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
```

Real credentials must never be placed in `.env.example`.

## 12. Repository Security

Before creating a Pull Request, contributors should verify that:

* No secrets were added.
* No credentials were committed.
* No `.env` files are included.
* No private keys were added.
* Generated files are ignored appropriately.
* Configuration files do not contain sensitive values.
* The change does not expose private infrastructure information unnecessarily.

If a secret is accidentally committed, simply deleting it in a later commit is not sufficient. The affected credential should be considered compromised and rotated or revoked as appropriate.

## 13. Public Repository Requirements

Portfolio-Platform is intended to be reusable by other developers.

Contributions should therefore avoid introducing project-specific assumptions that prevent reuse unless they are explicitly part of the platform design.

When adding functionality, consider:

* Whether the feature can be configured.
* Whether project-specific values should be environment variables.
* Whether documentation should explain the configuration.
* Whether the implementation introduces unnecessary coupling.
* Whether sensitive or personal information has been included.

## 14. Documentation

Documentation should be updated when a contribution changes:

* Architecture.
* Requirements.
* Data models.
* Security behavior.
* Development workflow.
* Configuration.
* Installation procedures.
* Public APIs or interfaces.
* Important project decisions.

Documentation should remain consistent with the actual implementation.

## 15. General Contribution Principles

Contributors should:

1. Keep changes focused.
2. Follow the established branch and commit conventions.
3. Avoid committing secrets or sensitive information.
4. Update documentation when necessary.
5. Test changes appropriate to their scope.
6. Review their own changes before opening a Pull Request.
7. Avoid unrelated modifications.
8. Preserve the project's architectural principles.
9. Prefer maintainable and reusable solutions.
10. Keep the repository suitable for public use.

## 16. Standard Development Flow

The standard workflow can be summarized as:

```bash
git switch develop
git pull origin develop

git switch -c feature/<short-description>

# Make changes

git status
git add .
git commit -m "feat: <description>"

git push -u origin feature/<short-description>
```

Then create a Pull Request:

```text
feature/<short-description> → develop
```

After the change is reviewed and merged, the feature branch can be deleted.

For releases:

```text
develop → main
```

through an appropriate Pull Request or release workflow.

## 17. Final Checklist

Before submitting a Pull Request, verify:

* [ ] The branch was created from the appropriate base branch.
* [ ] The branch name follows the project convention.
* [ ] Commits follow Conventional Commits.
* [ ] Changes are focused and relevant.
* [ ] Documentation has been updated when necessary.
* [ ] Appropriate tests or validation have been performed.
* [ ] No secrets or credentials are included.
* [ ] No `.env` files containing real values are included.
* [ ] No private keys or sensitive configuration are included.
* [ ] The Pull Request targets the correct branch.
* [ ] The changes have been reviewed locally before submission.