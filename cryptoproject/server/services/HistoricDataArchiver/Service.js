const HistoricDataArchiver = require('./index');
const settings = require('../../../site-settings');

function HistoricDataService(){
    this.timer = setTimeout(() => {
        let days = settings.ARCHIVE_DATA_OLDER_THAN.days;
        HistoricDataArchiver.archiveDataOlderThan(days)
            .then(response => {
                console.log(`Archived ${response.length} entries`);
            })
            .catch(err => {
                console.log(err);
            });
    }, settings.ARCHIVER_REFRESH_RATE);

    this.stop = () => {
        clearInterval(this.timer);
    };
}

module.exports = HistoricDataService;