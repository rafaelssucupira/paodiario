async function loadDailyBread() {
    const { DailyBread } = await import('daily-bread');
	return DailyBread;
}

module.exports = {
    loadDailyBread
};
