import React, {Component, Fragment} from 'react';
import {urls} from "../../../services/constants/";

class DatabaseBackup extends Component {
    handleDownloadDatabaseDump = () => {
        window.open(`${urls.download}/dump`);
    };

    render(){
        return (
            <Fragment>
                <h2>Backup Database</h2>
                <p className="h4">
                    This option will both update a backup stored on the server
                    and download a local copy to your computer.
                </p>
                <hr className="ui divider"/>
                <button
                    className="ui primary button"
                    onClick={this.handleDownloadDatabaseDump}
                >
                    Create and download database backup
                </button>
            </Fragment>
        );
    }
}

export default DatabaseBackup;