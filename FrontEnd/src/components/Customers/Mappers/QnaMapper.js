const MapQnaRaw = (raw) => {
  return {
    id: raw.qnaNo,
    title: raw.qnaTitle,
    content: raw.qnaContent,
    author: raw.qnaWriter,
    answer: raw.qnaAnswer,
    answerWriter: raw.qnaAnswerWriter,
    isSecret: raw.qnaIsSecret === "Y",
    password: raw.qnaPassword,
    isReported: raw.qnaIsReported === "Y",
    isAnswered: raw.qnaIsAnswered === "Y",
    createdAt: raw.qnaCreatedAt,
    updatedAt: raw.qnaUpdatedAt,
    views: raw.qnaViews ?? 0, // 주석
    likes: raw.qnaLikes ?? 0,
    comments: raw.qnaComments ?? [],
  };
}
export {MapQnaRaw};