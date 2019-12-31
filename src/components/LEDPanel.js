import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { Text, Button, Icon, Slider } from 'react-native-elements';
import Collapsible from 'react-native-collapsible';
import SemiCircleProgress from 'react-native-semi-circle-progress';

export default class LEDPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCollapsed: true,
            desiredBlueLED: this.props.desiredData.LEDs_Blue,
            desiredRedLED: this.props.desiredData.LEDs_Red
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isCollapsed: !this.state.isCollapsed
        })
    }
    render() {
        let { isCollapsed, desiredBlueLED, desiredRedLED } = this.state;
        let { sensorData, desiredData } = this.props;
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this.toggle} underlayColor={'transparent'}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Lighting</Text>
                        <Icon
                            name={isCollapsed ? 'arrow-right-bold' : 'arrow-down-bold'}
                            size={18}
                            type="material-community"
                        />
                    </View>
                </TouchableHighlight>
                <Collapsible collapsed={isCollapsed}>
                    <Text style={styles.lastUpdateLabel}>{`Last update: ${sensorData.timestamp}`}</Text>
                    <View style={styles.dataContainer}>
                        <View style={styles.lightContainer}>
                            <Text style={styles.lightLabel}>Blue Light</Text>
                            <View style={{ positon: 'absolute', zIndex: 0 }}>
                                <SemiCircleProgress
                                    percentage={desiredBlueLED}
                                    progressColor={"blue"}
                                    circleRadius={55}
                                    progressWidth={14}
                                    animationSpeed={2}
                                >
                                    <Text style={{ fontSize: 20 }}>{`${desiredBlueLED}%`}</Text>
                                </SemiCircleProgress>
                            </View>
                            <View style={{ positon: 'absolute', zIndex: 3, bottom: 50 }}>
                                <Slider style={{ transform: [{ scaleX: 1.2 }, { scaleY: 3.5 }] }}
                                    minimumValue={0}
                                    maximumValue={100}
                                    step={1}
                                    value={desiredBlueLED}
                                    onValueChange={value => this.setState({
                                        desiredBlueLED: value
                                    })}
                                    onSlidingComplete={value => this.props.callBackFunction(value, "LEDs_Blue")}
                                    thumbTintColor={'transparent'}
                                    minimumTrackTintColor={'transparent'}
                                    maximumTrackTintColor={'transparent'}
                                />
                            </View>
                        </View>
                        <View style={styles.lightContainer}>
                            <Text style={styles.lightLabel}>Red Light</Text>
                            <View style={{ positon: 'absolute', zIndex: 0 }}>
                                <SemiCircleProgress
                                    percentage={desiredRedLED}
                                    progressColor={"red"}
                                    circleRadius={55}
                                    progressWidth={14}
                                    animationSpeed={1}
                                >
                                    <Text style={{ fontSize: 20 }}>{`${desiredRedLED}%`}</Text>
                                </SemiCircleProgress>
                            </View>
                            <View style={{ positon: 'absolute', zIndex: 3, bottom: 50 }}>
                                <Slider style={{ transform: [{ scaleX: 1.2 }, { scaleY: 3.5 }] }}
                                    minimumValue={0}
                                    maximumValue={100}
                                    step={1}
                                    value={desiredRedLED}
                                    onValueChange={value => this.setState({
                                        desiredRedLED: value
                                    })}
                                    onSlidingComplete={value => this.props.callBackFunction(value, "LEDs_Red")}
                                    thumbTintColor={'transparent'}
                                    minimumTrackTintColor={'transparent'}
                                    maximumTrackTintColor={'transparent'}
                                />
                            </View>
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
    dataContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 4,
        alignItems: 'center'
    },
    lastUpdateLabel: {
        fontStyle: 'italic',
        fontSize: 12
    },
    lightLabel: {
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5
    },

})