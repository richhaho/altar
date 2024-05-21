import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const AltarButton = ({type, onPress, disabled, children}: any) => {
  let buttonStyle, textStyle;

  // Define styles based on button type
  switch (type) {
    case 'primary':
      buttonStyle = buttonStyles.primaryButton;
      textStyle = buttonStyles.primaryText;
      break;
    case 'secondary':
      buttonStyle = buttonStyles.secondaryButton;
      textStyle = buttonStyles.secondaryText;
      break;
    case 'disabled':
      buttonStyle = buttonStyles.disabledButton;
      textStyle = buttonStyles.disabledText;
      break;
    default:
      buttonStyle = buttonStyles.primaryButton;
      textStyle = buttonStyles.primaryText;
  }

  return (
    <TouchableOpacity
      style={[buttonStyles.button, buttonStyle]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={[buttonStyles.buttonText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default AltarButton;

const buttonStyles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  primaryButton: {
    backgroundColor: '#8577FC',
    borderRadius: 10,
    shadowColor: '#8577FC',
    shadowOffset: {width: 0, height: 11},
    shadowOpacity: 0.47,
    shadowRadius: 21,
    elevation: 5,
  },
  primaryText: {
    color: 'white',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
  },
  secondaryText: {
    color: '#00143B70',
  },
  disabledButton: {
    backgroundColor: '#C4C4C4',
    borderRadius: 10,
  },
  disabledText: {
    color: 'white',
  },
});
