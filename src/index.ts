import got from 'got';

const startDate = new Date(`${process.argv[2]} 08:00:00`);
const endDate = new Date(`${process.argv[3]} 08:00:00`);
const issueId: string = process.argv[4];
const hours: number = parseFloat(process.argv[5]);

if (process.argv.length !== 6
  || !(startDate instanceof Date)
  || !(endDate instanceof Date)
  || isNaN(hours)) {
  console.log(`Usage:
  yarn record start-date end-date issue hours`);
  console.log(`Example:
  // Record 8 hours per day on issue XXX-97 from Sep 9 2021 through Sep 21 2021
  yarn record 2021-09-16 2021-09-21 XXX-97 8`);

  process.exit(0);
}

const makeDateRange = (startDate: Date, endDate: Date) => {
  const dates: Date[] = [];
  for (let d = new Date(startDate.getTime()); d <= endDate; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d.getTime()));
  }
  return dates;
}

(async () => {
  const dates = makeDateRange(startDate, endDate)
    .filter(d => d.getDay() !== 0 && d.getDay() !== 6);

  await Promise.all(dates.map(d => got.post(`${process.env.JIRA_URL}/rest/api/3/issue/${issueId}/worklog`, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.JIRA_USERNAME}:${process.env.JIRA_TOKEN}`).toString('base64')}`,
      Accept: 'application/json'
    },
    json: {
      timeSpent: `${hours}h`,
      started: d.toISOString().replace(/Z$/, '+0000'),
    }
  })))
    .catch(console.log);
})();