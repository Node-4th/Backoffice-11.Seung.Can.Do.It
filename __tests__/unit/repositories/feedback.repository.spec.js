import { test } from '@jest/globals';
import { beforeEach } from '@jest/globals';
import { expect } from '@jest/globals';
import { jest } from '@jest/globals';
import { FeedbacksRepository } from '../../../src/repositories/feedbacks.repository.js'

describe('Feedback Repositoty Unit Test', () => {
    let mockPrisma;
    let feedbacksRepositoy;

    beforeEach(() => {
        jest.resetAllMocks();
        mockPrisma = {
            Feedbacks: {
                create: jest.fn(),
                findMany: jest.fn(),
                findFirst: jest.fn(),
                update: jest.fn(),
                delete: jest.fn()
            },
            Tasks: {
                findFirst: jest.fn()
            }
        };
        feedbacksRepositoy = new FeedbacksRepository(mockPrisma);
    });
    const feedback = {
        id: 1,
        taskId: 1,
        title: 'test',
        content: 'test',
        userId: 1,
        name: 'name',
        rating: 'RATING_1',
        status: 'SUBMIT_REQUESTED',
        createdAt: '2024-02-05T06:44:59.380Z',
        updatedAt: '2024-02-05T06:44:59.380Z'
    };
    const feedbacks = [
        {
            id: 1,
            taskId: 1,
            title: 'test1',
            content: 'test1',
            userId: 1,
            user: { name: 'name1' },
            rating: 'RATING_1',
            status: 'SUBMIT_REQUESTED',
            createdAt: '2024-02-05T06:44:59.380Z',
            updatedAt: '2024-02-05T06:44:59.380Z'
        },
        {
            id: 2,
            taskId: 1,
            title: 'test2',
            content: 'test2',
            userId: 1,
            user: { name: 'name2' },
            rating: 'RATING_1',
            status: 'SUBMIT_REQUESTED',
            createdAt: '2024-02-05T06:44:59.380Z',
            updatedAt: '2024-02-05T06:44:59.380Z'
        }
    ];

    test('createFeedback, findFeedback Method (SUCCESS)', async () => {
        const mockcreate = mockPrisma.Feedbacks.create.mockResolvedValue(feedback);
        const mockfindFirst = mockPrisma.Feedbacks.findFirst.mockResolvedValue(feedback);

        const createFeedback = await feedbacksRepositoy.createFeedback(
            feedback.taskId,
            feedback.title,
            feedback.content,
            feedback.rating,
            feedback.userId
        );

        const findFeedback = await feedbacksRepositoy.findFeedback(
            feedback.taskId,
            feedback.id
        );

        expect(mockcreate).toHaveBeenCalledWith({
            data: {
                taskId: feedback.taskId,
                title: feedback.title,
                content: feedback.content,
                rating: feedback.rating,
                userId: feedback.userId
            }
        });
        expect(mockfindFirst).toHaveBeenCalledWith({
            where: {
                id: feedback.id,
                taskId: feedback.taskId
            },
            include: {
                user: { select: { name: true } }
            }
        })

        expect(createFeedback).toEqual(feedback);
        expect(findFeedback).toEqual(createFeedback);
    });

    test('findAllFeedback Method', async () => {
        const mockfindMany = mockPrisma.Feedbacks.findMany.mockResolvedValue(feedbacks);

        const findAllFeedback = await feedbacksRepositoy.findAllFeedback(feedback.taskId);

        expect(mockfindMany).toHaveBeenCalledWith({
            where: {
                taskId: feedback.taskId
            },
            include: {
                user: { select: { name: true } }
            }
        })

        expect(findAllFeedback).toEqual(feedbacks);
    })

    test('findTask Method', async () => {
        const task = {
            id: 1,
            userId: 1,
            projectId: 1,
            content: 'content',
            submitUrl: 'submitUrl',
            createdAt: '2024-02-05T06:44:59.380Z',
            updatedAt: '2024-02-05T06:44:59.380Z',
            status: 'SUBMIT_REQUESTED'
        };

        const mockfindFirst = mockPrisma.Tasks.findFirst.mockResolvedValue(task);

        const findTask = await feedbacksRepositoy.findTask(feedback.taskId);

        expect(mockfindFirst).toHaveBeenCalledWith({
            where: {
                id: feedback.taskId
            }
        });

        expect(findTask).toEqual(task);
    })

    test('editFeedback Method', async () => {
        const mockupdate = mockPrisma.Feedbacks.update.mockResolvedValue(feedback);

        const editFeedback = await feedbacksRepositoy.editFeedback(
            feedback.taskId,
            feedback.id,
            feedback.title,
            feedback.content,
            feedback.rating,
            feedback.userId
        );

        expect(mockupdate).toHaveBeenCalledWith({
            where: {
                id: feedback.id,
                taskId: feedback.taskId,
                userId: feedback.userId
            },
            data: {
                title: feedback.title,
                content: feedback.content,
                rating: feedback.rating
            }
        })
        expect(editFeedback).toEqual(feedback);
    });

    test('deleteFeedback Method', async () => {
        const mockdelete = mockPrisma.Feedbacks.delete.mockResolvedValue(feedback);

        const deleteFeedback = await feedbacksRepositoy.deleteFeedback(
            feedback.taskId,
            feedback.id,
            feedback.userId
        );

        expect(mockdelete).toHaveBeenCalledWith({
            where: {
                id: feedback.id,
                taskId: feedback.taskId,
                userId: feedback.userId
            }
        });
        expect(deleteFeedback).toEqual(feedback);
    });
})