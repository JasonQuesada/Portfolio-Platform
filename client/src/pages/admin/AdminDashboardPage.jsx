function AdminDashboardPage() {
  return (
    <section className="admin-dashboard">
      <div className="admin-dashboard__intro">
        <p className="admin-dashboard__eyebrow">
          Overview
        </p>

        <h2 className="admin-dashboard__title">
          Welcome to your portfolio workspace
        </h2>

        <p className="admin-dashboard__description">
          Manage your portfolio content, professional experience,
          profile information, and other public-facing content from
          one place.
        </p>
      </div>

      <div className="admin-dashboard__grid">
        <article className="admin-dashboard-card">
          <p className="admin-dashboard-card__label">
            Content
          </p>

          <h3 className="admin-dashboard-card__title">
            Projects
          </h3>

          <p className="admin-dashboard-card__description">
            Your project management workspace will be available
            here.
          </p>
        </article>

        <article className="admin-dashboard-card">
          <p className="admin-dashboard-card__label">
            Experience
          </p>

          <h3 className="admin-dashboard-card__title">
            Professional experience
          </h3>

          <p className="admin-dashboard-card__description">
            Manage the experience displayed on your public
            portfolio.
          </p>
        </article>

        <article className="admin-dashboard-card">
          <p className="admin-dashboard-card__label">
            Profile
          </p>

          <h3 className="admin-dashboard-card__title">
            Portfolio profile
          </h3>

          <p className="admin-dashboard-card__description">
            Keep your public profile information up to date.
          </p>
        </article>
      </div>
    </section>
  );
}

export default AdminDashboardPage;
