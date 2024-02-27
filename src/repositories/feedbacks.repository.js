export class FeedbacksRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findAllFeedback = async (taskId) => {
    const feedback = await this.prisma.Feedbacks.findMany({
      where: { 
        taskId: +taskId 
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
        id: +feedbackId
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
        id: +taskId
      },
      include: {
        users: { select: { name: true } },
        teams: { select: { name: true } },
        projects: { select: { title: true } }
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
      },
      include: {
        user: { select: { name: true } }
      }
    })

    return feedback;
  }

  editFeedback = async (feedbackId, title, content, rating, userId) => {
    const feedback = await this.prisma.Feedbacks.update({
      where: {
        id: +feedbackId,
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
        id: +feedbackId,
        userId
      }
    });

    return feedback;
  }

}
