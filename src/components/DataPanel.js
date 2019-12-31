import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import Collapsible from 'react-native-collapsible';
import SummaryPanel from './SummaryPanel';
import TempPanel from './TempPanel';
import LEDPanel from './LEDPanel';
import PHPanel from './PHPanel';
import Amplify, { PubSub, Auth } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';



const initialSensorData = require('../../initialdoc.json');

Amplify.addPluggable(new AWSIoTProvider({
    aws_pubsub_region: 'eu-west-1',
    aws_pubsub_endpoint: 'wss://a1xoo1c7ikxf02-ats.iot.eu-west-1.amazonaws.com/mqtt',
}));

async function publish_iot(topic, message) {
    console.log(topic, message)
    await PubSub.publish(topic, message);
}

function unixToUTC(unixTime) {
    var d = new Date(unixTime * 1000);
    timeStampCon = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + " " + d.getHours() + ':' + ('0' + d.getMinutes()).slice(-2);

    return timeStampCon;

}

const TOPICS = ['$aws/things/PhytoPilot/shadow/get/accepted', '$aws/things/PhytoPilot/shadow/update/accepted', '$aws/things/PhytoPilot/shadow/update']

let sub_get, sub_update = null;

export default class DataPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCollapsed: false,
            sensorDataLoaded: false,
            currentSensorValues: initialSensorData,
            desiredSensorValues: initialSensorData,
            timestamp: 0,
            refreshing: false
        }

        this.toggle = this.toggle.bind(this);
        this.updateShadowDocument = this.updateShadowDocument.bind(this);
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        setTimeout(() => {
            publish_iot('$aws/things/PhytoPilot/shadow/get', {});

        }, 1000)
        this.setState({ refreshing: false });
    }

    componentDidMount() {
        sub_get = PubSub.subscribe(TOPICS[0], { provider: 'AWSIoTProvider' }).subscribe({
            next: data => {
                this.setState({
                    sensorDataLoaded: true,
                    currentSensorValues: data.value.state.reported,
                    desiredSensorValues: data.value.state.desired,
                    timestamp: unixToUTC(data.value.timestamp)
                })
            },
            error: error => console.error(error),
            close: () => console.log('Done'),
        });

        sub_update = PubSub.subscribe(TOPICS[1], { provider: 'AWSIoTProvider' }).subscribe({
            next: data => {
                publish_iot('$aws/things/PhytoPilot/shadow/get', {});
            },
            error: error => console.error(error),
            close: () => console.log('Done'),
        });

        setTimeout(() => {
            publish_iot('$aws/things/PhytoPilot/shadow/get', {});
        }, 1000);

    }

    componentWillUnmount() {
        sub_update.unsubscribe();
        sub_get.unsubscribe();
    }

    updateShadowDocument(data, dataType) {
        if (dataType == 'Pump_Speed') {
            publish_iot(TOPICS[2], {
                "state": {
                    "desired": {
                        "Pump_Speed": data
                    }
                }
            });
        } else if (dataType == 'pH_Value') {
            publish_iot(TOPICS[2], {
                "state": {
                    "desired": {
                        "pH_Value": data
                    }
                }
            });
        } else if (dataType == 'LEDs_Blue') {
            publish_iot(TOPICS[2], {
                "state": {
                    "desired": {
                        "LEDs_Blue": data
                    }
                }
            });
        } else {
            publish_iot(TOPICS[2], {
                "state": {
                    "desired": {
                        "LEDs_Red": data
                    }
                }
            });
        }
    }

    toggle() {
        this.setState({
            isCollapsed: !this.state.isCollapsed
        })
    }
    render() {

        let { currentSensorValues, desiredSensorValues, isCollapsed, sensorDataLoaded, timestamp } = this.state
        currentSensorValues.timestamp = timestamp;

        return (
            <ScrollView style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
            >
                <TouchableHighlight onPress={this.toggle} underlayColor={'transparent'}>
                    <View style={[styles.headerContainer, { borderColor: 'rgba(0, 153, 51, 1)', borderBottomWidth: 1 }]}>
                        <Text style={styles.headerText}>Hydroponics Unit 1</Text>
                        <Icon
                            name={isCollapsed ? 'arrow-right-bold' : 'arrow-down-bold'}
                            size={24}
                            type="material-community"
                        />
                    </View>
                </TouchableHighlight>

                <Collapsible collapsed={isCollapsed}>
                    {!sensorDataLoaded &&
                        <View style={styles.sensorLoading}>
                            <ActivityIndicator size={150} color={'rgba(0, 153, 51, 1)'} />
                            <Text style={styles.sensorLoadingText}> Sensor Data Loading </Text>
                        </View>
                    }
                    {sensorDataLoaded &&
                        <View style={styles.sensorPanels}>
                            <SummaryPanel sensorData={currentSensorValues}
                                desiredData={desiredSensorValues}
                                callBackFunction={this.updateShadowDocument} />
                            <View style={{ paddingTop: 10 }}>
                                <TempPanel sensorData={currentSensorValues} />
                            </View>
                            <View style={{ paddingTop: 10 }}>
                                <LEDPanel sensorData={currentSensorValues}
                                    desiredData={desiredSensorValues}
                                    callBackFunction={this.updateShadowDocument}
                                />
                            </View>
                            <View style={{ paddingTop: 10 }}>
                                <PHPanel sensorData={currentSensorValues}
                                    desiredData={desiredSensorValues}
                                    callBackFunction={this.updateShadowDocument}
                                />
                            </View>
                        </View>
                    }
                    <View style={{ height: 15 }} />
                </Collapsible>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    headerText: {
        fontWeight: 'bold',
        fontSize: 24,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
    },
    container: {
        padding: 15,
        margin: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 4,
        alignItems: 'center'
    },
    sensorPanels: {
        padding: 4
    },
    sensorLoading: {
        alignItems: 'center',
        padding: 30,
        paddingBottom: 20
    },
    sensorLoadingText: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 10
    }
})