export class FeedbacksController {
  constructor(feedbacksService, slackMessage) {
    this.feedbacksService = feedbacksService;
    this.slackMessage = slackMessage;
  }

  findAllFeedback = async (req, res, next) => {
    try {
      const { taskId } = req.params;

      await this.feedbacksService.findTask(taskId);
      const feedbacks = await this.feedbacksService.findAllFeedback(taskId);

      // return res.status(200).json({ data: feedback });
      return res.render('student_feedbacks.ejs', { feedbacks });
    } catch (err) {
      next(err);
    }
  }

  findFeedback = async (req, res, next) => {
    try {
      const { feedbackId } = req.params;
      const { role } = req.user;

      const feedback = await this.feedbacksService.findFeedback(feedbackId);
      console.log(feedback);
      // return res.status(200).json({ data: feedback });
      switch (role) {
        case 'ADMIN':
          res.render('admin_main.ejs');
          break;
        case 'TUTOR':
          res.render(('tutor_feedback.ejs'), { feedback });
          break;
        case 'STUDENT':
          res.render('student_feedback.ejs', { feedback });
          break;
      }

    } catch (err) {
      next(err);
    }
  }

  createFeedback = async (req, res, next) => {
    try {
      const { taskId } = req.params;
      const { title, content, rating } = req.body;
      const userId = req.user.id;

      const task = await this.feedbacksService.findTask(taskId);
      await this.feedbacksService.findUser(userId);
      const feedback = await this.feedbacksService.createFeedback(
        taskId,
        title,
        content,
        rating,
        userId
      );

      // return res.status(201).json({ success: 'true', message: '피드백을 작성하였습니다.' });

      return res.redirect(`/feedbacks/task/${feedback.id}`)
    } catch (err) {
      next(err);
    }
  }

  editFeedback = async (req, res, next) => {
    try {
      const { feedbackId } = req.params;
      const { title, content, rating } = req.body;
      const userId = req.user.id;

      const findFeedback = await this.feedbacksService.findFeedback(feedbackId);

      const feedback = await this.feedbacksService.editFeedback(
        feedbackId,
        title,
        content,
        rating,
        userId,
        findFeedback.userId
      );

      // return res.status(200).json({ success: 'true', message: '피드백을 수정했습니다.', data: feedback });
        return res.redirect(`/feedbacks/task/${feedback.id}`)

    } catch (err) {
      next(err);
    }
  }

  deleteFeedback = async (req, res, next) => {
    try {
      const { feedbackId } = req.params;
      const userId = req.user.id;

      const findFeedback = await this.feedbacksService.findFeedback(feedbackId);

      await this.feedbacksService.deleteFeedback(
        feedbackId,
        userId,
        findFeedback.userId
      );

      // return res.status(204).json({ success: 'true', message: '피드백을 삭제했습니다.' });
      return res.redirect('/feedbacks');

    } catch (err) {
      next(err);
    }
  };

  findAllFeedbackByUser = async (req, res, next) => {
    try {
      const { id, role } = req.user;

      const feedbacks = await this.feedbacksService.findAllFeedbackByUser(id);

      return res.render('tutor_feedbacks.ejs', { feedbacks })
    } catch(err) {
      next(err);
    }
  }
}
