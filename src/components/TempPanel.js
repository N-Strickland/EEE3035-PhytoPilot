import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import Collapsible from 'react-native-collapsible';
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';

export default class TempPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCollapsed: true
        }
        this.toggle = this.toggle.bind(this);
        this.calcTempData = this.calcTempData.bind(this);
    }

    toggle() {
        this.setState({
            isCollapsed: !this.state.isCollapsed
        })
    }

    calcTempData(temps) {
        let minTemp = Math.min(...temps);
        let maxTemp = Math.max(...temps);
        let avgTemp = Math.round(temps.reduce((a, b) => a + b, 0) / temps.length)
        let currentTemp = temps[0]
        return [minTemp, maxTemp, avgTemp, currentTemp]
    }

    render() {
        let { isCollapsed } = this.state;
        let { sensorData } = this.props;
        let [minTemp, maxTemp, avgTemp, currentTemp] = this.calcTempData(sensorData.Temperature_Celcius);
        let graphData = sensorData.Temperature_Celcius.slice().reverse();
        console.log(sensorData.Temperature_Celcius)
        return (
            <View>
                <TouchableHighlight onPress={this.toggle} underlayColor={'transparent'}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Temperature</Text>
                        <Icon
                            name={isCollapsed ? 'arrow-right-bold' : 'arrow-down-bold'}
                            size={18}
                            type="material-community"
                        />
                    </View>
                </TouchableHighlight>
                <Collapsible collapsed={isCollapsed}>
                    <Text style={styles.lastUpdateLabel}>{`Last update: ${sensorData.timestamp}`}</Text>
                    <View style={styles.container}>
                        <View style={styles.currentTempCont}>
                            <Text style={styles.dataText}>{`${currentTemp.toFixed(1)}°C`}</Text>
                            <Text style={styles.dataLabel}>Current Temperature</Text>
                        </View>
                        <View style={styles.sensorSummary}>
                            <View style={styles.dataContainer}>
                                <Text style={styles.dataText}>{`${minTemp.toFixed(1)}°C`}</Text>
                                <Text style={styles.dataLabel}>Min Temperature</Text>
                            </View>
                            <View style={styles.dataContainer}>
                                <Text style={styles.dataText}>{`${avgTemp.toFixed(1)}°C`}</Text>
                                <Text style={styles.dataLabel}>Avg Temperature</Text>
                            </View>
                            <View style={styles.dataContainer}>
                                <Text style={styles.dataText}>{`${maxTemp.toFixed(1)}°C`}</Text>
                                <Text style={styles.dataLabel}>Max Temperature</Text>
                            </View>
                        </View>
                        <View style={{ height: 250, flexDirection: 'row' }}>
                            <YAxis
                                data={sensorData.Temperature_Celcius}
                                contentInset={{ top: 20, bottom: 20 }}
                                svg={{
                                    fill: 'grey',
                                    fontSize: 10,
                                }}

                                formatLabel={value => `${value.toFixed(1)}ºC`}
                                numberOfTicks={15}
                                min={0}
                                max={36}
                            />
                            <LineChart
                                style={{ flex: 1, marginLeft: 16 }}
                                data={graphData}
                                svg={{ stroke: 'rgba(0, 153, 51, 1)' }}
                                contentInset={{ top: 20, bottom: 20 }}
                                animate={true}
                                yMax={36}
                                yMin={0}
                            >
                                <Grid />
                            </LineChart>
                        </View>
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
    },
    lastUpdateLabel: {
        fontStyle: 'italic',
        fontSize: 12
    },
    dataText: {
        fontSize: 20
    },
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    currentTempCont: {
        alignItems: 'center',
        padding: 15,
        paddingBottom: 0
    }
})