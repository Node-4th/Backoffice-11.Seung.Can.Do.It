export class SlackMessage {
    feedbackSlack = async (feedback, task) => {
        const taskUser = '';
        if (task.users.length === 1) {
            taskUser = task.user.name
        } else if (task.teams.length === 1) {
            taskUser = task.teams.name
        };

        axios.post('https://hooks.slack.com/services/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',
            {
                'text': `${feedback.user.name} 튜터님께서 ${taskUser}의 ${task.projects.title} 에 피드백이 완료되었습니다.`
            })
    }
};

