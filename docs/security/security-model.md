# Security Model

## 1. Purpose

This document defines the security model for the Portfolio Platform.

The security architecture is designed to protect:

- Public portfolio content.
- Administrative functionality.
- Firestore data.
- Firebase Storage resources.
- Administrator authorization data.
- Application configuration.
- Repository contents.
- Deployment infrastructure.

The initial system is a single-owner portfolio platform with a public-facing interface and a protected administrative CMS.

## 2. Security Objectives

The primary security objectives are:

- Prevent unauthorized administrative access.
- Prevent unauthorized modification of portfolio data.
- Prevent unauthorized deletion of portfolio data.
- Prevent unauthorized uploads to Firebase Storage.
- Protect unpublished portfolio content.
- Protect administrator authorization records.
- Prevent secrets from entering the source repository.
- Minimize the application's attack surface.
- Apply least-privilege access.
- Keep security enforcement independent from the frontend.
- Maintain a reusable and secure Open Source architecture.

## 3. Security Architecture

The security architecture is based on multiple layers:

    User
      |
      v
    React Application
      |
      v
    Firebase Authentication
      |
      v
    Application Authorization
      |
      v
    Firebase Security Rules
      |
      +--------------------+
      |                    |
      v                    v
    Firestore          Firebase Storage

The frontend controls the user experience.

Firebase Authentication establishes identity.

Firebase Security Rules enforce access to protected resources.

## 4. Primary Security Boundary

Firebase Security Rules are the primary security boundary for application data.

The frontend must never be considered a trusted security boundary.

The following mechanisms must not be treated as sufficient protection:

- Hidden routes.
- Hidden buttons.
- Disabled UI controls.
- React state.
- Context providers.
- Client-side role variables.
- Local Storage values.
- URL parameters.
- Frontend-only authorization checks.

A malicious client can bypass frontend logic and communicate directly with Firebase services.

Security Rules must therefore independently enforce authorization.

## 5. Authentication Security

Firebase Authentication is responsible for establishing user identity.

The initial authentication provider is Google Sign-In.

The application does not manage:

- Passwords.
- Password hashes.
- Google credentials.
- Custom authentication protocols.
- Custom authentication databases.

This reduces the amount of authentication-sensitive code maintained by the application.

## 6. Authorization Security

Authentication and authorization are separate concepts.

Authentication establishes:

    "This user is authenticated."

Authorization establishes:

    "This authenticated user is authorized to administer this portfolio."

A successful Google Sign-In must not automatically grant administrative privileges.

Administrator authorization is determined through the configured authorization model.

## 7. Administrator Authorization

Administrator authorization is represented through:

    authorizedAdmins

The conceptual relationship is:

    Firebase Authentication
            |
            +-- uid
                 |
                 v
    authorizedAdmins/{uid}

An administrator must have a valid authorization record.

The authorization record should also contain an active state.

Conceptually:

    active = true

allows administrative access.

    active = false

denies administrative access.

## 8. Fail-Closed Principle

The security model follows a fail-closed approach.

If authorization cannot be verified, access must be denied.

Examples include:

- Missing authentication.
- Missing administrator record.
- Inactive administrator record.
- Authorization lookup failure.
- Invalid authorization state.
- Unexpected security state.

The system must never interpret an unknown state as authorized.

## 9. Public Access Model

The public portfolio is intentionally accessible without authentication.

Public visitors may read content that has been explicitly designated for public presentation.

Examples include:

- Profile.
- Skills.
- Published experiences.
- Published projects.
- Education.
- Public CV.
- Public contact information.

Public visitors must not be able to modify this information.

## 10. Publication Security

Portfolio content uses explicit publication state.

Conceptually:

    published = true

means that the content is intended for public presentation.

    published = false

means that the content is not intended for public presentation.

Public queries should retrieve only content intended for public presentation.

The publication state must not be enforced exclusively by frontend filtering.

## 11. Unpublished Content

Unpublished content may exist in Firestore for administrative management.

Examples include:

- Draft projects.
- Draft experiences.
- Unpublished skills.
- Unpublished education records.
- Unpublished profile changes.

Unauthenticated users must not be able to read protected unpublished data.

## 12. Administrative Access

Authorized administrators may manage portfolio content.

Administrative operations include:

- Create.
- Read.
- Update.
- Delete.
- Publish.
- Unpublish.
- Reorder.
- Upload media.
- Replace media.
- Delete media.

All protected operations remain subject to Firebase Security Rules.

## 13. Firestore Security

Firestore Security Rules must protect structured application data.

The rules should enforce:

- Public read access only where intentionally permitted.
- No public writes.
- Administrative writes only for authorized administrators.
- Protected administrator data inaccessible to public users.
- Authorization records protected from unauthorized modification.

## 14. Storage Security

Firebase Storage Security Rules must protect binary files.

The rules should enforce:

- Public read access only for intentionally public files.
- No public uploads.
- No public modifications.
- No public deletions.
- Administrative writes only for authorized administrators.
- Protected files inaccessible to unauthorized users.

## 15. Administrator Collection Protection

The `authorizedAdmins` collection is security-sensitive.

It must not be publicly readable.

It must not be publicly writable.

The system must prevent ordinary authenticated users from modifying their own authorization status.

The following flow must never be possible:

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

Administrator authorization must be established through a trusted process.

## 16. Authorization Bootstrap

The initial administrator must be created through a controlled process.

Potential mechanisms include:

- Manual Firebase configuration.
- Controlled setup scripts.
- Secure deployment procedures.

The bootstrap process must not expose administrative credentials in the source repository.

## 17. Least Privilege

The application follows the principle of least privilege.

Public visitors receive only the access required to view public portfolio content.

Authenticated but unauthorized users receive no administrative privileges.

Authorized administrators receive the permissions necessary to manage the portfolio.

Future permissions should be introduced only when justified by explicit requirements.

## 18. Defense in Depth

The system uses multiple security controls.

The conceptual model is:

    Layer 1
    Authentication
        |
        v
    Layer 2
    Application Authorization
        |
        v
    Layer 3
    Firestore / Storage Security Rules
        |
        v
    Protected Resources

Each layer serves a different purpose.

Frontend checks improve usability.

Firebase Authentication establishes identity.

Firebase Security Rules enforce access.

## 19. Frontend Security

The React frontend should implement appropriate security-oriented behavior, including:

- Protected administrative routes.
- Authentication state handling.
- Authorization state handling.
- Loading states.
- Access-denied states.
- Authentication error handling.
- Sign-out functionality.
- Input validation.

However, frontend validation and authorization must not be treated as authoritative security controls.

## 20. Direct Firebase Access

The architecture assumes that a malicious user may attempt to communicate directly with Firebase services without using the React application.

Therefore:

    Browser
       |
       +---- React Application ----+
       |                           |
       +---- Direct Firebase ------+
                                   |
                                   v
                          Firebase Security Rules

Security Rules must remain effective even when the frontend is completely bypassed.

## 21. Client Trust Model

The client is considered untrusted.

The application must assume that users can manipulate:

- JavaScript execution.
- Browser storage.
- Network requests.
- Route URLs.
- Request payloads.
- Client-side state.
- UI controls.

Security decisions must therefore be enforced using trusted backend infrastructure.

## 22. Input Validation

Administrative forms must validate user input before submitting data.

Validation should address:

- Required fields.
- Data types.
- String lengths.
- URL formats.
- File types.
- File sizes.
- Numeric values.
- Allowed states.

Client-side validation improves usability.

Security-sensitive validation must also be enforced by trusted infrastructure where applicable.

## 23. Content Validation

Portfolio content entered through the CMS should be treated as untrusted input.

The application should prevent unsafe content from being interpreted as executable code.

The system should be designed to minimize risks such as:

- Cross-site scripting.
- Unsafe HTML injection.
- Malicious URLs.
- Unexpected markup.
- Unsafe file uploads.

## 24. Rich Text Content

The initial application should avoid storing arbitrary executable HTML unless a concrete requirement exists.

Where rich text is required, the application should use a controlled representation and sanitize content before rendering.

Raw user-controlled HTML must not be rendered directly into the application without appropriate sanitization.

## 25. URL Security

URLs entered into administrative forms should be validated.

Potential URL fields include:

- LinkedIn.
- GitHub.
- Project repository URLs.
- Project live URLs.
- Other external portfolio links.

The application should restrict URL handling to expected protocols.

Untrusted values should not automatically be interpreted as executable resources.

## 26. File Upload Security

File uploads represent an additional attack surface.

The application should validate:

- File type.
- File extension.
- MIME type.
- File size.
- File name.
- Storage path.

Only file types required by the portfolio should be accepted.

The initial implementation primarily requires:

- Images.
- PDF documents.

## 27. File Name Security

Uploaded file names must not be trusted.

The application should normalize or generate safe file names.

File paths must not permit:

- Path traversal.
- Unexpected directory creation.
- Sensitive information exposure.
- Arbitrary path manipulation.

Entity-based paths should be preferred.

Example:

    projects/{projectId}/cover.webp

## 28. Storage Path Isolation

Storage paths should correspond to logical application entities.

Examples:

    profile/
    projects/{projectId}/
    experiences/{experienceId}/
    cv/
    assets/

This organization simplifies authorization and resource management.

## 29. Secret Management

Secrets must never be stored in source-controlled files.

Sensitive information includes:

- API keys that are intended to remain secret.
- Service account credentials.
- Private keys.
- Passwords.
- Authentication tokens.
- Deployment credentials.
- Database credentials.
- Third-party service secrets.

Secrets must be supplied through appropriate environment or deployment configuration.

## 30. Firebase Configuration

Firebase client configuration may contain values that are designed for client-side use.

However, privileged Firebase credentials must never be included in the frontend.

The application must clearly distinguish between:

- Public client configuration.
- Private administrative credentials.

Service account credentials must never be bundled into the React application.

## 31. Environment Variables

Environment-specific values should be managed through environment variables.

The repository should provide:

    .env.example

with safe placeholder values.

Actual local or production environment files containing private values must not be committed.

## 32. Repository Security

The Git repository is intended to become a public and reusable Open Source repository.

Therefore, repository security is a critical part of the overall security model.

The repository must never contain:

- Production secrets.
- Private API credentials.
- Service account JSON files.
- Passwords.
- Authentication tokens.
- Private certificates.
- Deployment credentials.
- Sensitive personal information.

## 33. Git Ignore Requirements

Sensitive local files should be excluded through `.gitignore`.

Examples may include:

    .env
    .env.local
    .env.*.local
    service-account*.json

The exact `.gitignore` rules should match the project's tooling and deployment requirements.

## 34. Secret Exposure Response

If a secret is accidentally committed, removing the file in a later commit is not sufficient.

The exposed credential must be considered compromised.

The appropriate response is to:

1. Revoke or rotate the credential.
2. Remove the secret from active configuration.
3. Assess whether repository history contains the secret.
4. Clean repository history if necessary.
5. Verify that the replacement credential is not committed.
6. Review access logs where appropriate.

## 35. Personal Data Protection

Only information intentionally intended for public presentation should be stored in public portfolio documents.

Private personal information should not be exposed through:

- Public Firestore documents.
- Public Storage resources.
- Client-side configuration.
- Source code.
- Public logs.

## 36. Administrator Privacy

Administrator information should be minimized.

The application does not require storing unnecessary personal information about administrators.

The authorization record should contain only information required for identity association, authorization, and administrative management.

## 37. Error Handling

Security-sensitive errors should not expose internal implementation details.

User-facing errors should avoid revealing:

- Internal database structure.
- Security Rule implementation details.
- Private resource paths.
- Authentication tokens.
- Credentials.
- Internal infrastructure details.

Detailed errors may be available through controlled development logging.

## 38. Logging

The initial application does not require a comprehensive security logging system.

However, the application should avoid logging:

- Authentication tokens.
- Credentials.
- Passwords.
- Private keys.
- Sensitive user data.

Development logs should be reviewed before production deployment.

## 39. Dependency Security

The application depends on third-party packages and Firebase services.

Dependencies should be:

- Kept reasonably current.
- Reviewed for known vulnerabilities.
- Removed when unnecessary.
- Installed from trusted sources.

The project should use the package manager's lockfile to provide reproducible dependency versions.

## 40. Dependency Minimization

The application should avoid unnecessary dependencies.

Every additional dependency increases the potential attack surface and maintenance requirements.

A dependency should be introduced when it provides meaningful value that justifies its maintenance and security cost.

## 41. XSS Protection

The application should minimize opportunities for cross-site scripting.

Requirements include:

- Avoid unnecessary `dangerouslySetInnerHTML`.
- Sanitize controlled rich text when required.
- Escape dynamic content through React's normal rendering behavior.
- Validate external URLs.
- Do not execute user-controlled scripts.
- Do not load arbitrary executable resources from user-controlled values.

## 42. CSRF Considerations

The initial architecture relies primarily on Firebase Authentication and Firebase SDK operations rather than a custom session-based backend.

The application does not implement a custom REST API requiring traditional server-side CSRF protection.

If a custom backend or cookie-based authentication mechanism is introduced later, CSRF protections must be explicitly designed.

## 43. CORS Considerations

The initial architecture does not require a custom backend API.

Firebase services handle their own communication model.

If a custom Node.js/Express backend is introduced later, its CORS configuration must be explicitly restricted to intended origins.

## 44. Content Security

The application should avoid executing arbitrary content retrieved from Firestore.

Portfolio data should be treated as content, not executable code.

The application should preserve the separation between:

    Data
      |
      v
    Presentation

and:

    Executable Code
      |
      v
    Application

## 45. Administrative UI Security

The administrative UI should not expose administrative controls to unauthorized users.

Examples include:

- Create buttons.
- Edit buttons.
- Delete buttons.
- Publish controls.
- File upload controls.
- Administrator controls.

However, hiding these controls is a usability measure rather than a security mechanism.

Backend rules must still enforce authorization.

## 46. Delete Operations

Deletion is a high-impact administrative operation.

The application should:

- Require authorization.
- Clearly identify the resource being deleted.
- Avoid accidental deletion.
- Consider associated Storage resources.
- Handle failures safely.

The initial application may use confirmation dialogs for destructive operations.

## 47. Publication Operations

Publishing and unpublishing content are administrative operations.

Only authorized administrators may change publication state.

Public users must not be able to modify:

    published

or equivalent visibility fields.

## 48. Ordering Operations

Ordering fields such as:

    order

must be protected from unauthorized modification.

Public visitors may read the resulting order but must not modify it.

## 49. Data Integrity

The application should maintain reasonable consistency between Firestore documents and Firebase Storage resources.

Examples include:

- A project media reference should correspond to an existing Storage resource.
- Deleted projects should not leave unnecessary media.
- Replaced files should not leave unnecessary obsolete resources.
- CV metadata should correspond to the intended CV file.

## 50. Availability

The application relies on Firebase-managed infrastructure for:

- Authentication.
- Firestore.
- Storage.
- Hosting.

The application should handle temporary service failures gracefully.

This includes:

- Loading states.
- Retry options where appropriate.
- User-friendly error messages.
- Avoiding destructive operations when service state is uncertain.

## 51. Secure Deployment

Production deployments must use the intended Firebase project and configuration.

Before deployment, the project should verify:

- Correct Firebase project.
- Correct Authentication configuration.
- Correct Firestore Rules.
- Correct Storage Rules.
- Correct Hosting configuration.
- Correct environment variables.
- No committed secrets.

## 52. Deployment Environment Separation

Development and production environments should not share sensitive configuration unnecessarily.

Where separate Firebase projects are used, each environment should have its own:

- Authentication configuration.
- Firestore database.
- Storage bucket.
- Security Rules.
- Hosting deployment.

The exact environment strategy is documented separately.

## 53. Firebase Security Rules Deployment

Security Rules are part of the application's security infrastructure.

Changes to Security Rules should be:

- Version-controlled.
- Reviewed.
- Tested.
- Deployed deliberately.

Security Rules should not be modified directly in production without corresponding repository documentation or synchronization.

## 54. Rule Testing

Security Rules should be tested against representative scenarios.

At minimum, testing should consider:

    Unauthenticated user
        |
        +-- Public read
        +-- Protected read
        +-- Write
        +-- Delete

    Authenticated unauthorized user
        |
        +-- Public read
        +-- Protected read
        +-- Write
        +-- Delete

    Authenticated authorized administrator
        |
        +-- Public read
        +-- Protected read
        +-- Create
        +-- Update
        +-- Delete

The final rules implementation should confirm the intended results for each case.

## 55. Security Testing

The initial project should include security verification during development.

Security testing should verify:

- Public access works as intended.
- Administrative access requires authentication.
- Administrative access requires authorization.
- Unauthorized users cannot modify Firestore.
- Unauthorized users cannot upload to Storage.
- Unauthorized users cannot delete protected resources.
- `authorizedAdmins` cannot be modified by unauthorized users.
- Unpublished data is not publicly readable.
- Secrets are not present in the repository.

## 56. Security Updates

Security-related changes should be treated as high-priority changes.

Examples include:

- Authentication configuration changes.
- Authorization changes.
- Security Rule changes.
- Dependency security updates.
- Secret rotation.
- Storage access changes.
- Firestore access changes.

These changes should be reviewed carefully before production deployment.

## 57. Open Source Security

Because the repository is intended to be publicly reusable, security must be considered during development rather than added at the end.

The public repository should allow another developer to understand:

- The security architecture.
- The authentication model.
- The authorization model.
- The Firebase Security Rules requirements.
- The secret-management strategy.
- The deployment security requirements.

The repository must not provide actual private credentials.

## 58. Security Documentation

Security-related architecture should remain documented in:

    docs/security/

The security documentation includes:

- `authentication-and-authorization.md`
- `security-model.md`
- `security-rules-requirements.md`
- `repository-security.md`

These documents should remain consistent with the actual implementation.

## 59. Security Principles

The Portfolio Platform follows these core principles:

- Never trust the client.
- Authenticate users through a trusted identity provider.
- Separate authentication from authorization.
- Enforce authorization server-side.
- Use Firebase Security Rules as the primary data security boundary.
- Fail closed.
- Apply least privilege.
- Minimize sensitive data.
- Validate untrusted input.
- Restrict file uploads.
- Protect unpublished content.
- Protect administrator authorization data.
- Never commit secrets.
- Keep dependencies controlled.
- Review destructive operations.
- Version-control security configuration.
- Test security assumptions.
- Keep the architecture reusable and safe for Open Source distribution.

## 60. Initial Security Requirements

The initial implementation must satisfy the following security requirements:

- Public portfolio content can be read without authentication when explicitly published.
- Public users cannot modify portfolio data.
- Public users cannot upload files.
- Public users cannot delete files.
- Google Sign-In is required for administrative authentication.
- Authentication does not automatically grant administrative privileges.
- Administrator access requires an authorized Firebase Authentication UID.
- Inactive administrators are denied administrative access.
- Administrative routes are protected at the application layer.
- Firestore Security Rules enforce Firestore authorization.
- Storage Security Rules enforce Storage authorization.
- `authorizedAdmins` is protected.
- Unpublished content is protected from public access.
- Client-side checks are not treated as the primary security boundary.
- Secrets are excluded from source control.
- Production credentials are not stored in the repository.
- Uploaded files are validated.
- Administrative operations fail closed when authorization cannot be established.
- Security Rules are version-controlled and tested.
- The security architecture is documented for future Open Source users.

## 61. Related Documentation

The following documents define related aspects of the security architecture:

- `docs/security/authentication-and-authorization.md` — Authentication and administrator authorization.
- `docs/security/security-rules-requirements.md` — Firestore and Storage Security Rules requirements.
- `docs/security/repository-security.md` — Repository security and secret-management requirements.
- `docs/data-model/firestore-schema.md` — Firestore data model.
- `docs/data-model/storage-structure.md` — Firebase Storage structure.
- `docs/architecture/firebase-architecture.md` — Firebase service architecture.
- `docs/architecture/system-architecture.md` — Overall system architecture.
- `docs/architecture/deployment.md` — Deployment architecture.