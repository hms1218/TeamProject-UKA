import React from 'react';

const MyActivity = () => (
    <div className="content-section">
        <div className="section-header">
            <h2>활동 내역</h2>
            <p>작성한 글, 댓글, 좋아요 내역을 확인하세요</p>
        </div>
        <div className="activity-lists">
            <div className="activity-list-section">
                <h3>📝 내가 작성한 글 (24개)</h3>
                <div className="post-list">
                    {[
                        { title: 'React Hook 사용법에 대한 정리', date: '2024-07-30', views: 156, likes: 12 },
                        { title: '자바스크립트 ES6 새로운 기능들', date: '2024-07-28', views: 203, likes: 18 },
                    ].map((post, index) => (
                        <div key={index} className="list-item post-item">
                            <div className="item-content">
                                <h4 className="item-title">{post.title}</h4>
                                <div className="item-meta">
                                    <span className="item-date">{post.date}</span>
                                    <span className="item-stats">조회 {post.views} · 좋아요 {post.likes}</span>
                                </div>
                            </div>
                            <div className="item-action">
                                <button className="view-btn">보기</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="activity-list-section">
                <h3>💬 내가 작성한 댓글 (87개)</h3>
                <div className="comment-list">
                    {[
                        { content: '정말 유용한 정보네요! 감사합니다.', post: 'Python 기초 문법 정리', date: '2024-07-30' },
                        { content: '저도 비슷한 경험이 있어서 공감됩니다. 좋은 글 잘 읽었습니다.', post: '프론트엔드 개발자 취업 후기', date: '2024-07-29' },
                    ].map((comment, index) => (
                        <div key={index} className="list-item comment-item">
                            <div className="item-content">
                                <p className="comment-text">"{comment.content}"</p>
                                <div className="item-meta">
                                    <span className="comment-post">게시글: {comment.post}</span>
                                    <span className="item-date">{comment.date}</span>
                                </div>
                            </div>
                            <div className="item-action">
                                <button className="view-btn">보기</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="activity-list-section">
                <h3>❤️ 좋아요 누른 게시물 (152개)</h3>
                <div className="liked-list">
                    {[
                        { title: 'Vue.js 3.0의 새로운 기능들', author: '개발자김씨', date: '2024-07-30', likes: 45 },
                        { title: '효율적인 코드 리뷰 방법', author: '시니어개발자', date: '2024-07-29', likes: 62 },
                    ].map((liked, index) => (
                        <div key={index} className="list-item liked-item">
                            <div className="item-content">
                                <h4 className="item-title">{liked.title}</h4>
                                <div className="item-meta">
                                    <span className="item-author">작성자: {liked.author}</span>
                                    <span className="item-date">{liked.date}</span>
                                    <span className="item-likes">좋아요 {liked.likes}</span>
                                </div>
                            </div>
                            <div className="item-action">
                                <button className="unlike-btn">❤️</button>
                                <button className="view-btn">보기</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default MyActivity;
