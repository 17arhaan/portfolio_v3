import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query userProblemsSolved($username: String!) {
            matchedUser(username: $username) {
              submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                  submissions
                }
              }
              profile {
                ranking
                userAvatar
                realName
                aboutMe
                school
                websites
                countryName
                company
                jobTitle
                skillTags
                postViewCount
                postViewCountDiff
                reputation
                reputationDiff
                solutionCount
                solutionCountDiff
                categoryDiscussCount
                categoryDiscussCountDiff
              }
            }
          }
        `,
        variables: {
          username: 'arhaan17',
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode data');
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    const userData = data.data.matchedUser;
    const stats = userData.submitStatsGlobal.acSubmissionNum;

    const easyStats = stats.find((s: any) => s.difficulty === 'Easy');
    const mediumStats = stats.find((s: any) => s.difficulty === 'Medium');
    const hardStats = stats.find((s: any) => s.difficulty === 'Hard');
    const allStats = stats.find((s: any) => s.difficulty === 'All');

    return NextResponse.json({
      totalSolved: allStats?.count || 0,
      totalQuestions: 3000, // Approximate total questions on LeetCode
      easySolved: easyStats?.count || 0,
      easyTotal: 800, // Approximate easy questions
      mediumSolved: mediumStats?.count || 0,
      mediumTotal: 1500, // Approximate medium questions
      hardSolved: hardStats?.count || 0,
      hardTotal: 700, // Approximate hard questions
      streak: 8, // This would require additional API calls
      maxStreak: 8, // This would require additional API calls
      totalDays: 365, // This would require additional API calls
      lastSolved: new Date().toISOString(), // This would require additional API calls
      contestRank: userData.profile.ranking || 0,
      globalRank: 0, // This would require additional API calls
      acceptanceRate: 100, // This would require additional API calls
      completionRate: Math.round((allStats?.count || 0) / 3000 * 100),
      totalSubmissions: allStats?.submissions || 0,
    });
  } catch (error) {
    console.error('LeetCode API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch LeetCode data' },
      { status: 500 }
    );
  }
} 