# Modules

## 1. Overview

The application is organized into functional modules that separate public portfolio presentation, content management, authentication, authorization, data access, media management, and shared application functionality.

The module structure is designed for a single personal portfolio while keeping the codebase reusable as a template.

The application does not implement modules for multi-user portfolio creation, visitor accounts, or tenant management.

## 2. Module Architecture

The initial application is divided into the following modules:

- Public Portfolio Module
- Profile Module
- Skills Module
- Experience Module
- Project Module
- Education Module
- CV Module
- Contact Module
- Links Module
- Authentication Module
- Authorization Module
- Administration Module
- Content Management Module
- Media Management Module
- Firestore Data Module
- Firebase Storage Module
- Navigation Module
- Shared UI Module
- Configuration Module

Each module should have a clearly defined responsibility and should avoid unnecessary coupling with unrelated modules.

## 3. Public Portfolio Module

The Public Portfolio Module provides the main visitor-facing experience.

Responsibilities include:

- Displaying the portfolio homepage.
- Displaying portfolio sections.
- Loading published portfolio content.
- Presenting content in a responsive layout.
- Providing navigation between portfolio sections.
- Providing access to detailed experiences and projects.
- Providing access to the CV.
- Providing contact actions.
- Providing external professional links.

The public module does not require authentication.

Visitors can access the portfolio without creating an account or signing in.

## 4. Profile Module

The Profile Module manages the owner's primary professional information.

Responsibilities include:

- Displaying the profile image.
- Displaying the professional name.
- Displaying the professional title.
- Displaying the professional summary.
- Displaying relevant profile information.
- Providing access to the main skills.
- Providing access to the CV where appropriate.

Profile content is managed through the administrative CMS.

The module does not represent visitor profiles or user accounts.

## 5. Skills Module

The Skills Module manages technical and professional skills.

Skills are intentionally represented using a simple structure.

The profile can contain a primary list of skills.

Each experience can contain its own list of relevant skills.

Each project can contain its own list of relevant skills.

Example conceptual structure:

~~~text
Profile
└── skills[]

Experience
└── skills[]

Project
└── skills[]
~~~

The initial architecture does not require:

- A centralized skills catalog.
- Skill categories managed through a separate collection.
- Skill relationships between different entities.
- Skill proficiency levels.
- Skill endorsements.
- Visitor interaction with skills.

The administrator manually enters and manages skill strings through the CMS.

## 6. Experience Module

The Experience Module manages professional experience records.

Responsibilities include:

- Displaying experience previews on the homepage.
- Displaying complete experience information on `/experiences`.
- Loading published experiences.
- Displaying experience details.
- Displaying experience-specific skills.
- Supporting publication status.
- Allowing the administrator to create experiences.
- Allowing the administrator to edit experiences.
- Allowing the administrator to delete experiences.
- Allowing the administrator to publish or unpublish experiences.

The homepage should display a limited number of experiences or a curated preview.

The `/experiences` route provides the complete published experience list.

## 7. Project Module

The Project Module manages portfolio projects.

Responsibilities include:

- Displaying project previews on the homepage.
- Displaying complete project information on `/projects`.
- Loading published projects.
- Displaying project details.
- Displaying project-specific skills.
- Displaying project images.
- Displaying project links where applicable.
- Supporting publication status.
- Allowing the administrator to create projects.
- Allowing the administrator to edit projects.
- Allowing the administrator to delete projects.
- Allowing the administrator to publish or unpublish projects.

The homepage should display a limited project preview.

The `/projects` route provides the complete published project list.

## 8. Education Module

The Education Module manages the owner's educational background.

Responsibilities include:

- Displaying educational information on the homepage.
- Loading education data from Firestore.
- Allowing the administrator to manage education information.

The education section is intentionally lightweight.

A dedicated `/education` route is not required because the amount of information does not justify a separate page.

## 9. CV Module

The CV Module manages the owner's resume/CV.

Responsibilities include:

- Storing the CV reference.
- Displaying a CV access action.
- Opening the CV for embedded viewing when supported.
- Providing a download option.
- Allowing the administrator to upload or replace the CV.
- Managing the CV file stored in Firebase Storage.

The CV does not require a dedicated public route.

The CV reference is stored in Firestore while the actual file is stored in Firebase Storage.

## 10. Contact Module

The Contact Module provides simple contact actions.

The initial module supports only:

- Email.
- WhatsApp.

Responsibilities include:

- Providing an email action.
- Providing a WhatsApp action.
- Opening the appropriate external application or web interface.
- Displaying contact information where appropriate.

The module does not store visitor messages.

The module does not provide:

- Contact forms.
- Internal messaging.
- Chat.
- Visitor accounts.
- Message history.
- Notifications.

A dedicated `/contact` route is not required.

## 11. Links Module

The Links Module manages external professional links.

Responsibilities include:

- Displaying professional social links.
- Displaying relevant external profiles.
- Displaying project-related links when appropriate.
- Allowing the administrator to manage available links.

Links are displayed as external navigation actions.

The module does not provide authentication or account integration with external services.

## 12. Authentication Module

The Authentication Module manages administrator authentication.

The initial authentication method is:

- Google Sign-In through Firebase Authentication.

Responsibilities include:

- Starting the Google authentication flow.
- Receiving the authenticated Firebase user.
- Maintaining authentication state.
- Detecting authenticated and unauthenticated states.
- Signing the administrator out.
- Handling authentication errors.

Visitors do not use this module.

Authentication is only required for the administrative area.

## 13. Authorization Module

The Authorization Module determines whether an authenticated user is authorized to access the CMS.

Authorization is based on the `authorizedAdmins` Firestore collection.

Conceptually:

~~~text
Authenticated User
        |
        v
Firebase Authentication UID
        |
        v
authorizedAdmins/{uid}
        |
        +---- Authorized ----> Admin Access
        |
        +---- Not Authorized -> Access Denied
~~~

Responsibilities include:

- Checking the authenticated user's authorization status.
- Reading the corresponding `authorizedAdmins` record.
- Handling authorized users.
- Handling unauthorized users.
- Providing authorization state to the administrative interface.

The module does not create or modify administrator records.

Administrator authorization is managed directly through Firebase.

## 14. Administration Module

The Administration Module provides the private CMS interface.

The module is accessed through:

~~~text
/admin
~~~

Responsibilities include:

- Displaying the administrative dashboard.
- Providing access to content management functionality.
- Displaying authentication state.
- Providing administrative navigation.
- Providing content editing interfaces.
- Providing media management functionality.
- Providing publication controls.
- Providing sign-out functionality.

The administrative module must only be accessible to authorized administrators.

The `/admin` route is not required to appear in public navigation.

## 15. Content Management Module

The Content Management Module provides the CMS operations used to manage portfolio information.

It coordinates the management of:

- Profile.
- Skills.
- Experiences.
- Projects.
- Education.
- Links.
- Contact information.
- CV references.
- Publication status.

Typical content operations include:

- Create.
- Read.
- Update.
- Delete.
- Publish.
- Unpublish.

Only authorized administrators can perform protected content-management operations.

## 16. Media Management Module

The Media Management Module manages files stored in Firebase Storage.

Responsibilities include:

- Uploading images.
- Replacing images.
- Removing files when appropriate.
- Uploading the CV.
- Replacing the CV.
- Obtaining storage references.
- Associating uploaded files with Firestore records.

The module may manage:

- Profile images.
- Project images.
- CV files.
- Other portfolio media introduced in future versions.

Storage access must be protected by Firebase Security Rules.

## 17. Firestore Data Module

The Firestore Data Module provides the application's structured data access.

Responsibilities include:

- Reading portfolio documents.
- Creating content documents.
- Updating content documents.
- Deleting content documents.
- Filtering published content.
- Reading authorization records.
- Handling Firestore errors.

The module should keep Firestore-specific operations logically separated from presentation components whenever practical.

The public application should only request data required for the public experience.

Administrative operations require authorization.

## 18. Firebase Storage Module

The Firebase Storage Module provides access to files stored in Firebase Storage.

Responsibilities include:

- Uploading files.
- Downloading or referencing files.
- Replacing files.
- Deleting files when appropriate.
- Generating or retrieving file URLs.
- Handling upload errors.

The module should keep Firebase Storage operations separated from presentation components whenever practical.

## 19. Navigation Module

The Navigation Module manages application routing and internal navigation.

Initial public navigation includes:

~~~text
/
├── Profile
├── Skills
├── Experience Preview
├── Project Preview
├── Education
├── CV
└── Contact
~~~

Additional public routes include:

~~~text
/experiences
/projects
~~~

The administrative area is:

~~~text
/admin
~~~

The `/admin` route is not required to be visible in public navigation.

The module should support internal navigation without unnecessarily creating routes for individual portfolio sections.

## 20. Shared UI Module

The Shared UI Module contains reusable interface elements used across multiple modules.

Potential shared components include:

- Buttons.
- Links.
- Cards.
- Section containers.
- Navigation elements.
- Loading indicators.
- Error messages.
- Confirmation dialogs.
- Form controls.
- Modal interfaces.
- Image displays.
- Empty states.

Shared components should remain presentation-focused and should not contain unnecessary business logic.

## 21. Configuration Module

The Configuration Module manages application configuration.

Responsibilities include:

- Firebase configuration.
- Environment variables.
- Application-level constants.
- Configuration required by development and deployment environments.

Environment-specific values must not be hardcoded when they should be configurable.

Sensitive information must never be committed to the repository.

Firebase client configuration values that are intended for browser-side use are not treated as secrets, while private credentials, service account keys, private tokens, and other privileged credentials must remain outside the repository.

## 22. Module Interaction

The main interaction between modules follows this general structure:

~~~text
Public Portfolio
       |
       +--> Profile
       +--> Skills
       +--> Experience
       +--> Projects
       +--> Education
       +--> CV
       +--> Contact
       +--> Links
       |
       v
Firestore Data Module
       |
       v
Cloud Firestore

CV / Images
       |
       v
Media Management Module
       |
       v
Firebase Storage
~~~

The administrative flow follows:

~~~text
Admin Route
    |
    v
Authentication Module
    |
    v
Authorization Module
    |
    v
Administration Module
    |
    +--> Content Management Module
    |          |
    |          v
    |    Firestore Data Module
    |
    +--> Media Management Module
               |
               v
       Firebase Storage
~~~

## 23. Module Security Responsibilities

Each module must respect the application's security model.

The Authentication Module establishes identity.

The Authorization Module determines whether the current user is authorized.

The Administration Module restricts the administrative interface to authorized users.

The Firestore Data Module performs structured data operations.

The Firebase Security Rules enforce the actual access-control boundary.

The Firebase Storage Module handles file operations.

The Firebase Storage Security Rules enforce access control for stored files.

No individual frontend module should be considered a sufficient security boundary by itself.

## 24. Module Design Principles

The module architecture follows these principles:

- Single responsibility.
- Clear separation of concerns.
- Reusable components.
- Minimal coupling.
- Explicit data access boundaries.
- Firebase-specific logic separated from presentation where practical.
- No unnecessary backend layer.
- No unnecessary abstraction for simple data structures.
- Reusable architecture suitable for Open Source publication.

The architecture should remain simple enough for a personal portfolio while providing sufficient separation to demonstrate professional software architecture.

## 25. Out-of-Scope Modules

The initial version does not include modules for:

- Multi-tenant portfolio management.
- Visitor accounts.
- Visitor authentication.
- User registration.
- User profiles.
- Role management.
- Billing.
- Payments.
- Analytics.
- Messaging.
- Chat.
- Blog management.
- Comments.
- Notifications.
- Mobile applications.
- Custom backend APIs.
- REST API management.
- GraphQL management.

>These capabilities are outside the current scope and should not be introduced unless explicitly required in a future version.