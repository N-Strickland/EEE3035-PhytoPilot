import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import Collapsible from 'react-native-collapsible';

export default class SummaryPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCollapsed: false,
            desiredPumpSpeed: this.props.desiredData.Pump_Speed
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isCollapsed: !this.state.isCollapsed
        })
    }
    render() {
        let { isCollapsed, desiredPumpSpeed } = this.state;
        let { sensorData } = this.props;
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this.toggle} underlayColor='transparent'>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Summary</Text>
                        <Icon
                            name={isCollapsed ? 'arrow-right-bold' : 'arrow-down-bold'}
                            size={18}
                            type="material-community"
                        />
                    </View>
                </TouchableHighlight>
                <Collapsible collapsed={isCollapsed}>
                    <Text style={styles.lastUpdateLabel}>{`Last update: ${sensorData.timestamp}`}</Text>
                    <View style={styles.sensorSummary}>
                        <View style={styles.dataContainer}>
                            <Text style={styles.dataText}>{`${sensorData.LEDs_Blue}%`}</Text>
                            <Text style={styles.dataLabel}>LED Brightness</Text>
                        </View>
                        <View style={styles.dataContainer}>
                            <Text style={styles.dataText}>{`${sensorData.pH_Value[0].toFixed(2)}`}</Text>
                            <Text style={styles.dataLabel}>pH Level</Text>
                        </View>
                        <View style={styles.dataContainer}>
                            <Text style={styles.dataText}>{`${sensorData.Temperature_Celcius[0].toFixed(2)}°C`}</Text>
                            <Text style={styles.dataLabel}>Temperature</Text>
                        </View>
                    </View>
                    <View style={styles.pumpStatus}>
                        <View style={styles.pumpControl}>
                            <Button
                                icon={
                                    <Icon
                                        name={'minus'}
                                        size={20}
                                        type="material-community"
                                        color='rgba(0, 153, 51, 1)'
                                    />
                                }
                                type='clear'
                                onPress={() => {
                                    if (desiredPumpSpeed - 1 >= 0) {
                                        this.props.callBackFunction(desiredPumpSpeed - 1, "Pump_Speed")
                                        this.setState({
                                            "desiredPumpSpeed": desiredPumpSpeed - 1
                                        })
                                    }
                                }}
                            />
                            <Text style={styles.dataText}>{`${desiredPumpSpeed}%`}</Text>
                            <Button
                                icon={
                                    <Icon
                                        name={'plus'}
                                        size={20}
                                        type="material-community"
                                        color='rgba(0, 153, 51, 1)'
                                    />
                                }
                                type='clear'
                                onPress={() => {
                                    if (desiredPumpSpeed + 1 <= 100) {
                                        this.props.callBackFunction(desiredPumpSpeed + 1, "Pump_Speed")
                                        this.setState({
                                            "desiredPumpSpeed": desiredPumpSpeed + 1
                                        })
                                    }
                                }}
                            />
                        </View>
                        <Text style={styles.dataLabel}>Pump Speed</Text>
                    </View>
                </Collapsible>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerText: {
        fontWeight: 'bold',
        fontSize: 18,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
    },
    dataLabel: {
        fontWeight: 'bold',
        fontSize: 12
    },
    dataContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 4,
        alignItems: 'center'
    },
    sensorSummary: {
        padding: 10,
        paddingTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: -5
    },
    lastUpdateLabel: {
        fontStyle: 'italic',
        fontSize: 12
    },
    dataText: {
        fontSize: 20
    },
    pumpStatus: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
    },
    pumpControl: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        paddingBottom: 0
    }
})