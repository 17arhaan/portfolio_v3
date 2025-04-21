import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch user stats
    const statsResponse = await fetch(`https://leetcode-stats-api.herokuapp.com/arhaan17`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      next: {
        revalidate: 300 // 5 minutes
      }
    });

    if (!statsResponse.ok) {
      throw new Error(`Failed to fetch LeetCode data: ${statsResponse.status} ${statsResponse.statusText}`);
    }

    const statsData = await statsResponse.json();

    if (!statsData || statsData.status !== 'success') {
      throw new Error('Invalid LeetCode data received');
    }

    // Fetch contest history
    const contestResponse = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query userContestRankingInfo($username: String!) {
            userContestRanking(username: $username) {
              attendedContestsCount
              rating
              globalRanking
              topPercentage
              badge {
                name
              }
            }
            userContestRankingHistory(username: $username) {
              attended
              trendDirection
              problemsSolved
              totalProblems
              finishTimeInSeconds
              rating
              ranking
              contest {
                title
                startTime
              }
            }
            matchedUser(username: $username) {
              profile {
                ranking
              }
            }
          }
        `,
        variables: {
          username: 'arhaan17'
        }
      }),
      next: {
        revalidate: 300 // 5 minutes
      }
    });

    if (!contestResponse.ok) {
      throw new Error(`Failed to fetch contest data: ${contestResponse.status} ${contestResponse.statusText}`);
    }

    const contestData = await contestResponse.json();

    // Calculate streak from submission calendar
    const submissionCalendar = statsData.submissionCalendar || {};
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const todayKey = Math.floor(today.getTime() / 1000).toString();
    const yesterdayKey = Math.floor(yesterday.getTime() / 1000).toString();
    
    const hasSolvedToday = submissionCalendar[todayKey] > 0;
    const hasSolvedYesterday = submissionCalendar[yesterdayKey] > 0;

    // Calculate current streak
    let currentStreak = 0;
    const sortedDates = Object.keys(submissionCalendar)
      .map(key => parseInt(key))
      .sort((a, b) => b - a); // Sort in descending order

    for (let i = 0; i < sortedDates.length; i++) {
      const currentDate = new Date(sortedDates[i] * 1000);
      const nextDate = i < sortedDates.length - 1 ? new Date(sortedDates[i + 1] * 1000) : null;
      
      if (submissionCalendar[sortedDates[i].toString()] > 0) {
        currentStreak++;
        
        if (nextDate) {
          const dayDiff = Math.floor((currentDate.getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24));
          if (dayDiff > 1) {
            break;
          }
        }
      } else {
        break;
      }
    }

    // Calculate total active days
    const totalActiveDays = Object.keys(submissionCalendar)
      .filter(key => submissionCalendar[key] > 0)
      .length;

    // Calculate max streak
    let maxStreak = 0;
    let currentStreakCount = 0;
    const sortedDatesForMax = Object.keys(submissionCalendar)
      .map(key => parseInt(key))
      .sort((a, b) => a - b);

    for (let i = 0; i < sortedDatesForMax.length; i++) {
      const currentDate = new Date(sortedDatesForMax[i] * 1000);
      const nextDate = i < sortedDatesForMax.length - 1 ? new Date(sortedDatesForMax[i + 1] * 1000) : null;
      
      if (submissionCalendar[sortedDatesForMax[i].toString()] > 0) {
        currentStreakCount++;
        
        if (nextDate) {
          const dayDiff = Math.floor((nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
          if (dayDiff > 1) {
            maxStreak = Math.max(maxStreak, currentStreakCount);
            currentStreakCount = 0;
          }
        } else {
          maxStreak = Math.max(maxStreak, currentStreakCount);
        }
      }
    }

    // Calculate total submissions from submission calendar
    const totalSubmissions = Object.values(submissionCalendar)
      .reduce((sum: number, count: unknown) => sum + (typeof count === 'number' ? count : 0), 0);

    // Process contest data
    const contestRanking = contestData.data?.userContestRanking || {};
    const contestHistory = contestData.data?.userContestRankingHistory || [];
    const globalRank = contestData.data?.matchedUser?.profile?.ranking || 0;
    
    // Get recent contests (last 5)
    const recentContests = contestHistory
      .filter((contest: any) => contest.attended)
      .sort((a: any, b: any) => b.contest.startTime - a.contest.startTime)
      .slice(0, 5)
      .map((contest: any) => ({
        title: contest.contest.title,
        rank: contest.ranking,
        rating: contest.rating,
        problemsSolved: contest.problemsSolved,
        totalProblems: contest.totalProblems,
        date: new Date(contest.contest.startTime * 1000).toISOString()
      }));

    return NextResponse.json({
      totalSolved: statsData.totalSolved || 0,
      totalQuestions: statsData.totalQuestions || 0,
      easySolved: statsData.easySolved || 0,
      easyTotal: statsData.totalEasy || 0,
      mediumSolved: statsData.mediumSolved || 0,
      mediumTotal: statsData.totalMedium || 0,
      hardSolved: statsData.hardSolved || 0,
      hardTotal: statsData.totalHard || 0,
      streak: currentStreak,
      maxStreak: maxStreak,
      totalDays: totalActiveDays,
      lastSolved: new Date().toISOString(),
      contestRating: contestRanking.rating || 0,
      globalRank: globalRank,
      topPercentage: contestRanking.topPercentage || 0,
      attendedContests: contestRanking.attendedContestsCount || 0,
      contestBadge: contestRanking.badge?.name || null,
      recentContests,
      acceptanceRate: 70.38,
      completionRate: statsData.completionRate || 0,
      totalSubmissions: totalSubmissions || 0,
    });
  } catch (error) {
    console.error('LeetCode API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch LeetCode data',
        message: error instanceof Error ? error.message : 'Unknown error',
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 