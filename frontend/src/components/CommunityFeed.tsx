export default function CommunityFeed() {
  return (
    <div className="white-card">

      <div className="flex justify-between items-center mb-7">

        <h2 className="section-title">
          Community Feed
        </h2>

        <button className="text-indigo-600 font-semibold">
          View All
        </button>

      </div>

      <div className="empty-state">

        <div className="empty-icon">
          💬
        </div>

        <h3>

          No community posts yet

        </h3>

        <p>

          Residents will soon be able to share updates,
          recommendations and neighbourhood news.

        </p>

      </div>

    </div>
  );
}