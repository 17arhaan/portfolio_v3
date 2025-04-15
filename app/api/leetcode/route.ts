import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(`https://leetcode-stats-api.herokuapp.com/arhaan17`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      next: {
        revalidate: 300 // 5 minutes
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch LeetCode data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || data.status !== 'success') {
      throw new Error('Invalid LeetCode data received');
    }

    // Calculate streak from submission calendar
    const submissionCalendar = data.submissionCalendar || {};
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
      .reduce((sum: number, count: number) => sum + count, 0);

    return NextResponse.json({
      totalSolved: data.totalSolved || 0,
      totalQuestions: data.totalQuestions || 0,
      easySolved: data.easySolved || 0,
      easyTotal: data.totalEasy || 0,
      mediumSolved: data.mediumSolved || 0,
      mediumTotal: data.totalMedium || 0,
      hardSolved: data.hardSolved || 0,
      hardTotal: data.totalHard || 0,
      streak: currentStreak,
      maxStreak: maxStreak,
      totalDays: totalActiveDays,
      lastSolved: new Date().toISOString(),
      contestRank: data.ranking || 0,
      globalRank: 0,
      acceptanceRate: 70.38,
      completionRate: data.completionRate || 0,
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