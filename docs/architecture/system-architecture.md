# System Architecture

## 1. Overview

Portfolio Platform is a personal portfolio website built with React, JavaScript, Vite, and Firebase.

The system represents a single personal portfolio owned and maintained by one administrator.

It is not a multi-user portfolio platform and does not allow visitors or external users to create, manage, or publish their own portfolios.

The source code is intended to be reusable as a template or foundation for other developers who want to create their own personal portfolio.

The system is composed of two main areas:

- Public Portfolio
- Administrative CMS

The public portfolio is accessible without authentication.

The administrative area is accessed manually through `/admin` and is protected by Firebase Authentication and authorization based on the `authorizedAdmins` Firestore collection.

## 2. Architectural Goals

The architecture is designed to:

- Provide a professional personal portfolio.
- Present the owner's profile, skills, experience, projects, education, CV, and contact information.
- Provide an integrated CMS for managing portfolio content.
- Allow visitors to access the portfolio without creating an account.
- Keep the public experience primarily centered around a single page.
- Use dedicated routes only when additional detail provides meaningful value.
- Avoid unnecessary backend complexity.
- Use Firebase as the application's backend infrastructure.
- Protect administrative operations through Firebase Security Rules.
- Keep the source code reusable and maintainable.
- Prepare the repository for eventual Open Source publication.
- Prevent secrets and privileged credentials from being exposed in the repository.

## 3. High-Level Architecture

~~~text
                         PORTFOLIO PLATFORM
                                |
                 +--------------+--------------+
                 |                             |
                 v                             v
         PUBLIC PORTFOLIO                ADMINISTRATIVE AREA
                 |                             |
                 |                       Google Sign-In
                 |                             |
                 |                    Firebase Authentication
                 |                             |
                 |                      Authorization Check
                 |                             |
                 |                      authorizedAdmins
                 |                             |
                 |                             v
                 |                       Admin Dashboard
                 |                             |
                 +--------------+--------------+
                                |
                                v
                         Firebase Services
                  +-------------+-------------+
                  |             |             |
                  v             v             v
             Firestore      Storage    Authentication
                  |             |
                  +------+------+ 
                         |
                         v
                Firebase Security Rules
                         |
                         v
                  Firebase Hosting
~~~

## 4. Application Architecture

The application is organized around two primary areas:

- Public Portfolio
- Administrative CMS

### 4.1 Public Portfolio

The public portfolio is the main user-facing application.

Visitors can access it without authentication.

The main page provides the general portfolio experience and includes:

- Profile.
- Main skills.
- Experience preview.
- Project preview.
- Education.
- CV.
- Contact.
- Professional links.

Additional routes are used only for content that benefits from a more detailed view.

Initial detailed public routes are:

~~~text
/experiences
/projects
~~~

### 4.2 Administrative CMS

The administrative CMS is a private area used exclusively by the portfolio owner.

It is accessed manually through:

~~~text
/admin
~~~

The route does not need to be displayed in the public navigation.

The administrative area requires:

1. Google Sign-In.
2. Firebase Authentication.
3. Authorization against the `authorizedAdmins` collection.
4. Firebase Security Rules enforcing the authorization boundary.

The application does not provide functionality to manage the `authorizedAdmins` collection.

Authorized administrator accounts are managed directly through Firebase.

## 5. Public Architecture

The main public route is:

~~~text
/
~~~

The main page contains the general portfolio information:

~~~text
/
|
+-- Profile
|
+-- Main Skills
|
+-- Experience Preview
|
+-- Project Preview
|
+-- Education
|
+-- CV
|
+-- Contact
|
+-- Professional Links
~~~

The visitor can navigate between these sections without requiring a separate route for each one.

The application intentionally avoids creating routes such as:

~~~text
/profile
/skills
/education
/cv
/contact
~~~

because these sections do not require independent pages in the initial scope.

## 6. Detailed Public Routes

### `/experiences`

This route provides the complete list of published professional experiences.

The main page only presents a limited preview of experiences.

The detailed route provides additional information when the visitor wants to explore all experiences.

### `/projects`

This route provides the complete list of published projects.

The main page only presents a limited preview of projects.

The detailed route provides additional information when the visitor wants to explore all projects.

## 7. Administrative Architecture

The administrative flow is:

~~~text
/admin
   |
   v
Google Sign-In
   |
   v
Firebase Authentication
   |
   v
Authenticated Google Account
   |
   v
Check authorizedAdmins
   |
   +---- Not Authorized ----> Access Denied
   |
   +---- Authorized --------> Admin Dashboard
~~~

Authentication establishes the identity of the user.

Authorization determines whether that authenticated user is allowed to access the administrative functionality.

The existence of an authenticated Firebase user alone is not sufficient to grant administrative access.

## 8. Authorization Model

The authorization model uses the Firebase Authentication UID.

The expected structure is:

~~~text
authorizedAdmins/{uid}
~~~

The corresponding document contains authorization information such as:

~~~text
email
active
addedAt
~~~

The application reads this collection to determine whether the authenticated user is authorized.

The application does not create, modify, or delete administrator authorization records.

Administrator authorization is managed directly through Firebase.

The `authorizedAdmins` collection is not managed through the application's administrative dashboard.

## 9. Application Security Boundary

The frontend is responsible for providing the user experience.

Firebase Security Rules are responsible for enforcing access control.

Frontend checks must never be considered the actual security boundary.

The following are not sufficient on their own to secure administrative functionality:

- Hiding the `/admin` route.
- Hiding administrative buttons.
- Checking authorization only in React.
- Preventing navigation to administrative pages.
- Checking whether a user is authenticated only on the client.

Unauthorized users must be prevented from performing protected Firestore and Storage operations through Firebase Security Rules.

## 10. Firebase Architecture

Firebase provides the application's infrastructure.

The initial Firebase services are:

~~~text
Firebase
|
+-- Authentication
|
+-- Cloud Firestore
|
+-- Storage
|
+-- Hosting
|
+-- Security Rules
~~~

### Firebase Authentication

Firebase Authentication is used for Google Sign-In and administrative identity.

Visitors do not need to authenticate to access the public portfolio.

Authentication is only required for access to the administrative area.

### Cloud Firestore

Cloud Firestore is used for structured portfolio content and authorization data.

Portfolio information is stored as structured documents and collections.

### Firebase Storage

Firebase Storage is used for portfolio files such as:

- Profile image.
- Project images.
- CV.
- Other portfolio media when required.

### Firebase Hosting

Firebase Hosting is used to deploy and serve the production React application.

### Firebase Security Rules

Firebase Security Rules are used to enforce access control for Firestore and Storage.

## 11. Backend Architecture

The initial version does not require a custom backend server.

The application communicates directly with Firebase services through the Firebase SDK.

The initial architecture does not include:

- Express.
- A custom Node.js API server.
- REST API.
- GraphQL API.
- Custom authentication server.
- Custom database server.

Node.js remains part of the development and tooling ecosystem because tools such as Vite, npm, and the Firebase CLI use the Node.js ecosystem.

However, a custom Node.js backend is not required by the application architecture.

## 12. Data Architecture

Cloud Firestore stores structured portfolio data.

The main collections are:

- `profile`
- `experiences`
- `projects`
- `education`
- `links`
- `contact`
- `authorizedAdmins`

The application represents a single portfolio, so the data model does not require:

- Tenant IDs.
- Portfolio owner IDs.
- Organization IDs.
- User-owned portfolio records.
- Multi-tenant relationships.

The `authorizedAdmins` collection is an exception in that it represents administrator authorization rather than portfolio content.

## 13. Storage Architecture

Firebase Storage stores binary files.

The initial storage structure is organized around:

~~~text
profile/
projects/
documents/
~~~

Firestore stores references to these files.

Examples include:

~~~text
profile/main.profileImageUrl
profile/main.resumeUrl
projects/{projectId}.imageUrl
~~~

The CV must be accessible to visitors for:

- Embedded viewing when supported by the browser.
- Downloading.

## 14. Content Management Architecture

The CMS manages the content stored in Firestore and the files stored in Firebase Storage.

The main content areas are:

- Profile
- Skills
- Experiences
- Projects
- Education
- Links
- Contact
- Media
- CV

Skills are intentionally simple.

Main profile skills are stored as an array of strings.

Each experience can contain its own array of skills or technologies.

Each project can contain its own array of skills or technologies.

A centralized skills catalog is not required in the initial architecture.

The owner manually manages portfolio content through the administrative CMS.

## 15. Publication Model

Content that supports publication status uses the `isPublished` field.

Public visitors should only receive content that is published.

The administrator may access both published and unpublished content.

This allows the owner to prepare or modify content without immediately exposing it publicly.

The publication state must be respected both by the application logic and by the data access rules where appropriate.

## 16. Contact Architecture

The contact functionality is intentionally simple.

The initial implementation provides only:

- Email
- WhatsApp

The email action opens the visitor's available email client or mechanism.

The WhatsApp action opens WhatsApp or its web interface.

The system does not implement:

- Contact forms.
- Internal messaging.
- Message storage.
- Visitor accounts.
- Chat functionality.

No dedicated `/contact` route is required.

Contact actions can be displayed directly within the main portfolio page.

## 17. CV Architecture

The CV is stored as a file in Firebase Storage.

Firestore stores its reference through:

~~~text
profile/main.resumeUrl
~~~

The public portfolio provides:

1. Embedded CV viewing when supported by the browser.
2. A download option.

The CV does not require its own public route.

The CV can be accessed from the main portfolio page through an appropriate action such as View CV or Download CV.

## 18. Deployment Architecture

The application is deployed using Firebase Hosting.

The deployment flow is:

~~~text
Source Code
    |
    v
React + Vite Build
    |
    v
Production Build
    |
    v
Firebase Hosting
~~~

Firebase Authentication, Firestore, Storage, and Security Rules provide the backend infrastructure used by the deployed application.

No custom application server is required for the initial deployment architecture.

## 19. Development Architecture

Development is performed locally using the React and Vite development environment.

The project uses Git for version control and GitHub as the repository.

Git Flow is used as the project's branching strategy.

Environment-specific configuration is handled through environment variables where appropriate.

Real secrets and privileged credentials must never be committed to the repository.

The repository must remain safe to publish and reuse as an Open Source project.

## 20. Open Source Architecture

The project is intended to eventually become a public and reusable repository.

The architecture must therefore remain independent from the owner's private infrastructure.

Another developer should be able to:

- Fork or clone the repository.
- Create their own Firebase project.
- Configure their own Firebase services.
- Configure their own environment variables.
- Configure their own authorized administrator.
- Replace portfolio content.
- Replace images.
- Replace the CV.
- Customize the application.
- Deploy their own instance.

This reuse does not mean that the application itself provides a portfolio creation service.

Another developer reuses the source code as a template and deploys an independent copy for their own portfolio.

The application continues to represent one portfolio per deployment.

## 21. Architectural Constraints

The initial version intentionally excludes:

- Multi-tenancy.
- External portfolio creation.
- Public user accounts.
- Visitor registration.
- Visitor profiles.
- User management.
- Administrative user management through the application.
- Role management.
- Contact forms.
- Internal messaging.
- Chat.
- Payments.
- Billing.
- Analytics.
- Blog functionality.
- Mobile applications.
- Custom backend APIs.
- REST APIs.
- GraphQL APIs.

These features may be considered in future versions only if they provide meaningful value to the personal portfolio.

Any future functionality must preserve the fundamental product definition:

> Portfolio Platform is a personal portfolio with an integrated CMS and reusable source code, not a multi-user portfolio platform.