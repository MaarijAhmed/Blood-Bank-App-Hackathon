import React, { Component } from 'react';
import { StyleSheet, View, Image, Button, TextInput } from 'react-native';
import { connect } from "react-redux";
import { posting } from "../store/action/action";
import { KeyboardAvoidingView } from 'react-native';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            number: '',
            Location: '',
            blood: '',
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Emergency Blood',
        headerRight: <Button onPress={() => navigation.navigate('Auth')} title="Logout" color="orange" />,
        headerStyle: { backgroundColor: '#f4511e' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold', flex: 1 },
    });

    Submit() {
        this.props.postreq(this.state.name, this.state.number, this.state.blood, this.state.Location, this.props.navigation)
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

                <View style={styles.container}>
                    <Image source={require('../imges/pr.gif')} style={styles.bloodimg} />
                    <TextInput value={this.state.name} onChangeText={(name) => this.setState({ name })} placeholder='Detail...' style={styles.inputfield} />
                    <TextInput maxLength={11} keyboardType={"phone-pad"} value={this.state.number} onChangeText={(number) => this.setState({ number })} placeholder='Phone Number' style={styles.inputfield} />
                    <TextInput maxLength={2} value={this.state.blood} onChangeText={(blood) => this.setState({ blood })} placeholder='Enter Blood Group' style={styles.inputfield} />
                    <TextInput value={this.state.Location} onChangeText={(Location) => this.setState({ Location })} placeholder='Location' style={styles.inputfield} />
                    {(this.props.loader) ? (<Image source={require('../imges/loader.gif')} style={styles.loading} />) : null}
                    {(this.state.name == '' || this.state.number == '' || this.state.Location == '' || this.state.blood == '') ?
                        (
                            <View style={styles.but}><Button title='Submit' color='#f4511e' /></View>
                        ) : (

                            <View style={styles.but}><Button title='Submit' onPress={this.Submit.bind(this)} color='brown' /></View>
                        )}

                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bloodimg: {
        width: 250,
        height: 150,
        resizeMode: 'cover',
    },
    inputfield: {
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        width: 250,
        margin: 10,
        paddingLeft: 20,
    },
    but: {
        width: 300,
        padding: 20,
    },
    goto: {
        color: 'red',
        fontSize: 16,
    },
    loading: {
        width: 100,
        height: 100,
        zIndex: 5,
        position: 'absolute',
    }
});

function mapStateToProps(state) {
    return ({
        loader: state.basicInfo.loader,
    })
}


function mapDispatchToProps(dispatch) {
    return ({
        postreq: (name, number, blood, Location, navigation) => {
            dispatch(posting(name, number, blood, Location, navigation))
        }
    })
}



export default connect(mapStateToProps, mapDispatchToProps)(Post)
