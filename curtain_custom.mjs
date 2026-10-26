import * as tuya from 'zigbee-herdsman-converters/lib/tuya';
import * as exposes from 'zigbee-herdsman-converters/lib/exposes';

const e = exposes.presets;
const ea = exposes.access;

export default {
    fingerprint: [
        { modelID: 'TS0601', manufacturerName: '_TZE200_hsgrhjpf' },
    ],
    model: 'TS0601_cover_custom',
    vendor: 'Tuya',
    description: 'Curtain motor TM616EGZT (With Border Calibration)',
    extend: [
        tuya.modernExtend.tuyaBase({ dp: true }),
    ],
    options: [exposes.options.invert_cover()],
    exposes: [
        e.cover_position().setAccess('position', ea.STATE_SET),
        e.enum('border', ea.STATE_SET, ['up', 'down', 'up_delete', 'down_delete'])
            .withDescription('Задать или сбросить крайние лимиты положения шторы'),
        // Полезное текстовое поле для отладки неизвестных DP
        e.text('tuya_data_point_test', ea.STATE_SET)
            .withDescription('Отправка сырых данных Tuya DP в формате: "тип,DP_ID,значение" (например: "1,103,1")'),
    ],
    meta: {
        tuyaDatapoints: [
            [1, 'state', tuya.valueConverterBasic.lookup({ OPEN: tuya.enum(0), STOP: tuya.enum(1), CLOSE: tuya.enum(2) })],
            [2, 'position', tuya.valueConverter.coverPositionInverted], // <-- Вернул Inverted, как было в рабочем варианте
            [3, 'position', tuya.valueConverter.coverPositionInverted],
            [16, 'border', tuya.valueConverterBasic.lookup({
                'up': tuya.enum(0),
                'down': tuya.enum(1),
                'up_delete': tuya.enum(2),
                'down_delete': tuya.enum(3),
            })],
        ],
    },
};
