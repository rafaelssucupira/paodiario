async function loadCron() {
    const { CronJob } = await import('cron');
	return CronJob;
}

module.exports = {
    loadCron
};
