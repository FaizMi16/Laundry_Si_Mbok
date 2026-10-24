import React from 'react';
import { View } from 'react-native';
import { Chip } from '../atoms';

const rowStyle = { flexDirection: 'row', flexWrap: 'wrap', gap: 10 };

/** Pilih tanggal & jam jemput. Props: dates, times, date, time, onDateChange, onTimeChange */
export default function SchedulePicker({ dates, times, date, time, onDateChange, onTimeChange }) {
  return (
    <View>
      <View style={rowStyle}>
        {dates.map((d) => <Chip key={d} label={d} active={d === date} onPress={() => onDateChange(d)} />)}
      </View>
      <View style={[rowStyle, { marginTop: 10 }]}>
        {times.map((t) => <Chip key={t} label={t} active={t === time} onPress={() => onTimeChange(t)} />)}
      </View>
    </View>
  );
}
