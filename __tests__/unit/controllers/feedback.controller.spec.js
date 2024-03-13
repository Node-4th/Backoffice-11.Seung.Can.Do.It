import { test } from "@jest/globals";
import { expect } from "@jest/globals";
import { jest } from "@jest/globals";
import { FeedbacksController } from "../../../src/controllers/feedbacks.controller.js";

describe("Feedback Controller Unit Test", () => {
  let mockFeedbacksService;
  let feedbacksController;
  let mockReq, mockRes;

  beforeEach(() => {
    jest.restoreAllMocks();
    mockFeedbacksService = {
      findAllFeedback: jest.fn(),
      findFeedback: jest.fn(),
      findTask: jest.fn(),
      createFeedback: jest.fn(),
      editFeedback: jest.fn(),
      deleteFeedback: jest.fn(),
    };
    mockReq = { params: {}, body: {}, user: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
    };
    feedbacksController = new FeedbacksController(mockFeedbacksService);
  });
  const feedback = {
    feedbackId: 1,
    taskId: 1,
    title: "test",
    content: "test",
    userId: 1,
    name: "name",
    rating: "RATING_1",
    status: "SUBMIT_REQUESTED",
    createdAt: "2024-02-05T06:44:59.380Z",
    updatedAt: "2024-02-05T06:44:59.380Z",
  };
  const task = {
    taskId: 1,
    userId: 1,
    projectId: 1,
    content: "content",
    submitUrl: "submitUrl",
    createdAt: "2024-02-05T06:44:59.380Z",
    updatedAt: "2024-02-05T06:44:59.380Z",
    status: "SUBMIT_REQUESTED",
  };
  const mocknext = jest.fn();

  test("createFeedback Method", async () => {
    mockReq.params = {
      taskId: feedback.taskId,
    };

    mockReq.user = {
      userId: feedback.userId,
    };

    mockReq.body = {
      title: feedback.title,
      content: feedback.content,
      rating: feedback.rating,
    };

    const mockfindTask = mockFeedbacksService.findTask.mockResolvedValue(task);
    const mockcreateFeedback =
      mockFeedbacksService.createFeedback.mockResolvedValue(feedback);

    await feedbacksController.createFeedback(mockReq, mockRes, mocknext);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: "true",
      message: "피드백을 작성하였습니다.",
    });
    expect(mockcreateFeedback).toHaveBeenCalledWith(
      feedback.taskId,
      feedback.title,
      feedback.content,
      feedback.rating,
      feedback.userId,
    );
    expect(mockfindTask).toHaveBeenCalledWith(feedback.taskId);
  });

  test("findFeedback Method", async () => {
    mockReq.params = {
      feedbackId: feedback.feedbackId,
    };

    const mockfindFeedback =
      mockFeedbacksService.findFeedback.mockResolvedValue(feedback);

    await feedbacksController.findFeedback(mockReq, mockRes, mocknext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      data: feedback,
    });
    expect(mockfindFeedback).toHaveBeenCalledWith(feedback.feedbackId);
  });

  test("findAllFeedback Method", async () => {
    const feedbacks = [
      {
        feedbackId: 1,
        taskId: 1,
        title: "test1",
        userId: 1,
        name: "name1",
        rating: "RATING_1",
        status: "SUBMIT_REQUESTED",
      },
      {
        feedbackId: 2,
        taskId: 1,
        title: "test2",
        userId: 2,
        name: "name2",
        rating: "RATING_1",
        status: "SUBMIT_REQUESTED",
      },
    ];

    mockReq.params = {
      taskId: feedback.taskId,
    };

    const mockfindAllFeedback =
      mockFeedbacksService.findAllFeedback.mockResolvedValue(feedbacks);

    await feedbacksController.findAllFeedback(mockReq, mockRes, mocknext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      data: feedbacks,
    });
    expect(mockfindAllFeedback).toHaveBeenCalledWith(feedback.taskId);
  });

  test("editFeedback Method", async () => {
    mockReq.params = {
      feedbackId: feedback.feedbackId,
    };

    mockReq.user = {
      userId: feedback.userId,
    };

    mockReq.body = {
      title: feedback.title,
      content: feedback.content,
      rating: feedback.rating,
    };

    const mockfindFeedback =
      mockFeedbacksService.findFeedback.mockResolvedValue({ feedback });
    const mockeditFeedback =
      mockFeedbacksService.editFeedback.mockResolvedValue(feedback);

    await feedbacksController.editFeedback(mockReq, mockRes, mocknext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: "true",
      message: "피드백을 수정했습니다.",
      data: feedback,
    });
    expect(mockeditFeedback).toHaveBeenCalledWith(
      feedback.feedbackId,
      feedback.title,
      feedback.content,
      feedback.rating,
      feedback.userId,
      mockfindFeedback.userId,
    );
    expect(mockfindFeedback).toHaveBeenCalledWith(feedback.feedbackId);
  });

  test("deleteFeedback Method", async () => {
    mockReq.params = {
      feedbackId: feedback.feedbackId,
    };

    mockReq.user = {
      userId: feedback.userId,
    };

    const mockfindFeedback =
      mockFeedbacksService.findFeedback.mockResolvedValue({ feedback });
    const mockdeleteFeedback =
      mockFeedbacksService.deleteFeedback.mockResolvedValue(feedback);

    await feedbacksController.deleteFeedback(mockReq, mockRes, mocknext);

    expect(mockRes.status).toHaveBeenCalledWith(204);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: "true",
      message: "피드백을 삭제했습니다.",
    });
    expect(mockdeleteFeedback).toHaveBeenCalledWith(
      feedback.feedbackId,
      feedback.userId,
      mockfindFeedback.userId,
    );
    expect(mockfindFeedback).toHaveBeenCalledWith(feedback.feedbackId);
  });
});
