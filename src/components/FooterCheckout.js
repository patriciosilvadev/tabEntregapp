import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Picker,
  Button,
  Platform
} from "react-native";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import { atualizaObs, freteFetch } from '../actions/AppActions';
import Constants from "../utils/constants";
import foodData from "../food-data.json";
import ListCart from "./ListCart";
import CartButton from "./common/CartButton";
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, CheckBox } from 'react-native-elements';
import Billing from "../components/Billing";
import Color from "../../constants/Colors";

class FooterCheckout extends Component {
  constructor(props) {
    super(props);
    //console.log(props);
    this.props.freteFetch(this.props.usuario.id);
    
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Pedido",
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: Color.headerBar
      },
      headerRight: (
        <CartButton
          onPress={() => {
            navigation.navigate("Cart");
          }}
        />
      )
    };
  }

  handleNaviagation = () => {
    this.props.navigation.navigate("Billing");
  };

  render() {
    //console.log('this.props.navigation');
    //console.log(this.props.navigation);
    let valorFrete = parseFloat(this.props.valor_frete);
    valorFrete = valorFrete.toFixed(2);
    valorFrete = valorFrete.toString();
    return (
      <View style={{
        //padding:10
      }}>
        <View  style={{padding:10}} >
          <View style={styles.container}>
            <View style={{
              flex: 1,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 4,
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: "bold",
                //color: "#a92319",
              }}>
                Tx. Entrega
            </Text>
            </View>
            <View style={{
              flex: 1,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 4,
              //flexDirection: "row-reverse"
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: "bold",
                //color: "#ef6136",
              }}>

                <NumberFormat
                  value={valorFrete.replace(".", ",")}
                  displayType={'text'}
                  renderText={value => <Text>{value}</Text>}
                  thousandSeparator={'.'}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  prefix={'R$ '}
                  decimalSeparator={','}
                />
              </Text>
            </View>
            <View style={{
              flex: 1,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 4
            }}>
              <Text style={{
                fontSize: 17,
                fontWeight: "bold",
                //color: "#a92319",
              }}>
                Total Geral
            </Text>
            </View>
            <View style={{
              flex: 1,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 4,
              flexDirection: "row-reverse"
            }}>
              <Text style={{
                fontSize: 17,
                fontWeight: "bold",
                //color: "#ef6136",
              }}>

                <NumberFormat
                  value={this.props.total_carrinho.replace(".", ",")}
                  displayType={'text'}
                  renderText={value => <Text>{value}</Text>}
                  thousandSeparator={'.'}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  prefix={'R$ '}
                  decimalSeparator={','}

                />
              </Text>
            </View>


          </View>

          <View style={{
            flexDirection: "column",
            width: "100%",
            //marginTop: 8,
            //marginBottom: 8,
            //flexDirection: "row",
            padding: 17,
          }}>
            <Input
              label="Observações"
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              style={{ width: "100%", borderColor: 'gray', borderWidth: 1 }}
              onChangeText={(value) => this.props.atualizaObs(value)}

            />
          </View>
        </View>

        <View style={{
          //flexDirection: "column",
          width: "100%",
          //marginTop: 8,
          //marginBottom: 8,
          //flexDirection: "row",
          padding: 20,
        }}>
          <Button
            style={styles.button}
            title="Pagamento"
            color={ Platform.OS === 'ios' ? Color.buttonIos : Color.button }
            onPress={this.props.handleNaviagation} 
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 8,
    marginBottom: 8,
    flexDirection: "row",
    padding: 16,
  },
  button: {
    backgroundColor: "#4099ff",
    color: "#fff",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    height: 50,
    flex: 1,
    justifyContent: "center"
  },

});

const mapStateToProps = state => ({
  carrinho: state.AppReducer.carrinho,
  total_carrinho: state.AppReducer.total_carrinho,
  forma_pagamento: state.AppReducer.forma_pagamento,
  tipos_pagamento: state.AppReducer.tipos_pagamento,
  troco_pedido: state.AppReducer.troco_pedido,
  obs_pedido: state.AppReducer.obs_pedido,
  show_loader: state.AppReducer.show_loader,
  usuario: state.AppReducer.usuario,
  valor_frete: state.AppReducer.valor_frete,
});

const mapDispatchToProps = dispatch => bindActionCreators({ atualizaObs, freteFetch }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(FooterCheckout);