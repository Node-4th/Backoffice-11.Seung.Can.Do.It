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
            rating: 'RATING_1',
            status: 'SUBMIT_REQUESTED',
            createdAt: '2024-02-05T06:44:59.380Z',
            updatedAt: '2024-02-05T06:44:59.380Z'
        }
    ];

    test('findAllFeedback Method (SUCCESS)', async () => {
        const mockfindAllFeedback = mockPrisma.findMany.mockResolvedValue(feedbacks);

        const findAllFeedback = await feedbacksRepositoy.findAllFeedback(1);

        expect(mockfindAllFeedback).toHaveBeenCalled();
        expect(findAllFeedback).toEqual(feedbacks);
    });
})