import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import Collapsible from 'react-native-collapsible';

export default class SummaryPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCollapsed: false,
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isCollapsed: !this.state.isCollapsed
        })
    }
    render() {
        let { isCollapsed } = this.state;
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
                            <Text style={styles.dataText}>{`${sensorData.pH_Value[sensorData.pH_Value.length - 1]}`}</Text>
                            <Text style={styles.dataLabel}>pH Level</Text>
                        </View>
                        <View style={styles.dataContainer}>
                            <Text style={styles.dataText}>{`${sensorData.Temperature_Celcius[sensorData.Temperature_Celcius.length - 1]}°C`}</Text>
                            <Text style={styles.dataLabel}>Temperature</Text>
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
    }
})