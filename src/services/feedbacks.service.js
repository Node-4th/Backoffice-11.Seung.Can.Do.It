export class FeedbacksService {
  constructor(feedbacksRepository) {
    this.feedbacksRepository = feedbacksRepository;
  }

  findTask = async (taskId) => {
    if(!taskId) {
      throw new Error('프로젝트를 선택하세요.');
    }

    const task = await this.feedbacksRepository.findTask(taskId);

    if(!task) {
      throw new Error('해당 프로젝트가 존재하지 않습니다.');
    }

    return task;
  }

  findAllFeedback = async (taskId) => {
    const feedbacks = await this.feedbacksRepository.findAllFeedback(taskId);

    if(!feedbacks || !feedbacks.length === 0) {
      throw new Error('피드백이 존재하지 않습니다.');
    }

    return feedbacks.map(feedback => ({
      id: feedback.id,
      taskId: feedback.taskId,
      title: feedback.title,
      userId: feedback.userId,
      name: feedback.user.name,
      rating: feedback.rating,
      status: feedback.status
    }));
  }

  findFeedback = async (feedbackId) => {
    if (!feedbackId) {
      throw new Error('피드백을 선택하세요');
    }

    const feedback = await this.feedbacksRepository.findFeedback(
      feedbackId
    );

    if(!feedback) {
      throw new Error('피드백이 존재하지 않습니다.');
    }

    return feedback;  
  }

  createFeedback = async (taskId, title, content, rating, userId) => {
    if(!title || !content || !rating) {
      throw new Error('필수 값이 입력되지 않았습니다.')
    }

    const feedback = await this.feedbacksRepository.createFeedback(
      taskId,
      title,
      content,
      rating,
      userId
    );

    return feedback;
  }

  editFeedback = async (feedbackId, title, content, rating, userId, checkUserId) => {
    if(!title || !content || !rating) {
      throw new Error('필수 값이 입력되지 않았습니다.');
    }

    if(userId !== checkUserId) {
      throw new Error('피드백을 수정할 수 있는 권한이 없습니다.');
    }
    
    const feedback = await this.feedbacksRepository.editFeedback(
      feedbackId,
      title,
      content,
      rating,
      userId
    );

    return feedback;
  }

  deleteFeedback = async (feedbackId, userId, checkUserId) => {
    if(userId !== checkUserId) {
      throw new Error('피드백을 수정할 수 있는 권한이 없습니다.');
    }

    const feedback = await this.feedbacksRepository.deleteFeedback(
      feedbackId,
      userId
    );

    return feedback;
  }

  findUser = async (userId) => {
    const user = await this.feedbacksRepository.findUser(userId);

    if(user.role !== "TUTOR") {
      throw new Error ('피드백을 작성할 권한이 없습니다.');
    };

    return user;
  }

  findAllFeedbackByUser = async (id) => {
    const feedbacks = await this.feedbacksRepository.findAllFeedbackByUser(id);

    if(!feedbacks) {
      throw new Error('작성한 피드백이 없습니다.');
    }

    return feedbacks;
  }
}

