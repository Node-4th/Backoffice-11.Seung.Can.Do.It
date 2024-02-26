export class FeedbacksService {
  constructor(feedbacksRepository) {
    this.feedbacksRepository = feedbacksRepository;
  }

  findTask = async (taskId) => {
    if(!taskId) {
      throw new Error('과제를 선택하세요.')
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
      name: feedback.user.name,
      rating: feedback.rating,
      status: feedback.status
    }));
  }

  findFeedback = async (taskId, feedbackId) => {
    if (!feedbackId) {
      throw new Error('피드백을 선택하세요');
    }

    const feedback = await this.feedbacksRepository.findFeedback(
      taskId, 
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

  editFeedback = async (taskId, feedbackId, title, content, rating, userId) => {
    if(!title || !content || !rating) {
      throw new Error('필수 값이 입력되지 않았습니다.')
    }
    
    const feedback = await this.feedbacksRepository.editFeedback(
      taskId,
      feedbackId,
      title,
      content,
      rating,
      userId
    );

    return feedback;
  }

  deleteFeedback = async (taskId, feedbackId) => {
    const feedback = await this.feedbacksRepository.deleteFeedback(
      taskId,
      feedbackId
    );

    return feedback;
  }
}