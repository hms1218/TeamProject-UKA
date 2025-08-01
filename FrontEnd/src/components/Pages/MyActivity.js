import MyPosts from './MyPosts';

const MyActivity = () => (
    <div className="content-section">
        <div className="section-header">
            <h2>활동 내역</h2>
            <p>작성한 글, 댓글, 좋아요 내역을 확인하세요</p>
        </div>
        <div className="activity-lists">
            <MyPosts />
            {/* 앞으로 MyComments, MyLikes 등 분리 가능 */}
        </div>
    </div>
);

export default MyActivity;