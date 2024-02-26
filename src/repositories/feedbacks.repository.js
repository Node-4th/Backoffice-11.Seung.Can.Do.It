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

  findFeedback = async (feedbackId) => {
    const task = await this.prisma.Feedbacks.findFirst({
      where: {
        feedbackId
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
        taskId
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

  editFeedback = async (feedbackId, title, content, rating, userId) => {
    const feedback = await this.prisma.Feedbacks.update({
      where: {
        feedbackId,
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

  deleteFeedback = async (feedbackId, userId) => {
    const feedback = await this.prisma.Feedbacks.delete({
      where: {
        feedbackId,
        userId
      }
    });

    return feedback;
  }

}
