export class FeedbacksController {
  constructor(feedbacksService) {
    this.feedbacksService = feedbacksService;
  }

  findFeedback = async (req, res, next) => {
    try {
      const { projectId } = req.params;

      const feedback = await this.feedbacksService.findFeedback(projectId);

      return res.status(200).json({data: feedback});

    } catch(err) {
      next(err);
    }
  }
}
