# Firebase Architecture

## 1. Overview

Firebase provides the backend infrastructure for Portfolio Platform.

The application uses Firebase services instead of implementing a custom backend server.

The initial Firebase architecture consists of:

- Firebase Authentication.
- Cloud Firestore.
- Firebase Storage.
- Firebase Hosting.
- Firebase Security Rules.

The architecture is designed for a single personal portfolio.

It does not use Firebase to provide a multi-user portfolio creation platform.

Other developers may reuse the source code as a template and configure their own Firebase project for their own independent portfolio deployment.

## 2. Firebase Services

The initial Firebase project uses the following services:

~~~text
Firebase Project
|
+-- Authentication
|
+-- Cloud Firestore
|
+-- Storage
|
+-- Hosting
|
└-- Security Rules
~~~

Each service has a specific responsibility.

## 3. Firebase Authentication

Firebase Authentication is responsible for administrator authentication.

The initial authentication provider is:

- Google.

Visitors do not need to authenticate to access the public portfolio.

The administrator accesses the private CMS through:

~~~text
/admin
~~~

The authentication flow is:

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
Authenticated Firebase User
~~~

Authentication establishes the identity of the user but does not, by itself, grant administrative access.

## 4. Google Sign-In

Google Sign-In is the only authentication method required by the initial architecture.

The administrator selects the Google account they want to use.

Firebase Authentication provides the authenticated user's identity and UID.

The application then checks whether that UID is authorized to access the CMS.

Conceptually:

~~~text
Google Account
      |
      v
Google Sign-In
      |
      v
Firebase Authentication
      |
      v
Firebase User
      |
      v
Authorization Check
~~~

The application does not implement:

- Email/password registration.
- Password recovery.
- Visitor registration.
- User profiles.
- Social login providers other than Google.

Additional providers may be considered in future versions only if required.

## 5. Administrator Authorization

Authentication and authorization are separate concerns.

After Firebase Authentication successfully identifies a user, the application checks the `authorizedAdmins` collection.

The expected authorization structure is:

~~~text
authorizedAdmins/{uid}
~~~

A conceptual document may contain:

~~~text
email
active
addedAt
~~~

The exact schema is defined in the data-model documentation.

The authorization flow is:

~~~text
Authenticated Firebase User
          |
          v
Firebase User UID
          |
          v
authorizedAdmins/{uid}
          |
          +---- Exists and Active ----> Authorized
          |
          +---- Missing/Inactive ----> Unauthorized
~~~

## 6. authorizedAdmins Management

The `authorizedAdmins` collection is managed exclusively through Firebase.

The application must not provide a UI for:

- Adding administrators.
- Removing administrators.
- Editing administrator records.
- Changing administrator authorization.
- Managing administrator roles.

The application only reads the authorization information required to determine whether the current authenticated user is authorized.

Administrator authorization is therefore controlled outside the application interface.

## 7. Cloud Firestore

Cloud Firestore is the primary structured data store.

It stores portfolio content and administrator authorization data.

Initial collections include:

~~~text
profile
experiences
projects
education
links
contact
authorizedAdmins
~~~

Firestore is responsible for structured application data.

Binary files such as images and the CV are stored in Firebase Storage instead.

## 8. Firestore Responsibilities

Firestore is used to store:

- Profile information.
- Main profile skills.
- Professional experiences.
- Experience-specific skills.
- Projects.
- Project-specific skills.
- Education.
- Professional links.
- Contact information.
- Publication status.
- References to files stored in Firebase Storage.
- Administrator authorization records.

Firestore is not used for:

- Visitor accounts.
- Visitor messages.
- Chat messages.
- Analytics.
- Billing.
- Payment information.
- Multi-tenant portfolio records.

## 9. Firestore Access Model

The public application requires read access to published portfolio content.

Administrative users require protected read and write access to portfolio content.

The conceptual access model is:

~~~text
Public Visitor
      |
      +---- Read Published Content
      |
      +---- No Administrative Writes

Authorized Administrator
      |
      +---- Read Portfolio Content
      +---- Create Content
      +---- Update Content
      +---- Delete Content
      +---- Publish Content
      +---- Unpublish Content

Unauthorized User
      |
      +---- No Administrative Access
~~~

Firebase Security Rules enforce the actual access-control boundary.

## 10. Published Content

Portfolio entities that support publication status use:

~~~text
isPublished
~~~

Public queries should only expose content where:

~~~text
isPublished == true
~~~

The administrator can manage both published and unpublished content.

This allows content to be prepared before publication.

The application must not expose unpublished portfolio content through public routes.

## 11. Firebase Storage

Firebase Storage is used for binary portfolio files.

Initial content includes:

- Profile image.
- Project images.
- CV.
- Other portfolio media when required.

Conceptual structure:

~~~text
Storage
|
+-- profile/
|
+-- projects/
|
└-- documents/
~~~

Firestore stores references to files where required.

## 12. CV Storage

The CV is stored in Firebase Storage.

A Firestore document stores the reference to the CV.

Conceptually:

~~~text
Firestore
   |
   +-- profile
          |
          +-- resumeUrl
                    |
                    v
             Firebase Storage
                    |
                    v
                  CV.pdf
~~~

The public portfolio must provide:

- Embedded viewing when supported by the browser.
- Download functionality.

The CV does not require a separate application route.

## 13. Profile Image Storage

The main profile image is stored in Firebase Storage.

A Firestore profile document stores its accessible reference.

Conceptually:

~~~text
Firestore
   |
   +-- profile
          |
          +-- profileImageUrl
                    |
                    v
             Firebase Storage
~~~

The actual binary image should not be stored directly inside the Firestore document.

## 14. Project Media Storage

Project images are stored in Firebase Storage.

Each project can reference its associated media through Firestore.

Conceptually:

~~~text
Project
   |
   +-- imageUrl
   |
   v
Firebase Storage
   |
   +-- projects/
~~~

The exact storage path strategy can be finalized during implementation.

## 15. Firebase Hosting

Firebase Hosting serves the production application.

The deployment architecture is:

~~~text
Source Code
    |
    v
React + Vite
    |
    v
Production Build
    |
    v
Firebase Hosting
~~~

Firebase Hosting serves the compiled frontend application.

The initial architecture does not require a custom application server.

## 16. Client Application

The React application communicates directly with Firebase through the Firebase client SDK.

Conceptually:

~~~text
React Application
       |
       +--------------------+
       |                    |
       v                    v
Firebase SDK          Application Logic
       |
       +-- Authentication
       +-- Firestore
       +-- Storage
~~~

The application does not require an intermediary custom Node.js server.

## 17. Node.js Role

Node.js is part of the project's development ecosystem but is not required as a custom runtime backend.

Node.js is used by tooling such as:

- npm.
- Vite.
- Firebase CLI.
- Development scripts.
- Build processes.

The application does not initially include:

~~~text
Node.js + Express API
~~~

or another custom backend server.

This keeps the runtime architecture simpler and allows Firebase to provide the required backend infrastructure.

## 18. Firebase Security Rules

Firebase Security Rules provide the primary backend access-control mechanism.

Security Rules must protect:

- Cloud Firestore.
- Firebase Storage.

The frontend may perform authentication and authorization checks for user experience purposes, but those checks are not sufficient for security.

Conceptually:

~~~text
Frontend
   |
   +-- Authentication State
   |
   +-- Authorization State
   |
   v
Firebase Services
   |
   v
Security Rules
   |
   +---- Allowed
   |
   +---- Denied
~~~

## 19. Firestore Security Model

Firestore Security Rules must distinguish between:

- Public reads of published content.
- Authorized administrative operations.
- Unauthorized operations.

The rules must ensure that an unauthorized user cannot modify portfolio content even if they manually construct requests or bypass frontend navigation.

The rules must also prevent unauthorized modification of `authorizedAdmins`.

The application itself does not manage administrator authorization.

## 20. Storage Security Model

Firebase Storage Security Rules must protect uploaded files.

The rules should distinguish between:

- Publicly accessible portfolio files.
- Protected administrative operations.
- Unauthorized write operations.

Public files required by the portfolio must remain accessible to visitors.

Administrative write operations must be restricted to authorized administrators.

Unauthorized users must not be able to upload, replace, or delete portfolio files.

## 21. Firebase Configuration

Firebase client configuration is provided to the frontend through the project's environment configuration.

Environment-specific configuration should be stored outside committed source files when appropriate.

The repository should include an example configuration file containing placeholders rather than real private values.

For example:

~~~text
.env.example
~~~

may document the required variables without containing real credentials or private configuration.

## 22. Firebase Credentials and Secrets

The repository must never contain:

- Firebase service account private keys.
- Private API credentials.
- Authentication secrets.
- Private tokens.
- Passwords.
- Production credentials.
- Other privileged secrets.

Firebase client configuration values intended for browser-side use are not considered secret credentials by themselves.

Privileged Firebase credentials must remain outside the repository.

The project must be structured so that it can eventually be published as a public repository without exposing private infrastructure credentials.

## 23. Firebase Project Independence

The source code must not depend on the owner's Firebase project in a way that prevents reuse.

A developer reusing the repository should be able to configure:

~~~text
Their Own Source Code
        |
        v
Their Own Firebase Project
        |
        +-- Authentication
        +-- Firestore
        +-- Storage
        +-- Hosting
        +-- Security Rules
~~~

The repository should provide sufficient documentation and example configuration to make this possible.

## 24. Firebase Environments

The initial project may use a single Firebase project for development and production if appropriate.

A separate development and production Firebase project can be introduced later if the project complexity requires it.

The architecture should remain compatible with environment separation.

Possible future structure:

~~~text
Development
    |
    v
Firebase Development Project

Production
    |
    v
Firebase Production Project
~~~

This separation is not mandatory for the initial implementation.

## 25. Local Development

Local development should use Firebase tooling where appropriate.

The project may use:

- Firebase CLI.
- Firebase Emulator Suite.
- Local React/Vite development server.

The Firebase Emulator Suite can be introduced to test Firebase services locally without modifying production data.

The use of emulators is encouraged for security-rule development and testing.

## 26. Deployment Flow

The intended deployment flow is:

~~~text
Developer
    |
    v
Git Repository
    |
    v
Build
    |
    v
React + Vite Production Build
    |
    v
Firebase Hosting
~~~

Firebase configuration and deployment settings must be environment-appropriate.

Security Rules and Firebase configuration should be version-controlled where safe and appropriate.

Private credentials must never be version-controlled.

## 27. Firebase Data Flow

The general public data flow is:

~~~text
Visitor
   |
   v
React Application
   |
   v
Firebase SDK
   |
   v
Cloud Firestore
   |
   v
Published Portfolio Data
   |
   v
React Application
   |
   v
Rendered Portfolio
~~~

The administrative data flow is:

~~~text
Administrator
      |
      v
/admin
      |
      v
Google Sign-In
      |
      v
Firebase Authentication
      |
      v
authorizedAdmins
      |
      +---- Authorized
              |
              v
        Admin Dashboard
              |
              v
        Firebase SDK
          /       \
         v         v
    Firestore    Storage
         |         |
         +----+----+
              |
              v
       Updated Portfolio
~~~

## 28. Error Handling

Firebase operations must account for failures.

Potential failures include:

- Authentication failure.
- Authorization lookup failure.
- Firestore read failure.
- Firestore write failure.
- Storage upload failure.
- Storage deletion failure.
- Network failure.
- Permission-denied responses.

The application should provide appropriate loading, error, and retry states where applicable.

Firebase error messages should not expose sensitive implementation details to visitors.

## 29. Performance Considerations

The Firebase architecture should minimize unnecessary reads and transfers.

The application should:

- Load only required public content.
- Avoid unnecessary Firestore queries.
- Avoid repeatedly fetching unchanged data.
- Optimize portfolio images.
- Avoid unnecessarily large files.
- Load media efficiently.
- Keep the homepage responsive.
- Use appropriate loading states.

Performance optimization should not introduce unnecessary architectural complexity.

## 30. Firebase Architecture Constraints

The initial Firebase architecture intentionally excludes:

- Firebase Cloud Functions unless required later.
- Custom Node.js backend servers.
- Express.
- REST APIs.
- GraphQL.
- Firebase Extensions unless explicitly required.
- Multi-tenant Firestore architecture.
- Visitor authentication.
- Visitor accounts.
- User-generated content.
- Messaging.
- Payments.
- Billing.
- Analytics.

Firebase services should only be introduced when they provide a clear benefit to the portfolio.

## 31. Future Firebase Extensions

Future versions may introduce additional Firebase functionality if required.

Potential examples include:

- Cloud Functions.
- Firebase App Check.
- Firebase Performance Monitoring.
- Additional authentication providers.
- Additional storage organization.
- Separate development and production Firebase projects.

These are not part of the initial architecture and should not be added without a concrete requirement.

## 32. Architectural Principles

The Firebase architecture follows these principles:

- Firebase provides the backend infrastructure.
- Firestore stores structured portfolio data.
- Storage stores binary portfolio files.
- Authentication establishes administrator identity.
- `authorizedAdmins` determines administrator authorization.
- Security Rules enforce access control.
- Hosting serves the production frontend.
- The frontend is not the primary security boundary.
- No custom backend is required initially.
- No unnecessary Firebase services should be introduced.
- The architecture must remain reusable as an Open Source template.
- Private credentials must never be committed to the repository.