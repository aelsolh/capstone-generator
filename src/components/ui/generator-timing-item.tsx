import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Card from './card';
import WhiteCard from './white-card';
import {formatDateToHoursAndMinutes} from '../../utils/date-utils';
import DatePicker from 'react-native-date-picker';
import {Colors} from '../../utils/colors';
import {ControllerRenderProps} from 'react-hook-form';
import {GeneratorForm} from '../../screens/generator-on-off';

type GeneratorTimingItemProps = {
  item: {
    id: string;
    time_to_turn_on: Date;
    time_to_turn_off: Date;
  };
  index: number;
  field: ControllerRenderProps<GeneratorForm, 'timings'>;
  disabled?: boolean;
};

const GeneratorTimingItem = ({
  item,
  field,
  disabled,
}: GeneratorTimingItemProps) => {
  const [timingOnOpen, setTimingOnOpen] = useState(false);
  const [timingOffOpen, setTimingOffOpen] = useState(false);

  console.log(timingOnOpen);

  return (
    <>
      <Card style={styles.onOffContainer}>
        <View style={styles.timeToTurnContainer}>
          <Text style={styles.text}>Time to turn on:</Text>
          <Card
            disabled={disabled}
            selected
            style={styles.timeToTurnOffAndOnTimeCard}
            onPress={() => setTimingOnOpen(true)}>
            <WhiteCard pointerEvents="none">
              <Text style={styles.onOffText}>
                {formatDateToHoursAndMinutes(item.time_to_turn_on)}
              </Text>
            </WhiteCard>
          </Card>
        </View>
        <View style={styles.timeToTurnContainer}>
          <Text style={styles.text}>Time to turn off:</Text>
          <Card
            disabled={disabled}
            selected
            style={styles.timeToTurnOffAndOnTimeCard}
            onPress={() => setTimingOffOpen(true)}>
            <WhiteCard pointerEvents="none">
              <Text style={styles.onOffText}>
                {formatDateToHoursAndMinutes(item.time_to_turn_off)}
              </Text>
            </WhiteCard>
          </Card>
        </View>
      </Card>
      <DatePicker
        modal
        mode="time"
        date={item.time_to_turn_on}
        open={timingOnOpen}
        onCancel={() => setTimingOnOpen(false)}
        onConfirm={date => {
          const indx = field.value.findIndex(fi => fi.id === item.id);
          let updatedField = field.value;

          updatedField[indx] = {...item, time_to_turn_on: date};

          field.onChange([...updatedField]);
        }}
      />
      <DatePicker
        modal
        mode="time"
        date={item.time_to_turn_off}
        open={timingOffOpen}
        onCancel={() => setTimingOffOpen(false)}
        onConfirm={date => {
          const indx = field.value.findIndex(fi => fi.id === item.id);
          let updatedField = field.value;

          updatedField[indx] = {...item, time_to_turn_off: date};

          field.onChange([...updatedField]);
        }}
      />
    </>
  );
};

export default GeneratorTimingItem;

const styles = StyleSheet.create({
  onOffText: {color: Colors.Black, fontSize: 24, fontWeight: '700'},
  onOffContainer: {gap: 10},
  timeToTurnOffAndOnTimeCard: {padding: 10, paddingHorizontal: 10},
  text: {color: Colors.Black, fontSize: 20, fontWeight: '700'},
  gap25: {gap: 25},
  timeToTurnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  elevatedCardStyle: {
    alignSelf: 'center',
  },
  elevatedCardTextStyle: {
    fontSize: 22,
    color: Colors.White,
    fontWeight: '700',
  },
  contentContainer: {paddingHorizontal: 15},
  screen: {
    flex: 1,
    backgroundColor: Colors.Background,
    gap: 25,
  },
  label: {
    fontSize: 16,
    lineHeight: 16 * 1.2,
    color: Colors.Black,
    fontWeight: '700',
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
});
