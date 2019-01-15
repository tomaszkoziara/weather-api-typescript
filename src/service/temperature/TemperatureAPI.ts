import * as buildUrl from 'build-url';
import { injectable, inject } from 'inversify';
import { ITemperatureAPIConfig } from './TemperatureAPIConfig';
import { TYPES } from '../../types';
import { DateUtils } from '../../util/DateUtils';

interface ITemperatureAPI {
    fetchTemperature(date: string);
}

@injectable()
class TemperatureAPI implements ITemperatureAPI {

    private endpoint: string;

    constructor(
        @inject(TYPES.ITemperatureAPIConfig) temperatureAPIConfig: ITemperatureAPIConfig
    ) {
        this.endpoint = temperatureAPIConfig.getEndpoint();
    }

    async fetchTemperature(date: string): Promise<any> {
        const formattedDate = DateUtils.toISO8601WithZeroTime(date);

        const url = buildUrl(this.endpoint, {
            queryParams: {
                at: formattedDate
            }
        });
        const response = await global['fetch'](url, {});
        return response.json();
    }

}

export { ITemperatureAPI, TemperatureAPI };