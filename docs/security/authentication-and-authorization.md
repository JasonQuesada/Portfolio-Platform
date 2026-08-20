# Authentication and Authorization

## 1. Purpose

This document defines the authentication and authorization model for the Portfolio Platform.

The system separates authentication from authorization:

- Firebase Authentication verifies the identity of a user.
- The authorization model determines whether that authenticated user is permitted to access administrative functionality.
- Firebase Security Rules enforce access to protected Firestore and Firebase Storage resources.

The initial application supports a single portfolio owner and a controlled administrative interface.

## 2. Authentication Provider

The application uses Firebase Authentication as its authentication provider.

The initial authentication method is:

- Google Sign-In.

No custom username/password authentication is required for the initial version.

The application should rely on Firebase Authentication rather than implementing its own authentication mechanism.

## 3. Public Authentication Model

The public portfolio does not require authentication.

Visitors can access the public portfolio without creating an account or signing in.

The public experience includes:

- Profile.
- Skills.
- Experience previews.
- Project previews.
- Education.
- CV.
- Contact information.
- Publicly available detailed portfolio content.

Authentication is required only for administrative functionality.

## 4. Administrative Authentication

The administrative interface is accessed through:

    /admin

The authentication flow is:

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
       |
       v
    Authorization Check
       |
       +---- Not Authorized ----> Access Denied
       |
       +---- Authorized --------> Admin Dashboard

The `/admin` route does not need to be included in the public navigation.

## 5. Authentication vs Authorization

Authentication answers:

    "Who is this user?"

Authorization answers:

    "Is this authenticated user allowed to perform this action?"

Successful Google authentication does not automatically grant administrative access.

A user may be authenticated by Firebase but still be unauthorized to use the CMS.

## 6. Administrator Authorization

Administrative authorization is managed through the `authorizedAdmins` Firestore collection.

Conceptual structure:

    authorizedAdmins
        |
        +-- {adminId}
              |
              +-- uid
              +-- email
              +-- displayName
              +-- active
              +-- createdAt
              +-- updatedAt

The Firebase Authentication UID is the primary identity association.

An administrator is authorized only when the authenticated user's identity corresponds to an active authorization record.

## 7. Authorization Flow

The authorization flow is:

    User
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
    Authenticated UID
      |
      v
    Check authorizedAdmins
      |
      +---- Record missing ----> Access Denied
      |
      +---- active = false ----> Access Denied
      |
      +---- active = true -----> Admin Access

The frontend may use this information to determine what interface to display.

However, frontend authorization checks are not the primary security mechanism.

Firebase Security Rules enforce the actual authorization boundary.

## 8. Initial Administrator Model

The initial application is designed primarily for one portfolio owner.

The system may support more than one authorized administrator at the infrastructure level, but the initial product does not require:

- Complex role management.
- Permission groups.
- Organization accounts.
- Multi-tenant administration.
- Public account registration.

Additional administrators should only be added deliberately.

## 9. Administrator Creation

Administrator authorization should not be granted through public registration.

The initial setup should be performed through a controlled administrative or deployment process.

The first authorized administrator may be configured directly in the Firebase project.

After the initial administrator exists, additional administrator-management functionality may be considered if a concrete requirement is introduced.

## 10. No Public Registration

The application does not provide:

    /register

or any equivalent public registration flow.

Visitors do not create application accounts.

Google Sign-In is used only as the authentication mechanism for accessing the administrative area.

## 11. Authentication State

The React application should maintain the Firebase Authentication state through the Firebase client SDK.

The application should account for states such as:

- Authentication loading.
- Unauthenticated.
- Authenticated.
- Authorization checking.
- Authorized administrator.
- Authenticated but unauthorized.
- Authentication error.

These states should be reflected in the administrative interface.

## 12. Authentication Loading

When the application is determining the current authentication state, it should not prematurely display the administrative dashboard.

The application should use an explicit loading state.

Conceptually:

    Authentication State
          |
          +---- Loading ------> Loading UI
          |
          +---- Signed Out ---> Sign-In UI
          |
          +---- Signed In ----> Authorization Check

This avoids incorrectly exposing administrative UI before authorization has been established.

## 13. Authorization Loading

Authentication and authorization are separate steps.

After Firebase Authentication confirms the user's identity, the application must determine whether the user is an authorized administrator.

Conceptually:

    Authenticated
         |
         v
    Authorization Check
         |
         +---- Checking -----> Loading UI
         |
         +---- Authorized ---> Dashboard
         |
         +---- Unauthorized -> Access Denied

## 14. Unauthorized Users

An authenticated but unauthorized user must not gain access to the administrative dashboard.

The application should provide an appropriate access-denied state.

The user may be given an option to sign out.

The application should not expose:

- Administrative content.
- CMS controls.
- Administrative Firestore data.
- Protected Storage resources.
- Administrator authorization records.

## 15. Unauthenticated Users

Unauthenticated users attempting to access `/admin` should be presented with the configured Google Sign-In flow.

They should not receive administrative data before authentication is completed.

## 16. Sign-Out

The administrative interface should provide a sign-out operation.

Signing out should:

- End the Firebase Authentication session.
- Remove the authenticated administrative state from the application.
- Prevent continued access to administrative operations.
- Return the user to an appropriate public or authentication state.

The application should not maintain an independent long-lived administrative session separate from Firebase Authentication.

## 17. Session Management

Session management is handled primarily by Firebase Authentication.

The application should not implement its own authentication token storage system.

The application should not:

- Store passwords.
- Store Google credentials.
- Store authentication tokens manually in Firestore.
- Create custom session cookies without a concrete architectural requirement.
- Implement its own authentication protocol.

## 18. Firebase Authentication Identity

The Firebase Authentication UID is the canonical identifier for an authenticated user.

The application should use the UID when associating a Firebase Authentication identity with an authorization record.

Conceptually:

    Firebase Authentication
            |
            +-- uid
                 |
                 v
    authorizedAdmins/{uid}

Using the UID avoids relying exclusively on an email address as the authorization identity.

## 19. Email Addresses

An administrator record may contain the administrator's email address for administrative visibility and auditing.

However, the UID should remain the primary identity association.

Email addresses may change or may not be sufficient as the sole authorization identifier.

## 20. Authorization Record

A conceptual administrator record is:

    {
      uid: "firebase-user-id",
      email: "administrator@example.com",
      displayName: "Administrator",
      active: true,
      createdAt: timestamp,
      updatedAt: timestamp
    }

The actual values depend on the Firebase project deployment.

Real credentials, tokens, or private account information must never be committed to the repository.

## 21. Active Authorization

The `active` field allows an administrator authorization record to be disabled without necessarily deleting the record.

Conceptually:

    active: true

allows administrative access.

    active: false

denies administrative access.

The exact implementation must ensure that Security Rules respect the authorization state.

## 22. Firebase Security Rules

Firebase Security Rules are the primary enforcement mechanism for Firestore and Storage authorization.

The rules must not trust frontend state such as:

- React context.
- Local state.
- Hidden routes.
- Hidden buttons.
- Client-side role variables.

A malicious client can bypass frontend logic.

Security Rules must independently validate access.

## 23. Firestore Authorization

Protected Firestore operations should verify that the request comes from an authorized administrator.

Conceptually:

    Request
       |
       v
    request.auth != null
       |
       v
    Authorized administrator?
       |
       +---- No ----> Deny
       |
       +---- Yes ---> Allow according to resource rules

The exact implementation is defined in:

    docs/security/security-rules-requirements.md

## 24. Storage Authorization

Firebase Storage operations follow the same administrative authorization model.

Protected uploads, updates, and deletions require an authorized administrator.

Public read access may be allowed only for intentionally public portfolio files.

The Storage rules must not assume that a file is safe simply because its URL is not displayed by the frontend.

## 25. Public Firestore Data

Public visitors may read portfolio information that is explicitly intended for public presentation.

Examples include:

- Published profile information.
- Published skills.
- Published experiences.
- Published projects.
- Published education.
- Public site configuration.

Public users must not be able to modify this data.

## 26. Public Storage Data

Public visitors may read Storage resources intentionally exposed by the public portfolio.

Examples include:

- Published profile image.
- Published project images.
- Published experience images.
- Published CV.

The public accessibility of each resource must follow the final Storage security model.

## 27. Administrative Firestore Data

Authorized administrators may access data required to manage the portfolio.

This includes:

- Published content.
- Unpublished content.
- Draft content.
- Ordering information.
- Administrative configuration.
- Content metadata.

Access remains subject to Firebase Security Rules.

## 28. Authorized Administrator Records

The `authorizedAdmins` collection requires additional protection.

It should not be publicly readable.

It should not be publicly writable.

An ordinary authenticated user should not automatically receive access to it.

The authorization mechanism must avoid creating a circular dependency that allows an untrusted user to authorize themselves.

## 29. Circular Authorization Risk

The authorization system must prevent the following insecure flow:

    User
      |
      v
    Authenticate
      |
      v
    Modify authorizedAdmins
      |
      v
    Add own UID
      |
      v
    Become Administrator

This must never be possible.

The ability to modify administrator authorization must itself require a trusted authorization mechanism.

## 30. Initial Authorization Bootstrap

The first administrator must be established through a controlled bootstrap process.

Possible mechanisms include:

- Manual creation in the Firebase environment.
- Controlled deployment/setup scripts.
- A secure one-time administrative procedure.

The exact bootstrap mechanism may be defined during implementation.

The repository must not contain the administrator's private credentials.

## 31. Authentication Errors

The application should handle authentication errors without exposing unnecessary technical information.

Possible errors include:

- Sign-in cancelled.
- Popup blocked.
- Authentication unavailable.
- Network failure.
- Firebase configuration error.
- Authentication provider error.

User-facing messages should be clear and appropriate.

Detailed debugging information should remain available only through appropriate development tooling.

## 32. Authorization Errors

Authorization failures should be handled separately from authentication failures.

Examples:

    Authentication failure
        |
        +-- User could not authenticate

    Authorization failure
        |
        +-- User authenticated successfully
            but is not an authorized administrator

The interface should communicate the distinction appropriately without exposing security-sensitive details.

## 33. Route Protection

The `/admin` route should be protected by the application.

Unauthenticated users should not access administrative content.

Authenticated but unauthorized users should not access administrative content.

However, route protection is an additional application-layer control, not the primary security boundary.

Firestore and Storage Security Rules must enforce authorization independently.

## 34. Deep Links

Direct navigation to administrative routes must follow the same authentication and authorization flow as navigation from within the application.

For example:

    /admin
    /admin/projects
    /admin/experiences

must not become accessible simply because the user manually enters the URL.

## 35. Browser Refresh

Refreshing an administrative route should preserve the Firebase Authentication session when Firebase determines the user is still authenticated.

The application should then perform its authorization check before displaying protected administrative content.

The application should not assume that a previous in-memory authorization state remains valid after a page reload.

## 36. Authentication Provider Scope

The initial application uses Google Sign-In because it provides:

- A well-established authentication provider.
- No need to manage passwords.
- Integration with Firebase Authentication.
- A simple administrative sign-in experience.
- Reduced custom authentication complexity.

Additional authentication providers may be introduced later only if a concrete requirement exists.

## 37. Account Linking

The initial application does not require account linking between multiple authentication providers.

If additional providers are introduced in the future, identity-linking behavior must be explicitly designed and documented.

## 38. Password Management

The application does not manage administrator passwords.

There is no custom password database.

Password recovery is handled by the external authentication provider when applicable.

## 39. Token Handling

Authentication tokens are managed by Firebase Authentication and its client SDK.

The application must not expose authentication tokens through:

- Public Firestore documents.
- Public Storage files.
- Portfolio content.
- URL query parameters.
- Application logs.
- Source-controlled configuration files.

Sensitive tokens must never be committed to the repository.

## 40. Local Development

Local development should use the same authentication architecture as production while using the appropriate Firebase project and environment configuration.

Environment-specific configuration must remain outside source-controlled secret files.

The repository may include:

    .env.example

containing variable names and safe placeholder values.

Actual environment files containing project-specific configuration should not be committed unless the values are explicitly safe for public distribution.

## 41. Production Environment

Production authentication uses the configured production Firebase project.

The production Firebase project must have:

- Google Authentication enabled.
- Authorized administrator records configured.
- Appropriate Firebase Security Rules deployed.
- Appropriate domain configuration.
- Appropriate Firebase Storage configuration.
- Appropriate Firestore configuration.

Production credentials and privileged configuration must remain outside the public repository.

## 42. Authorized Domains

Firebase Authentication authorized domains must be configured for the environments where Google Sign-In is expected to operate.

At minimum, the configuration should account for:

- Local development.
- Production deployment.
- Any intentionally supported preview environment.

Only required domains should be authorized.

## 43. Sign-In Restrictions

The initial application does not provide unrestricted administrative access to every Google account.

Google authentication establishes identity.

The `authorizedAdmins` authorization layer determines whether that identity is permitted to administer the portfolio.

This prevents arbitrary authenticated Google users from accessing the CMS.

## 44. Administrative Data Access

The administrative interface may access unpublished and other non-public portfolio data.

This access is available only to authorized administrators.

The application should avoid loading protected data before authorization has been established.

## 45. Least Privilege

The authorization model follows the principle of least privilege.

Public users receive only the access required to view public portfolio content.

Authenticated but unauthorized users receive no administrative privileges.

Authorized administrators receive only the permissions required to manage the portfolio.

Future permissions should be introduced only when justified by a specific requirement.

## 46. Defense in Depth

The application uses multiple security layers:

    User
      |
      v
    Firebase Authentication
      |
      v
    Application Authorization State
      |
      v
    Firestore / Storage Security Rules
      |
      v
    Protected Data

The frontend improves the user experience and prevents normal users from reaching inappropriate UI states.

Firebase Security Rules provide the actual backend enforcement.

## 47. Authorization Failure Handling

If authorization cannot be verified, the application should fail closed.

This means:

    Authorization Check Failed
             |
             v
        No Admin Access

The application should not assume that an unknown authorization state means access is allowed.

## 48. Network Failure During Authorization

If the authorization check cannot be completed because of a network or service failure, administrative access should not be granted based solely on cached frontend state.

The application should present an appropriate error or retry state.

Security-sensitive operations must remain protected by Firebase Security Rules.

## 49. Expired or Revoked Access

If an administrator is deactivated, future authorization checks should deny administrative access.

Existing Firebase Authentication sessions should not be treated as sufficient authorization after administrative access has been revoked.

Firebase Security Rules must independently evaluate the authorization state for protected operations.

## 50. Administrative Route Structure

The initial administrative route structure may include:

    /admin
        |
        +-- Dashboard
        |
        +-- Profile
        |
        +-- Skills
        |
        +-- Experiences
        |
        +-- Projects
        |
        +-- Education
        |
        +-- Settings

The exact routes may evolve during implementation.

All administrative routes remain protected by the same authentication and authorization model.

## 51. Public Route Structure

The public application does not require authentication.

The initial public routes may include:

    /
    /experiences
    /projects

The public route structure is documented in:

    docs/architecture/navigation.md

## 52. No Authorization Through URL Structure

A route such as:

    /admin

must not itself grant administrative privileges.

Likewise, a route parameter or query parameter must never be used as proof of authorization.

Examples of insecure patterns include:

    /admin?authorized=true

or:

    /admin?role=admin

Authorization must come from authenticated identity and trusted Firebase Security Rules.

## 53. No Client-Controlled Administrator Flags

The application must not rely on client-controlled values such as:

    localStorage.role = "admin"

or:

    user.isAdmin = true

when those values can be manipulated by the client.

The authoritative authorization mechanism must remain outside untrusted client state.

## 54. Audit Considerations

The initial application does not require a complete audit-log system.

However, administrative records should contain timestamps such as:

    createdAt
    updatedAt

These fields provide basic content-management traceability.

A full audit history may be introduced in a future version if required.

## 55. Future Role Management

The initial system does not require roles such as:

    admin
    editor
    reviewer
    owner

All authorized administrators are initially treated as administrators with the permissions required to manage the portfolio.

If role-based access control is introduced later, it must be documented as an architectural change.

## 56. Multi-Administrator Support

The authorization model can support multiple administrators through multiple records in:

    authorizedAdmins

However, the initial application is optimized for a single portfolio owner.

Supporting multiple administrators does not imply that multi-tenancy is supported.

All administrators would still operate on the same portfolio instance.

## 57. Multi-Tenancy

Multi-tenancy is outside the initial scope.

The application does not initially support:

- Multiple independent portfolio owners in one Firebase project.
- Tenant identifiers.
- Tenant-specific authorization.
- Tenant-specific Storage isolation.
- Tenant-specific Firestore namespaces.

A future multi-tenant architecture would require a dedicated design.

## 58. Security Boundary

The primary security boundary is Firebase.

More specifically:

- Firebase Authentication establishes identity.
- Firestore Security Rules protect Firestore data.
- Firebase Storage Security Rules protect Storage resources.
- Application-layer checks control the administrative user experience.

The React frontend is not a trusted security boundary.

## 59. Open Source Considerations

The authentication and authorization architecture must remain safe for public repository distribution.

The repository may contain:

- Firebase client configuration patterns that are safe for the selected deployment model.
- Authentication integration code.
- Authorization logic.
- Security Rules.
- Example environment configuration.
- Documentation.

The repository must not contain:

- Service account credentials.
- Private keys.
- Authentication tokens.
- Passwords.
- Secrets.
- Production administrator credentials.
- Sensitive Firebase administrative credentials.

## 60. Initial Authentication and Authorization Requirements

The initial implementation must satisfy the following requirements:

- Public visitors can access the portfolio without authentication.
- The administrative interface is available through `/admin`.
- Google Sign-In is used for administrator authentication.
- Firebase Authentication manages user identity.
- Authentication does not automatically grant administrator access.
- Administrator authorization is represented through `authorizedAdmins`.
- Administrator authorization is associated with Firebase Authentication UID.
- Inactive administrators are denied administrative access.
- Unauthenticated users cannot access administrative content.
- Authenticated but unauthorized users cannot access administrative content.
- Firestore Security Rules enforce protected data access.
- Storage Security Rules enforce protected file access.
- Public portfolio data is readable only according to its intended publication state.
- Public users cannot modify portfolio content.
- Administrator credentials are never stored in the repository.
- The application fails closed when authorization cannot be verified.
- No public registration flow is required.
- No custom password management is required.

## 61. Related Documentation

The following documents define related aspects of the authentication and authorization architecture:

- `docs/security/security-model.md` — Overall security model.
- `docs/security/security-rules-requirements.md` — Firebase Security Rules requirements.
- `docs/security/repository-security.md` — Repository security and secret-management requirements.
- `docs/data-model/firestore-schema.md` — Firestore schema, including `authorizedAdmins`.
- `docs/data-model/storage-structure.md` — Firebase Storage structure.
- `docs/architecture/firebase-architecture.md` — Firebase service architecture.
- `docs/architecture/navigation.md` — Public and administrative navigation.
- `docs/architecture/system-architecture.md` — Overall system architecture.