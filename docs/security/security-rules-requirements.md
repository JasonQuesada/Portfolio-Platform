# Security Rules Requirements

## 1. Purpose

This document defines the security requirements for Firebase Firestore Security Rules and Firebase Storage Security Rules used by the Portfolio Platform.

The rules are responsible for enforcing access control at the Firebase infrastructure layer.

The frontend must never be considered the primary security boundary.

## 2. Security Rule Objectives

The Security Rules must:

- Prevent unauthorized access to protected Firestore data.
- Prevent unauthorized modification of portfolio data.
- Prevent unauthorized deletion of portfolio data.
- Prevent unauthorized uploads to Firebase Storage.
- Prevent unauthorized modification of Storage resources.
- Prevent unauthorized deletion of Storage resources.
- Protect unpublished content.
- Protect administrator authorization records.
- Allow intentional public access to published content.
- Enforce administrator authorization independently from frontend state.
- Fail closed when authorization cannot be established.

## 3. Primary Security Boundary

Firebase Security Rules are the authoritative access-control mechanism for Firestore and Storage.

The following must never be treated as sufficient authorization:

- React route protection.
- React state.
- Context providers.
- Hidden navigation items.
- Hidden buttons.
- Client-side role variables.
- Local Storage values.
- URL parameters.
- Frontend-only validation.

A client can bypass the React application and communicate directly with Firebase.

Therefore, Security Rules must independently validate every protected operation.

## 4. Authentication Requirement

Protected Firestore and Storage operations must require an authenticated Firebase user.

Conceptually:

    request.auth != null

must be required for protected operations.

Unauthenticated requests must be denied unless the specific resource is intentionally public.

## 5. Authorization Requirement

Authentication alone must not grant administrative access.

An authenticated user must also be verified as an authorized administrator.

The authorization model is based on:

    authorizedAdmins

The authenticated user's Firebase UID is the canonical identity used for authorization.

Conceptually:

    request.auth.uid
          |
          v
    authorizedAdmins/{uid}
          |
          v
    active == true

Only users satisfying the authorization requirements may perform protected administrative operations.

## 6. Fail-Closed Requirement

Rules must deny access whenever authorization cannot be established.

Examples include:

- Missing authentication.
- Missing administrator record.
- Inactive administrator record.
- Invalid authorization state.
- Unexpected document state.
- Unsupported operation.

The absence of an explicit allow condition must result in denial.

## 7. Public Firestore Reads

Public visitors must be able to read Firestore documents that are intentionally published for public presentation.

Examples include:

- Published profile.
- Published skills.
- Published experiences.
- Published projects.
- Published education.
- Public site configuration.

Public access should be restricted to documents that are explicitly intended to be public.

## 8. Public Firestore Writes

Public users must never be allowed to create, update, or delete portfolio content.

Conceptually:

    Public User
        |
        +-- read published data ----> Allowed
        |
        +-- create -----------------> Denied
        |
        +-- update -----------------> Denied
        |
        +-- delete -----------------> Denied

## 9. Publication State

Where portfolio collections contain both published and unpublished documents, public read access must be restricted by publication state.

Conceptually:

    published == true

allows public presentation.

    published == false

must not be publicly readable.

The exact implementation may use collection-level or document-level rules depending on the final schema.

## 10. Administrative Firestore Reads

Authorized administrators may read portfolio data required to manage the platform.

This may include:

- Published documents.
- Draft documents.
- Unpublished documents.
- Administrative configuration.
- Ordering information.
- Content metadata.

Access must require administrator authorization.

## 11. Administrative Firestore Writes

Authorized administrators may perform the portfolio-management operations defined by the application.

These include:

- Create.
- Update.
- Publish.
- Unpublish.
- Reorder.
- Delete.

All such operations must require:

- Authentication.
- Administrator authorization.
- Any additional resource-specific validation required by the final schema.

## 12. Administrator Authorization Records

The `authorizedAdmins` collection is security-sensitive.

Public users must not be able to:

- Read administrator records.
- Create administrator records.
- Update administrator records.
- Delete administrator records.

Authenticated users who are not authorized administrators must also be denied access.

The application must prevent users from modifying their own authorization status.

## 13. Authorization Escalation Prevention

The rules must prevent privilege escalation.

The following sequence must never be permitted:

    Authenticate
        |
        v
    Write authorizedAdmins/{ownUid}
        |
        v
    Set active = true
        |
        v
    Gain administrator access

Administrator authorization must originate from a trusted process.

## 14. Circular Authorization Prevention

The authorization implementation must avoid a circular dependency in which access to the authorization collection depends on authorization that can itself be granted through that collection.

The initial administrator bootstrap process must therefore be controlled outside ordinary public client operations.

## 15. Authorized Administrator State

The authorization record should contain an active state.

Conceptually:

    {
      uid: "...",
      active: true
    }

The Security Rules should treat an inactive administrator as unauthorized.

Conceptually:

    active == true

is required for administrative access.

## 16. UID-Based Authorization

Authorization must use the Firebase Authentication UID as the primary identity reference.

The rules should not rely exclusively on:

- Email address.
- Display name.
- Username.
- Client-provided administrator flag.

The UID provides the canonical connection between Firebase Authentication and the administrator authorization record.

## 17. Email-Based Authorization

Email addresses may be stored for informational or administrative purposes.

However, email should not be the sole authorization mechanism unless a future architecture explicitly requires and secures that approach.

UID-based authorization is the preferred model.

## 18. Firestore Collection Structure

The Security Rules should be designed around the final Firestore schema.

The initial logical collections may include:

    authorizedAdmins
    profile
    skills
    experiences
    projects
    education
    settings

Additional collections may be introduced during implementation.

Every collection must have an explicitly defined access policy.

## 19. Collection Access Matrix

The intended initial access model is:

| Resource | Public Read | Public Write | Authorized Admin Read | Authorized Admin Write |
|---|---:|---:|---:|---:|
| `authorizedAdmins` | No | No | Restricted | Restricted |
| `profile` | Published only | No | Yes | Yes |
| `skills` | Published only | No | Yes | Yes |
| `experiences` | Published only | No | Yes | Yes |
| `projects` | Published only | No | Yes | Yes |
| `education` | Published only | No | Yes | Yes |
| `settings` | Only explicitly public data | No | Yes | Yes |

The final rules must reflect the implemented schema.

## 20. Unknown Collections

New Firestore collections must not automatically inherit public access.

The default security posture should be deny-by-default.

A newly introduced collection should receive explicit rules before it is used in production.

## 21. Document-Level Validation

Where appropriate, Security Rules should validate fields being written.

Potential validation requirements include:

- Required fields exist.
- Field types are correct.
- Restricted fields cannot be modified by unauthorized users.
- Publication state is controlled.
- Ownership or identity fields cannot be forged.
- Administrative metadata cannot be manipulated by public users.

The exact validation should correspond to the final Firestore schema.

## 22. Restricted Fields

Security-sensitive fields must not be freely controlled by untrusted clients.

Examples include:

- `uid`.
- `active`.
- Administrative authorization fields.
- Internal ownership fields.
- Security-related configuration.
- System timestamps where server-generated values are required.

If a field determines authorization, users must not be able to manipulate it to obtain additional privileges.

## 23. Publication Field Protection

The `published` field is security-sensitive when it determines public visibility.

Public users must not modify it.

Unauthorized authenticated users must not modify it.

Only authorized administrators may change publication state.

## 24. Ordering Field Protection

Fields used to control public content ordering must be protected from unauthorized writes.

Examples include:

    order
    position
    sortOrder

Only authorized administrators should be able to change these values.

## 25. Timestamp Protection

System-managed timestamps should be protected from arbitrary client manipulation where practical.

Examples include:

    createdAt
    updatedAt

The implementation should prefer server-generated timestamps and appropriate validation.

## 26. Delete Protection

Delete operations must require administrator authorization.

Public users must not be able to delete documents.

Authenticated but unauthorized users must not be able to delete documents.

Administrative deletion should remain subject to the application's intended resource model.

## 27. Batch and Bulk Operations

Security Rules must apply to individual operations within Firestore batch writes and transactions.

The application must not assume that using a batch operation bypasses individual document authorization.

Every affected document must satisfy the applicable Security Rules.

## 28. Query Security

Public queries must be compatible with the Security Rules.

If public access is restricted to:

    published == true

the application's public queries should retrieve documents using the corresponding constraints.

Security Rules must not be weakened merely because the frontend query is expected to filter results.

## 29. Protected Queries

Administrative queries may access unpublished and administrative content only when the requesting user satisfies the administrator authorization requirements.

The rules must ensure that a query cannot expose documents that the requesting user is not authorized to read.

## 30. Storage Security

Firebase Storage Security Rules must provide equivalent protection for binary resources.

The intended model is:

    Public
       |
       +-- Read intentionally public files
       |
       +-- Write ------------> Denied
       +-- Update -----------> Denied
       +-- Delete -----------> Denied

    Authorized Administrator
       |
       +-- Read -------------> Allowed
       +-- Write ------------> Allowed
       +-- Update -----------> Allowed
       +-- Delete -----------> Allowed

The exact access level may vary by Storage path.

## 31. Public Storage Reads

Public files may be readable without authentication when they are intentionally exposed by the public portfolio.

Examples include:

- Public profile image.
- Published project images.
- Published experience images.
- Public CV.

Files that are not intended for public presentation must not be publicly readable.

## 32. Public Storage Writes

Public users must not upload files to the application's Storage bucket.

Unauthenticated uploads must be denied.

Authenticated but unauthorized uploads must also be denied.

## 33. Public Storage Updates

Public users must not modify existing Storage resources.

Only authorized administrators may replace or update protected portfolio files.

## 34. Public Storage Deletes

Public users must not delete Storage resources.

Authenticated but unauthorized users must also be denied deletion.

## 35. Storage Path Structure

The Storage rules should correspond to the documented Storage structure.

Initial logical paths include:

    profile/
    projects/{projectId}/
    experiences/{experienceId}/
    education/{educationId}/
    cv/
    assets/

The final implementation may adjust these paths.

Every path must have an explicit access policy.

## 36. Storage Path Isolation

Storage access must be restricted according to the resource path.

A user must not be able to manipulate a path to access another protected resource.

Path parameters must not be treated as authorization by themselves.

## 37. File Type Restrictions

Storage Security Rules should validate file metadata where practical.

Expected file categories include:

- Images.
- PDF documents.

The exact allowed MIME types should be defined by the implementation.

Examples may include:

    image/jpeg
    image/png
    image/webp
    application/pdf

Unsupported file types should be rejected.

## 38. File Size Restrictions

Storage uploads should have maximum file-size limits appropriate to the application.

The exact limits should be established during implementation.

The purpose is to reduce:

- Accidental oversized uploads.
- Storage abuse.
- Resource exhaustion.
- Unnecessary infrastructure costs.

## 39. File Metadata Validation

Where supported and appropriate, Storage Security Rules should validate:

- Content type.
- File size.
- Path.
- Authentication state.
- Administrator authorization.

Client-provided metadata must not be blindly trusted.

## 40. File Name Handling

The application should avoid relying on arbitrary client-controlled file names.

Files should preferably use generated or normalized names.

Examples:

    profile/main.webp
    projects/{projectId}/cover.webp
    projects/{projectId}/gallery/{assetId}.webp

This reduces path manipulation risks and provides predictable Storage organization.

## 41. Storage Ownership

The initial system does not require per-user Storage ownership.

The application is a single portfolio instance.

Authorization is based on administrator status rather than individual resource ownership.

Future multi-user or multi-tenant functionality would require a new authorization model.

## 42. Cross-Resource Authorization

Firestore and Storage permissions should remain logically consistent.

For example:

    Firestore
    projects/{projectId}
          |
          v
    Storage
    projects/{projectId}/...

The application should ensure that an administrator managing a project can manage its associated media.

Public Storage access should correspond to the publication policy of the associated content where applicable.

## 43. Orphaned Storage Resources

Security Rules cannot guarantee application-level cleanup of orphaned files.

The application should therefore handle Storage cleanup when resources are deleted or replaced.

Security Rules must still prevent unauthorized deletion.

## 44. Administrator Management

The initial Security Rules should not expose administrator-management functionality to ordinary administrators unless explicitly designed.

If administrator management is introduced, it must include:

- Explicit authorization.
- Privilege boundaries.
- Protection against self-escalation.
- Protection against unauthorized administrator creation.
- Protection against unauthorized administrator deletion.
- Appropriate auditing.

## 45. No Role Claims by Default

The initial authorization model does not require custom Firebase Authentication claims.

The preferred initial model is based on the `authorizedAdmins` Firestore collection.

If custom claims are introduced later, the authorization architecture and Security Rules requirements must be updated.

## 46. Client-Controlled Authorization Data

Security Rules must never trust authorization values supplied directly by the client.

Examples of values that must not independently grant access:

    isAdmin: true
    role: "admin"
    authorized: true
    active: true

The authoritative authorization state must come from trusted Firebase data or another trusted authorization mechanism.

## 47. Authentication State vs Authorization State

Security Rules should distinguish between:

    request.auth == null

and:

    request.auth != null

An authenticated user is not necessarily authorized.

The rules must require the appropriate authorization condition for protected operations.

## 48. Unauthenticated Access

The rules must explicitly define which resources permit unauthenticated reads.

All other operations should be denied.

The application should not rely on Firebase's default behavior or assumptions about access.

## 49. Default Deny

The overall Security Rules architecture should follow:

    Deny by default.

Access should be granted only where a specific requirement permits it.

This is particularly important for:

- New collections.
- New Storage paths.
- Administrative resources.
- Future application features.

## 50. Rule Maintenance

Security Rules must be maintained alongside the application source code.

Rule changes should be committed to Git.

Security Rule modifications should use the same professional Git workflow as other architectural changes.

Examples include:

    feature/
    fix/
    security/

depending on the nature of the change.

## 51. Rule Review

Security Rule changes should be reviewed before being merged into the main development branch.

Review should verify:

- Authentication requirements.
- Authorization requirements.
- Public access requirements.
- Write restrictions.
- Delete restrictions.
- Publication rules.
- Administrator protection.
- Storage restrictions.
- Potential privilege escalation.

## 52. Rule Testing

Security Rules should be tested before production deployment.

Tests should include at minimum:

    Unauthenticated
        |
        +-- Public read
        +-- Protected read
        +-- Create
        +-- Update
        +-- Delete

    Authenticated unauthorized
        |
        +-- Public read
        +-- Protected read
        +-- Create
        +-- Update
        +-- Delete

    Authenticated authorized administrator
        |
        +-- Public read
        +-- Protected read
        +-- Create
        +-- Update
        +-- Delete

## 53. Security Rule Emulator

Where practical, Firebase Emulator Suite should be used to test Firestore and Storage Security Rules locally.

The emulator allows security behavior to be tested without modifying production data.

The exact testing setup may be defined during implementation.

## 54. Production Rule Deployment

Security Rules must be deployed deliberately to the intended Firebase project.

Before deployment, verify:

- Correct Firebase project.
- Correct environment.
- Correct Firestore rules.
- Correct Storage rules.
- Correct administrator configuration.

Production rules must not be replaced accidentally by development rules.

## 55. Rule Synchronization

The repository should remain the source of truth for Security Rules configuration.

Changes made directly in the Firebase Console should be synchronized back into the repository or avoided when possible.

The goal is to prevent configuration drift.

## 56. Security Rule Rollback

Security Rule changes should be recoverable through Git history.

If a rule deployment causes unintended access behavior, the previous known-good version should be identifiable and deployable.

## 57. Sensitive Rule Information

Security Rules themselves are part of the public application's infrastructure when the repository is public.

Rules should therefore not contain:

- Passwords.
- API secrets.
- Private keys.
- Service credentials.
- Sensitive personal information.

Rules should rely on Firebase security primitives rather than embedded secrets.

## 58. Repository Relationship

Security Rules are part of the Open Source architecture.

The repository should contain the rule source files required to reproduce the application's intended Firebase access model.

Actual privileged deployment credentials must remain outside the repository.

## 59. Security Rule Performance

Rules should be designed to avoid unnecessary complexity.

Authorization checks should be structured efficiently and consistently.

Repeated or unnecessarily expensive rule lookups should be avoided where practical.

The final implementation should consider Firebase Security Rules evaluation and service limitations.

## 60. Rule Documentation

Each major collection and Storage path should have a documented access policy.

The documentation should make it possible to answer:

- Who can read this resource?
- Who can create it?
- Who can update it?
- Who can delete it?
- What makes the resource public?
- What authorization is required?
- Which fields require protection?

## 61. Initial Firestore Access Requirements

The initial implementation must satisfy:

- Public users can read intentionally published portfolio content.
- Public users cannot write portfolio content.
- Public users cannot delete portfolio content.
- Unauthorized authenticated users cannot write portfolio content.
- Unauthorized authenticated users cannot delete portfolio content.
- Authorized administrators can manage portfolio content.
- Unpublished content is protected.
- Authorization records are protected.
- Security-sensitive fields cannot be manipulated to gain privileges.
- Unknown collections default to denied access.

## 62. Initial Storage Access Requirements

The initial implementation must satisfy:

- Public users can read intentionally public files.
- Public users cannot upload files.
- Public users cannot modify files.
- Public users cannot delete files.
- Unauthorized authenticated users cannot upload files.
- Unauthorized authenticated users cannot modify files.
- Unauthorized authenticated users cannot delete files.
- Authorized administrators can manage required portfolio files.
- File types are restricted.
- File sizes are restricted.
- Storage paths are protected against unauthorized resource access.

## 63. Security Rule Acceptance Criteria

The Security Rules implementation is considered acceptable when:

- Unauthenticated users cannot access protected data.
- Authenticated but unauthorized users cannot access protected data.
- Authorized administrators can perform required CMS operations.
- Public users can access intentionally published content.
- Public users cannot modify published content.
- Unpublished content is not exposed publicly.
- `authorizedAdmins` cannot be modified by unauthorized clients.
- Administrator privilege escalation is prevented.
- Unauthorized Storage uploads are rejected.
- Unauthorized Storage deletions are rejected.
- Required file validation is enforced.
- Rules are version-controlled.
- Rules are tested before production deployment.
- The system fails closed when authorization cannot be established.

## 64. Related Documentation

The following documents define related security requirements:

- `docs/security/authentication-and-authorization.md` — Authentication and administrator authorization.
- `docs/security/security-model.md` — Overall security model.
- `docs/security/repository-security.md` — Repository security and secret-management requirements.
- `docs/data-model/firestore-schema.md` — Firestore schema and collection structure.
- `docs/data-model/storage-structure.md` — Firebase Storage structure.
- `docs/architecture/firebase-architecture.md` — Firebase service architecture.
- `docs/architecture/deployment.md` — Deployment architecture.