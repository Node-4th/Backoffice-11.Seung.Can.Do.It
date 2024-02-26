import { describe } from '@jest/globals';
import { expect } from '@jest/globals';
import { test } from '@jest/globals';
import { beforeEach } from '@jest/globals';
import { jest } from '@jest/globals';
import { FeedbacksService } from '../../../src/services/feedbacks.service.js';

describe('feedback Service Unit Test', () => {
    let mockFeedbacksRepository;
    let feedbacksService;

    beforeEach(() => {
        jest.restoreAllMocks();
        mockFeedbacksRepository = {
            findAllFeedback: jest.fn(),
            findFeedback: jest.fn(),
            findTask: jest.fn(),
            createFeedback: jest.fn(),
            editFeedback: jest.fn(),
            deleteFeedback: jest.fn()
        };
        feedbacksService = new FeedbacksService(mockFeedbacksRepository);
    });
    const feedback = {
        id: 1,
        taskId: 1,
        title: 'test',
        content: 'test',
        name: 'name',
        rating: 'RATING_1',
        status: 'SUBMIT_REQUESTED',
        createdAt: '2024-02-05T06:44:59.380Z',
        updatedAt: '2024-02-05T06:44:59.380Z'
    };

    test('createFeedback, findFeedback Method (SUCCESS)', async () => {
        mockFeedbacksRepository.createFeedback.mockResolvedValue(feedback);
        mockFeedbacksRepository.findFeedback.mockResolvedValue(feedback);
        
        const createfeedback = await feedbacksService.createFeedback(
            feedback.id,
            feedback.title,
            feedback.content,
            feedback.name,
            feedback.rating
        );

        const findFeedback = await feedbacksService.findFeedback(
            feedback.taskId,
            feedback.id
        );

        expect(createfeedback).toEqual(feedback);
        expect(findFeedback).toEqual(createfeedback);
    });

    test('createFeedback Method (Missing required values)', async () => {
        await expect(feedbacksService.createFeedback('taskId', 'title', null, 'rating', 'userId')).rejects.toThrowError('필수 값이 입력되지 않았습니다.');
    });

    test('findFeedback Method (Missing feedbackId)', async () => {
        await expect(feedbacksService.findFeedback(1, null)).rejects.toThrowError('피드백을 선택하세요');
    });

    test('findFeedback Method (No Feedback)', async () => {
        mockFeedbacksRepository.findFeedback.mockResolvedValue(null);
        await expect(feedbacksService.findFeedback(1, 1)).rejects.toThrowError('피드백이 존재하지 않습니다.');
    });

    test('findAllFeedback Method (SUCCESS)', async () => {
        const mockfeedbacks = [
            {
                id: 1,
                taskId: 1,
                title: 'test1',
                user: { name: 'name1' },
                rating: 'RATING_1',
                status: 'SUBMIT_REQUESTED'
            },
            {
                id: 2,
                taskId: 1,
                title: 'test2',
                user: { name: 'name2' },
                rating: 'RATING_1',
                status: 'SUBMIT_REQUESTED'
            }
        ];
    
        const feedbacks = [
            {
                id: 1,
                taskId: 1,
                title: 'test1',
                name: 'name1',
                rating: 'RATING_1',
                status: 'SUBMIT_REQUESTED'
            },
            {
                id: 2,
                taskId: 1,
                title: 'test2',
                name: 'name2',
                rating: 'RATING_1',
                status: 'SUBMIT_REQUESTED'
            }
        ];

        const mockfindAllFeedback = mockFeedbacksRepository.findAllFeedback.mockResolvedValue(mockfeedbacks);

        const findAllFeedback = await feedbacksService.findAllFeedback(feedback.taskId);

        expect(mockfindAllFeedback).toHaveBeenCalled();
        expect(findAllFeedback).toEqual(feedbacks);
    });

    test('findAllFeedback Method (No Feedbacks)', async () => {
        mockFeedbacksRepository.findAllFeedback.mockResolvedValue(null);
        await expect(feedbacksService.findAllFeedback(1)).rejects.toThrowError('피드백이 존재하지 않습니다.');
    })

    test('findTask Method (SUCCESS)', async () => {
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
        const mockfindTask = mockFeedbacksRepository.findTask.mockResolvedValue(task);

        const findTask = await feedbacksService.findTask(task.id);

        expect(mockfindTask).toHaveBeenCalled();
        expect(findTask).toEqual(task);
    })

    test('findTask Method (Missing taskId)', async () => {
        await expect(feedbacksService.findTask(null)).rejects.toThrowError('프로젝트를 선택하세요.');
    });

    test('findTask Method (No Task)', async () => {
        mockFeedbacksRepository.findTask.mockResolvedValue(null);
        await expect(feedbacksService.findTask(1)).rejects.toThrowError('해당 프로젝트가 존재하지 않습니다.');
    });

    test('editFeedback Method (SUCCESS)', async () => {
        const mockeditFeedback = mockFeedbacksRepository.editFeedback.mockResolvedValue(feedback);

        const editFeedback = await feedbacksService.editFeedback(
            feedback.taskId,
            feedback.id,
            feedback.title,
            feedback.content,
            feedback.name,
            feedback.rating
        );

        expect(mockeditFeedback).toHaveBeenCalledWith(
            feedback.taskId,
            feedback.id,
            feedback.title,
            feedback.content,
            feedback.name,
            feedback.rating
        );
        expect(editFeedback).toEqual(feedback);
    });

    test('createFeedback Method (Missing required values)', async () => {
        await expect(feedbacksService.editFeedback('taskId', 'feedbackId', 'title', null, 'rating', 'userId')).rejects.toThrowError('필수 값이 입력되지 않았습니다.');
    });

    test('deleteFeedback Method (SUCCESS)', async () => {
        const mockdeleteFeedback = mockFeedbacksRepository.deleteFeedback.mockResolvedValue(true);

        const deleteFeedback = await feedbacksService.deleteFeedback(
            feedback.taskId,
            feedback.id
        );

        expect(mockdeleteFeedback).toHaveBeenCalledWith(
            feedback.taskId,
            feedback.id
        );
        expect(deleteFeedback).toEqual(true);
    })
})