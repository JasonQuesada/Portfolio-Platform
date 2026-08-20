# Firebase Storage Structure

## 1. Purpose

This document defines the Firebase Storage structure used by the Portfolio Platform.

Firebase Storage is responsible for storing binary files and media assets used by the portfolio, while Cloud Firestore stores the structured metadata and references associated with those files.

The storage structure is designed to be:

- Simple.
- Predictable.
- Secure.
- Maintainable.
- Reusable.
- Compatible with the administrative CMS.
- Suitable for future Open Source distribution.

## 2. Storage Architecture

Firebase Storage is used for files that should not be stored directly in Cloud Firestore.

The high-level relationship is:

    Firestore
        |
        +-- Metadata
        +-- Storage references
        |
        v
    Firebase Storage
        |
        +-- Images
        +-- CV
        +-- Portfolio media

Firestore remains the source of truth for structured application data.

Firebase Storage remains the source of truth for uploaded binary files.

## 3. Storage Root

The initial storage structure uses logical directories under the Firebase Storage bucket root.

The proposed structure is:

    /
    |
    +-- profile/
    |
    +-- projects/
    |
    +-- experiences/
    |
    +-- cv/
    |
    +-- assets/

The structure should remain simple and should only introduce additional directories when a concrete requirement exists.

## 4. Profile Storage

Profile-related media is stored under:

    profile/

Possible structure:

    profile/
        profile-image.webp

The profile image is referenced by the corresponding Firestore profile document.

For example:

    profile/main
        |
        +-- profileImage
                |
                +-- profile/profile-image.webp

The exact file name may vary depending on the implementation.

## 5. Project Storage

Project-specific media is stored under:

    projects/{projectId}/

Example:

    projects/
        finnova-platform/
            cover.webp
            dashboard.webp
            architecture.webp

Each project can therefore maintain its own isolated media directory.

The associated Firestore document contains references to the relevant Storage paths.

## 6. Experience Storage

Experience-related media is stored under:

    experiences/{experienceId}/

Example:

    experiences/
        business-systems-analyst/
            cover.webp
            workflow.webp

Experience media should only be introduced when it provides meaningful value to the portfolio.

The application should not create unnecessary media structures for experiences that do not use media.

## 7. CV Storage

CV files are stored under:

    cv/

Example:

    cv/
        resume.pdf

The CV should be treated as a managed portfolio asset.

The Firestore configuration may contain metadata such as:

    settings/cv
        |
        +-- fileName
        +-- storagePath
        +-- mimeType
        +-- published
        +-- updatedAt

The binary CV file itself remains in Firebase Storage.

## 8. General Assets

Shared assets that do not belong to a specific portfolio entity may be stored under:

    assets/

Examples may include:

- General site images.
- Shared visual assets.
- CMS-managed resources.
- Other reusable portfolio media.

The `assets/` directory should not become a general-purpose file dump.

Entity-specific files should remain in their corresponding entity directories.

## 9. File Ownership Model

Files follow the same ownership model as the structured portfolio data.

Public visitors may access files that are intentionally published as public portfolio content.

Authorized administrators may upload, update, replace, and delete managed portfolio files.

Unauthenticated users must not be allowed to upload or modify files.

Authentication alone does not automatically grant administrative Storage access.

Firebase Security Rules must verify administrator authorization.

## 10. Public Read Access

Public read access should be limited to files intentionally used by the public portfolio.

Examples include:

- Published profile image.
- Published project images.
- Published experience media.
- Published CV.
- Other explicitly public portfolio assets.

Files that are administrative, unpublished, temporary, or otherwise private must not be publicly readable.

## 11. Administrative Write Access

Only authorized administrators may perform Storage write operations.

Administrative operations include:

- Upload.
- Replace.
- Update metadata.
- Delete.

The Storage Security Rules must enforce these restrictions.

The frontend must never be considered the actual security boundary.

## 12. Storage Security

Firebase Storage Security Rules should enforce access based on the authenticated Firebase user and the administrator authorization model.

The conceptual model is:

    Request
       |
       v
    Firebase Authentication
       |
       v
    Authenticated?
       |
       +---- No ----> Deny protected operation
       |
       v
    Authorized Administrator?
       |
       +---- No ----> Deny write operation
       |
       +---- Yes ---> Allow according to path rules

Public reads should only be allowed for intentionally public resources.

## 13. Path-Based Organization

Storage paths should provide a predictable relationship between files and their associated application entities.

For example:

    projects/{projectId}/cover.webp

corresponds conceptually to:

    projects/{projectId}

in Firestore.

Similarly:

    experiences/{experienceId}/cover.webp

corresponds to:

    experiences/{experienceId}

This relationship simplifies content management and resource cleanup.

## 14. File Naming

File names should be predictable and safe.

Recommended characteristics include:

- Lowercase names where practical.
- Hyphen-separated words.
- No unnecessary spaces.
- No sensitive information.
- No user-controlled path traversal patterns.
- Appropriate file extensions.

Examples:

    profile-image.webp
    cover.webp
    dashboard.webp
    resume.pdf

The application should sanitize or normalize user-provided file names before storing files.

## 15. File IDs and Collision Avoidance

The application should avoid relying exclusively on original uploaded file names.

Two uploads may have the same original name.

The implementation may therefore use:

- Entity identifiers.
- Generated identifiers.
- Controlled file names.
- Version identifiers where required.

For example:

    projects/project-123/cover.webp

is preferable to placing every uploaded image directly at:

    cover.webp

at the bucket root.

## 16. Supported File Types

The initial application should restrict uploads to file types required by the portfolio.

Expected categories include:

### Images

Potential supported formats:

- WebP.
- JPEG.
- PNG.
- SVG where safely supported.

### Documents

Expected format:

- PDF.

Additional formats should not be enabled without a concrete requirement.

## 17. File Size Restrictions

The administrative application should enforce reasonable file-size limits.

Limits should be defined based on the purpose of the file.

For example:

- Profile images should remain optimized for web delivery.
- Project images should be optimized for web delivery.
- Experience images should be optimized for web delivery.
- CV files should remain reasonably sized for visitor downloads.

The exact maximum values should be defined during implementation and documented alongside the Firebase Storage Security Rules.

Client-side file-size validation improves user experience but must not replace server-side or Storage-level controls where applicable.

## 18. Image Optimization

Images should be optimized before or during upload when practical.

Recommended practices include:

- Prefer WebP for web images where supported.
- Resize unnecessarily large images.
- Avoid uploading original high-resolution images when a smaller version is sufficient.
- Preserve adequate quality for professional presentation.
- Use descriptive alternative text in Firestore metadata rather than embedding accessibility information in the file name.

The application should avoid storing multiple image variants unless responsive delivery requirements justify them.

## 19. CV Management

The CV is a special managed asset.

The system should support:

- Uploading a CV.
- Replacing an existing CV.
- Publishing the selected CV.
- Updating CV metadata.
- Providing the public CV link.

The public interface should expose only the CV intended for public access.

Old CV files should be removed or retained according to the defined content-management strategy.

The initial version does not require a full CV version-history system.

## 20. Media Metadata

Firestore should contain metadata needed to use Storage files correctly.

Possible metadata includes:

    {
      path,
      fileName,
      mimeType,
      type,
      alt
    }

Depending on the implementation, additional metadata may include:

- File size.
- Upload timestamp.
- Associated entity.
- Publication state.

Storage metadata and Firestore metadata should not unnecessarily duplicate the same information.

## 21. Storage References

Firestore records should reference Storage files through their Storage path or another stable identifier.

Example:

    profile/main
        |
        +-- profileImage:
              "profile/profile-image.webp"

Example:

    projects/{projectId}
        |
        +-- image:
              "projects/{projectId}/cover.webp"

The implementation should use a consistent reference format.

## 22. Download URLs

The application may resolve Storage paths into downloadable or displayable URLs when required.

Long-lived public URLs should not be hard-coded into reusable application components.

The application should derive file access from the configured Firebase Storage resource.

Where public access is intended, the access model must remain compatible with Firebase Security Rules.

## 23. Public vs Private Files

The Storage architecture distinguishes between:

    Public Portfolio Files
        |
        +-- Profile image
        +-- Published project media
        +-- Published experience media
        +-- Published CV
        +-- Other intentionally public assets

and:

    Protected Files
        |
        +-- Unpublished media
        +-- Administrative files
        +-- Temporary files
        +-- Future private resources

Protected files must not be publicly accessible.

## 24. Unpublished Media

Media associated with an unpublished portfolio entity should not automatically become publicly accessible.

For example:

    projects/project-123/cover.webp

may exist in Storage while:

    projects/project-123
        published = false

The public application must not expose the unpublished resource.

Storage Security Rules and application-level content handling must work together to enforce the intended access model.

## 25. Relationship with Firestore Publication State

Firestore publication state determines whether a portfolio entity is intended for public presentation.

Storage access should follow the application's publication and security model.

The frontend should never assume that hiding an image is sufficient protection.

A hidden image URL must not be treated as secure if the underlying Storage resource remains publicly readable.

## 26. Media Deletion

When a portfolio entity is deleted, associated Storage resources should be considered for deletion.

For example:

    Delete Project
        |
        +-- Delete Firestore project document
        |
        +-- Delete project media
              |
              +-- cover.webp
              +-- dashboard.webp
              +-- architecture.webp

The exact implementation may perform these operations through a controlled application workflow.

The system should avoid leaving unnecessary orphaned files.

## 27. Orphaned Files

An orphaned file is a Storage object that no longer has a valid relationship with an active Firestore record.

Examples include:

- Project images for deleted projects.
- Profile images no longer referenced.
- Replaced CV files.
- Media uploaded during an abandoned CMS operation.

The application should minimize orphaned files through controlled upload and deletion workflows.

A future maintenance process may be introduced if automated cleanup becomes necessary.

## 28. Replacement Strategy

When replacing an existing file, the application should avoid breaking the public portfolio during the update.

A safe conceptual workflow is:

    Upload New File
          |
          v
    Validate File
          |
          v
    Update Firestore Reference
          |
          v
    Confirm New Resource
          |
          v
    Remove Old File

The exact order may vary based on implementation details, but the system should avoid deleting the old resource before the new resource is safely available.

## 29. Temporary Uploads

The initial architecture does not require a dedicated temporary upload system.

If temporary uploads are introduced later, they should use a clearly isolated path such as:

    temporary/

or:

    uploads/tmp/

Temporary files should have a defined cleanup strategy.

They must not become publicly accessible by default.

## 30. Storage Metadata

Firebase Storage metadata may contain technical file information such as:

- Content type.
- Cache control.
- Content disposition.
- File size.
- Upload metadata.

The application should use appropriate metadata for efficient public delivery.

Technical Storage metadata should not be confused with application-level Firestore metadata.

## 31. Cache Strategy

Publicly served static assets may use appropriate browser and CDN caching.

However, caching should be considered carefully for frequently replaced assets such as:

- Profile images.
- CV files.
- Project images.

If predictable replacement behavior is required, versioned file names or controlled cache headers may be used.

The initial implementation should avoid unnecessarily complex cache invalidation mechanisms.

## 32. Security and Sensitive Information

Storage must never contain:

- API keys.
- Firebase service account credentials.
- Private keys.
- Passwords.
- Authentication tokens.
- Database credentials.
- Environment files.
- Other application secrets.

The Storage bucket is part of the application's infrastructure and must not be used as a secret-management system.

## 33. Repository Security

Storage configuration must not cause sensitive Firebase credentials to be committed to Git.

The repository may contain:

- Firebase configuration templates.
- Example environment variables.
- Storage path documentation.
- Security Rules.
- Deployment configuration that contains no secrets.

The repository must not contain:

- Service account JSON files.
- Private credentials.
- Production secrets.
- Authentication tokens.
- Private deployment credentials.

## 34. Open Source Reusability

The Storage structure must work for another developer deploying the Portfolio Platform.

Another deployment should be able to create:

    profile/
    projects/
    experiences/
    cv/
    assets/

inside its own Firebase Storage bucket.

No original personal Storage paths should be required by the reusable application.

Personal content should be configurable through Firestore and Storage rather than hard-coded into the source code.

## 35. Initial Storage Structure

The initial recommended structure is:

    Firebase Storage
    |
    +-- profile/
    |     |
    |     +-- profile-image.webp
    |
    +-- projects/
    |     |
    |     +-- {projectId}/
    |           |
    |           +-- cover.webp
    |           +-- additional-media.*
    |
    +-- experiences/
    |     |
    |     +-- {experienceId}/
    |           |
    |           +-- cover.webp
    |           +-- additional-media.*
    |
    +-- cv/
    |     |
    |     +-- resume.pdf
    |
    +-- assets/
          |
          +-- shared-assets.*

## 36. Storage Path Rules

The following logical rules apply:

- Entity-specific media must be stored under the corresponding entity directory.
- Shared assets belong under `assets/`.
- CV files belong under `cv/`.
- Profile media belongs under `profile/`.
- Project media belongs under `projects/{projectId}/`.
- Experience media belongs under `experiences/{experienceId}/`.
- Protected resources must not be publicly readable.
- Only authorized administrators may write protected resources.
- File paths must not contain secrets or sensitive personal information.
- Uploaded file names must be normalized and validated.
- Unnecessary files should not remain in Storage indefinitely.

## 37. Initial Scope

The initial Storage implementation supports:

- Profile image management.
- Project image management.
- Optional experience media.
- CV management.
- Shared portfolio assets.

The system does not initially require:

- User-generated uploads.
- Visitor uploads.
- Profile galleries.
- Video hosting.
- Audio hosting.
- Document management beyond the CV.
- File sharing between users.
- Private user storage.
- Multi-tenant storage isolation.

These features are outside the initial project scope.

## 38. Future Expansion

The Storage architecture can be extended if future requirements introduce additional media types.

Potential future categories include:

- Video.
- Audio.
- Additional documents.
- Case-study assets.
- Downloadable project files.

Any new category should receive:

- A defined Storage path.
- File type restrictions.
- File size restrictions.
- Security Rules.
- Lifecycle rules.
- Metadata requirements.
- Documentation.

## 39. Storage Principles

The Firebase Storage architecture follows these principles:

- Store binary files in Firebase Storage.
- Store structured metadata in Firestore.
- Keep paths predictable.
- Associate files with their logical entities.
- Restrict write access to authorized administrators.
- Do not treat frontend visibility as security.
- Keep unpublished resources protected.
- Validate uploaded files.
- Avoid unnecessary file duplication.
- Minimize orphaned resources.
- Use appropriate image optimization.
- Keep the CV independently manageable.
- Never store secrets in Storage.
- Keep the structure reusable for Open Source deployments.
- Avoid unnecessary complexity.

## 40. Related Documentation

The following documents define related aspects of the system:

- `docs/data-model/data-model-overview.md` — High-level data model.
- `docs/data-model/firestore-schema.md` — Firestore collections and schema.
- `docs/security/authentication-and-authorization.md` — Authentication and authorization.
- `docs/security/security-model.md` — Overall security model.
- `docs/security/security-rules-requirements.md` — Firebase Security Rules requirements.
- `docs/security/repository-security.md` — Repository and secret-management requirements.
- `docs/architecture/firebase-architecture.md` — Firebase service architecture.
- `docs/architecture/deployment.md` — Deployment architecture.