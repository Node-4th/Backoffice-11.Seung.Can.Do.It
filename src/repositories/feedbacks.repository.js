export class FeedbacksRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findAllFeedback = async (taskId) => {
    const feedback = await this.prisma.Feedbacks.findMany({
      where: { 
        taskId 
      },
      include: {
        user: { select: { name: true } }
      }
    })

    return feedback;
  } 

  findFeedback = async (taskId, feedbackId) => {
    const task = await this.prisma.Feedbacks.findFirst({
      where: {
        id: feedbackId,
        taskId
      },
      include: {
        user: { select: { name: true } }
      }
    })

    return task;
  } 

  findTask = async (taskId) => {
    const task = await this.prisma.Tasks.findFirst({
      where: {
        id: taskId
      }
    })

    return task;
  }

  createFeedback = async (taskId, title, content, rating, userId) => {
    const feedback = await this.prisma.Feedbacks.create({
      data: {
        taskId,
        title,
        content,
        rating,
        userId
      }
    })

    return feedback;
  }

  editFeedback = async (taskId, feedbackId, title, content, rating, userId) => {
    const feedback = await this.prisma.Feedbacks.update({
      where: {
        id: feedbackId,
        taskId,
        userId
      },
      data: {
        title,
        content,
        rating
      }
    });

    return feedback;
  }

  deleteFeedback = async (taskId, feedbackId) => {
    const feedback = await this.prisma.Feedbacks.delete({
      where: {
        id: feedbackId,
        taskId
      }
    });

    return feedback;
  }

}
